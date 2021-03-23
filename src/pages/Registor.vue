<template>
  <div class="wrapper">
    <div class="registor-contain">
      <div class="ms-title">animal</div>
      <el-form :model="loginData" :rules="rules" ref="loginForm" class="ms-content">
        <el-form-item prop="email">
          <el-input class="input-email" v-model="loginData.email" placeholder="邮箱地址">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input-password"
            type="password"
            placeholder="密码"
            v-model="loginData.password">
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            class="input-nickname"
            placeholder="昵称/用户名"
            v-model="loginData.nickname"
            @keyup.enter.native="submitForm()">
          </el-input>
        </el-form-item>
      </el-form>
      <div>
          <el-button class="btn-registor" round type="primary" @click="submitForm('loginForm')">注册用户</el-button>
      </div>
      <el-divider direction="horizontal"></el-divider>
      <div class="ms-text">You never know how strong you are until being strong is your only choice.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginData: {
        email: '',
        password: '',
        nickname: ''
      },
      rules: {
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {type: 'number', message: '年龄必须为数字值', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '', trigger: 'blur', min: 8, max: 16}
        ]
      }
    }
  }
}
</script>

<style scoped>
.ms-title {
  line-height: 3;
  font-size: 40px;
  color: green;
  user-select: none;
}
.el-form-item {
  padding: 0px 25px;
}
.ms-text {
  line-height: 1.5;
  font-size: 18px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
  text-align: left;
}
.registor-contain {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  border-radius: 5px;
  background: rgba(204, 200, 200, 0.3);
  overflow: hidden;
}
.input-email {
  width: 300px;
  height: 50px;
  font-size: 16px;
  margin-bottom: -10px;
}
.input-password {
  width: 300px;
  height: 50px;
  font-size: 16px;
  margin-bottom: -10px;
}
.input-nickname {
  width: 300px;
  height: 50px;
  font-size: 16px;
}
.link {
  position: relative;
  top: -20px;
  right: -120px;
  user-select: none;
}
.btn-registor {
  width: 300px;
  height: 40px;
  font-size: 18px;
  margin-bottom: 20px;
}
.wrapper {
  background-image: url(../assets/img/bg-image.png);
  width: auto;
  height: 945px;
  margin-top: -60px;
  background-size: cover;
}
</style>
