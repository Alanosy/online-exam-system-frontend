/*
 * @Author: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @Date: 2024-04-22 15:48:54
 * @LastEditors: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @LastEditTime: 2024-04-22 15:54:13
 * @FilePath: \vue-admin-template\src\api\qu\repo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { post } from '@/utils/request1'

/**
 * 题库详情
 * @param data
 */
export function fetchDetail(data) {
  return post('/exam/api/repo/detail', data)
}

/**
 * 保存题库
 * @param data
 */
export function saveData(data) {
  return post('/exam/api/repo/save', data)
}

/**
 * 保存题库
 * @param data
 */
export function fetchPaging(data) {
  return post('/exam/api/repo/paging', data)
}

/**
 * 题库批量操作
 * @param data
 */
export function batchAction(data) {
  return post('/exam/api/repo/batch-action', data)
}
