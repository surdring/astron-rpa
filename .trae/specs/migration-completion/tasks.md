# Tasks: 迁移收尾

## 服务端预置条件（需 infra 权限，在 172.16.100.211 上执行）

- [ ] Task S1: 启动 AstronRPA 保留服务
  - [ ] 在 172.16.100.211 上执行 `docker compose up -d` 启动 robot-service、resource-service、ai-service、openapi-service
  - [ ] 验证端口可达：`curl http://localhost:32742/api/robot/robots` 返回 200
- [ ] Task S2: 暴露 Deno Edge Functions 端口 7133
  - [ ] 检查 Deno 容器运行状态：`docker ps | grep deno`
  - [ ] 确保 7133 端口对外暴露
  - [ ] 验证：`curl http://172.16.100.211:7133/functions/v1/notify`
- [ ] Task S3: PostgreSQL 数据迁移（MySQL → PostgreSQL）
  - [ ] 使用 pgloader 将 MySQL 数据迁移到 PostgreSQL
  - [ ] 验证 20 张表数据完整
  - [ ] 验证 `crudApi.atomMeta.list({limit: 5})` 返回数据

## 页面 API 迁移

- [x] Task P1a: 市场模块（Market）只读查询迁移 — 15 文件 ✅
  - [x] `useCardsApp.ts` — `getAllClassification`/`getAppCards`/`marketUserList` → `rpaApi.market.*`
  - [x] `useAppDetail.ts` — `getAllClassification`/`getAppDetails` → `rpaApi.market.*`
  - [x] `useApplicationTable.tsx` — `applicationList`/`cancelApplication`/`deleteApplication` → `rpaApi.market.*`
  - [x] `useCardsShow.ts` — `canAchieveApp`/`deleteApp`/`getPushHistoryVersions`/`useApplication` → `rpaApi.market.*`
  - [x] `useRobotUpdate.ts` — `getAppUpdateStatus` → `rpaApi.market.*`、`getRobotUpdateStatus` → `rpaApi.robots.*`
  - [x] `DeployRobotModal.vue` — `deployApp`/`unDeployUserList` → `rpaApi.market.*`
  - [x] `VersionPushModal.vue` — `getPushHistoryVersions`/`pushApp` → `rpaApi.market.*`
  - [x] `MarketAchieveModal.vue` — `getAppDetails`/`obtainApp` → `rpaApi.market.*`
  - [x] `DeployedAccountsTable.vue` — `getDeployedAccounts` → `rpaApi.market.*`
  - [x] `ShareRobotModal.vue` — `releaseApplication` → `rpaApi.market.*`、`shareRobotToMarket` → `rpaApi.projects.*`
  - [x] `useBaseInfo.ts` — `teamInfo`/`editTeamInfo` → `rpaApi.market.*`
  - [x] `useTeamUserTable.tsx` — `marketUserList`/`inviteMarketUser`/`setUserRole`/`removeUserRole`/`leaveTeamMarket`/`dissolveTeamMarket` → `rpaApi.market.*`
  - [x] `useInviteUser.tsx` — `generateInviteLink`/`getInviteUser`/`getTransferUser`/`resetInviteLink` → `rpaApi.market.*`
  - [x] `useCommonOperate.tsx` — `releaseCheck`/`releaseCheckWithPublish` → `rpaApi.market.*`
  - [x] `useAppFileDownload.ts` — `appendixDownload`/`cancelAppendixDownload` → `rpaApi.market.*`

- [x] Task P1b: 组件/项目管理只读迁移 — 8 文件 ✅
  - [x] `ComponentManagement/index.tsx` — `getComponentList` → `rpaApi.projects.getComponentList`
  - [x] `ComponentManagement/useOpetate.tsx` — `checkComponentName`/`getComponentDetail` → `rpaApi.projects.*`
  - [x] `ComponentManagement.vue` — `getDefaultComponentName`/`createComponent` → `rpaApi.projects.*`
  - [x] `ProjectManagement/useProjectTableOption.tsx` — `getDesignList` → `rpaApi.projects.getDesignList`
  - [x] `ProjectManagement/useProjectOperate.tsx` — `getTeams` → `rpaApi.market.*`、`checkProjectNum` → `rpaApi.projects.*`
  - [x] `ProjectManagement.vue` — `createProject`/`getDefaultName` → `rpaApi.projects.*`
  - [x] `RenameModal.vue` — `rename`/`renameCheck` → `rpaApi.projects.*`
  - [x] `CopyModal.vue` — `createCopy` → `rpaApi.projects.createCopy`

