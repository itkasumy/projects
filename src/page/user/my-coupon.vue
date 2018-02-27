<template>
  <div>
    <!--头部-->
    <common-header/>
    <div class="my__coupon__container clearfix">
      <div class="u-pc-sidebar">
        <!--侧边栏-->
        <side-bar pageId="5" />
      </div>
      <div class="coupon__wrapper u-pc-content">
        <div class="top__header">
          <h2>我的优惠券</h2>
          <div class="right__todo">
            <el-radio-group v-model="couponType" @change="initData">
              <el-radio label="0">我的优惠券</el-radio>
              <el-radio label="1">历史优惠券</el-radio>
            </el-radio-group>
          </div>
        </div>
        <common-loading v-if="loading" />
        <common-no-data message="未找到相关优惠券" v-if="couponList.length === 0 && !loading" />
        <div class="coupon__list">
          <el-row>
            <el-col :span="12" v-for="(item, index) in couponList" :key="index" :item="item">
              <div class="card-coupon" :class="{plat: item.activity_host === 1, bussiness: item.activity_host === 2, history: parseInt(couponType) === 1}">
                <div class="circle c--left"></div>
                <div class="circle c--right"></div>
                <div class="left">
                  <div class="title" v-if="item.activity_host === 2">商家优惠券</div>
                  <div class="title" v-else>平台优惠券</div>
                  <div class="time">{{$formatDateTime(item.expire_time,'ymd')}} 过期</div>
                  <p class="des" v-if="item.activity_host === 2">只限{{ item.seller_name}}使用</p>
                  <p class="des" v-else>平台通用</p>
                  <p class="des">仅限手机号为 +{{userInfo.phonePre}} {{userInfo.phone}} 使用</p>
                  <div class="circle c--top"></div>
                  <div class="circle c--bottom"></div>
                  <div class="point"><img src="../../assets/img/coupon-c.png"></div>
                </div>
                <div class="right">
                  <div class="price">{{item.money}}<span>P</span></div>
                  <div class="use__type">
                    <p v-if="item.activity_host==2">满 {{item.full_money}} 可用</p>
                    <template v-else>
                      <div class="line"></div>
                      <p class="des">无限制</p>
                    </template>
                  </div>
                </div>
                <div class="shad--cover">
                  <img src="../../assets/img/coupon-failue.png">
                </div>
                <div class="history__tips">不可用原因: 已过期</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <common-footer/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import SideBar from "../../components/user/side-bar";
export default {
  data() {
    return {
      couponType: '0',
      couponList: [],
      userInfo: {
        phonePre: '',
        phone: ''
      },
      loading: true
    }
  },
  components: { SideBar },
  computed: {

  },
  async mounted() {
    this.initData();
  },
  methods: {
    ...mapActions('user', ['ajaxCouponUser', 'ajaxUserInfo']),
    async initData() {
      let self = this;
      let type = self.couponType;
      self.couponList = [];
      self.loading = true;
      let res = await this.ajaxCouponUser({ status: type });
      console.log(res);
      let userInfoRes = await this.ajaxUserInfo();
      if (self.$checkData(res)) {
        if (self.$checkData(userInfoRes)) {
          self.userInfo = userInfoRes.data.userinfo;
          res.data.userCoupon.forEach(item => {
            self.couponList.push(item)
          })
        }
      }
      self.loading = false;
    }
  }
}

</script>
<style scope lang="scss">
.my__coupon__container {
  @include container;
  margin-top: 20px;
  .coupon__wrapper {
    .coupon__list {
      padding: 10px;
      .el-col {
        padding: 10px;
      }
      .card-coupon {
        border: 1px solid #F0F0F0;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        &.history {
          .shad--cover,
          .history__tips {
            display: block;
          }
        }
        &.plat {
          .left {
            .title {
              color: $color-primary;
            }
            .time {
              color: rgba(255, 100, 77, 0.50);
            }
          }
          .right {
            background-color: $color-primary;
            .use__type {
              .line {
                width: 85%;
                height: 1px;
                background: #fff;
                margin: 0 auto;
                top: 8px;
              }
              p {
                width: 48%;
                word-break: break-all;
                margin: 0 auto;
                position: relative;
                padding: 0 2px;
                color: rgba(255, 255, 255, 0.90);
                background: $color-primary;
                line-height: 13px;
              }
            }
          }
        }
        &.bussiness {
          .left {
            .title {
              color: #FFB900;
            }
            .time {
              color: rgba(255, 185, 0, 0.50);
            }
          }
          .right {
            background-color: #FFB900;
            .use__type {
              p {
                color: rgba(255, 255, 255, 0.90);
              }
            }
          }
        }
        .left {
          padding: 15px 20px;
          height: 135px;
          box-sizing: border-box;
          width: 75%;
          float: left;
          position: relative;
          .title {
            font-size: 20px;
          }
          .time {
            margin-top: 2px;
            font-size: 12px;
            margin-bottom: 10px;
          }
          .des {
            font-size: 12px;
            padding: 2px 0;
            color: $text-color-lev-3;
          }
          .point {
            width: 8px;
            height: 120px;
            position: absolute;
            top: 12px;
            right: -4px;
            z-index: 1;
          }
        }
        .right {
          overflow: hidden;
          position: relative;
          height: 135px;
          text-align: center;
          color: #fff;
          .price {
            font-size: 40px;
            margin: 27px 0 10px 0;
            span {
              font-size: 14px;
              margin-left: 3px;
            }
          }
        }
        .circle {
          width: 13px;
          height: 13px;
          background: #F0F0F0;
          border-radius: 100%;
          position: absolute;
          z-index: 1;
          &.c--left {
            left: -7px;
            top: 62px;
          }
          &.c--right {
            right: -7px;
            top: 62px;
          }
          &.c--top {
            right: -6px;
            top: -7px;
          }
          &.c--bottom {
            right: -6px;
            bottom: -7px;
          }
        }
        .shad--cover {
          position: absolute;
          width: 100%;
          height: 135px;
          top: 0;
          z-index: 2;
          background: #ffffffa3;
          display: none;
          img {
            width: 80px;
            position: absolute;
            top: 32px;
            left: 50%;
          }
        }
        .history__tips {
          padding: 10px 20px;
          background-color: $bg-gray--light;
          position: relative;
          z-index: 1;
          display: none;
          color: #808080;
        }
      }
    }
  }
}

</style>
