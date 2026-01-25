import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
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

export default router
