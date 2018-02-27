<template>
  <div class="common-header">
    <el-row class="container">
      <el-col :span="5" class="logo">
        <router-link to="/place"><img :src="logo" alt="logo"></router-link>
      </el-col>
      <el-col :span="6" class="search">
        <div @keyup.enter="search">
          <el-input placeholder="搜索商品、商店" suffix-icon="el-icon-search" v-model="keyword"></el-input>
        </div>
      </el-col>
      <el-col :span="10" class="list">
        <div class="list-content">
          <router-link to="/place">首页
            <!--<span>|</span>-->
          </router-link>
          <!--未登录-->
          <div v-if="!isLogin">
            <router-link to="/account/login">登录</router-link>
            <router-link to="/account/register">注册</router-link>
          </div>
          <!--已登录-->
          <div class="user" v-if="isLogin">
            <el-dropdown>
              <div class="el-dropdown-link">
                <img :src="userInfo.headIcon || defaultAvatar" class="avatar"> {{userInfo.nichName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/user/my-account">
                  <el-dropdown-item>
                    个人中心
                  </el-dropdown-item>
                </router-link>
                <router-link to="/user/my-order/all">
                  <el-dropdown-item>
                    我的订单
                  </el-dropdown-item>
                </router-link>
                <router-link to="/user/my-address">
                  <el-dropdown-item>
                    我的地址
                  </el-dropdown-item>
                </router-link>
                <router-link to="/account/login">
                  <el-dropdown-item>
                    退出登录
                  </el-dropdown-item>
                </router-link>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!---->
          <el-dropdown>
            <div class="el-dropdown-link">
              中文<i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>英文</el-dropdown-item>
              <el-dropdown-item>韩文</el-dropdown-item>
              <el-dropdown-item>日文</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="location">
          <img src="../../assets/icon/icon_locate.png">
          <div class="name">{{cityName}}</div>
          <router-link to="/">切换地址</router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import logo from '../../assets/img/pic_logo_nav.png'
import defaultAvatar from '../../assets/img/avatar-male.svg'

export default {
  name: "common-header",
  data() {
    return {
      logo,
      defaultAvatar,
      isLogin: false,
      cityName: 'xxx',
      keyword: null,
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
  mounted() {
    let auth = localStorage.getItem('auth')
    if (!auth) {
      this.isLogin = false
    } else {
      this.isLogin = this.userInfo.id !== null
      if (!this.isLogin) this.getUserInfo()
    }
    let location = localStorage.getItem('location')
    if (location) {
      this.cityName = JSON.parse(location).cityName
    }
    if (this.$route.path === '/search') {
      let keyword = sessionStorage.getItem('keyword')
      if (keyword) {
        this.keyword = keyword
      }
    }
  },
  methods: {
    ...mapActions('user', ['ajaxUserInfo']),
    async getUserInfo() {
      let res = await this.ajaxUserInfo()
      this.isLogin = res.code === 1;
    },
    search() {
      if (!this.keyword) return
      sessionStorage.setItem('keyword', this.keyword)
      if (this.$route.path !== '/search') {
        this.$router.push('/search')
      } else {
        this.$emit('search')
      }
    }
  }
}

</script>
<style scoped lang="scss">
.common-header {
  background: #fff;
  .container {
    @include container;
    height: 100px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .logo {
    padding: 20px 0;
  }
  .search {
    padding: 30px 0;
  }
  .list {
    overflow: hidden;
    .list-content {
      float: right;
    }
    div {
      display: inline-block;
      /*padding-left: 20px;*/
      &.user {
        position: relative;
        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          float: left;
          margin-top: -5px;
          margin-right: 10px;
        }
      }
    }
    a {
      display: inline-block;
      height: 100px;
      line-height: 100px;
      margin: 0 20px;
      font-size: 14px;
      box-sizing: border-box;
      &.active {
        border-bottom: 2px solid $text-black;
      }
      &:first-child {
        padding-right: 15px;
      }
    }
    .el-dropdown {
      padding: 0 20px;
      cursor: pointer;
    }
  }
  .location {
    float: right;
    background: #332E2E;
    color: #fff;
    width: 130px;
    height: 100px;
    box-sizing: border-box;
    position: relative;
    img {
      position: absolute;
      top: 20px;
      left: 57px;
    }
    .name {
      position: absolute;
      top: 44px;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 16px;
    }
    a {
      position: absolute;
      top: 69px;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 10px;
      &:hover {
        color: #c3c3c3;
      }
    }
  }
}

</style>
