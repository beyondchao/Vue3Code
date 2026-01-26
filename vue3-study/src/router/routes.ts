import path from 'path';

export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/Index.vue'),
    name: 'login'
  },
  {
    path: '/',
    component: () => import('@/views/home/Index.vue'),
    name: 'home'
  }, {
    path: '/404',
    component: () => import('@/views/404/Index.vue'),
    name: '404'
  }, {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any'
  }
]