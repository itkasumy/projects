<template>
  <div class="login-message" @keyup.enter="login">
    <div class="phone">
      <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
      <el-button type="primary" @click="openModel">获取验证码</el-button>
    </div>
    <el-input v-model="verify" placeholder="请输入短信验证码"></el-input>
    <el-button type="primary" :loading="submitLoading" @click="login">登录</el-button>
    <send-message ref="sendMessage" :phone="phone" @close="closeModel"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import SendMessage from "./send-message";

  export default {
    name: "login-message",
    components: {SendMessage},
    data() {
      return {
        phone: null,
        verify: null,
        submitLoading: false
      }
    },
    computed: {
      token() {
        return this.$refs.sendMessage.token
      }
    },
    methods: {
      ...mapActions('user', ['ajaxLogin']),
      openModel() {
        if (!this.phone) {
          this.$message.error('请输入手机号码')
        } else {
          this.$refs.sendMessage.open()
          this.$emit('open')
        }
      },
      closeModel() {
        this.$emit('close')
      },
      async login() {
        let {phone, verify, token} = this
        if (!verify) {
          this.$message.error('请输入短信验证码')
          return
        }
        this.submitLoading = true
        let res = await this.ajaxLogin({phone, verify, token, platform: 1, loginType: 2})
        if (res.code === 1) {
          this.$message.success(res.message)
          let auth = {headers: {Authorization: res.data.token}}
          localStorage.setItem('auth', JSON.stringify(auth))
          this.$router.go(-1)
        } else {
          this.$message.error(res.message)
        }
        this.submitLoading = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-message {
    position: relative;
    .phone {
      margin-top: 30px;
      overflow: hidden;
      .el-input {
        margin-top: 0;
        float: left;
        width: 200px;
      }
      .el-button {
        float: left;
        width: 90px;
        height: 30px;
        padding: 0;
        text-align: center;
        margin-left: 20px;
        margin-top: 5px;
        font-size: 12px;
      }
    }
    .el-input {
      margin-top: 30px;
    }
    .el-button {
      margin-top: 30px;
      width: 100%;
    }
  }
</style>
