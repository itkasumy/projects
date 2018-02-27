<template>
  <div class="collection bg-white">
    <v-header title="我的收藏店铺" class="u-fixed-header"/>
    <div class="u-main-content fixed">
      <common-no-data type="shop" message="您还没有收藏的店铺" v-if="collectionList.length === 0 && !loading"/>
      <v-button unblock v-if="collectionList.length === 0 && !loading" @click="toUrl('/home')">去看看吧</v-button>
      <div class="list__wrapper u-link-bg" v-for="(item, index) in collectionList" :key="index" :item="item" @click="toUrl(item.link)">
        <img :src="item.logo">
        <div class="shop__info">
          <div class="shop__name">{{item.sellerName}}</div>
          <div class="shop__score">
            <v-score v-model="item.score" disabled/><span>评分 {{item.score}}</span>
          </div>
          <div class="shop__seller">距离您{{item.km}}km  &nbsp;|&nbsp;  最近销量{{item.sel || 0}}单</div>
        </div>
        <i class="iconfont icon-enter"></i>
      </div>

    </div>
  </div>
</template>
<script>
  import CommonNoData from '@/components/common/common-no-data'
  import { mapActions } from 'vuex'
  export default {
    name: "collection",
    props: [],
    components: {CommonNoData},
    data() {
      return {
        pos:null,
        pageSize: 10,
        currentPage: 1,
        totalPage: 0,
        collectionList:[],
        loading:true
      }
    },
    computed: {},
    mounted() {
      this.initData();
    },
    methods: {
      ...mapActions('user', ['ajaxCollectList']),
      async initData() {
        let self = this;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            };
            self.pos = pos;
            self.getCollectionList();
          }, function() {});
        } else {
          self.$toast.error('定位出错，请刷新页面重试！');
        }
      },
      async getCollectionList() {
        let self = this;
        let { pageSize, currentPage } = self;
        self.collectionList = [];
        self.loading = true;
        self.$toast.loading();
        let res = await self.ajaxCollectList({ pageSize, currentPage, lat: self.pos.lat, lon: self.pos.lon });
        self.$toast.close();
        self.loading = false;
        if (self.$checkData(res)) {
          self.totalPage = res.data.totalPages * 10;
          res.data.content.forEach(item => {
            item.score = parseInt(item.score);
            item.link = '/seller/' + item.id;
            self.collectionList.push(item)
          })
        }
      },
      toUrl(url){
        this.$router.push(url);
      }
    }
  }
</script>

<style scoped lang="scss">
  .collection {
    .list__wrapper {
      padding: .75rem;
      position: relative;
      border-bottom: 1px solid $grey-ddd;
      img {
        width: 5.2rem;
        height: 3.7rem;
        float: left;
        margin-right: .75rem;
        border:1px solid $grey-ddd;
      }
      .shop__info {
        overflow: hidden;
        padding-right: 1rem;
        .shop__name {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: .5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .shop__score{
          margin-bottom: .5rem;
          font-size: 13px;
          span{
            color: $font-primary;
          }
        }
        .shop__seller{
          font-size: 13px;
          color: $font-primary;
        }
      }
      .icon-enter{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: .75rem;
      }
    }
  }
</style>
