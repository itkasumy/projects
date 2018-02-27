<template>
  <div class="rate-list-card">
    <div class="avatar">
      <img :src="item.headIcon" class="img-responsive">
    </div>
    <div class="info">
      <div class="user">
        <span class="name">{{item.nichName}}</span>
        <span class="date">{{item.date}}</span>
      </div>
      <div class="score">
        <span>评分</span>
        <v-score :score="item.orderScore" :disabled="true"/>
      </div>
      <p>{{item.desc}}</p>
      <div class="img-list">
        <div class="img-warp" v-for="(img, index) in imgList" :key="index">
          <img :src="img" class="img-responsive">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "rate-list-card",
    props: ['item'],
    computed: {
      imgList() {
        let imgList = []
        let {commemtPic} = this.item
        if (commemtPic) {
          imgList = commemtPic.split(',')
        }
        return imgList
      }
    }
  }
</script>

<style scoped lang="scss">
  .rate-list-card {
    background: #fff;
    display: flex;
    padding: 1rem 0.5rem;
    @include border-bottom(#f0f0f0);
    .avatar {
      flex: 1;
    }
    .info {
      flex: 7;
      padding-left: 0.5rem;
      font-size: 15px;
      .score {
        font-size: 12px;
        margin-top: 0.3rem;
      }
      .user {
        overflow: hidden;
        .name {
          float: left;
          font-weight: bold;
        }
        .date {
          float: right;
          font-size: 12px;
          color: #ddd;
        }
      }
      p {
        margin-top: 0.3rem;
        font-size: 13px;
      }
      .img-list {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -0.2rem;
        margin-top: 0.3rem;
        .img-warp {
          width: 33.33%;
          padding: 0.2rem;
          box-sizing: border-box;
          img {
            height: 4rem;
          }
        }
      }
    }
  }
</style>
