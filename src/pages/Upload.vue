<template>
  <div>
    <Header></Header>
    <div class="upload-image">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="tip" style="font-size:12px; color: white;" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <div style="background-color: gray; padding: 50px 0px">
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
        <el-input
          style="image-tags"
          placeholder="标签"
          v-model="imageTitle"
          maxlength="30"
          show-word-limit
          clearable>
        </el-input>
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
      msg: 'animal',
      dialogImageUrl: '',
      imageTitle: '',
      imageDesc: ''
    }
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
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
</style>
