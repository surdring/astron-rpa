"""Enterprise module"""

import json
import os
import urllib.parse
import uuid
from json import JSONDecodeError
from pathlib import Path
from typing import Optional

import requests
from astronverse.actionlib import AtomicFormType, AtomicFormTypeMeta
from astronverse.actionlib.atomic import atomicMg
from astronverse.actionlib.types import PATH, Ciphertext
from astronverse.baseline.logger.logger import logger
from astronverse.enterprise.error import *
from engine.shared.insforge_client import insforge

SHARED_FILES_BUCKET = "rpa-shared"


def _shared_file_storage_path(user_id: Optional[str], file_name: str) -> str:
    """生成 Storage 中的唯一路径。"""
    prefix = user_id or "common"
    return "shared/{}/{}-{}".format(prefix, uuid.uuid4().hex[:8], file_name)


def _current_user_id() -> Optional[str]:
    """从 InsForge session 获取当前 user_id（仅用于日志/路径前缀）。"""
    try:
        resp = insforge.query_table("auth.users", select="id", single=True)
        if resp.status_code == 200:
            return resp.json().get("id")
    except Exception:
        pass
    return None


def get_remote_var_key() -> str:
    """获取当前用户的共享变量主密钥。"""
    resp = insforge.query_table(
        "shared_variables",
        select="var_key",
        filters={"var_name": "__master_key__"},
        single=True,
    )
    logger.info("get_remote_var_key response: status=%s", resp.status_code)
    if resp.status_code == 200:
        data = resp.json()
        return data.get("var_key", "")
    return ""


def get_remote_var_value(key: str) -> dict:
    """根据 key 获取共享变量值。"""
    resp = insforge.query_table(
        "shared_variables",
        select="sub_vars,encrypt",
        filters={"var_key": key},
        single=True,
    )
    logger.info("get_remote_var_value response: key=%s status=%s", key, resp.status_code)
    if resp.status_code == 200:
        data = resp.json()
        return {
            "subVarList": data.get("sub_vars", []),
            "encrypt": data.get("encrypt", False),
        }
    return None


