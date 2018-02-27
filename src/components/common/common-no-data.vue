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
  img {
    display: block;
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
  }
  h3 {
    text-align: center;
    color: #999 !important;
    margin-top: 20px;
    font-size: 24px !important;
    padding-bottom: 40px;
  }
}

</style>
