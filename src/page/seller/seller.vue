<template>
  <div class="seller">
    <common-header/>
    <seller-header v-if="!error"/>
    <div class="main">
      <seller-goods class="goods" :goodsList="goodsList" :loading="loading" v-if="!error"/>
      <seller-announce class="announce" type="1" v-if="!error"/>
    </div>
    <common-no-data v-if="error" message="店铺不存在" style="min-height: 580px; padding-top: 100px;"/>
    <seller-cart v-if="!error"/>
    <common-footer/>
  </div>
</template>

<script>
  import {mapActions, mapMutations} from 'vuex'
  import SellerHeader from "../../components/seller/seller-header"
  import SellerGoods from "../../components/seller/seller-goods"
  import SellerCart from "../../components/seller/seller-cart"
  import SellerAnnounce from "../../components/seller/seller-announce"

  export default {
    name: "seller",
    components: {SellerAnnounce, SellerCart, SellerGoods, SellerHeader},
    data() {
      return {
        goodsList: [],
        loading: false,
        error: false
      }
    },
    computed: {
      sellerId() {
        return this.$route.params.id
      }
    },
    mounted() {
      this.clearCart()
      this.getSellerGoods()
    },
    methods: {
      ...mapMutations('order', ['clearCart']),
      ...mapActions('seller', ['ajaxSellerGoods']),
      async getSellerGoods() {
        this.loading = true
        let {sellerId} = this
        let res = await this.ajaxSellerGoods({sellerId})
        if (res.code === 1) {
          res.data.forEach(item => {
            this.goodsList.push(item)
          })
        } else {
          this.error = true
        }
        this.loading = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .seller {
    .main {
      @include container;
      overflow: hidden;
    }
    .goods {
      float: left;
    }
    .announce {
      float: right;
    }
  }
</style>
