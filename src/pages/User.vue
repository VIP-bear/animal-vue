<template>
  <div>
    <Header></Header>
    <el-button class="bg-image" type="info" plain>背景图片</el-button>
    <div class="main-msg">
      <!-- 用户信息 -->
      <div class="user-msg">
        <el-avatar :size="120" class="user-header">{{this.userMessage.username}}</el-avatar>
        <span class="user-name">{{this.userMessage.username}}</span>
        <el-button v-if="isEdit" class="user-attention" type="text" 
          @click="following">关注 {{this.userMessage.attention_count}}</el-button>
        <el-button v-if="isEdit" class="btn-edit" type="info" plain round 
          @click="dialogFormVisible=true">编辑个人资料</el-button>
        <div class="user-introduction">{{this.userMessage.user_introduction}}</div>
        <!-- 作品 -->
        <div class="image-title">作品</div>
        <div class="user-image">
          <el-col :span="4" v-for="image in userImageList" :key="image" style="margin:10px 20px;" @click.native="recommandClick(image.image_id)">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="img-card">
              <img :src="image.image_url" class="image">
            </el-card>
            <div style="height:40px;text-align:left; margin-left:10px;font-size:16px;">
              <div style="font-weight:bold;">
                <span>{{image.image_title}}</span>
              </div>
              <div>
                <span>{{image.user.username}}</span>
              </div>
            </div>
          </el-col>
        </div>
        <el-button v-if="loadMoreImage" class="load-image" type="info" round 
          @click="getUserImageList">加载更多</el-button>
      </div>
    </div>
    <!-- 编辑用户信息 -->
    <el-dialog width="20%" title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="registerForm">
        <el-form-item prop="password" label="用户密码" :label-width="120">
          <el-input v-model="form.password" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="用户介绍" :label-width="120">
          <el-input
            type="textarea"
            :rows="4"
            maxlength="200"
            show-word-limit
            v-model="form.user_introduction">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button :disabled="passwordCheck" type="primary" @click="successSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import state from '../store/state'
export default {
  components: { Header },
  name: 'User',
  data () {
    // 密码验证
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        this.passwordCheck = true
        callback(new Error('请输入密码'))
      }
      if (/[\u4E00-\u9FA5\s]/.test(value)) {
        this.passwordCheck = true
        callback(new Error('密码不能出现汉字、空格'))
      }
      var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
      if (!passwordreg.test(value)) {
        this.passwordCheck = true
        callback(new Error('密码只能使用半角英文字母、数字和符号'))
      } else {
        this.passwordCheck = false
        callback()
      }
    }
    return {
      msg: 'animal',
      dialogFormVisible: false,
      passwordCheck: true,
      isEdit: true,
      userMessage: [],
      userImageList: [],
      loadMoreImage: true,
      user_id: 0,
      offset: 0,
      form: {
        user_id: '',
        password: '',
        user_introduction: ''
      },
      rules: {
        password: [
          {required: true, validator: validatePassword, trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    // 获取用户id
    this.user_id = this.$route.params.id
    // eslint-disable-next-line
    if (this.user_id != state.userMessage.user_id) {
      this.isEdit = false
      // 其它用户的信息
      const _this = this
      this.$axios.get(state.domain + '/user/' + this.user_id).then(function (response) {
        if (response.data.code === 200) {
          _this.userMessage = response.data.data
        } else {
          // 获取用户信息失败
          _this.$notify.error({
            title: '获取用户信息失败',
            message: response.data.message
          })
        }
      })
    } else {
      // 自己的信息
      this.userMessage = JSON.parse(sessionStorage.getItem('userMessage'))
    }
    this.form.user_id = this.userMessage.user_id
    this.form.user_introduction = this.userMessage.user_introduction
    // 获取用户图片
    this.getUserImageList()
  },
  methods: {
    // 获取用户图片
    getUserImageList () {
      this.offset = this.userImageList.length
      const _this = this
      if (this.loadMoreImage) {
        this.$axios.get(state.domain + '/user/upload_image/' + this.user_id + '/' + this.offset).then(function (response) {
          if (response.data.code === 200) {
            _this.userImageList = _this.userImageList.concat(response.data.data)
            if (_this.offset === _this.userImageList.length) {
              _this.loadMoreImage = false
            }
          } else {
            // 获取用户图片信息失败
            _this.$notify.error({
              title: '获取用户图片信息失败',
              message: response.data.message
            })
          }
        })
      }
    },
    following () {
      let id = this.$route.params.id
      this.$router.push({path: id + '/following'})
    },
    cancelSubmit () {
      this.dialogFormVisible = false
      this.form.password = ''
      this.form.user_introduction = this.userMessage.user_introduction
    },
    successSubmit () {
      this.dialogFormVisible = false
      const _this = this
      this.$axios.post(state.domain + '/user/update_message', JSON.stringify(this.form), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        if (response.data.code === 200) {
          state.userMessage = response.data.data
          // 更新成功
          _this.form.password = ''
          _this.$notify({
            title: '操作成功',
            message: '更新成功',
            type: 'success'
          })
        } else {
          // 更新失败
          _this.$notify.error({
            title: '操作失败',
            message: response.data.message
          })
        }
      })
    },
    recommandClick (index) {
      this.$router.push({path: '/artworks/' + index})
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
.btn-edit {
  position: absolute;
  margin: 5px 0px 0px 320px;
}
.user-introduction {
  font-size:16px;
  text-align: left;
  margin-top: 10px;
  margin-left: 500px;
  width: 400px;
}
.image-title {
  margin-top: 100px;
  text-align: left;
  margin-left: 30px;
  font-size: 20px;
  font-weight: bold;
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
.load-image {
  margin: 50px 0px 50px 20px;
  width: 1200px;
}
</style>
