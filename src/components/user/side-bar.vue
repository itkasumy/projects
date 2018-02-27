<template>
  <div class="pc__side__bar">
    <h2>个人中心</h2>
    <ul class="nav">
      <li @click="changeDisplay(1)" :class="[{active:pageId==='1' || pageId==='2' || pageId==='3'},{open:order}]" class="nav__li">
        <div class="title">
          <div class="left">
            <i class="iconfont icon-dingdanicon"></i>
            <span>{{$t('sideBar.nav.myOrder')}}</span>
          </div>
          <i class="iconfont icon-unfold"></i>
        </div>
        <ul class="subnav">
          <li :class="{active:pageId==='1'}" @click.stop="toUrl('/user/my-order/all')">
            {{$t('sideBar.subNav.delOrder')}}
          </li>
          <li :class="{active:pageId==='2'}" @click.stop="toUrl('/user/my-order/evaluate')">
            {{$t('sideBar.subNav.evaOrder')}}
          </li>
          <li :class="{active:pageId==='3'}" @click.stop="toUrl('/user/my-order/refund')">
            {{$t('sideBar.subNav.refOrder')}}
          </li>
        </ul>
      </li>
      <li @click="changeDisplay(2)" :class="[{active:pageId==='4' || pageId==='5'},{open:balance}]" class="nav__li">
        <div class="title">
          <div class="left">
            <i class="iconfont icon-zichanicon"></i>
            <span>{{$t('sideBar.nav.myBalance')}}</span>
          </div>
          <i class="iconfont icon-unfold"></i>
        </div>
        <ul class="subnav">
          <li :class="{active:pageId==='4'}" @click.stop="toUrl('/user/my-balance')">
            {{$t('sideBar.subNav.balance')}}
          </li>
          <li :class="{active:pageId==='5'}" @click.stop="toUrl('/user/my-coupon')">
            {{$t('sideBar.subNav.coupon')}}
          </li>
        </ul>
      </li>
      <li @click="changeDisplay(3)" :class="[{active:pageId==='6' || pageId==='7'},{open:account}]" class="nav__li">
        <div class="title">
          <div class="left">
            <i class="iconfont icon-zhanghaoicon1"></i>
            <span>{{$t('sideBar.nav.myAccount')}}</span>
          </div>
          <i class="iconfont icon-unfold"></i>
        </div>
        <ul class="subnav">
          <li :class="{active:pageId==='6'}" @click.stop="toUrl('/user/my-account')">
            {{$t('sideBar.subNav.account')}}
          </li>
          <li :class="{active:pageId==='7'}" @click.stop="toUrl('/user/my-address')">
            {{$t('sideBar.subNav.address')}}
          </li>
        </ul>
      </li>
      <li @click="changeDisplay(4)" :class="[{active:pageId==='8'},{open:collection}]" class="nav__li">
        <div class="title">
          <div class="left">
            <i class="iconfont icon-shoucangicon"></i>
            <span>{{$t('sideBar.nav.myCollection')}}</span>
          </div>
          <i class="iconfont icon-unfold"></i>
        </div>
        <ul class="subnav">
          <li :class="{active:pageId==='8'}" @click.stop="toUrl('/user/my-collection')">
            {{$t('sideBar.subNav.collection')}}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: false,
      balance: false,
      account: false,
      collection: false
    }
  },
  props: ['pageId'],
  mounted() {
    this.initPage();
  },
  watch: {
    pageId() {
      this.initPage()
    }
  },
  methods: {
    toUrl(url) {
      this.$router.push(url)
    },
    changeDisplay(page) {
      switch (page) {
        case 1:
          this.order = !this.order
          break;
        case 2:
          this.balance = !this.balance
          break;
        case 3:
          this.account = !this.account
          break;
        case 4:
          this.collection = !this.collection
          break;
      }
    },
    initPage() {
      let pageId = this.pageId;
      if (pageId === '1' || pageId === '2' || pageId === '3') {
        this.order = true
      }
      if (pageId === '4' || pageId === '5') {
        this.balance = true
      }
      if (pageId === '6' || pageId === '7') {
        this.account = true
      }
      if (pageId === '8') {
        this.collection = true
      }
    }
  }
}

</script>
<style scope lang="scss">
.pc__side__bar {
  width: 100%;
  background: #fff;
  min-height: 789px;
  h2 {
    font-size: 18px;
    margin-bottom: 30px;
    padding: 35px 35px 0 35px;
  }
  .nav {
    li {
      user-select: none;
      cursor: pointer;
      .icon-unfold {
        transition-duration: .5s;
      }
      &.open {
        .icon-unfold {
          transform: rotate(180deg);
        }
        .subnav {
          display: block;
        }
      }
      &.active,
      &:hover {
        .title {
          border-left: 2px solid #888;
          color: #333;
        }
      }
    }
    .title {
      font-size: 16px;
      height: 75px;
      line-height: 75px;
      padding: 0 35px;
      border-left: 2px solid transparent;
      .left {
        display: inline-block;
        i {
          margin-right: 18px;
          position: relative;
        }
      }
      .icon-unfold {
        float: right;
      }
    }
    .subnav {
      display: none;
      li {
        height: 50px;
        line-height: 50px;
        padding: 0 35px;
        background: $bg-gray--light;
        padding-left: 80px;
        user-select: none;
        &.active,
        &:hover {
          color: $imp-color;
          font-weight: 600;
        }
      }
    }
  }
}

</style>
