<template>
  <div class="order__list__wrapper">
    <router-link :to="orderDetailLink">
      <div class="list__detail u-link-bg">
        <div class="left__img">
          <img :src="item.logo">
        </div>
        <div class="detail__wrapper">
          <div class="top clearfix">
            <div class="shop__name">
              {{item.sellerName}}
            </div>
            <div class="status">
              {{statusMsg}}
            </div>
          </div>
          <p class="num__price">物品数量: {{goodsNum}} | 实付金额: {{item.totalPrice}}P</p>
          <div class="goods">
            {{goodsNames}}
          </div>
        </div>
      </div>
    </router-link>
    <template v-if="parseInt(type)===1">
      <template v-if="refundStatus===0">
        <div class="todo" v-if="status===0">
          <a class="u-link" href="javascript:;"><span>{{$t('order.list.toPay')}}</span><i class="iconfont icon-enter"></i></a>
        </div>
        <div class="todo" v-if="status===3 || status===4">
          <a class="u-link" href="javascript:;" @click="toDeliveyDetail"><span>{{$t('order.list.toDeliveyDetail')}}</span><i class="iconfont icon-enter"></i></a>
        </div>
        <div class="todo" v-if="status===5 && isComment==0">
          <a class="u-link" href="javascript:;"><span>{{$t('order.list.toEvaluate')}}</span><i class="iconfont icon-enter"></i></a>
        </div>
        <div class="todo" v-if="status===5 && isComment==1">
          <a class="u-link" href="javascript:;"><span>{{$t('order.list.toEvaluateDetail')}}</span><i class="iconfont icon-enter"></i></a>
        </div>
      </template>
      <template v-else>
        <div class="todo">
          <a class="u-link" href="javascript:;" @click="toRefundDetail"><span>{{$t('order.list.toRefundDetail')}}</span><i class="iconfont icon-enter"></i></a>
        </div>
      </template>
    </template>
    <template v-if="parseInt(type)===2">
      <div class="todo">
        <a class="u-link" href="javascript:;"><span>{{$t('order.list.toEvaluate')}}</span><i class="iconfont icon-enter"></i></a>
      </div>
    </template>
    <template v-if="parseInt(type)===3">
      <div class="todo">
        <a class="u-link" href="javascript:;"><span>{{$t('order.list.toRefundDetail')}}</span><i class="iconfont icon-enter"></i></a>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "order-list",
  props: ['item', 'type'],
  components: {},
  data() {
    return {}
  },
  computed: {
    orderId(){
      return this.item.orderId;
    },
    orderDetailLink() {
      return '/order/order-detail/' + this.orderId;
    },
    goodsNames() {
      let names = '';
      for (let i = 0; i < this.item.orderGoodsList.length; i++) {
        if (i == this.item.orderGoodsList.length - 1) {
          names = names + this.item.orderGoodsList[i].goodsName;
        } else {
          names = names + this.item.orderGoodsList[i].goodsName + ' ';
        }
      }
      return names;
    },
    goodsNum() {
      let num = 0;
      let goodsList = this.item.orderGoodsList;
      for (let i = 0; i < goodsList.length; i++) {
        num = num + goodsList[i]['num'];
      }
      return num;
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
  mounted() {},
  methods: {
    //查看退款详情
    toRefundDetail() {
      let url = '/order/refund-detail/' + this.orderId;
      this.$router.push(url)
    },
        //查看配送详情
    toDeliveyDetail() {
      if (this.item.deliveryId == null) {
        alert(this.$t('order.list.alert.shopDeli') + ': ' + this.item.sellerPhone)
      } else {
        let url = '/order/delivery-detail/' + this.orderId;
        this.$router.push(url)
      }
    },
  }
}

</script>
<style scoped lang="scss">
.order__list__wrapper {
  background: #fff;
  margin-bottom: .5rem;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  .list__detail {
    padding: .75rem;
    padding-bottom: .6rem;

    .left__img {
      float: left;
      margin-right: .5rem;
      img {
        width: 3rem;
        height: 2rem;
        border:1px solid $grey-ddd;
      }
    }
    .detail__wrapper {
      overflow: hidden;
      .top {
        font-size: 15px;
        color: $font-important;
        font-weight: 600;
        margin-bottom: .5rem;
        .shop__name {
          float: left;
          width: 60%;
          word-break: break-all;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .status {
          float: right;
        }
      }
      .num__price {
        font-size: 14px;
        margin-bottom: .625rem;
        color: $font-primary;
      }
      .goods {
        font-size: 13px;
        color: #999999;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
  .todo {
    border-top: 1px dashed $grey-ddd;
    margin: 0 .75rem;
    text-align: center;
    line-height: 43px;
    font-size: 15px;
    span {
      color: $primary;
      margin-right: .5rem;
    }
    i {
      color: $grey-ddd;
    }
  }
}

</style>
