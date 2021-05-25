<template>
  <div>
    <Header></Header>
    <div style="background-color: rgb(226, 224, 224);">
      <div class="main-container">
        <div class="related-title">
          <span style=" font-size: 24px;font-weight: bold;margin-left:-1200px;">大家的新作</span>
        </div>
        <div>
          <el-col :span="4" v-for="image in newImageList" :key="image" style="margin:20px 20px 20px 0px;">
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
        <el-button v-if="loadMoreImage" class="load-image" type="info" round @click="getNewImage">加载更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import state from '../store/state'
export default {
  components: { Header },
  name: 'NewImage',
  data () {
    return {
      msg: 'animal',
      newImageList: [],
      loadMoreImage: true
    }
  },
  created () {
    this.getNewImage()
  },
  methods: {
    // 获取新发布的图片
    getNewImage () {
      const offset = this.newImageList.length
      const _this = this
      this.$axios.get(state.domain + '/image/new_image/' + offset).then(function (response) {
        if (response.data.code === 200) {
          _this.newImageList = _this.newImageList.concat(response.data.data)
          if (_this.newImageList.length === offset) {
            _this.loadMoreImage = false
          }
        } else {
          // 获取新发布的图片失败
          _this.$notify.error({
            title: '获取新发布的图片失败',
            message: response.data.message
          })
        }
      })
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
}
.load-image {
  margin: 30px 100px 30px 0px;
  width: 1200px;
}
</style>
