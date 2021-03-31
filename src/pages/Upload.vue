<template>
  <div>
    <Header></Header>
    <div class="upload-image">
      <el-upload
        action="#"
        list-type="picture-card"
        limit="1"
        :on-change="uploadSuccess"
        :on-remove="removeSuccess"
        accept="image/jpg,image/png,image/jpeg"
        :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="tip" style="font-size:12px; color: white;" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
      </el-upload>
    </div>
    <div style="background-color: rgb(231, 227, 227); padding: 50px 0px">
      <div class="image-msg">
        <el-input
          placeholder="标题"
          v-model="imageTitle"
          maxlength="30"
          show-word-limit
          clearable>
        </el-input>
        <el-input
          type="textarea"
          placeholder="说明"
          v-model="imageDesc"
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
            v-model="inputValue"
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
        <el-button class="upload-btn" type="primary" round>投稿</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components: { Header },
  name: 'Upload',
  data () {
    return {
      uploadImage: '',
      msg: 'animal',
      dialogImageUrl: '',
      imageTitle: '',
      imageDesc: '',
      dynamicTags: [],
      recommendTags: ['推荐标签1', '推荐标签2', '推荐标签3', '推荐标签4', '推荐标签5', '推荐标签6', '推荐标签7', '推荐标签8', '推荐标签9', '推荐标签10'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    // 选择图片成功时触发
    uploadSuccess (response, file, fileList) {
      this.uploadImage = file
    },
    // 移除图片时触发
    removeSuccess (file, fileList) {
      this.uploadImage = ''
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
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    addToTags (tag) {
      this.dynamicTags.push(tag)
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
