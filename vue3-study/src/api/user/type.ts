//登录接口需要携带胡参数类型
export interface loginForm {
    username: string,
    password: string
}
//登录接口返回胡数据类型
interface dataType {
    token: string,
    message: string
}
export interface loginResponseData {
    code: number,
    data: dataType
}
//定义服务器返回用户信息相关胡数据类型
interface role {
    id: number,
    name: string
}
interface userInfo {
    id: number,
    status: number,
      create_time: string,
      update_time: string,
      username: string,
      password: string,
      avatar: string,
      role_id: number,
      super: number,
      route: string[],
      token: string,
      role: role
}
interface user {
    checkUser: userInfo
}
export interface userResponseData {
    code: number,
    data: user
}