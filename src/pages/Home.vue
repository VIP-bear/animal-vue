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
      <div class="ranking">
        <div class="ranking-title">
          <span>排行榜</span>
        </div>
        <el-col :span="4" v-for="o in 18" :key="o" style="margin:20px 0px;" @click.native="recommandClick(o)">
          <el-card :body-style="{ padding: '80px' }" shadow="hover" class="img-card">
            排行榜图片{{o}}
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
      <div class="recommand-contain">
        <div class="recommand-title">
          <span>推荐图片</span>
        </div>
        <el-col :span="4" v-for="o in 18" :key="o" style="margin:20px 0px;" @click.native="recommandClick(o)">
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
        <el-col :span="4" v-for="o in 18" :key="o" style="margin:20px 0px;">
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
        <el-col :span="4" v-for="o in 6" :key="o" style="margin:20px 0px;">
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
  margin: 0px 200px;
}
.hot-tags {
  height: 60px;
  margin-top: 50px;
  border-radius: 5px;
}
.btn-tag {
  font-size: 24px;
  color: white;
}
.ranking {
  margin-top: 100px;
}
.ranking-title {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}
.recommand-title {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
}
.img-card {
  border-radius: 10px;
  height: 220px;
  width: 220px;
  margin: 10px 10px;
  cursor: pointer;
}
.attention-title {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
}
.user-title {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
}
</style>
