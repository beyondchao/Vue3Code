
// 导入图标组件
import {
  HomeFilled,
  Platform,
  Lock,
  Goods,
  HelpFilled,
  ChromeFilled,
  GoodsFilled,
  Shop,
  User,
  Stamp
} from '@element-plus/icons-vue'
import { markRaw } from 'vue'

const routeData = [
  {
    path: '/login',
    component: () => import('@/views/login/Index.vue'),
    name: 'login'
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home/welcome',
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import('@/views/home/Index.vue'),
        children: [
          {
            path: '/home/welcome',
            component: () => import('@/views/home/Welcome.vue'),
            meta: {
              title: "首页",
              showInMenu: true,
              icon: markRaw(HomeFilled),
            }
          }
        ]
      },
      {
        name: "data-screen",
        path: "/data-screen",
        component: () => import('@/views/screen/Index.vue'),
        meta: {
          title: "数据大屏",
          icon: markRaw(Platform),
        }
      },
      {
        name: "acl",
        path: "/acl",
        component: () => import('@/views/home/Index.vue'),
        meta: {
          title: "权限管理",
          icon: markRaw(Lock),
          showInMenu: true,
        },
        children: [
          {
            path: "/acl/permission",
            component: () => import('@/views/acl/permission/Index.vue'),
            meta: {
              title: "权限管理",
              showInMenu: true,
              icon: markRaw(Lock),
            }
          },
          {
            name: "用户管理",
            path: "/acl/user",
            component: () => import('@/views/acl/user/Index.vue'),
            meta: {
              title: "用户管理",
              showInMenu: true,
              icon: markRaw(User),
            }
          },
          {
            name: "角色管理",
            path: "/acl/role",
            component: () => import('@/views/acl/role/Index.vue'),
            meta: {
              title: "角色管理",
              showInMenu: true,
              icon: markRaw(Stamp),
            }
          }
        ]
      },
      {
        name: "goods",
        path: "/goods",
        component: () => import('@/views/home/Index.vue'),
        meta: {
          title: "商品管理",
          icon: markRaw(Goods),
          showInMenu: true,
        },
        children: [
          {
            name: "SPU管理",
            path: "/goods/spu",
            component: () => import('@/views/product/spu/Index.vue'),
            meta: {
              title: "SPU管理",
              showInMenu: true,
              icon: markRaw(ChromeFilled),
            }
          },
          {
            name: "SKU管理",
            path: "/goods/sku",
            component: () => import('@/views/product/sku/Index.vue'),
            meta: {
              title: "SKU管理",
              showInMenu: true,
              icon: markRaw(Shop),
            }
          },
          {
            name: "属性管理",
            path: "/goods/attribute",
            component: () => import('@/views/product/attribute/Index.vue'),
            meta: {
              title: "属性管理",
              showInMenu: true,
              icon: markRaw(HelpFilled),
            }
          },
          {
            name: "商品管理",
            path: "/goods/tradeMark",
            component: () => import('@/views/product/tradeMark/Index.vue'),
            meta: {
              title: "商品管理",
              showInMenu: true,
              icon: markRaw(GoodsFilled),
            }
          }
        ]
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404/Index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  }
]

export const constantRoute = markRaw(routeData)