<template>
    <div>
        <div class="trade-mark">
            <!-- 商品表单数据 -->
            <el-table 
                :data="tradeMarkStore.tableData" 
                style="width: 100%" 
                v-loading="tradeMarkStore.loading"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column prop="index" label="序号" width="85" align="center" />
                <el-table-column prop="title" label="商品名称"  />
                <el-table-column prop="sale_count" label="销量" align="center" />
                <el-table-column prop="min_price" label="最低价格" align="center">
                    <template #default="{ row }">
                        ￥{{ row.min_price }}
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #header>
                        <span>商品分类</span>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.category?.name || '未分类' }}</span>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #header>
                        <span>创建时间</span>
                    </template>
                    <template #default="{ row }">
                        <span>{{ row.create_time || '无' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品标志"  align="center">
                    <template #default="{ row }">
                        <el-image 
                            v-if="row.cover" 
                            :src="row.cover" 
                            style="width: 60px; height: 60px"
                            fit="cover"
                        />
                        <span v-else>无图片</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态"  align="center">
                    <template #default="{ row }">
                        <el-tag v-if="row.status === 1" type="success">上架</el-tag>
                        <el-tag v-else-if="row.status === 0" type="info">下架</el-tag>
                        <el-tag v-else-if="row.status === 2" type="warning">审核中</el-tag>
                        <el-tag v-else type="danger">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="库存"  align="center">
                    <template #default="{ row }">
                        <span :class="{ 'stock-warning': row.stock <= row.min_stock }">
                            {{ row.stock }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="商品操作"  align="center" fixed="right" width="150">
                    <template #default="{ row }">
                        <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script setup lang="ts" name="tradeMarkTable">
import { useTradeMarkStore, type TradeMarkItem } from '@/stores/modules/trademark'
import { ElMessageBox } from 'element-plus'

const tradeMarkStore = useTradeMarkStore()

// 选择变化
const handleSelectionChange = (selection: TradeMarkItem[]) => {
    // 更新所有选中状态
    tradeMarkStore.toggleAllCheck(false)
    selection.forEach(item => {
        tradeMarkStore.toggleItemCheck(item.id)
    })
}

// 编辑
const handleEdit = (row: TradeMarkItem) => {
    // TODO: 打开编辑对话框
    console.log('编辑', row)
}

// 删除
const handleDelete = async (row: TradeMarkItem) => {
    try {
        await ElMessageBox.confirm(
            `确定要删除商品 "${row.title}" 吗？`,
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        await tradeMarkStore.deleteTradeMark(row.id)
    } catch {
        // 用户取消删除
    }
}
</script>
<style scoped lang="scss">
.trade-mark {
    // 库存预警样式
    .stock-warning {
        color: #f56c6c;
        font-weight: bold;
    }
}
</style>