import { rpaApi } from '@rpa/shared'

// 邮箱列表
export function apiGetMailList(params: { pageNo: number, pageSize: number }) {
  return rpaApi.mail.list(params)
}

// 邮箱
export function apiSaveMail(params: {
  emailService: string
  emailProtocol: string
  emailServiceAddress: string
  port: string
  enableSSL: boolean
  emailAccount: string
  authorizationCode: string
}) {
  return rpaApi.mail.save(params)
}

// 删除邮箱
export function apiDeleteMail(params: { resourceId: string }) {
  return rpaApi.mail.delete(params)
}

// 邮箱检测
export function apiCheckEmail(data) {
  return rpaApi.mail.check(data)
}