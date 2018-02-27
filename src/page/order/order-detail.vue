<template>
  <div class="order-detail">
    <common-no-data type="order" message="订单不存在" v-if="noOrder && !loading" />
    <v-button @click="goBack" unblock v-if="noOrder && !loading">返回</v-button>
    <template v-if="!loading && !noOrder">
      <div class="top">
        <div class="header">
          <div class="back u-link" @click="goBack"><i class="iconfont icon-return" /></div>
          <div class="title">{{status}}</div>
        </div>
        <div class="head__con">
          <template v-if="refundStatus===0">
            <template v-if="statusCode===0">
              <p class="left__time">剩余支付时间:10:88分</p>
              <p class="desc">逾期未支付，订单会自动取消</p>
            </template>
            <p v-if="statusCode===1" class="com__notic">订单已支付，请耐心等待商家接单</p>
            <p v-if="statusCode===2 || statusCode===3 || statusCode===4" class="com__notic">商家已接单，您的外卖已经在制作和配送中</p>
            <p v-if="statusCode===5" class="com__notic">感谢您的支持，欢迎下次光临</p>
            <p v-if="statusCode===6" class="com__notic">{{orderInfo.refundReason}}</p>
          </template>
          <template v-else>
            <p v-if="refundStatus===1 || refundStatus==2 || refundStatus==3" class="com__notic">您发起了申请退款，等待商家处理</p>
            <p v-if="refundStatus==4" class="com__notic">您的退款已完成，欢迎下次光临</p>
          </template>
          <div class="todo__btn" v-if="refundStatus!=null">
            <template v-if="refundStatus===0">
              <div class="btn u-link" v-if="statusCode===0">{{$t('order.list.toPay')}}</div>
              <div class="btn u-link" v-if="statusCode===0 || statusCode===1">{{$t('order.list.toCancel')}}</div>
              <div class="btn u-link" v-if="statusCode===2 || statusCode===3 || statusCode===4">{{$t('order.list.toRefund')}}</div>
              <div class="btn u-link" @click="toDeliveyDetail" v-if="statusCode===3 || statusCode===4">{{$t('order.list.toDeliveyDetail')}}</div>
              <div class="btn u-link" v-if="statusCode===5 && isComment==0">{{$t('order.list.toEvaluate')}}</div>
              <div class="btn u-link" v-if="statusCode===5 && isComment==1">{{$t('order.list.toEvaluateDetail')}}</div>
            </template>
            <template v-else>
              <div class="btn u-link" @click="toRefundDetail">{{$t('order.list.toRefundDetail')}}</div>
            </template>
          </div>
        </div>
      </div>
      <div class="shop__detail__wrapper">
        <div class="shop__info clearfix u-mid-c--flex" @click="toShop">
          <img :src="orderInfo.logo">
          <div class="shop__name u-link">
            {{orderInfo.sellerName}}
          </div>
          <i class="iconfont icon-enter u-link"></i>
        </div>
        <div class="goods__list__wrapper">
          <div class="list__wrapper clearfix" v-for="(item, index) in goodsList" :key="index" :item="item">
            <img :src="item.goodsPic">
            <div class="goods__info">
              <p class="good__name">{{item.goodsName}}</p>
              <p class="num">x{{item.num}}</p>
              <div class="price">
                {{item.presentPrice * item.num}}P
              </div>
            </div>
          </div>
        </div>
        <div class="price__detail">
          <div class="list__item clearfix">
            <span class="label">配送费</span>
            <span class="price">{{orderInfo.logistics}}P</span>
            <div class="circle left"></div>
            <div class="circle right"></div>
          </div>
          <div class="list__item clearfix">
            <span class="label">优惠金额</span>
            <span class="price u-red">{{orderInfo.discountMoney}}P</span>
            <div class="circle left"></div>
            <div class="circle right"></div>
          </div>
          <div class="list__item clearfix">
            <span class="price act">实付 <i class="u-red">{{orderInfo.actualPrice}}P</i></span>
            <div class="circle left"></div>
            <div class="circle right"></div>
          </div>
        </div>
        <a :href="phone">
          <div class="shop__tel u-link">
            <i class="iconfont icon-dianhuacopy" />商家电话
          </div>
        </a>
      </div>
      <div class="order__deli">
        <div class="c-panel with-mg round">
          <div class="title">
            配送信息
          </div>
          <div class="item">
            <div class="label">
              配送地址
            </div>
            <div class="content">
              {{orderInfo.address}} {{orderInfo.houseNumber}}
            </div>
          </div>
          <div class="item">
            <div class="label">
              备注
            </div>
            <div class="content">
              {{orderInfo.remark || '无'}}
            </div>
          </div>
        </div>
        <div class="c-panel with-mg round">
          <div class="title">
            订单信息
          </div>
          <div class="item">
            <div class="label">
              订单号
            </div>
            <div class="content">
              {{orderInfo.orderId}}
            </div>
          </div>
          <div class="item">
            <div class="label">
              下单时间
            </div>
            <div class="content">
              {{orderInfo.orderTime}}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CommonNoData from '@/components/common/common-no-data'
