<template>
  <div>
    <!-- 页首 -->
    <Header></Header>
    <div class="main-msg">
      <div style="background-color:rgb(241, 238, 238);">
        <div style="width:100%">
          <!-- 图片 -->
          <div style="width:1000px; margin-left:25%; 
          background-color: rgb(240, 245, 240);float:left;">
            <el-image
              class="image"
              :src="imageMessage.image.image_url"
              :fit="contain">
            </el-image>
          </div>
          <!-- 右侧用户信息 -->
          <div class="user-msg">
            <el-avatar style="cursor: pointer;" @click.native="jumpToUser(imageMessage.user.user_id)"> {{imageMessage.user.username}} </el-avatar>
            <el-link :underline="false" class="user-name" @click.native="jumpToUser(imageMessage.user.user_id)">{{imageMessage.user.username}}</el-link>
            <el-button class="user-attention" round @click="attentionUser">{{attention ? '已关注' : '关注'}}</el-button>
            <div style="margin:40px 0px 0px 10px;">
              <span class="other-image">其他图片</span>
              <el-link :underline="false" class="all-image" @click.native="jumpToUser(imageMessage.user.user_id)">全部图片</el-link>
            </div>
            <div class="user-image">
              <el-col :span="8" v-for="image in imageMessage.imageList" :key="image" style="padding:3px;" @click.native="recommandClick(image.image_id)">
                <img style="cursor: pointer;width:80px;height:80px;object-fit: cover;"
                  :src="image.image_url">
              </el-col>
            </div>
            <div class="image-title">
              {{imageMessage.image.image_title}}
            </div>
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
                <!-- <i class="el-icon-thumb" style="margin-left:20px;">{{imageMessage.image.image_like_count}}</i> -->
                <i class="el-icon-star-on" style="margin-left:20px;">{{imageMessage.image.image_favorites_count}}</i>
              </div>
              <div class="image-time">{{uploadTime}}</div>
            </div>
          </div>
        </div>
        <!-- 收藏 -->
        <div class="imag-operate">
          <!-- <el-button style="font-size:16px;" type="text" icon="el-icon-thumb">赞!</el-button> -->
          <el-button v-if="favorites" style="font-size:16px;" type="text" icon="el-icon-star-on" @click="favoritesImage">已收藏</el-button>
          <el-button v-else style="font-size:16px;" type="text" icon="el-icon-star-off" @click="favoritesImage">收藏</el-button>
          <!-- <el-button style="font-size:16px; margin-right:10px;" type="text" icon="el-icon-more">更多</el-button> -->
        </div>
        <!-- 评论 -->
        <div style="width: 1000px;margin-left: 25%;background-color:white">
          <div style="text-align: left;margin:0px 150px;padding-top:30px;">
            评论
            <div style="margin-top:15px;width:800px;">
              <el-avatar> {{username}} </el-avatar>
              <el-input class="comment-input" v-model="inputComment" placeholder="发表评论"></el-input>
              <el-button class="comment-publish" type="primary" round @click="pulishComment">发布</el-button>
            </div>
            <div style="margin-top:20px;width:800px;">
              <div style="height:80px;" v-for="comment in commentList" :key="comment">
                <el-avatar style="margin-top:20px;"> {{comment.user.username}} </el-avatar>
                <span style="margin-right:20px;font-size:12px;">{{comment.user.username}}</span>
                {{comment.comment_content}}
                <span style="float:right;font-size:14px;margin-top:15px;">{{uploadTime}}</span>
              </div>
            </div>
            <el-button v-if="loadMoreComment" class="load-comment" type="info" round 
              @click="getComment">浏览更多</el-button>
          </div>
        </div>
        <!-- 相关图片 -->
        <div class="related-image">
          <div class="related-title">
            <span>相关图片</span>
          </div>
          <div>
            <el-col :span="4" v-for="image in relatedImageList" :key="image" 
              style="margin:20px 20px 20px 0px;">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" class="img-card" 
                @click.native="recommandClick(image.image_id)">
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
          <el-button v-if="loadMoreImage" class="load-image" type="info" round 
            @click="getRelatedImageList">加载更多</el-button>
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
      userMessage: [],
      image_id: -1,
      user_id: -1,
      username: '',
      uploadTime: '',
      favorites: false,
      attention: false,
      inputComment: '',
      commentList: [],
      loadMoreComment: true,
      relatedImageList: [],
      loadMoreImage: true
    }
  },
  created () {
    this.userMessage = JSON.parse(sessionStorage.getItem('userMessage'))
    this.user_id = this.userMessage.user_id
    this.username = this.userMessage.username
    // 获取图片信息
    this.getImageMessage()
    // 获取评论
    this.getComment()
    // 获取关联图片
    this.getRelatedImageList()
  },
  methods: {
    // 跳转到用户界面
    jumpToUser (userId) {
      this.$router.push({path: '/users/' + userId})
    },
    recommandClick (index) {
      this.$router.push({path: '/artworks/' + index})
      this.getImageMessage()
      this.getComment()
      this.getRelatedImageList()
    },
    // 获取图片信息
    getImageMessage () {
      this.image_id = this.$route.params.id
      const _this = this
      this.$axios.get(state.domain + '/image/' + this.image_id + '/' + this.user_id).then(function (response) {
        if (response.data.code === 200) {
          _this.imageMessage = response.data.data
          _this.formatDate()
          _this.favorites = _this.imageMessage.favorites
          _this.attention = _this.imageMessage.attention
        } else {
          // 获取信息失败
          _this.$notify.error({
            title: '获取图片信息失败',
            message: response.data.message
          })
        }
      })
    },
    // 获取关联图片
    getRelatedImageList () {
      const offset = this.relatedImageList.length
      const _this = this
      if (this.loadMoreImage) {
        this.$axios.get(state.domain + '/image/recommend/' + this.image_id + '/' + offset).then(function (response) {
          if (response.data.code === 200) {
            _this.relatedImageList = _this.relatedImageList.concat(response.data.data)
            if (_this.relatedImageList.length === offset) {
              _this.loadMoreImage = false
            }
            console.log(_this.relatedImageList)
          } else {
            // 获取关联图片失败
            _this.$notify.error({
              title: '获取关联图片失败',
              message: response.data.message
            })
          }
        })
      }
    },
    // 格式化时间
    formatDate () {
      this.uploadTime = ''
      let date = new Date(this.imageMessage.image.image_upload_time)
      this.uploadTime += date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' '
      this.uploadTime += date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    },
    // 关注用户
    attentionUser () {
      this.attention = !this.attention
      const _this = this
      let data = {'user_id': this.user_id, 'attention_user_id': this.imageMessage.user.user_id, 'state': this.attention ? 1 : 0}
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
    },
    // 获取评论
    getComment () {
      const offset = this.commentList.length
      const _this = this
      if (this.loadMoreComment) {
        this.$axios.get(state.domain + '/comment/' + this.image_id + '/' + offset).then(function (response) {
          if (response.data.code === 200) {
            _this.commentList = _this.commentList.concat(response.data.data)
            if (_this.commentList.length === offset) {
              _this.loadMoreComment = false
            }
            console.log(response.data.data)
          } else {
            // 获取信息失败
            _this.$notify.error({
              title: '获取评论信息失败',
              message: response.data.message
            })
          }
        })
      }
    },
    // 发表评论
    pulishComment () {
      const _this = this
      let data = {'image_id': this.image_id, 'user_id': this.user_id, 
        'comment_content': this.inputComment}
      if (this.inputComment !== '') {
        this.$axios.post(state.domain + '/comment/publish', data).then(function (response) {
          if (response.data.code === 200) {
            _this.commentList.unshift(response.data.data)
            console.log('res:' + response.data.data)
            _this.inputComment = ''
          } else {
            // 发表评论失败
            _this.$notify.error({
              title: '评论失败',
              message: response.data.message
            })
          }
        })
      }
    },
    // 取消/收藏图片
    favoritesImage () {
      this.favorites = !this.favorites
      let flag = this.favorites ? '1' : '0'
      const _this = this
      this.$axios.get(state.domain + '/image/favorites/' + this.image_id + '/' + this.user_id + '/' + flag).then(function (response) {
        if (response.data.code === 200) {
          _this.commentList = _this.commentList.concat(response.data.data)
          console.log(response.data.data)
        } else {
          // 获取信息失败
          _this.$notify.error({
            title: '获取评论信息失败',
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
  margin-left: -100px;
  margin-right: -8px;
}
.image {
  margin-top: 10px;
  height: 50%;
  border-radius: 10px;
}
.user-msg {
  width: 300px;
  margin-left: 75%;
  padding-top: 10px;
  padding-left: 20px;
  text-align: left;
}
.user-name {
  margin-left: 10px;
  font-size: 16px;
  margin-bottom: 25px;
}
.user-attention {
  width: 250px;
}
.other-image {
  font-size: 12px;
}
.all-image {
  margin-left: 140px;
  font-size: 12px;
  color: rgb(201, 197, 197)
}
.user-image {
  width: 250px;
  margin-left: 10px;
  margin-top: 10px;
}
.image-title {
  margin-top: 250px;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
}
.image-tags {
  margin-top: 10px;
  margin-left: 10px;
  width: 250px;
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
  margin-left: 10px;
  margin-top: 10px;
  width: 250px;
  text-align: left;
}
.image-number {
  width: 250px;
  margin-top: 100px;
  margin-left: 10px;
  font-size: 14px;
}
.image-time {
  width: 250px;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 14px;
}
.imag-operate {
  width: 1000px;
  margin-top: 10px;
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
  margin-top: 50px;
  margin-bottom: 20px;
  width: 1200px;
}
</style>
