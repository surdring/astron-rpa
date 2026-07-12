import { rpaApi } from '@rpa/shared'

/**
 * @description: 发布组件
 */
export function publishComponent(data: {
  componentId: string
  nextVersion: string
  updateLog: string
  name: string
  icon: string
  introduction: string
}) {
  return rpaApi.component.publishComponent(data)
}

/**
 * @description: 获取组件下一个版本号
 */
export function getComponentNextVersion(params: {
  componentId: string
}) {
  return rpaApi.component.getComponentNextVersion(params)
}

/**
 * @description: 将AI生成的代码转换成智能组件原子能力信息
 */
export async function codeToMeta(data: { code: string }) {
  return rpaApi.component.codeToMeta(data)
}

/**
 * @description: 智能组件存储
 */
export async function saveSmartComp(data) {
  const res = await rpaApi.component.saveSmartComp(data)
  return res as string
}

/**
 * @description: 智能组件读取
 */
export async function getSmartComp(data: { robotId: string, smartId: string }) {
  return rpaApi.component.getSmartComp(data)
}

/**
 * @description: 优化提问
 */
export async function optimizeQuestion(data: {
  sceneCode: string
  user: string
  elements: any[]
}) {
  const res = await rpaApi.component.optimizeQuestion({ ...data, chatHistory: [] })
  return res.data?.choices?.[0]?.message?.content || ''
}