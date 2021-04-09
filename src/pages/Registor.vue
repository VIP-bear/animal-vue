<template>
  <div class="wrapper">
    <div class="registor-contain">
      <div class="ms-title">animal</div>
      <el-form :model="registerData" :rules="rules" ref="registerForm" class="ms-content">
        <el-form-item prop="email">
          <el-input class="input-email" v-model="registerData.email" placeholder="邮箱地址">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input-password"
            type="password"
            placeholder="密码"
            v-model="registerData.password" show-password>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            class="input-username"
            placeholder="用户名"
            v-model="registerData.username"
            @keyup.enter.native="submitForm()">
          </el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button :disabled="emailCheck || passwordCheck || usernameCheck" class="btn-registor" round type="primary" @click="registor">注册用户</el-button>
      </div>
      <el-divider direction="horizontal"></el-divider>
      <div class="ms-text">You never know how strong you are until being strong is your only choice.</div>
    </div>
  </div>
</template>

<script>
import state from '../store/state'
export default {
  name: 'Login',
  data () {
    // 邮箱验证
    var validateEmail = (rule, value, callback) => {
      if (value.trim().length === 0) {
        this.emailCheck = true
        callback(new Error('用户名不能为空'))
      }
      var emailreg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!emailreg.test(value)) {
        this.emailCheck = true
        callback(new Error('请输入有效的邮箱'))
      } else {
        this.emailCheck = false
        callback()
      }
    }
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
    // 用户名验证
    var validateUsername = (rule, value, callback) => {
      if (value.trim().length === 0) {
        this.usernameCheck = true
        callback(new Error('用户名不能为空'))
      } else {
        this.usernameCheck = false
        callback()
      }
    }
    return {
      emailCheck: true,
      passwordCheck: true,
      usernameCheck: true,
      registerData: {
        email: '',
        password: '',
        username: ''
      },
      rules: {
        email: [
          {required: true, validator: validateEmail, trigger: 'blur'}
        ],
        password: [
          {required: true, validator: validatePassword, trigger: 'blur'}
        ],
        username: [
          {required: true, validator: validateUsername, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 注册
    registor () {
      const _this = this
      this.$axios.post(state.domain + '/user/register', JSON.stringify(this.registerData), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        if (response.data.code === 200) {
          state.hasLogin = true
          state.userMessage = response.data.data
          // 注册成功
          _this.$notify({
            title: '注册成功',
            message: '欢迎!',
            type: 'success'
          })
          _this.$router.push({path: '/home'})
        } else {
          // 注册失败
          _this.$notify.error({
            title: '注册失败',
            message: response.data.message
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.ms-title {
  line-height: 3;
  font-size: 40px;
  color: rgb(76, 119, 247);
  user-select: none;
}
.el-form-item {
  padding: 0px 25px;
}
.ms-text {
  line-height: 1.5;
  font-size: 18px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
  text-align: left;
}
.registor-contain {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  border-radius: 5px;
  background: rgba(204, 200, 200, 0.3);
  overflow: hidden;
}
.input-email {
  width: 300px;
  height: 50px;
  font-size: 16px;
  margin-bottom: -10px;
}
.input-password {
  width: 300px;
  height: 50px;
  font-size: 16px;
  margin-bottom: -10px;
}
.input-username {
  width: 300px;
  height: 50px;
  font-size: 16px;
}
.link {
  position: relative;
  top: -20px;
  right: -120px;
  user-select: none;
}
.btn-registor {
  width: 300px;
  height: 40px;
  font-size: 18px;
  margin-bottom: 20px;
}
.wrapper {
  background-image: url(../assets/img/bg-image.png);
  height: 945px;
  margin: -60px -8px;
}
</style>
