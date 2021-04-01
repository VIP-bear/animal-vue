<template>
  <div>
    <Header></Header>
    <div class="main-msg">
      <div class="hot-tags">
        <el-row>
          <el-col :span="3" v-for="o in 8" :key="o" style="padding:2px;">
            <el-card :body-style="{ padding: '10px' }" shadow="hover" style="background-color: violet;">
              <el-button class="btn-tag" type="text" @click="searchTag(o)">标签{{o}}</el-button>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="recommand-contain">
        <div class="recommand-title">
          <span>推荐图片</span>
        </div>
        <el-col :span="4" v-for="o in 18" :key="o" style="margin-top:40px;" @click.native="recommandClick(o)">
          <el-card :body-style="{ padding: '80px' }" shadow="hover" class="img-card">
            推荐图片{{o}}
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
      <div class="attention-contain">
        <div class="attention-title">
          <span>关注用户·好友图片</span>
          <el-link :underline="false" style="margin-left:1200px" @click.native="attentionUserImage">查看全部</el-link>
        </div>
        <el-col :span="4" v-for="o in 18" :key="o" style="margin-top:40px;">
          <el-card :body-style="{ padding: '80px' }" shadow="hover" class="img-card">
            关注用户图片{{o}}
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
      <div class="user-contain">
        <div class="user-title">
          <span>推荐用户</span>
        </div>
        <el-col :span="4" v-for="o in 6" :key="o" style="margin-top:40px;">
          <el-card :body-style="{ padding: '80px' }" shadow="hover" class="img-card">
            推荐用户{{o}}
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
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components: { Header },
  name: 'Home',
  data () {
    return {
      msg: 'animal'
    }
  },
  methods: {
    recommandClick (index) {
      this.$router.push({path: '/artworks/' + index})
    },
    attentionUserImage () {
      this.$router.push({path: '/bookmark_new_image'})
    },
    searchTag (tag) {
      this.$router.push({path: '/tags/' + tag})
    }
  }
}
</script>

<style scoped>
.main-msg {
  transform: translate(0%, -50%);
  margin: 0px 200px;
}
.hot-tags {
  height: 60px;
  border-radius: 5px;
}
.btn-tag {
  font-size: 24px;
  color: white;
}
.recommand-contain {
  margin-top: 60px;
}
.recommand-title {
  position: absolute;
  font-size: 24px;
  font-weight: bold;
}
.img-card {
  border-radius: 10px;
  height: 220px;
  width: 220px;
  margin: 10px 10px;
  cursor: pointer;
}
.attention-contain {
  margin-top: 1100px;
}
.attention-title {
  position: absolute;
  font-size: 24px;
  font-weight: bold;
}
.user-contain {
  margin-top: 2150px;
}
.user-title {
  position: absolute;
  font-size: 24px;
  font-weight: bold;
}
</style>
