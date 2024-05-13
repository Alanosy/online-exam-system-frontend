import request from '@/utils/request'

export function exercisePaging(params) {
  return request({
    url: 'exercises/getRepo',
    method: 'get',
    params
  })
}

