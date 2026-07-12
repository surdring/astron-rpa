import { rpaApi } from '@rpa/shared'
import { ACTUATOR, APPLICATIONMARKET, DESIGNER } from '@/constants/menu'

const ENV = import.meta.env

const ALL_MODULE_PERMISSIONS = [
  { resource: DESIGNER, actions: ['all'], permissionKey: 'moduleDesigner' },
  { resource: ACTUATOR, actions: ['all'], permissionKey: 'moduleExecutor' },
  { resource: 'console', actions: ['all'], permissionKey: 'moduleConsole' },
  { resource: APPLICATIONMARKET, actions: ['all'], permissionKey: 'moduleMarket' },
]

/**
 * 权限数据
 */
export async function permission() {
  // InsForge 认证模式下暂无租户/权限表，默认返回全部模块权限
  if (ENV.VITE_AUTH_TYPE === 'insforge') {
    return ALL_MODULE_PERMISSIONS
  }

  // 非 InsForge 模式（过渡期兼容）
  const res = await rpaApi.http.get('/api/rpa-auth/user/entitlement')
  const entitlement = res.data

  return ALL_MODULE_PERMISSIONS.filter(i => entitlement[i.permissionKey])
}