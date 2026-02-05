//管理员列表返回数据类型
export interface UserResponseData {
    msg: string,
    data: {
        list: UserItem[],
        totalCount: number,
        roles: Role[]
    }
}
export interface UserItem {
    id: number,
    username: string,
    status: number,
    create_time: string,
    update_time: string,
    avatar: string,
    super: number,
    role: Role
}
interface Role {
    id: number,
    name: string
}