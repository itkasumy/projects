<template>
  <div class="seller-list">
    <div v-for="(item, index) in sellerList" :key="index" @click="toSeller(item)">
      <div>
        <img src="" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "seller-list",
    props: ['sellerList'],
    data() {
      return {}
    },
    computed: {},
    mounted() {
    },
    methods: {
      toSeller(item) {
        this.$router.push(`/seller/${item.sellerId}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .seller-list {

  }
</style>
