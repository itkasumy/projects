<template>
  <div class="choose-place">
    <div class="left">
      <div class="row">
        <div class="title">选择支付方式</div>
        <div class="form">
          <el-button plain :autofocus="true">在线支付</el-button>
        </div>
      </div>
      <div class="row">
        <div class="title">选择优惠券</div>
        <div class="form">
          <el-select v-model="coupon" placeholder="只能选择一种优惠" @change="chooseCoupon">
            <el-option v-for="(item, index) in couponList" :key="index" :label="item.title"
                       :value="item.activity_id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="title">选择支付优惠</div>
        <div class="form">
          <el-select v-model="reduction" placeholder="只能选择一种优惠" @change="chooseReduction">
            <el-option v-for="(item, index) in reductionList" :key="index" :label="item.title"
                       :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="title">填写备注信息</div>
        <div class="form form-textarea">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="remark" resize="none"></el-input>
        </div>
      </div>
    </div>
    <div class="right">
      <ul>
        <li>
          <div class="title">商品件数</div>
          <div class="price">{{totalNum}}件</div>
        </li>
        <li>
          <div class="title">商品总价</div>
          <div class="price">P{{presentTotal}}</div>
        </li>
        <li>
          <div class="title">优惠券</div>
          <div class="price">-P{{couponMoney}}</div>
        </li>
        <li>
          <div class="title">支付优惠</div>
          <div class="price">-P{{reductionMoney}}</div>
        </li>
        <li>
          <div class="title">运费</div>
          <div class="price">P{{sellerInfo.logistics}}</div>
        </li>
        <li>
          <div class="title">应付总额</div>
          <div class="price">P{{actualPrice}}</div>
        </li>
      </ul>
      <div class="place-button">
        <el-button type="primary" :loading="placeLoading" @click="placeOrder">前往支付</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'

  export default {
    name: "choose-place",
    props: ['goodsList'],
    data() {
      return {
        couponList: [{title: '不使用优惠券'}],
        reductionList: [{title: '不使用满减优惠'}],
        coupon: null,
        reduction: null,
        remark: null,
        sellerInfo: {
          id: null,
          logistics: null
        },
        placeLoading: false
      }
    },
    computed: {
      ...mapState('order', ['address']),
      ...mapGetters('order', ['totalNum', 'originalTotal', 'presentTotal']),
      couponMoney() {
        let money = 0
        let {coupon, couponList} = this
        if (!coupon) return money
        couponList.forEach(item => {
          if (item.activity_id === coupon) money = item.money
        })
        return money
      },
      reductionMoney() {
        let money = 0
        let {reduction, reductionList, presentTotal} = this
        if (!reduction) return money
        reductionList.forEach(item => {
          if (item.id === reduction) {
            if (item.control_type === 2) {
              money = item.discount_amount
            } else {
              money = (presentTotal.mul(item.pay_discount)).div(100).sub(presentTotal)
              if (money > item.maximum_discount) {
                money = item.maximum_discount
              }
            }
          }
        })
        return parseFloat(money)
      },
      actualPrice() {
        let result = 0
        let {presentTotal, couponMoney, reductionMoney} = this
        let {logistics} = this.sellerInfo
        if (!presentTotal.add) return 0
        result = presentTotal.add(logistics)
        if (couponMoney) {
          result = couponMoney.sub(result)
        } else if (reductionMoney) {
          result = reductionMoney.sub(result)
        }
        return result
      }
    },
    mounted() {
      let sellerInfo = sessionStorage.getItem('sellerInfo')
      if (sellerInfo) {
        this.sellerInfo = JSON.parse(sellerInfo)
        setTimeout(() => {
          this.getCouponList()
          this.getFullReduction()
        }, 200)
      }
    },
    methods: {
      ...mapActions('user', ['ajaxCouponList', 'ajaxFullReduction']),
      ...mapActions('order', ['ajaxPlaceOrder']),
      // 获取优惠券
      async getCouponList() {
        let {presentTotal} = this
        let sellerId = this.sellerInfo.id
        let res = await this.ajaxCouponList({price: presentTotal, usePlatform: 1, sellerId})
        console.log('优惠券', res)
        if (res.code === 1) {
          res.data.couponinfo.forEach(item => {
            item.title = `满${item.full_money}减${item.money}`
            this.couponList.push(item)
          })
        }
      },
      // 获取满减
      async getFullReduction() {
        let {presentTotal} = this
        let sellerId = this.sellerInfo.id
        let res = await this.ajaxFullReduction({price: presentTotal, usePlatform: 1, sellerId})
        console.log('支付满减', res)
        if (res.code === 1) {
          res.data.Activityinfo.forEach(item => {
            if (item.control_type === 2) {
              item.title = `支付满减，满${item.limitcontent}减${item.discount_amount}`
            } else {
              item.title = `支付折扣，${item.pay_discount / 10}折，最多减${item.maximum_discount}`
            }
            this.reductionList.push(item)
          })
        }
      },
      // 选择优惠券
      chooseCoupon() {
        this.reduction = null
      },
      // 选择满减
      chooseReduction() {
        this.coupon = null
      },
      // 下单
      async placeOrder() {
        let {goodsList, sellerInfo, address, remark, presentTotal, actualPrice, coupon, couponMoney, reduction, reductionMoney} = this
        if (!address.id) {
          this.$message.error('请选择收货地址')
          return
        }
        let arr = []
        goodsList.forEach(item => {
          arr.push({goodsId: item.data.id, num: item.num})
        })
        let activityRuleId, discountMoney
        if (coupon) {
          activityRuleId = coupon
          discountMoney = couponMoney
        } else if (reduction) {
          activityRuleId = reduction
          discountMoney = reductionMoney
        }
        this.placeLoading = true
        let res = await this.ajaxPlaceOrder({ 
          GoodsList: JSON.stringify({GoodsList: arr}),
          sellerId: sellerInfo.id,
          logistics: sellerInfo.logistics,
          addrId: address.id,
          remark,
          totalPrice: presentTotal.add(sellerInfo.logistics),
          actualPrice,
          activityRuleId,
          discountMoney,
          device: 3
        })
        this.placeLoading = false
        if (res.code === 1) {
          this.$router.push(`/order/pay/${res.data}`)
        } else if (res.code === 401) {
          this.$router.push('/account/login')
        } else {
          this.$message.error(res.message)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .choose-place {
    overflow: hidden;
    padding-top: 30px;
    border: 1px solid #EBEBEB;
    border-top: none;
    .left {
      width: 70%;
      float: left;
      padding-left: 30px;
      padding-right: 100px;
      .row {
        height: 40px;
        overflow: hidden;
        margin-bottom: 20px;
        .title {
          float: left;
          line-height: 40px;
          margin-right: 30px;
          width: 100px;
        }
        .form {
          float: left;
          width: 500px;
        }
        &:last-child {
          height: 160px;
        }
      }
      .el-select {
        width: 100%;
      }
      .form-textarea {
        margin-top: 4px;
      }
    }
    .right {
      width: 30%;
      float: right;
      padding-bottom: 30px;
      ul {
        li {
          overflow: hidden;
          margin-bottom: 24px;
          .title {
            float: left;
            width: 33.33%;
            text-align: left;
          }
          .price {
            float: right;
            color: $color-primary;
            /*width: 33.33%;*/
            text-align: right;
            padding-right: 40px;
          }
          &:last-child {
            padding-top: 30px;
            border-top: 1px solid #EBEBEB;
            margin-right: 38px;
            .price {
              font-size: 24px;
              padding-right: 0;
            }
          }
        }
      }
      .place-button {
        padding-right: 38px;
        .el-button {
          width: 100%;
        }
      }
    }
  }
</style>
