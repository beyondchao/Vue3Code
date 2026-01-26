<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :sm="0" :xs="0" :md="12"></el-col>
      <el-col :span="12" :sm="24" :xs="24" :md="12">
        <el-form class="form">
          <el-form-item>
            <div class="title">
              <div class="main-title text-dancing">Hello</div>
              <div class="sub-title text-dancing">欢迎来到后台管理</div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.username" :prefix-icon="User" placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item>
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
import { useRouter } from "vue-router"
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
async function login() {
  //发送登录表单
  loading.value = true;
  const res: loginResponseData = await reqLogin(form)
  try {
    if (res.code === 200) {
      //密码正确
      let { data: { token } } = res
      //保存token
      userStore.setToken((token as string))
      //结束加载状态
      loading.value = false;
      //跳转首页
      router.push('/')
      //提示登录成功
      ElNotification({
        type: 'success',
        message: getDayTime() + '，登录成功'
      })

    } else {
      //提示错误信息
      let { data: { message } } = res
      ElNotification({
        type: 'error', message
      })
      //结束加载状态
      loading.value = false;
    }
  } catch (error) {
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
    width: 70%;
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
