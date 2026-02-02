//用户相关接口
import request from "@/utils/request";
import type { loginForm, loginResponseData, userResponseData,
    logoutResponseData
 } from "./type";
//统一管理接口
enum API {
    LOGIN_URL = "/admin/login",
    USERIN_URL = "/admin/getinfo",
    LOGOUT_URL = "/admin/logout"
}
//暴露请求函数
//登录接口
export const reqLogin = (data:loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () => request.post<any, userResponseData>(API.USERIN_URL)
//登出
export const reqLogout = () => request.post<any, logoutResponseData>(API.LOGOUT_URL)