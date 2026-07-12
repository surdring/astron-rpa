import json
import os
from typing import Any
from urllib.parse import urljoin

import requests
from astronverse.actionlib.atomic import atomicMg
from astronverse.actionlib.error import *
from astronverse.actionlib.types import typesMg
from astronverse.browser import CommonForBrowserType
from astronverse.browser.error import *


def _browser_bridge_url() -> str:
    """browser-bridge HTTP 服务地址。"""
    return os.environ.get("BROWSER_BRIDGE_URL") or "http://127.0.0.1:19082"


class Browser:
    """浏览器操作类，提供浏览器的基本操作方法。"""

    def __init__(self):
        self.browser_type: CommonForBrowserType = CommonForBrowserType.BTChrome
        self.browser_abs_path: str = ""
        self.browser_control = None

    @typesMg.shortcut(group_key="Browser", res_type="Str")
    def get_url(self) -> str:
        """获取当前网页URL。"""
        return self.send_browser_extension(browser_type=self.browser_type.value, key="getUrl")

    @typesMg.shortcut(group_key="Browser", res_type="Str")
    def get_title(self) -> str:
        """获取当前网页标题。"""
        return self.send_browser_extension(browser_type=self.browser_type.value, key="getTitle")

    @typesMg.shortcut(group_key="Browser", res_type="Int")
    def get_tabid(self) -> int:
        """获取当前标签ID。"""
        data = self.send_browser_extension(browser_type=self.browser_type.value, key="getTabId")
        return data if isinstance(data, int) else -1

    @classmethod
    def __validate__(cls, name: str, value):
        """验证浏览器对象。"""
        if isinstance(value, Browser):
            return value
        return None

    @staticmethod
    def send_browser_rpc(req: dict, timeout: float = 0.0) -> Any:
        """发送浏览器RPC请求，直连 browser-bridge。"""
        url = _browser_bridge_url()
        logger = atomicMg.cfg().get("logger")
        try:
            if logger:
                logger.info("send_browser_rpc request: url=%s/browser/transition timeout=%s req=%s", url, timeout, json.dumps(req))
            res = requests.post(
                "{}/browser/transition".format(url),
                json=req,
                timeout=timeout or 10,
            )
            if logger:
                logger.info("send_browser_rpc response: status=%s body=%s", res.status_code, res.text[:200])
            return res
        except Exception as e:
            if logger:
                logger.exception("send_browser_rpc error: %s", e)
            raise

    def send_browser_extension(
        self,
        browser_type: str,
        key: str,
        data: Any = None,
        data_path: str = "",
        timeout: float = None,
    ):
        """发送浏览器扩展请求。"""
        if not data:
            data = {}

        res = self.send_browser_rpc(
            {
                "browser_type": browser_type,
                "data": data,
                "key": key,
                "data_path": data_path,
            },
            timeout,
        )

        if res.status_code != 200:
            raise BaseException(BROWSER_EXTENSION_INSTALL_ERROR, "浏览器插件通信出错，请重试")
        res_data = res.json()
        if not res_data.get("data"):
            raise BaseException(BROWSER_EXTENSION_INSTALL_ERROR, "插件无响应")
        if res_data.get("data").get("code") == "5001":
            raise BaseException(
                BROWSER_EXTENSION_ERROR_FORMAT.format(res_data.get("data").get("msg")), res_data.get("data").get("msg")
            )
        if res_data.get("data").get("code") == "5002":
            raise BaseException(WEB_GET_ELE_ERROR.format(res_data.get("data").get("msg")), "网页元素未找到")
        if res_data.get("data").get("code") == "5003":
            raise BaseException(
                WEB_EXEC_ELE_ERROR.format(res_data.get("data").get("msg")), res_data.get("data").get("msg")
            )
        if res_data.get("data").get("code") == "5004":
            raise BaseException(
                BROWSER_EXTENSION_ERROR_FORMAT.format(res_data.get("data").get("msg")), res_data.get("data").get("msg")
            )
        return res_data.get("data").get("data")
