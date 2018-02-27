<template>
  <div class="balance bg-white">
    <v-header title="账户余额" link="交易记录" linkUrl="/user/balance-list" class="u-fixed-header"></v-header>
    <div class="u-main-content fixed " v-if="!loading">
      <div class="title">账户余额</div>
      <p class="mon">{{balance}} P</p>
      <v-button type="primary" class="recharg">充值</v-button>
      <v-button type="primary" plain>取现</v-button>
      <p class="pro">常见问题</p>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "balance",
    props: [],
    components: {},
    data() {
      return {
        loading: true,
        balance: null
      }
    },
    computed: {},
    mounted() {
      this.getBalance();
    },
    methods: {
      ...mapActions('user', ['ajaxBalanceAndCoupon']),
      async getBalance() {
        let self = this;
        self.loading = true;
        self.$toast.loading();
        let res = await this.ajaxBalanceAndCoupon();
        self.$toast.close();
        self.loading = false;
        if (self.$checkData(res)) {
          self.balance = res.data.BalanceSize;
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .balance {
    .u-main-content {
      text-align: center;
      .title {
        margin-top: 4.5rem;
        font-size: 18px;
        color: $font-important;
      }
      .mon {
        margin-top: 1.5rem;
        font-size: 24px;
        color: $font-important;
        margin-bottom: 5.95rem;
      }
      .recharg {
          margin-bottom: 1rem;
      }
      .pro{
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: $primary;
        position: absolute;
        bottom: 1rem;
      }
    }
  }
</style>
