# Checklist: 引擎 InsForge 适配验收清单

## Task 1: insforge_client.py 扩展
- [x] API 路径已修正为 InsForge 实际路径（`/api/database/records/` 等）
- [x] `fetch_triggers()` 方法可查询 `triggers` 表
- [x] `fetch_terminal_tasks()` 方法可查询终端调度任务
- [x] `fetch_workflow_definition()` 方法可查询 `workflows` 表
- [x] `fetch_project_info()` 方法可查询 `projects` 表
- [x] `query_table()` 通用方法支持过滤、排序、分页
- [x] 所有方法签名与 InsForge REST API 文档一致

## Task 2: Scheduler 适配
- [x] `report_task_log()` 不再使用 `requests.post(gateway/...)`
- [x] `report_task_log()` 改用 `insforge.create_execution()` / `insforge.update_execution()`
- [x] `executor_run_list()` 中 `task_executor_id` 获取逻辑兼容新返回格式
- [x] scheduler 中所有外部 API 调用点已识别并适配

## Task 3: Trigger 适配
- [x] `list_trigger()` 改用 `insforge.fetch_triggers()`
- [x] `terminal_poll_update()` 适配 InsForge API
- [x] `terminal_list_task()` 适配 InsForge API
- [x] `execute_multiple_projects()` 等内部调度调用保持不变
- [x] 返回数据结构与原网关 API 兼容（`convert()` 函数适配）

## Task 4: Executor 适配
- [x] `InsForgeStorage` 类已创建，实现 `IStorage` 接口
- [x] `project_info()` 返回数据结构与 `HttpStorage` 兼容
- [x] `process_list()` 返回数据结构与 `HttpStorage` 兼容
- [x] `process_detail()` 返回数据结构与 `HttpStorage` 兼容
- [x] `module_detail()` 返回数据结构与 `HttpStorage` 兼容
- [x] `param_list()` 返回数据结构与 `HttpStorage` 兼容
- [x] `global_list()` 返回数据结构与 `HttpStorage` 兼容
- [x] `component_list()` 返回数据结构与 `HttpStorage` 兼容
- [x] `pip_list()` 返回数据结构与 `HttpStorage` 兼容
- [x] `smart_component_detail()` 返回数据结构与 `HttpStorage` 兼容
- [x] executor 启动时可根据配置切换 `HttpStorage` / `InsForgeStorage`

## Task 5: Browser-bridge 适配
- [x] `python-socketio` 依赖已添加到 `pyproject.toml`
- [x] Socket.IO 客户端封装已创建，支持 JWT 认证
- [x] `ws_route.py` 中 WebSocket 端点已替换为 Socket.IO 事件处理
- [x] Socket.IO 连接正常（`connect` 事件）
- [x] 消息收发正常（`message` 事件）
- [x] 心跳机制正常（`ping`/`pong`）
- [x] 断线重连机制正常