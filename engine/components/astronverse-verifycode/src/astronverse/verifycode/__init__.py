import os
from enum import Enum


def _ai_service_url() -> str:
    """获取 ai-service 基础 URL（从环境变量读取，默认指向远程服务）。"""
    return os.getenv("AI_SERVICE_URL", "http://172.16.100.211:8001")


class VerifyCodeConfig:
    @staticmethod
    def url() -> str:
        """验证码识别端点：由本地网关转发改为直连 ai-service。"""
        return f"{_ai_service_url()}/jfbym/customApi"


class PictureCodeType(Enum):
    GENERAL1234 = "10110"
    GENERAL5678 = "10111"
    GENERAL1234_PLUS = "10211"


class HintPosition(Enum):
    BOTTOM = "bottom"
    TOP = "top"


class ElementGetAttributeTypeFlag(Enum):
    GetText = "getText"
    GetHtml = "getHtml"
    GetValue = "getValue"
    GetLink = "getLink"
    GetAttribute = "getAttribute"
    GetPosition = "getPosition"
    GetSelection = "getSelection"
