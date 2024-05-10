import request from '@/utils/request'

export function quAdd(data) {
  return request({
    url: 'questions/single',
    method: 'post',
    data
  })
}
export function quPaging(params) {
  return request({
    url: 'questions/paging',
    method: 'get',
    params
  })
}

export function quUpdate(id,data) {
  return request({
    url: 'questions/' + id,
    method: 'put',
    data: data
  })
}

export function quDel(ids) {
  return request({
    url: 'questions/batch/'+ ids,
    method: 'delete'
  })
}