- [x] Task P1c: Robot/Record/Atom 只读迁移 — 9/10 文件 ✅
  - [x] `useRobotOperation.ts` — `getRobotLst`/`deleteRobot`/`isRobotInTask`/`updateRobot` → `rpaApi.robots.*`
  - [x] `CompDetail.vue` — `getComponentDetail`/`removeComponent`/`updateComponent` → `rpaApi.robots.*`
  - [x] `McpConfigModal/index.vue` — `getRobotEnglishName`/`getRobotLastIsExternalCall` → `rpaApi.robots.*`、`getConfigParams` → `crudApi.param.all()`
  - [x] `AIWorkFlow.vue` — `getWorkflowList` → `rpaApi.openapi.getWorkflowList`
  - [x] `useRecordOperation.tsx` — `getExecuteLst`/`delExecute` → `rpaApi.records.*`
  - [x] `useTaskRecordOperation.tsx` (TaskRecordTable) — `delTaskExecute`/`getTaskExecuteLst` → `rpaApi.records.*`；保留 `checkVideoPaths` → `@/api/setting`
  - [x] `useTaskRecordOperation.tsx` (TaskRecordModal) — `getTaskExecuteLst` → `rpaApi.records.getTaskExecuteLst`
  - [ ] `AtomTree.vue` — 保留旧导入（`crudApi.atomLike` 不含 `addFavorite`/`removeFavorite` 方法，无等效 rpaApi 方法）
  - [x] `useFileManageTable.tsx` — `getRemoteFiles` → `crudApi.sharedFile.page`
  - [x] `ProcessParam.vue` — `getConfigParams` → `crudApi.param.all`

- [x] Task P2: 单一实体 CRUD 迁移 — 6 文件 ✅
  - [x] `useTaskEdit.ts` — `getTaskInfo`/`insertTask`/`updateTask`/`isNameCopy` → `rpaApi.tasks.*`
  - [x] `useTaskOperation.ts` — `getScheduleLst`/`deleteTask`/`enableTask`/`manualTrigger`/`taskFutureTime` → `rpaApi.tasks.*`
  - [x] `useQueueOperation.ts` — `getTaskQueueList`/`removeTaskQueue` → `rpaApi.tasks.*`
  - [x] `TimeConfig.vue` — `taskFutureTimeNoCreate` → `rpaApi.tasks.taskFutureTimeNoCreate`
  - [x] `MailConfig.vue` — `apiGetMailList` → `rpaApi.mail.list`
  - [x] `useVersionManage.ts` — `getVersionLst`/`versionEnable`/`versionRecover` → `rpaApi.versions.*`

- [x] Task P3: 复杂多表操作 — 保留旧 HTTP（`@/api/engine`、`@/api/resource`、`@/api/contract`），不做迁移 ✅

- [x] Task P4: 特殊处理 — WebSocket（`@/api/ws`）、SSE、picking 服务保留旧实现 ✅

- [x] Task P5a: 非 view 文件 API 迁移 — 28 个文件完成迁移 ✅
  - `stores/useMarketStore.ts` — `getTeams` → `rpaApi.market.getTeams()`
  - `components/MarketSiderMenu.vue` — `checkMarketNum` → `rpaApi.market.checkMarketNum()`
  - `components/CreateTeamMarketModal/TeamMarketModal.vue` — `newTeam` → `rpaApi.market.newTeam()`
  - `components/MesssageTip/hooks/useMessageTip.ts` — 6 个 market 函数 → `rpaApi.market.*()`
  - `components/PublishComponents/Publish.vue` — `releaseWithPublish`/`publishRobot` → `rpaApi.*()`
  - `components/PublishComponents/PublishModal.vue` — `getRobotLastVersion` → `rpaApi.robots.*()`
  - `components/PublishComponents/BasicForm.vue` — `checkRobotName` → `rpaApi.robots.*()`
  - `components/ComponentPublish/PublishModal.vue` — 3 个 project 函数 → `rpaApi.projects.*()`
  - `components/ComponentPublish/PublishDetail.vue` — `getComponentDetail` → `rpaApi.projects.*()`
  - `components/ComponentManage/Panel.vue` — 3 个 robot 函数 → `rpaApi.robots.*()`
  - `components/ComponentManage/Index.vue` — `getComponentManageList` → `rpaApi.robots.*()`
  - `components/RobotDetail/ActuatorModal/RecordContent.vue` — `getRobotRecordOverview` → `rpaApi.robots.*()`
  - `components/RobotDetail/DesignerModal/basicStore.ts` — 2 个 robot 函数 → `rpaApi.robots.*()`
  - `components/RobotDetail/ActuatorModal/basicStore.ts` — `getRobotBasicInfo` → `rpaApi.robots.*()`
  - `components/RobotConfigTaskModal/index.tsx` — `saveRobotConfigParamValue` → `rpaApi.robots.*()`
  - `stores/useUserStore.ts` — `taskNotify` → `rpaApi.tasks.*()`
  - `components/BackendReaction/Index.vue` — 2 个 task 函数 → `rpaApi.tasks.*()`
  - `components/QueueConfigModal/Index.vue` — 2 个 task 函数 → `rpaApi.tasks.*()`
  - `components/RobotSelectModal/Index.vue` — `getRobotList` → `rpaApi.tasks.*()`
  - `components/HeaderControl/UserInfo.vue` — `taskNotify` → `rpaApi.tasks.*()`
  - `components/MailModal/MailListModal.vue` — 2 个 mail 函数 → `rpaApi.mail.*()`
  - `components/MailModal/Index.vue` — 2 个 mail 函数 → `rpaApi.mail.*()`
  - `components/SmartComponent/views/Preview.vue` — `codeToMeta` → `rpaApi.component.*()`
  - `components/SmartComponent/views/Chat.vue` — 2 个 component 函数 → `rpaApi.component.*()`
  - `components/SmartComponent/hooks/useSmartCompService.ts` — `saveSmartComp` → `rpaApi.component.*()`
  - `components/SmartComponent/hooks/useChatContext.tsx` — `codeToMeta` → `rpaApi.component.*()`
  - `corobot/legacy/ProjectDocument.ts` — `getSmartComp` → `rpaApi.component.*()`
  - `utils/customComponent.ts` — `getComponentDetail`/`addComponentUse`/`deleteComponentUse`/`getEditComponentDetail` → `rpaApi.*()`；保留 `getConfigParams` → `@/api/atom`（无 rpaApi 等效方法）

