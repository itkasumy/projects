<template>
  <div class="retrieve-password">
    <account-header/>
    <div class="container">
      <img src="/loong/static/img/account-inset.png" class="inset">
      <div class="panel" :class="{mask: maskShow}">
        <div class="header">
          <div class="title">重新设置密码</div>
          <div class="link">
            <router-link :to="homeUrl">首页</router-link>
            <router-link :to="loginUrl">登录</router-link>
          </div>
        </div>
        <div class="form" @keyup.enter="resetPassword">
          <!--手机号-->
          <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
          <!--验证码-->
          <div class="verify">
            <el-input v-model="verify" placeholder="请输入验证码"></el-input>
            <el-button type="primary" @click="openModel">获取验证码</el-button>
          </div>
          <!--密码-->
          <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
          <!--确认密码-->
          <el-input v-model="confirmPassword" type="password" placeholder="确认密码"></el-input>
          <!--提交-->
          <el-button class="submit" type="primary" @click="resetPassword" :loading="submitLoading">确认</el-button>
          <!--弹窗-->
          <send-message ref="sendMessage" :phone="phone" @close="closeModel"/>
        </div>
      </div>
    </div>
    <account-footer/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import AccountHeader from "../../components/account/account-header"
  import AccountFooter from "../../components/account/account-footer"
  import SendMessage from "../../components/account/send-message"

  export default {
    name: "retrieve-password",
    components: {AccountHeader, AccountFooter, SendMessage},
    data() {
      return {
        homeUrl: '/',
        loginUrl: '/account/login',
        phone: null,
        verify: null,
        password: null,
        confirmPassword: null,
        submitLoading: false,
        maskShow: false
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      ...mapActions('user', ['ajaxForgetPassword']),
      openModel() {
        if (!this.phone) {
          this.$message.error('请输入手机号码')
        } else {
          this.$refs.sendMessage.open()
          this.maskShow = true
        }
      },
      closeModel() {
        this.maskShow = false
      },
      async resetPassword() {
        let {phone, verify, password, confirmPassword} = this
        if (!verify) {
          this.$message.error('请输入验证码')
        } else if (!password) {
          this.$message.error('请输入密码')
        } else if (password !== confirmPassword) {
          this.$message.error('两次密码不一致')
        } else {
          this.submitLoading = true
          let token = this.$refs.sendMessage.token
          let newpassword = this.$md5(password)
          let res = await this.ajaxForgetPassword({phone, verify, token, newpassword, platform: 1})
          this.submitLoading = false
          console.log('重置密码', res)
          if (res.code === 1) {
            this.$message.success(res.message)
            setTimeout(() => {
              this.$router.push('/account/login')
            }, 1000)
          } else {
            this.$message.error(res.message)
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .retrieve-password {
    background: #fff;
    height: 100vh;
    position: relative;
    .container {
      @include container;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
    }
    .inset {
      float: left;
      width: 600px;
      margin-top: 100px;
      margin-left: 60px;
    }
    .panel {
      float: right;
      width: 380px;
      padding: 30px 30px 40px;
      border: 1px solid #ddd;
      border-radius: 6px;
      margin-top: 10px;
      box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.02);
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
        z-index: 2;
        border-radius: 6px;
        display: none;
      }
      &.mask {
        &:before {
          display: block;
        }
      }
      .header {
        overflow: hidden;
        .title {
          float: left;
          font-size: 24px;
          font-weight: bold;
          color: #333333;
        }
        .link {
          float: right;
          height: 30px;
          line-height: 30px;
          a {
            margin: 0 10px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
      .form {
        position: relative;
        .el-select {
          margin-top: 30px;
          width: 100%;
        }
        .el-input {
          margin-top: 30px;
        }
        .verify {
          overflow: hidden;
          margin-top: 30px;
          .el-input {
            float: left;
            width: 65%;
            margin-top: 0;
          }
          .el-button {
            float: right;
            width: 30%;
            padding: 0;
            height: 30px;
            margin-top: 5px;
          }
        }
        .submit {
          width: 100%;
          margin-top: 30px;
        }
        .send-message {
          top: 30px
        }
      }
    }
  }
</style>
