<template>
  <div>
    <Header></Header>
    <el-button class="bg-image" type="info" plain>背景图片</el-button>
    <div class="main-msg">
      <!-- 用户信息 -->
      <div class="user-msg">
        <el-avatar :size="120" class="user-header">
           {{this.userMessage.username}} </el-avatar>
        <span class="user-name">{{this.userMessage.username}}</span>
        <el-button class="user-attention" type="text" @click="following">
          关注 {{this.userMessage.attention_count}}</el-button>
        <div class="user-introduction">{{this.userMessage.user_introduction}}</div>
        <div class="image-title">收藏</div>
        <!-- 收藏 -->
        <div class="user-image">
          <el-col :span="4" v-for="image in favoritesImageList" :key="image" style="margin:10px;" @click.native="recommandClick(image.image_id)">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="img-card">
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
        <el-button v-if="loadMoreImage" class="load-image" type="info" round 
          @click="getFavoritesImageList">加载更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import state from '../store/state'
export default {
  components: { Header },
  name: 'Bookmarks',
  data () {
    return {
      msg: 'animal',
      userMessage: [],
      favoritesImageList: [],
      loadMoreImage: true,
      offset: 0
    }
  },
  created () {
    // 进入页面时执行
    this.userMessage = JSON.parse(sessionStorage.getItem('userMessage'))
    // 获取收藏图片
    this.getFavoritesImageList()
  },
  methods: {
    following () {
      this.$router.push({path: '/users/' + this.userMessage.user_id + '/following'})
    },
    // 获取收藏图片
    getFavoritesImageList () {
      this.offset = this.favoritesImageList.length
      const _this = this
      if (this.loadMoreImage) {
        this.$axios.get(state.domain + '/image/favorites/' + this.userMessage.user_id + 
          '/' + this.offset).then(function (response) {
          if (response.data.code === 200) {
            _this.favoritesImageList = _this.favoritesImageList.concat(response.data.data)
            if (_this.offset === _this.favoritesImageList.length) {
              _this.loadMoreImage = false
            }
          } else {
            // 获取收藏图片信息失败
            _this.$notify.error({
              title: '获取收藏图片信息失败',
              message: response.data.message
            })
          }
        })
      }
    },
    recommandClick (index) {
      this.$router.push({path: '/artworks/' + index})
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
.user-name {
  margin-left: 20px;
  margin-top: 30px;
  position: absolute;
  font-size: 18px;
}
.user-attention {
  margin-top: 53px;
  margin-left: 18px;
  position: absolute;
  font-size: 14px;
  color: rgb(168, 163, 163);
}
.btn-edit {
  position: absolute;
  margin: 5px 0px 0px 320px;
}
.user-introduction {
  font-size:16px;
  text-align: left;
  margin-top: 10px;
  margin-left: 500px;
  width: 400px;
}
.image-title {
  margin-top: 100px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}
.image {
  width: 100%;
  display: block;
}
.img-card {
  border-radius: 10px;
  height: 220px;
  width: 220px;
  margin: 10px;
  cursor: pointer;
}
.load-image {
  margin: 50px 0px 20px -100px;
  width: 1200px;
}
</style>
