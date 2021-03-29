<template>
  <div class="wrapper">
    <div class="btn-registor">
      <el-button type="primary" round @click="registor">注册账号</el-button>
    </div>
    <div class="login-contain">
      <div class="ms-title">animal</div>
      <el-form :model="loginData" ref="loginForm" class="ms-content">
        <el-form-item prop="username">
          <el-input class="input-username" v-model="loginData.username" placeholder="用户名/邮箱地址">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input-password"
            type="password"
            placeholder="密码"
            v-model="loginData.password"
            @keyup.enter.native="submitForm()">
          </el-input>
        </el-form-item>
      </el-form>
      <el-link class="link">忘记密码</el-link>
      <div>
          <el-button class="btn-login" round type="primary" @click="submitForm('loginForm')">登录</el-button>
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
        username: '',
        password: ''
      }
    }
  },
  methods: {
    registor () {
      this.$router.push({path: '/registor'})
    }
  }
}
</script>

<style scoped>
.ms-title {
  line-height: 3;
  font-size: 40px;
  color: rgb(76, 119, 247);
  user-select: none;
}
.ms-text {
  line-height: 1.5;
  font-size: 18px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
  text-align: left;
}
.login-contain {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  border-radius: 5px;
  background: rgba(204, 200, 200, 0.3);
  overflow: hidden;
}
.input-username {
  width: 300px;
  height: 50px;
  font-size: 16px;
  margin-bottom: -10px;
}
.input-password {
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
.btn-login {
  width: 300px;
  height: 40px;
  font-size: 18px;
  margin-bottom: 20px;
}
.btn-registor {
  position: relative;
  width: 100px;
  height: 40px;
  font-size: 18px;
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}
.wrapper {
  background-image: url(../assets/img/bg-image.png);
  height: 945px;
  margin: -60px -8px;
}
</style>
