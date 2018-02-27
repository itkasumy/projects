<template>
  <div class="order__list__wrapper">
    <el-row>
      <el-col :span="12">
        <router-link :to="link"><img :src="item.logo" class="orderImg"></router-link>
        <div class="info">
          <router-link :to="link">
            <h3 class="name">{{item.sellerName}}</h3></router-link>
          <p>{{goodsNames}}</p>
          <p>{{$t('order.list.orderId')}}：{{item.orderId}}</p>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="u-middle u-align-c">{{item.orderGoodsList.length}}</div>
      </el-col>
      <el-col :span="3">
        <div class="u-middle u-align-c">{{item.actualPrice}}P</div>
      </el-col>
      <el-col :span="3">
        <div class="u-middle u-align-c">
          <span class="order__status">{{statusMsg}}</span>
          <a href="javascript:;" @click="toDetail">{{$t('order.list.orderDetail')}}</a>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="u-middle u-align-c">
          <template v-if="parseInt(type)===1">
            <template v-if="refundStatus===0">
              <el-button round type="danger" size="mini" v-if="status===0">{{$t('order.list.toPay')}}</el-button>
              <el-button round size="mini" :loading="cancelLoading" @click="doCancel" v-if="status===0 || status===1">{{$t('order.list.toCancel')}}</el-button>
              <el-button round size="mini" @click="toRefund" v-if="status===2 || status===3 || status===4">{{$t('order.list.toRefund')}}</el-button>
              <el-button round size="mini" @click="toDeliveyDetail" v-if="status===3 || status===4">{{$t('order.list.toDeliveyDetail')}}</el-button>
              <el-button round size="mini" @click="toEvaluate" v-if="status===5 && isComment==0">{{$t('order.list.toEvaluate')}}</el-button>
              <el-button round size="mini" @click="toEvaluateDetail" v-if="status===5 && isComment==1">{{$t('order.list.toEvaluateDetail')}}</el-button>
            </template>
            <template v-else>
              <el-button round size="mini" @click="toRefundDetail">{{$t('order.list.toRefundDetail')}}</el-button>
            </template>
          </template>
          <template v-if="parseInt(type)===2">
            <el-button round size="mini" @click="toEvaluate">{{$t('order.list.toEvaluate')}}</el-button>
          </template>
          <template v-if="parseInt(type)===3">
            <el-button round size="mini" @click="toRefundDetail">{{$t('order.list.toRefundDetail')}}</el-button>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['item', 'type'],
  data() {
    return {
      cancelLoading: false
    }
  },
  computed: {
    goodsNames() {
      let names = '';
      for (let i = 0; i < this.item.orderGoodsList.length; i++) {
        if (i == this.item.orderGoodsList.length - 1) {
          names = names + this.item.orderGoodsList[i].goodsName;
        } else {
          names = names + this.item.orderGoodsList[i].goodsName + ',';
        }
      }
      return names;
    },
    status() {
      return this.item.activityStatus
    },
    refundStatus() {
      return this.item.isRefund
    },
    isComment() {
      return this.item.isComment
    },
    link() {
      return '/seller/' + this.item.sellerId;
    },
    statusMsg() {
      let message = null
      if (this.refundStatus === 0) {
        switch (this.status) {
          case 0:
            message = this.$t('order.status.sub')
            break
          case 1:
            message = this.$t('order.status.hasPay')
            break
          case 2:
            message = this.$t('order.status.shopTakeOrder')
            break
          case 3:
            message = this.$t('order.status.deliTakeOrder')
            break
          case 4:
            message = this.$t('order.status.distribution')
            break
          case 5:
            message = this.$t('order.status.disComplete')
            break
          case 6:
            message = this.$t('order.status.hasCancle')
            break
        }
      } else {
        switch (this.refundStatus) {
          case 1:
            message = this.$t('order.status.refunding')
            break
          case 2:
            message = this.$t('order.status.refRefuse')
            break
          case 3:
            message = this.$t('order.status.platExam')
            break
          case 4:
            message = this.$t('order.status.refComplete')
            break
        }
      }
      return message
    }
  },
  methods: {
    ...mapActions('order', ['ajaxDeleteOrder', 'ajaxCancelOrder', 'ajaxCancelOrder']),
    // 付款
    toPay() {

    },
    // 查看详情
    toDetail() {
      let url = '/user/order/order-detail/' + this.item.orderId;
      this.$router.push(url)
    },
    // 查看退款详情
    toRefundDetail() {
      let url = '/user/order/refund-detail/' + this.item.orderId;
      this.$router.push(url)
    },
    //去评价
    toEvaluate() {
      let url = '/user/order/evaluate-order/' + this.item.orderId;
      this.$router.push(url)
    },
    //查看评价详情
    toEvaluateDetail() {
      let url = '/user/order/evaluate-detail/' + this.item.orderId;
      this.$router.push(url)
    },
    //查看配送详情
    toDeliveyDetail() {
      let self = this;
      if (this.item.deliveryId == null) {
        this.$alert(this.$t('order.list.alert.shopDeli') + ': ' + this.item.sellerPhone, this.$t('common.notic'), {
          confirmButtonText: this.$t('common.ok'),
          callback: action => {}
        });
      } else {
        let url = '/user/order/delivery-detail/' + this.item.orderId;
        this.$router.push(url)
      }
    },
    // 取消订单
    async doCancel() {
      let self = this;
      if (self.cancelLoading) {
        return false;
      }
      self.cancelLoading = true;
      let res = await this.ajaxCancelOrder({ orderId: this.item.orderId })
      if (this.$checkData(res)) {
        this.$emit('refreshList');
      }
      self.cancelLoading = false;
      self.$message.success(this.$t('order.status.orderCancel'));
    },
    //申请退款
    toRefund() {
      this.$alert(this.$t('order.list.alert.refund'), this.$t('common.notic'), {
        confirmButtonText: this.$t('order.list.alert.shopTelShow'),
        callback: action => {
          if (action === 'confirm') {
            this.$alert(this.item.sellerPhone, this.$t('order.list.alert.shopTel'), {
              confirmButtonText: this.$t('common.ok'),
              callback: action => {}
            });
          }
        }
      });
    }

  }
}

</script>
<style scope lang="scss">
.order__list__wrapper {
  padding: 20px 0;
  border-bottom: 1px solid $bd-gray;
  .el-col {
    height: 90px;
  }
  &:last-child {
    border: 0;
  }
  img.orderImg {
    width: 130px;
    height: 90px;
    margin-right: 20px;
    float: left;
  }
  .info {
    overflow: hidden;
    text-align: left;
    .name {
      font-size: 16px;
      margin-bottom: 10px;
    }
    p {
      padding: 5px 0;
    }
  }
  button {
    margin-left: 0 !important;
  }
  .el-button+.el-button {
    margin-top: 5px;
  }
  .order__status{
    margin-bottom:5px;
    display:block;
  }
}

</style>
