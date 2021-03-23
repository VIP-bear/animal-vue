<template>
  <div class="wrapper">
    <div class="login-registor">
      <div class="ms-title">animal</div>
      <div>
        <el-button class="registor" type="primary" round>注册账号</el-button>
      </div>
      <div>
        <el-button class="login" round>登录</el-button>
      </div>
      <el-divider direction="horizontal"></el-divider>
      <div class="ms-text">You never know how strong you are until being strong is your only choice.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginRegistor',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.wrapper {
  background-image: url(../assets/img/bg-image.png);
  width: auto;
  height: 945px;
  margin: -60px -8px;
  background-size: cover;
}
.ms-title {
  line-height: 3;
  font-size: 40px;
  color: green;
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
.login-registor {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  border-radius: 5px;
  background: rgba(204, 200, 200, 0.3);
  overflow: hidden;
}
.registor {
  width: 300px;
  height: 45px;
  color: white;
  font-size: 20px;
}
.login {
  width: 300px;
  height: 45px;
  font-size: 20px;
  margin-top: 20px;
}
</style>
