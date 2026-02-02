//创建用户相关仓库
import { defineStore } from "pinia";
import { setToken, getToken, removeToken } from "@/utils/token"
import { reqUserInfo, reqLogout } from "@/api/user/index";


export const useUserStore = defineStore("user", {
    state: () => {
        return {
            token: getToken(), //用户登录token
            username: "", //用户名
            avatar: "", //用户头像
            buttons: [] as string[], //用户按钮权限
            isLoggingOut: false, //正在登出，防止重复调用
        }
    },
    getters: {},
    actions: {
        setToken(token: string) {
            // console.log("设置token", token);
            setToken(token);
            this.token = token;
        },
        async getUserInfo() {
            //获取用户信息，设置用户名、头像
            const res = await reqUserInfo();
            // console.log("用户信息", res);
            if (res.msg === "ok") {
                //更新用户名与头像
                this.username = res.data.username;
                this.avatar = res.data.avatar;
            } else {
                throw new Error("获取用户信息失败");
            }
        },
        async logout() {
            // 防止重复调用logout
            if (this.isLoggingOut) return;

            this.isLoggingOut = true;
            try {
                //退出登录，清除token与用户信息
                let res = await reqLogout();
                if (res.msg === "ok") {
                    this.token = "";
                    this.username = "";
                    this.avatar = "";
                    removeToken();
                }
            } catch (error: any) {
                console.error("退出登录失败", error);
                // 如果token过期（401）或其他错误，直接清除本地状态
                // 此时响应拦截器会处理跳转逻辑
                this.token = "";
                this.username = "";
                this.avatar = "";
                removeToken();
            } finally {
                this.isLoggingOut = false;
            }
        }
    }
});
export default useUserStore;