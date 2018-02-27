<template>
  <div class="login-password" @keyup.enter="login">
    <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
    <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
    <div class="verify">
      <el-input v-model="verify" placeholder="请输入验证码"></el-input>
      <div class="code-img">
        <img :src="codeImg" v-if="!imgLoading">
        <i class="iconfont icon-shuaxin" :class="{'icon-rotating' : imgLoading}" @click="getCodeImage"></i>
      </div>
    </div>
    <div class="forget">
      <router-link to="/account/retrieve-password">忘记密码</router-link>
    </div>
    <el-button type="primary" :loading="submitLoading" @click="login">登录</el-button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "login-password",
    data() {
      return {
        passwordUrl: '/account/retrieve-password',
        phone: null,
        password: null,
        verify: null,
        token: null,
        codeImg: null,
        imgLoading: false,
        submitLoading: false
      }
    },
    computed: {},
    mounted() {
      this.getCodeImage()
    },
    methods: {
      ...mapActions('user', ['ajaxCodeImg', 'ajaxLogin']),
      async getCodeImage() {
        if (this.imgLoading) return
        this.imgLoading = true
        let {token, codeImg} = await this.ajaxCodeImg()
        this.token = token
        this.codeImg = codeImg
        this.imgLoading = false
      },
      async login() {
        let {phone, password, verify, token} = this
        if (!phone) {

        } else if (!password) {
          this.$message.error('请输入密码')
          return
        } else if (!verify) {

        }
        this.submitLoading = true
        password = this.$md5(password)
        let res = await this.ajaxLogin({account: phone, password, verify, token, platform: 1, loginType: 1})
        if (res.code === 1) {
          this.$message.success(res.message)
          let auth = {headers: {Authorization: res.data.token}}
          localStorage.setItem('auth', JSON.stringify(auth))
          this.$router.go(-1)
        } else {
          this.$message.error(res.message)
          this.getCodeImage()
        }
        this.submitLoading = false
      }
    }
  }
</script>

<style lang="scss">
  .login-password {
    .el-input {
      margin-top: 30px;
    }
    .verify {
      position: relative;
      .el-input {
        .el-input__inner {
          padding-right: 145px;
        }
      }
      .code-img {
        position: absolute;
        right: 0;
        top: 35px;
        overflow: hidden;
        img {
          float: left;
          height: 30px;
        }
        i {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          float: right;
          font-size: 18px;
          cursor: pointer;
          margin: 0 5px;
          &:before {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .forget {
      margin-top: 30px;
      color: #E6A23B;
      padding-right: 2px;
      text-align: right;
      a {
        color: #E6A23B;
      }
    }
    .el-button {
      width: 100%;
      margin-top: 30px;
    }
  }
</style>
