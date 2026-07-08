# Checklist: 迁移收尾验收清单

## 服务端（需 infra 权限，在 172.16.100.211 上执行）
- [ ] AstronRPA 保留服务已启动（32742 端口可达）
- [ ] Deno Edge Functions 端口 7133 已暴露
- [ ] PostgreSQL 数据已从 MySQL 迁移完成，`crudApi` 查询返回数据

## P1a: 市场模块迁移（15 文件）✅ 全部完成
- [x] `useCardsApp.ts` — `getAllClassification`/`getAppCards` 替换为 `rpaApi.market.*`
- [x] `useAppDetail.ts` — `getAllClassification`/`getAppDetails` 替换为 `rpaApi.market.*`
- [x] `useApplicationTable.tsx` — `applicationList` 替换为 `rpaApi.market.*`
- [x] `useCardsShow.ts` — `canAchieveApp`/`getPushHistoryVersions` 替换为 `rpaApi.market.*`
- [x] `useRobotUpdate.ts` — `getAppUpdateStatus`/`getRobotUpdateStatus` 替换为 `rpaApi.*`
- [x] `DeployRobotModal.vue` — `deployApp`/`unDeployUserList` 替换为 `rpaApi.market.*`
- [x] `VersionPushModal.vue` — `getPushHistoryVersions`/`pushApp` 替换为 `rpaApi.market.*`
- [x] `MarketAchieveModal.vue` — `getAppDetails`/`obtainApp` 替换为 `rpaApi.market.*`
- [x] `DeployedAccountsTable.vue` — `getDeployedAccounts` 替换为 `rpaApi.market.*`
- [x] `ShareRobotModal.vue` — `releaseApplication`/`shareRobotToMarket` 替换为 `rpaApi.*`
- [x] `useBaseInfo.ts` — `teamInfo`/`editTeamInfo` 替换为 `rpaApi.market.*`
- [x] `useTeamUserTable.tsx` — `marketUserList`/`inviteMarketUser` 替换为 `rpaApi.market.*`
- [x] `useInviteUser.tsx` — `generateInviteLink`/`getInviteUser` 替换为 `rpaApi.market.*`
- [x] `useCommonOperate.tsx` — `releaseCheck` 替换为 `rpaApi.market.*`
- [x] `useAppFileDownload.ts` — `appendixDownload`/`cancelAppendixDownload` 替换为 `rpaApi.market.*`

## P1b: 组件/项目管理迁移（8 文件）✅ 全部完成
- [x] `ComponentManagement/index.tsx` — `getComponentList` 替换为 `rpaApi.projects.*`
- [x] `ComponentManagement/useOpetate.tsx` — `checkComponentName`/`getComponentDetail` 替换为 `rpaApi.projects.*`
- [x] `ComponentManagement.vue` — `getDefaultComponentName`/`createComponent` 替换为 `rpaApi.projects.*`
- [x] `ProjectManagement/useProjectTableOption.tsx` — `getDesignList` 替换为 `rpaApi.projects.*`
- [x] `ProjectManagement/useProjectOperate.tsx` — `getTeams`/`checkProjectNum` 替换为 `rpaApi.*`
- [x] `ProjectManagement.vue` — `createProject`/`getDefaultName` 替换为 `rpaApi.projects.*`
- [x] `RenameModal.vue` — `rename`/`renameCheck` 替换为 `rpaApi.projects.*`
- [x] `CopyModal.vue` — `createCopy` 替换为 `rpaApi.projects.*`

## P1c: Robot/Record/Atom 迁移（10 文件）✅ 9/10 完成
- [x] `useRobotOperation.ts` — `getRobotLst`/`deleteRobot`/`updateRobot` 替换为 `rpaApi.robots.*`
- [x] `CompDetail.vue` — `getComponentDetail`(robot)/`updateComponent` 替换为 `rpaApi.robots.*`
- [x] `McpConfigModal/index.vue` — `getRobotEnglishName`/`getRobotLastIsExternalCall` 替换为 `rpaApi.robots.*`
- [x] `AIWorkFlow.vue` — `getWorkflowList` 替换为 `rpaApi.openapi.*`
- [x] `useRecordOperation.tsx` — `getExecuteLst`/`delExecute` 替换为 `rpaApi.records.*`
- [x] `useTaskRecordOperation.tsx` (TaskRecordTable) — `getTaskExecuteLst` 替换为 `rpaApi.records.*`
- [x] `useTaskRecordOperation.tsx` (TaskRecordModal) — `getTaskExecuteLst` 替换为 `rpaApi.records.*`
- [ ] `AtomTree.vue` — 保留旧导入（`addFavorite`/`removeFavorite` 无 rpaApi 等效方法）
- [x] `useFileManageTable.tsx` — `getRemoteFiles` 替换为 `crudApi.sharedFile.*`
- [x] `ProcessParam.vue` — `getConfigParams` 替换为 `crudApi.param.*`

## P2: CRUD 迁移（6 文件）✅ 全部完成
- [x] `useTaskEdit.ts` — `getTaskInfo`/`insertTask`/`updateTask`/`isNameCopy` 替换为 `rpaApi.tasks.*`
- [x] `useTaskOperation.ts` — `getScheduleLst`/`deleteTask`/`enableTask`/`manualTrigger` 替换为 `rpaApi.tasks.*`
- [x] `useQueueOperation.ts` — `getTaskQueueList`/`removeTaskQueue` 替换为 `rpaApi.tasks.*`
- [x] `TimeConfig.vue` — `taskFutureTimeNoCreate` 替换为 `rpaApi.tasks.*`
- [x] `MailConfig.vue` — `apiGetMailList` 替换为 `rpaApi.mail.*`
- [x] `useVersionManage.ts` — `getVersionLst`/`versionEnable`/`versionRecover` 替换为 `rpaApi.versions.*`

## P3/P4: 保留旧实现 ✅ 确认
- [x] 引擎交互（`@/api/engine`）保留旧 HTTP，未做迁移
- [x] 资源管理（`@/api/resource`）保留旧 HTTP，未做迁移
- [x] WebSocket（`@/api/ws`）保留旧实现，未做迁移
- [x] picking 服务（`@/api/pick`）保留旧实现，未做迁移

## P5: 非 view 文件迁移（28 文件）✅ 完成
- [x] 28 个非 view 组件/store/工具文件的旧 API 引用已迁移到 `rpaApi`
- [x] `@/api/record.ts` 已删除（无外部引用）
- [x] 保留的旧 API 模块（有引用或 P3/P4 保留）：`setting.ts`、`atom.ts`、`contract.ts`、`engine.ts`、`resource.ts`、`pick.ts`、`ws.ts`

## 编译验证 ✅ 通过
- [x] `pnpm build` shared 包成功（修复 `insforge`/`crudApi` 类型注解错误）
- [x] `vue-tsc --noEmit` 零迁移相关错误
- [x] 修复 5 个迁移后编译错误

## 运行时验证（需服务端就绪 + 浏览器环境）
- [ ] 登录/登出/session 恢复正常
- [ ] 401 由 SDK 自动处理，无 `localStorage.removeItem` 调用
- [ ] 市场页面数据展示正常
- [ ] 组件/项目管理页面数据展示正常
- [ ] Robot 管理页面数据展示正常
- [ ] 执行记录页面数据展示正常
- [ ] 计划任务 CRUD 正常（含写操作）
- [ ] 版本管理页面数据展示正常
- [ ] 日志窗口 WebSocket 连接正常

## 文档
- [ ] `后端轻量化改造-InsForge规范方案.md` 总结和对比表已更新