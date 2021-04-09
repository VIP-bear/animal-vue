<template>
  <div>
    <!-- 页首 -->
    <Header></Header>
    <div class="main-msg">
      <div style="background-color:rgb(241, 238, 238);">
        <div>
          <!-- 图片 -->
          <div style="width:1000px; margin-left:25%; background-color: rgb(240, 245, 240);">
            <el-image
              class="image"
              :src="imageMessage.image.image_url"
              :fit="contain">
            </el-image>
          </div>
          <!-- 右侧用户信息 -->
          <div class="user-msg">
            <el-avatar> {{imageMessage.user.username}} </el-avatar>
            <el-link :underline="false" class="user-name">{{imageMessage.user.username}}</el-link>
            <br />
            <el-button class="user-attention" round>关注</el-button>
            <div>
              <span class="other-image">其他图片</span>
              <el-link :underline="false" class="all-image">全部图片</el-link>
            </div>
            <div class="user-image">
              <el-col :span="8" v-for="imageUrl in imageMessage.urls" :key="imageUrl">
                <el-image
                  style="width: 80px; height: 80px; cursor: pointer;"
                  :src="imageUrl"
                  :fit="cover">
                </el-image>
              </el-col>
            </div>
            <span class="image-title">{{imageMessage.image.image_title}}</span>
            <div class="image-tags">
              <el-tag
                v-for="tag in imageMessage.tags"
                :key="tag"
                class="tag-item"
                type="info"
                effect="dark">
                {{ tag }}
              </el-tag>
            </div>
            <div class="image-desc">
              {{imageMessage.image.image_description}}
            </div>
            <div>
              <div class="image-number">
                <i class="el-icon-view">{{imageMessage.image.image_view_count}}</i>
                <i class="el-icon-thumb" style="margin-left:20px;">{{imageMessage.image.image_like_count}}</i>
                <i class="el-icon-star-on" style="margin-left:20px;">{{imageMessage.image.image_favorites_count}}</i>
              </div>
              <div class="image-time">{{uploadTime}}</div>
            </div>
          </div>
        </div>
        <!-- 用户操作（点赞、收藏、更多） -->
        <div class="imag-operate">
          <el-button style="font-size:16px;" type="text" icon="el-icon-thumb">赞!</el-button>
          <el-button v-if="favorite" style="font-size:16px;" type="text" icon="el-icon-star-on" @click="favorite=false">已收藏</el-button>
          <el-button v-else style="font-size:16px;" type="text" icon="el-icon-star-off" @click="favorite=true">收藏</el-button>
          <el-button style="font-size:16px; margin-right:10px;" type="text" icon="el-icon-more">更多</el-button>
        </div>
        <!-- 评论 -->
        <div style="width: 1000px;margin-left: 25%;background-color:white">
          <div style="text-align: left;margin:0px 150px;padding-top:30px;">
            评论
            <div style="margin-top:15px;width:800px;">
              <el-avatar> user </el-avatar>
              <el-input class="comment-input" v-model="input" placeholder="发表评论"></el-input>
              <el-button class="comment-publish" type="primary" round>发布</el-button>
            </div>
            <div style="margin-top:20px;width:800px;">
              <div style="height:80px;" v-for="index in commentNum" :key="index">
                <el-avatar style="margin-top:20px;"> user </el-avatar>
                <span style="margin-right:20px;font-size:12px;">用户{{index}}</span>
                评论的内容{{index}}
                <span style="float:right;font-size:14px;margin-top:15px;">{{uploadTime}}</span>
              </div>
            </div>
            <el-button class="load-comment" type="info" round @click="commentNum+=5">浏览更多</el-button>
          </div>
        </div>
        <!-- 相关图片 -->
        <div class="related-image">
          <div class="related-title">
            <span>相关图片</span>
          </div>
          <div>
            <el-col :span="4" v-for="o in relatedImageNum" :key="o" style="margin-top:40px;margin-right:20px;">
              <el-card :body-style="{ padding: '80px' }" shadow="hover" class="img-card">
                相关图片{{o}}
              </el-card>
              <span>图片标题</span>
              <div>
                <span>用户头像</span>
                <span>用户名</span>
              </div>
            </el-col>
          </div>
          <el-button class="load-image" type="info" round @click="relatedImageNum+=20">加载更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import state from '../store/state'
