import request from '@/utils/request'

export function checkToken() {
  return request({
    url: '/checktoken',
    method: 'get'
  })
}

interface LoginData {
  username: string
  password: string
}
export function login(data: LoginData) {
  return request({
    url: '/stu_login',
    method: 'post',
    data
  })
}

interface GetQuestionsParams {
  code: string
}
export function getQuestions(params: GetQuestionsParams) {
  return request({
    url: 'student/get_item',
    method: 'get',
    params
  })
}
