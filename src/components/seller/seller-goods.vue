<template>
  <div class="seller-goods">
    <!--分类-->
    <div class="goods-class">
      <div class="header">
        <router-link :to="item.url" :class="{active : index === 0}" v-for="(item, index) in urlList" :key="index">
          {{item.name}}
        </router-link>
      </div>
      <el-row>
        <el-col :span="4" v-for="(item, index) in goodsList" :key="index" class="class-list">{{item.name}}</el-col>
      </el-row>
      <!--加载中-->
      <common-loading v-if="loading" />
    </div>
    <!--列表-->
    <div class="goods-list">
      <div class="goods-group" v-for="(group, index) in goodsList" :key="index">
        <div class="title">{{group.name}}</div>
        <div class="product-list">
          <div class="product" v-for="item in group.inner" :key="item.id">
            <!--产品头像-->
            <img :src="item.photoPic" class="avatar" @click="showImageSwiper([item.photoPic],0)">
            <div class="content">
              <!--名称-->
              <div class="name">{{item.name}}</div>
              <!--销量, 推荐-->
              <div class="data">
                <span class="sale">商品已售: {{item.soldNum || 0}}</span>
                <span class="recommend">用户推荐: {{item.recommendNum || 0}}</span>
              </div>
              <!--限购-->
              <div class="limit">
                <span v-show="item.limitNum">限{{item.limitNum}}件优惠</span>
                <span v-show="item.maxNum">限购{{item.maxNum}}件</span>
              </div>
              <!--价格-->
              <p class="price">
                <span class="present-Price">P{{item.presentPrice || item.originalPrice}}</span>
                <span class="origin-price" v-if="item.presentPrice">${{item.originalPrice}}</span>
              </p>
              <!--数量操作-->
              <div class="change-num">
                <div class="minus" @click="removeFromCart(item)"></div>
                <span>{{getNumInCart(item.id)}}</span>
                <div class="plus" @click="addToCart(item)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: "seller-goods",
  props: ['goodsList', 'loading'],
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters('order', ['getNumInCart']),
    sellerId() {
      return this.$route.params.id
    },
    urlList() {
      let arr = []
      let { sellerId } = this
      arr[0] = { url: `/seller/${sellerId}`, name: '所有商品' }
      arr[1] = { url: `/seller/rate/${sellerId}`, name: '商家评论' }
      arr[2] = { url: `/seller/info/${sellerId}`, name: '商家资质' }
      return arr
    }
  },
  mounted() {
    // console.log(this.getNumInCart(this.goodsList[0].id))
  },
  methods: {
    ...mapMutations('order', ['clearCart', 'addToCart', 'removeFromCart']),
    showImageSwiper(imgList, index) {
      this.$imgView({
        list: imgList,
        index: index
      });
    },
  }
}

</script>
<style scoped lang="scss">
.seller-goods {
  width: 780px;
  .goods-class {
    margin-top: 20px;
    width: 780px;
    background: #fff;
    .header {
      height: 50px;
      border-bottom: 1px solid #ddd;
      a {
        display: inline-block;
        height: 48px;
        line-height: 48px;
        padding: 0 20px;
        margin: 0 20px;
        &.active,
        &:hover {
          color: $color-primary;
          border-bottom: 2px solid $color-primary;
        }
      }
    }
    .class-list {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        color: $color-primary;
      }
    }
  }
  .goods-list {
    width: 780px;
    .goods-group {
      margin-top: 20px;
      background: #fff;
      overflow: hidden;
      .title {
        color: #666666;
        border-bottom: 1px solid #ddd;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        font-weight: bold;
      }
    }
    .product-list {
      padding-bottom: 20px;
      overflow: hidden;
    }
    .product {
      float: left;
      width: 360px;
      height: 130px;
      margin-top: 20px;
      margin-left: 20px;
      overflow: hidden;
      background: #FCFCFC;
      border: 1px solid #ddd;
      .avatar {
        width: 130px;
        height: 130px;
        display: block;
        float: left;
        cursor: zoom-in;
      }
      .content {
        float: left;
        position: relative;
        width: 228px;
        height: 130px;
        padding-left: 20px;
        padding-top: 15px;
        box-sizing: border-box;
        .name {
          @include text-over;
          font-weight: bold;
        }
        .data {
          font-size: 12px;
          color: #666666;
          margin-top: 10px;
          .sale {}
          .recommend {}
        }
        .limit {
          font-size: 12px;
          color: #666666;
          margin-top: 10px;
          overflow: hidden;
        }
        .price {
          @include text-over;
          width: 110px;
          position: absolute;
          top: 95px;
          .present-Price {
            font-size: 16px;
            color: #fc2425;
            font-weight: bold;
          }
          .origin-price {
            font-size: 14px;
            color: #999999;
            margin-left: 8px;
            position: relative;
            &:before {
              content: '';
              position: absolute;
              top: 50%;
              left: 0;
              width: 100%;
              height: 1px;
              background: #999999;
            }
          }
        }
        .change-num {
          position: absolute;
          top: 95px;
          right: 20px;
          box-sizing: border-box;
          border-top: 1px solid #E6E6E6;
          border-bottom: 1px solid #E6E6E6;
          height: 22px;
          border-radius: 11px;
          span {
            float: left;
            display: inline-block;
            color: #333;
            height: 20px;
            line-height: 20px;
            padding: 0 6px;
          }
          div {
            float: left;
            width: 20px;
            height: 20px;
            text-align: center;
            box-sizing: border-box;
            cursor: pointer;
            background: #fff;
            user-select: none;
            border-radius: 50%;
            color: #333;
            border: 1px solid #E6E6E6;
            font-size: 13px;
            font-weight: bold;
            /*&:hover {*/
            /*background: #999999;*/
            /*}*/
          }
          .minus {
            position: relative;
            &:before {
              content: '';
              position: absolute;
              top: 8px;
              left: 5px;
              width: 8px;
              height: 2px;
              background: #666;
              border-radius: 4px;
            }
          }
          .plus {
            position: relative;
            &:before {
              content: '';
              position: absolute;
              top: 8px;
              left: 5px;
              width: 8px;
              height: 2px;
              background: #666;
              border-radius: 4px;
            }
            &:after {
              content: '';
              position: absolute;
              top: 5px;
              left: 8px;
              width: 2px;
              height: 8px;
              background: #666;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
}

</style>
