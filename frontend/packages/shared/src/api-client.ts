import { createClient } from '@insforge/sdk'
import type { InsForgeClient } from '@insforge/sdk'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

// ======== 后端服务地址配置 ========
const INSFORGE_BASE_URL = import.meta.env.VITE_INSFORGE_URL || 'http://172.16.100.211:7130'
const INSFORGE_ANON_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY || 'anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f'
const AI_SERVICE_URL = import.meta.env.VITE_AI_SERVICE_URL || 'http://172.16.100.211:8001'

// ======== InsForge SDK ========

export const insforge: InsForgeClient = createClient({
  baseUrl: INSFORGE_BASE_URL,
  anonKey: INSFORGE_ANON_KEY,
})

// ======== HTTP 客户端（按后端服务拆分） ========

/** ai-service（Python FastAPI，仍在运行 :8001） */
const aiServiceClient: AxiosInstance = axios.create({
  baseURL: AI_SERVICE_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
})

/** 旧网关兼容客户端（Docker 已停用，保留用于渐进式迁移提示） */
const OLD_GATEWAY_URL = import.meta.env.VITE_RPA_SERVICES_URL || 'http://172.16.100.211:7130'
const rpaServicesClient: AxiosInstance = axios.create({
  baseURL: OLD_GATEWAY_URL,
  timeout: 20000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

// ======== 日志工具 ========

function logCrudCall(table: string, method: string, ...args: unknown[]) {
  const brief = args
    .map((a) => {
      if (a && typeof a === 'object')
        return JSON.stringify(a).slice(0, 120)
      return String(a)
    })
    .join(', ')
  console.log(`[crudApi] ${table}.${method}(${brief})`)
}

function logCrudResult<T>(table: string, method: string, promise: PromiseLike<T>): Promise<T> {
  return Promise.resolve(promise).then(
    (res) => {
      const hasError = res && typeof res === 'object' && 'error' in res && res.error
      if (hasError) {
        console.warn(`[crudApi] ${table}.${method} FAILED`, (res as { error: unknown }).error)
      }
      else {
        const data = res && typeof res === 'object' && 'data' in res ? (res as { data: unknown }).data : res
        const dataBrief = Array.isArray(data) ? `[${data.length} rows]` : JSON.stringify(data).slice(0, 80)
        console.log(`[crudApi] ${table}.${method} OK`, dataBrief)
      }
      return res
    },
    (err) => {
      console.warn(`[crudApi] ${table}.${method} EXCEPTION`, err?.message || err)
      throw err
    },
  )
}

// ======== 数据库 CRUD 工厂（含日志包装） ========

function createTableCrud(
  tableName: string,
  options?: { keyField?: string, softDelete?: boolean },
): Record<string, any> {
  const keyField = options?.keyField || 'id'
  const isSoftDelete = options?.softDelete !== false

  function log(method: string, ...args: unknown[]) {
    logCrudCall(tableName, method, ...args)
  }
  function wrap<T>(method: string, promise: PromiseLike<T>): Promise<T> {
    return logCrudResult(tableName, method, promise)
  }

  return {
    list: (params?: Record<string, unknown>) => {
      log('list', params)
      let query = insforge.database.from(tableName).select('*', params?.count ? { count: params.count as 'exact' | 'planned' | 'estimated' } : undefined)
      if (params?.order)
        query = query.order(params.order as string, params.orderOptions as Record<string, any> | undefined)
      if (params?.limit)
        query = query.limit(params.limit as number)
      if (params?.offset)
        query = query.range(params.offset as number, (params.offset as number) + (params.limit as number) - 1)
      return wrap('list', query)
    },
    get: (id: string | number) => {
      log('get', id)
      return wrap('get', insforge.database.from(tableName).select('*').eq(keyField, id).single())
    },
    create: (data: Record<string, unknown>) => {
      log('create', data)
      return wrap('create', insforge.database.from(tableName).insert([data]).select())
    },
    update: (id: string | number, data: Record<string, unknown>) => {
      log('update', id, data)
      return wrap('update', insforge.database.from(tableName).update(data).eq(keyField, id).select())
    },
    delete: (id: string | number) => {
      log('delete', id)
      const op = isSoftDelete
        ? insforge.database.from(tableName).update({ deleted: 1 }).eq(keyField, id)
        : insforge.database.from(tableName).delete().eq(keyField, id)
      return wrap('delete', op)
    },
    remove: (id: string | number) => {
      log('remove', id)
      return wrap('remove', insforge.database.from(tableName).delete().eq(keyField, id))
    },
    page: (params?: Record<string, unknown>) => {
      log('page', params)
      const pageNum = Number(params?.pageNum ?? params?.pageNo ?? params?.current ?? 1)
      const pageSize = Number(params?.pageSize ?? params?.limit ?? 20)
      const from = Math.max(pageNum - 1, 0) * pageSize
      const to = from + pageSize - 1
      return wrap(
        'page',
        insforge.database.from(tableName).select('*', { count: 'exact' }).range(from, to),
      ).then(({ data, error, count }: any) => ({
        data: {
          records: data || [],
          total: count || 0,
        },
        error,
      }))
    },
    all: (params?: Record<string, unknown>) => {
      log('all', params)
      return wrap('all', insforge.database.from(tableName).select('*'))
    },
  }
}

function authToken(): string | null {
  if (typeof sessionStorage === 'undefined')
    return null
  return sessionStorage.getItem('tokenValue')
}

// ======== Edge Functions 调用辅助 ========

async function invokeRpaFunction<T = any>(
  functionName: string,
  action: string,
  payload?: Record<string, unknown>,
): Promise<T> {
  console.log(`[rpaFn] ${functionName}:${action}`, payload ? JSON.stringify(payload).slice(0, 120) : '')
  const { data, error } = await insforge.functions.invoke(functionName, {
    body: { action, ...(payload || {}) },
  })
  if (error) {
    console.warn(`[rpaFn] ${functionName}:${action} FAILED`, error)
    throw error
  }
  // 后端 Edge Functions 返回 { code, data, message }
  const result = data as { code?: number, data?: T, message?: string } | undefined
  if (result && typeof result === 'object' && 'code' in result && result.code !== 200) {
    const err = new Error(result.message || `Edge Function ${functionName}:${action} returned code ${result.code}`)
    console.warn(`[rpaFn] ${functionName}:${action} ERROR`, err.message)
    throw err
  }
  return (result?.data ?? result) as T
}

// ======== 端点工厂（按后端服务拆分） ========

function aiEndpoint(method: 'get' | 'post' | 'put' | 'delete', url: string) {
  return (payload?: any, config?: AxiosRequestConfig) => {
    if (method === 'get' || method === 'delete')
      return aiServiceClient[method](url, { ...config, params: payload ?? config?.params })
    return aiServiceClient[method](url, payload, config)
  }
}

/** 将 InsForge SDK 查询结果包装为类 Axios 响应格式 */
async function insforgeList<T = any>(table: string, params?: Record<string, any>): Promise<{ data: T[], status: number }> {
  let query = insforge.database.from(table).select('*')
  if (params?.order)
    query = query.order(params.order as string, params.orderOptions as any)
  if (params?.limit)
    query = query.limit(params.limit as number)
  if (params?.offset)
    query = query.range(params.offset as number, (params.offset as number) + (params.limit as number) - 1)
  const { data, error } = await query
  if (error)
    throw error
  return { data: data as T[], status: 200 }
}

async function insforgeGet<T = any>(table: string, id: string | number, keyField = 'id'): Promise<{ data: T, status: number }> {
  const { data, error } = await insforge.database.from(table).select('*').eq(keyField, id).single()
  if (error)
    throw error
  return { data: data as T, status: 200 }
}

async function insforgeCreate<T = any>(table: string, data: Record<string, unknown>): Promise<{ data: T[], status: number }> {
  const { data: result, error } = await insforge.database.from(table).insert([data]).select()
  if (error)
    throw error
  return { data: result as T[], status: 201 }
}

async function insforgeUpdate<T = any>(table: string, id: string | number, data: Record<string, unknown>, keyField = 'id'): Promise<{ data: T[], status: number }> {
  const { data: result, error } = await insforge.database.from(table).update(data).eq(keyField, id).select()
  if (error)
    throw error
  return { data: result as T[], status: 200 }
}

async function insforgeDelete(table: string, id: string | number, keyField = 'id'): Promise<{ data: null, status: number }> {
  const { error } = await insforge.database.from(table).delete().eq(keyField, id)
  if (error)
    throw error
  return { data: null, status: 200 }
}

// ======== rpaApi 日志拦截器（仅保留旧网关客户端用于渐进式迁移） ========

rpaServicesClient.interceptors.request.use(
  (config) => {
    const token = authToken()
    if (token && !config.headers.Authorization)
      config.headers.Authorization = `Bearer ${token}`

    console.log(
      `[rpaApi] >> ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
      config.params ? `params=${JSON.stringify(config.params).slice(0, 120)}` : '',
      config.data && !(config.data instanceof FormData) ? `body=${JSON.stringify(config.data).slice(0, 120)}` : '',
    )
    return config
  },
  (err) => {
    console.warn('[rpaApi] REQUEST ERROR', err?.message || err)
    return Promise.reject(err)
  },
)

rpaServicesClient.interceptors.response.use(
  (res) => {
    const dataBrief = Array.isArray(res.data) ? `[${res.data.length} rows]` : JSON.stringify(res.data).slice(0, 80)
    console.log(`[rpaApi] << ${res.status} ${res.config.url}`, dataBrief)
    return res
  },
  (err) => {
    const url = err?.config?.url || '?'
    const status = err?.response?.status || 'NETWORK'
    console.warn(`[rpaApi] << ${status} ${url}`, err?.message || err)
    return Promise.reject(err)
  },
)

// ======== crudApi ========

export const crudApi: Record<string, any> = {
  atomMeta: createTableCrud('c_atom_meta_new'),
  element: createTableCrud('c_element'),
  globalVar: createTableCrud('c_global_var'),
  group: createTableCrud('c_group'),
  component: createTableCrud('component'),
  feedback: createTableCrud('feedback_report'),
  agent: createTableCrud('agent_table', { keyField: 'agent_id' }),
  module: createTableCrud('c_module'),
  param: {
    ...createTableCrud('c_param'),
    validate: (data: Record<string, unknown>) => {
      logCrudCall('c_param', 'validate', data)
      return logCrudResult('c_param', 'validate', insforge.functions.invoke('param-validate', { body: data }))
    },
  },
  require: createTableCrud('c_require'),
  smartVersion: createTableCrud('c_smart_version'),
  atomLike: createTableCrud('atom_like', { softDelete: false }),
  clientUpdate: createTableCrud('client_update_version'),
  componentVersion: createTableCrud('component_version'),
  componentRobotBlock: createTableCrud('component_robot_block', { softDelete: false }),
  componentRobotUse: createTableCrud('component_robot_use', { softDelete: false }),
  robotIcon: createTableCrud('robot_design'),
  sharedVar: createTableCrud('shared_var'),
  sharedFile: createTableCrud('shared_file'),
  astronAgent: createTableCrud('astron_agent_auth'),

  /** Edge Functions */
  notify: {
    send: (data: Record<string, unknown>) => {
      logCrudCall('notify', 'send', data)
      return logCrudResult('notify', 'send', insforge.functions.invoke('notify', { body: data }))
    },
  },
}

// ======== rpaApi ========
// 已从旧网关迁移到 InsForge SDK / ai-service，按模块标记迁移状态

export const rpaApi: any = {
  /** 通用 HTTP 客户端（指向 InsForge 服务器） */
  http: {
    client: rpaServicesClient,
    get: <T = any>(url: string, params?: any, config?: AxiosRequestConfig) =>
      rpaServicesClient.get<T>(url, { ...config, params }),
    delete: <T = any>(url: string, params?: any, config?: AxiosRequestConfig) =>
      rpaServicesClient.delete<T>(url, { ...config, params }),
    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
      rpaServicesClient.post<T>(url, data, config),
    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
      rpaServicesClient.put<T>(url, data, config),
  },

  // ==================================================================
  // 已迁移模块
  // ==================================================================

  /** ✅ ai — 已迁移到 ai-service (:8001) */
  ai: {
    chat: (data: Record<string, unknown>) => aiServiceClient.post('/chat', data),
    ocr: (data: Record<string, unknown>) => aiServiceClient.post('/ocr', data),
  },

  /** ✅ resources — 已迁移到 InsForge Storage API */
  resources: {
    /** 私有 bucket：rpa-files（用户上传的附件、工作流文件等） */
    list: (prefix?: string) => insforge.storage.from('rpa-files').list({ prefix, limit: 100 }),
    upload: (path: string, file: File | Blob) => insforge.storage.from('rpa-files').upload(path, file),
    download: (path: string) => insforge.storage.from('rpa-files').download(path),
    delete: (path: string) => insforge.storage.from('rpa-files').remove(path),
    /** 公开 bucket：rpa-public（头像、市场封面等公开资源） */
    public: {
      upload: (path: string, file: File | Blob) => insforge.storage.from('rpa-public').upload(path, file),
      getPublicUrl: (path: string) => insforge.storage.from('rpa-public').getPublicUrl(path),
    },
  },

  /** ✅ workflows — 已迁移到 InsForge DB (workflows 表) */
  workflows: {
    list: (params?: Record<string, any>) => insforgeList('workflows', params),
    get: (id: string | number) => insforgeGet('workflows', id),
    create: (data: Record<string, unknown>) => insforgeCreate('workflows', data),
    update: (id: string | number, data: Record<string, unknown>) => insforgeUpdate('workflows', id, data),
    delete: (id: string | number) => insforgeDelete('workflows', id),
  },

  /** ✅ records — 已迁移到 InsForge DB (executions + execution_logs 表) + Edge Functions */
  records: {
    list: (params?: Record<string, any>) => insforgeList('executions', params),
    get: (id: string | number) => insforgeGet('executions', id),
    getlogs: (executionId: string) =>
      insforge.database.from('execution_logs').select('*').eq('execution_id', executionId),
    getExecuteLst: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'execute-list', params),
    delExecute: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'execute-delete', params),
    delTaskExecute: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'task-execute-batch-delete', params),
    getTaskExecuteLst: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'task-execute-list', params),
  },

  /** ✅ robots（部分）— CRUD + EnglishName 已迁移 */
  robots: {
    // CRUD — 通过 InsForge DB
    list: (params?: Record<string, any>) => insforgeList('robots', params),
    get: (id: string | number) => insforgeGet('robots', id),
    create: (data: Record<string, unknown>) => insforgeCreate('robots', data),
    update: (id: string | number, data: Record<string, unknown>) => insforgeUpdate('robots', id, data),
    delete: (id: string | number) => insforgeDelete('robots', id),
    // AI 翻译 — 通过 ai-service
    getRobotEnglishName: (name: string) => aiServiceClient.post('/v1/chat/prompt', { prompt_type: 'translate', params: { name } }),
    // 复杂业务 — 通过 rpa-crud Edge Function
    getRobotLst: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'execute-list', params),
    isRobotInTask: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'robot-in-task', params),
    deleteRobot: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'delete-robot', params),
    publishRobot: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'publish-robot', params),
    getRobotLastVersion: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'robot-latest-version', params),
    getRobotLastIsExternalCall: (robotId: string) => invokeRpaFunction('rpa-crud', 'workflow-get', { robotId }),
    setRobotIsExternalCall: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'workflow-upsert', params),
    getRobotUpdateStatus: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'execute-update-check', params),
    updateRobot: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'robot-update-pull', params),
    checkRobotName: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'check-robot-name', params),
    getMyRobotDetail: (robotId: string) => invokeRpaFunction('rpa-crud', 'my-robot-detail', { robotId }),
    getMarketRobotDetail: (robotId: string) => invokeRpaFunction('rpa-crud', 'market-robot-detail', { robotId }),
    getRobotRecordOverview: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'record-overview', params),
    getRobotProcessList: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'process-all-data', params),
    saveRobotConfigParamValue: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'save-user-param', params),
    getRobotBasicInfo: (robotId: string) => invokeRpaFunction('rpa-crud', 'robot-detail', { robotId }),
    getComponentManageList: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-manage-list', params),
    installComponent: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-install', params),
    removeComponent: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-remove', params),
    addComponentUse: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-use-add', params),
    deleteComponentUse: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-use-delete', params),
    updateComponent: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-use-update', params),
    getComponentDetail: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-detail', params),
    getEditComponentDetail: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-edit-detail', params),
  },

  /** ✅ tasks — 已迁移到 Edge Function rpa-crud */
  tasks: {
    // 旧架构中用于通知 trigger 服务器任务变更，新架构中 CRUD 已通过 Edge Functions 直接操作数据库，不再需要
    taskNotify: (_data: Record<string, unknown>) => { console.debug('[taskNotify] no-op, task CRUD handled by Edge Functions') },
    getScheduleLst: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-page-list', params),
    checkCronExpression: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'cron-check', params),
    taskCancel: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'crontab-cancel', params),
    manualTrigger: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-run', params),
    taskFutureTime: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-future', params),
    taskFutureTimeNoCreate: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-future-no-create', params),
    isNameCopy: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-name-copy', params),
    getRobotList: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-robot-list', params),
    insertTask: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-insert', params),
    getTaskInfo: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-get', params),
    deleteTask: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-delete', params),
    updateTask: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-update', params),
    enableTask: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-enable', params),
    getTaskQueueList: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-queue-status', params),
    removeTaskQueue: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-queue-remove', params),
    updateTaskQueueConfig: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-queue-config-update', params),
    getTaskQueueConfig: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'trigger-task-queue-config-get', params),
  },

  // ==================================================================
  // ✅ 已迁移模块（均通过 Edge Functions / InsForge SDK 调用）
  // ==================================================================

  /** ✅ market — 已迁移到 Edge Function rpa-market */
  market: {
    getTeams: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'team-get-list', params),
    getAppCards: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-get-all-app-list', params),
    newTeam: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'team-add', params),
    checkMarketNum: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'quota-check-market-join', params),
    canAchieveApp: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'application-use-permission-check', params),
    useApplication: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'application-submit-use', params),
    obtainApp: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-obtain', params),
    getAppUpdateStatus: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-app-update-check', params),
    getAppDetails: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-app-detail', params),
    deleteApp: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-delete-app', params),
    messageList: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'notify-list', params),
    setMessageReadById: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'notify-set-selected-read', params),
    setAllRead: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'notify-set-all-read', params),
    acceptJoinTeam: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'notify-accept-join-team', params),
    refuseJoinTeam: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'notify-reject-join-team', params),
    teamInfo: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'team-info', params),
    editTeamInfo: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'team-edit', params),
    leaveTeamMarket: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'team-leave', params),
    dissolveTeamMarket: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'team-dissolve', params),
    marketUserList: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'market-user-list', params),
    setUserRole: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'market-user-role', params),
    removeUserRole: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'market-user-delete', params),
    getInviteUser: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'market-user-get-user', params),
    getTransferUser: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'market-user-leave-user', params),
    inviteMarketUser: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'market-user-invite', params),
    generateInviteLink: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'market-invite-generate-link', params),
    resetInviteLink: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'market-invite-reset-link', params),
    checkAppToRobotName: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-robot-name-duplicated', params),
    getAppFilterLst: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-add-robot-list', params),
    getCompanyInfo: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'market-user-dept-user', params),
    getNewMessage: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'notify-has-notify', params),
    appendixDownload: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'appendix-download', params),
    cancelAppendixDownload: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'download-cancel', params),
    getDeployedAccounts: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-deployed-user', params),
    deployApp: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-deploy', params),
    pushApp: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-update-push', params),
    getPushHistoryVersions: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-update-version-list', params),
    unDeployUserList: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'market-user-undeploy-user', params),
    releaseCheck: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'application-pre-release-check', params),
    releaseApplication: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'application-submit-release', params),
    releaseCheckWithPublish: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'application-pre-submit-after-publish-check', params),
    releaseWithPublish: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'application-submit-after-publish', params),
    applicationList: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'application-my-page-list', params),
    deleteApplication: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'application-my-delete', params),
    cancelApplication: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'application-my-cancel', params),
    getAllClassification: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'classification-list', params),
  },

  /** ✅ projects — 已迁移到 Edge Function rpa-crud */
  projects: {
    createProject: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'design-create', params),
    checkProjectNum: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'quota-check-designer', params),
    isInTask: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'design-delete-robot-res', params),
    deleteProject: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'design-delete-robot', params),
    getDesignList: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'design-list', params),
    shareRobotToMarket: (params?: Record<string, any>) => invokeRpaFunction('rpa-market', 'resource-share', params),
    rename: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'design-rename', params),
    renameCheck: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'design-name-dup', params),
    createCopy: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'design-copy-robot', params),
    getDefaultName: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'design-create-name', params),
    getComponentList: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-page-list', params),
    createComponent: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-create', params),
    getDefaultComponentName: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-create-name', params),
    checkComponentName: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-check-name', params),
    renameComponent: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-rename', params),
    deleteComponent: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-delete', params),
    createCopyComponentName: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-copy-create-name', params),
    createCopyComponent: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-copy', params),
    getComponentDetail: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-info', params),
    getComponentNextVersion: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-version-next-version', params),
    publishComponent: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-version-create', params),
  },

  /** ✅ versions — 已迁移到 Edge Function rpa-crud */
  versions: {
    getVersionLst: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'robot-version-list4-design', params),
    versionRecover: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'robot-version-recover', params),
    versionEnable: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'robot-version-enable', params),
  },

  /** ✅ openapi — 已迁移到 Edge Function rpa-crud */
  openapi: {
    getWorkflowList: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'workflows-get-astron', params),
  },

  /** ✅ mail — 已迁移到 Edge Function rpa-crud */
  mail: {
    list: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'task-mail-page-list', params),
    save: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'task-mail-save', params),
    delete: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'task-mail-delete', params),
    check: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'task-mail-connect', params),
  },

  /** ✅ component — 已迁移到 Edge Functions */
  component: {
    publishComponent: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-version-create', params),
    getComponentNextVersion: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-version-next-version', params),
    codeToMeta: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'smart-code-to-meta', params),
    saveSmartComp: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'smart-save', params),
    getSmartComp: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'smart-detail-all', params),
    optimizeQuestion: aiEndpoint('post', '/smart/chat'),
  },

  /** ✅ atoms — 已迁移到 InsForge DB (c_atom_meta_new / c_param / atom_like / shared_var / shared_file) */
  atoms: {
    getAbilityInfo: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'atom-list', params),
    getAtomsMeta: () => invokeRpaFunction('rpa-crud', 'atom-tree'),
    getTreeByParentKey: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'atom-list-by-parent', params),
    getComponentList: (params?: Record<string, any>) => invokeRpaFunction('rpa-crud', 'component-editing-list', params),
  },
}
