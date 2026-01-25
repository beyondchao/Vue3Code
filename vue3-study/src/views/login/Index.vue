<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :xs="0">左侧变淡</el-col>
      <el-col :span="12" :xs="24">
        <div class="form">
          <div class="title">
            <div class="main-title">Hello</div>
            <div class="sub-title">欢迎来到后台管理</div>
          </div>
          <div class="login-form">
            <el-input v-model="form.username">
              <svg-icon name="user"></svg-icon>
            </el-input>
            <el-input type="password" v-model="form.password"></el-input>
            <el-button @click="login">登录</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts" name="login">
import { ref, reactive } from "vue"
import { reqLogin } from "@/api/user"
import type { loginForm } from "@/api/user/type"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"

let form: loginForm = reactive({
  password: "",
  username: ""
})
let router = useRouter()

function login() {
  //发送登录表单
  reqLogin(form).then(res => {
    if (res.code === 200) {
      //密码正确
      let { data: { token } } = res
      //保存token
      console.log(token)
      //跳转首页
      router.push('/')
    } else {
      //密码错误
      let { data: { message } } = res
      ElMessage({
        type: 'error',
        message
      })
    }
  })
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
    position: absolute;
    top: 50%;
    //transform: translateY(-50%);
    right: 100px;
    width: 30%;
    background-color: $blue;
    padding: 30px 0;

    .title {
      padding: 5px 10px;

      .main-title {
        color: $text-white;
        font-size: 35px;
        padding: 0 15px 15px 15px;
      }

      .sub-title {
        color: $text-white;
        font-size: 20px;
        padding: 10px 15px;
      }
    }

    .login-form {
      padding: 0 60px;

      .el-input {
        margin-top: 20px;
        font-size: 18px;
        height: 35px;
      }

      .el-button {
        width: 100%;
        text-align: center;
        background-color: $light-blue;
        color: $text-white;
        margin-top: 20px;
        font-size: 18px;
      }
    }
  }
}
</style>
