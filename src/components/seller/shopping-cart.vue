<template>
  <!--购物车-->
  <div class="shopping-cart" :class="{mask: listVisible}" @click="listVisible=!listVisible">
    <!--底部-->
    <div class="fixed-bottom">
      <div class="info">
        <div class="cart" @click.stop="listVisible=!listVisible">
          <i class="iconfont icon-cart"/>
          <span class="count">{{totalNum}}</span>
        </div>
        <p class="price" v-if="totalNum > 0">共 P{{allPrice}}</p>
        <p class="empty" v-else>
          <span>购物车为空</span>
          <span>另需配送费{{logistics}}</span>
        </p>
      </div>
      <div class="place-button" v-if="totalPrice >= limitDeliveryCost " @click.stop="goPlaceOrder">
        <span>立即下单</span>
      </div>
      <div class="limit-button" v-else @click.stop>
        <span>P{{limitDeliveryCost}}起送</span>
      </div>
    </div>
    <!--商品列表-->
    <div class="goods-list" v-show="listVisible" @click.stop>
      <div class="header">
        <span class="title">购物车</span>
        <span class="crash" @click="clearCart"><i class="iconfont icon-delete"/>清空</span>
      </div>
      <div class="list-title">
        <span>菜品</span>
        <span>份数</span>
        <span>单价</span>
      </div>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          <div>{{item.data.name}}</div>
          <v-input-number :goods="item.data"/>
          <div class="price">P{{item.price}}</div>
        </li>
      </ul>
      <div class="list-bottom">
        <span>配送费(不计入起送价)</span>
        <span>P{{logistics}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapState} from 'vuex'

  export default {
    name: "shopping-cart",
    data() {
      return {
        goodsList: [1, 2, 3, 4],
        listVisible: false
      }
    },
    computed: {
      ...mapState('cart', ['cart']),
      ...mapGetters('cart', ['totalNum', 'totalPrice']),
      ...mapGetters('seller', ['logistics', 'limitDeliveryCost']),
      allPrice() {
        return this.$math.plus(this.totalPrice, parseFloat(this.logistics))
      }
    },
    mounted() {
    },
    methods: {
      ...mapMutations('cart', ['clearCart']),
      goPlaceOrder() {
        this.$router.push('/place-order')
      }
    }
  }
</script>

<style scoped lang="scss">
  .shopping-cart {
    &.mask {
      @include mask;
    }
    .fixed-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      background: #665C5C;
      display: flex;
      z-index: 102;
      .info {
        flex: 2;
        min-width: 0;
        position: relative;
        .cart {
          color: #fff;
          background-image: linear-gradient(to bottom, #FF9175, #FF644D);
          width: 2.8rem;
          height: 2.8rem;
          line-height: 2.8rem;
          text-align: center;
          border-radius: 50%;
          position: absolute;
          left: 1rem;
          bottom: 0.5rem;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
          &:active {
            background: $primary-level-2;
          }
          i {
            font-size: 26px;
          }
          .count {
            position: absolute;
            right: -0.2rem;
            top: 0;
            width: 1rem;
            height: 1rem;
            line-height: 1rem;
            background: #FF3633;
            font-size: 10px;
            border-radius: 50%;
            border: 1px solid #FEC1B9;
          }
        }
        p.price {
          color: #fff;
          padding-left: 4.8rem;
          padding-right: 1rem;
          font-size: 16px;
          @include text-over;
        }
        p.empty {
          padding: .25rem 1rem .25rem 4.8rem;
          span {
            display: block;
            color: #fff;
            &:first-child {
              font-size: 16px;
              height: 1.2rem;
              line-height: 1.2rem;
            }
            &:last-child {
              font-size: 12px;
              height: 0.8rem;
              line-height: 0.8rem;
            }
          }
        }
      }
      .place-button {
        flex: 1;
        background: $primary;
        text-align: center;
        color: #fff;
        font-size: 16px;
        &:active {
          background: $primary-level-2;
        }
      }
      .limit-button {
        flex: 1;
        background: #807373;
        text-align: center;
        color: #fff;
        font-size: 16px;
      }
    }
    .goods-list {
      position: fixed;
      left: 0;
      width: 100%;
      bottom: 2.5rem;
      z-index: 101;
      background: #fff;
      font-size: 14px;
      padding-bottom: .6rem;
      .header {
        padding: 0 1rem;
        overflow: hidden;
        height: 2rem;
        line-height: 2rem;
        @include border-bottom(#ddd);
        span.title {
          float: left;
        }
        span.crash {
          float: right;
          i {
            font-size: 14px;
            margin-right: 0.3rem;
          }
          &:active {
            opacity: .5;
          }
        }
      }
      .list-title {
        display: flex;
        padding: 0 1rem;
        height: 2rem;
        line-height: 2rem;
        color: #999;
        @include border-bottom(#ddd);
        span {
          flex: 1;
          &:first-child {
            text-align: left;
          }
          &:nth-child(2) {
            text-align: center;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
      ul {
        li {
          padding: 0 1rem;
          height: 2rem;
          line-height: 2rem;
          @include border-bottom(#ddd);
          display: flex;
          div {
            flex: 1;
            &.price {
              text-align: right;
            }
          }
          .v-input-number {
            margin: 0.4rem 0;
            background: #F0F0F0;
            border-radius: 0.6rem;
          }
        }
      }
      .list-bottom {
        padding: 0 1rem;
        display: flex;
        height: 2rem;
        line-height: 2rem;
        span:first-child {
          flex: 1;
          text-align: left;
        }
        span:last-child {
          flex: 1;
          text-align: right;
        }
      }
    }
  }
</style>
