import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
import { permissionRouter } from './permission'

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
//配置路由权限
permissionRouter(router)
//导出路由实例
export default router
