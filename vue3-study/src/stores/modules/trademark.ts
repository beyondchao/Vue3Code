// 品牌管理 Pinia Store
import { defineStore } from "pinia";
import { reqTradeMarkList } from "@/api/product/trademark/Index";
import { ElMessage } from "element-plus";

// 定义表格数据项类型
export interface TradeMarkItem {
    id: number;
    index?: number;
    title: string;       // 商品名称
    cover: string;       // 商品标志/封面
    category_id: number; // 分类ID
    rating: number;      // 评分
    sale_count: number;   // 销量
    review_count: number;  // 评论数
    min_price: number;      // 最低价格
    stock: number;       // 库存
    min_stock: number;    // 最低库存
    status: number;      // 商品状态 0-下架 1-上架
    ischecked?: number;  // 是否审核 0-未审核 1-已审核
    create_time: string,    // 创建时间
    category: category, // 分类信息
}
//定义品牌管理数据类型
interface category {
    id: number,
    name: string,
    status: number,
    create_time: string,    // 创建时间
    update_time: string,   // 更新时间
    category_id: number,    // 分类ID
}
// 定义状态类型
interface TradeMarkState {
    tableData: TradeMarkItem[];
    searchInput: string;
    currentPage: number;
    pageSize: number;
    total: number;
    loading: boolean;
    activeTab: string;   // 当前激活的标签页
}

export const useTradeMarkStore = defineStore("trademark", {
    state: (): TradeMarkState => ({
        tableData: [],
        searchInput: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        activeTab: "all",
    }),

    getters: {
        // 根据搜索条件过滤数据
        filteredTableData: (state) => {
            if (!state.searchInput) return state.tableData;
            return state.tableData.filter((item) =>
                item.title.toLowerCase().includes(state.searchInput.toLowerCase())
            );
        },
        
        // 根据标签页过滤数据
        filteredByTab: (state) => {
            let data = state.tableData;
            switch (state.activeTab) {
                case 'all':
                    return data;
                case 'checking':
                    return data.filter(item => item.status === 2); // 假设 2 表示审核中
                case 'saling':
                    return data.filter(item => item.status === 1); // 1 表示出售中
                case 'off':
                    return data.filter(item => item.status === 0); // 0 表示已下架
                case 'min_stock':
                    return data.filter(item => item.stock <= item.min_stock); // 库存预警
                case 'delete':
                    return data.filter(item => item.status === -1); // -1 表示回收站
                default:
                    return data;
            }
        },

        // 选中的商品
        selectedItems: (state) => {
            return state.tableData.filter((item) => item.ischecked === 1);
        },
    },

    actions: {
        // 获取品牌列表数据
        async fetchTradeMarkList() {
            this.loading = true;
            try {
                const res = await reqTradeMarkList(this.currentPage, {
                    title: this.searchInput,
                    limit: this.pageSize,
                    tab: this.activeTab,
                    categoryId: 2, // 示例分类ID，可根据需要修改
                });
                
                if (res.msg === "ok" && res.data) {
                    // 处理数据，添加序号
                    this.tableData = res.data.list.map((item: TradeMarkItem, index: number) => ({
                        ...item,
                        index: (this.currentPage - 1) * this.pageSize + index + 1,
                        ischecked: 0, // 默认未选中
                    }));
                    this.total = res.data.totalCount || 0;
                } else {
                    ElMessage.error("获取品牌列表失败");
                }
            } catch (error) {
                console.error("获取品牌列表失败", error);
                ElMessage.error("网络错误，请稍后重试");
            } finally {
                this.loading = false;
            }
        },

        // 设置搜索关键词
        setSearchInput(value: string) {
            this.searchInput = value;
        },

        // 执行搜索
        async handleSearch() {
            // 重置到第一页
            this.currentPage = 1;
            await this.fetchTradeMarkList();
        },

        // 重置搜索
        async handleReset() {
            this.searchInput = "";
            this.currentPage = 1;
            await this.fetchTradeMarkList();
        },

        // 切换页码
        async handleCurrentChange(page: number) {
            this.currentPage = page;
            await this.fetchTradeMarkList();
        },

        // 切换每页显示数量
        async handleSizeChange(size: number) {
            this.pageSize = size;
            this.currentPage = 1; // 重置到第一页
            await this.fetchTradeMarkList();
        },

        // 切换标签页
        async handleTabChange(tabName: string) {
            this.activeTab = tabName;
            this.currentPage = 1; // 重置到第一页
            await this.fetchTradeMarkList();
        },

        // 切换商品选中状态
        toggleItemCheck(id: number) {
            const item = this.tableData.find((item) => item.id === id);
            if (item) {
                item.ischecked = item.ischecked === 1 ? 0 : 1;
            }
        },

        // 全选/取消全选
        toggleAllCheck(checked: boolean) {
            this.tableData.forEach((item) => {
                item.ischecked = checked ? 1 : 0;
            });
        },

        // 批量删除选中的商品
        async batchDelete() {
            const selectedIds = this.selectedItems.map((item) => item.id);
            if (selectedIds.length === 0) {
                ElMessage.warning("请先选择要删除的商品");
                return;
            }
            
            try {
                // TODO: 调用删除接口
                // await reqDeleteTradeMark(selectedIds);
                ElMessage.success(`成功删除 ${selectedIds.length} 个商品`);
                await this.fetchTradeMarkList();
            } catch (error) {
                console.error("删除失败", error);
                ElMessage.error("删除失败，请稍后重试");
            }
        },

        // 新增商品
        async addTradeMark(data: Partial<TradeMarkItem>) {
            try {
                // TODO: 调用新增接口
                // await reqAddTradeMark(data);
                ElMessage.success("新增商品成功");
                await this.fetchTradeMarkList();
            } catch (error) {
                console.error("新增失败", error);
                ElMessage.error("新增失败，请稍后重试");
            }
        },

        // 编辑商品
        async updateTradeMark(id: number, data: Partial<TradeMarkItem>) {
            try {
                // TODO: 调用更新接口
                // await reqUpdateTradeMark(id, data);
                ElMessage.success("更新商品成功");
                await this.fetchTradeMarkList();
            } catch (error) {
                console.error("更新失败", error);
                ElMessage.error("更新失败，请稍后重试");
            }
        },

        // 删除单个商品
        async deleteTradeMark(id: number) {
            try {
                // TODO: 调用删除接口
                // await reqDeleteTradeMark([id]);
                ElMessage.success("删除商品成功");
                await this.fetchTradeMarkList();
            } catch (error) {
                console.error("删除失败", error);
                ElMessage.error("删除失败，请稍后重试");
            }
        },
    },
});
