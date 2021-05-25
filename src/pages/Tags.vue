<template>
  <div>
    <Header></Header>
    <div style="background-color: gray; height: 50px;"></div>
    <div class="main-container">
      <div class="related-image">
        <div class="related-title">
          <span>相关图片</span>
        </div>
        <div>
          <el-col :span="4" v-for="image in relatedImageList" :key="image" style="margin:20px 20px 20px 0px;">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="img-card" @click.native="recommandClick(image.image_id)">
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
        <el-button v-if="loadMoreImage" class="load-image" type="info" round @click="searchImage">加载更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import state from '../store/state'
export default {
  components: { Header },
  name: 'Tags',
  data () {
    return {
      msg: 'animal',
      title: '关注用户图片',
      hotImageNum: 10,
      relatedImageNum: 40,
      search_name: '',
      relatedImageList: [],
      loadMoreImage: true
    }
  },
  created () {
    this.search_name = this.$route.params.tag
    this.searchImage()
  },
  methods: {
    // 搜索图片
    searchImage () {
      const offset = this.relatedImageList.length
      const _this = this
      if (this.search_name !== '') {
        this.$axios.get(state.domain + '/image/search/' + this.search_name + '/' + offset).then(function (response) {
          if (response.data.code === 200) {
            _this.relatedImageList = _this.relatedImageList.concat(response.data.data)
            if (_this.relatedImageList.length === offset) {
              _this.loadMoreImage = false
            }
            console.log('搜索的相关图片: ' + _this.recommendUserList.length)
          } else {
            // 搜索图片失败
            _this.$notify.error({
              title: '搜索图片失败',
              message: response.data.message
            })
          }
        })
      }
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
.related-image {
  margin-top: 50px;
  text-align: left;
  font-size: 24px;
  font-weight: bold;
}
.load-image {
  margin: 30px 100px 30px 0px;
  width: 1200px;
}
</style>
