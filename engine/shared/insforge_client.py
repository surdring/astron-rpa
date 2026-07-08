"""
InsForge Python Client for AstronRPA Engine.

Provides a lightweight HTTP client (httpx) that wraps InsForge REST API
endpoints used by the RPA engine (scheduler, executor, trigger, browser-bridge).

Usage:
    from engine.shared.insforge_client import insforge

    insforge.sign_in(email, password)
    tasks = insforge.fetch_pending_tasks(robot_id)
    insforge.update_task_status(task_id, "running")
"""

import os

import httpx


class InsForgeClient:
    """HTTP client for InsForge REST API (PostgREST endpoints).

    The engine communicates with the InsForge backend at :7130 via HTTP,
    using the PostgREST API proxy for CRUD operations and the Storage API
    for file uploads/downloads.
    """

    def __init__(self):
        self.base_url = os.getenv(
            "INSFORGE_BASE_URL", "http://172.16.100.211:7130"
        )
        self.anon_key = os.getenv("INSFORGE_ANON_KEY", "")
        self.access_token: str | None = None

    # ------------------------------------------------------------------
    # Authentication
    # ------------------------------------------------------------------

    def sign_in(self, email: str, password: str) -> dict:
        """Authenticate engine with InsForge and store access_token."""
        resp = httpx.post(
            f"{self.base_url}/api/auth/signin",
            json={"email": email, "password": password},
            headers={"x-api-key": self.anon_key},
        )
        resp.raise_for_status()
        data = resp.json()
        self.access_token = data["access_token"]
        return data

    def _headers(self) -> dict:
        """Build default request headers with auth."""
        h = {"x-api-key": self.anon_key, "Content-Type": "application/json"}
        if self.access_token:
            h["Authorization"] = f"Bearer {self.access_token}"
        return h

    # ------------------------------------------------------------------
    # Robot Management
    # ------------------------------------------------------------------

    def register_robot(self, robot_data: dict) -> httpx.Response:
        return httpx.post(
            f"{self.base_url}/api/rest/robots",
            json=robot_data,
            headers=self._headers(),
        )

    def update_robot_status(self, robot_id: str, status: str) -> httpx.Response:
        return httpx.patch(
            f"{self.base_url}/api/rest/robots",
            json={"status": status},
            headers={**self._headers(), "Prefer": "return=representation"},
            params={"id": f"eq.{robot_id}"},
        )

    def send_heartbeat(self, robot_id: str) -> httpx.Response:
        return httpx.patch(
            f"{self.base_url}/api/rest/robots",
            json={"last_heartbeat": "now()"},
            headers={**self._headers(), "Prefer": "return=minimal"},
            params={"id": f"eq.{robot_id}"},
        )

    # ------------------------------------------------------------------
    # Task Management
    # ------------------------------------------------------------------

    def fetch_pending_tasks(self, robot_id: str) -> httpx.Response:
        """Fetch pending tasks for a robot, ordered by priority desc."""
        return httpx.get(
            f"{self.base_url}/api/rest/tasks",
            params={
                "select": "*",
                "robot_id": f"eq.{robot_id}",
                "status": "eq.pending",
                "order": "priority.desc,created_at.asc",
            },
            headers=self._headers(),
        )

    def update_task_status(self, task_id: str, status: str) -> httpx.Response:
        return httpx.patch(
            f"{self.base_url}/api/rest/tasks",
            json={"status": status},
            headers={**self._headers(), "Prefer": "return=minimal"},
            params={"id": f"eq.{task_id}"},
        )

    # ------------------------------------------------------------------
    # Execution Records
    # ------------------------------------------------------------------

    def create_execution(self, execution_data: dict) -> httpx.Response:
        return httpx.post(
            f"{self.base_url}/api/rest/executions",
            json=execution_data,
            headers=self._headers(),
        )

    def update_execution(self, execution_id: str, data: dict) -> httpx.Response:
        return httpx.patch(
            f"{self.base_url}/api/rest/executions",
            json=data,
            headers={**self._headers(), "Prefer": "return=minimal"},
            params={"id": f"eq.{execution_id}"},
        )

    def log_execution(
        self,
        execution_id: str,
        level: str,
        message: str,
        component: str = "",
    ) -> httpx.Response:
        return httpx.post(
            f"{self.base_url}/api/rest/execution_logs",
            json={
                "execution_id": execution_id,
                "level": level,
                "message": message,
                "component_name": component,
            },
            headers=self._headers(),
        )

    # ------------------------------------------------------------------
    # File Operations (InsForge Storage)
    # ------------------------------------------------------------------

    def download_script(self, path: str, local_path: str) -> str:
        resp = httpx.get(
            f"{self.base_url}/api/storage/objects/rpa-resources/{path}",
            headers=self._headers(),
        )
        resp.raise_for_status()
        with open(local_path, "wb") as f:
            f.write(resp.content)
        return local_path

    def upload_result(self, path: str, file_path: str) -> httpx.Response:
        with open(file_path, "rb") as f:
            return httpx.post(
                f"{self.base_url}/api/storage/objects/rpa-resources/{path}",
                files={"file": f},
                headers={"Authorization": f"Bearer {self.access_token}"},
            )

    # ------------------------------------------------------------------
    # Realtime (Socket.IO client helper)
    # ------------------------------------------------------------------

    def get_realtime_token(self) -> str | None:
        """Return the access token for Socket.IO authentication."""
        return self.access_token


# Module-level singleton for use across engine services
insforge = InsForgeClient()