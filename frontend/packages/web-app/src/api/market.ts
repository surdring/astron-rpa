import { rpaApi } from '@rpa/shared'

/**
 * @description: 获取团队列表
 */
export async function getTeams() {
  const res = await rpaApi.market.getTeams()
  return res || []
}

/**
 * @description: 获取全部应用列表
 */
export async function getAppCards(data) {
  const res = await rpaApi.market.getAppCards(data)
  return res || { records: [], total: 0 }
}

/**
 * @description: 创建团队
 */
export function newTeam(data) {
  return rpaApi.market.newTeam(data)
}

/**
 * @description: 创建团队-数量校验
 */
export function checkMarketNum() {
  return rpaApi.market.checkMarketNum()
}

/**
 * @description: 黄色密级的应用，获取时校验是否是部门内部人员
 */
export function canAchieveApp(data) {
  return rpaApi.market.canAchieveApp(data)
}

/**
 * @description: 申请使用
 */
export function useApplication(data) {
  return rpaApi.market.useApplication(data)
}

/**
 * @description: 获取应用
 */
export function obtainApp(data) {
  return rpaApi.market.obtainApp(data)
}

/**
 * @description: 轮询应用更新状态
 */
export async function getAppUpdateStatus(data) {
  return rpaApi.market.getAppUpdateStatus(data)
}

/**
 * @description: 获取市场应用详情
 */
export function getAppDetails(params: { marketId: string, appId: string }) {
  return rpaApi.market.getAppDetails(params)
}

/**
 * @description: 删除应用
 */
export function deleteApp(params) {
  return rpaApi.market.deleteApp(params)
}

// 消息列表
export async function messageList(data) {
  const res = await rpaApi.market.messageList(data)
  return res
}

// 指定已读消息
export async function setMessageReadById(params) {
  return rpaApi.market.setMessageReadById(params)
}

// 一键已读
export async function setAllRead() {
  return rpaApi.market.setAllRead()
}

// 加入团队
export async function acceptJoinTeam(params) {
  return rpaApi.market.acceptJoinTeam(params)
}

// 拒绝团队
export async function refuseJoinTeam(params) {
  return rpaApi.market.refuseJoinTeam(params)
}

// 获取市场信息
export function teamInfo(params) {
  return rpaApi.market.teamInfo(params)
}

// 编辑市场信息
export function editTeamInfo(data) {
  return rpaApi.market.editTeamInfo(data)
}

// 离开团队
export function leaveTeamMarket(data) {
  return rpaApi.market.leaveTeamMarket(data)
}

// 解散团队
export function dissolveTeamMarket(data) {
  return rpaApi.market.dissolveTeamMarket(data)
}

// 成员列表
export async function marketUserList(data) {
  const res = await rpaApi.market.marketUserList(data)
  return res || { records: [], total: 0 }
}

// 设置用户角色
export function setUserRole(data) {
  return rpaApi.market.setUserRole(data)
}

// 移除用户角色
export function removeUserRole(data) {
  return rpaApi.market.removeUserRole(data)
}

// 查询邀请员工
export async function getInviteUser(data) {
  return rpaApi.market.getInviteUser(data)
}

// 移交所有权查询员工
export async function getTransferUser(data) {
  return rpaApi.market.getTransferUser(data)
}

// 邀请员工
export function inviteMarketUser(data) {
  return rpaApi.market.inviteMarketUser(data)
}

export function generateInviteLink(data: { marketId: string, expireType: string }) {
  return rpaApi.market.generateInviteLink(data)
}

export function resetInviteLink(data: { marketId: string, expireType: string }) {
  return rpaApi.market.resetInviteLink(data)
}

// 应用获取为应用时重命名检测
export function checkAppToRobotName(params) {
  return rpaApi.market.checkAppToRobotName(params)
}

/**
 * @description: 市场-新增应用弹窗过滤列表
 */
export function getAppFilterLst(data) {
  return rpaApi.market.getAppFilterLst(data)
}

/**
 * @description: 市场-获取组织架构信息
 */
export function getCompanyInfo(data) {
  return rpaApi.market.getCompanyInfo(data)
}

/**
 * @description: 消息通知-是否有新消息
 */
export async function getNewMessage() {
  return rpaApi.market.getNewMessage()
}

/**
 * @description: 附件下载
 */
export function appendixDownload(data: any) {
  return rpaApi.market.appendixDownload(data)
}

/**
 * @description: 取消附件下载
 */
export function cancelAppendixDownload(data: any) {
  return rpaApi.market.cancelAppendixDownload(data)
}

/**
 * @description: 获取已部署的账号列表
 */
export async function getDeployedAccounts(data: any) {
  const res = await rpaApi.market.getDeployedAccounts(data)
  return res || { records: [], total: 0 }
}

/**
 * @description: 部署市场应用
 */
export function deployApp(data: any) {
  return rpaApi.market.deployApp(data)
}

/**
 * @description: 版本推送市场应用
 */
export function pushApp(data: any) {
  return rpaApi.market.pushApp(data)
}

/**
 * @description: 版本推送-历史版本列表查询
 */
export async function getPushHistoryVersions(data: any) {
  return rpaApi.market.getPushHistoryVersions(data)
}

// 部署弹窗获取成员列表
export async function unDeployUserList(data) {
  return rpaApi.market.unDeployUserList(data)
}

// 分享到市场 是否需发起申请检查
export function releaseCheck(data) {
  return rpaApi.market.releaseCheck(data)
}

// 分享到市场 发起上架申请
export function releaseApplication(data) {
  return rpaApi.market.releaseApplication(data)
}

// 分享到市场 发起上架申请
export function releaseCheckWithPublish(data) {
  return rpaApi.market.releaseCheckWithPublish(data)
}

// 重新发版后立即发起上架申请
export function releaseWithPublish(data) {
  return rpaApi.market.releaseWithPublish(data)
}

// 获取应用市场我的申请列表
export function applicationList(params: any) {
  return rpaApi.market.applicationList(params)
}

// 获取应用市场我的申请列表-删除
export function deleteApplication(params: object) {
  return rpaApi.market.deleteApplication(params)
}

// 获取应用市场我的申请列表-撤销
export function cancelApplication(params: object) {
  return rpaApi.market.cancelApplication(params)
}

// 获取市场应用所有分类
export async function getAllClassification() {
  return rpaApi.market.getAllClassification()
}