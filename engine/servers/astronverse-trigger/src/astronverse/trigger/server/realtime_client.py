"""Trigger Realtime client via InsForge Socket.IO."""

import os
import time

import socketio
from astronverse.trigger.core.logger import logger
from astronverse.trigger.server.gateway_client import (
    execute_single_project,
    get_executor_status,
    send_stop_current,
)

INSFORGE_URL = os.environ.get("INSFORGE_API_URL") or "http://172.16.100.211:7130"
JWT_TOKEN = os.environ.get("INSFORGE_JWT_TOKEN") or ""
REALTIME_NAMESPACE = "/realtime"


def _to_realtime_ws_url(http_url: str) -> str:
    """将 HTTP URL 转换为 Socket.IO WebSocket URL。"""
    if http_url.startswith("https://"):
        return http_url.replace("https://", "wss://", 1)
    return http_url.replace("http://", "ws://", 1)


class TriggerRealtimeClient:
    """通过 InsForge Realtime 接收远程控制命令。"""

    def __init__(self, user_id: str):
        self.user_id = user_id
        self.channel = "remote_control:{}".format(user_id)
        self.sio = socketio.Client(
            reconnection=True,
            reconnection_attempts=0,  # 无限重连
            reconnection_delay=1,
            reconnection_delay_max=30,
            logger=False,
            engineio_logger=False,
        )
        self._register_events()

    def _register_events(self):
        @self.sio.event
        def connect():
            logger.info("trigger realtime connected, subscribe channel=%s", self.channel)
            try:
                self.sio.emit("subscribe", {"channel": self.channel})
            except Exception as e:
                logger.exception("trigger realtime subscribe failed: %s", e)

        @self.sio.event
        def connect_error(data):
            logger.warning("trigger realtime connect_error: %s", data)

        @self.sio.event
        def disconnect():
            logger.info("trigger realtime disconnected")

        @self.sio.on("remote.run")
        def on_remote_run(data):
            logger.info("remote.run received: %s", data)
            result = None
            for i in range(3):
                if not get_executor_status():
                    try:
                        result = execute_single_project(data)
                    except Exception as e:
                        logger.exception("execute_single_project error: %s", e)
                        result = {"code": "5002", "msg": str(e), "data": None}
                    break
                time.sleep(2)
            if result is None:
                result = {"code": "5001", "msg": "有任务在运行中", "data": None}
            self._emit_reply("remote.run.reply", result)

        @self.sio.on("remote.stop_current")
        def on_remote_stop(data):
            logger.info("remote.stop_current received: %s", data)
            if get_executor_status():
                try:
                    result = send_stop_current()
                except Exception as e:
                    logger.exception("send_stop_current error: %s", e)
                    result = {"code": "5002", "msg": str(e), "data": None}
            else:
                result = {"code": "5001", "msg": "没有任务在运行中", "data": None}
            self._emit_reply("remote.stop_current.reply", result)

    def _emit_reply(self, event: str, data: dict):
        try:
            self.sio.emit(event, {"channel": self.channel, "data": data})
        except Exception as e:
            logger.exception("trigger realtime emit %s failed: %s", event, e)

    def start(self):
        try:
            url = _to_realtime_ws_url(INSFORGE_URL)
            token = JWT_TOKEN or os.environ.get("INSFORGE_JWT_TOKEN", "")
            logger.info("trigger realtime connecting: %s user_id=%s", url, self.user_id)
            self.sio.connect(
                url,
                headers={"Authorization": "Bearer {}".format(token)} if token else {},
                namespaces=REALTIME_NAMESPACE,
                wait_timeout=10,
            )
            logger.info("trigger realtime started")
        except Exception as e:
            logger.exception("trigger realtime start failed: %s", e)

    def stop(self):
        try:
            if self.sio.connected:
                self.sio.disconnect()
            logger.info("trigger realtime stopped")
        except Exception as e:
            logger.exception("trigger realtime stop failed: %s", e)
