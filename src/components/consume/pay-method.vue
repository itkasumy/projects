<template>
  <div class="pay-method">
    <h2>选择支付类型</h2>
    <el-alert title="请在 30:00 内完成支付，超时订单自动取消" type="warning" show-icon></el-alert>
    <div class="balance" :class="{active: payMethod === '1'}">
      <el-radio v-model="payMethod" label="1">使用余额进行支付</el-radio>
      <p>
        使用账户余额进行支付，支付成功后将从账户中扣除相应金额，
        支付不成功则不会扣款。平台自带，简单方便。
      </p>
      <img src="../../assets/icon/pic_loong_balance.png" class="icon">
    </div>
    <div class="credit-card" :class="{active: payMethod === '2'}">
      <el-radio v-model="payMethod" label="2">使用信用卡进行支付</el-radio>
      <p>
        使用信用卡进行支付，支付成功后将从信用卡中扣除相应金额，
        支付不成功则不会扣款。需要用户提供信用卡相关信息。
      </p>
      <div class="icon-list">
        <img src="../../assets/icon/pic_visa_big.png">
        <img src="../../assets/icon/pic_mastercard_big.png">
      </div>
      <ul class="card-list" v-show="payMethod === '2'">
        <li>
          <span>*7745</span>
          <img src="../../assets/icon/pic_visa_big.png">
        </li>
        <li>
          <span>*4532</span>
          <img src="../../assets/icon/pic_mastercard_big.png">
        </li>
        <li>
          <span><i class="iconfont icon-icon_add_big"></i><br>添加新的卡片</span>
        </li>
      </ul>
    </div>
    <div class="third-party" :class="{active: payMethod === '3'}">
      <el-radio v-model="payMethod" label="3">使用第三方机构进行支付</el-radio>
      <p>
        使用第三方进行支付，直接跳转第三方机构进行付款，根据第
        三方给予的信息判断是否成功。
      </p>
      <div class="icon-list">
        <img src="../../assets/icon/pic_WeChat_Pay_small.png">
        <img src="../../assets/icon/pic_alipay_small.png">
        <img src="../../assets/icon/pic_paypal_small.png">
      </div>
      <ul class="card-list" v-show="payMethod === '3'">
        <li><img src="../../assets/icon/pic_WeChat_Pay_big.png"></li>
        <li><img src="../../assets/icon/pic_alipay_big.png"></li>
        <li><img src="../../assets/icon/pic_paypal_big.png"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pay-method",
    props: [],
    components: {},
    data() {
      return {
        payMethod: '2'
      }
    },
    computed: {},
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="scss">
  .pay-method {
    width: 700px;
    float: left;
    h2 {
      font-size: 18px;
      color: #333333;
      border-bottom: 1px solid #DDDDDD;
      padding-bottom: 30px;
    }
    .el-alert {
      margin-top: 20px;
      padding-top: 15px;
      padding-bottom: 15px;
      i.el-icon-close {
        display: none;
      }
    }
    @mixin card {
      background: #FAFAFA;
      border: 1px solid #EBEBEB;
      margin-top: 20px;
      border-radius: 4px;
      padding: 30px 20px;
      position: relative;
      &.active {
        background: #fff;
      }
      .el-radio {
        .el-radio__label {
          font-size: 16px;
          color: #666;
        }
      }
      p {
        width: 336px;
        margin-left: 25px;
        margin-top: 15px;
        color: #999999;
        font-size: 12px;
        line-height: 22px;
      }
    }
    @mixin icon-layout {
      position: absolute;
      top: 30px;
      right: 20px;
      transform: translateY(-30%);
    }
    .balance {
      @include card;
      img.icon {
        @include icon-layout;
      }
    }
    .credit-card {
      @include card;
      .icon-list {
        @include icon-layout;
        overflow: hidden;
        img {
          float: left;
          &:first-child {
            margin-top: #{(24 - 16) / 2}px;
            margin-right: 10px;
          }
        }
      }
      p {
        margin-bottom: 30px;
      }
      ul.card-list {
        padding-top: 20px;
        border-top: 1px solid #EBEBEB;
        overflow: hidden;
        li {
          float: left;
          width: 200px;
          height: 100px;
          border: 1px solid #EBEBEB;
          border-radius: 8px;
          position: relative;
          box-sizing: border-box;
          cursor: pointer;
          @include list-distance(29px);
          span {
            @include layout-center;
            font-size: 24px;
            font-weight: bold;
            color: #666666;
          }
          img {
            position: absolute;
            bottom: 10px;
            right: 10px;
            width: 27px;
            height: 16px;
          }
          &:last-child {
            span {
              color: #999999;
              font-size: 14px;
              font-weight: normal;
              text-align: center;
              i {
                color: #CCCCCC;
                font-size: 30px;
              }
            }
          }
        }
      }
    }
    .third-party {
      @include card;
      .icon-list {
        @include icon-layout;
        overflow: hidden;
        img {
          margin-left: 10px;
        }
      }
      p {
        margin-bottom: 30px;
      }
      ul.card-list {
        padding-top: 20px;
        border-top: 1px solid #EBEBEB;
        overflow: hidden;
        li {
          float: left;
          width: 200px;
          height: 100px;
          border: 1px solid #EBEBEB;
          border-radius: 8px;
          position: relative;
          box-sizing: border-box;
          @include list-distance(29px);
          img {
            @include layout-center;
          }
        }
      }
    }
  }
</style>
