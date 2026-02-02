//侧边栏折叠状态管理
import { defineStore } from "pinia"

export const useTabbarstore = defineStore("tabbar", {
    state: () => {
        return {    
            isFolded: false, //tabbar是否折叠
            refresh: false //是否刷新
        }
    },
    getters: {},
    actions: {
        toggleCollapse() {
            this.isFolded = !this.isFolded;
        },
        setRefresh() {
            this.refresh = !this.refresh;
        }
    }
});
export default useTabbarstore;