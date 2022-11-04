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
    url: 'student/get_question',
    method: 'get',
    params
  })
}

//get Students Userinfo
export function getStudentsInfo() {
  return request({
    url: 'student/get_user',
    method: 'get'
  })
}

interface Answer {
  id: number
  title: string
  options: { content: string; content1: string; default: boolean }[]
  type: number
  isCorrcet: boolean
  userAnswer: 0 | 1[]
}
interface FinishAnswerData {
  total_grade: number
  appid: number
  answers: Answer
}
export function finishAnswer(data: FinishAnswerData) {
  return request({
    url: '/student/finish_answer',
    method: 'post',
    data
  })
}

// 查询历史记录
export function getHistoryList() {
  return request({
    url: '/student/get_history_list',
    method: 'get'
  })
}
