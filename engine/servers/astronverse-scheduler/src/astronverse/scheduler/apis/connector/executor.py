import datetime
import json
import time
from typing import Optional, Union

from engine.shared.insforge_client import insforge

from astronverse.scheduler.apis.connector.terminal import Terminal
from astronverse.scheduler.apis.response import ResCode, exec_res_msg, res_msg
from astronverse.scheduler.core.executor.executor import (
    ExecuteStatus,
    ProjectExecPosition,
    TaskExecuteStatus,
)
from astronverse.scheduler.core.svc import Svc, get_svc
from astronverse.scheduler.logger import logger
from astronverse.scheduler.utils.utils import EmitType, emit_to_front, get_settings
from fastapi import APIRouter, Depends
from pydantic import BaseModel

router = APIRouter()


class ExecutorProject(BaseModel):
    project_id: str  # 工程id
    project_name: str = ""  # 工程名称
    process_id: str = ""  # 流程id
    line: int = 0  # 测试行号
    end_line: int = 0  # 测试行号
    jwt: str = ""  # jwt[无效]
    debug: str = "n"  # debug模式
    exec_position: ProjectExecPosition = ProjectExecPosition.EDIT_PAGE  # 执行位置
    recording_config: str = ""  # 录制器配置
    hide_log_window: bool = False  # 是否隐藏日志框
    run_param: str = ""  # 执行器参数
    open_virtual_desk: bool = False  # 虚拟桌面
    version: Union[int, str] = ""  # 机器人版本
    is_custom_component: bool = False  # 是否是自定义组件


class StopTask(BaseModel):
    task_id: Optional[str] = None


class RobotInfo(BaseModel):
    robotId: str
    robotName: str
    paramJson: str = ""
    version: str = ""
    sort: int = 1


class TaskInfo(BaseModel):
    trigger_id: str  # 任务id
    task_type: str = ""  # schedule manual hotKey files mail
    trigger_name: str  # 任务名称
    exceptional: str
    timeout: int = 0
    callback_project_ids: list[RobotInfo] = []
    mode: ProjectExecPosition = ProjectExecPosition.EDIT_PAGE
    retry_num: int = 0
    open_virtual_desk: bool = False  # 虚拟桌面


def report_task_log(svc, status: TaskExecuteStatus, task_id: str = None, task_execute_id: str = None):
    """日志上报：计划任务整体状态上报，区分与普通日志上报"""

    if status == TaskExecuteStatus.EXECUTING:
        # 创建新的执行记录
        execution_data = {
            "task_id": task_id,
            "status": status.value,
            "start_time": datetime.datetime.now().isoformat(),
        }
        logger.info("report log create execution: {}".format(execution_data))
        try:
            response = insforge.create_execution(execution_data)
            response.raise_for_status()
            inserted = response.json()
            if inserted and len(inserted) > 0:
                execution_id = inserted[0].get("id")
                logger.info("report log created execution: {} -> {}".format(task_id, execution_id))
                return execution_id
            else:
                logger.error("report log create execution returned empty: {}".format(response.text))
                return ""
        except Exception as e:
            logger.exception("report log create execution error: {}".format(e))
            return ""
    else:
        # 更新现有执行记录
        if not task_execute_id:
            logger.warning("report log update execution skipped: no task_execute_id")
            return ""
        update_data = {
            "status": status.value,
            "end_time": datetime.datetime.now().isoformat(),
        }
        logger.info("report log update execution: {} -> {}".format(task_execute_id, update_data))
        try:
            response = insforge.update_execution(task_execute_id, update_data)
            response.raise_for_status()
            logger.info("report log updated execution: {} -> {}".format(task_execute_id, status.value))
            return task_execute_id
        except Exception as e:
            logger.exception("report log update execution error: {}".format(e))
            return task_execute_id


