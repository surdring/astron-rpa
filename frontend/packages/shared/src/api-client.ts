import { createClient, type InsForgeClient } from '@insforge/sdk'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

const RPA_SERVICES_URL = import.meta.env.VITE_RPA_SERVICES_URL || 'http://localhost:32742'
const INSFORGE_BASE_URL = import.meta.env.VITE_INSFORGE_URL || 'http://172.16.100.211:7130'
const INSFORGE_ANON_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY || 'anon_a88304ba461724216502b11fc0384d3f2fa2187dad2716768b85bf6574933e8f'

export const insforge: InsForgeClient = createClient({
  baseUrl: INSFORGE_BASE_URL,
  anonKey: INSFORGE_ANON_KEY,
})

const rpaServicesClient: AxiosInstance = axios.create({
  baseURL: RPA_SERVICES_URL,
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
      if (a && typeof a === 'object') return JSON.stringify(a).slice(0, 120)
      return String(a)
    })
    .join(', ')
  console.log(`[crudApi] ${table}.${method}(${brief})`)
}

function logCrudResult<T>(table: string, method: string, promise: Promise<T>): Promise<T> {
  return promise.then(
    (res) => {
      const hasError = res && typeof res === 'object' && 'error' in res && res.error
      if (hasError) {
        console.warn(`[crudApi] ${table}.${method} FAILED`, (res as { error: unknown }).error)
      } else {
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
  options?: { keyField?: string; softDelete?: boolean },
): Record<string, any> {
  const keyField = options?.keyField || 'id'
  const isSoftDelete = options?.softDelete !== false

  function log(method: string, ...args: unknown[]) {
    logCrudCall(tableName, method, ...args)
  }
  function wrap<T>(method: string, promise: Promise<T>): Promise<T> {
    return logCrudResult(tableName, method, promise)
  }

  return {
    list: (params?: Record<string, unknown>) => {
      log('list', params)
      let query = insforge.database.from(tableName).select('*', params?.count ? { count: params.count as 'exact' | 'planned' | 'estimated' } : undefined)
      if (params?.order) query = query.order(params.order as string, params.orderOptions as Record<string, any> | undefined)
      if (params?.limit) query = query.limit(params.limit as number)
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

function endpoint(method: 'get' | 'post' | 'put' | 'delete', url: string) {
  return (payload?: any, config?: AxiosRequestConfig) => {
    if (method === 'get' || method === 'delete')
      return rpaServicesClient[method](url, { ...config, params: payload ?? config?.params })

    return rpaServicesClient[method](url, payload, config)
  }
}

// ======== rpaApi 日志拦截器 ========

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

export const rpaApi: any = {
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
  market: {
    getTeams: endpoint('post', '/api/robot/market-team/get-list'),
    getAppCards: endpoint('post', '/api/robot/market-resource/get-all-app-list'),
    newTeam: endpoint('post', '/api/robot/market-team/add'),
    checkMarketNum: endpoint('get', '/api/robot/quota/check-market-join'),
    canAchieveApp: endpoint('post', '/api/robot/application/use-permission-check'),
    useApplication: endpoint('post', '/api/robot/application/submit-use-application'),
    obtainApp: endpoint('post', '/api/robot/market-resource/obtain'),
    getAppUpdateStatus: endpoint('post', '/api/robot/market-resource/app-update-check'),
    getAppDetails: endpoint('get', '/api/robot/market-resource/app-detail'),
    deleteApp: endpoint('get', '/api/robot/market-resource/delete-app'),
    messageList: endpoint('post', '/api/robot/notify/notify-List'),
    setMessageReadById: endpoint('get', '/api/robot/notify/set-selected-notify-read'),
    setAllRead: endpoint('get', '/api/robot/notify/set-all-notify-read'),
    acceptJoinTeam: endpoint('get', '/api/robot/notify/accept-join-team'),
    refuseJoinTeam: endpoint('get', '/api/robot/notify/reject-join-team'),
    teamInfo: endpoint('post', '/api/robot/market-team/info'),
    editTeamInfo: endpoint('post', '/api/robot/market-team/edit'),
    leaveTeamMarket: endpoint('post', '/api/robot/market-team/leave'),
    dissolveTeamMarket: endpoint('post', '/api/robot/market-team/dissolve'),
    marketUserList: endpoint('post', '/api/robot/market-user/list'),
    setUserRole: endpoint('post', '/api/robot/market-user/role'),
    removeUserRole: endpoint('post', '/api/robot/market-user/delete'),
    getInviteUser: endpoint('post', '/api/robot/market-user/get/user'),
    getTransferUser: endpoint('post', '/api/robot/market-user/leave/user'),
    inviteMarketUser: endpoint('post', '/api/robot/market-user/invite'),
    generateInviteLink: endpoint('post', '/api/robot/market-invite/generate-invite-link'),
    resetInviteLink: endpoint('post', '/api/robot/market-invite/reset-invite-link'),
    checkAppToRobotName: endpoint('get', '/api/market-resource/robot-name-duplicated'),
    getAppFilterLst: endpoint('post', '/api/market-resource/add/robot/list'),
    getCompanyInfo: endpoint('post', '/api/robot/market-user/dept/user'),
    getNewMessage: endpoint('get', '/api/robot/notify/hasNotify'),
    appendixDownload: endpoint('post', '/api/robot/appendix/download'),
    cancelAppendixDownload: endpoint('post', '/api/robot/download/cancel'),
    getDeployedAccounts: endpoint('post', '/api/robot/market-resource/deployed-user'),
    deployApp: endpoint('post', '/api/robot/market-resource/deploy'),
    pushApp: endpoint('post', '/api/robot/market-resource/update/push'),
    getPushHistoryVersions: endpoint('post', '/api/robot/market-resource/update/version-list'),
    unDeployUserList: endpoint('post', '/api/robot/market-user/undeploy-user'),
    releaseCheck: endpoint('post', '/api/robot/application/pre-release-check'),
    releaseApplication: endpoint('post', '/api/robot/application/submit-release-application'),
    releaseCheckWithPublish: endpoint('post', '/api/robot/application/pre-submit-after-publish-check'),
    releaseWithPublish: endpoint('post', '/api/robot/application/submit-after-publish'),
    applicationList: endpoint('post', '/api/robot/application/my-application-page-list'),
    deleteApplication: endpoint('post', '/api/robot/application/my-application-delete'),
    cancelApplication: endpoint('post', '/api/robot/application/my-application-cancel'),
    getAllClassification: endpoint('get', '/api/robot/classification/list'),
  },
  projects: {
    createProject: endpoint('post', '/api/robot/robot-design/create'),
    checkProjectNum: endpoint('get', '/api/robot/quota/check-designer'),
    isInTask: endpoint('get', '/api/robot/robot-design/delete-robot-res'),
    deleteProject: endpoint('post', '/api/robot/robot-design/delete-robot'),
    getDesignList: endpoint('post', '/api/robot/robot-design/design-list'),
    shareRobotToMarket: endpoint('post', '/api/robot/market-resource/share'),
    rename: endpoint('get', '/api/robot/robot-design/rename'),
    renameCheck: endpoint('get', '/api/robot/robot-design/design-name-dup'),
    createCopy: endpoint('get', '/api/robot/robot-design/copy-design-robot'),
    getDefaultName: endpoint('post', '/api/robot/robot-design/create-name'),
    getComponentList: endpoint('post', '/api/robot/component/page-list'),
    createComponent: endpoint('get', '/api/robot/component/create'),
    getDefaultComponentName: endpoint('post', '/api/robot/component/create-name'),
    checkComponentName: endpoint('post', '/api/robot/component/check-name'),
    renameComponent: endpoint('get', '/api/robot/component/rename'),
    deleteComponent: endpoint('get', '/api/robot/component/delete'),
    createCopyComponentName: endpoint('get', '/api/robot/component/copy/create-name'),
    createCopyComponent: endpoint('get', '/api/robot/component/copy'),
    getComponentDetail: endpoint('get', '/api/robot/component/info'),
    getComponentNextVersion: endpoint('get', '/api/robot/component-version/next-version'),
    publishComponent: endpoint('post', '/api/robot/component-version/create'),
  },
  versions: {
    getVersionLst: endpoint('get', '/api/robot/robot-version/list4Design'),
    versionRecover: endpoint('post', '/api/robot/robot-version/recover-version'),
    versionEnable: endpoint('post', '/api/robot/robot-version/enable-version'),
  },
  robots: {
    getRobotLst: endpoint('post', '/api/robot/robot-execute/execute-list'),
    isRobotInTask: endpoint('get', '/api/robot/robot-execute/delete-robot-res'),
    deleteRobot: endpoint('post', '/api/robot/robot-execute/delete-robot'),
    publishRobot: endpoint('post', '/api/robot/robot-version/publish'),
    getRobotLastVersion: endpoint('post', '/api/robot/robot-version/latest-info'),
    getRobotLastIsExternalCall: (robotId: string) => rpaServicesClient.get(`/api/rpa-openapi/workflows/get/${robotId}`),
    setRobotIsExternalCall: endpoint('post', '/api/rpa-openapi/workflows/upsert'),
    getRobotEnglishName: (name: string) => rpaServicesClient.post('/api/rpa-ai-service/v1/chat/prompt', { prompt_type: 'translate', params: { name } }),
    getRobotUpdateStatus: endpoint('post', '/api/robot/robot-execute/execute-update-check'),
    updateRobot: endpoint('post', '/api/robot/robot-execute/update/pull'),
    checkRobotName: endpoint('post', '/api/robot/robot-version/same-name'),
    getMyRobotDetail: (robotId: string) => rpaServicesClient.get('/api/robot/robot-design/my-robot-detail', { params: { robotId } }),
    getMarketRobotDetail: (robotId: string) => rpaServicesClient.get('/api/robot/robot-design/market-robot-detail', { params: { robotId } }),
    getRobotRecordOverview: endpoint('post', '/api/robot/robot-record/detail/overview'),
    getRobotProcessList: endpoint('post', '/api/robot/process/all-data'),
    saveRobotConfigParamValue: (paramList: any, mode: string, robotId: string) => rpaServicesClient.post('/api/robot/param/saveUserParam', { paramList, mode, robotId }),
    getRobotBasicInfo: (robotId: string) => rpaServicesClient.get('/api/robot/robot-execute/robot-detail', { params: { robotId } }),
    getComponentManageList: (robotId: string) => rpaServicesClient.post('/api/robot/component/editing/manage-list', { robotId, version: 0 }),
    installComponent: (data: any) => rpaServicesClient.post('/api/robot/component-robot-block/delete', { ...data, mode: 'EDIT_PAGE' }),
    removeComponent: (data: any) => rpaServicesClient.post('/api/robot/component-robot-block/add', { ...data, mode: 'EDIT_PAGE' }),
    addComponentUse: (data: any) => rpaServicesClient.post('/api/robot/component-robot-use/add', { ...data, mode: 'EDIT_PAGE' }),
    deleteComponentUse: (data: any) => rpaServicesClient.post('/api/robot/component-robot-use/delete', { ...data, mode: 'EDIT_PAGE' }),
    updateComponent: (data: any) => rpaServicesClient.post('/api/robot/component-robot-use/update', { ...data, mode: 'EDIT_PAGE' }),
    getComponentDetail: (data: any) => rpaServicesClient.post('/api/robot/component/editing/info', { ...data, mode: 'EDIT_PAGE' }),
    getEditComponentDetail: (data: any) => rpaServicesClient.post('/api/robot/component-robot-use/edit', { ...data, mode: 'EDIT_PAGE' }),
    list: (params?: Record<string, unknown>) => rpaServicesClient.get('/api/robot/robots', { params }),
    get: (id: string | number) => rpaServicesClient.get(`/api/robot/robots/${id}`),
    create: (data: Record<string, unknown>) => rpaServicesClient.post('/api/robot/robots', data),
    update: (id: string | number, data: Record<string, unknown>) =>
      rpaServicesClient.put(`/api/robot/robots/${id}`, data),
    delete: (id: string | number) => rpaServicesClient.delete(`/api/robot/robots/${id}`),
  },
  resources: {
    list: (params?: Record<string, unknown>) => rpaServicesClient.get('/api/resource/file', { params }),
    get: (id: string | number) => rpaServicesClient.get(`/api/resource/file/${id}`),
    upload: (formData: FormData) =>
      rpaServicesClient.post('/api/resource/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    download: (id: string | number) =>
      rpaServicesClient.get(`/api/resource/file/download/${id}`, { responseType: 'blob' }),
    delete: (id: string | number) => rpaServicesClient.delete(`/api/resource/file/${id}`),
  },
  records: {
    getExecuteLst: endpoint('post', '/api/robot/robot-record/list'),
    delExecute: endpoint('post', '/api/robot/robot-record/delete-robot-execute-records'),
    delTaskExecute: endpoint('post', '/api/robot/task-execute/batch-delete'),
    getTaskExecuteLst: endpoint('post', '/api/robot/task-execute/list'),
    getlogs: endpoint('post', '/api/robot/robot-record/log'),
    list: (params?: Record<string, unknown>) => rpaServicesClient.get('/api/rpa-openapi/executions', { params }),
    get: (id: string | number) => rpaServicesClient.get(`/api/rpa-openapi/executions/${id}`),
  },
  workflows: {
    list: (params?: Record<string, unknown>) => rpaServicesClient.get('/api/rpa-openapi/workflows', { params }),
    get: (id: string | number) => rpaServicesClient.get(`/api/rpa-openapi/workflows/${id}`),
    create: (data: Record<string, unknown>) => rpaServicesClient.post('/api/rpa-openapi/workflows', data),
    update: (id: string | number, data: Record<string, unknown>) =>
      rpaServicesClient.put(`/api/rpa-openapi/workflows/${id}`, data),
    delete: (id: string | number) => rpaServicesClient.delete(`/api/rpa-openapi/workflows/${id}`),
  },
  openapi: {
    getWorkflowList: endpoint('get', '/api/rpa-openapi/workflows/get-astron'),
  },
  tasks: {
    getScheduleLst: endpoint('post', '/api/robot/triggerTask/page/list'),
    checkCronExpression: endpoint('post', '/api/robot/task/corn/check'),
    taskCancel: endpoint('post', '/scheduler/crontab/cancel'),
    manualTrigger: endpoint('post', '/trigger/task/run'),
    taskNotify: endpoint('post', '/trigger/task/notify'),
    taskFutureTime: endpoint('post', '/trigger/task/future'),
    taskFutureTimeNoCreate: endpoint('post', '/trigger/task/future_with_no_create'),
    isNameCopy: endpoint('get', '/api/robot/triggerTask/isNameCopy'),
    getRobotList: endpoint('get', '/api/robot/triggerTask/robotExe/list'),
    insertTask: endpoint('post', '/api/robot/triggerTask/insert'),
    getTaskInfo: endpoint('get', '/api/robot/triggerTask/get'),
    deleteTask: endpoint('get', '/api/robot/triggerTask/delete'),
    updateTask: endpoint('post', '/api/robot/triggerTask/update'),
    enableTask: endpoint('get', '/api/robot/triggerTask/enable'),
    getTaskQueueList: endpoint('get', '/trigger/task/queue/status'),
    removeTaskQueue: endpoint('post', '/trigger/task/queue/remove'),
    updateTaskQueueConfig: endpoint('post', '/trigger/task/queue/config'),
    getTaskQueueConfig: endpoint('get', '/trigger/task/queue/config'),
  },
  mail: {
    list: endpoint('get', '/api/robot/taskMail/page/list'),
    save: endpoint('post', '/api/robot/taskMail/save'),
    delete: endpoint('post', '/api/robot/taskMail/delete'),
    check: endpoint('post', '/api/robot/taskMail/connect'),
  },
  component: {
    publishComponent: endpoint('post', '/api/robot/component-version/create'),
    getComponentNextVersion: endpoint('get', '/api/robot/component-version/next-version'),
    codeToMeta: endpoint('post', '/scheduler/smart/code-to-meta'),
    saveSmartComp: endpoint('post', '/api/robot/smart/save'),
    getSmartComp: endpoint('post', '/api/robot/smart/detail/all'),
    optimizeQuestion: endpoint('post', '/api/rpa-ai-service/smart/chat'),
  },
  ai: {
    chat: (data: Record<string, unknown>) => rpaServicesClient.post('/api/rpa-ai-service/chat', data),
    ocr: (data: Record<string, unknown>) => rpaServicesClient.post('/api/rpa-ai-service/ocr', data),
  },
}
