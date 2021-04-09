<template>
  <div>
    <Header></Header>
    <el-button class="bg-image" type="info" plain>背景图片</el-button>
    <div class="main-msg">
      <div class="user-msg">
        <el-avatar :size="120" class="user-header"> {{this.userMessage.username}} </el-avatar>
        <span class="user-name">{{this.userMessage.username}}</span>
        <el-button class="user-attention" type="text" @click="following">关注 {{this.userMessage.attention_count}}</el-button>
        <el-button class="btn-edit" type="info" plain round @click="dialogFormVisible=true">编辑个人资料</el-button>
        <div class="user-introduction">{{this.userMessage.user_introduction}}</div>
        <div class="image-title">作品</div>
        <div class="user-image">
          <el-col :span="4" v-for="o in imageNum" :key="o" style="margin-top:40px;margin-right:20px;">
            <el-card :body-style="{ padding: '80px' }" shadow="hover" class="img-card">
              用户图片{{o}}
            </el-card>
          </el-col>
        </div>
        <el-button class="load-image" type="info" round @click="imageNum+=3">加载更多</el-button>
      </div>
    </div>
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
      imageNum: 6,
      dialogFormVisible: false,
      passwordCheck: true,
      userMessage: state.userMessage,
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
    // 进入页面时执行
    this.form.user_id = this.userMessage.user_id
    this.form.user_introduction = this.userMessage.user_introduction
  },
  methods: {
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
  font-size: 20px;
  font-weight: bold;
}
.img-card {
  border-radius: 10px;
  height: 220px;
  width: 220px;
  margin-right: 10px;
  margin-left: 10px;
}
.load-image {
  margin: 50px 0px 20px -100px;
  width: 1200px;
}
</style>
