<template>
  <div class="login">
    <el-row >
      <el-col :span="12" :sm="0" :xs="0" :md="12"></el-col>
      <el-col :span="12" :sm="24" :xs="24" :md="12">
        <el-form class="form" :model="form" label-position="top" :rules="rules" ref="loginFormRef">
          <el-form-item>
            <div class="title">
              <div class="main-title text-dancing">Hello</div>
              <div class="sub-title text-dancing">欢迎来到后台管理</div>
            </div>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="form.username" :prefix-icon="User" placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" :prefix-icon="Lock" :show-password="true"
              placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="danger" @click="login" class="btn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="login">
import { ref, reactive } from "vue"
import { reqLogin } from "@/api/user"
import type { loginForm, loginResponseData } from "@/api/user/type"
import type { FormInstance } from "element-plus"
import { useRouter, useRoute } from "vue-router"
import { ElMessage, ElNotification } from "element-plus"
import { User, Lock } from "@element-plus/icons-vue"
import { useUserStore } from "@/stores/modules/user"
import { getDayTime } from "@/utils/daytime"


let userStore = useUserStore()
let form: loginForm = reactive({
  password: "",
  username: ""
})
//加载状态
let loading = ref(false);
//获取路由实例
let router = useRouter();
let route = useRoute();
//获取表单实例
const loginFormRef = ref<FormInstance>();
// 自定义验证函数
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 5) {
    callback(new Error('密码至少5位'))
  } else if (value.length > 16) {
    callback(new Error('密码最多16位'))
  } else if (!/^[a-zA-Z0-9_@#$%^&*]+$/.test(value)) {
    callback(new Error('密码只能包含字母、数字、下划线和特殊字符!@#$%^&*'))
  } else {
    callback() // 验证通过
  }
}
//定义表单校验对象
let rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { validator: validatePassword, trigger: "change" },
    { required: true, message: "请输入密码", trigger: "blur" }
  ]
})

async function login() {
  //表单校验
  if (!loginFormRef.value) return
  try {
    let valid = await loginFormRef.value?.validate();
    if (valid) {
      //校验通过，发送登录请求
      sendLogin()
    } else {
      //校验不通过
      ElMessage({
        type: "warning",
        message: "请填写完整的登录信息"
      })
    }
  } catch (error) {
    //校验不通过
    ElMessage({
      type: "warning",
      message: "请填写完整的登录信息"
    })
  }
}
async function sendLogin() {
  //发送登录表单
  loading.value = true;
  try {
    const res: loginResponseData = await reqLogin(form)
    // if (res.code === 200) {
    if (res.msg === "ok") {
      //密码正确
      let { data: { token } } = res
      //保存token
      userStore.setToken((token as string))
      //结束加载状态
      loading.value = false;
      //跳转首页或者登录前页面
      router.replace(route.query.redirect as string || '/')
      //提示登录成功
      ElNotification({
        type: 'success',
        message: getDayTime() + '，登录成功'
      })
    } else {
      //提示错误信息
      let { msg } = res
      ElNotification({
        type: 'error', message: msg
      })
      //结束加载状态
      loading.value = false;
    }
  } catch (error) {
    console.error("登录请求出错", error);
    //提示登录失败
    ElNotification({
      type: 'error',
      message: '登录失败'
    })
    //结束加载状态
    loading.value = false;
  }
}


</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  // 融合背景图片和渐变效果
  background: 
    linear-gradient(135deg, rgba(102, 126, 234, 0.95) 30%, rgba(118, 75, 162, 0.85) 90%),
    url("@/assets/login/back.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-row {
    width: 100%;
  }
  .form {
    margin: 0 auto;
    // 半透明白色背景，带毛玻璃效果
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    padding: 40px 50px;
    width: 60%;
    max-width: 550px;
    min-width: 420px;

    .title {
      padding: 5px 10px 20px;
      text-align: center;

      .main-title {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 48px;
        font-weight: bold;
        padding: 0 15px 10px 15px;
      }

      .sub-title {
        color: #666;
        font-size: 18px;
        padding: 5px 15px;
      }
    }

    .btn {
      width: 100%;
      height: 45px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      border: none;
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      }
      
      &:active {
        transform: translateY(0);
      }
    }

    :deep(.el-form-item) {
      margin-bottom: 24px;
    }

    :deep(.el-input__wrapper) {
      background: rgba(240, 242, 245, 0.8);
      border-radius: 8px;
      box-shadow: none;
      padding: 8px 15px;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(240, 242, 245, 1);
      }
      
      &.is-focus {
        background: #fff;
        box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
      }
    }

    :deep(.el-input__inner) {
      color: #333;
      font-size: 14px;
    }

    :deep(.el-input__prefix) {
      color: #667eea;
    }
  }
}
</style>
