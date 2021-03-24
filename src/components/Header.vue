<template>
  <div class="wrapper">
    <div>
      <router-link to="/home">
        <el-button type="text" class="ms-title">animal</el-button>
      </router-link>
    </div>
    <div>
      <el-input
        class="search-input"
        placeholder="搜索图片"
        prefix-icon="el-icon-search"
        v-model="input_content"
        maxlength="30">
      </el-input>
    </div>
    <div v-if="isLogin" class="login-contain">
      <el-button class="btn-upload" type="info" round>上传图片</el-button>
      <el-button class="btn-leader" title="排行榜" type="text" circle></el-button>
      <el-button class="btn-message" title="消息" type="text" circle></el-button>
      <el-dropdown trigger="click" class="dropdown">
        <span class="el-dropdown-link">
          <el-avatar :size="50">User</el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else class="btn-login">
      <el-dropdown @command="handleCommand">
        <span><el-avatar :size="50">登录</el-avatar></span>
      </el-dropdown>
    </div>
    <br />
    <el-divider class="line" direction="horizontal"></el-divider>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      isCollapse: false,
      input_content: '',
      isLogin: true
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin-top: -60px;
  height: 150px;
  width: 100%;
  white-space: nowrap;
}
.ms-title {
  font-size: 40px;
  color: green;
  user-select: none;
  float: left;
}
.search-input {
  width: 500px;
  margin-top: 35px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-contain {
  margin-left: 80%;
}
.btn-upload {
  margin-top: 15px;
  width: 100px;
}
.btn-leader {
  width: 30px;
  height: 30px;
  margin-left: 30px;
  background: url("../assets/img/icon/icon-leader.png") no-repeat;
  background-size: cover;
}
.btn-message {
  width: 30px;
  height: 30px;
  margin-left: 30px;
  background: url("../assets/img/icon/icon-message.png") no-repeat;
  background-size: cover;
}
.dropdown {
  cursor: pointer;
  color: #409EFF;
  margin-top: 10px;
  margin-right: 10px;
  float:right;
}
.btn-login {
  cursor: pointer;
  font-size: 18px;
  color: white;
  float:right;
  margin-top: 10px;
  margin-right: 10px;
}
.line {
  margin-top: -5px;
}
</style>
