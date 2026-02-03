<template>
    <!-- 分页 -->
    <div class="pagination-container">
        <el-pagination 
            v-model:current-page="tradeMarkStore.currentPage" 
            v-model:page-size="tradeMarkStore.pageSize" 
            :page-sizes="[6, 8, 10, 12, 18, 24]"
            :size="size" 
            :disabled="tradeMarkStore.loading" 
            :background="background"
            layout="prev, pager, next, jumper, ->, sizes, ->, total" 
            :total="tradeMarkStore.total" 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" 
        />
    </div>
</template>

<script setup lang="ts" name="tradeMarkPagination">
import { ref } from 'vue'
import { useTradeMarkStore } from '@/stores/modules/trademark'

const tradeMarkStore = useTradeMarkStore()

const size = ref('default')
const background = ref(true)

// 每页数量变化
function handleSizeChange(val: number) {
    console.log(`每页 ${val} 条`)
    tradeMarkStore.handleSizeChange(val)
}

// 当前页变化
function handleCurrentChange(val: number) {
    console.log(`当前页: ${val}`)
    tradeMarkStore.handleCurrentChange(val)
}
</script>


<style scoped lang="scss">
.pagination-container {
    margin-top: 20px;
    text-align: right;
}
</style>