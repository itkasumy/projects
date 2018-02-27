<template>
  <div class="register">
    <account-header/>
    <div class="container">
      <img src="/loong/static/img/account-inset.png" class="inset">
      <div class="panel" :class="{mask: maskShow}">
        <div class="header">
          <div class="title">注册</div>
          <div class="link">
            <router-link :to="homeUrl">首页</router-link>
            <router-link :to="loginUrl">登录</router-link>
          </div>
        </div>
        <div class="form" @keyup.enter="register">
          <div class="phone">
            <!--区号-->
            <el-select v-model="select" placeholder="请选择区号" filterable>
              <el-option v-for="(item, index) in CountryJson.data" :key="index"
                         :label="'+'+item.phoneCode+' '+item.countryName" :value="item.countryName"/>
            </el-select>
            <!--手机号-->
            <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
          </div>
          <!--验证码-->
          <div class="verify">
            <el-input v-model="verify" placeholder="请输入验证码"></el-input>
            <el-button type="primary" @click="openModel">获取验证码</el-button>
          </div>
          <!--密码-->
          <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
          <!--确认密码-->
          <el-input v-model="confirmPassword" type="password" placeholder="确认密码"></el-input>
          <!--协议-->
          <div class="deal">
            <el-checkbox v-model="checked">同意《用户服务协议》</el-checkbox>
          </div>
          <!--提交-->
          <el-button class="submit" type="primary" @click="register" :loading="submitLoading">注册</el-button>
          <!--弹窗-->
          <send-message ref="sendMessage" :phone="phone" :prePhone="phonePre" @close="closeModel"/>
        </div>
      </div>
    </div>
    <account-footer/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import CountryJson from '../../assets/json/countryChinese'
  import AccountHeader from "../../components/account/account-header"
  import AccountFooter from "../../components/account/account-footer"
  import SendMessage from "../../components/account/send-message"

  export default {
    name: "register",
    components: {AccountHeader, AccountFooter, SendMessage},
    data() {
      return {
        CountryJson,
        homeUrl: '/',
        loginUrl: '/account/login',
        select: null,
        phone: null,
        verify: null,
        password: null,
        confirmPassword: null,
        submitLoading: false,
        maskShow: false,
        checked: false
      }
    },
    computed: {
      phonePre() {
        let phonePre = 0
        let {select, CountryJson} = this
        let list = CountryJson.data
        list.forEach(item => {
          if (item.countryName === select) phonePre = item.phoneCode
        })
        return phonePre
      }
    },
    methods: {
      ...mapActions('user', ['ajaxRegister']),
      openModel() {
        if (!this.phonePre) {
          this.$message.error('请选择区号')
        } else if (!this.phone) {
          this.$message.error('请输入手机号码')
        } else {
          this.$refs.sendMessage.open()
          this.maskShow = true
        }
      },
      closeModel() {
        this.maskShow = false
      },
      async register() {
        let {phonePre, phone, verify, password, confirmPassword, checked} = this
        if (!verify) {
          this.$message.error('请输入验证码')
        } else if (!password) {
          this.$message.error('请输入密码')
        } else if (password !== confirmPassword) {
          this.$message.error('两次密码不一致')
        } else if (!checked) {
          this.$message.error('协议未同意')
        } else {
          this.submitLoading = true
          let token = this.$refs.sendMessage.token
          let res = await this.ajaxRegister({phonePre, phone, verify, token, password, platform: 1})
          this.submitLoading = false
          console.log('注册', res)
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
  .register {
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
        .phone {
          overflow: hidden;
          .el-select {
            margin-top: 30px;
            width: 40%;
            float: left;
            input {
              @include text-over;
            }
          }
          .el-input {
            width: 55%;
            margin-left: 5%;
            float: left;
          }
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
        .deal {
          margin-top: 30px;
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
