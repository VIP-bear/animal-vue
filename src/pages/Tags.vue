<template>
  <div>
    <Header></Header>
    <div style="background-color: gray; height: 50px;"></div>
    <div class="main-container">
      <div class="tag-msg">
        <el-image
          style="width: 100px; height: 100px; margin-left:20px"
          :src="url"
          :fit="fit">
        </el-image>
        <span style="position:absolute;margin:10px;font-size:24px">{{tagName}}</span>
        <span style="position:absolute;margin:60px 0px 0px 10px;">{{imageTotalNum}} 张图片</span>
      </div>
      <div class="hot-image">
        <div style="text-align:left; margin: 40px 0px 0px 20px; font-size:24px; font-weight:bold;">热门图片</div>
        <div class="image-container">
          <el-col :span="4" v-for="o in hotImageNum" :key="o" style="margin: 10px;" @click.native="recommandClick(o)">
            <el-card :body-style="{ padding: '80px' }" shadow="hover" class="img-card">
              热门图片{{o}}
            </el-card>
            <div>
              <span>图片标题</span>
            </div>
            <div>
              <span>用户头像</span>
              <span>用户名</span>
            </div>
          </el-col>
        </div>
      </div>
      <div class="related-image">
        <div style="text-align:left; margin: 40px 0px 0px 20px; font-size:24px; font-weight:bold;">相关图片</div>
        <div class="image-container">
          <el-col :span="4" v-for="o in relatedImageNum" :key="o" style="margin: 10px;" @click.native="recommandClick(o)">
            <el-card :body-style="{ padding: '80px' }" shadow="hover" class="img-card">
              相关图片{{o}}
            </el-card>
            <div>
              <span>图片标题</span>
            </div>
            <div>
              <span>用户头像</span>
              <span>用户名</span>
            </div>
          </el-col>
        </div>
        <el-button class="load-image" type="info" round @click="relatedImageNum+=40">加载更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components: { Header },
  name: 'Tags',
  data () {
    return {
      msg: 'animal',
      title: '关注用户图片',
      hotImageNum: 10,
      relatedImageNum: 40,
      tagName: '标签',
      imageTotalNum: 1234
    }
  }
}
</script>

<style scoped>
.main-container {
  margin: 0px 15%;
}
.tag-msg {
  text-align: left;
}
.img-card {
  border-radius: 10px;
  height: 220px;
  width: 220px;
  margin: 10px;
  cursor: pointer;
}
.related-image {
  margin-top: 700px;
}
.load-image {
  margin: 30px 100px 30px 0px;
  width: 1200px;
}
</style>
