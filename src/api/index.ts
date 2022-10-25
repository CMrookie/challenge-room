import request from '@/utils/request'

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
    url: 'student/get_item?code=',
    method: 'get',
    params
  })
}
