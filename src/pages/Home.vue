<template>
  <div>
    <Header></Header>
    <div class="main-msg">
      <div class="hot-tags">
        <el-row>
          <el-col :span="3" v-for="o in 8" :key="o" style="padding:2px;">
            <el-card :body-style="{ padding: '10px' }" shadow="hover" style="background-color: violet;">
              <el-button class="btn-tag" type="text" @click="searchTag(o)">标签{{o}}</el-button>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="ranking">
        <div class="ranking-title">
          <span>{{new Date().getMonth() + 1}}月{{new Date().getDate()}}日 排行榜</span>
        </div>
        <el-col :span="4" v-for="(image, index) in rankingMessage" :key="image" style="margin:20px 0px;" @click.native="recommandClick(image.image_id)">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="img-card">
            <el-avatar class="ranking-top">{{index+1}}</el-avatar>
            <img :src="image.image_url" class="image">
          </el-card>
          <div style="height:40px;text-align:left; margin-left:10px;font-size:16px;">
            <div style="font-weight:bold;">
              <span>{{image.image_title}}</span>
            </div>
            <div>
              <span>{{image.user.username}}</span>
            </div>
          </div>
        </el-col>
      </div>
      <div class="recommand-contain" style="float:left;">
        <div class="recommand-title">
          <span>推荐图片</span>
        </div>
        <el-col :span="4" v-for="image in recommendImage" :key="image" style="margin:20px 0px;">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="img-card" @click.native="recommandClick(image.image_id)">
            <img :src="image.image_url" class="image">
          </el-card>
          <div style="height:40px;text-align:left; margin-left:10px;font-size:16px;">
            <div style="font-weight:bold;">
              <span>{{image.image_title}}</span>
            </div>
            <div style="cursor: pointer; float:left" @click="jumpToUser(image.user.user_id)">
              <span>{{image.user.username}}</span>
            </div>
          </div>
        </el-col>
      </div>
      <div class="attention-contain" style="float:left;">
        <div class="attention-title">
          <span>关注用户图片</span>
          <el-link :underline="false" style="margin-left:1200px" @click.native="allUserImage">查看全部</el-link>
        </div>
        <el-col :span="4" v-for="image in attentionUserImage" :key="image" style="margin:20px 0px;">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="img-card" @click.native="recommandClick(image.image_id)">
            <img :src="image.image_url" class="image">
          </el-card>
          <div style="height:40px;text-align:left; margin-left:10px;font-size:16px;">
            <div style="font-weight:bold;">
              <span>{{image.image_title}}</span>
            </div>
            <div style="cursor: pointer; float:left" @click="jumpToUser(image.user.user_id)">
              <span>{{image.user.username}}</span>
            </div>
          </div>
        </el-col>
      </div>
      <div class="user-contain" style="float:left;">
        <div class="user-title">
          <span>推荐用户</span>
        </div>
        <el-col :span="8" v-for="recommend in recommendUserList" :key="recommend" style="margin: 30px 0px;">
          <el-col :span="6" v-for="image in recommend.imageList" :key="image">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" style="width:120px;height:120px;cursor: pointer;" @click.native="recommandClick(image.image_id)">
              <img :src="image.image_url" style="width: 100%;display: block;">
            </el-card>
          </el-col>
          <div style="height:40px;width:370px;text-align:left; margin-top:140px;">
            <div style="cursor: pointer;float:left;margin-top:10px;font-size:20px;" @click="jumpToUser(recommend.user.user_id)">
              <span>{{recommend.user.username}}</span>
            </div>
            <el-button style="float:right;" round @click="attentionUser(recommend)">{{recommend.attention ? '已关注' : '关注'}}</el-button>
          </div>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import state from '../store/state'
export default {
  components: { Header },
  name: 'Home',
  data () {
    return {
      msg: 'animal',
      user_id: '',
      rankingMessage: state.rankingMessage,
      recommendImage: [],
      attentionUserImage: [],
      recommendUserList: []
    }
  },
  created () {
    state.userMessage = JSON.parse(sessionStorage.getItem('userMessage'))
    this.user_id = state.userMessage.user_id
    // 获取排行榜
    const _this = this
    this.$axios.get(state.domain + '/image/ranking').then(function (response) {
      if (response.data.code === 200) {
        state.rankingMessage = response.data.data
        _this.rankingMessage = response.data.data
        console.log(_this.rankingMessage)
      } else {
        // 获取排行榜信息失败
        _this.$notify.error({
          title: '获取排行榜信息失败',
          message: response.data.message
        })
      }
    })
    // 获取推荐图片
    this.$axios.get(state.domain + '/image/recommend/' + this.user_id).then(function (response) {
      if (response.data.code === 200) {
        state.recommendImage = response.data.data
        _this.recommendImage = response.data.data
        console.log(_this.recommendImage)
      } else {
        // 获取排行榜信息失败
        _this.$notify.error({
          title: '获取排行榜信息失败',
          message: response.data.message
        })
      }
    })
    // 获取关注用户图片
    this.$axios.get(state.domain + '/image/attention/' + this.user_id).then(function (response) {
      if (response.data.code === 200) {
        state.attentionUserImage = response.data.data
        _this.attentionUserImage = response.data.data
      } else {
        // 获取关注用户图片信息失败
        _this.$notify.error({
          title: '获取关注用户图片信息失败',
          message: response.data.message
        })
      }
    })
    // 获取推荐用户
    this.$axios.get(state.domain + '/user/recommend_user/' + this.user_id).then(function (response) {
      if (response.data.code === 200) {
        _this.recommendUserList = response.data.data
        console.log('推荐用户: ' + _this.recommendUserList.length)
      } else {
        // 获取推荐用户信息失败
        _this.$notify.error({
          title: '获取推荐用户信息失败',
          message: response.data.message
        })
      }
    })
  },
  methods: {
    jumpToUser (userId) {
      this.$router.push({path: '/users/' + userId})
    },
    recommandClick (index) {
      this.$router.push({path: '/artworks/' + index})
    },
    allUserImage () {
      this.$router.push({path: '/bookmark_new_image'})
    },
    searchTag (tag) {
      this.$router.push({path: '/tags/' + tag})
    },
    // 关注用户
    attentionUser (recommend) {
      recommend.attention = !recommend.attention
      const _this = this
      let data = {'user_id': this.user_id, 'attention_user_id': recommend.user.user_id, 'state': recommend.attention ? 1 : 0}
      this.$axios.post(state.domain + '/user/attention', data).then(function (response) {
        if (response.data.code === 200) {
          _this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success'
          })
        } else {
          // 发表评论失败
          _this.$notify.error({
            title: '关注失败',
            message: response.data.message
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.main-msg {
  margin: 0px 200px;
}
.hot-tags {
  height: 60px;
  margin-top: 50px;
  border-radius: 5px;
}
.btn-tag {
  font-size: 24px;
  color: white;
}
.ranking {
  margin-top: 100px;
}
.ranking-title {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}
.image {
  width: 100%;
  display: block;
}
.ranking-top {
  position: absolute;
  margin: 5px 0px 0px -100px;
  background-color: gray;
}
.recommand-title {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
}
.img-card {
  border-radius: 10px;
  height: 220px;
  width: 220px;
  margin: 10px 10px;
  cursor: pointer;
}
.attention-title {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
}
.user-title {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
}
</style>
