<template>
  <div>
    <!--头部-->
    <common-header/>
    <div class="order__detail__container u-detail-box ">
      <div class="clearfix c-detail-header">
        <h2 class="title">{{$t('order.detail.orderDetail')}}</h2>
        <a href="javascript:;" class="back" @click="goBack">{{$t('common.back')}}<i class="iconfont icon-enter"></i></a>
      </div>
      <div class="order__detail__wrapper">
        <common-loading v-if="loading" />
        <common-no-data type="order" :message="$t('common.noOrder')" v-if="noOrder" />
        <el-row v-if="!loading && !noOrder">
          <el-col :span="12">
            <div class="info__list u-small-box">
              <div class="list__item">
                <div class="title">
                  <h2>{{$t('order.detail.orderInfo')}}</h2>
                </div>
                <el-row>
                  <el-col :span="24">
                    <el-form label-width="80px" class="c-form" label-position="left">
                      <el-form-item :label="$t('order.detail.label.status')">
                        {{status}}
                      </el-form-item>
                      <el-form-item :label="$t('order.detail.label.num')">
                        {{orderInfo.orderId}}
                      </el-form-item>
                      <el-form-item :label="$t('order.detail.label.orderTime')">
                        {{orderInfo.orderTime}}
                      </el-form-item>
                      <el-form-item :label="$t('order.detail.label.type')" v-if="ifPay">
                        {{payType}}
                      </el-form-item>
                      <el-form-item :label="$t('order.detail.label.payTime')" v-if="ifPay">
                        {{orderInfo.paySuccessTime}}
                      </el-form-item>
                    </el-form>
                    <div class="todo--btn">
                      <template v-if="refundStatus===0">
                        <el-button round type="primary" size="mini" v-if="statusCode===0">{{$t('order.list.toPay')}}</el-button>
                        <el-button round size="mini" :loading="cancelLoading" @click="doCancel" v-if="statusCode===0 || statusCode===1">{{$t('order.list.toCancel')}}</el-button>
                        <el-button round size="mini" @click="toRefund" v-if="statusCode===2 || statusCode===3 || statusCode===4">{{$t('order.list.toRefund')}}</el-button>
                        <el-button round size="mini" @click="toDeliveyDetail" v-if="statusCode===3 || statusCode===4">{{$t('order.list.toDeliveyDetail')}}</el-button>
                        <el-button round size="mini" @click="toEvaluate" v-if="statusCode===5 && isComment==0">{{$t('order.list.toEvaluate')}}</el-button>
                        <el-button round size="mini" @click="toEvaluateDetail" v-if="statusCode===5 && isComment==1">{{$t('order.list.toEvaluateDetail')}}</el-button>
                      </template>
                      <template v-else>
                        <el-button round size="mini" @click="toRefundDetail">{{$t('order.list.toRefundDetail')}}</el-button>
                      </template>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="list__item">
                <div class="title">
                  <h2>{{$t('order.detail.deliInfo')}}</h2>
                </div>
                <el-row>
                  <el-col :span="24">
                    <el-form label-width="80px" class="c-form" label-position="left">
                      <el-form-item :label="$t('order.detail.label.add')">
                        {{orderInfo.address}} {{orderInfo.houseNumber}}
                      </el-form-item>
                      <el-form-item :label="$t('order.detail.label.user')">
                        {{orderInfo.name}}
                      </el-form-item>
                      <el-form-item :label="$t('order.detail.label.userName')">
                        {{orderInfo.phone}}
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </div>
              <div class="list__item">
                <div class="title">
                  <h2>{{$t('order.detail.orderCon')}}</h2>
                </div>
                <el-row class="u-mg-bt-20">
                  <el-col :span="10">
                    <router-link :to="link"><img :src="orderInfo.logo"></router-link>
                    <router-link :to="link">
                      <div class="shop__name c-dis-table">
                        <p class="v-middle">{{orderInfo.sellerName}}</p>
                      </div>
                    </router-link>
                  </el-col>
                  <el-col :span="14" class="shop__tel c-dis-table">
                    <p class="v-middle">{{$t('order.detail.label.shopTel')}}: {{orderInfo.sellerPhone}}</p>
                  </el-col>
                </el-row>
                <hr>
                <div class="goods__list__wrapper">
                  <div class="goods__list__header">
                    <el-row>
                      <el-col :span="12">
                        {{$t('order.detail.listHeader.food')}}
                      </el-col>
                      <el-col :span="4">
                        {{$t('order.detail.listHeader.num')}}
                      </el-col>
                      <el-col :span="4">
                        {{$t('order.detail.listHeader.price')}}
                      </el-col>
                      <el-col :span="4">
                        {{$t('order.detail.listHeader.amount')}}
                      </el-col>
                    </el-row>
                  </div>
                  <div class="goods__list__con">
                    <el-row v-for="(item, index) in goodsList" :key="index" :item="item">
                      <el-col :span="12">
                        {{item.goodsName}}
                      </el-col>
                      <el-col :span="4">
                        {{item.num}}
                      </el-col>
                      <el-col :span="4">
                        {{item.presentPrice}}P
                      </el-col>
                      <el-col :span="4">
                        {{item.presentPrice * item.num}}P
                      </el-col>
                    </el-row>
                  </div>
                  <hr>
                  <div class="pay__detail">
                    <h3>{{$t('order.detail.pay')}}:</h3>
                    <span class="money">{{orderInfo.actualPrice}}P</span>
                    <span class="oldmoney">{{orderInfo.totalPrice}}P</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info__step">
              <div class="step__container green">
                <div class="step__wrapper">
                  <div class="icon__wrapper">
                    <i class="iconfont icon-peisongxiangqing_dingdanicon"></i>
                  </div>
                  <div class="step__con clearfix">
                    <div class="arrow">
                      <em></em><span></span>
                    </div>
                    <div class="status u-middle">
                      <span>{{$t('order.detail.step.sub')}}</span>
                      <p>{{orderInfo.orderTime}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="step__container" :class="{green:ifTakeOrder,gray:!ifTakeOrder}">
                <div class="step__wrapper">
                  <div class="icon__wrapper">
                    <i class="iconfont icon-peisongxiangqing_shangjiaicon_xuanzhong1"></i>
                  </div>
                  <div class="step__con clearfix">
                    <div class="arrow">
                      <em></em><span></span>
                    </div>
                    <div class="status u-middle">
                      <span>{{$t('order.detail.step.take')}}</span>
                      <p v-if="ifTakeOrder">{{orderInfo.accessTime}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="step__container" :class="{green:ifDeliverySuccess,gray:!ifDeliverySuccess}">
                <div class="step__wrapper">
                  <div class="icon__wrapper">
                    <i class="iconfont icon-waimaiyiwancheng"></i>
                  </div>
                  <div class="step__con clearfix">
                    <div class="arrow">
                      <em></em><span></span>
                    </div>
                    <div class="status u-middle">
                      <span>{{$t('order.detail.step.complete')}}</span>
                      <p v-if="ifDeliverySuccess">{{orderInfo.deliverySuccessTime}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <common-footer/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
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
    await this.initData();
    if (this.orderInfo.activityStatus >= 3 && this.orderInfo.activityStatus != 6) {
      this.ifTakeOrder = true;
    }
    if (this.orderInfo.activityStatus === 5) {
      this.ifDeliverySuccess = true;
    }
    if (this.orderInfo.paySuccessTime != null) {
      this.ifPay = true;
    }
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
      let url = '/user/order/refund-detail/' + this.orderId;
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
        this.$alert(this.$t('order.list.alert.shopDeli') + ': ' + this.orderInfo.sellerPhone, this.$t('common.notic'), {
          confirmButtonText: this.$t('common.ok'),
          callback: action => {}
        });
      } else {
        let url = '/user/order/delivery-detail/' + this.orderId;
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
    goBack() {
      this.$router.go(-1)
    }
  }
}

</script>
<style scope lang="scss">
.order__detail__container {
  @include container;
  margin-top: 20px;
  background: #fff;
  .order__detail__wrapper {
    button {
      margin-left: 0 !important;
      display: block;
    }
    .el-button+.el-button {
      margin-top: 5px;
    }
    .info__list {
      border: 1px solid $bd-gray;
      margin-right: 40px;
      min-height: 990px;
      .list__item {
        margin-bottom: 60px;
        .el-form-item {
          margin-bottom: 0;
        }
        .title {
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid $bd-gray;
          h2 {
            font-size: 16px;
          }
        }
        img {
          width: 50px;
          height: 50px;
          float: left;
          margin-right: 20px;
        }
        .shop__name {
          font-size: 16px;
          color: $imp-color;
          height: 50px;
          overflow: hidden;
        }
        .shop__tel {
          color: #999;
          height: 50px;
          padding-left: 20px;
          word-break: break-all;
        }
        .goods__list__wrapper {
          margin-top: 40px;
          text-align: center;
          .goods__list__header,
          .goods__list__con {
            .el-col {
              &:first-child {
                text-align: left;
              }
            }
          }
          .goods__list__con {
            margin-top: 20px;
            color: $imp-color;
            .el-col {
              margin-bottom: 20px;
            }
          }
          .pay__detail {
            margin-top: 27px;
            text-align: right;
            h3 {
              font-size: 16px;
              display: inline-block;
            }
            .money {
              color: $color-primary;
              font-size: 24px;
              margin-left: 10px;
            }
            .oldmoney {
              text-decoration: line-through;
              margin-left: 5px;
            }
          }
        }
        .todo--btn {
          position: absolute;
          top: 5px;
          right: 0;
        }
      }
    }
    .info__step {
      margin-left: 40px;
      .step__container {
        border-left: 1px solid $bd-gray;
        height: 330px;
        .step__wrapper {
          top: 50%;
          transform: translateY(-50%);
        }
        &.green {
          .icon__wrapper {
            border: 1px solid $green;
            .iconfont {
              color: $green;
            }
          }
          .step__con {
            .status {
              span {
                color: $green;
              }
            }
          }
        }
        &.black {
          .icon__wrapper {
            border: 1px solid $imp-color;
            .iconfont {
              color: $imp-color;
            }
          }
          .step__con {
            .status {
              span {
                color: $imp-color;
              }
            }
          }
        }
        &.gray {
          .icon__wrapper {
            border: 1px solid $bd-gray;
            .iconfont {
              color: $bd-gray;
            }
          }
          .step__con {
            background: #f5f5f5;
            .status {
              span {
                color: $bd-gray;
              }
              p {
                color: $bd-gray;
              }
            }
            .arrow {
              span {
                border-color: #f5f5f5 transparent transparent;
              }
            }
          }
        }
        .icon__wrapper {
          position: absolute;
          left: -16px;
          background: #fff;
          border-radius: 100%;
          width: 32px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          top: 29px;
        }
        .step__con {
          border: 1px solid $bd-gray;
          border-radius: 4px;
          background: #fff;
          height: 90px;
          padding: 0 30px;
          margin-left: 40px;
          .arrow {
            position: absolute;
            bottom: 52px;
            left: 0;
            transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            /* IE 9 */
            -moz-transform: rotate(90deg);
            /* Firefox */
            -webkit-transform: rotate(90deg);
            /* Safari 和 Chrome */
            -o-transform: rotate(90deg);
            /* Opera */
            em {
              border-color: $bd-gray transparent transparent;
            }
            span {
              border-color: #FFF transparent transparent;
              top: -1px;
            }
          }
          .arrow * {
            display: block;
            border-width: 8px;
            position: absolute;
            border-style: solid dashed dashed dashed;
            font-size: 0;
            line-height: 0;
          }
          .status {
            span {
              display: block;
              margin-bottom: 10px;
            }
            p {
              position: relative;
              font-size: 12px;
              color: #666;
              margin-bottom: 10px;
            }
          }
          .time {
            float: right;
            span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

</style>
