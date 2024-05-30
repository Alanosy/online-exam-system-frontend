
import request from '@/utils/request'

export function classAdd(data) {
  return request({
    url: 'grades/add',
    method: 'post',
    data
  })
}

export function classPaging(params) {
  return request({
    url: 'grades/paging',
    method: 'get',
    params
  })
}

export function classDel(id) {
  return request({
    url: '/grades/delete//' + id,
    method: 'delete'
  })
}

export function classUpdate(id, data) {
  return request({
    url: 'grades/update/' + id,
    method: 'put',
    data
  })
}

export function fetchClasses() {
  return request({
    url: 'grades/list',
    method: 'get'
  })
}

export function userClassRemove(ids) {
  return request({
    url: 'grades/remove/' + ids,
    method: 'patch'
  })
}
