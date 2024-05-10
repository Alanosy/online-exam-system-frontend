
import request from '@/utils/request'

export function userbookAdd(data) {
  return request({
    url: 'userbooks',
    method: 'post',
    data
  })
}

export function userbookPaging(params) {
  return request({
    url: 'userbooks/paging',
    method: 'get',
    params
  })
}

export function userbookDel(id) {
  return request({
    url: 'userbooks/' + id,
    method: 'delete'
  })
}

export function userbookUpdate(id, data) {
  return request({
    url: 'userbooks/' + id,
    method: 'put',
    data
  })
}
