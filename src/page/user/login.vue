<template>
  <div class="login" @keyup.enter="submit">
    <v-header title="登录" link="注册" link-url="/user/register"/>
    <div class="tab">
      <div @click="loginType=1" :class="{active:loginType===1}"><span>密码登录</span></div>
      <div @click="loginType=2" :class="{active:loginType===2}"><span>短信登录</span></div>
    </div>
    <div class="form-password" v-if="loginType===1">
      <v-input type="tel" placeholder="手机号码" v-model="phone"/>
      <v-input type="password" placeholder="密码" v-model="password"/>
      <verify-input :codeImg="codeImg" :loading="tokenLoading" v-model="verify" @getCodeImg="getCodeImg"/>
    </div>
    <div class="form-message" v-if="loginType===2">
      <phone-input v-model="phone" @click="openModel"/>
      <v-input type="number" placeholder="验证码"/>
    </div>
    <p class="hint">
      提示：未注册平台账号的手机号，无法发送验证码到手机，或通过密码进行登录，请先注册再登录。
    </p>
    <v-button type="primary" @click="submit">登录</v-button>
    <send-message ref="sendModel" :phone="phone"/>
  </div>
</template>

<script>
  import {mapActions, mapMutations} from 'vuex'
  import VerifyInput from '@/components/common/verify-input'
  import PhoneInput from '@/components/common/phone-input'
  import SendMessage from '@/components/common/send-message'

  export default {
    name: "login",
    components: {VerifyInput, PhoneInput, SendMessage},
    data() {
      return {
        loginType: 1,
        phone: null,
        password: null,
        verify: null,
        token: null,
        codeImg: null,
        tokenLoading: false
      }
    },
    mounted() {
      this.getCodeImg()
    },
    methods: {
      ...mapMutations('user', ['setUser']),
      ...mapActions('user', ['ajaxCodeImg', 'ajaxLogin']),
      // 获取图片验证码
      async getCodeImg() {
        if (this.tokenLoading) return
        this.tokenLoading = true
        let {token, codeImg} = await this.ajaxCodeImg()
        this.token = token
        this.codeImg = codeImg
        this.tokenLoading = false
      },
      // 打开模态框
      openModel() {
        this.$refs.sendModel.show()
      },
      // 提交
      submit() {
        if (this.loginType === 1)
          this.loginPassword()
        else
          this.loginMessage()
      },
      // 密码登录
      async loginPassword() {
        let {phone, password, verify, token} = this
        if (!phone || !password || !verify) {
          this.$toast('请填写完整')
          return
        }
        this.$toast.loading()
        password = this.$md5(password)
        let res = await this.ajaxLogin({account: phone, password, verify, token, platform: 1, loginType: 1})
        if (res.code === 1) {
          this.$toast.success(res.message)
          let auth = {headers: {Authorization: res.data.token}}
          localStorage.setItem('auth', JSON.stringify(auth))
          this.setUser(res.data.user)
          this.$router.go(-1)
        } else {
          this.$toast.error(res.message)
          this.getCodeImg()
        }
      },
      // 短信登录
      async loginMessage() {
        this.$toast.error('还未完成')
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    min-height: 100vh;
    background: #f0f0f0;
    .tab {
      display: flex;
      background: #fafafa;
      font-size: 14px;
      margin-bottom: 1.5rem;
      div {
        flex: 1;
        text-align: center;
        height: 2.2rem;
        line-height: 2.2rem;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        span {
          display: inline-block;
          height: 100%;
          padding: 0 0.8rem;
        }
        &.active span {
          display: inline-block;
          color: $primary;
          border-bottom: 2px solid $primary;
        }
      }
    }
    p.hint {
      padding: 0 1rem;
      font-size: 13px;
      margin-top: 1rem;
    }
    .v-button {
      margin-top: 1.5rem;
    }
    .form-message {
      .v-input:last-child:after {
        height: 0;
      }
    }
  }
</style>
