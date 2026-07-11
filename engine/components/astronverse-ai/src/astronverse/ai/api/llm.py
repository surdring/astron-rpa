"""LLM API client helpers: streaming and normal chat plus prompt interface."""

import json
import os
from typing import Any

import requests
import sseclient
from astronverse.actionlib.atomic import atomicMg
from astronverse.ai.error import LLM_NO_RESPONSE_ERROR
from astronverse.baseline.logger.logger import logger

INSFORGE_AI_BASE_URL = "http://172.16.100.211:7130"
DEFAULT_MODEL = "xopdeepseekv32"


def _legacy_gateway_port() -> str:
    return atomicMg.cfg().get("GATEWAY_PORT") or "13159"


def _use_insforge_ai() -> bool:
    cfg = atomicMg.cfg().get("USE_INSFORGE_AI")
    if cfg is not None:
        return str(cfg).lower() not in ("false", "0", "no", "off")
    env = os.getenv("USE_INSFORGE_AI", "true")
    return env.lower() not in ("false", "0", "no", "off")


def _api_url() -> str:
    if _use_insforge_ai():
        return f"{INSFORGE_AI_BASE_URL}/ai/v1/chat/completions"
    return "http://127.0.0.1:{}/api/rpa-ai-service/v1/chat/completions".format(
        _legacy_gateway_port()
    )


def _prompt_url() -> str:
    if _use_insforge_ai():
        return f"{INSFORGE_AI_BASE_URL}/ai/v1/chat/prompt"
    return "http://127.0.0.1:{}/api/rpa-ai-service/v1/chat/prompt".format(
        _legacy_gateway_port()
    )


# Backward-compatible module-level constants (default to InsForge gateway)
API_URL = _api_url()
PROMPT_URL = _prompt_url()


def chat_streamable(messages: Any, model: str = DEFAULT_MODEL):
    """
    调用远端大模型

    :param
    messages: 历史问题
    model: 模型id

    - example
        inputs = [
            {"role": "assistant", "content": "请模仿李白的口吻"},
            {"role": "user", "content": "写一首咏鹅诗"}
        ]

        outputs = {"content":"笔","reasoning_content":null}

    """
    chat_json = {"messages": messages, "model": model, "stream": True}
    url = _api_url()
    logger.info("chat_streamable request: url=%s model=%s", url, model)

    response = requests.post(url, json=chat_json)
    logger.info("chat_streamable response: status=%s", response.status_code)
    if response.status_code == 200:
        client = sseclient.SSEClient(response)  # type: ignore
        for event in client.events():
            if event.data and event.data != "[DONE]":
                response_json = json.loads(event.data)
                if response_json.get("choices"):
                    yield response_json["choices"][0]["delta"]["content"]
    else:
        logger.info("chat_streamable error: status=%s body=%s", response.status_code, response.text[:500])
        raise BaseException(LLM_NO_RESPONSE_ERROR.format(response), "")


def chat_normal(user_input, system_input="", model=DEFAULT_MODEL):
    """构建请求的 payload"""
    data = {
        "model": model,  # 选择大模型，替换为实际模型标识
        "messages": [
            {"role": "system", "content": system_input},
            {"role": "user", "content": user_input},
        ],
        "stream": False,
    }

    url = _api_url()
    logger.info("chat_normal request: url=%s model=%s", url, model)

    try:
        # 发送 API 请求
        response = requests.post(url, json=data)
        response.raise_for_status()  # 检查请求是否成功
        logger.info("chat_normal response: status=%s", response.status_code)

        # 返回模型生成的回复
        response_json = response.json()

        # 兼容两种响应格式
        if "data" in response_json and "choices" in response_json["data"]:
            # 新格式
            return response_json["data"]["choices"][0]["message"]["content"]
        elif "choices" in response_json:
            # 原格式
            return response_json["choices"][0]["message"]["content"]
        else:
            raise ValueError("未知的响应格式")

    except requests.exceptions.RequestException as e:
        logger.info("chat_normal request error: %s", e)
        return None
    except KeyError:
        logger.info("chat_normal response format error")
        return None


def chat_prompt(prompt_type, params, model=DEFAULT_MODEL):
    """chat_prompt"""
    data = {
        "model": model,  # 选择大模型，替换为实际模型标识
        "prompt_type": prompt_type,
        "params": params,
    }

    url = _prompt_url()
    logger.info("chat_prompt request: url=%s model=%s prompt_type=%s", url, model, prompt_type)

    try:
        # 发送 API 请求
        response = requests.post(url, json=data)
        response.raise_for_status()  # 检查请求是否成功
        logger.info("chat_prompt response: status=%s", response.status_code)

        # 返回模型生成的回复
        response_json = response.json()
        return response_json["data"]

    except requests.exceptions.RequestException as e:
        logger.info("chat_prompt request error: %s", e)
        return None
    except KeyError:
        logger.info("chat_prompt response format error")
        return None



