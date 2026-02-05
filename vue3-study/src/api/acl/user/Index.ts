// 用户管理相关接口
import type { UserResponseData } from './type'
import request from '@/utils/request'

const enum API {
    USER_LIST_URL = '/admin/manager/',
}

// 获取管理员列表
// GET /admin/manager/{page}
export const reqGetUserList = (
    page: number,
    params?: { limit?: number, keyword?: string }
) => {
    return request.get<any, UserResponseData>(
        `${API.USER_LIST_URL}${page}`,
        { params: params })
}