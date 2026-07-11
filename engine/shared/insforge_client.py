"""
InsForge Python Client for AstronRPA Engine.

Provides a lightweight HTTP client (httpx) that wraps InsForge REST API
endpoints used by the RPA engine (scheduler, executor, trigger, browser-bridge).

API paths verified against InsForge self-hosted deployment (port :7130):
  - Auth:     POST /api/auth/sessions (login)
  - Database: GET/POST/PATCH/DELETE /api/database/records/{table}
  - Storage:  GET/POST /api/storage/buckets/{bucket}/objects/{path}
  - Realtime: Socket.IO with JWT auth

Usage:
    from engine.shared.insforge_client import insforge

    insforge.sign_in(email, password)
    tasks = insforge.query_table("tasks", filters={"status": "pending"}, order="priority.desc")
    insforge.create_execution({"task_id": "...", "robot_id": "...", "status": "running"})
"""

import logging
import os
from typing import Any, Optional
from urllib.parse import quote

import httpx

logger = logging.getLogger(__name__)


class InsForgeClient:
    """HTTP client for InsForge REST API.

    The engine communicates with the InsForge backend at :7130 via HTTP,
    using the PostgREST proxy (/api/database/records/) for CRUD operations
    and the Storage API for file uploads/downloads.
    """

    def __init__(self):
        self.base_url = os.getenv(
            "INSFORGE_BASE_URL", "http://172.16.100.211:7130"
        )
        self.anon_key = os.getenv(
            "INSFORGE_ANON_KEY",
            "anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f",
        )
        self.access_token: str | None = None

    # ------------------------------------------------------------------
    # Authentication
    # ------------------------------------------------------------------

    def sign_in(self, email: str, password: str) -> dict:
        """Authenticate engine with InsForge and store access_token.

        Uses POST /api/auth/sessions with anon key in Authorization header.
        """
        logger.info("InsForge sign_in: email=%s base_url=%s", email, self.base_url)
        resp = httpx.post(
            f"{self.base_url}/api/auth/sessions",
            json={"email": email, "password": password},
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.anon_key}",
            },
        )
        resp.raise_for_status()
        data = resp.json()
        self.access_token = data.get("accessToken") or data.get("access_token")
        logger.info("InsForge sign_in success: email=%s has_token=%s", email, bool(self.access_token))
        return data

    def _headers(self, prefer: Optional[str] = None) -> dict:
        """Build default request headers with auth.

        When access_token is set, uses Bearer token auth.
        Otherwise falls back to anon key auth.
        """
        h = {"Content-Type": "application/json"}
        if self.access_token:
            h["Authorization"] = f"Bearer {self.access_token}"
        else:
            h["Authorization"] = f"Bearer {self.anon_key}"
        if prefer:
            h["Prefer"] = prefer
        return h

    # ------------------------------------------------------------------
    # Generic PostgREST Query
    # ------------------------------------------------------------------

    def query_table(
        self,
        table: str,
        select: str = "*",
        filters: Optional[dict] = None,
        order: Optional[str] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        single: bool = False,
    ) -> httpx.Response:
        """Generic PostgREST query via InsForge database proxy.

        Args:
            table: Table name (e.g. 'robots', 'tasks', 'executions')
            select: Columns to select (default '*')
            filters: Dict of column -> value for eq filters
            order: Order clause (e.g. 'priority.desc,created_at.asc')
            limit: Max rows to return
            offset: Row offset for pagination
            single: If True, return single object (adds Accept header)

        Returns:
            httpx.Response with JSON data
        """
        params: dict[str, str] = {"select": select}

        if filters:
            for col, val in filters.items():
                params[col] = f"eq.{val}"

        if order:
            params["order"] = order

        if limit is not None:
            params["limit"] = str(limit)

        if offset is not None:
            params["offset"] = str(offset)

        headers = self._headers()
        if single:
            headers["Accept"] = "application/vnd.pgrst.object+json"

        logger.info(
            "InsForge query_table: table=%s select=%s filters=%s order=%s limit=%s offset=%s single=%s",
            table, select, filters, order, limit, offset, single,
        )
        resp = httpx.get(
            f"{self.base_url}/api/database/records/{table}",
            params=params,
            headers=headers,
        )
        if resp.status_code >= 400:
            logger.warning(
                "InsForge query_table error: table=%s status=%s body=%s",
                table, resp.status_code, resp.text[:500],
            )
        else:
            data = resp.json()
            count = len(data) if isinstance(data, list) else (1 if data else 0)
            logger.info(
                "InsForge query_table success: table=%s status=%s count=%s",
                table, resp.status_code, count,
            )
        return resp

    def insert_record(
        self, table: str, data: dict | list, returning: bool = True
    ) -> httpx.Response:
        """Insert record(s) via InsForge database proxy.

        Args:
            table: Table name
            data: Single dict or list of dicts to insert
            returning: If True, return the inserted row(s)
        """
        data_count = len(data) if isinstance(data, list) else 1
        logger.info(
            "InsForge insert_record: table=%s count=%s returning=%s",
            table, data_count, returning,
        )
        headers = self._headers(
            prefer="return=representation" if returning else "return=minimal"
        )
        resp = httpx.post(
            f"{self.base_url}/api/database/records/{table}",
            json=data,
            headers=headers,
        )
        if resp.status_code >= 400:
            logger.warning(
                "InsForge insert_record error: table=%s status=%s body=%s",
                table, resp.status_code, resp.text[:500],
            )
        else:
            logger.info(
                "InsForge insert_record success: table=%s status=%s",
                table, resp.status_code,
            )
        return resp

    def update_record(
        self,
        table: str,
        data: dict,
        filters: dict,
        returning: bool = False,
    ) -> httpx.Response:
        """Update record(s) via InsForge database proxy.

        Args:
            table: Table name
            data: Fields to update
            filters: Dict of column -> value for eq filters
            returning: If True, return the updated row(s)
        """
        params: dict[str, str] = {}
        for col, val in filters.items():
            params[col] = f"eq.{val}"

        logger.info(
            "InsForge update_record: table=%s filters=%s data_keys=%s returning=%s",
            table, filters, list(data.keys()), returning,
        )
        headers = self._headers(
            prefer="return=representation" if returning else "return=minimal"
        )
        resp = httpx.patch(
            f"{self.base_url}/api/database/records/{table}",
            json=data,
            params=params,
            headers=headers,
        )
        if resp.status_code >= 400:
            logger.warning(
                "InsForge update_record error: table=%s status=%s body=%s",
                table, resp.status_code, resp.text[:500],
            )
        else:
            logger.info(
                "InsForge update_record success: table=%s status=%s",
                table, resp.status_code,
            )
        return resp

    def delete_record(self, table: str, filters: dict) -> httpx.Response:
        """Delete record(s) via InsForge database proxy."""
        params: dict[str, str] = {}
        for col, val in filters.items():
            params[col] = f"eq.{val}"

        logger.info(
            "InsForge delete_record: table=%s filters=%s",
            table, filters,
        )
        resp = httpx.delete(
            f"{self.base_url}/api/database/records/{table}",
            params=params,
            headers=self._headers(),
        )
        if resp.status_code >= 400:
            logger.warning(
                "InsForge delete_record error: table=%s status=%s body=%s",
                table, resp.status_code, resp.text[:500],
            )
        else:
            logger.info(
                "InsForge delete_record success: table=%s status=%s",
                table, resp.status_code,
            )
        return resp

    # ------------------------------------------------------------------
    # Robot Management
    # ------------------------------------------------------------------

    def register_robot(self, robot_data: dict) -> httpx.Response:
        return self.insert_record("robots", robot_data)

    def update_robot_status(self, robot_id: str, status: str) -> httpx.Response:
        return self.update_record(
            "robots", {"status": status}, {"id": robot_id}, returning=True
        )

    def send_heartbeat(self, robot_id: str) -> httpx.Response:
        return self.update_record(
            "robots", {"last_heartbeat": "now()"}, {"id": robot_id}
        )

    # ------------------------------------------------------------------
    # Task Management
    # ------------------------------------------------------------------

    def fetch_pending_tasks(self, robot_id: str) -> httpx.Response:
        """Fetch pending tasks for a robot, ordered by priority desc."""
        return self.query_table(
            "tasks",
            filters={"robot_id": robot_id, "status": "pending"},
            order="priority.desc,created_at.asc",
        )

    def update_task_status(self, task_id: str, status: str) -> httpx.Response:
        return self.update_record("tasks", {"status": status}, {"id": task_id})

    # ------------------------------------------------------------------
    # Execution Records
    # ------------------------------------------------------------------

    def create_execution(self, execution_data: dict) -> httpx.Response:
        return self.insert_record("executions", execution_data, returning=True)

    def update_execution(self, execution_id: str, data: dict) -> httpx.Response:
        return self.update_record("executions", data, {"id": execution_id})

    def log_execution(
        self,
        execution_id: str,
        level: str,
        message: str,
        component: str = "",
    ) -> httpx.Response:
        return self.insert_record(
            "execution_logs",
            {
                "execution_id": execution_id,
                "level": level,
                "message": message,
                "component_name": component,
            },
        )

    # ------------------------------------------------------------------
    # Trigger Management
    # ------------------------------------------------------------------

    def fetch_triggers(
        self, enabled: Optional[bool] = None, trigger_type: Optional[str] = None
    ) -> httpx.Response:
        """Fetch trigger rules from the triggers table.

        Args:
            enabled: If set, filter by enabled status
            trigger_type: If set, filter by trigger type (schedule/manual/hotKey/files/mail)
        """
        filters: dict = {}
        if enabled is not None:
            filters["enabled"] = "true" if enabled else "false"
        if trigger_type:
            filters["type"] = trigger_type
        logger.info(
            "InsForge fetch_triggers: enabled=%s type=%s",
            enabled, trigger_type,
        )
        resp = self.query_table("triggers", filters=filters)
        if resp.status_code == 200:
            data = resp.json()
            count = len(data) if isinstance(data, list) else (1 if data else 0)
            logger.info("InsForge fetch_triggers success: count=%s", count)
        return resp

    def fetch_terminal_tasks(
        self, terminal_id: str, status: Optional[str] = None
    ) -> httpx.Response:
        """Fetch dispatch tasks for a terminal node.

        Args:
            terminal_id: Terminal identifier
            status: Optional status filter (e.g. 'pending', 'retry', 'stopped')
        """
        filters: dict = {}
        if status:
            filters["status"] = status
        logger.info(
            "InsForge fetch_terminal_tasks: terminal_id=%s status=%s",
            terminal_id, status,
        )
        resp = self.query_table(
            "tasks",
            filters=filters,
            order="priority.desc",
        )
        if resp.status_code == 200:
            data = resp.json()
            count = len(data) if isinstance(data, list) else (1 if data else 0)
            logger.info("InsForge fetch_terminal_tasks success: count=%s", count)
        return resp

    # ------------------------------------------------------------------
    # Project / Workflow Data (Executor)
    # ------------------------------------------------------------------

    def fetch_project_info(self, project_id: str) -> httpx.Response:
        """Fetch project info by ID."""
        return self.query_table(
            "projects", filters={"id": project_id}, single=True
        )

    def fetch_workflow_definition(
        self, project_id: str, workflow_id: Optional[str] = None
    ) -> httpx.Response:
        """Fetch workflow definition(s) for a project.

        Args:
            project_id: Project ID to filter by
            workflow_id: Optional specific workflow ID
        """
        filters = {"project_id": project_id}
        if workflow_id:
            filters["id"] = workflow_id
        return self.query_table("workflows", filters=filters)

    def fetch_workflow_list(self, project_id: str) -> httpx.Response:
        """Fetch all workflows for a project."""
        return self.query_table(
            "workflows",
            select="id, name, project_id",
            filters={"project_id": project_id},
        )

    # ------------------------------------------------------------------
    # File Operations (InsForge Storage)
    # ------------------------------------------------------------------

    def download_file(self, bucket: str, path: str, local_path: str) -> str:
        """Download a file from InsForge Storage to local path.

        Uses GET /api/storage/buckets/{bucket}/objects/{path}
        """
        encoded_path = quote(path, safe="")
        logger.info(
            "InsForge download_file: bucket=%s path=%s local=%s",
            bucket, path, local_path,
        )
        resp = httpx.get(
            f"{self.base_url}/api/storage/buckets/{bucket}/objects/{encoded_path}",
            headers=self._headers(),
        )
        resp.raise_for_status()
        with open(local_path, "wb") as f:
            f.write(resp.content)
        logger.info(
            "InsForge download_file success: bucket=%s path=%s size=%s",
            bucket, path, len(resp.content),
        )
        return local_path

    def upload_file(
        self, bucket: str, path: str, file_path: str
    ) -> httpx.Response:
        """Upload a file to InsForge Storage.

        Uses POST /api/storage/buckets/{bucket}/objects/{path}
        """
        encoded_path = quote(path, safe="")
        logger.info(
            "InsForge upload_file: bucket=%s path=%s local=%s",
            bucket, path, file_path,
        )
        with open(file_path, "rb") as f:
            content = f.read()
            resp = httpx.post(
                f"{self.base_url}/api/storage/buckets/{bucket}/objects/{encoded_path}",
                content=content,
                headers={
                    "Authorization": f"Bearer {self.access_token or self.anon_key}",
                    "Content-Type": "application/octet-stream",
                },
            )
        if resp.status_code >= 400:
            logger.warning(
                "InsForge upload_file error: bucket=%s path=%s status=%s body=%s",
                bucket, path, resp.status_code, resp.text[:500],
            )
        else:
            logger.info(
                "InsForge upload_file success: bucket=%s path=%s size=%s",
                bucket, path, len(content),
            )
        return resp

    # Backward-compatible aliases
    def download_script(self, path: str, local_path: str) -> str:
        return self.download_file("rpa-resources", path, local_path)

    def upload_result(self, path: str, file_path: str) -> httpx.Response:
        return self.upload_file("rpa-resources", path, file_path)

    # ------------------------------------------------------------------
    # Realtime (Socket.IO client helper)
    # ------------------------------------------------------------------

    def get_realtime_token(self) -> str | None:
        """Return the access token for Socket.IO authentication."""
        return self.access_token

    def get_realtime_url(self) -> str:
        """Return the base URL for Socket.IO connection."""
        return self.base_url

    # ------------------------------------------------------------------
    # Health Check
    # ------------------------------------------------------------------

    def health_check(self) -> bool:
        """Check if InsForge backend is reachable."""
        try:
            resp = httpx.get(
                f"{self.base_url}/api/health", timeout=5
            )
            healthy = resp.status_code == 200
            logger.info(
                "InsForge health_check: base_url=%s status=%s healthy=%s",
                self.base_url, resp.status_code, healthy,
            )
            return healthy
        except Exception as e:
            logger.warning(
                "InsForge health_check failed: base_url=%s error=%s",
                self.base_url, e,
            )
            return False


# Module-level singleton for use across engine services
insforge = InsForgeClient()