<template>
  <div class="seller-cart" :style="{bottom: bottom+'px'}">
    <div class="top">
      <span class="title">购物车</span>
      <span class="clear" @click="clearCart"><i class="iconfont icon-shanchuicon1"></i>清空</span>
    </div>
    <div class="list-head" v-if="cart.length > 0">
      <span>菜品</span>
      <span>份数</span>
      <span>单价</span>
    </div>
    <ul class="goods-list">
      <li v-for="(item, index) in cart" :key="index">
        <span class="name">{{item.data.name}}</span>
        <div class="change-num">
          <div class="minus" @click="removeFromCart(item.data)"></div>
          <span>{{item.num}}</span>
          <div class="plus" @click="addToCart(item.data)"></div>
        </div>
        <span class="price">P{{item.price}}</span>
      </li>
      <li v-if="cart.length > 0">
        <div class="name">配送费</div>
        <div class="price">P{{sellerInfo.logistics}}</div>
      </li>
    </ul>
    <div class="bottom">
      <div class="info">
        <i class="iconfont icon-icon_shopping"></i>
        <span v-if="cart.length>0">共P{{presentTotal}}</span>
        <span v-else>购物车为空</span>
      </div>
      <div class="button" @click="toPlace" v-if="presentTotal > sellerInfo.logistics">
        <span>立即下单</span>
      </div>
      <div class="button-under" v-else>
        <span>P{{sellerInfo.limitDeliveryCost}}起送</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    name: "seller-cart",
    data() {
      return {
        bottom: 0
      }
    },
    computed: {
      ...mapState('order', ['cart']),
      ...mapState('seller', ['sellerInfo']),
      ...mapGetters('order', ['presentTotal']),
      sellerId() {
        return this.$route.params.id
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scrollHandler)
    },
    methods: {
      ...mapMutations('order', ['addToCart', 'removeFromCart', 'clearCart']),
      toPlace() {
        let {cart, sellerInfo} = this
        sessionStorage.setItem('cart', JSON.stringify(cart))
        sessionStorage.setItem('sellerInfo', JSON.stringify(sellerInfo))
        this.$router.push(`/order/place`)
      },
      scrollHandler() {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let distance = scrollHeight - clientHeight - scrollTop
        if (distance < 375) {
          this.bottom = 375 - distance
        } else {
          this.bottom = 0
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .seller-cart {
    position: fixed;
    left: 50%;
    transform: translateX(210px);
    z-index: 10;
    width: 380px;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.02);
    overflow: hidden;
    .top {
      background: #FAFAFA;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      .title {
        float: left;
      }
      .clear {
        float: right;
        cursor: pointer;
        i {
          margin-right: 5px;
        }
        &:hover {
          color: $color-primary;
        }
      }
    }
    .list-head {
      width: 380px;
      height: 50px;
      line-height: 50px;
      background: #fff;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      overflow: hidden;
      color: #999;
      span {
        display: inline-block;
        width: 70px;
        float: left;
        text-align: center;
        &:first-child {
          width: 200px;
          text-align: left;
        }
      }
    }
    ul.goods-list {
      background: #fff;
      width: 380px;
      overflow: hidden;
      li {
        overflow: hidden;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        .name {
          float: left;
          width: 200px;
        }
        .change-num {
          float: left;
          width: 70px;
          box-sizing: border-box;
          border-top: 1px solid #E6E6E6;
          border-bottom: 1px solid #E6E6E6;
          height: 22px;
          border-radius: 11px;
          overflow: hidden;
          line-height: 15px;
          margin-top: 14px;
          text-align: center;
          span {
            display: inline-block;
            color: #333;
            height: 20px;
            line-height: 20px;
            text-align: center;
          }
          div {
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
          }
          .minus {
            float: left;
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
            float: right;
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
        .price {
          float: right;
          width: 70px;
          text-align: center;
          color: $color-primary;
        }
      }
    }
    .bottom {
      overflow: hidden;
      .info {
        float: left;
        width: 250px;
        height: 60px;
        line-height: 60px;
        background: #665C5C;
        color: #fff;
        padding-left: 20px;
        font-size: 16px;
        i {
          font-size: 24px;
          margin-right: 20px;
        }
      }
      .button {
        float: left;
        width: 130px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: $color-primary;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        user-select: none;
        cursor: pointer;
      }
      .button-under {
        float: left;
        width: 130px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #807373;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        user-select: none;
      }
    }
  }
</style>
