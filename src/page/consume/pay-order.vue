<template>
  <div class="pay-order">
    <common-header/>
    <div class="main">
      <!--支付方式-->
      <pay-method/>
      <!--支付-->
      <pay-info/>
    </div>
    <common-footer/>
  </div>
</template>

<script>
  import PayMethod from "../../components/consume/pay-method"
  import PayInfo from "../../components/consume/pay-info"

  export default {
    name: "pay-order",
    components: {PayInfo, PayMethod},
    data() {
      return {}
    },
    computed: {
      orderId() {
        return this.$route.params.id
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="scss">
  .pay-order {
    .main {
      @include container;
      background: #fff;
      margin-top: 20px;
      padding: 30px;
      min-height: 700px;
      overflow: hidden;
    }
  }
</style>
