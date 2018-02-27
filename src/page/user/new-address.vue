<template>
  <div class="add-address">
    <v-header title="新增收货地址"/>
    <div class="form">
      <v-input placehoder="请输入姓名"/>

    </div>
    <v-button>添加</v-button>
  </div>
</template>

<script>
  export default {
    name: "add-address",
    props: [],
    components: {},
    data() {
      return {}
    },
    computed: {},
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .add-address {
    .v-button {
       margin-top: 2rem;
    }
  }
</style>
