<template>
    <!-- 操作按钮 -->
    <div class="operate-container">
        <!-- 商品搜索 -->
        <div class="search">
            <el-input 
                style="width: 240px" 
                placeholder="请输入商品名称" 
                v-model="tradeMarkStore.searchInput" 
                clearable
                @keyup.enter="handleSearch"
            >
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
            <el-button class="my-button" size="default" type="primary" :icon="Plus" @click="handleAdd">新增商品</el-button>
            <el-button 
                class="add-button" 
                size="default" 
                type="danger" 
                :icon="Delete" 
                @click="handleBatchDelete"
                :disabled="tradeMarkStore.selectedItems.length === 0"
            >
                批量删除
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts" name="tradeMarkOperate">
import { Plus, Delete, Search } from '@element-plus/icons-vue'
import { useTradeMarkStore } from '@/stores/modules/trademark'
import { ElMessageBox } from 'element-plus'

const tradeMarkStore = useTradeMarkStore()

// 搜索
const handleSearch = () => {
    tradeMarkStore.handleSearch()
}

// 重置
const handleReset = () => {
    tradeMarkStore.handleReset()
}

// 新增商品
const handleAdd = () => {
    // TODO: 打开新增对话框
    console.log('新增商品')
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

        .search {
            display: flex;
            align-items: center;

            .search-button {
                margin-left: 10px;
            }
        }
    }   

</style>