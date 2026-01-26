//本地存储与读取数据
export const setToken = (token: string) => {
    localStorage.setItem("token", token);
}
//删除本地存储数据
export const removeToken = () => {
    localStorage.removeItem("token");   
}
//获取本地存储数据     
export const getToken = (): string => {
    return localStorage.getItem("token") || "";
}