import { rpaApi } from '@rpa/shared'

import type { Task } from '@/types/schedule'

/**
 * @description: 获取计划任务列表数据
 */
export async function getScheduleLst(data) {
  const res = await rpaApi.tasks.getScheduleLst(data)
  return res || { records: [], total: 0 }
}

/**
 * @description: cron表达式校验
 */
export function checkCronExpression(data) {
  return rpaApi.tasks.checkCronExpression(data)
}

/**
 * @description: 获取计划任务执行记录列表数据
 */
export async function getTaskExecuteLst(data) {
  const res = await rpaApi.records.getTaskExecuteLst(data)
  return res || { records: [], total: 0 }
}

/**
 * @description: 倒计时的计划任务取消
 */
export function taskCancel(data) {
  return rpaApi.tasks.taskCancel(data)
}

// 手动触发
export function manualTrigger(data: { task_id: string }) {
  return rpaApi.tasks.manualTrigger(data)
}

// taskNotify 通知触发器更新
export function taskNotify(params = { event: 'normal' }) {
  return rpaApi.tasks.taskNotify(params)
}

// 获取计划任务未来执行时间
export function taskFutureTime(data: { task_id: string, times: number }) {
  return rpaApi.tasks.taskFutureTime(data)
}

export function taskFutureTimeNoCreate(data: { frequency_flag: string, times: number }) {
  return rpaApi.tasks.taskFutureTimeNoCreate(data)
}

// 重命名校验
export async function isNameCopy(data: { name: string }) {
  return rpaApi.tasks.isNameCopy(data)
}

// 应用列表
export function getRobotList(data: { name: string }) {
  return rpaApi.tasks.getRobotList(data)
}

// 新增计划任务
export async function insertTask(data: Task) {
  const res = await rpaApi.tasks.insertTask(data)
  taskNotify()
  return res
}

// 获取单个计划任务接口
export function getTaskInfo(data: { taskId: string }) {
  return rpaApi.tasks.getTaskInfo(data)
}

// 删除单个计划任务接口
export async function deleteTask(data: { taskId: string }) {
  const res = await rpaApi.tasks.deleteTask(data)
  taskNotify()
  return res
}

// 更新计划任务接口
export async function updateTask(data: Task) {
  const res = await rpaApi.tasks.updateTask(data)
  taskNotify()
  return res
}

// 启用/禁用 计划任务
export async function enableTask(data: { taskId: string, enable: number }) {
  const res = await rpaApi.tasks.enableTask(data)
  taskNotify()
  return res
}

// 获取计划任务队列状态
export function getTaskQueueList(data) {
  return rpaApi.tasks.getTaskQueueList(data)
}

// 移除计划任务队列
export function removeTaskQueue(data: { unique_id: string[] }) {
  return rpaApi.tasks.removeTaskQueue(data)
}

// 更新计划任务队列配置
export function updateTaskQueueConfig(data: { max_length: number, max_wait_minutes: number, deduplicate: boolean }) {
  return rpaApi.tasks.updateTaskQueueConfig(data)
}

// 获取计划任务队列配置
export function getTaskQueueConfig() {
  return rpaApi.tasks.getTaskQueueConfig()
}