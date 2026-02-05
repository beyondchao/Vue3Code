<!-- 管理员相关页面 -->
<template>
    <div class="user">
        <el-card shadow="never" class="user-card">
            <div class="search">
                <div class="search-input">
                    <span>关键词</span>
                    <el-input label="搜索管理员名称" v-model="inputText"></el-input>
                </div>
                <div class="btns">
                    <el-button class="search-button" size="default" type="primary" @click="handleSearch">搜索</el-button>
                    <el-button class="reset-button" size="default" @click="handleReset">重置</el-button>
                </div>
            </div>
        </el-card>
        <el-card shadow="never">
            <!-- 用户列表 -->
            <div class="btns">
                <el-button type="primary">添加用户</el-button>
                <el-button type="danger">批量删除</el-button>
            </div>
            <el-table 
            type="expand" 
            :data="tableData" 
            :table-layout="tableLayout"
            style="width: 100%"
            class="user-table">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="username" label="用户名" width="120"></el-table-column>
                <el-table-column prop="id" label="id" width="120"></el-table-column>
                <el-table-column prop="role" label="所属角色" width="120">
                    <template #default="scope">
                        <div>
                            <el-tag style="margin-right: 4px;">
                                {{ scope.row.role.name }}
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template #default="scope">
                        <el-tag v-if="scope.row.status === 1" type="success">启用</el-tag>
                        <el-tag v-else type="info">禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="scope">
                        <el-button size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next,->, jumper" :total="total" v-model:page-size="pageSize"
                v-model:current-page="currentPage" @current-change="fetchUserList"></el-pagination>
            <!-- 用户列表结束 -->
        </el-card>
    </div>
</template>

<script setup lang="ts" name="UserIndex">
import { ref, onMounted } from 'vue';
import type { UserItem } from '@/api/acl/user/type';
import { reqGetUserList } from '@/api/acl/user/Index';
import { ElMessage } from 'element-plus';
import type { TableInstance } from 'element-plus';
// 分页参数
const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);
// 用户列表数据
let tableData = ref<UserItem[]>([]);
// 搜索输入
let inputText = ref('');
const tableLayout = ref<TableInstance['tableLayout']>('fixed');

// 搜索
const handleSearch = () => {
    fetchUserList();
};
// 重置
const handleReset = () => {
    inputText.value = '';
    fetchUserList();
}
// 获取用户列表
const fetchUserList = async () => {
    try {
        const response = await reqGetUserList(
            currentPage.value,
            {
                keyword: inputText.value,
                limit: pageSize.value
            }
        );

        if (response && response.data && response.data.list) {
            tableData.value = response.data.list;
            total.value = response.data.totalCount;
        } else {
            tableData.value = [];
        }
    } catch (error) {
        ElMessage.error('用户列表获取失败');
        console.error('Error fetching user list:', error);
    }
};
// 组件挂载时获取用户列表
onMounted(() => {
    fetchUserList();
})
</script>

<style lang="scss" scoped>
/* styles */
.user {
    .user-card {
        margin-bottom: 20px;

        .search {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .search-input {
                display: flex;
                align-items: center;

                span {
                    margin-right: 8px;
                }

                .el-input {
                    width: 300px;
                }
            }

            .btns {

                .search-button,
                .reset-button {
                    margin-left: 8px;
                }
            }
        }
    }

    .user-table {
        margin-bottom: 20px;
        width: 100%;
    }

    .btns {
        margin-bottom: 20px;

        .el-button {
            margin-right: 10px;
        }
    }
}
</style>