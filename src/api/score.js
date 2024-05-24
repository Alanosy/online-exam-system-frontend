import request from '@/utils/request'

export function scorePaging(params) {
  return request({
    url: 'score/paging',
    method: 'get',
    params
  })
}