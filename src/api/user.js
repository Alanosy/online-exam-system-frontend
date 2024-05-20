/*
 * @Author: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @Date: 2024-03-04 10:34:47
 * @LastEditors: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @LastEditTime: 2024-05-13 11:04:09
 * @FilePath: \vue-admin-template\src\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export function classAdd(data) {
  return request({
    url: 'user',
    method: 'post',
    data
  })
}


export function login(data) {
  return request({
    url: 'auths/login',
    method: 'post',
    data
  })
}
export function verifyCode(code) {
  return request({
    url: 'auths/verifyCode/' + code,
    method: 'post',
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auths/logout',
    method: 'delete'
  })
}

export function userPaging(params) {
  return request({
    url: 'user/paging',
    method: 'get',
    params
  })
}
export function userDel(ids) {
  return request({
    url: 'user/'+ids,
    method: 'delete',
  })
}
export function userImport(data) {
  return request({
    url: 'user/import',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

