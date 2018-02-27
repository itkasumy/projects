<template>
  <div class="rate">
    <!--头部-->
    <common-header/>
    <!--商家头部-->
    <seller-header v-if="!error"/>
    <!--主内容-->
    <div class="main">
      <seller-rate class="seller-rate" :rateList="rateList" :loading="loading" :loadAll="loadAll" v-if="!error"/>
      <seller-announce class="announce" type="2" :count="count" v-if="!error"/>
    </div>
    <common-no-data v-if="error" message="店铺不存在" style="min-height: 580px; padding-top: 100px;"/>
    <!--底部-->
    <common-footer/>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import SellerHeader from "../../components/seller/seller-header"
  import SellerAnnounce from "../../components/seller/seller-announce"
  import SellerRate from '../../components/seller/seller-rate'

  export default {
    name: "rate",
    components: {SellerHeader, SellerAnnounce, SellerRate},
    data() {
      return {
        error: false,
        loading: false,
        loadAll: false,
        location: null,
        count: 0,
        avg: 0,
        pageSize: 8,
        currentPage: 1,
        rateList: []
      }
    },
    computed: {
      sellerId() {
        return this.$route.params.id
      }
    },
    async mounted() {
      let location = localStorage.getItem('location')
      if (location) {
        this.location = JSON.parse(location)
        let res = await this.getSellerRate()
        if (res.code === 1 && res.data.page.content.length < this.pageSize) {
          this.loadAll = true
        } else if (res.code === 1) {
          window.addEventListener('scroll', this.scrollHandler)
        }
      }
    },
    methods: {
      ...mapActions('seller', ['ajaxSellerRate']),
      async getSellerRate() {
        if (this.loading) return
        this.loading = true
        let {sellerId, pageSize, currentPage} = this
        let {lat, lon} = this.location
        let res = await this.ajaxSellerRate({sellerId, pageSize, currentPage, lat, lon})
        if (res.code === 1) {
          this.count = res.data.map.count
          this.avg = parseFloat(res.data.map.avg)
          res.data.page.content.forEach(item => {
            item.photos = item.commemtPic ? item.commemtPic.split(',') : []
            this.rateList.push(item)
          })
        }else {
          this.error = true
        }
        this.loading = false
        return res
      },
      async scrollHandler() {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let distance = scrollHeight - clientHeight - scrollTop
        if (distance < 500) {
          this.currentPage += 1
          let res = await this.getSellerRate()
          if (res && res.code === 1 && res.data.page.content.length < this.pageSize) {
            window.removeEventListener('scroll', this.scrollHandler)
            this.loadAll = true
          }
        }
      }
    }
  }

</script>
<style scoped lang="scss">
  .rate {
    .main {
      @include container;
      overflow: hidden;
    }
    .seller-rate {
      float: left;
    }
    .announce {
      float: right;
    }
  }

</style>
