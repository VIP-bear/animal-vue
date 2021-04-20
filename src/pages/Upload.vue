<template>
  <div>
    <Header></Header>
    <div class="upload-image">
      <el-upload
        action="#"
        list-type="picture-card"
        :limit="1"
        :on-change="uploadSuccess"
        :on-remove="removeSuccess"
        accept="image/jpg,image/png,image/jpeg"
        :data="this.imageMsg"
        :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="tip" style="font-size:12px; color: white;" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
      </el-upload>
    </div>
    <div style="background-color: rgb(231, 227, 227); padding: 50px 0px">
      <div class="image-msg">
        <el-input
          placeholder="标题"
          v-model="imageMsg.image_title"
          maxlength="30"
          show-word-limit
          clearable>
        </el-input>
        <el-input
          type="textarea"
          placeholder="说明"
          v-model="imageMsg.image_description"
          maxlength="300"
          rows="6"
          show-word-limit>
        </el-input>
        <div class="image-tags">
          <span class="input-desc">必填</span>
          <el-tag
            style="margin: 5px; cursor: pointer;"
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputTag"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
        <div class="recomment-tags">
          <el-tag
            style="margin: 5px; cursor: pointer;"
            :key="tag"
            v-for="tag in recommendTags"
            :disable-transitions="false"
            @click="addToTags(tag)">
            {{tag}}
          </el-tag>
        </div>
        <div class="upload-rule">
          <i class="el-icon-warning"></i>
          违反作品投稿利用规则的用户，将会被停止投稿作品公开，停止账号使用。
        </div>
        <el-button :disabled="dynamicTags==''||imageMsg.image==''" class="upload-btn" type="primary" round @click="upload">投稿</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import state from '../store/state'
export default {
  components: { Header },
  name: 'Upload',
  data () {
    return {
      msg: 'animal',
      imageMsg: {
        user_id: state.userMessage.user_id,
        image_title: '',
        image_description: '',
        image_tags: '',
        image: ''
      },
      dynamicTags: [],
      recommendTags: [],
      inputVisible: false,
      inputTag: ''
    }
  },
  created () {
    this.recommendTags = state.userMessage.tags.split('#')
  },
  methods: {
    // 选择图片成功时触发
    uploadSuccess (file, fileList) {
      // 图片转base64
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = e => {
        this.imageMsg.image = e.target.result
      }
    },
    // 移除图片时触发
    removeSuccess (file, fileList) {
      this.imageMsg.image = ''
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputTag
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputTag = ''
    },
    addToTags (tag) {
      this.dynamicTags.push(tag)
    },
    // 上传图片
    upload () {
      for (const tag of this.dynamicTags) {
        this.imageMsg.image_tags += tag + '#'
      }
      const _this = this
      this.$axios.post(state.domain + '/image/upload', this.imageMsg).then(function (response) {
        if (response.data.code === 200) {
          state.hasLogin = true
          // 上传成功
          _this.$notify({
            title: '操作成功',
            message: '投稿成功',
            type: 'success'
          })
          _this.$router.push({path: '/home'})
        } else {
          // 注册失败
          _this.$notify.error({
            title: '操作失败',
            message: response.data.message
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 5px;
}
.button-new-tag {
  margin-left: 5px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 5px;
  vertical-align: bottom;
}
.input-desc {
  position: absolute;
  margin-left: -40px;
  margin-top: 4px;
  background-color: red;
  font-size: 12px;
  padding: 5px;
  border-radius: 5px;
}
.bg-image {
  height: 150px;
  width: 100%;
}
.upload-image {
  background-color: black;
  padding: 20px;
}
.image-msg {
  margin: 0px 30%;
}
.image-tags {
  background-color: white;
  text-align: left;
  margin-top: 10px;
  padding: 5px 0px;
}
.recomment-tags {
  background-color: white;
  text-align: left;
  margin-top: 10px;
}
.upload-rule {
  background-color: white;
  margin-top: 25px;
  font-size: 12px;
  padding: 10px;
}
.upload-btn {
  margin-top: 70px;
  font-size: 20px;
  width: 150px;
}
</style>
