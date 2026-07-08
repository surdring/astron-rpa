import { insforge } from './client'

// InsForge 用户对象结构（SDK 未导出 User 类型时本地定义）
export interface InsForgeUser {
  id: string
  email: string
  emailVerified?: boolean
  profile?: Record<string, any>
  metadata?: Record<string, any>
  createdAt?: string
  updatedAt?: string
  [key: string]: any
}

export interface InsForgeAuthResponse {
  accessToken: string
  user: InsForgeUser
}

export interface LoginWithPasswordParams {
  email: string
  password: string
}

export interface SignUpParams {
  email: string
  password: string
  name?: string
}

/**
 * 使用邮箱密码登录（InsForge SDK）
 * 适配 SDK 返回的 { data, error } 结构
 */
export async function signInWithPassword(params: LoginWithPasswordParams): Promise<InsForgeAuthResponse> {
  const { data, error } = await insforge.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  })

  if (error)
    throw error

  if (!data?.accessToken || !data.user)
    throw new Error('Invalid login response')

  persistSession(data.accessToken)
  return {
    accessToken: data.accessToken,
    user: data.user,
  }
}

/**
 * 注册新用户（InsForge SDK）
 */
export async function signUp(params: SignUpParams): Promise<InsForgeAuthResponse> {
  const { data, error } = await insforge.auth.signUp({
    email: params.email,
    password: params.password,
    name: params.name,
  })

  if (error)
    throw error

  if (!data?.accessToken || !data.user)
    throw new Error('Invalid sign up response')

  persistSession(data.accessToken)
  return {
    accessToken: data.accessToken,
    user: data.user,
  }
}

/**
 * 退出登录（InsForge SDK）
 */
export async function signOut(): Promise<void> {
  const { error } = await insforge.auth.signOut()
  if (error)
    throw error
  clearSession()
}

/**
 * 获取当前登录用户信息（InsForge SDK）
 */
export async function getCurrentUser(): Promise<InsForgeUser> {
  const { data, error } = await insforge.auth.getCurrentUser()
  if (error)
    throw error
  if (!data.user)
    throw new Error('Not authenticated')
  return data.user
}

/**
 * 将 accessToken 持久化到 sessionStorage
 * 保持与原有 rpa-auth token 存储位置一致
 */
export function persistSession(accessToken: string) {
  sessionStorage.setItem('tokenValue', accessToken)
}

export function clearSession() {
  sessionStorage.removeItem('tokenValue')
}

export function getSessionToken(): string | null {
  return sessionStorage.getItem('tokenValue')
}
