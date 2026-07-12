import { crudApi, insforge, rpaApi } from '@rpa/shared'

// 根据id和version获取原子能力的具体信息
export async function getAbilityInfo(atomList: { key: string, version: string }[]): Promise<string[]> {
  const res = await rpaApi.atoms.getAbilityInfo({ keys: atomList.map(i => i.key) })
  return (res || []).map((atom: any) => atom.atomContent)
}

// 获取原子能力左侧菜单数据
export async function getAtomsMeta(): Promise<RPA.AtomMetaData> {
  const res = await rpaApi.atoms.getAtomsMeta()
  return typeof res === 'string' ? JSON.parse(res) : res
}

// 获取扩展组件左侧菜单数据
export async function getModuleMeta(): Promise<RPA.AtomTreeNode[]> {
  const res = await rpaApi.atoms.getAtomsMeta()
  const data = typeof res === 'string' ? JSON.parse(res) : res
  return data.atomicTreeExtend ?? []
}

export function getTreeByParentKey(parentKey: string) {
  return rpaApi.atoms.getTreeByParentKey({ parentKey })
}

export async function getNewAtomDesc(key: string): Promise<{ data: string }> {
  const res = await rpaApi.atoms.getAbilityInfo({ keys: [key] })
  const atom = res && res.length > 0 ? res[0] : {}
  const { atomContent = '{}' } = atom as any
  return { data: atomContent }
}

/**
 * 添加收藏
 */
export function addFavorite(data: { atomKey: string }) {
  return crudApi.atomLike.create(data)
}

/**
 * 取消收藏
 */
export function removeFavorite(data: { likeId: string }) {
  return insforge.database.from('atom_like').delete().eq('id', data.likeId)
}

/**
 * 获取收藏列表
 */
export async function getFavoriteList() {
  const { data, error } = await crudApi.atomLike.list()
  if (error)
    throw error
  return data ?? []
}

/**
 * 获取组件列表
 */
export async function getComponentList(data: {
  robotId: string
  version?: number
}) {
  const res = await rpaApi.atoms.getComponentList({ ...data, mode: 'EDIT_PAGE' })
  return res ?? []
}

/**
 * 获取原子能力的配置参数
 */
export async function getConfigParams(params: {
  robotId: string
  robotVersion?: string | number
  processId?: string
  moduleId?: string
  mode?: string
}) {
  const { data, error } = await crudApi.param.list(params)
  if (error)
    throw error
  return data
}

/**
 * 新增原子能力的配置参数
 */
export async function createConfigParam(data: RPA.CreateConfigParamData) {
  const { data: result, error } = await crudApi.param.create(data)
  if (error)
    throw error
  return result
}

/**
 * 删除原子能力的配置参数
 */
export function deleteConfigParam(id: string) {
  return crudApi.param.delete(id)
}

/**
 * 更新原子能力的配置参数
 */
export function updateConfigParam(data: RPA.ConfigParamData) {
  return crudApi.param.update(data.id, data)
}

/**
 * 获取远程共享变量
 */
export async function getRemoteParams<T>() {
  const { data, error } = await crudApi.sharedVar.list()
  if (error)
    throw error
  return data || []
}

/**
 * 获取卓越中心文件管理共享文件列表
 */
export async function getRemoteFiles(data?: { pageSize?: number, fileName?: string }) {
  const { data: result, error } = await crudApi.sharedFile.page(data)
  if (error)
    throw error
  return result || { records: [], total: 0 }
}