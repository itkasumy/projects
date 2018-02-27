<template>
  <div class="coupon-list">
    <v-header title="选择优惠券"/>
    <label @change="chooseCoupon(null)">
      <span>不使用优惠券</span>
      <div class="point" :class="{active: noCoupon}"></div>
      <input type="checkbox">
    </label>
    <ul class="list">
      <div class="title">可用优惠券({{couponList.length}}张)</div>
      <li v-for="(item, index) in couponList" :key="index"
          :class="{seller: item.use_platform === 3}"
          @click="chooseCoupon(item)">
        <div class="choose" v-if="coupon && item.activity_id === coupon.activity_id">
          <i class="iconfont icon-successful"/>
        </div>
        <div class="left">
          <div class="name">
            <span v-if="item.use_platform === 3">商家优惠券</span>
            <span v-else>平台优惠券</span>
          </div>
          <div class="date">{{item.expire_time | dateTran}}到期</div>
          <div class="type">
            <span v-if="item.use_platform === 3">仅限{{item.Name}}使用</span>
            <span v-else>平台通用</span>
          </div>
          <div class="hint">仅限账号为{{userInfo.phone}}使用</div>
          <div class="point"><img src="../../assets/img/coupon-c.png"></div>
        </div>
        <div class="right">
          <div class="content">
            <div class="price">
              <span>{{item.money}}</span>
              <span>P</span>
            </div>
            <div class="hint">满{{item.full_money}}减{{item.money}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "coupon-list",
    data() {
      return {}
    },
    computed: {
      ...mapState('order', ['couponList', 'coupon']),
      ...mapState('user', ['userInfo']),
      noCoupon() {
        return this.coupon === null
      }
    },
    methods: {
      ...mapMutations('order', ['setCoupon']),
      chooseCoupon(item) {
        this.setCoupon(item)
        setTimeout(() => {
          this.$goBack()
        }, 100)
      }
    }
  }
</script>

<style scoped lang="scss">
  .coupon-list {
    label {
      display: block;
      background: #fff;
      height: 2.2rem;
      line-height: 2.2rem;
      font-size: 15px;
      box-sizing: border-box;
      padding: 0 1em;
      position: relative;
      input {
        display: none;
      }
      .point {
        position: absolute;
        right: 1rem;
        top: 0.8rem;
        width: 0.6rem;
        height: 0.6rem;
        border: 1px solid #ddd;
        border-radius: 50%;
        &.active {
          background: $primary;
          border-color: $primary;
        }
      }
    }
    ul.list {
      padding: 0.5rem;
      .title {
        font-size: 13px;
      }
      @mixin ball {
        content: '';
        position: absolute;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background-color: #f0f0f0;
      }
      li {
        overflow: hidden;
        margin: 0.5rem 0;
        display: flex;
        position: relative;
        &:active {
          opacity: .7;
        }
        &.seller {
          .name {
            color: #FFB900 !important;
          }
          .date {
            color: #FFD666 !important;
          }
          .right {
            background: #FFB900;
          }
        }
        &:before {
          @include ball;
          top: 0;
          left: 66.66%;
          transform: translateY(-50%);
          z-index: 2;
        }
        &:after {
          @include ball;
          bottom: 0;
          left: 66.66%;
          transform: translateY(50%);
          z-index: 2;
        }
        .choose {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          border-top-left-radius: 4px;
          color: #fff;
          background: red;
          &:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            z-index: 2;
            border: .75rem solid transparent;
            border-right-color: #fff;
            border-bottom-color: #fff;
          }
          i {
            position: absolute;
            top: 0.05rem;
          }
        }
        .left {
          flex: 2;
          background: #fff;
          padding: 0.5rem;
          position: relative;
          box-sizing: border-box;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          .name {
            font-size: 18px;
            font-weight: bold;
            color: $primary;
            padding-left: 0.3rem;
            z-index: 3;
            position: relative;
          }
          .date {
            font-size: 10px;
            color: #FF8280;
            padding-left: 0.3rem;
          }
          .type {
            font-size: 12px;
            color: #999999;
            margin-top: 0.5rem;
            padding-left: 0.3rem;
          }
          .hint {
            font-size: 12px;
            color: #999999;
            padding-left: 0.3rem;
          }
          &:before {
            @include ball;
            top: 50%;
            left: 0;
            transform: translate(-50%, -50%);
          }
          .point {
            width: 8px;
            position: absolute;
            top: 1px;
            right: -4px;
            z-index: 1;
          }
        }
        .right {
          flex: 1;
          background: #FF3633;
          color: #fff;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          &:after {
            @include ball;
            top: 50%;
            right: 0;
            transform: translate(50%, -50%);
          }
          .content {
            .price {
              span:first-child {
                font-size: 36px;
              }
              span:last-child {
                font-size: 14px;
              }
            }
            .hint {
              font-size: 14px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
