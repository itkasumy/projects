<template>
  <div class="pay-info">
    <h2>订单概要</h2>
    <div class="seller-info">
      <img :src="orderInfo.logo">
      <div class="name">{{orderInfo.sellerName}}</div>
      <div class="phone">
        <i class="iconfont icon-zhanghushezhi-shoujiicon1"></i>
        商家电话：{{orderInfo.sellerPhone}}
      </div>
    </div>
    <div class="address-info">
      <p>
        <span>{{orderInfo.name}}</span>
        <span>{{orderInfo.sex | sexTranslate}} {{orderInfo.phone}}</span>
      </p>
      <div class="address">
        <div class="label">配送地址：</div>
        <p>{{orderInfo.address}} {{orderInfo.houseNumber}}</p>
      </div>
    </div>
    <div class="goods">
      <ul class="title-list">
        <li>菜品</li>
        <li>单价</li>
        <li>数量</li>
        <li>小计</li>
      </ul>
      <ul class="goods-list" v-for="(item, index) in goodsList" :key="index">
        <li>{{item.goodsName}}</li>
        <li>P{{item.goodsPrice}}</li>
        <li>{{item.num}}</li>
        <li>P{{item.goodsPrice}}</li>
      </ul>
    </div>
    <ul class="summary">
      <li>
        <div class="title">商品总价：</div>
        <div class="price">P{{parseFloat(orderInfo.logistics).sub(parseFloat(orderInfo.totalPrice))}}</div>
      </li>
      <li>
        <div class="title">优惠：</div>
        <div class="price">-P{{orderInfo.discountMoney}}</div>
      </li>
      <li>
        <div class="title">运费：</div>
        <div class="price">P{{orderInfo.logistics}}</div>
      </li>
      <li>
        <div class="title">应付总额：</div>
        <div class="price">P{{orderInfo.actualPrice}}</div>
      </li>
    </ul>
    <div class="pay-button">
      <el-button type="primary" :loading="payLoading" @click="payOrder">去支付</el-button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "pay-info",
    data() {
      return {
        orderInfo: {
          logo: null,
          sellerName: null,
          sellerPhone: null,
          name: null,
          sex: null,
          phone: null,
          address: null,
          houseNumber: null,
          totalPrice: null,
          discountMoney: null,
          logistics: null,
          actualPrice: null
        },
        goodsList: [],
        payLoading: false
      }
    },
    computed: {
      orderId() {
        return this.$route.params.id
      }
    },
    mounted() {
      this.getOrderDetail()
    },
    methods: {
      ...mapActions('order', ['ajaxOrderDetail']),
      // 获取订单详情
      async getOrderDetail() {
        let {orderId} = this
        let res = await this.ajaxOrderDetail({orderId})
        console.log('订单详情', res)
        if (res.code === 1) {
          this.orderInfo = res.data.orderAndSeller
          res.data.goods.forEach(item => {
            this.goodsList.push(item)
          })
        } else if (res.code === 401) {
          this.$router.push('/account/login')
        } else {
          this.$message.error(res.message)
        }
      },
      // 支付
      async payOrder() {
        this.payLoading = true
        this.$message.error('支付通道等待开通')
        setTimeout(() => {
          this.payLoading = false
        }, 2000)
      }
    }
  }
</script>

<style scoped lang="scss">
  .pay-info {
    width: 350px;
    float: right;
    h2 {
      font-size: 18px;
      color: #333333;
      border-bottom: 1px solid #DDDDDD;
      padding-bottom: 30px;
    }
    @mixin block {
      padding: 20px 0;
      border-bottom: 1px dashed #DDDDDD;
    }
    .seller-info {
      @include block;
      clear: both;
      img {
        float: left;
        width: 70px;
        height: 40px;
      }
      @mixin text {
        height: 20px;
        line-height: 20px;
        margin-left: 80px;
      }
      .name {
        @include text;
        @include text-over;
        font-weight: bold;
        color: #333;
      }
      .phone {
        @include text;
        @include text-over;
        font-size: 12px;
        color: #666;
        i {
          font-size: 12px;
        }
      }
    }
    .address-info {
      @include block;
      p:first-child {
        span:first-child {
          font-weight: bold;
        }
        span:last-child {
          float: right;
          font-size: 12px;
        }
      }
      .address {
        overflow: hidden;
        margin-top: 15px;
        .label {
          float: left;
          width: 20%;
          font-size: 12px;
        }
        p {
          float: left;
          width: 80%;
          font-size: 12px;
        }
      }
    }
    .goods {
      @include block;
      padding-bottom: 0;
      @mixin list {
        overflow: hidden;
        li {
          float: left;
          width: 15%;
          text-align: center;
          margin-bottom: 20px;
          color: #666666;
          &:first-child {
            width: 55%;
            text-align: left;
            @include text-over;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
      ul.title-list {
        @include list;
      }
      ul.goods-list {
        @include list;
        li:last-child {
          color: $color-primary;
        }
      }
    }
    ul.summary {
      @include block;
      padding-bottom: 0;
      border-bottom: none;
      li {
        overflow: hidden;
        margin-bottom: 20px;
        .title {
          float: left;
          text-align: left;
        }
        .price {
          float: right;
          color: $color-primary;
          text-align: right;
        }
        &:last-child {
          padding-top: 30px;
          border-top: 1px solid #EBEBEB;
          .price {
            font-size: 24px;
          }
        }
      }
    }
    .pay-button .el-button {
      width: 100%;
      margin-top: 10px;
    }
  }
</style>
