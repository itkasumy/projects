<template>
  <div class="refund-detail">
    <v-header title="退款详情" class="u-fixed-header"></v-header>
    <common-no-data type="order" message="订单不存在" v-if="noOrder && !loading" />
    <v-button @click="goBack" unblock v-if="noOrder && !loading">返回</v-button>
    <div class="u-main-content fixed" v-if="!loading && !noOrder">
      <div class="c-panel">
        <div class="item">
          <div class="label">
            退款金额
          </div>
          <div class="content u-red">
            {{refundDetail.actualPrice}}P
          </div>
        </div>
        <div class="item">
          <div class="label">
            退款方式
          </div>
          <div class="content">
            账户余额
          </div>
        </div>
        <div class="item">
          <div class="label">
            退款状态
          </div>
          <div class="content">
            {{status}}
          </div>
        </div>
      </div>
      <div class="c-panel">
        <div class="title">
          退款流程
          <div class="help u-red u-link">
            <i class="iconfont icon-wenhao" />
            <span>帮助</span>
          </div>
        </div>
        <div class="step__wrapper">
          <div class="step__item red">
            <div class="step__name">
              商家同意退款
              <div class="circle">
                <span></span>
              </div>
            </div>
            <p class="step__des">
              商家已经发起了取消订单并退款的请求
            </p>
            <p class="step__time">
              {{refundDetail.cancelTime}}
            </p>
          </div>
          <div class="step__item" :class="{'red':refundStatus==3 || refundStatus==4}">
            <div class="step__name">
              平台审核中
              <div class="circle">
                <span></span>
              </div>
            </div>
            <p class="step__des">
              平台审核中，请耐心等待
            </p>
            <p class="step__time" v-if="refundDetail.platformVerifyTime!=null">
              {{refundDetail.platformVerifyTime}}
            </p>
          </div>
          <div class="step__item" :class="{'red':refundStatus==4}">
            <div class="step__name">
              退款完成
              <div class="circle">
                <span></span>
              </div>
            </div>
            <p class="step__des">
              退款处理将在1日完成账户完成后的一天，{{refundDetail.actualPrice}}P 退款到您的账户余额中
            </p>
            <p class="step__time" v-if="refundDetail.refundFinishTime!=null">
              {{refundDetail.refundFinishTime}}
            </p>
          </div>
        </div>
      </div>
      <div class="c-panel">
        <div class="item">
          <div class="label">
            订单编号
          </div>
          <div class="content">
            {{refundDetail.orderId}}
          </div>
        </div>
        <div class="item">
          <div class="label">
            订单总额
          </div>
          <div class="content">
            {{refundDetail.totalPrice}}P
          </div>
        </div>
        <div class="item">
          <div class="label">
            优惠金额(优惠金额不会返还)
          </div>
          <div class="content">
            {{refundDetail.discountMoney}}P
          </div>
        </div>
        <div class="item">
          <div class="label">
            实付金额
          </div>
          <div class="content">
            {{refundDetail.actualPrice}}P
          </div>
        </div>
      </div>
    </div>
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
        cancelTime: null,
        refundFinishTime: null
      },
      refundDetail: {},
      loading: true,
      noOrder: false
    }
  },
  computed: {
    link() {
      return '/seller/' + this.orderInfo.sellerId;
    },
    orderId() {
      return this.$route.params.id;
    },
    refundStatus() {
      return this.orderInfo.isRefund
    },
    status() {
      let status = null;
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
      return status;
    },
  },
  async mounted() {
    this.loading = true;
    this.$toast.loading();
    await this.initData();
    this.$toast.close();
    this.loading = false;
  },
  methods: {
    ...mapActions('order', ['ajaxRefundDetail', 'ajaxOrderDetail']),
    async initData() {
      let self = this;
      let orderId = this.orderId;
      let res = await this.ajaxRefundDetail({ orderId: orderId })
      let orderRes = await this.ajaxOrderDetail({ orderId: orderId })
      console.log(orderRes);
      if (self.$checkData(res)) {
        if (res.code === 9004) {
          self.noOrder = true;
          return false;
        }
        if (self.$checkData(orderRes)) {
          self.refundDetail = res.data
          self.orderInfo = orderRes.data.orderAndSeller
        }
      }
    },
    toOrderDetail() {
      this.$router.push('/user/order/order-detail/' + this.orderId)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}

</script>
<style scoped lang="scss">
.refund-detail {
  .u-main-content {
    .c-panel {
      .title {
        .help {
          float: right;
          font-size: 14px;
          i {
            margin-right: .25rem;
          }
        }
      }
      .step__wrapper {
        margin-left: .5rem;
        .step__item {
          position: relative;
          font-size: 14px;
          padding: 0 0 .75rem 1rem;
          border-left: 1px solid $grey-ddd;
          color: #ccc;
          &:last-child {
            border-left: 0;
          }
          .step__name {
            margin-bottom: .5rem;
            .circle {
              width: 1rem;
              height: 1rem;
              border-radius: 100%;
              background: #ccc;
              text-align: center;
              line-height: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              left: -.5rem;
              top: 0;
              span {
                display: block;
                width: .7rem;
                height: .7rem;
                border-radius: 100%;
                background: #999;
              }
            }
          }
          p {
            margin-bottom: .5rem;
            &:last-child {
              margin-bottom: 0;
            }
          }
          &.red {
            .step__name {
              color: $primary;
              .circle {
                background: #FFBDB3;
                span {
                  background: $primary;
                }
              }
            }
            p {
              color: #666;
            }
          }
        }
      }
    }
  }
}

</style>
