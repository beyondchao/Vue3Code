//创建用户相关仓库
import { defineStore } from "pinia";
import { setToken, getToken } from "@/utils/token"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            token: getToken()
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