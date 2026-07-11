import json

import requests
from astronverse.trigger import CONVERT_COLUMN, TERMINAL_CONVERT_COLUMN
from astronverse.trigger.core.config import config
from astronverse.trigger.core.logger import logger
from engine.shared.insforge_client import insforge


def execute_multiple_projects(project_info: dict):
    url = "http://127.0.0.1:{}/scheduler/executor/run_list".format(config.GATEWAY_PORT)
    headers = {"Content-Type": "application/json"}
    logger.info("execute_multiple_projects: url=%s project_info=%s", url, project_info)
    response = requests.post(url, headers=headers, data=json.dumps(project_info))

    logger.info("execute_multiple_projects response: status=%s body=%s", response.status_code, response.json())
    if int(response.status_code) == 200 and response.json()["code"] == "0000":
        return True
    else:
        logger.warning("execute_multiple_projects failed: code=%s", response.json().get("code"))
        return False


def execute_single_project(project_info: dict):
    url = "http://127.0.0.1:{}/scheduler/executor/run_sync".format(config.GATEWAY_PORT)
    headers = {"Content-Type": "application/json"}
    logger.info("execute_single_project: url=%s project_info=%s", url, project_info)
    response = requests.post(url, headers=headers, data=json.dumps(project_info))

    logger.info("execute_single_project response: status=%s body=%s", response.status_code, response.json())
    if int(response.status_code) == 200:
        return response.json()
    else:
        logger.warning("execute_single_project failed: status=%s", response.status_code)
        return {"code": "5001", "msg": "请求失败", "data": None}


def get_executor_status():
    url = "http://127.0.0.1:{}/scheduler/executor/status".format(config.GATEWAY_PORT)
    response = requests.post(url)
    result = response.json()
    is_running = int(response.status_code) == 200 and result.get("data", {}).get("running", False)
    logger.info("get_executor_status: status=%s running=%s", response.status_code, is_running)
    return is_running


def send_msg(data: dict):
    url = "http://127.0.0.1:{}/scheduler/send/tip".format(config.GATEWAY_PORT)
    headers = {"Content-Type": "application/json"}
    logger.info("send_msg: url=%s data=%s", url, data)
    response = requests.post(url, headers=headers, data=json.dumps(data))
    logger.info("send_msg response: status=%s body=%s", response.status_code, response.json())
    if int(response.status_code) == 200 and response.json()["code"] == "0000":
        return response.json()
    else:
        logger.warning("send_msg failed: code=%s", response.json().get("code"))
        return None


def send_stop_list(task_id: str = None):
    url = "http://127.0.0.1:{}/scheduler/executor/stop_list".format(config.GATEWAY_PORT)
    if task_id:
        data = {"task_id": task_id}
    else:
        data = {}
    logger.info("send_stop_list: url=%s task_id=%s", url, task_id)
    response = requests.post(url, json=data)
    logger.info("send_stop_list response: status=%s body=%s", response.status_code, response.text)
    if int(response.status_code) == 200 and response.json()["code"] == "0000":
        return response.json()
    else:
        logger.warning("send_stop_list failed: code=%s", response.json().get("code"))
        return None


def send_stop_current():
    url = "http://127.0.0.1:{}/scheduler/executor/stop_current".format(config.GATEWAY_PORT)
    logger.info("send_stop_current: url=%s", url)
    response = requests.post(url)
    logger.info("send_stop_current response: status=%s body=%s", response.status_code, response.text)
    if int(response.status_code) == 200 and response.json()["code"] == "0000":
        return response.json()
    else:
        logger.warning("send_stop_current failed: code=%s", response.json().get("code"))
        return {"code": "5001", "msg": "请求失败", "data": None}


def list_trigger():
    def convert(recorder: list[dict]) -> dict:
        trigger_tasks = {}
        for trigger in recorder:
            _d = {}
            # InsForge triggers table: id, name, type, config, enabled, user_id
            # config contains all the task configuration in JSONB
            trigger_config = trigger.get("config", {})
            
            # Map InsForge columns to old API field names for conversion
            mapped_trigger = {
                "taskId": str(trigger.get("id")),
                "name": trigger.get("name"),
                "taskType": trigger.get("type"),
                "enable": 1 if trigger.get("enabled") else 0,
                "taskJson": json.dumps(trigger_config) if isinstance(trigger_config, dict) else trigger_config,
            }
            
            # Extract fields from config into top level for conversion
            if isinstance(trigger_config, dict):
                mapped_trigger.update(trigger_config)
            
            for k, v in CONVERT_COLUMN.items():
                # 规则转换（进行服务端的规范0和1转换）
                if k == "enable" or k == "queueEnable":
                    _d[v] = True if mapped_trigger.get(k) == 1 else False
                    continue
                # taskJson对Dict进行扩充
                elif k == "taskJson":
                    if mapped_trigger.get(k):
                        task_json_str = mapped_trigger.get(k)
                        if isinstance(task_json_str, str):
                            task_json_str = task_json_str.replace("'", '"')
                            _d.update(json.loads(task_json_str))
                    # taskJson本体也保留
                elif k == "robotInfoList":
                    callback_infos_list = []
                    if mapped_trigger.get(k):
                        for i in mapped_trigger.get(k):
                            callback_infos = {}
                            for key, value in i.items():
                                if value is not None:
                                    callback_infos[key] = value
                            callback_infos_list.append(callback_infos)
                    _d[v] = callback_infos_list
                    continue
                elif k in mapped_trigger:
                    _d[v] = mapped_trigger.get(k)
                elif v in _d:
                    # already updated via taskJson expansion
                    pass

            _d["mode"] = "EXECUTOR"
            if _d.get("open_virtual_desk") is None:
                _d["open_virtual_desk"] = False
            if _d.get("screen_record_enable") is None:
                _d["screen_record_enable"] = False
            if _d.get("retry_num"):
                _d["retry_num"] = int(_d.get("retry_num"))
            else:
                _d["retry_num"] = 0

            trigger_tasks[_d["trigger_id"]] = _d

        return trigger_tasks

    logger.info("list_trigger: fetching enabled triggers from InsForge")
    response = insforge.fetch_triggers(enabled=True)
    if response.status_code == 200:
        records = response.json()
        logger.info("list_trigger: fetched %s triggers, converting...", len(records) if isinstance(records, list) else 0)
        result = convert(records)
        logger.info("list_trigger: converted to %s trigger tasks, keys=%s", len(result), list(result.keys()))
        return result
    else:
        logger.error("list_trigger failed: status=%s body=%s", response.status_code, response.text[:500])
        raise Exception(f"获取任务列表失败: {response.status_code} {response.text}")