class Enterprise:
    """Enterprise class"""

    @staticmethod
    @atomicMg.atomic(
        "Enterprise",
        inputList=[
            atomicMg.param(
                "file_path",
                formType=AtomicFormTypeMeta(
                    type=AtomicFormType.INPUT_VARIABLE_PYTHON_FILE.value,
                    params={"filters": [], "file_type": "file"},
                ),
            ),
        ],
        outputList=[atomicMg.param("upload_result", types="Str")],
    )
    def upload_to_sharefolder(file_path: PATH = ""):
        """Upload file to InsForge Storage and record metadata in shared_files table."""
        logger.info("upload_to_sharefolder start: path=%s", file_path)
        if not (os.path.exists(file_path) and os.path.isfile(file_path)):
            return BaseException(PATH_INVALID_FORMAT.format(file_path), "请重新输入正确的文件路径")

        try:
            file_name = os.path.basename(file_path)
            user_id = _current_user_id()
            storage_path = _shared_file_storage_path(user_id, file_name)

            # 1. 上传到 InsForge Storage
            logger.info(
                "upload_to_sharefolder uploading: bucket=%s path=%s local=%s",
                SHARED_FILES_BUCKET, storage_path, file_path,
            )
            upload_resp = insforge.upload_file(SHARED_FILES_BUCKET, storage_path, file_path)
            logger.info("upload_to_sharefolder upload response: status=%s", upload_resp.status_code)
            if upload_resp.status_code not in (200, 201):
                raise BaseException(
                    FILE_UPLOAD_FAILED_FORMAT.format(upload_resp.text),
                    "文件上传失败，请检查 Storage 服务！",
                )

            # 2. 写入 shared_files 表
            file_size = os.path.getsize(file_path)
            file_ext = os.path.splitext(file_name)[1].lstrip(".").lower()
            record = {
                "file_name": file_name,
                "file_path": storage_path,
                "file_size": file_size,
                "file_type": file_ext,
                "storage_bucket": SHARED_FILES_BUCKET,
                "tags": [],
            }
            logger.info("upload_to_sharefolder insert record: %s", record)
            ins_resp = insforge.insert_record("shared_files", record)
            logger.info("upload_to_sharefolder insert response: status=%s", ins_resp.status_code)
            if ins_resp.status_code not in (200, 201):
                raise BaseException(
                    FILE_UPLOAD_FAILED_FORMAT.format(ins_resp.text),
                    "文件已上传但元数据写入失败！",
                )

            return "上传成功"
        except Exception as e:
            logger.exception("upload_to_sharefolder error: %s", e)
            raise BaseException(FILE_UPLOAD_FAILED_FORMAT.format(e), "")

    @staticmethod
    @atomicMg.atomic(
        "Enterprise",
        inputList=[
            atomicMg.param(
                "file_path",
                formType=AtomicFormTypeMeta(type=AtomicFormType.REMOTEFOLDERS.value),
            ),
            atomicMg.param(
                "save_folder",
                formType=AtomicFormTypeMeta(
                    type=AtomicFormType.INPUT_VARIABLE_PYTHON_FILE.value,
                    params={"filters": [], "file_type": "folder"},
                ),
            ),
        ],
        outputList=[atomicMg.param("download_result", types="Str")],
    )
    def download_from_sharefolder(file_path: str, save_folder: PATH = ""):
        """Download file from InsForge Storage by shared_files id or storage path."""
        logger.info("download_from_sharefolder start: file_path=%s save_folder=%s", file_path, save_folder)
        if not Path(save_folder).is_absolute():
            raise Exception("文件夹路径错误：{} 不是绝对路径".format(save_folder))
        if not os.path.exists(save_folder):
            os.makedirs(save_folder)
        if not os.path.isdir(save_folder):
            raise Exception("文件夹路径错误：{} 不是文件夹路径".format(save_folder))

        try:
            # file_path 可能是 shared_files.id（UUID）或 storage_path
            storage_path = file_path
            file_name = None
            candidate = str(file_path).strip()
            if len(candidate) == 36 and candidate.count("-") == 4:
                resp = insforge.query_table(
                    "shared_files",
                    select="file_name,file_path",
                    filters={"id": candidate},
                    single=True,
                )
                logger.info("download_from_sharefolder query record: status=%s", resp.status_code)
                if resp.status_code == 200:
                    meta = resp.json()
                    storage_path = meta.get("file_path")
                    file_name = meta.get("file_name")

            if not storage_path:
                raise Exception("未找到对应的共享文件")

            if not file_name:
                file_name = urllib.parse.unquote(os.path.basename(storage_path))

            save_path = os.path.join(save_folder, file_name)
            if os.path.exists(save_path):
                base, ext = os.path.splitext(file_name)
                count = 1
                while os.path.exists(save_path):
                    new_filename = "{}({}){}".format(base, count, ext)
                    save_path = os.path.join(save_folder, new_filename)
                    count += 1

            logger.info(
                "download_from_sharefolder downloading: bucket=%s path=%s -> %s",
                SHARED_FILES_BUCKET, storage_path, save_path,
            )
            insforge.download_file(SHARED_FILES_BUCKET, storage_path, save_path)
            logger.info("download_from_sharefolder success: %s", save_path)
            return save_path
        except Exception as e:
            logger.exception("download_from_sharefolder error: %s", e)
            raise BaseException(FILE_DOWNLOAD_FAILED_FORMAT.format(e), "")

    # 获取远程变量
    @staticmethod
    @atomicMg.atomic(
        "Enterprise",
        inputList=[
            atomicMg.param(
                "shared_variable",
                types="Str",
                formType=AtomicFormTypeMeta(type=AtomicFormType.REMOTEPARAMS.value),
            ),
        ],
        outputList=[
            atomicMg.param("variable_data", types="Dict"),
        ],
    )
    def get_shared_variable(shared_variable: str):
        """
        Get shared variable from remote
        """
        key = get_remote_var_key()
        value = get_remote_var_value(shared_variable)

        if not value:
            return None

        sub_var_list = value.get("subVarList", [])
        if not sub_var_list:
            return None
        res = {}
        for sub_var in sub_var_list:
            if sub_var["encrypt"]:
                c = Ciphertext(sub_var.get("varValue"))
                c.set_key(key)
                res[sub_var.get("varName")] = c.decrypt()
            else:
                res[sub_var.get("varName")] = sub_var.get("varValue")
        return res
