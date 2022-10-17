import { createRouter, createWebHistory, Router } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// import { Layout } from '@/components/layout'
/**
 * 懒加载无法对tsx文件使用，使用后会给出警告并且无法加载组件。
 * [Vue Router warn]: Unexpected error when starting the router: TypeError: Cannot read properties of undefined (reading '__vccOpts')
 * 查找解决方案无果，可能目前使用vue但整个项目使用tsx书写view和component的人太少，没人发现
 * 目前只能退而为views使用sfc写法，否则只能同步应用
 */
// const Layout = () => import('../components/layout/index')
const Layout = () => import('@/components/layout/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   let token = storage.get('access_token')
//   // console.log(to)
//   if (!token) {
//     if (to.name === 'login') {
//       return next()
//     }
//     return next({name: 'login', query: { redirect: to.fullPath }, replace: true})
//   }
//   next()
// })

export default router
