/*
 * @Author: 魏进 3413105907@qq.com
 * @Date: 2024-05-28 12:26:25
 * @LastEditors: 魏进 3413105907@qq.com
 * @LastEditTime: 2024-06-03 15:03:53
 * @FilePath: \online-exam-system-frontend\src\api\score.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function scorePaging(params) {
  return request({
    url: 'score/paging',
    method: 'get',
    params
  })
}

export function getExamScore(params) {
  return request({
    url: 'score/getExamScore',
    method: 'get',
    params
  })
}

export function exportScores(examId, gradeId) {
  return request({
    url: `score/export/${examId}/${gradeId}`,
    method: 'get',
    responseType: 'blob'
  })
}

