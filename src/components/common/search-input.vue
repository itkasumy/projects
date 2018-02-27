<template>
  <div class="search-input">
    <i class="iconfont icon-search"/>
    <input type="text" placeholder="搜索内容" @focus="onFocus" @keyup.enter="search">
  </div>
</template>

<script>
  export default {
    name: "search-input",
    props: [],
    components: {},
    data() {
      return {}
    },
    computed: {},
    mounted() {

    },
    methods: {
      onFocus() {
        let path = this.$route.path
        if (path !== '/search') {
          this.$router.push('/search')
        } else {
          console.log(path)
        }
      },
      search() {
        console.log('搜索')
      }
    }
  }
</script>

<style scoped lang="scss">
  .search-input {
    width: 100%;
    margin: 0.3rem 0;
    padding: 0 0.5rem;
    box-sizing: border-box;
    position: relative;
    input {
      outline: none;
      border: none;
      width: 100%;
      height: 1.2rem;
      border-radius: 4px;
      background: #F5F5F5;
      padding-left: 1rem;
      box-sizing: border-box;
    }
    i {
      position: absolute;
      top: 0.3rem;
      left: 0.6rem;
      font-size: 14px;
    }
  }
</style>
