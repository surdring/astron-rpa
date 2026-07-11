# 引擎 InsForge 适配规范

## Why

引擎层（scheduler、executor、trigger、browser-bridge）当前通过 `requests` 库调用本地网关（`127.0.0.1:{gateway_port}`）上的 Java 后端 REST API，而 Java 后端（robot-service、resource-service）已被废弃。需要将引擎通信链路从「本地网关 → Java 后端」切换为「InsForge API（PostgREST + Storage + Realtime）」，完成 Fix-9 的引擎侧渐进式改造。

## What Changes

### 1. 扩展 `insforge_client.py`（补充缺失方法）
- 新增 trigger 管理方法（查询触发器列表、轮询任务更新）
- 新增 executor 数据获取方法（工程信息、流程列表、流程 JSON、模块详情、参数、全局变量、组件列表、pip 依赖、智能组件）
- 修正现有方法中的 API 路径（`/api/rest/` → `/api/database/records/` 等 InsForge 实际路径）

### 2. Scheduler 适配
- `report_task_log()` 从 `requests.post(gateway/...)` 改为 `insforge.create_execution()` / `insforge.update_execution()`

### 3. Trigger 适配
- `list_trigger()` 从 `requests.post(gateway/...)` 改为通过 InsForge PostgREST 查询 `triggers` 表
- `terminal_poll_update()` / `terminal_list_task()` 适配 InsForge API
- 内部调度调用（`execute_multiple_projects` 等）保持本地通信不变

### 4. Executor 适配
- `HttpStorage` 新增 `InsForgeStorage` 实现，通过 `insforge_client.py` 替代网关 HTTP 调用
- 数据获取从 Java 后端 API 切换到 InsForge PostgREST 查询

### 5. Browser-bridge 适配
- WebSocket（`starlette.websockets`）→ InsForge Realtime（Socket.IO）

## Impact

- 受影响文件：`engine/shared/insforge_client.py`、`engine/servers/astronverse-scheduler/`、`engine/servers/astronverse-trigger/`、`engine/servers/astronverse-executor/`、`engine/servers/astronverse-browser-bridge/`
- 不影响：引擎内部组件间通信（scheduler ↔ executor 的本地 WebSocket/HTTP 调用保持不变）
- 无新增依赖：`httpx` 已在 `insforge_client.py` 中使用

## ADDED Requirements

### Requirement: InsForge Client 方法扩展
The system SHALL 扩展 `InsForgeClient` 类，补充引擎层所需的全部 API 方法。

#### Scenario: Trigger 管理
- **WHEN** trigger 需要拉取触发器列表
- **THEN** 调用 `insforge.fetch_triggers()` 通过 InsForge PostgREST 查询 `triggers` 表
- **AND** 返回与原网关 API 兼容的数据结构

#### Scenario: Executor 数据获取
- **WHEN** executor 需要获取工程流程 JSON
- **THEN** 调用 `insforge.fetch_process_detail(project_id)` 通过 InsForge PostgREST 查询
- **AND** 返回与原 `HttpStorage` 兼容的数据结构

### Requirement: Scheduler 任务状态上报
The system SHALL 将 scheduler 的任务状态上报从网关 API 切换到 InsForge。

#### Scenario: 上报执行状态
- **WHEN** 计划任务执行完成（成功/失败/取消）
- **THEN** 调用 `insforge.create_execution()` 或 `insforge.update_execution()` 写入 `executions` 表
- **AND** 通过 PostgREST 自动触发 `execution_change_trigger` 实时通知

### Requirement: Executor InsForge Storage 适配
The system SHALL 新增 `InsForgeStorage` 类实现 `IStorage` 接口，替代 `HttpStorage`。

#### Scenario: 获取流程数据
- **WHEN** executor 初始化流程
- **THEN** `InsForgeStorage` 通过 InsForge PostgREST 查询 `workflows` 表获取流程定义
- **AND** 返回与 `HttpStorage` 相同的数据结构

### Requirement: Browser-bridge Socket.IO 适配
The system SHALL 将 browser-bridge 的 WebSocket 实现从 `starlette.websockets` 迁移到 Socket.IO。

#### Scenario: 实时通信
- **WHEN** 浏览器端需要与引擎建立实时通信
- **THEN** 使用 Socket.IO 客户端连接 InsForge Realtime
- **AND** 通过 InsForge JWT token 认证

## MODIFIED Requirements

### Requirement: 引擎配置
- **修改前**：引擎通过 `gateway_port` 配置连接本地网关
- **修改后**：引擎新增 `INSFORGE_BASE_URL`、`INSFORGE_ANON_KEY` 环境变量，通过 InsForge API 通信
- **保留**：引擎内部组件间通信（scheduler ↔ executor 本地调用）不受影响