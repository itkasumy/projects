<template>
  <div class="user__container bg-grey">
    <div class="top__header">
      <div class="todo">
        <router-link to="/">
          <i class="iconfont icon-buoumaotubiao10 u-link"></i>
        </router-link>
        <router-link to="/setting">
          <i class="iconfont icon-shezhi u-link"></i>
        </router-link>
      </div>
      <div class="user__info clearfix">
        <template v-if="!ifLogin">
          <router-link to="/user/login">
            <img :src="defaultAvatar">
             <div class="u-link to__login">
               <div class="u-mid-c">
               <span>点击登录</span>
               <p>登录后享受更多权益</p>
               </div>
             </div>
          </router-link>
        </template>
        <template v-if="ifLogin">
          <router-link to="/user/account">
          <img :src="userInfo.headIcon || defaultAvatar">
          <div class="logined">
            <div class="u-mid-c">
              <p class="user__name">{{userInfo.nichName}}</p>
              <p> <i class="iconfont icon-shouji"></i> +{{userInfo.phonePre}} {{userInfo.phone | phoneTran}}</p>
            </div>
          </div>
          </router-link>
        </template>
      </div>
    </div>
    <div class="top__bar">
      <ul class="clearfix">
        <li>
          <router-link to="/user/collection">
            <i class="iconfont icon-shoucang"></i>
            <p>我的收藏</p>
          </router-link>
          <div class="line"></div>
        </li>
        <li>
          <router-link to="/user/address-list">
            <i class="iconfont icon-daojishi"></i>
            <p>我的足迹</p>
          </router-link>
          <div class="line"></div>
        </li>
        <li>
          <router-link to="/user/address-list">
            <i class="iconfont icon-pingjia"></i>
            <p>我的评价</p>
          </router-link>
          <div class="line"></div>
        </li>
        <li>
          <router-link to="/user/address-list">
            <i class="iconfont icon-weibiaoti2fuzhi08"></i>
            <p>收货地址</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="todo__wrapper">
    <div class="todo__list">
      <div class="list-view">
        <ul>
          <li>
            <div class="item-title">
              <span>我的资产</span>
            </div>
          </li>
          <li>
            <router-link to="/user/balance">
              <div class="item-content u-link-bg">
                <div class="item-inner">
                  <i class="iconfont icon-fenxiangyuejilu left__icon"></i>
                  <span>我的余额</span>
                  <div class="right__icon">
                    <i class="balNum" v-if="balance">{{balance.BalanceSize}} P</i><i class="iconfont icon-enter"></i>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/user/coupon">
              <div class="item-content u-link-bg">
                <div class="item-inner">
                  <i class="iconfont icon-weibiaoti2fuzhi02 left__icon"></i>
                  <span>优惠券</span>
                  <div class="right__icon">
                    <i class="balNum" v-if="balance">{{balance.couponSize}} 张</i><i class="iconfont icon-enter"></i>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="todo__list">
      <div class="list-view">
        <ul>
          <li>
            <div class="item-title">
              <span>更多</span>
            </div>
          </li>
          <li>
            <router-link to="/">
              <div class="item-content u-link-bg">
                <div class="item-inner">
                  <i class="iconfont icon-tuijianyoujiang2 left__icon"></i>
                  <span>邀请有奖</span>
                  <i class="iconfont icon-enter right__icon"></i>
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <div class="item-content u-link-bg">
                <div class="item-inner">
                  <i class="iconfont icon-waimaiyiwancheng left__icon"></i>
                  <span>商务合作</span>
                  <i class="iconfont icon-enter right__icon"></i>
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <div class="item-content u-link-bg">
                <div class="item-inner">
                  <i class="iconfont icon-kefuzhongxin left__icon"></i>
                  <span>客服中心</span>
                  <i class="iconfont icon-enter right__icon"></i>
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <div class="item-content u-link-bg">
                <div class="item-inner">
                  <i class="iconfont icon-yijianfankui left__icon"></i>
                  <span>意见反馈</span>
                  <i class="iconfont icon-enter right__icon"></i>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    </div>
    <tab-bar/>
  </div>
