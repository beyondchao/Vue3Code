<template>
  <div class="login">
    <el-row>
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
            <el-button :loading="loading" type="primary" @click="login" class="btn">登录</el-button>
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
  background-image: url("@/assets/login/back.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* Ensures image covers the entire area */
  background-attachment: fixed;
  /* Creates a parallax effect */
  background-color: #cccccc;

  /* Fallback color */
  .form {
    margin: 0 auto;
    /* 水平居中 */
    background-color: rgba(44, 49, 47, 0.9);
    position: relative;
    top: 30vh;
    border-top-left-radius: 14px;
    border-bottom-right-radius: 14px;
    padding: 30px;
    width: 60%;

    .title {
      padding: 5px 10px;

      .main-title {
        color: $text-white;
        font-size: 40px;
        padding: 0 15px 15px 15px;
      }

      .sub-title {
        color: $text-white;
        font-size: 20px;
        padding: 10px 15px;
      }
    }

    .btn {
      width: 100%;
      background-color: #08202e;
      font-size: 16px;
      color: aliceblue;
    }

    .el-input {
      :deep(.el-input__inner) {
        color: #1b0101ec;
      }
    }
  }
}
</style>
