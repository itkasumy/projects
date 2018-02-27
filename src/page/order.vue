<template>
  <div class="order">
    <div class="header">订单</div>
    <ul class="order-type">
      <li class="u-link-bg" :class="{active:type===1}" @click="changeType(1)"><span>全部</span></li>
      <li class="u-link-bg" :class="{active:type===2}" @click="changeType(2)"><span>待评价</span></li>
      <li class="u-link-bg" :class="{active:type===3}" @click="changeType(3)"><span>退款</span></li>
    </ul>
    <div class="order__list">
      <template v-if="notLogin && !loading">
        <common-no-data message="您还未登录，请登录后查看订单！"/>
        <v-button unblock @click="toUrl('/user/login')">去登陆</v-button>
      </template>
      <template v-if="orderList.length === 0 && !loading && !notLogin">
        <common-no-data type="order" message="暂无订单内容哦"/>
        <v-button unblock @click="toUrl('/home')">去逛逛吧</v-button>
      </template>
      <order-list v-for="(item, index) in orderList" :key="index" :item="item" :type="orderTypeId" v-if="!loading"/>
    </div>
    <tab-bar/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import TabBar from '@/components/common/tab-bar'
  import CommonNoData from '@/components/common/common-no-data'
  import OrderList from '@/components/order/order-list'
  import BetterScroll from 'better-scroll'

  export default {
    name: "order",
    components: {TabBar, CommonNoData, OrderList},
    data() {
      return {
        orderList: [],
        pageSize: 8,
        currentPage: 1,
        totalPage: 0,
        loading: true,
        type: 1,
        notLogin: false
      }
    },
    computed: {
      orderTypeId() {
        switch (this.$route.params.type) {
          case 'all':
            return 1;
            break;
          case 'evaluate':
            return 2;
            break;
          case 'refund':
            return 3;
            break;
          default:
            return 1;
        }
      }
    },
    async mounted() {
      this.type = this.orderTypeId;
      this.initData();
    },
    methods: {
      ...mapActions('order', ['ajaxOrderList']),
      async initData() {
        this.orderList = []
        this.loading = true;
        this.$toast.loading()
        let {pageSize, currentPage} = this
        let res = await this.ajaxOrderList({pageSize, currentPage, type: this.type})
        this.$toast.close();
        this.loading = false;
        if (res.code === 401) {
          this.notLogin = true;
        } else {
          if (this.$checkData(res)) {
            this.totalPage = res.data.totalPages * 10
            res.data.content.forEach(item => {
              this.orderList.push(item)
            })
          }
        }
      },
      async changeType(type) {
        if (type !== this.type) {
          this.type = type;
          this.initData();
        }
        window.scrollTo(0, 0)
      },
      toUrl(url) {
        this.$router.push(url);
      }
    }
  }

</script>

<style scoped lang="scss">
  .order {
    .header {
      text-align: center;
      line-height: 2.2rem;
      background: #fff;
      font-size: 18px;
      position: fixed;
      width: 100%;
      top: 0;
    }
    ul.order-type {
      border-top: 1px solid $grey-ddd;
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
    .order__list {
      margin-top: 4.55rem;
      margin-bottom: 2.5rem;
    }
  }

</style>
