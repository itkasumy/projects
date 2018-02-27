<template>
  <div class="seller-list-card" @click="goSeller">
    <div class="avatar">
      <img :src="item.logoPic">
    </div>
    <div class="info">
      <div class="name">{{item.sellerName}}</div>
      <div class="score">
        <span>评分{{item.score || 0}}</span>
        <v-score size="12px" :value="item.score"/>
      </div>
      <p>
        <span>距离您{{item.km}}km</span>
        <span>最近销量{{item.sel || 0}}单</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "seller-list-card",
    props: ['item'],
    data() {
      return {}
    },
    computed: {},
    mounted() {
    },
    methods: {
      goSeller() {
        let id = this.item.id
        this.$router.push(`/seller/${id}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .seller-list-card {
    display: flex;
    padding: 0.8rem 0.5rem;
    background: #fff;
    @include border-bottom(#ddd);
    &:active {
      background: #ddd;
    }
    .avatar {
      width: 20%;
      height: 0;
      padding-bottom: 20%;
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        height: 100%;
        transform: translate(-50%, -50%);
      }
    }
    .info {
      flex: 1;
      box-sizing: border-box;
      margin-left: 0.5rem;
      min-width: 0;
      .name {
        @include text-over;
        font-size: 16px;
        font-weight: bold;
        vertical-align: top;
      }
      .score {
        font-size: 12px;
        margin-top: 0.25rem;
      }
      p {
        font-size: 12px;
        margin-top: 0.25rem;
        span:nth-child(2) {
          margin-left: 0.25rem;
        }
      }
    }
  }
</style>
