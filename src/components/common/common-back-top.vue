<template>
  <div class="common-back-top" :style="{bottom: bottom+'px'}">
    <div class="button" @click="backTop" v-show="visible">
      <i class="iconfont icon-Upward"></i><br>
      <span>返回顶部</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "common-back-top",
    data() {
      return {
        visible: false,
        bottom: 76
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scrollHandle)
    },
    methods: {
      backTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      scrollHandle() {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let distance = scrollHeight - clientHeight - scrollTop
        this.visible = scrollTop >= 400;
        if (distance < 300) {
          this.bottom = 376 - distance
        } else {
          this.bottom = 76
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .common-back-top {
    position: fixed;
    left: 50%;
    margin-left: 600px;
    .button {
      width: 110px;
      height: 100px;
      background: #FAFAFA;
      border: 1px solid #DDDDDD;
      cursor: pointer;
      text-align: center;
      padding-top: 20px;
      i {
        font-size: 36px;
      }
      &:hover {
        background: #f5f5f5;
      }
    }
  }
</style>
