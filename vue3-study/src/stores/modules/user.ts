//创建用户相关仓库
import { defineStore } from "pinia";
import { setToken, getToken } from "@/utils/token"
import { constantRoute } from "@/router/routes";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            token: getToken(), //用户登录token
            menuRoute: constantRoute //用户菜单路由
        }
    },
    getters: {},
    actions: {
        setToken(token: string) {
            // console.log("设置token", token);
            setToken(token);
            this.token = token;
        }
    }
});
export default useUserStore;