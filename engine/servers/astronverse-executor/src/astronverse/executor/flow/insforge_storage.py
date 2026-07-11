import json
from typing import Any, Optional

from astronverse.executor.error import *
from astronverse.executor.logger import logger
from engine.shared.insforge_client import insforge

from .storage import IStorage, common_advanced, merge_dicts


class InsForgeStorage(IStorage):
    """InsForge-based storage implementation for the AstronRPA executor.

    Uses InsForge BaaS PostgREST API for all data access, replacing the
    old HTTP gateway calls in HttpStorage. Returns data in the same format
    as HttpStorage so the executor can use either storage backend.
    """

    def __init__(self, svc):
        self.svc = svc

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def __query__(
        self,
        table: str,
        select: str = "*",
        filters: Optional[dict] = None,
        order: Optional[str] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
        single: bool = False,
    ) -> Any:
        """Generic InsForge query wrapper.

        Calls insforge.query_table() and returns the parsed JSON data.
        Returns empty list/dict on error to match HttpStorage behavior.
        """
        logger.info(
            "InsForgeStorage query: table=%s filters=%s single=%s select=%s",
            table, filters, single, select,
        )
        try:
            resp = insforge.query_table(
                table,
                select=select,
                filters=filters,
                order=order,
                limit=limit,
                offset=offset,
                single=single,
            )
            resp.raise_for_status()
            data = resp.json()
            count = len(data) if isinstance(data, list) else (1 if data else 0)
            logger.info(
                "InsForgeStorage query success: table=%s count=%s",
                table, count,
            )
            return data
        except Exception as e:
            logger.error(
                "InsForgeStorage query failed: table=%s filters=%s error=%s",
                table, filters, e,
            )
            return {} if single else []

    def __process_json_full__(self, atom_list: list) -> list:
        """Fetch full atom definitions from InsForge atoms table.

        Mirrors HttpStorage.__process_json_full__ which calls
        /api/robot/atom-new/list. Here we query the atoms table
        via InsForge PostgREST for each atom key.
        """
        if len(atom_list) == 0:
            return []

        atoms = []
        for key in atom_list:
            atom = self.__query__("atoms", filters={"key": key}, single=True)
            if atom:
                atoms.append(atom)
        return atoms

    # ------------------------------------------------------------------
    # IStorage interface implementation
    # ------------------------------------------------------------------

    def project_info(
        self, project_id: str, mode: str, version: str = ""
    ) -> dict:
        """获取工程的信息"""
        try:
            if self.svc.conf.is_custom_component:
                logger.info(
                    "InsForgeStorage project_info: component mode, component_id=%s",
                    project_id,
                )
                return (
                    self.__query__(
                        "components", filters={"id": project_id}, single=True
                    )
                    or {}
                )
            else:
                logger.info(
                    "InsForgeStorage project_info: project mode, project_id=%s version=%s",
                    project_id, version,
                )
                return (
                    self.__query__(
                        "projects", filters={"id": project_id}, single=True
                    )
                    or {}
                )
        except Exception as e:
            logger.error(
                "InsForgeStorage project_info failed: project_id=%s error=%s",
                project_id, e,
            )
            return {}

    def process_list(
        self, project_id: str, mode: str, version: str
    ) -> list:
        """获取工程的流程列表"""
        logger.info(
            "InsForgeStorage process_list: project_id=%s version=%s",
            project_id, version,
        )
        result = (
            self.__query__(
                "workflows",
                select="id,name,project_id",
                filters={"project_id": project_id},
            )
            or []
        )
        logger.info(
            "InsForgeStorage process_list done: project_id=%s count=%s",
            project_id, len(result),
        )
        return result

    def process_detail(
        self,
        project_id: str,
        mode: str,
        version: str,
        process_id: str,
    ) -> list:
        """获取流程json"""
        logger.info(
            "InsForgeStorage process_detail: project_id=%s process_id=%s",
            project_id, process_id,
        )
        resp = self.__query__(
            "workflows",
            filters={"project_id": project_id, "id": process_id},
            single=True,
        )
        try:
            if resp and resp.get("definition"):
                definition = resp["definition"]
                flow_list = (
                    json.loads(definition)
                    if isinstance(definition, str)
                    else definition
                )
            else:
                flow_list = []
        except Exception as e:
            raise BaseException(
                PROCESS_ACCESS_ERROR_FORMAT.format(process_id),
                "工程数据异常 {}".format(e),
            )

        # 附加数据 — collect atom keys from flow nodes
        atom_key_list = []
        for flow in flow_list:
            # 兼容代码
            if flow.get("key") == "Code.Process":
                flow.update({"key": "Script.process"})
            if flow.get("key").startswith(
                "Code.Component."
            ) or flow.get("key").startswith("Script.component."):
                code_id = flow.get("key").split(".")[-1]
                flow.update(
                    {
                        "inputList": [
                            {"key": "component", "value": code_id}
                        ]
                        + flow.get("inputList", []),
                        "key": "Script.component",
                    }
                )
            # 兼容结束

            # 特殊处理
            if flow.get("key").startswith("Smart.run_code"):
                smart_id = flow.get("key").split(".")[-1]
                smart_version = flow.get("version")
                smart_key = "{}_{}".format(smart_id, smart_version)
                flow.update(
                    {
                        "inputList": [
                            {
                                "key": "smart_component",
                                "value": smart_key,
                            }
                        ]
                        + flow.get("inputList", []),
                        "key": "Smart.run_code",
                    }
                )
            # 特殊处理结束
            atom_key_list.append(flow.get("key"))

        full = self.__process_json_full__(atom_key_list)
        full_dict = {}
        for f in full:
            if f:
                f = json.loads(f.get("atomContent"))
            f["inputList"] = f.get("inputList", []) + common_advanced
            full_dict[f.get("key")] = f

        # 合并
        for k, flow in enumerate(flow_list):
            if flow.get("key") in full_dict:
                full_item = full_dict[flow.get("key")]
                flow_list[k] = merge_dicts(flow, full_item)
        logger.info(
            "InsForgeStorage process_detail done: process_id=%s atom_count=%s flow_count=%s",
            process_id, len(full_dict), len(flow_list),
        )
        return flow_list

    def module_detail(
        self, project_id: str, mode: str, version: str, module_id: str
    ) -> str:
        """获取脚本数据"""
        logger.info(
            "InsForgeStorage module_detail: project_id=%s module_id=%s",
            project_id, module_id,
        )
        resp = self.__query__(
            "workflows",
            filters={"project_id": project_id, "id": module_id},
            single=True,
        )
        if resp:
            module_content = resp.get("moduleContent") or resp.get(
                "module_content", ""
            )
            logger.info(
                "InsForgeStorage module_detail done: module_id=%s has_content=%s",
                module_id, bool(module_content),
            )
            return module_content
        logger.warning(
            "InsForgeStorage module_detail empty: project_id=%s module_id=%s",
            project_id, module_id,
        )
        return ""

    def param_list(
        self,
        project_id: str,
        mode: str,
        version: str,
        process_id: str = "",
    ) -> list:
        """获取工程的配置参数"""
        filters = {"project_id": project_id}
        if process_id:
            filters["process_id"] = process_id
        logger.info(
            "InsForgeStorage param_list: project_id=%s process_id=%s",
            project_id, process_id,
        )
        res = self.__query__("c_param", filters=filters)
        if res and isinstance(res, str):
            res = json.loads(res)
        result = res or []
        logger.info(
            "InsForgeStorage param_list done: project_id=%s count=%s",
            project_id, len(result) if isinstance(result, list) else 0,
        )
        return result

    def global_list(
        self, project_id: str, mode: str, version: str = ""
    ) -> list:
        """获取工程的全局变量"""
        logger.info(
            "InsForgeStorage global_list: project_id=%s",
            project_id,
        )
        result = (
            self.__query__(
                "c_global_var", filters={"project_id": project_id}
            )
            or []
        )
        logger.info(
            "InsForgeStorage global_list done: project_id=%s count=%s",
            project_id, len(result),
        )
        return result

    def component_list(
        self, project_id: str, mode: str, version: str = ""
    ) -> list:
        """获取组件列表"""
        logger.info(
            "InsForgeStorage component_list: project_id=%s",
            project_id,
        )
        result = (
            self.__query__(
                "component_robot_use",
                filters={"project_id": project_id},
            )
            or []
        )
        logger.info(
            "InsForgeStorage component_list done: project_id=%s count=%s",
            project_id, len(result),
        )
        return result

    def pip_list(
        self, project_id: str, mode: str, version: str = ""
    ) -> list:
        """获取工程的用户pip依赖详情"""
        logger.info(
            "InsForgeStorage pip_list: project_id=%s",
            project_id,
        )
        result = (
            self.__query__(
                "c_require", filters={"project_id": project_id}
            )
            or []
        )
        logger.info(
            "InsForgeStorage pip_list done: project_id=%s count=%s",
            project_id, len(result),
        )
        return result

    def smart_component_detail(
        self,
        project_id: str,
        smart_id: str,
        smart_version: int,
        mode: str,
        version: str = "",
    ):
        """获取智能组件详情"""
        logger.info(
            "InsForgeStorage smart_component_detail: smart_id=%s smart_version=%s",
            smart_id, smart_version,
        )
        resp = self.__query__(
            "c_smart_version",
            filters={"smart_id": smart_id, "version": smart_version},
            single=True,
        )
        if resp:
            result = {
                "smartCode": resp.get("smartCode")
                or resp.get("smart_code", ""),
                "smartType": resp.get("smartType")
                or resp.get("smart_type", ""),
            }
            logger.info(
                "InsForgeStorage smart_component_detail done: smart_id=%s has_code=%s",
                smart_id, bool(result.get("smartCode")),
            )
            return result
        logger.warning(
            "InsForgeStorage smart_component_detail empty: smart_id=%s version=%s",
            smart_id, smart_version,
        )
        return {}