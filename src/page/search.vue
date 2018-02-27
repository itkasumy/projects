<template>
  <div class="search">
    <v-header title="搜索"/>
    <search-input/>
    <!--<input type="text" v-focus>-->
  </div>
</template>

<script>
  import SearchInput from "@/components/common/search-input"

  export default {
    name: "search",
    components: {SearchInput},
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
  .search {

  }
</style>
