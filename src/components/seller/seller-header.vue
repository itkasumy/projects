<template>
  <div class="seller-header" v-if="sellerInfo" :style="{'background-image': `url(${sellerInfo.logo})`}">
    <div class="top" @click="$goBack">
      <i class="iconfont icon-return"/>
    </div>
    <div class="seller-info">
      <div class="avatar">
        <img :src="sellerInfo.logo">
      </div>
      <div class="info">
        <p class="name">{{sellerInfo.sellerName}}</p>
        <div class="rate">店铺评分：</div>
        <div class="time">营业时间：周一至周日 10点至24点</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "seller-header",
    data() {
      return {}
    },
    computed: {
      ...mapState('seller', ['sellerInfo'])
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .seller-header {
    height: 8rem;
    background-size: 100%;
    background-position: center;
    color: #fff;
    position: relative;
    /*filter: blur(1px);*/
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, 0.9));
      /*filter: blur(10px);*/
      z-index: 1;
    }
    & > * {
      position: relative;
      z-index: 2;
    }
    .top {
      height: 2.2rem;
      line-height: 2.2rem;
      padding: 0 0.5rem;
      i {
        font-size: 22px;
      }
    }
    .seller-info {
      display: flex;
      padding: 0 0.5rem;
      width: 100%;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      bottom: 1rem;
      .avatar {
        flex: 1;
        display: flex;
        /*align-items: flex-start;*/
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
        }
      }
      .info {
        flex: 3;
        min-width: 0;
        box-sizing: border-box;
        padding-left: 0.5rem;
        .name {
          width: 100%;
          font-size: 18px;
          /*font-weight: bold;*/
          /*height: 35px;*/
          /*line-height: 35px;*/
          @include text-over;
        }
        .rate {
          font-size: 11px;
          /*height: 20px;*/
          /*line-height: 20px;*/
          @include text-over;
        }
        .time {
          font-size: 11px;
          /*height: 20px;*/
          /*line-height: 20px;*/
          @include text-over;
        }
      }
    }
  }
</style>
