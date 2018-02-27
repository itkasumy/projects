<template>
  <div class="seller-list">
    <ul class="filter-list">
      <li>默认排序</li>
      <li>销量优先</li>
      <li>距离最近</li>
      <li>评分最高</li>
    </ul>
    <div class="list">
      <div></div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import SellerListCard from '@/components/seller/seller-list-card'

  export default {
    name: "seller-list",
    components: {SellerListCard},
    data() {
      return {
        location: null,
        sellerList: [{}]
      }
    },
    computed: {},
    mounted() {
      // let location = localStorage.getItem('location')
      // if(!location)
      this.location = {}
    },
    methods: {
      ...mapActions('seller', ['ajaxSellerList']),
      initEvent() {
        window.addEventListener('scroll', this.scrollHandler)
      },
      async getSellerList() {

      },
      async scrollHandler() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .seller-list {

  }
</style>
