import { getToken } from '@/utils/token'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/modules/user'
import setting from '@/setting'

nprogress.configure({ showSpinner: false }) // 关闭加载时的旋转效果

export function permissionRouter(router: any) {
    // 如果没有登录，默认跳转到登录页, 已经登录的话，跳转到首页
    router.beforeEach((to: any, from: any, next: any) => {
        //前置路由守卫
        document.title = to.meta.title ? to.meta.title + `-${setting.title}` : 'vue3后台管理系统' //设置页面标题
        nprogress.start() // 开始进度条
        const token = getToken() //获取token
        if (!token && to.path !== '/login') {
            next('/login')  // 默认跳转登录
        } else if (token && to.path === '/login') {
            next('/')  // 已经登录的话，跳转到首页
        }
        else {
            // console.log("有token，放行", token);
            let userStore = useUserStore();
            if (token && !userStore.username) {
                //如果有token但没有用户信息，获取用户信息
                userStore.getUserInfo().then(() => {
                    next({ ...to, replace: true }) //获取用户信息成功，继续跳转当前路由
                }).catch((error) => {
                    console.log("获取用户信息失败", error);
                    //获取用户信息失败，跳转登录页重新登录,token失效
                    userStore.logout();
                    next('/login', { replace: true, query: { redirect: to.fullPath } });
                });
            } else {
                //有用户信息，直接放行
                next()
            }
        }
    })
    router.afterEach((to: any, from: any) => {
        //后置路由守卫
        nprogress.done() // 结束进度条
    })
}