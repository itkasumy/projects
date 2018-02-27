<template>
  <div class="seller">
    <seller-header :sellerInfo="sellerInfo"/>
    <!--tab切换-->
    <ul class="tab" v-if="sellerInfo">
      <li @click="panel=1" :class="{active: panel===1}"><span>点菜</span></li>
      <li @click="panel=2" :class="{active: panel===2}"><span>评价</span></li>
      <li @click="panel=3" :class="{active: panel===3}"><span>资质</span></li>
    </ul>
    <!--商品-->
    <div class="panel-1" v-if="panel===1 && sellerInfo">
      <ul class="type-list">
        <li v-for="(item, index) in goodsList" :key="index">{{item.name}}</li>
      </ul>
      <ul class="goods-list">
        <li v-for="(item, index) in goodsList" :key="index">
          <div class="title">{{item.name}}</div>
          <div class="inner" v-for="goods in item.inner">
            <div class="goods-img"><img :src="goods.photoPic" class="img-responsive"></div>
            <div class="goods-info">
              <p class="name">{{goods.name}}</p>
              <p class="data">
                <span>月售{{goods.soldNum}}</span>
                <span>赞{{goods.recommendNum}}</span>
              </p>
              <div>
                <span class="price">P{{goods.presentPrice || goods.originalPrice}}</span>
                <v-input-number :goods="goods"/>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!--购物车-->
      <shopping-cart/>
    </div>
    <!--评价-->
    <div class="panel-2" v-if="panel===2">
      <div class="rate-header" v-if="rateList.length > 0">
        <div class="score">4.0</div>
        <div class="data">
          <p>
            <span>评分</span>
            <v-score score="5" :disabled="true"/>
          </p>
          <p>总共1920人评价</p>
        </div>
        <div class="delivery">
          <span>5</span>
          <span>配送服务</span>
        </div>
      </div>
      <rate-list-card v-for="(item, index) in rateList" :key="index" :item="item"/>
      <common-no-data message="暂无评论" v-if="!initLoading && rateList.length === 0"/>
    </div>
    <!--资质-->
    <div v-if="panel===3">
      <seller-licence :licence="licence"/>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
  import SellerHeader from '@/components/seller/seller-header'
  import GoodsList from '@/components/seller/goods-list'
  import ShoppingCart from '@/components/seller/shopping-cart'
  import RateListCard from '@/components/seller/rate-list-card'
  import SellerLicence from '@/components/seller/seller-licence'
  import CommonNoData from "@/components/common/common-no-data";

  export default {
    name: "seller",
    components: {
      CommonNoData, SellerHeader, GoodsList, ShoppingCart, RateListCard, SellerLicence
    },
    data() {
      return {
        initLoading: false,
        panel: 1,
        location: null,
        goodsList: [],
        rateList: [],
        pageSize: 8,
        currentPage: 1,
        licence: null
      }
    },
    computed: {
      ...mapState('seller', ['sellerInfo']),
      sellerId() {
        return this.$route.params.id
      }
    },
    watch: {
      panel() {
        let {panel} = this
        switch (panel) {
          case 1:
            this.getSellerInfo()
            break
          case 2:
            this.getSellerRate()
            break
          case 3:
            this.getSellerQualification()
        }
      }
    },
    mounted() {
      this.location = {
        lat: 30.89440999999999,
        lon: 120.08680900000002,
        areaId: '402881b260683a860160683df8d7000b'
      }
      this.setSeller(null)
      this.clearCart()
      this.getSellerInfo()
      this.getSellerRate()
    },
    methods: {
      ...mapMutations('cart', ['clearCart']),
      ...mapMutations('seller', ['setSeller']),
      ...mapActions('seller', ['ajaxSellerInfo', 'ajaxSellerRate', 'ajaxSellerQualification']),
      // 获取商家信息
      async getSellerInfo() {
        this.initLoading = true
        this.$toast.loading()
        this.goodsList = []
        let {sellerId} = this
        let {lat, lon} = this.location
        let res = await this.ajaxSellerInfo({sellerId, lat, lon})
        console.log('商家信息', res)
        if (res.code === 1) {
          this.setSeller(res.data.seller)
          res.data.goodsList.forEach(item => {
            this.goodsList.push(item)
          })
          this.$toast.close()
        } else {
          this.$toast.error(res.message)
        }
        this.initLoading = false
      },
      // 获取商家评价
      async getSellerRate() {
        this.initLoading = true
        this.$toast.loading()
        this.rateList = []
        let {sellerId, pageSize, currentPage} = this
        let {lat, lon} = this.location
        let res = await this.ajaxSellerRate({sellerId, lat, lon, pageSize, currentPage})
        console.log('商家评价', res)
        if (res.code === 1) {
          res.data.page.content.forEach(item => {
            this.rateList.push(item)
          })
        }
        this.$toast.close()
        this.initLoading = false
      },
      // 获取商家资质
      async getSellerQualification() {
        this.$toast.loading()
        let {sellerId} = this
        let res = await this.ajaxSellerQualification({sellerId})
        console.log('商家资质', res)
        if (res.code === 1) {
          this.licence = res.data
          this.$toast.close()
        } else {
          this.$toast.error(res.message)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .seller {
    ul.tab {
      display: flex;
      background: #fff;
      @include border-bottom(#ddd);
      li {
        flex: 1;
        text-align: center;
        height: 2.2rem;
        line-height: 2.2rem;
        font-size: 14px;
        position: relative;
        z-index: 2;
        &:active {
          background: #ddd;
        }
        &.active {
          color: $primary;
          span {
            display: inline-block;
            height: 42px;
            padding: 0 .5rem;
            border-bottom: 2px solid $primary;
          }
        }
      }
    }
    .panel-1 {
      display: flex;
      min-height: calc(100vh - 8rem - 2.2rem);
      margin-bottom: 2.5rem;
      ul.type-list {
        flex: 1;
        background: #fafafa;
        li {
          height: 2.2rem;
          line-height: 2.2rem;
          text-align: center;
          font-size: 14px;
          &.active {
            background: #fff;
          }
        }
      }
      ul.goods-list {
        flex: 3;
        overflow: hidden;
        background: #fff;
        li:last-child {
          .inner {
            @include clear-border;
          }
        }
        .title {
          font-size: 14px;
          padding-left: 0.5rem;
          height: 1.5rem;
          line-height: 1.5rem;
          /*background: #fafafa;*/
        }
        .inner {
          padding: 0.5rem 0.5rem;
          display: flex;
          @include border-bottom(#ddd);
          .goods-img {
            flex: 2;
          }
          .goods-info {
            flex: 3;
            min-width: 0;
            padding-left: 0.5rem;
            @include text-over;
            .name {
              font-size: 16px;
            }
            .data {
              font-size: 10px;
              padding: 0.2rem 0;
            }
            .price {
              color: #FF3633;
              font-size: 18px;
            }
            .v-input-number {
              float: right;
              font-size: 16px;
            }
          }
        }
      }
    }
    .panel-2 {
      min-height: calc(100vh - 8rem - 2.2rem);
      .rate-header {
        margin-bottom: 0.5rem;
        padding: 1rem 0.5rem;
        background: #fff;
        display: flex;
        .score {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          color: $primary;
        }
        .data {
          flex: 2;
          border-right: 1px dashed #ddd;
          p:first-child {
            overflow: hidden;
            font-size: 14px;
          }
          p:last-child {
            font-size: 14px;
            color: #999999;
          }
        }
        .delivery {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          font-size: 14px;
          color: #999999;
          span {
            text-align: center;
            display: inline-block;
            width: 100%;
            &:first-child {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
</style>
