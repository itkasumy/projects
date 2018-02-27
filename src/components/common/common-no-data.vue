<template>
  <div class="common-no-data">
    <img :src="img">
    <h3>{{message}}</h3>
  </div>
</template>

<script>
  import commonImg from '../../assets/img/null-common.png'
  import shopImg from '../../assets/img/null-shop.png'
  import orderImg from '../../assets/img/null-order.png'

  export default {
    name: "common-no-data",
    props: ['type', 'message'],
    data() {
      return {
        img: null
      }
    },
    mounted() {
      switch (this.type) {
        case ('shop'):
          this.img = shopImg
          break
        case ('order'):
          this.img = orderImg
          break
        default:
          this.img = commonImg
      }
    }
  }

</script>

<style scoped lang="scss">
  .common-no-data {
    margin-bottom: 1rem;
    img {
      display: block;
      max-width: 400px;
      width: 100%;
      margin: 0 auto;
      padding-top: 3.5rem;
    }
    h3 {
      text-align: center;
      color: #666 !important;
      margin-top: .5rem;
      font-size: 16px !important;
      padding: 0 .75rem;
    }
  }
</style>
