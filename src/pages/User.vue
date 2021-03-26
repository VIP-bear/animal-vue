<template>
  <div>
    <Header></Header>
    <el-button class="bg-image" type="info" plain>背景图片</el-button>
    <div class="main-msg">
      <div class="user-msg">
        <el-avatar :size="100" class="user-header"> user </el-avatar>
        <span class="user-name">用户名</span>
        <el-button class="user-attention" type="text">关注 200</el-button>
        <div>
        </div>
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
      msg: 'animal'
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
  margin: 0px 400px;
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
  position: absolute;
  float: left;
}
</style>
