
import request from '@/utils/request'


export function examPaging(params) {
  return request({
    url: 'exams/paging',
    method: 'get',
    params
  })
}

export function repoAdd(data) {
  return request({
    url: 'repo',
    method: 'post',
    data
  })
}

export function repoDel(id) {
  return request({
    url: 'repo/' + id,
    method: 'delete'
  })
}

export function repoUpdate(id, data) {
  return request({
    url: 'repo/' + id,
    method: 'put',
    data
  })
}
export function getGradeExamList(params) {
  return request({
    url: 'exams/grade',
    method: 'get',
    params
  })
}

export function getExamDetail(examId) {
  return request({
    url: 'exams/detail?examId='+examId,
    method: 'get',
  })
}
export function examStart(examId) {
  return request({
    url: 'exams/start?examId='+examId,
    method: 'get',
  })
}

export function examQuList(examId) {
  return request({
    url: 'exams/question/list/'+examId,
    method: 'get',
  })
}

export function fillAnswer(data) {
  return request({
    url: 'exams/full-answer',
    method: 'post',
    data
  })
  
}

  export function quDetail(params) {
    return request({
      url: 'exams/question/single',
      method: 'get',
      params
    })
    
  }