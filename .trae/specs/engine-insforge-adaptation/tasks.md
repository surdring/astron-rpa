# Tasks: 引擎 InsForge 适配

## Task 1: 扩展 `insforge_client.py` — 补充引擎所需方法
- [x] Task 1.1: 修正现有 API 路径 — 将 `/api/rest/` 改为 InsForge 实际路径 `/api/database/records/`（PostgREST 代理），将 `/api/storage/objects/` 改为正确路径
- [x] Task 1.2: 新增 trigger 方法 — `fetch_triggers()` 查询 `triggers` 表、`fetch_terminal_tasks()` 查询终端调度任务
- [x] Task 1.3: 新增 executor 数据获取方法 — `fetch_workflow_definition()` 查询 `workflows` 表、`fetch_project_info()` 查询 `projects` 表
- [x] Task 1.4: 新增通用 PostgREST 查询方法 — `query_table()` 支持任意表名 + 过滤条件 + 排序 + 分页
- [x] Task 1.5: 验证 — 确认 `insforge_client.py` 方法签名与 InsForge API 文档一致

## Task 2: Scheduler 适配 — 任务状态上报切换
- [x] Task 2.1: 改造 `report_task_log()` 函数 — 用 `insforge.create_execution()` / `insforge.update_execution()` 替代 `requests.post(gateway/...)`
- [x] Task 2.2: 适配返回数据格式 — 确保 `executor_run_list()` 中的 `task_executor_id` 获取逻辑兼容
- [x] Task 2.3: 验证 — 确认 scheduler 代码中所有 `requests.post(gateway/...)` 调用点已识别并适配

## Task 3: Trigger 适配 — 触发器规则管理切换
- [x] Task 3.1: 改造 `list_trigger()` — 用 `insforge.fetch_triggers()` 替代 `requests.post(gateway/api/robot/triggerTask/...)`
- [x] Task 3.2: 改造 `terminal_poll_update()` / `terminal_list_task()` — 适配 InsForge API
- [x] Task 3.3: 保留本地调度通信 — `execute_multiple_projects()` 等内部调用保持不变
- [x] Task 3.4: 验证 — 确认 trigger 代码中外部 API 调用点已适配，内部调用保持不变

## Task 4: Executor 适配 — 新增 InsForgeStorage
- [x] Task 4.1: 创建 `InsForgeStorage` 类 — 实现 `IStorage` 接口，通过 `insforge_client.py` 获取数据
- [x] Task 4.2: 实现核心方法 — `project_info()`、`process_list()`、`process_detail()`、`module_detail()`、`param_list()`、`global_list()`、`component_list()`、`pip_list()`、`smart_component_detail()`
- [x] Task 4.3: 添加存储切换逻辑 — executor 启动时根据配置选择 `HttpStorage` 或 `InsForgeStorage`
- [x] Task 4.4: 验证 — 确认 `InsForgeStorage` 返回数据结构与 `HttpStorage` 兼容

## Task 5: Browser-bridge 适配 — WebSocket → Socket.IO
- [x] Task 5.1: 添加 `python-socketio` 依赖到 browser-bridge 的 `pyproject.toml`
- [x] Task 5.2: 创建 Socket.IO 客户端封装 — 替代 `starlette.websockets.WebSocket`，支持 InsForge JWT 认证
- [x] Task 5.3: 改造 `ws_route.py` — 将 WebSocket 端点替换为 Socket.IO 事件处理
- [x] Task 5.4: 验证 — 确认 Socket.IO 连接、消息收发、心跳机制正常

## Task Dependencies

- Task 2、3、4 均依赖 Task 1（`insforge_client.py` 扩展）
- Task 2、3、4 可并行执行
- Task 5 独立于其他任务，可并行执行

## Task Priority

| 优先级 | 任务 | 说明 |
|--------|------|------|
| P1 | Task 1 | 基础设施，所有适配的前置条件 |
| P1 | Task 2 | Scheduler 状态上报是核心链路 |
| P1 | Task 4 | Executor 数据获取是执行基础 |
| P2 | Task 3 | Trigger 规则管理 |
| P2 | Task 5 | Browser-bridge 实时通信 |