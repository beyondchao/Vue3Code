import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
import { getToken } from '@/utils/token'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoute,
  scrollBehavior: (to, from, savedPosition) => {
    return {
      left: savedPosition?.left || 0,
      top: savedPosition?.top || 0
    }
  }
})
// 如果没有登录，默认跳转到登录页
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && to.path !== '/login') {
    next('/login')  // 默认跳转登录
  } else if (token && to.path === '/login') {
    next('/')  // 已经登录的话，跳转到首页
  }
  else {
    next()
  }
})
export default router