export default {
  components: { Header },
  name: 'ArtWork',
  data () {
    return {
      msg: 'animal',
      imageMessage: [],
      commentNum: 10,
      relatedImageNum: 20,
      image_id: -1,
      user_id: -1,
      uploadTime: '',
      favorite: true
    }
  },
  created () {
    this.image_id = this.$route.params.id
    this.user_id = state.userMessage.user_id
    // 获取图片信息
    const _this = this
    this.$axios.get(state.domain + '/image/' + this.image_id + '/' + this.user_id).then(function (response) {
      if (response.data.code === 200) {
        _this.imageMessage = response.data.data
        _this.formatDate()
        console.log(_this.rankingMessage)
      } else {
        // 获取信息失败
        _this.$notify.error({
          title: '获取图片信息失败',
          message: response.data.message
        })
      }
    })
  },
  methods: {
    // 格式化时间
    formatDate () {
      let date = new Date(this.imageMessage.image.image_upload_time)
      this.uploadTime += date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' '
      this.uploadTime += date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }
  }
}
</script>

<style scoped>
.main-msg {
  margin-left: -100px;
  margin-right: -8px;
}
.image {
  margin-top: 10px;
  height: 50%;
  border-radius: 10px;
}
.user-msg {
  width: 200px;
  height: 200px;
  margin-left: 75%;
  margin-top: -40%;
}
.user-name {
  margin-left: 10px;
  font-size: 16px;
  margin-bottom: 25px;
}
.user-attention {
  width: 250px;
  margin-left: 40px;
}
.other-image {
  position: absolute;
  margin-left: -55px;
  margin-top: 60px;
  font-size: 12px;
}
.all-image {
  position: absolute;
  margin-left: 140px;
  margin-top: 60px;
  font-size: 12px;
  color: rgb(201, 197, 197)
}
.user-image {
  width: 250px;
  margin-left: 40px;
  margin-top: 90px;
}
.image-title {
  position: absolute;
  margin-top: 220px;
  margin-left: -250px;
  font-size: 24px;
  font-weight: bold;
}
.image-tags {
  margin-top: 350px;
  margin-left: 40px;
  width: 250px;
  text-align: left;
}
.tag-item {
  height: 40px;
  margin: 5px 5px 0px 0px;
  text-align: center;
  padding-top: 5px;
  cursor: pointer;
}
.image-desc {
  word-break:break-all;
  word-wrap:break-word;
  margin-left: 40px;
  margin-top: 30px;
  width: 250px;
  text-align: left;
}
.image-number {
  width: 250px;
  position: absolute;
  margin-top: 100px;
  margin-left: -30px;
  font-size: 14px;
}
.image-time {
  position: absolute;
  width: 250px;
  margin-left: -30px;
  margin-top: 120px;
  font-size: 14px;
}
.imag-operate {
  width: 1000px;
  margin-top: 600px;
  margin-left: 25%;
  text-align: right;
  background-color:white;
}
.comment-input {
  width:500px;
  margin-left:15px;
  height: 50px;
  border-radius: 10px;
  position: absolute;
}
.comment-publish {
  position: absolute;
  margin-left: 520px;;
}
.load-comment {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 800px;
}
.related-image {
  margin-left: 25%;
  margin-right: 10%;
  margin-top: 100px;
  text-align: left;
}
.related-title {
  font-size: 24px;
  font-weight: bold;
}
.img-card {
  border-radius: 10px;
  height: 220px;
  width: 220px;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
}
.load-image {
  margin-top: 50px;
  margin-bottom: 20px;
  width: 1200px;
}
</style>
