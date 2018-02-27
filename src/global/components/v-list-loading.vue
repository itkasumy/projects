<template>
  <div class="v-list-loading">
    <i class="iconfont icon-loading"/>
  </div>
</template>

<script>
  export default {
    name: "v-list-loading",
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
  .v-list-loading {
    text-align: center;
    i {
      @include rotating;
      font-size: 20px;
    }
  }
</style>
