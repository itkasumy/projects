<template>
  <div class="place-order" @keyup.enter="submit">
    <div class="header">
      <v-header type="transparent" title="提交订单"/>
      <!--地址-->
      <div class="address" v-if="hasAddress && !addLoading" @click="toUrl('/user/address-list')">
          <div class="label">配送至</div>
          <div class="info">
            <p>{{address.address}} {{address.houseNumber}}</p>
            <p>
              <span>{{address.name}}</span>
              <span>{{address.phone}}</span>
            </p>
          </div>
          <div class="arrow"><i class="iconfont icon-enter"/></div>
      </div>
      <div class="address" v-if="!hasAddress && !addLoading" @click="toUrl('/user/address/new')">
          <div class="add__btn"><i class="iconfont icon-jia"/>新增收货地址</div>
      </div>
      <div class="address" v-if="addLoading">
        <div class="add__loading">收货地址加载中...</div>
      </div>

    </div>
    <!--订单信息-->
    <div class="order">
      <div class="seller">
        <img :src="sellerInfo.logo">
        <p class="name">{{sellerInfo.sellerName}}</p>
      </div>
      <div class="goods" v-for="(item, index) in cart" :key="index">
        <img :src="item.data.photoPic">
        <div class="info">
          <p>{{item.data.name}}</p>
          <p>x&nbsp;{{item.num}}</p>
        </div>
        <div class="price">P{{item.price}}</div>
      </div>
      <div class="delivery">
        <span>配送费</span>
        <span>P{{logistics}}</span>
      </div>
      <div class="discount">
        <div @click="chooseReduction">
          <span><i class="iconfont icon-shezhi"/>满减折扣</span>
          <span class="price" v-if="reductionMoney">-P{{reductionMoney}}</span>
          <span class="count" v-else>{{reductionCount}}个可用<i class="iconfont icon-enter"/></span>
        </div>
        <div @click="chooseCoupon">
          <span><i class="iconfont icon-shezhi"/>优惠券</span>
          <span class="price" v-if="couponMoney">-P{{couponMoney}}</span>
          <span class="count" v-else>{{couponCount}}个可用<i class="iconfont icon-enter"/></span>
        </div>
      </div>
      <div class="total-price">
        小计 <span>P{{amountPrice}}</span>
      </div>
    </div>
    <!--备注-->
    <!--下单-->
    <div class="page-bottom">
      <div class="left">
        <span>合计 P{{amountPrice}}</span>
        <span>已优惠 P{{couponMoney || reductionMoney}}</span>
      </div>
      <div class="button" @click="submit">立即下单</div>
    </div>
    <!--满减-->
    <reduction-list ref="reduction"/>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
  import ReductionList from '@/components/order/reduction-list'

  export default {
    name: "place-order",
    components: {ReductionList},
    data() {
      return {
        remark: null,
        couponCount: 0,
        reductionCount: 0,
        hasAddress:false,
        addLoading:true
      }
    },
    computed: {
      ...mapState('cart', ['cart']),
      ...mapGetters('cart', ['totalPrice', 'originalTotal']),
      ...mapState('seller', ['sellerInfo']),
      ...mapGetters('seller', ['logistics']),
      ...mapState('order', ['address', 'coupon', 'reduction']),
      couponMoney() {
        let {coupon} = this
        if (coupon) return coupon.money
      },
      reductionMoney() {
        let {totalPrice, reduction} = this
        if (reduction) {
          let money = 0
          if (reduction.control_type === 2) {
            money = reduction.discount_amount
          } else {
            let discountMoney = this.$math.times(totalPrice, reduction.pay_discount)
            discountMoney = this.$math.divide(discountMoney, 100)
            money = this.$math.minus(totalPrice, discountMoney)
            if (money > reduction.maximum_discount) {
              money = reduction.maximum_discount
            }
          }
          return money
        }
      },
      amountPrice() {
        let {totalPrice, logistics, couponMoney, reductionMoney} = this
        let money = this.$math.plus(totalPrice, logistics)
        if (couponMoney) {
          money = this.$math.minus(money, couponMoney)
        } else if (reductionMoney) {
          money = this.$math.minus(money, reductionMoney)
        }
        return money
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapMutations('order', ['setAddress', 'setCouponList', 'setReductionList']),
      ...mapActions('user', ['ajaxAddressList', 'ajaxCouponList', 'ajaxFullReduction']),
      ...mapActions('order', ['ajaxPlaceOrder']),
      async initData() {
        this.$toast.loading()
        await this.getAddress()
        await this.getCoupon()
        await this.getFullReduction()
        this.$toast.close()
      },
      // 收货地址
      async getAddress() {
        let res = await this.ajaxAddressList({sellerId: this.sellerInfo.id})
        this.addLoading=false;
        if (res.code === 1) {
          let chooseAdd=[];
          let chooseAddId=[];
          for(let i=0;i<res.data.length;i++){
            if(!res.data[i].disabled){
              chooseAdd.push(res.data[i]);
              chooseAddId.push(res.data[i].id);
            }
          }
          if(chooseAdd.length!==0){
            this.hasAddress=true;
            if(this.address){
              if ((chooseAddId.indexOf(this.address.id)) == -1) {
                this.setAddress(chooseAdd[0]);
              }
            }else{
              this.setAddress(chooseAdd[0]);
            }
          }
        } else if (res.code === 401) {
          this.$toast.close()
          this.$router.push('/user/login')
        } else {
          this.$toast.error(res.message)
        }
      },
      // 获取优惠券
      async getCoupon() {
        let {totalPrice} = this
        let sellerId = this.sellerInfo.id
        let res = await this.ajaxCouponList({price: totalPrice, usePlatform: 1, sellerId})
        console.log('优惠券', res)
        if (res.code === 1) {
          this.couponCount = res.data.couponinfo.length
          this.setCouponList(res.data.couponinfo)
        } else {
          this.$toast.error(res.message)
        }
      },
      // 获取满减
      async getFullReduction() {
        let {totalPrice} = this
        let sellerId = this.sellerInfo.id
        let res = await this.ajaxFullReduction({price: totalPrice, usePlatform: 1, sellerId})
        console.log('支付满减', res)
        if (res.code === 1) {
          this.reductionCount = res.data.Activityinfo.length
          this.setReductionList(res.data.Activityinfo)
        } else {
          this.$toast.error(res.message)
        }
      },
      // 选择优惠券
      chooseCoupon() {
        this.$router.push('/coupon-list')
      },
      // 选择支付满减
      chooseReduction() {
        this.$refs.reduction.show()
      },
      // 下单
      async submit() {
        let {address, remark, sellerInfo} = this
        let {cart, amountPrice, logistics, originalTotal, coupon, reduction, couponMoney, reductionMoney} = this
        if (!address.id) {
          this.$toast('请选择收货地址')
          return
        }
        let goodsList = []
        cart.forEach(item => {
          goodsList.push({goodsId: item.data.id, num: item.num})
        })
        let activityRuleId, discountMoney
        if (coupon) {
          activityRuleId = coupon.activity_id
          discountMoney = couponMoney
        } else if (reduction) {
          activityRuleId = reduction.id
          discountMoney = reductionMoney
        }
        this.$toast.loading('正在下单')
        let res = await this.ajaxPlaceOrder({
          GoodsList: JSON.stringify({GoodsList: goodsList}),
          sellerId: sellerInfo.id,
          logistics: logistics,
          addrId: address.id,
          remark,
          totalPrice: this.$math.plus(originalTotal, logistics),
          actualPrice: amountPrice,
          activityRuleId,
          discountMoney,
          device: 3
        })
        console.log('下单', res)
        if (res.code === 1) {
          this.$toast.success()
          setTimeout(() => {
            this.$router.push(`/pay-order/${res.data}`)
          }, 500)
        } else if (res.code === 401) {
          this.$toast.error(res.message)
          setTimeout(() => {
            this.$router.push('/user/login')
          }, 500)
        } else {
          this.$toast.error(res.message)
        }
      },
      toUrl(url){
        this.$router.push({
          path: url,
          query: {
            type: 'order',
            sellerId:this.sellerInfo.id
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .place-order {
    background: $body-bg;
    min-height: 100vh;
    padding-bottom: 3rem;
    .header {
      height: 6rem;
      background-image: linear-gradient(to right, #FF644C, #FF3633);
      .address {
        background: #fff;
        border-radius: 4px;
        height: 4.4rem;
        margin: 0 0.5rem;
        transform: translateY(1.2rem);
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &:active {
          background: #f0f0f0;
        }
        .add__loading{
          font-size: 16px;
        }
        .add__btn{
          text-align: center;
          width: 12rem;
          line-height: 2rem;
          border: 1px solid $primary;
          border-radius: 2.5rem;
          color:$primary;
          font-size: 18px;
          i{
            margin-right: .25rem;
          }
          &:active{
            color:$primary-level-2;
          }
        }
        .label {
          flex: 1;
          font-size: 14px;
          color: #999999;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .info {
          flex: 5;
          min-width: 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          font-size: 16px;
          padding: 0.5rem;
          p {
            max-width: 100%;
            @include text-over;
          }
        }
        .arrow {
          display: flex;
          align-items: center;
          i {
            font-size: 18px;
          }
        }
      }
    }
    .order {
      margin: 2.5rem 0.5rem 0;
      background: #fff;
      border-radius: 4px;
      padding: 0.5rem 0.5rem;
      .seller {
        overflow: hidden;
        padding-bottom: 0.5rem;
        @include border-bottom(#f0f0f0);
        img {
          float: left;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
        }
        .name {
          float: left;
          height: 2.5rem;
          line-height: 2.5rem;
          padding-left: 0.5rem;
          box-sizing: border-box;
          font-size: 15px;
        }
      }
      .goods {
        overflow: hidden;
        padding: 1rem 0;
        @include border-bottom(#f0f0f0);
        img {
          width: 2.5rem;
          height: 2.5rem;
          float: left;
        }
        .info {
          float: left;
          padding-left: 0.5rem;
          p:first-child {
            font-size: 16px;
          }
          p:last-child {
            font-size: 14px;
            color: #999;
            margin-top: 0.5rem;
          }
        }
        .price {
          float: right;
          font-size: 16px;
        }
      }
      .delivery {
        overflow: hidden;
        font-size: 16px;
        padding: 0.5rem 0;
        span:first-child {
          float: left;
        }
        span:last-child {
          float: right;
        }
      }
      .discount {
        padding: 0.5rem 0;
        @include envelope;
        div {
          overflow: hidden;
          padding: 0.5rem 0;
          &:active {
            background: #f0f0f0;
          }
          span:first-child {
            float: left;
            font-size: 16px;
            i {
              margin-right: 0.5rem;
            }
          }
          span.count {
            float: right;
            font-size: 13px;
            color: #999;
          }
          span.price {
            float: right;
            font-size: 15px;
            color: $primary;
          }
        }
      }
      .total-price {
        @include envelope;
        padding-top: 0.5rem;
        text-align: right;
        font-size: 16px;
        span {
          color: #FF3633;
        }
      }
    }
    .page-bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      display: flex;
      .left {
        flex: 2;
        background: #665C5C;
        color: #fff;
        font-size: 16px;
        span:first-child {
          margin-left: 1rem;
          font-size: 16px;
          padding-right: 0.5rem;
        }
        span:last-child {
          color: #999999;
          font-size: 12px;
          padding-left: 0.5rem;
          border-left: 1px solid #999999;
        }
      }
      .button {
        flex: 1;
        background: $primary;
        text-align: center;
        color: #fff;
        font-size: 16px;
        &:active {
          background: $primary-level-2;
        }
      }
    }
  }
</style>
