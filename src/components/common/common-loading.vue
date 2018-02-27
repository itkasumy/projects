<template>
  <div class="loading"><i class="iconfont icon-loading"></i>{{message}}</div>
</template>
<script>
  export default {
    name: 'loading',
    props: ['type'],
    data() {
      return {
        message: null
      }
    },
    mounted() {
      switch (this.type) {
        default:
          this.message = '正在拼命加载中'
      }
    },
  }

</script>
<style scoped lang="scss">
  .loading {
    clear: both;
    padding-top: 20px;
    text-align: center;
    font-size: 16px;
    i {
      margin-right: 5px;
      font-size: 20px;
      display: inline-block;
      @include rotating;
    }
  }

</style>
