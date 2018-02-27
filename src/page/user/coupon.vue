<template>
  <div class="coupon">
    <v-header title="优惠券列表" class="u-fixed-header"/>
    <div class="u-main-content fixed ">
      <ul class="list-type">
        <li class="u-link-bg" :class="{active:type===0}" @click="type=0"><span>可使用</span></li>
        <li class="u-link-bg" :class="{active:type===1}" @click="type=1"><span>已过期</span></li>
      </ul>
      <div class="list__container">
        <common-no-data message="暂无可用的优惠券哦" v-if="couponList.length === 0 && !loading"/>
        <ul class="list">
          <li v-for="(item, index) in couponList" :key="index" :class="{seller: item.activity_host === 2, history: type === 1}">
            <div class="inner">
            <div class="left">
              <div class="name">
                <span v-if="item.activity_host === 2">商家优惠券</span>
                <span v-else>平台优惠券</span>
              </div>
              <div class="date">{{item.expire_time | dateTran}}到期</div>
              <div class="type">
                <span v-if="item.activity_host === 2">仅限{{item.seller_name}}使用</span>
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
              <div class="shad--cover">
                <img src="../../assets/img/coupon-failue.png">
              </div>
            </div>

            <div class="history__tips">不可用原因: 已过期</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import CommonNoData from '@/components/common/common-no-data'
  export default {
    props: [],
    components: {CommonNoData},
    data() {
      return {
        type: 0,
        userInfo: null,
        couponList: [],
        loading: true
      }
    },
    computed: {},
    watch: {
      type() {
        this.initData()
      }
    },
    async mounted() {
      this.initData();
    },
    methods: {
      ...mapActions('user', ['ajaxCouponUser', 'ajaxUserInfo']),
      async initData() {
        let self = this;
        let type = self.type;
        self.couponList = [];
        self.loading = true;
        this.$toast.loading()
        let res = await this.ajaxCouponUser({status: type});
        let userInfoRes = await this.ajaxUserInfo();
        if (self.$checkData(res)) {
          if (self.$checkData(userInfoRes)) {
            self.userInfo = userInfoRes.data.userinfo;
            res.data.userCoupon.forEach(item => {
              self.couponList.push(item)
            })
          }
        }
        this.$toast.close()
        self.loading = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .coupon {
    ul.list-type {
      border-bottom: 1px solid $grey-ddd;
      top: 2.2rem;
      position: fixed;
      width: 100%;
      display: flex;
      text-align: center;
      line-height: 2.2rem;
      background: #fafafa;
      font-size: 14px;
      li {
        flex: 1;
        &.active {
          span {
            display: inline-block;
            height: 2.2rem;
            border-bottom: 2px solid $primary;
          }
        }
      }
    }
    .list__container {
      margin-top: 2.35rem;
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
          .inner{
            overflow: hidden;
            display: flex;
            position: relative;
            &:before {
              @include ball;
              top: 0;
              left: 66.66%;
              transform: translateY(-50%);
              z-index: 5;
            }
            &:after {
              @include ball;
              bottom: 0;
              left: 66.66%;
              transform: translateY(50%);
              z-index: 5;
            }
          }
          margin: 0.5rem 0;
          &.history {
            .shad--cover,
            .history__tips {
              display: block;
            }
          }
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
              z-index: 5;
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
              z-index: 5;
            }
            .content {
              text-align: center;
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
          .shad--cover {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            z-index: 3;
            background: #ffffffa3;
            display: none;
            img {
              width: 2.25rem;
              position: absolute;
              top: 50%;
              left: 50%;
            }
          }
          .history__tips {
            padding: 0 .8rem;
            background-color: #fafafa;
            position: relative;
            z-index: 5;
            display: none;
            line-height: 1.5rem;
            font-size: 12px;
            color: #808080;
            display: none;
          }
        }
      }
    }
  }
</style>
