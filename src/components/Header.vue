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
      <el-button class="btn-upload" type="info" round @click="upload">上传图片</el-button>
      <!-- <el-button class="btn-leader" title="排行榜" type="text" circle></el-button> -->
      <el-button class="btn-message" title="消息" type="text" circle></el-button>
      <el-dropdown trigger="click" class="dropdown">
        <span class="el-dropdown-link">
          <el-avatar :size="50">User</el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown" class="dorpdown-menu">
          <div style="font-size:12px;margin:15px 0px 20px 20px;cursor: pointer;">
            <el-avatar :size="60" @click.native="userMessage">User</el-avatar>
            <div>用户名</div>
            <div>@用户id</div>
            <div>
              <el-button type="text" @click="following">关注 200</el-button>
              <el-button type="text">粉丝 100</el-button>
            </div>
          </div>
          <el-dropdown-item style="font-size:16px;margin-top:5px;" icon="el-icon-star-off">收藏</el-dropdown-item>
          <el-dropdown-item style="font-size:16px;margin-top:5px;" icon="el-icon-bell">通知</el-dropdown-item>
          <el-dropdown-item style="font-size:16px;margin-top:5px;" icon="el-icon-setting">设置</el-dropdown-item>
          <el-dropdown-item style="font-size:16px;margin-top:5px;" icon="el-icon-close">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else class="btn-login">
      <el-dropdown @command="handleCommand">
        <span><el-avatar :size="50">登录</el-avatar></span>
      </el-dropdown>
    </div>
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
  },
  methods: {
    following () {
      // let id = this.$route.params.id
      let id = 1
      this.$router.push({path: '/users/' + id + '/following'})
    },
    upload () {
      this.$router.push({path: '/upload'})
    },
    userMessage () {
      let id = 1
      this.$router.push({path: '/users/' + id})
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin-top: -60px;
  height: 150px;
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
/* .btn-leader {
  width: 30px;
  height: 30px;
  margin-left: 30px;
  background: url("../assets/img/icon/icon-leader.png") no-repeat;
  background-size: cover;
} */
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
  margin: 10px 30px;
  position: absolute;
}
.btn-login {
  cursor: pointer;
  font-size: 18px;
  color: white;
  float:right;
  margin-top: 10px;
  margin-right: 10px;
}
.dorpdown-menu {
  width: 200px;
}
</style>
