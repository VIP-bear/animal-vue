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
        v-model="search_name"
        maxlength="30"
        @keyup.enter.native="searchImage">
      </el-input>
    </div>
    <div v-if="isLogin" class="login-contain">
      <el-button class="btn-upload" type="info" round @click="upload">上传图片</el-button>
      <el-button class="btn-message" title="最新作品" type="text" circle @click="newImage"></el-button>
      <el-dropdown trigger="click" class="dropdown">
        <span class="el-dropdown-link">
          <el-avatar :size="50">{{userMessage.username}}</el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown" class="dorpdown-menu">
          <div style="font-size:12px;margin:15px 0px 20px 20px;cursor: pointer;">
            <el-avatar :size="60" @click.native="userPage">{{userMessage.username}}</el-avatar>
            <div>{{userMessage.username}}</div>
            <div>@{{userMessage.email}}</div>
            <div>
              <el-button type="text" @click="following">关注 {{userMessage.attention_count}}</el-button>
              <el-button type="text">粉丝 {{userMessage.follow_count}}</el-button>
            </div>
          </div>
          <el-dropdown-item style="font-size:16px;margin-top:5px;" icon="el-icon-star-off" @click.native="bookmarks">收藏</el-dropdown-item>
          <el-dropdown-item style="font-size:16px;margin-top:5px;" icon="el-icon-close" @click.native="signOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else class="btn-login">
      <span class="el-dropdown-link">
        <el-avatar @click.native="login" :size="50">{{loginText}}</el-avatar>
      </span>
    </div>
  </div>
</template>

<script>
import state from '../store/state'
export default {
  name: 'Header',
  data () {
    return {
      search_name: '',
      isLogin: state.hasLogin,
      userMessage: state.userMessage,
      loginText: '登录'
    }
  },
  created () {
    this.search_name = this.$route.params.tag
    state.userMessage = JSON.parse(sessionStorage.getItem('userMessage'))
    state.hasLogin = sessionStorage.getItem('hasLogin')
    this.userMessage = state.userMessage
    this.isLogin = state.hasLogin
  },
  methods: {
    following () {
      this.$router.push({path: '/users/' + this.userMessage.user_id + '/following'})
    },
    upload () {
      this.$router.push({path: '/upload'})
    },
    userPage () {
      this.$router.push({path: '/users/' + this.userMessage.user_id})
    },
    login () {
      this.$router.push({path: '/login'})
    },
    bookmarks () {
      this.$router.push({path: '/users/' + this.userMessage.user_id + '/bookmarks'})
    },
    // 退出登录
    signOut () {
      this.$router.push({path: '/'})
    },
    // 搜索图片
    searchImage () {
      if (this.search_name !== '') {
        this.$router.push({path: '/tags/' + this.search_name})
        location.reload()
      }
    },
    newImage () {
      this.$router.push({path: '/new_image'})
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
