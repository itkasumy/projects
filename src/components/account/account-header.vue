<template>
  <div class="account-header">
    <el-row class="container-header">
      <el-col :span="5" class="logo">
        <router-link to="/"><img :src="logo" alt="logo"></router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import logo from '../../assets/img/pic_logo_nav.png'

  export default {
    name: "account-header",
    data() {
      return {
        logo
      }
    }
  }
</script>

<style lang="scss">
  .account-header {
    background: #fff;
    box-shadow: 2px 2px 8px #f5f5f5;
    .container-header {
      @include container;
      height: 100px;
      box-sizing: border-box;
      overflow: hidden;
    }
    .logo {
      padding: 20px 0;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
