<template>
  <div>
    <Header></Header>
    <el-button class="bg-image" type="info" plain>背景图片</el-button>
    <div class="main-msg">
      <div class="user-msg">
        <el-avatar :size="120" class="user-header"> user </el-avatar>
        <span class="user-name">用户名</span>
        <div class="attention-num">关注 100</div>
        <div class="attention-usr-msg" v-for="index in userNum" :key="index">
          <el-avatar :size="80"> user </el-avatar>
          <span style="position: absolute; margin-left: 10px;">用户名</span>
          <span class="user-desc">用户描述信息巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉</span>
          <el-button class="user-attention" round>已关注</el-button>
          <div class="user-images">
            <el-col :span="6" v-for="o in 4" :key="o">
              <el-card shadow="hover" class="img-card">
                用户图片{{o}}
              </el-card>
              <span>图片标题</span>
            </el-col>
          </div>
          <div style="margin-top:150px;">
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
export default {
  components: { Header },
  name: 'Following',
  data () {
    return {
      msg: 'animal',
      userNum: 10
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
  position: absolulte;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 16px;
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
  height: 180px;
  width: 180px;
  margin-left: 10px;
}
.load-image {
  margin: 20px 0px;
  width: 1000px;
}
</style>