export default {
  components: { CommonNoData },
  data() {
    return {
      orderInfo: {
        orderTime: null,
        accessTime: null,
        deliverySuccessTime: null,
        activityStatus: null,
        payType: null,
      },
      goodsList: [],
      ifTakeOrder: false,
      ifDeliverySuccess: false,
      ifPay: false,
      cancelLoading: false,
      loading: true,
      noOrder: false
    }
  },
  computed: {
    phone() {
      return 'tel:' + this.orderInfo.sellerPhone;
    },
    link() {
      return '/seller/' + this.orderInfo.sellerId;
    },
    orderId() {
      return this.$route.params.id;
    },
    statusCode() {
      return this.orderInfo.activityStatus;
    },
    refundStatus() {
      return this.orderInfo.isRefund
    },
    status() {
      let status = null;
      if (this.orderInfo.isRefund === 0) {
        switch (this.orderInfo.activityStatus) {
          case 0:
            status = this.$t('order.status.sub')
            break
          case 1:
            status = this.$t('order.status.hasPay')
            break
          case 2:
            status = this.$t('order.status.shopTakeOrder')
            break
          case 3:
            status = this.$t('order.status.deliTakeOrder')
            break
          case 4:
            status = this.$t('order.status.distribution')
            break
          case 5:
            status = this.$t('order.status.disComplete')
            break
          case 6:
            status = this.$t('order.status.hasCancle')
            break
        }
      } else {
        switch (this.orderInfo.isRefund) {
          case 1:
            status = this.$t('order.status.refunding')
            break
          case 2:
            status = this.$t('order.status.refRefuse')
            break
          case 3:
            status = this.$t('order.status.platExam')
            break
          case 4:
            status = this.$t('order.status.refComplete')
            break
        }
      }
      return status;
    },
    payType() {
      let payType = null;
      switch (this.orderInfo.payType) {
        case 0:
          payType = this.$t('order.payType.online')
          break
        case 1:
          payType = this.$t('order.payType.offline')
          break
      }
      return payType;
    },
    isComment() {
      return this.orderInfo.isComment
    },
  },
  async mounted() {
    this.loading = true;
    this.$toast.loading()
    await this.initData();
    this.$toast.close();
    this.loading = false;
  },
  methods: {
    ...mapActions('order', ['ajaxOrderDetail', 'ajaxCancelOrder']),
    async initData() {
      let self = this;
      let orderId = self.orderId;
      let res = await self.ajaxOrderDetail({ orderId: orderId })
      if (self.$checkData(res)) {
        if (res.code === 9004) {
          self.noOrder = true;
          return false;
        }
        self.orderInfo = res.data.orderAndSeller
        res.data.goods.forEach(item => {
          self.goodsList.push(item)
        })
      }
    },
    // 取消订单
    async doCancel() {
      let self = this;
      let orderId = self.orderId;
      if (self.cancelLoading) {
        return false;
      }
      self.cancelLoading = true;
      let res = await self.ajaxCancelOrder({ orderId: orderId })
      if (self.$checkData(res)) {
        self.$message({
          message: this.$t('order.status.orderCancel'),
          type: 'success',
          onClose: function() {
            self.cancelLoading = false;
            self.$router.go(0)
          }
        });
      }
    },
    //查看退款详情
    toRefundDetail() {
      let url = '/order/refund-detail/' + this.orderId;
      this.$router.push(url)
    },
    //查看评价详情
    toEvaluateDetail() {
      let url = '/user/order/evaluate-detail/' + this.orderId;
      this.$router.push(url)
    },
    //去评价
    toEvaluate() {
      let url = '/user/order/evaluate-order/' + this.orderId;
      this.$router.push(url)
    },
    //查看配送详情
    toDeliveyDetail() {
      if (this.orderInfo.deliveryId == null) {
        alert(this.$t('order.list.alert.shopDeli') + ': ' + this.orderInfo.sellerPhone)
      } else {
        let url = '/order/delivery-detail/' + this.orderId;
        this.$router.push(url)
      }
    },
    //申请退款
    toRefund() {
      this.$alert(this.$t('order.list.alert.refund'), this.$t('common.notic'), {
        confirmButtonText: this.$t('order.list.alert.shopTelShow'),
        callback: action => {
          if (action === 'confirm') {
            this.$alert(this.orderInfo.sellerPhone, this.$t('order.list.alert.shopTel'), {
              confirmButtonText: this.$t('common.ok'),
              callback: action => {}
            });
          }
        }
      });
    },
    toShop(){
      this.$router.push(this.link);
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}

</script>
<style scoped lang="scss">
.order-detail {
  .top {
    background-image: linear-gradient(-90deg, #FF644C 3%, #FF3633 99%);
    color: #fff;
    .header {
      background-image: linear-gradient(-90deg, #FF644C 3%, #FF3633 99%);
      height: 2.2rem;
      line-height: 2.2rem;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 1;
      .back {
        position: absolute;
        top: 0;
        left: 0.8rem;
        -webkit-tap-highlight-color: transparent;
        i {
          font-size: 24px;
        }
      }
      .title {
        font-size: 18px;
        text-align: center;
      }
    }
    .head__con {
      padding-top: 3.2rem;
      .left__time {
        text-align: center;
        font-size: 16px;
        margin-bottom: .75rem;
      }
      .desc {
        text-align: center;
        font-size: 13px;
        margin-bottom: 1rem;
      }
      .com__notic {
        text-align: center;
        font-size: 14px;
        margin-bottom: 1.75rem;
      }
      .todo__btn {
        text-align: center;
        min-height: 4.8rem;
        .btn {
          display: inline-block;
          padding: .25rem 1.5rem;
          border: 1px solid #FFFFFF;
          border-radius: 4px;
          margin-bottom: 3.25rem;
          font-size: 14px;
          &:first-child {
            margin-right: 1.5rem;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .shop__detail__wrapper {
    background: #fff;
    margin: 0 .375rem 0 .375rem;
    padding: .75rem .75rem 0 .75rem;
    position: relative;
    top: -2rem;
    border-radius: 8px;
    .shop__info {
      position: relative;
      padding-bottom: .75rem;
      border-bottom: 1px solid $grey-ddd;
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 100%;
        float: left;
        margin-right: .75rem;
      }
      .shop__name {
        float: left;
        font-size: 15px;
        color: $font-important;
        font-weight: 600;
        margin-right: .75rem;
      }
      i {
        position: absolute;
        right: 0;
      }
    }
    .goods__list__wrapper {
      .list__wrapper {
        padding: .75rem 0;
        border-bottom: 1px solid $grey-ddd;
        img {
          float: left;
          width: 2.25rem;
          height: 2.25rem;
          margin-right: .5rem;
        }
        .goods__info {
          position: relative;
          .good__name {
            font-size: 14px;
            color: $font-important;
            margin-bottom: .5rem;
          }
          .num {
            font-size: 14px;
            color: #999999;
          }
          .price {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 14px;
          }
        }
      }
    }
    .price__detail {
      .list__item {
        position: relative;
        padding: .75rem 0;
        border-bottom: 1px dashed $grey-ddd;
        .label {
          float: left;
          font-size: 14px;
          color: $font-important;
        }
        .price {
          float: right;
          font-size: 14px;
          &.act {
            font-size: 13px;
          }
        }
        .circle {
          width: .7rem;
          height: .7rem;
          background: $body-bg;
          border-radius: 100%;
          position: absolute;
          &.left {
            left: -1.1rem;
            bottom: -.35rem;
          }
          &.right {
            right: -1.1rem;
            bottom: -.35rem;
          }
        }
      }
    }
    .shop__tel {
      color: $font-important;
      text-align: center;
      font-size: 14px;
      padding: .85rem 0;
      i {
        font-size: 18px;
        margin-right: .5rem;
      }
    }
  }
  .order__deli {
    position: relative;
    top: -1.5rem;
    .c-panel {
      .content {
        width: 10.5rem;
      }
    }
  }
}

</style>