- [x] Task P5b: 可删除的旧 API 模块 ✅
  - [x] `@/api/record.ts` — 已删除（所有引用已迁移，外部零引用）✅

- [x] Task P5c: 保留的旧 API 模块（仍有引用或 P3/P4 保留）
  - `@/api/setting.ts` — 8 个文件引用（useUserSetting、useMsgNotify、LogWindow、registerHotkeys、apiKeyManage 4 组件），暂不可删
  - `@/api/atom.ts` — 6 个文件引用（useProcessStore、useSharedData、AtomTree.vue、RobotConfigTaskModal、corobot/service.ts、customComponent.ts），暂不可删
  - `@/api/contract.ts` — 1 个文件引用（useRenderFormType.ts），保留
  - `@/api/engine.ts` — P3 保留（引擎交互）
  - `@/api/resource.ts` — P3 保留（资源管理）
  - `@/api/pick.ts` — P4 保留（picking 服务）
  - `@/api/ws.ts` — P4 保留（WebSocket）

## 编译验证

- [x] Task V0: TypeScript 编译验证 ✅
  - [x] `pnpm build` shared 包成功（修复 `insforge`/`crudApi` 缺少显式类型注解错误）
  - [x] `vue-tsc --noEmit` 零迁移相关错误 ✅
  - [x] 修复 5 个迁移后编译错误（PublishModal、useMessageTip、Publish.vue、RobotConfigTaskModal、customComponent.ts）

## 运行时验证

- [x] Task V1: `pnpm dev:web` 启动成功，Vite 正常加载（http://localhost:1420/）✅
- [ ] Task V2: 登录流程验证
  - [ ] 浏览器 console 执行 `import('@rpa/components').then(m => m.insforge.auth.signInWithPassword({...}))` 返回 `{data: {user, session}, error: null}`
  - [ ] 刷新页面，session 自动恢复（`getCurrentUser()` 有返回）
- [ ] Task V3: CRUD 操作验证（需 PostgreSQL 数据迁移完成）
  - [ ] 列表查询：`crudApi.atomMeta.list({limit: 20})` 返回数据
  - [ ] 单条查询：`crudApi.atomMeta.get(1)` 返回数据
  - [ ] 创建/更新/删除：基本 CRUD 正常
- [ ] Task V4: 页面级回归 — 逐个打开 P1/P2 迁移页面，确认数据展示和操作正常

## 文档更新

- [ ] Task D1: 更新 `后端轻量化改造-InsForge规范方案.md` 总结和对比表

## Task Dependencies

- Task S1-S3（服务端）是 V2-V4 的前提条件
- Task P1a、P1b、P1c 可并行执行 — ✅ 已完成
- Task P2 依赖 P1 — ✅ 已完成
- Task P5（清理）依赖所有 P1-P2 任务完成 — ⚠️ 仅 record.ts 可删，其余需后续批次处理
- Task V1-V4（运行时验证）依赖 S1-S3 + P1-P4 完成