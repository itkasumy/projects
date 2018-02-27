<template>
  <div class="seller-list">
    <v-header :title="sellerType.name"/>
    <ul class="list">
      <li class="seller-item" v-for="(item, index) in sellerList" :key="index">
        <seller-list-card :item="item"/>
      </li>
    </ul>
    <div class="load-text" v-if="sellerList.length > 0">
      <span v-if="loadedAll">已加载全部</span>
      <span v-else><v-loading size="tiny"/></span>
    </div>
    <common-no-data type="shop" message="未找到商家" v-if="!loading && sellerList.length === 0"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import SellerListCard from '@/components/seller/seller-list-card'
  import CommonNoData from '@/components/common/common-no-data'

  export default {
    name: "seller-list",
    components: {SellerListCard, CommonNoData},
    data() {
      return {
        loading: false,
        loadedAll: false,
        location: null,
        sellerList: [],
        pageSize: 8,
        currentPage: 1,
      }
    },
    computed: {
      ...mapState('seller', ['sellerType'])
    },
    mounted() {
      // localStorage.setItem('location', JSON.stringify({
      //   "lat": 30.89440999999999,
      //   "lon": 120.08680900000002,
      //   "cityName": "湖州市"
      // }))
      let location = localStorage.getItem('location');
      if (!location) {
        this.$toast.error('请重新地位')
        return
      }
      this.location = JSON.parse(location)
      this.initData()
      window.addEventListener('scroll', this.scrollHandler)
    },
    methods: {
      async initData() {
        this.loading = true
        this.$toast.loading()
        let data = {
          lat: this.location.lat,
          lon: this.location.lon,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          type: this.sellerType.id
        }
        let {data: res} = await this.$http.post('/openservice/sortSeller', data)
        if (res.code === 1) {
          let {content} = res.data
          content.forEach((item) => {
            this.sellerList.push(item)
          })
          if (content.length < this.pageSize) {
            this.loadedAll = true
            window.removeEventListener('scroll', this.scrollHandler)
          }
          this.currentPage++
          this.$toast.close()
        } else {
          this.$toast.error(res.message)
        }
        this.loading = false
      },
      async scrollHandler() {
        let distance = this.$getBottomDistance()
        if (distance < 100 && !this.loading) {
          this.loading = true
          let data = {
            lat: this.location.lat,
            lon: this.location.lon,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            type: this.sellerType.id
          }
          let {data: res} = await this.$http.post('/openservice/sortSeller', data)
          if (res.code === 1) {
            let {content} = res.data
            if (content.length === 0) {
              this.loadedAll = true
              window.removeEventListener('scroll', this.scrollHandler)
            } else {
              content.forEach((item) => {
                this.sellerList.push(item)
              })
              this.currentPage++
            }
          } else {
            this.$toast.error(res.message)
          }
          this.loading = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .seller-list {
    .v-header {
      position: fixed;
      top: 0;
      width: 100%;
    }
    ul.list {
      padding-top: 2.2rem;
    }
    .load-text {
      text-align: center;
      font-size: 14px;
      margin: 0.5rem 0;
    }
  }
</style>