</template>
<script>
import defaultAvatar from '@/assets/img/avatar-male.svg'
import { mapActions } from 'vuex'
import TabBar from '@/components/common/tab-bar'

export default {
  name: "user",
  components: { TabBar },
  data() {
    return {
      defaultAvatar,
      userInfo: {},
      ifLogin: false,
      balance:null
    }
  },
  async mounted() {
    this.$toast.loading()
    await this.initData();
    this.$toast.close()
  },
  methods: {
    ...mapActions('user', ['ajaxUserInfo', 'ajaxBalanceAndCoupon']),
    async initData() {
      let self = this;
      let res = await this.ajaxUserInfo();
      if(res.code!==401){
        if (self.$checkData(res)) {
          self.userInfo = res.data.userinfo;
          self.getBalance();
          self.ifLogin=true;
        }
      }
    },
    async getBalance(){
      let self = this;
      let res = await self.ajaxBalanceAndCoupon();
      if (self.$checkData(res)) {
        self.balance = res.data;
      }
    }
  }
}
</script>
<style scoped lang="scss">
.user__container {
  .top__header {
    background-image: linear-gradient(-90deg, rgba(255, 54, 51, 0.00) 0%, rgba(255, 67, 59, 0.33) 0%, rgba(255, 100, 76, 0.94) 0%, #FF644C 100%);
    padding: 1rem;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
    box-sizing: border-box;
    .todo {
      text-align: right;
      margin-bottom: 1.5rem;
      i {
        color: #fff;
        font-size: 15px;
        &:last-child {
          margin-left: .75rem;
        }
      }
    }
    .user__info {
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        margin-right: .75rem;
        float: left;
      }
      .to__login,
      .logined {
        font-size: 16px;
        height: 3rem;
        color: #fff;
        overflow: hidden;
      }
      .to__login{
        span{
          font-size: 16px;
          margin-bottom: .5rem;
          display: block;
        }
        p{
          font-size: 14px;
        }
      }
      .logined {
        .user__name {
          margin-bottom: .5rem;
        }
        i {
          margin-right: .25rem;
        }
      }
    }
  }
  .top__bar {
    position: fixed;
    width: 100%;
    top: 7.65rem;
    z-index: 1;
    border-bottom: 1px solid #ccc;
    ul {
      background: #fff;
      li {
        width: 25%;
        float: left;
        margin: .5rem 0;
        font-size: 14px;
        text-align: center;
        box-sizing: border-box;
        position: relative;
        .line {
          height: 1.5rem;
          position: absolute !important;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          @include border(right, #bbb, dashed);
        }
        i {
          font-size: 20px;
          margin-bottom: .25rem;
          display: block;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }
  .todo__wrapper {
    margin-top: 11.5rem;
    margin-bottom: 3rem;
    .todo__list {
      margin-bottom: .5rem;
      .list-view {
        ul {
          background: #fff;
          li {
            &:last-child {
              .item-content {
                .item-inner {
                  &:after {
                    border: 0;
                  }
                }
              }
            }
            .item-title {
              line-height: 2.5rem;
              margin-left: .75rem;
              @include border(bottom, $grey-ddd);
              span {
                font-size: 16px;
              }
            }
            .item-content {
              line-height: 2.5rem;
              .item-inner {
                margin-left: .75rem;
                font-size: 14px;
                color: $font-primary;
                @include border(bottom, $grey-ddd);
                clear: both;
                i.left__icon {
                  font-size: 15px;
                  margin-right: .5rem
                }
                .right__icon {
                  color: $grey-ddd;
                  float: right;
                  margin-right: .75rem;
                  font-size: 15px;
                  .balNum {
                    margin-right: .5rem;
                    color: #bbb;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>
