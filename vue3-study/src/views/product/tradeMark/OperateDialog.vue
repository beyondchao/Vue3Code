<template>
    <el-dialog :model-value="visible" width="780px" title="编辑商品" @close="onClose">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="商品名称" prop="title">
                        <el-input id="title" v-model="form.title" placeholder="请输入商品名称" />
                    </el-form-item>

                    <el-form-item label="商品分类" prop="category_id">
                        <el-select id="category_id" v-model="form.category_id" placeholder="请选择商品分类">
                            <el-option v-for="item in goodsCategoryIds" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="单位" prop="unit">
                        <el-input id="unit" v-model="form.unit" placeholder="例如：kg" />
                    </el-form-item>

                    <el-form-item label="库存" prop="stock">
                        <el-input-number id="stock" v-model="form.stock" :min="0" style="width:100%" />
                    </el-form-item>

                    <el-form-item label="最小库存" prop="min_stock">
                        <el-input-number id="min_stock" v-model="form.min_stock" :min="0" style="width:100%" />
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <!-- 商品封面 显示已移到下方与描述同一行 -->

                    <el-form-item label="最低价" prop="min_price">
                        <el-input-number id="min_price" v-model="form.min_price" :min="0" :step="1" style="width:100%" />
                    </el-form-item>

                    <el-form-item label="最低原价" prop="min_oprice">
                        <el-input-number id="min_oprice" v-model="form.min_oprice" :min="0" :step="1" style="width:100%" />
                    </el-form-item>

                    <el-form-item label="状态" prop="status">
                        <el-radio-group id="status" v-model="form.status">
                            <el-radio :value="1">上架</el-radio>
                            <el-radio :value="0">下架</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="库存显示" prop="stock_display">
                        <el-switch id="stock_display" v-model="form.stock_display" :active-value="1" :inactive-value="0" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="商品描述" prop="desc">
                        <el-input id="desc" type="textarea" v-model="form.desc" :rows="6" placeholder="请输入商品描述" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品封面">
                        <el-upload id="cover_upload" class="upload-demo" action="" :show-file-list="false" :before-upload="beforeUpload"
                            :on-change="onCoverChange" list-type="picture-card" v-if="!form.cover">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <div v-if="form.cover" class="cover-preview">
                            <el-icon style="cursor:pointer; position:absolute; top:5px; right: 65px; font-size:18px;">
                                <Delete @click="form.cover = ''"  />
                            </el-icon>
                                
                         
                            <img :src="form.cover" alt="cover" />
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
            <div style="display:flex; justify-content:flex-end; gap:12px; width:100%;">
                <el-button @click="onClose">取消</el-button>
                <el-button type="primary" @click="handleSave">保存</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqGoodsCategory } from '@/api/product/trademark/Index'
import type { TradeMarkItem, Category } from '@/api/product/trademark/type'
import {Delete } from '@element-plus/icons-vue'

const props = defineProps<{ visible: boolean; model?: Partial<TradeMarkItem> }>()
const emit = defineEmits(['update:visible', 'save'])

const goodsCategoryIds = ref<Category[]>([])
const formRef = ref()

const form = ref<Partial<TradeMarkItem>>({
    title: '',
    category_id: 0,
    cover: '',
    desc: '',
    unit: 'kg',
    stock: 0,
    min_stock: 0,
    status: 1,
    stock_display: 1,
    min_price: 0,
    min_oprice: 0,
})

const rules = {
    title: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
    category_id: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
    desc: [{ required: false }],
    unit: [{ required: true, message: '请输入单位', trigger: 'blur' }],
    stock: [{ required: true, type: 'number', message: '请输入库存', trigger: 'blur' }],
    min_stock: [{ required: true, type: 'number', message: '请输入最小库存', trigger: 'blur' }],
    min_price: [{ required: true, type: 'number', message: '请输入最低价', trigger: 'blur' }],
    min_oprice: [{ required: true, type: 'number', message: '请输入最低原价', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    stock_display: [{ required: true, message: '请选择库存显示', trigger: 'change' }],
    cover: [{ required: true, message: '请上传商品封面', trigger: 'change' }],
}

const beforeUpload = () => false

const onCoverChange = (file: any) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        // form.value!.cover = e.target?.result as string
        form.value!.cover = "http://img1.mydrivers.com/img/20240910/s_6951f8cf705c41a58505549d0164fcd3.png" // 这里使用一个示例图片地址代替实际上传逻辑
    }
    if (file && file.raw) reader.readAsDataURL(file.raw)
}

const onClose = () => {
    emit('update:visible', false)
}

const handleSave = () => {
    formRef.value?.validate((valid: boolean) => {
        if (!valid) return
        emit('save', form.value)
        emit('update:visible', false)
    })
}

onMounted(() => {
    reqGoodsCategory()
        .then((response) => {
            goodsCategoryIds.value = response.data || []
        })
        .catch((err) => console.error('获取商品分类失败:', err))
})

</script>

<style scoped>
.cover-preview img {
    display: inline-block;
    max-width: 160px;
    max-height: 120px;
    border-radius: 4px;
    margin-top: 8px;
}
</style>