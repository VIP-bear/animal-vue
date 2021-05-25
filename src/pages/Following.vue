<template>
  <div>
    <Header></Header>
    <el-button class="bg-image" type="info" plain>背景图片</el-button>
    <div class="main-msg">
      <div class="user-msg">
        <el-avatar :size="120" class="user-header"> {{userMessage.username}} </el-avatar>
        <span class="user-name">{{userMessage.username}}</span>
        <div class="attention-num">关注 {{userMessage.attention_count}}</div>
        <div class="attention-usr-msg" v-for="attention in userList" :key="attention">
          <el-avatar :size="80" @click.native="jumpToUser(attention.user.user_id)"> {{attention.user.username}} </el-avatar>
          <span style="position: absolute; margin-left: 10px;cursor: pointer;"  @click.native="jumpToUser(attention.user.user_id)">{{attention.user.username}}</span>
          <span class="user-desc">{{attention.user.user_introduction}}</span>
          <el-button class="user-attention" round>已关注</el-button>
          <div class="user-images">
            <el-col :span="6" v-for="image in attention.imageList" :key="image" @click.native="recommandClick(image.image_id)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" class="img-card">
                <img :src="image.image_url" class="image">
              </el-card>
              <span>{{image.image_title}}</span>
            </el-col>
          </div>
          <div style="margin-top:180px;">
            <el-divider></el-divider>
          </div>
        </div>
        <el-button class="load-image" type="info" round @click="userNum+=10">加载更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import state from '../store/state'
export default {
  components: { Header },
  name: 'Following',
  data () {
    return {
      msg: 'animal',
      userMessage: [],
      userList: []
    }
  },
  created () {
    this.userMessage = JSON.parse(sessionStorage.getItem('userMessage'))
    // 获取关注列表
    let offset = this.userList.length
    const _this = this
    this.$axios.get(state.domain + '/user/attention_list/' + this.userMessage.user_id + '/' + offset).then(function (response) {
      if (response.data.code === 200) {
        _this.userList = response.data.data
      } else {
        // 获取信息失败
        _this.$notify.error({
          title: '获取关注列表信息失败',
          message: response.data.message
        })
      }
    })
  },
  methods: {
    recommandClick (index) {
      this.$router.push({path: '/artworks/' + index})
    },
    // 跳转到用户界面
    jumpToUser (userId) {
      this.$router.push({path: '/users/' + userId})
    }
  }
}
</script>

<style scoped>
.bg-image {
  height: 150px;
  width: 100%;
}
.main-msg {
  transform: translate(0%, -50%);
  margin: 0px 300px;
}
.user-msg {
  float: left;
}
.user-header {
  margin-top: -20px;
  font-size: 24px;
}
.attention-num {
  background-color: rgb(240, 235, 235);
  margin-top: 10px;
  margin-left: 20px;
  height: 30px;
  border-radius: 50px;
  padding-top: 10px;
  width: 100px;
}
.attention-usr-msg {
  margin: 100px 0px 20px 20px;
}
.user-desc {
  word-break:break-all;
  word-wrap:break-word;
  position: absolute;
  margin-left: 10px;
  margin-top: 30px;
  width: 200px;
  text-align: left;
}
.user-attention {
  position: absolute;
  margin-top: 120px;
  background-color: rgb(245, 240, 240);
}
.user-images {
  float: right;
  margin-left: 250px;
}
.img-card {
  border-radius: 10px;
  height: 200px;
  width: 200px;
  margin: 10px;
  cursor: pointer;
}
.load-image {
  margin: 20px 0px;
  width: 1000px;
}
.image {
  width: 100%;
  display: block;
}
</style>
