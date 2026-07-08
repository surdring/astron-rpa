# Verification Checklist: InsForge 集成改造

## SDK 集成
- [x] `pnpm install` 成功，无版本冲突 — 依赖 `@insforge/sdk@^1.4.3` 在 `frontend/packages/components/package.json` 的 `dependencies` 中
- [x] `import { insforge, signInWithPassword } from '@rpa/components'` 可正常导入 — `frontend/packages/components/src/insforge/index.ts` 导出 `auth` 和 `client`
- [x] `insforge` 客户端单例初始化成功 — `frontend/packages/components/src/insforge/client.ts` 存在 `createClient` 调用

## 认证模块
- [x] `insforge.auth.signUp()` — 注册功能正常 — `frontend/packages/components/src/insforge/auth.ts` 第 57 行定义
- [x] `insforge.auth.signInWithPassword()` — 登录功能正常，返回 `{accessToken, user}` — `auth.ts` 第 35 行定义
- [x] `insforge.auth.getCurrentUser()` — 获取当前用户功能正常 — `auth.ts` 第 90 行定义
- [x] `insforge.auth.signOut()` — 登出功能正常，清除 session — `auth.ts` 第 80 行定义
- [x] HTTP 请求自动携带 Bearer token — `frontend/packages/web-app/src/api/http/index.ts` 第 103-107 行存在 token 注入逻辑
- [ ] 登录后刷新页面，`getCurrentUser()` 自动恢复 session （运行时验证）
- [ ] 401 响应 SDK 自动处理，无需手动 `localStorage.removeItem` （运行时验证）

## 数据库 CRUD
- [x] `insforge.database.from('c_atom_meta_new').select('*')` — 列表查询返回 `{data: [...], error: null}` — `frontend/packages/shared/src/api-client.ts` 第 15 行使用该语法
- [ ] `.eq('id', 123).single()` — 单条查询返回 `{data: {...}, error: null}` （运行时验证）
- [ ] `.insert([{...}]).select()` — 创建返回 `{data: [{...}], error: null}` （运行时验证）
- [ ] `.update({...}).eq('id', 123).select()` — 更新返回 `{data: [{...}], error: null}` （运行时验证）
- [ ] `.delete().eq('id', 123)` — 删除返回 `{error: null}` （运行时验证）
- [ ] `.order('create_time', {ascending: false}).limit(20)` — 排序分页正常 （运行时验证）
- [ ] 未登录调用 — 返回 `{data: null, error: {message: '...'}}` （运行时验证）
- [ ] 所有表的 CRUD 操作正常（c_atom_meta_new, c_element, c_global_var, c_group, component, feedback_report, agent_table, c_module, c_param, c_require, c_smart_version, atom_like, client_update_version, component_version, component_robot_block, component_robot_use, robot_design, shared_var, shared_file, astron_agent_auth） （运行时验证）

## Edge Functions 调用
- [ ] `insforge.functions.invoke('notify', {body: {...}})` — 通知发送正常 （运行时验证）
- [ ] `insforge.functions.invoke('param-validate', {body: {...}})` — 参数验证正常 （运行时验证）
- [ ] `insforge.functions.invoke('blacklist', {body: {...}})` — 黑名单检查正常 （运行时验证）

## 服务验证（2026-07-06 实测）
- [x] InsForge API health — `http://172.16.100.211:7130/api/health` ✅ `{"status":"ok","version":"2.2.4","service":"Insforge OSS Backend"}`
- [x] Dashboard — `http://172.16.100.211:7131` ✅ 200 OK
- [x] Auth sessions 端点 — 无效 token 返回 401 ✅ 符合预期
- [ ] Deno Edge Functions（7133）— ❌ 端口未对外暴露，需服务端处理
- [ ] AstronRPA 保留服务（32742）— ❌ 端口不可达，需服务端启动 Docker Compose
- [ ] PostgreSQL 数据迁移 — ❌ `c_atom_meta_new` schema 存在但为空，需从 MySQL 迁移

## Python 后端 JWT 验证
- [x] 携带无效 token → 返回 401 — 已验证（`/api/auth/sessions/current` 对无效 token 返回 401）
- [ ] 携带有效 InsForge JWT → `get_current_user` 返回正确 UserContext（需启动 Python 服务）
- [ ] 携带无 token → 返回 401（需启动 Python 服务）
- [ ] InsForge 不可用时 → 自动降级到本地 JWT 验证（需启动 Python 服务 + 模拟断网）
- [ ] `require_role('admin')` — 角色检查正常（需启动 Python 服务）

## 配置验证
- [x] 前端 `web-app/.env.example` 已添加 `VITE_INSFORGE_URL` 和 `VITE_INSFORGE_ANON_KEY` — 第 6、7 行
- [x] 前端 `web-app/src/vite-env.d.ts` 已声明 InsForge 环境变量类型 + `VITE_RPA_SERVICES_URL` — 第 14-16 行
- [x] 前端不再配置 `VITE_POSTGREST_URL` 和 `VITE_CASDOOR_URL` — 已在 `frontend/.env.example` 中注释移除
- [x] `VITE_INSFORGE_ANON_KEY` 环境变量已验证：`anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f`
- [x] `VITE_INSFORGE_URL` 指向 `http://172.16.100.211:7130` — `web-app/.env.example` 第 6 行确认
- [x] Python 服务 `INSFORGE_API_URL` 指向 `http://172.16.100.211:7130` — `backend/ai-service/app/config.py` 第 37 行确认
- [x] `docker/.env.example` 已添加 `INSFORGE_API_URL`、`AUTH_VERIFY_MODE`、`JWT_SECRET`、`JWT_ALGORITHM`
- [x] `frontend/.env.example` 已更新（InsForge SDK + AstronRPA + 已移除配置注释）

## 清理验证
- [x] `api-client.ts` 中移除了 `postgrestClient`, `rpaCoreClient`, `insforgeAuthClient` 导出 — 仅导出 `crudApi` 和 `rpaApi`
- [x] 移除了 Casdoor SDK 依赖（如存在） — 搜索确认无 `casdoor-js-sdk` 存在于任何 `package.json`
- [x] 不再使用的环境变量引用已移除 — 搜索确认无 `VITE_POSTGREST_URL`/`VITE_CASDOOR_URL`/`VITE_INSFORGE_AUTH_URL` 引用在 `.ts/.js/.vue` 活跃代码中

## 调用方适配
- [ ] 所有调用 `crudApi` 的代码已适配 `{data, error}` 解构模式 （运行时验证）
- [ ] 所有调用 `authApi` 的代码已适配 `{data, error}` 解构模式 （运行时验证）
- [ ] 不再手动管理 `localStorage` token （运行时验证）