@router.post("/run_list")
def executor_run_list(task_info: TaskInfo, svc: Svc = Depends(get_svc)):
    """
    运行和启动一组工程(计划任务), 同步
    """
    logger.info(
        "executor_run_list start: trigger_id=%s task_type=%s trigger_name=%s robot_count=%s retry_num=%s",
        task_info.trigger_id, task_info.task_type, task_info.trigger_name,
        len(task_info.callback_project_ids), task_info.retry_num,
    )
    if svc.executor_mg.status():
        logger.warning("executor_run_list rejected: executor already running")
        return res_msg(code=ResCode.ERR, msg="已有实例在运行，无法启动")
    svc.terminal_task_stop = False
    settings = get_settings()
    task_executor_id = ""
    try:
        emit_to_front(EmitType.EDIT_SHOW_HIDE, msg={"type": "hide"})

        task_executor_id = report_task_log(svc, TaskExecuteStatus.EXECUTING, task_info.trigger_id)
        if not task_executor_id:
            raise Exception("服务日志上报异常")

        end_time = 0
        if task_info.timeout > 0:
            end_time = time.time() + (task_info.timeout * 60)
            logger.info(
                "executor_run_list timeout set: trigger_id=%s timeout_min=%s end_time=%s",
                task_info.trigger_id, task_info.timeout, end_time,
            )

        temp_terminal_mod = svc.terminal_mod

        # 循环每个机器人
        is_cancel = False
        for idx, r in enumerate(sorted(task_info.callback_project_ids, key=lambda x: x.sort)):
            logger.info(
                "executor_run_list robot[%s/%s]: robot_id=%s robot_name=%s",
                idx + 1, len(task_info.callback_project_ids), r.robotId, r.robotName,
            )
            is_break = False
            for t in range(task_info.retry_num + 1):
                if t > 0:
                    logger.info(
                        "executor_run_list retry: robot_id=%s attempt=%s/%s",
                        r.robotId, t + 1, task_info.retry_num + 1,
                    )
                executor = svc.executor_mg.create(
                    task_id=task_info.trigger_id,
                    task_name=task_info.trigger_name,
                    task_exec_id=task_executor_id,
                    project_id=r.robotId,
                    project_name=r.robotName,
                    exec_position=task_info.mode,
                    recording_config=settings.get("videoForm", None),
                    hide_log_window=settings.get("commonSetting", {}).get("hideLogWindow", False),
                    run_param=r.paramJson,
                    open_virtual_desk=settings.get("open_virtual_desk", False) or task_info.open_virtual_desk,
                    version=r.version,
                    is_send_log_event=False,
                )
                if svc.terminal_mod:
                    svc.executor_mg.task_trigger_status()

                # 检查是否运行结束
                while svc.executor_mg.status():
                    time.sleep(1)
                    if 0 < end_time < time.time():
                        svc.executor_mg.close(executor)
                        raise Exception("启动失败: 运行超时")

                # 检查全局状态
                if temp_terminal_mod != svc.terminal_mod:
                    # 状态切换了，直接跳出剩余任务
                    is_cancel = True
                    is_break = True
                    break

                if svc.terminal_task_stop:
                    svc.terminal_task_stop = False
                    is_cancel = True
                    is_break = True
                    break

                # 检测状态
                if executor is not None:
                    execute_status = executor.execute_status
                    execute_reason = executor.execute_reason
                    execute_data = executor.execute_data
                else:
                    execute_status = ExecuteStatus.FAIL
                    execute_reason = "启动失败"
                    execute_data = {}

                if execute_status == ExecuteStatus.SUCCESS:
                    # 成功
                    break
                else:
                    # 失败
                    if task_info.exceptional == "jump":
                        break
                    elif task_info.exceptional == "retry_stop":
                        if t == task_info.retry_num - 1:
                            raise Exception("启动失败: {}".format(execute_reason))
                    elif task_info.exceptional == "retry_jump":
                        if t == task_info.retry_num - 1:
                            break
                    else:
                        # stop
                        raise Exception("启动失败: {}".format(execute_reason))

            if is_break:
                break
        # 运行成功
        if task_info.task_type in ["manual", "hotKey"]:
            emit_to_front(EmitType.EXECUTOR_END)
        if task_executor_id:
            if is_cancel:
                logger.info(
                    "executor_run_list cancelled: trigger_id=%s task_executor_id=%s",
                    task_info.trigger_id, task_executor_id,
                )
                report_task_log(
                    svc,
                    TaskExecuteStatus.CANCEL,
                    task_info.trigger_id,
                    task_executor_id,
                )
            else:
                logger.info(
                    "executor_run_list success: trigger_id=%s task_executor_id=%s",
                    task_info.trigger_id, task_executor_id,
                )
                report_task_log(
                    svc,
                    TaskExecuteStatus.SUCCESS,
                    task_info.trigger_id,
                    task_executor_id,
                )
        if svc.terminal_mod:
            svc.executor_mg.task_trigger_status()
        return res_msg(code=ResCode.SUCCESS, msg="运行成功", data={})
    except Exception as e:
        # 运行失败
        logger.error(
            "executor_run_list failed: trigger_id=%s error=%s",
            task_info.trigger_id, str(e),
        )
        if task_info.task_type in ["manual", "hotKey"]:
            emit_to_front(EmitType.EXECUTOR_END)
        if task_executor_id:
            report_task_log(
                svc,
                TaskExecuteStatus.EXEC_ERROR,
                task_info.trigger_id,
                task_executor_id,
            )
        if svc.terminal_mod:
            svc.executor_mg.task_trigger_status()
        return res_msg(code=ResCode.SUCCESS, msg=str(e), data={})


