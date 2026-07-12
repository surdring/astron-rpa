import { rpaApi } from '@rpa/shared'

// 新建工程
export function createProject(data) {
  return rpaApi.projects.createProject(data)
}

// 新建工程-数量校验
export function checkProjectNum() {
  return rpaApi.projects.checkProjectNum()
}

/**
 * 检测应用是否被计划任务引用被返回引用这个应用的计划任务的数组
 */
export async function isInTask(params) {
  return rpaApi.projects.isInTask(params)
}

// 删除工程
export function delectProject(data) {
  return rpaApi.projects.deleteProject(data)
}

/**
 * @description: 获取设计器列表页列表数据
 */
export async function getDesignList(data) {
  return rpaApi.projects.getDesignList(data)
}

/**
 * 分享至市场
 */
export function shareRobotToMarket(data) {
  return rpaApi.projects.shareRobotToMarket(data)
}

/**
 * 获取版本列表
 */
export async function getVersionLst<T>(params) {
  return rpaApi.versions.getVersionLst(params)
}

/**
 * 恢复版本
 */
export function versionRecover(data) {
  return rpaApi.versions.versionRecover(data)
}

/**
 * 启用版本
 */
export function versionEnable(data) {
  return rpaApi.versions.versionEnable(data)
}

/**
 * 重命名
 */
export function rename(params) {
  return rpaApi.projects.rename(params)
}

/**
 * 重命名校验
 */
export function renameCheck(params) {
  return rpaApi.projects.renameCheck(params)
}

/**
 * 创建副本
 */
export function createCopy(params) {
  return rpaApi.projects.createCopy(params)
}

/**
 * 创建副本
 */
export async function getDefaultName() {
  return rpaApi.projects.getDefaultName()
}

/**
 * 获取组件列表
 */
export async function getComponentList(data: {
  name: string
  dataSource: 'create' | 'market'
  pageNum?: number
  pageSize?: number
  sortType?: string
}) {
  const res = await rpaApi.projects.getComponentList(data)
  return res || { records: [], total: 0 }
}

// 新建组件
export function createComponent(params: { componentName: string }) {
  return rpaApi.projects.createComponent(params)
}

/**
 * 新建组件-获取默认组件名称
 */
export async function getDefaultComponentName() {
  return rpaApi.projects.getDefaultComponentName()
}

/**
 * 检查组件名称是否重复
 */
export async function checkComponentName(params: { name: string, componentId?: string }) {
  return rpaApi.projects.checkComponentName(params)
}

/**
 * 重命名组件
 */
export function renameComponent(params: { newName: string, componentId: string }) {
  return rpaApi.projects.renameComponent(params)
}

/**
 * 删除组件
 */
export async function deleteComponent(params: { componentId: string }) {
  return rpaApi.projects.deleteComponent(params)
}

/**
 * 创建副本组件名称
 */
export async function createCopyComponentName(params: { componentId: string }) {
  return rpaApi.projects.createCopyComponentName(params)
}

/**
 * 创建副本
 */
export async function createCopyComponent(params: { componentId: string, name: string }) {
  return rpaApi.projects.createCopyComponent(params)
}

/**
 * 获取组件详情
 */
export async function getComponentDetail(params: { componentId: string }) {
  return rpaApi.projects.getComponentDetail(params)
}

/**
 * 获取组件下一个版本号
 */
export async function getComponentNextVersion(params: { componentId: string }) {
  return rpaApi.projects.getComponentNextVersion(params)
}

/**
 * 组件发版
 */
export async function publishComponent<T>(params: T) {
  return rpaApi.projects.publishComponent(params)
}