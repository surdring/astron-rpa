import { crudApi } from '@rpa/shared'

// 举报AI生成内容
export function aiFeedback<T>(data: T) {
  return crudApi.feedback.create(data)
}