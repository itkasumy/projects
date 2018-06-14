<template>
  <div id="app">
    <div class="kcHeader">
      <TopBar></TopBar>
    </div>
    <div class="kcBody">
      <!-- <div class="kcSideBar">
        <LeftNav></LeftNav>
      </div> -->
      <el-main><router-view /></el-main>
    </div>
  </div>
</template>

<script>
import TopBar from 'component/TopBar'
import LeftNav from 'component/LeftNav'
export default {
  name: 'App',
  components: {
    TopBar,
    LeftNav
  }
}
</script>

<style lang="stylus" scoped>
#app
  height 100%
  .kcHeader
    height .3125rem
  .kcBody
    display flex
    height calc(100% - .3125rem)
    .kcSideBar
      width .510417rem
      height 100%
      background url("./assets/common/images/leftMenu_bg.png") 0 0 / 100% 100% no-repeat
      transition all .5s
      &.active
        width 1.041667rem
    .el-main
      padding .078125rem .052083rem .052083rem
</style>
