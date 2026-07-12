import { rpaApi } from '@rpa/shared'
import { pickBy } from 'lodash-es'

/**
 * @description: 获取执行器应用列表数据
 */
export async function getRobotLst(data) {
  const res = await rpaApi.robots.getRobotLst(data)
  return res || { records: [], total: 0 }
}

/**
 * 检测应用是否被计划任务引用被返回引用这个应用的计划任务的数组
 */
export async function isRobotInTask(params) {
  return rpaApi.robots.isRobotInTask(params)
}

/**
 * @description: 删除应用
 */
export function deleteRobot(data) {
  return rpaApi.robots.deleteRobot(data)
}

/**
 * @description: 发布应用
 */
export function publishRobot<T = any>(data: T) {
  return rpaApi.robots.publishRobot(data)
}

/**
 * @description: 获取应用上次发版信息回显
 */
export async function getRobotLastVersion(robotId: string) {
  const res = await rpaApi.robots.getRobotLastVersion({ robotId })
  return pickBy(res, value => value !== null)
}

/**
 * @description: 获取该应用是否允许外部调用
 */
export async function getRobotLastIsExternalCall(robotId: string) {
  const res = await rpaApi.robots.getRobotLastIsExternalCall(robotId)
  return pickBy(res?.workflow, value => value !== null)
}

/**
 * @description: 保存是否允许外部调用的配置
 */
export function setRobotIsExternalCall(data) {
  return rpaApi.robots.setRobotIsExternalCall(data)
}

/**
 * 获取AI工作流列表
 */
export async function getWorkflowList() {
  const res = await rpaApi.openapi.getWorkflowList()
  return res?.records || []
}

/**
 * @description: 获取应用名称以英文翻译
 */
export function getRobotEnglishName(name: string) {
  return rpaApi.robots.getRobotEnglishName(name)
}

/**
 * @description: 轮询执行器下应用更新状态
 */
export async function getRobotUpdateStatus(data) {
  return rpaApi.robots.getRobotUpdateStatus(data)
}

/**
 * @description: 更新执行器下应用
 */
export function updateRobot(data) {
  return rpaApi.robots.updateRobot(data)
}

/**
 * @description: 应用重名校验
 */
export function checkRobotName(data: { robotId: string, name: string }) {
  return rpaApi.robots.checkRobotName(data)
}

/**
 * 我创建的应用详情
 */
export async function getMyRobotDetail(robotId: string) {
  return rpaApi.robots.getMyRobotDetail(robotId)
}

/**
 * 我获取的应用详情
 */
export async function getMarketRobotDetail(robotId: string) {
  const res = await rpaApi.robots.getMarketRobotDetail(robotId)
  const { myRobotDetailVo, sourceName, versionInfoList } = res
  return { ...myRobotDetailVo, sourceName, versionList: versionInfoList }
}

/**
 * @description: 获取应用详情
 */
export async function getRobotRecordOverview(data: { robotId: string, version: number, deadline: string }) {
  return rpaApi.robots.getRobotRecordOverview(data)
}

/**
 * @description: 查询应用的所有流程数据
 */
export async function getRobotProcessList(robotId: string): Promise<any[]> {
  const res = await rpaApi.robots.getRobotProcessList({ robotId })
  return res.map(it => ({
    ...it,
    processContent: JSON.parse(it.processContent),
  }))
}

/**
 * 保存应用自定义配置参数
 */
export async function saveRobotConfigParamValue(data: RPA.CreateConfigParamData[], mode: string, robotId: string) {
  return rpaApi.robots.saveRobotConfigParamValue({ paramList: data, mode, robotId })
}

/**
 * 执行器应用详情基本信息
 */
export async function getRobotBasicInfo(robotId: string) {
  return rpaApi.robots.getRobotBasicInfo(robotId)
}

/**
 * 获取编辑页内组件管理列表
 */
export async function getComponentManageList(robotId: string) {
  return rpaApi.robots.getComponentManageList({ robotId, version: 0 })
}

/**
 * 安装组件
 */
export async function installComponent(data: { robotId: string, componentId: string }) {
  return rpaApi.robots.installComponent({ ...data, mode: 'EDIT_PAGE' })
}

/**
 * 移除组件
 */
export async function removeComponent(data: { robotId: string, componentId: string }) {
  return rpaApi.robots.removeComponent({ ...data, mode: 'EDIT_PAGE' })
}

/**
 * 添加组件引用
 */
export async function addComponentUse(data: { componentId: string, robotId: string, robotVersion?: number }) {
  return rpaApi.robots.addComponentUse({ ...data, mode: 'EDIT_PAGE' })
}

/**
 * 删除组件引用
 */
export async function deleteComponentUse(data: { componentId: string, robotId: string, robotVersion?: number }) {
  return rpaApi.robots.deleteComponentUse({ ...data, mode: 'EDIT_PAGE' })
}

/**
 * 更新组件引用
 */
export async function updateComponent(data: { robotId: string, componentId: string, componentVersion: number }) {
  return rpaApi.robots.updateComponent({ ...data, mode: 'EDIT_PAGE' })
}

/**
 * 获取组件详情
 */
export async function getComponentDetail(data: { robotId: string, componentId: string }) {
  return rpaApi.robots.getComponentDetail({ ...data, mode: 'EDIT_PAGE' })
}

/**
 * 查询编辑页引入的组件详情
 */
export async function getEditComponentDetail(data: { robotId: string, componentId: string }) {
  return rpaApi.robots.getEditComponentDetail({ ...data, mode: 'EDIT_PAGE' })
}