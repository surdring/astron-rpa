"""
Socket.IO route for AstronRPA Browser Bridge.

Provides an alternative Socket.IO endpoint that replaces the raw WebSocket
endpoint, enabling browser extensions to communicate via InsForge Realtime
(Socket.IO) instead of raw WebSocket.

This module mirrors the ws_route.py functionality but uses Socket.IO
events instead of raw WebSocket messages.
"""

import asyncio
import os
import traceback
from base64 import b64decode
from typing import Any

import socketio

from astronverse.browser_bridge.apis.context import ServiceContext, get_svc
from astronverse.browser_bridge.error import ERROR_FORMAT, CODE_INNER, BaseException
from astronverse.browser_bridge.logger import logger
from astronverse.websocket_server.ws import BaseMsg, Conn, IWebSocket, WsException
from astronverse.websocket_server.ws_service import WsManager

# ------------------------------------------------------------------
# Error handling (mirrors ws_route.py)
# ------------------------------------------------------------------


def error_to_base_error(e=None) -> BaseException:
    if isinstance(e, BaseException):
        return e
    elif isinstance(e, WsException):
        return BaseException(ERROR_FORMAT.format(e), "ERROR_FORMAT error: {}".format(e))
    else:
        return BaseException(CODE_INNER, "raw error: {}".format(e))


def error_format(e=None) -> dict:
    def gen_error_msg(exc: BaseException):
        logger.error(
            "socketio_base_exception: code:{} message:{} error:{}".format(
                exc.code.code, exc.code.message, exc.message
            )
        )
        logger.error(
            "socketio_base_exception: traceback:{}".format(traceback.format_exc())
        )
        return {"code": exc.code.code.value, "message": exc.code.message, "data": {}}

    return gen_error_msg(error_to_base_error(e))


def sio_log(msg):
    logger.info(f"[SocketIO] {msg}")


# ------------------------------------------------------------------
# Socket.IO WebSocket adapter for WsManager
# ------------------------------------------------------------------


class SioSocket(IWebSocket):
    """Adapts a Socket.IO sid to the IWebSocket interface used by WsManager."""

    def __init__(self, sio_server: socketio.AsyncServer, sid: str):
        self.sio = sio_server
        self.sid = sid

    async def receive_text(self) -> str:
        return ""

    async def send(self, message: Any) -> None:
        """Send a message to the connected client via Socket.IO."""
        await self.sio.emit("ws_message", message, to=self.sid)

    async def close(self) -> None:
        """Disconnect the client."""
        await self.sio.disconnect(self.sid)


# ------------------------------------------------------------------
# Injection scripts (mirrors ws_route.py)
# ------------------------------------------------------------------

inject_path = os.path.abspath(__file__)
for _ in range(2):
    inject_path = os.path.dirname(inject_path)
inject_path = os.path.join(inject_path, "inject")


async def browser_init_inject_sio(
    sio_server: socketio.AsyncServer, sid: str, uuid: str
):
    """Send browser injection scripts to the connected client."""
    sio_log(f"Sending browser injection scripts to sid={sid} uuid={uuid}")
    data_list = [
        {
            "data_path": os.path.join(inject_path, "backgroundInject.js"),
            "key": "backgroundInject",
        },
        {
            "data_path": os.path.join(inject_path, "contentInject.js"),
            "key": "contentInject",
        },
    ]
    for data in data_list:
        with open(data.get("data_path"), encoding="utf-8") as file:
            file_data = file.read()
        msg = (
            BaseMsg(
                channel="browser",
                key=data.get("key"),
                uuid="$root$",
                send_uuid=uuid,
                need_ack=False,
                data=file_data,
            )
            .init()
            .tojson()
        )
        await sio_server.emit("ws_message", msg, to=sid)
        sio_log(f"Injected {data.get('key')} to sid={sid} size={len(file_data)}")
    sio_log(f"Browser injection complete for sid={sid}")


# ------------------------------------------------------------------
# Socket.IO Server
# ------------------------------------------------------------------

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    logger=False,
    engineio_logger=False,
)

sio_wsmg = WsManager(error_format=error_format, log=sio_log)


@sio.event
async def connect(sid: str, environ: dict, auth: dict | None = None):
    """Handle Socket.IO client connection.

    Authenticates using token from auth dict or query params.
    Extracts uuid from the token (base64 encoded).
    """
    sio_log(f"Connection attempt: sid={sid} remote_addr={environ.get('REMOTE_ADDR', 'unknown')}")
    token = None
    if auth and isinstance(auth, dict):
        token = auth.get("token")
        sio_log(f"Token from auth dict: sid={sid} has_token={bool(token)}")
    if not token:
        query = environ.get("QUERY_STRING", "")
        for param in query.split("&"):
            if param.startswith("token="):
                token = param.split("=", 1)[1]
                sio_log(f"Token from query string: sid={sid}")
                break

    uuid = ""
    if token:
        try:
            uuid = b64decode(token).decode("utf-8")
            sio_log(f"Token decoded: sid={sid} uuid={uuid}")
        except Exception as e:
            sio_log(f"Token decode failed: sid={sid} error={e}")

    if not uuid:
        sio_log(f"Connection rejected: no valid token (sid={sid})")
        await sio.disconnect(sid)
        return

    async with sio.session(sid) as session:
        session["uuid"] = uuid

    sio_log(f"Client connected: sid={sid}, uuid={uuid}")

    await browser_init_inject_sio(sio, sid, uuid)

    ws = SioSocket(sio, sid)
    conn = Conn(ws=ws)

    async def _listen():
        sio_log(f"Starting WsManager listen for sid={sid} uuid={uuid}")
        try:
            svc = ServiceContext()
            await asyncio.gather(
                sio_wsmg.listen(uuid, conn, svc),
                sio_wsmg.start_ping(),
                sio_wsmg.clear_watch(),
            )
        except Exception as e:
            logger.error(f"WsManager error for sid={sid}: {e}")
        finally:
            sio_log(f"WsManager listen ended for sid={sid} uuid={uuid}")

    asyncio.create_task(_listen())


@sio.event
async def disconnect(sid: str):
    """Handle client disconnect."""
    async with sio.session(sid) as session:
        uuid = session.get("uuid", "unknown")
    sio_log(f"Client disconnected: sid={sid} uuid={uuid}")


@sio.event
async def ws_message(sid: str, data: str):
    """Handle incoming WebSocket-style messages from the client."""
    async with sio.session(sid) as session:
        uuid = session.get("uuid", "")
    if uuid:
        sio_log(f"WS message received: sid={sid} uuid={uuid} data_len={len(data) if data else 0}")
        sio_wsmg.handle_message(uuid, data)
    else:
        sio_log(f"WS message dropped (no uuid): sid={sid}")


def create_socketio_app() -> socketio.ASGIApp:
    """Create an ASGI app wrapping the Socket.IO server.

    Usage in FastAPI/Starlette:
        from astronverse.browser_bridge.apis.socketio_route import create_socketio_app
        app.mount("/ws", create_socketio_app())
    """
    sio_log("Creating Socket.IO ASGI app")
    return socketio.ASGIApp(sio)