
import request from '@/utils/request'

export function fetchCertificates(params) {
  return request({
    url: 'certificate/paging',
    method: 'get',
    params
  })
}