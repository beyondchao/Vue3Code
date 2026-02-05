<template>
    <!-- 操作按钮 -->
    <div class="operate-container">
        <!-- 商品搜索 -->
        <div class="search">
            <el-input style="width: 240px" placeholder="请输入商品名称" v-model="tradeMarkStore.searchInput" clearable
                @keyup.enter="handleSearch">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
            <el-button class="search-button" size="default" type="primary" @click="handleSearch">搜索</el-button>
            <el-button class="reset-button" size="default" @click="handleReset">重置</el-button>
        </div>
        <!-- 操作按钮 -->
        <div class="operate">
            <el-button class="my-button" size="default" type="primary" :icon="Plus" @click="handleDdd">新增商品</el-button>
            <el-button class="add-button" size="default" type="danger" :icon="Delete" @click="handleBatchDelete"
                :disabled="tradeMarkStore.selectedItems.length === 0">
                批量删除
            </el-button>
        </div>
    </div>
    <OperateDialog :visible="dialogVisible" @update:visible="dialogVisible = $event" @save="handleSave" />
</template>

<script setup lang="ts" name="tradeMarkOperate">
import { ref } from 'vue'
import { Plus, Delete, Search } from '@element-plus/icons-vue'
import { useTradeMarkStore } from '@/stores/modules/trademark'
import { ElMention, ElMessageBox } from 'element-plus'
import OperateDialog from './OperateDialog.vue'
import type { TradeMarkItem } from '@/api/product/trademark/type'

let dialogVisible = ref(false)
const tradeMarkStore = useTradeMarkStore()

// 搜索
const handleSearch = () => {
    tradeMarkStore.handleSearch()
}

// 重置
const handleReset = () => {
    tradeMarkStore.handleReset()
}
// 打开新增对话框
const handleDdd = () => {
    dialogVisible.value = true
}
// 新增商品
const handleSave = async (data: Partial<TradeMarkItem>) => {
    // TODO: 打开新增对话框
    try {
        let res = await tradeMarkStore.addTradeMark(data)
        console.log('添加商品成功:', res)
        // dialogVisible.value = false
        // ElMessageBox.alert('商品添加成功', '提示', {
        //     confirmButtonText: '确定',
        // })
    } catch (error) {
        // 处理错误，例如显示错误消息
        console.error('添加商品失败:', error)
        ElMention.alert('添加商品失败，请重试', '错误', {
            confirmButtonText: '确定',
        })

        return
    }

}

// 批量删除
const handleBatchDelete = async () => {
    const count = tradeMarkStore.selectedItems.length
    if (count === 0) return

    try {
        await ElMessageBox.confirm(
            `确定要删除选中的 ${count} 个商品吗？`,
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        await tradeMarkStore.batchDelete()
        // 删除后检查当前页是否还有数据，如果没有则跳转到上一页
        let length = tradeMarkStore.tableData.length
        if (length < 1 && tradeMarkStore.currentPage > 1) {
            tradeMarkStore.currentPage = tradeMarkStore.currentPage - 1
            tradeMarkStore.fetchTradeMarkList()
        }
    } catch {
        // 用户取消删除
    }
}
</script>

<style scoped lang="scss">
.operate-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    overflow: hidden;
    white-space: nowrap;

    .search {
        display: flex;
        align-items: center;

        .search-button {
            margin-left: 10px;
        }
    }
}
</style>