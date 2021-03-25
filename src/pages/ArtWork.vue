<template>
  <div>
    <!-- 页首 -->
    <Header></Header>
    <div class="main-msg">
      <div style="background-color:rgb(241, 238, 238);">
        <div>
          <!-- 图片 -->
          <el-image
            class="image"
            :src="url"
            :fit="fit">
          </el-image>
          <!-- 右侧用户信息 -->
          <div class="user-msg">
            <el-avatar> user </el-avatar>
            <el-link :underline="false" class="user-name">用户名</el-link>
            <br />
            <el-button class="user-attention" round>关注</el-button>
            <div>
              <span class="other-image">其他图片</span>
              <el-link :underline="false" class="all-image">全部图片</el-link>
            </div>
            <div class="user-image">
              <el-col :span="8" v-for="o in 6" :key="o">
                <el-image
                  style="width: 80px; height: 80px"
                  :src="url"
                  :fit="fill">
                  {{o}}
                </el-image>
              </el-col>
            </div>
            <span class="image-title">图片标题</span>
            <div class="image-tags">
              <el-tag
                v-for="item in items"
                :key="item.label"
                class="tag-item"
                type="info"
                effect="dark">
                {{ item.label }}
              </el-tag>
            </div>
            <div>
              <div class="image-number">
                <i class="el-icon-view">100</i>
                <i class="el-icon-thumb" style="margin-left:20px;">15</i>
                <i class="el-icon-star-on" style="margin-left:20px;">30</i>
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
export default {
  components: { Header },
  name: 'ArtWork',
  data () {
    return {
      msg: 'animal',
      commentNum: 10,
      relatedImageNum: 20,
      items: [
        {label: '标签1'},
        {label: '标签2'},
        {label: '标签3'},
        {label: '标签4'},
        {label: '标签5'},
        {label: '标签6'},
        {label: '标签7'},
        {label: '标签8'},
        {label: '标签9'}
      ],
      uploadTime: '2021/3/18 11:03',
      favorite: true
    }
  }
}
</script>

<style scoped>
.main-msg {
  margin-left: -100px;
}
.image {
  margin-top: 10px;
  width: 1000px;
  height: 800px;
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
}
.image-tags {
  margin-top: 350px;
  margin-left: 40px;
  width: 250px;
  text-align: left;
}
.tag-item {
  width: 75px;
  height: 40px;
  margin: 5px 5px 0px 0px;
  text-align: center;
}
.image-number {
  width: 250px;
  margin-top: 170px;
  margin-left: -10px;
  font-size: 14px;
}
.image-time {
  width: 250px;
  margin-left: -30px;
  margin-top: 10px;
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
}
.load-image {
  margin-top: 50px;
  margin-bottom: 20px;
  width: 1200px;
}
</style>
