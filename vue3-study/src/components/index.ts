import SvgIcon from "@/components/svgicon/Index.vue"
import Pagination from "@/components/pagination/Index.vue"
let allGlobalComponent = {SvgIcon, Pagination}

//对外暴露对象
export default {
    install (app:any) {
        Object.keys(allGlobalComponent).forEach(key => {
            app.component(key, allGlobalComponent[key])
        })
    }
}