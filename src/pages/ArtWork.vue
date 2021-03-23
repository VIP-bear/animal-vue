<template>
  <div>
    <Header></Header>
    <div class="main-msg">
      <div>
        <div>
          <el-image
            class="image"
            :src="url"
            :fit="fit">
          </el-image>
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
              <el-row>
                <el-col :span="8" v-for="o in 9" :key="o" style="padding:2px;">
                  <el-card :body-style="{ padding: '10px' }" shadow="hover" style="background-color: violet;">
                    <el-button class="btn-tag" type="text">标签{{o}}</el-button>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
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
      msg: 'animal'
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
  color: rgb(212, 208, 208)
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
  position: absolute;
  margin-top: 260px;
  margin-left: 35px;
  width: 250px;
}
</style>
