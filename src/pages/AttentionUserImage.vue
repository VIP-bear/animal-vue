<template>
  <div>
    <Header></Header>
    <div style="background-color: rgb(226, 224, 224);">
      <div class="main-container">
        <div class="title-msg">{{title}}</div>
        <div class="image-container">
          <el-col :span="5" v-for="o in imageNum" :key="o" style="margin: 20px;" @click.native="recommandClick(o)">
            <el-card :body-style="{ padding: '80px' }" shadow="hover" class="img-card">
              用户图片{{o}}
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
        <div class="page-container">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components: { Header },
  name: 'AttentionUserImage',
  data () {
    return {
      msg: 'animal',
      title: '关注用户图片',
      imageNum: 20
    }
  }
}
</script>

<style scoped>
.main-container {
  background-color: rgb(226, 224, 224);
  margin: 0px 20%;
}
.title-msg {
  text-align: left;
  margin: 0px 50px;
  font-size: 22px;
  font-weight: bold;
  padding-top: 20px;
}
.image-container {
  margin: 0px 20px;
}
.img-card {
  border-radius: 10px;
  height: 220px;
  width: 220px;
  margin: 20px 10px;
  cursor: pointer;
}
.page-container {
  margin-top: 1800px;
}
</style>