@router.post("/run_sync")
def executor_run_sync(param: ExecutorProject, svc: Svc = Depends(get_svc)):
    """
    运行和启动一个工程(远程调度), 同步，并获取返回值
    """
    logger.info(
        "executor_run_sync: project_id=%s project_name=%s process_id=%s version=%s",
        param.project_id, param.project_name, param.process_id, param.version,
    )
    if svc.executor_mg.status():
        logger.warning("executor_run_sync rejected: executor already running")
        return res_msg(code=ResCode.ERR, msg="已有实例在运行，无法启动")

    recording_config = {}
    try:
        if param.recording_config:
            recording_config = json.loads(param.recording_config)
    except Exception as e:
        # 录制功能不影响执行器
        pass

    executor = svc.executor_mg.create(
        project_id=param.project_id,
        project_name=param.project_name,
        process_id=param.process_id,
        line=param.line,
        end_line=param.end_line,
        debug=param.debug,
        exec_position=param.exec_position,
        recording_config=recording_config,
        hide_log_window=param.hide_log_window,
        run_param=param.run_param,
        open_virtual_desk=param.open_virtual_desk,
        is_send_log_event=False,
        version=param.version,
        is_custom_component=param.is_custom_component,
    )
    # 检查是否运行结束
    while svc.executor_mg.status():
        time.sleep(1)
    # 检测状态
    if executor is not None:
        execute_status = executor.execute_status
        execute_reason = executor.execute_reason
        execute_data = executor.execute_data
    else:
        execute_status = ExecuteStatus.FAIL
        execute_reason = "启动失败"
        execute_data = {}
    video_path = executor.execute_video_path if executor else ""
    if execute_status == ExecuteStatus.SUCCESS:
        logger.info(
            "executor_run_sync success: project_id=%s video_path=%s",
            param.project_id, video_path,
        )
        return exec_res_msg(code=ResCode.SUCCESS, msg="运行成功", data=execute_data, video_path=video_path)
    else:
        logger.error(
            "executor_run_sync failed: project_id=%s reason=%s",
            param.project_id, execute_reason,
        )
        return exec_res_msg(code=ResCode.ERR, msg=execute_reason, video_path=video_path)


@router.post("/run")
def executor_run(param: ExecutorProject, svc: Svc = Depends(get_svc)):
    """
    运行和启动一个工程(本地执行), 异步
    """
    logger.info(
        "executor_run: project_id=%s project_name=%s process_id=%s debug=%s version=%s",
        param.project_id, param.project_name, param.process_id, param.debug, param.version,
    )
    # 初始化
    if not param.project_id:
        logger.warning("executor_run rejected: empty project_id")
        return res_msg(code=ResCode.ERR, msg="工程id为空", data=None)
    if svc.executor_mg.status():
        logger.warning("executor_run rejected: executor already running")
        return res_msg(code=ResCode.ERR, msg="已有实例在运行，无法启动")

    recording_config = {}
    try:
        if param.recording_config:
            recording_config = json.loads(param.recording_config)
    except Exception as e:
        # 录制功能不影响执行器
        pass

    executor = svc.executor_mg.create(
        project_id=param.project_id,
        project_name=param.project_name,
        process_id=param.process_id,
        line=param.line,
        end_line=param.end_line,
        debug=param.debug,
        exec_position=param.exec_position,
        recording_config=recording_config,
        hide_log_window=param.hide_log_window,
        run_param=param.run_param,
        open_virtual_desk=param.open_virtual_desk,
        is_send_log_event=True,
        version=param.version,
        is_custom_component=param.is_custom_component,
    )
    if executor is not None:
        logger.info(
            "executor_run success: project_id=%s exec_port=%s",
            param.project_id, executor.exec_port,
        )
        return res_msg(msg="启动成功", data={"addr": "ws://127.0.0.1:{}/".format(executor.exec_port)})
    else:
        logger.error("executor_run failed: project_id=%s executor is None", param.project_id)
        return res_msg(code=ResCode.ERR, msg="启动失败")


@router.post("/status")
def executor_status(svc: Svc = Depends(get_svc)):
    """
    获取执行器状态
    """
    status = svc.executor_mg.status()
    logger.info("executor_status: running=%s", status)
    return res_msg(msg="ok", data={"running": status})


@router.post("/stop")
def executor_stop(exe_pro: ExecutorProject, svc: Svc = Depends(get_svc)):
    """
    强制关闭一个工程
    """
    project_id = exe_pro.project_id
    logger.info("executor_stop: project_id=%s", project_id)
    if not project_id:
        logger.warning("executor_stop rejected: empty project_id")
        return res_msg(code=ResCode.ERR, msg="工程id为空", data=None)
    svc.executor_mg.close_by_project(project_id=project_id)
    return res_msg(msg="停止成功", data=None)


@router.post("/stop_current")
def executor_stop_current(svc: Svc = Depends(get_svc)):
    logger.info("executor_stop_current called")
    if svc.executor_mg:
        svc.terminal_task_stop = True
        svc.executor_mg.close_all()
    return res_msg(msg="停止成功", data=None)


@router.post("/stop_list")
def executor_stop_list(stop_info: StopTask, svc: Svc = Depends(get_svc)):
    logger.info("executor_stop_list: task_id=%s", stop_info.task_id)
    if svc.executor_mg:
        if (stop_info.task_id and svc.executor_mg.curr_task_id == stop_info.task_id) or (not stop_info.task_id):
            svc.terminal_task_stop = True
            svc.executor_mg.close_all()  # 关闭正在进行的任务
    return res_msg(msg="停止成功", data=None)
