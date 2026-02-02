//侧边栏折叠状态管理
import { defineStore } from "pinia"
import { constantRoute } from "@/router/routes";

export const useTabbarStore = defineStore("tabbar", {
    state: () => {
        return {    
            isFolded: false, //tabbar是否折叠
            refresh: false, //是否刷新
            menuRoute: constantRoute, //用户菜单路由
        }
    },
    getters: {},
    actions: {
        toggleCollapse() {
            this.isFolded = !this.isFolded;
        },
        refreshPage() {
            this.refresh = !this.refresh;
        }
    }
});
export default useTabbarStore;