<template>
  <div class="login">
    <account-header/>
    <div class="container">
      <img src="/loong/static/img/account-inset.png" class="inset">
      <div class="panel" :class="{mask: maskShow}">
        <div class="header">
          <div class="title">登录</div>
          <div class="link">
            <router-link :to="homeUrl">首页</router-link>
            <router-link :to="registerUrl">注册</router-link>
          </div>
        </div>
        <div class="tab">
          <div :class="{active : activePanel === 1}" @click="activePanel=1">密码登录</div>
          <div :class="{active : activePanel === 2}" @click="activePanel=2">短信登录</div>
        </div>
        <login-password v-show="activePanel === 1"/>
        <login-message @open="openModel" @close="closeModel" v-show="activePanel === 2"/>
      </div>
    </div>
    <account-footer/>
  </div>
</template>

<script>
  import AccountHeader from "../../components/account/account-header";
  import AccountFooter from "../../components/account/account-footer";
  import LoginPassword from "../../components/account/login-password";
  import LoginMessage from "../../components/account/login-message";

  export default {
    name: "login",
    components: {AccountFooter, LoginMessage, LoginPassword, AccountHeader},
    data() {
      return {
        homeUrl: '/',
        registerUrl: '/account/register',
        activePanel: 1,
        maskShow: false
      }
    },
    mounted() {
      localStorage.removeItem('auth')
    },
    methods: {
      openModel() {
        this.maskShow = true
      },
      closeModel() {
        this.maskShow = false
      },
    }
  }
</script>

<style scoped lang="scss">
  .login {
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
      min-height: 510px;
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
      .tab {
        margin-top: 30px;
        overflow: hidden;
        div {
          float: left;
          width: 50%;
          padding: 13px 0;
          border-bottom: 2px solid #ddd;
          text-align: center;
          cursor: pointer;
          &:hover,
          &.active {
            color: $color-primary;
            border-color: $color-primary;
          }
        }
      }
    }
  }
</style>
