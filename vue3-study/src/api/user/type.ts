//登录接口需要携带胡参数类型
export interface loginForm {
    username: string,
    password: string
}
//登录接口返回胡数据类型
interface dataType {
    token?: string
}
export interface loginResponseData {
    msg: string,
    data: dataType
}
//定义服务器返回用户信息相关胡数据类型
interface role {
    id: number,
    name: string
}
interface menus {
    id: number,
    rule_id: number,
    status: number,
    create_time: string,
    update_time: string,
}
interface userInfo {
    id: number,
    username: string,
    avatar: string,
    super: number,
    role: role,
    menus: menus,
}
export interface userResponseData {
    msg: string,
    data: userInfo
}
//退出登录相应数据类型
export interface logoutResponseData {
    msg: string,
    data: string,
    errorCode: number
}