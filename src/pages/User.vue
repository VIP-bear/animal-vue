<template>
  <div>
    <Header></Header>
    <el-button class="bg-image" type="info" plain>背景图片</el-button>
    <div class="main-msg">
      <div class="user-msg">
        <el-avatar :size="120" class="user-header"> user </el-avatar>
        <span class="user-name">用户名</span>
        <el-button class="user-attention" type="text" @click="following">关注 200</el-button>
        <div style="font-size:16px;margin-top:10px;">用户描述信息</div>
        <div class="image-title">作品</div>
        <div class="user-image">
          <el-col :span="4" v-for="o in imageNum" :key="o" style="margin-top:40px;margin-right:20px;">
            <el-card :body-style="{ padding: '80px' }" shadow="hover" class="img-card">
              用户图片{{o}}
            </el-card>
          </el-col>
        </div>
        <el-button class="load-image" type="info" round @click="imageNum+=3">加载更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components: { Header },
  name: 'User',
  data () {
    return {
      msg: 'animal',
      imageNum: 6
    }
  },
  methods: {
    following () {
      let id = this.$route.params.id
      this.$router.push({path: id + '/following'})
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
.image-title {
  margin-top: 100px;
  text-align: left;
  font-size: 20px;
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
  margin: 50px 0px 20px -100px;
  width: 1200px;
}
</style>
