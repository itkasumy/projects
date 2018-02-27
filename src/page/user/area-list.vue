<template>
  <div class="area-list">
    <v-header title="地区"/>
    <!--<div class="search">-->
    <!--<i class="iconfont icon-search"/>-->
    <!--<input type="text" v-model="keyword">-->
    <!--</div>-->
    <div v-for="item in country">
      <v-list-item :title="item.countryName" @click="chooseArea(item)"/>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import Country from '@/assets/json/country-chinese'

  export default {
    name: "area-list",
    data() {
      return {
        country: Country.data,
        keyword: null
      }
    },
    methods: {
      ...mapMutations('user', ['setAreaCode']),
      chooseArea(item) {
        this.setAreaCode(item)
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
  .area-list {
    .search {

    }
  }
</style>
