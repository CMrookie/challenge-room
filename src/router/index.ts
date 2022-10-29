import { createRouter, createWebHistory, Router } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { devLog } from '@/utils/devLog'
// import { Layout } from '@/components/layout'
/**
 * 懒加载无法对tsx文件使用，使用后会给出警告并且无法加载组件。
 * [Vue Router warn]: Unexpected error when starting the router: TypeError: Cannot read properties of undefined (reading '__vccOpts')
 * 查找解决方案无果，可能目前使用vue但整个项目使用tsx书写view和component的人太少，没人发现
 * 目前只能退而为views使用sfc写法，否则只能同步应用
 */
// const Layout = () => import('@/components/layout/index.vue')
const Login = () => import('@/views/challnegeLogin.vue')
const Scan = () => import('@/views/challengeScan.vue')
const Test = () => import('@/views/challengeTest.vue')
const Archives = () => import('@/views/challengeArchives.vue')
const Answer = () => import('@/views/challengeAnswer.vue')
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
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
  history: createWebHistory(),
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
