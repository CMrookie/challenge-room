import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  Router
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { devLog } from '@/utils/devLog'

const Login = () => import('@/views/challnegeLogin.vue')
const Scan = () => import('@/views/challengeScan.vue')
const Test = () => import('@/views/challengeTest.vue')
const Archives = () => import('@/views/challengeArchives.vue')
const Answer = () => import('@/views/challengeAnswer.vue')
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // redirect: '/login'
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/scan',
    component: Scan
  },
  {
    path: '/test',
    component: Test
  },
  {
    path: '/answer',
    component: Answer
  },
  {
    path: '/archives',
    component: Archives
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = false // storage.get('access_token')
  devLog(['to: ', to])
  if (!token) {
    if (to.path === '/login') {
      devLog(['token false & to.path'])
      return next()
    }
    // return next({name: 'login', query: { redirect: to.fullPath }, replace: true})
    devLog(['token false'])
    return next()
  }
  devLog(['token true'])
  next()
})

export default router
