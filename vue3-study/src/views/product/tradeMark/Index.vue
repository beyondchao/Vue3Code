<template>
    <div class="container">
        <!-- 订单类型 -->
        <el-tabs 
            v-model="tradeMarkStore.activeTab" 
            class="demo-tabs" 
            @tab-click="handleTabClick"
        >
            <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
                <br />
            </el-tab-pane>
        </el-tabs>
        <el-card shadow="never">
            <trade-mark-operate></trade-mark-operate>
            <trade-mark-table></trade-mark-table>
            <trade-mark-pagination></trade-mark-pagination>
        </el-card>
        
    </div>
</template>

<script setup lang="ts" name="tradeMarkIndex">
import { reactive, onMounted } from 'vue'
import TradeMarkTable from './Table.vue'
import TradeMarkPagination from './Pagination.vue'
import TradeMarkOperate from './Operate.vue'
import { useTradeMarkStore } from '@/stores/modules/trademark'

const tradeMarkStore = useTradeMarkStore()

// 定义标签页
const tabs = reactive([
    { label: '全部', name: 'all' },
    { label: '审核中', name: 'checking' },
    { label: '出售中', name: 'saling' },
    { label: '已下架', name: 'off' },
    { label: '库存预警', name: 'min_stock' },
    { label: '回收站', name: 'delete' },
])

// 标签页切换
function handleTabClick(tab: any) {
    console.log('切换标签页:', tab.props.name)
    tradeMarkStore.handleTabChange(tab.props.name)
}

// 组件挂载时获取数据
onMounted(() => {
    tradeMarkStore.fetchTradeMarkList()
})
</script>



<style scoped lang="scss">
.container {}
</style>