def terminal_poll_update():
    """
    从节点轮询更新接口

    Returns:
        True或False
    """
    logger.info("terminal_poll_update: polling terminal_id=%s", config.TERMINAL_ID)
    response = insforge.fetch_terminal_tasks(config.TERMINAL_ID)
    if response.status_code == 200:
        tasks = response.json()
        has_tasks = len(tasks) > 0 if isinstance(tasks, list) else False
        logger.info("terminal_poll_update: has_tasks=%s count=%s", has_tasks, len(tasks) if isinstance(tasks, list) else 0)
        return has_tasks
    else:
        logger.warning("terminal_poll_update failed: status=%s body=%s", response.status_code, response.text[:500])
        return False


def terminal_list_task():
    """
    从节点获取任务列表接口
    """

    def convert(recorder: list[dict]):
        dispatch_tasks = []
        retry_tasks = []
        stop_tasks = []

        def convert_task(task):
            _d = {}
            # Map InsForge tasks table fields to old API format for conversion
            mapped_task = {
                "taskId": str(task.get("id")),
                "taskName": task.get("name"),
                "taskType": task.get("trigger_type"),
                "cronJson": task.get("cron_expression"),
                "taskStatus": task.get("status"),
                "exceptional": None,
                "timeout": None,
                "timeoutEnable": None,
                "retryNum": None,
                "queueEnable": None,
                "screenRecordEnable": None,
                "virtualDesktopEnable": None,
                "dispatchRobotInfos": None,
            }
            for k, v in TERMINAL_CONVERT_COLUMN.items():
                # 规则转换（进行服务端的规范0和1转换）
                if k in [
                    "queueEnable",
                    "screenRecordEnable",
                    "virtualDesktopEnable",
                    "timeoutEnable",
                ]:
                    raw = mapped_task.get(k)
                    _d[v] = True if raw == 1 else False
                    continue
                _d[v] = mapped_task.get(k)
            _d["enable"] = True
            _d["mode"] = "DISPATCH"

            if _d.get("cron_json"):
                try:
                    _d.update(json.loads(_d.get("cron_json")))
                except (json.JSONDecodeError, TypeError):
                    pass

            if _d.get("callback_project_ids"):
                for project in _d.get("callback_project_ids"):
                    for key, value in project.items():
                        if value is None:
                            project[key] = ""
                    if project.get("robotVersion"):
                        project["version"] = project.get("robotVersion")

            if _d.get("retry_num"):
                _d["retry_num"] = int(_d.get("retry_num"))
            else:
                _d["retry_num"] = 0

            if _d.get("task_type") == "trigger":
                _d["task_type"] = "schedule"
            return _d

        for record in recorder:
            _d = convert_task(record)
            task_status = record.get("status", "")
            if task_status in ("stopped", "stop"):
                stop_tasks.append(_d)
            elif task_status == "retry":
                retry_tasks.append(_d)
            else:
                dispatch_tasks.append(_d)

        return dispatch_tasks, retry_tasks, stop_tasks

    # Fetch all tasks assigned to this terminal from InsForge
    logger.info("terminal_list_task: fetching tasks for terminal_id=%s", config.TERMINAL_ID)
    response = insforge.fetch_terminal_tasks(config.TERMINAL_ID)
    if response.status_code == 200:
        records = response.json()
        if not isinstance(records, list):
            records = []
        logger.info("terminal_list_task: fetched %s tasks, converting...", len(records))
        dispatch_tasks, retry_tasks, stop_tasks = convert(records)
        logger.info(
            "terminal_list_task: dispatch=%s retry=%s stop=%s",
            len(dispatch_tasks), len(retry_tasks), len(stop_tasks),
        )
        return dispatch_tasks, retry_tasks, stop_tasks
    else:
        logger.error("terminal_list_task failed: status=%s body=%s", response.status_code, response.text[:500])
        return None
