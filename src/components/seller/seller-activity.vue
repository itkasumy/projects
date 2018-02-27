<template>
  <div class="seller-activity">
    <img src="@/assets/img/img-1.png" class="img-1">
    <img src="@/assets/img/img-2.png" class="img-2">
    <img src="@/assets/img/img-3.png" class="img-3">
    <img src="@/assets/img/img-4.png" class="img-4">
  </div>
</template>

<script>
  export default {
    name: "seller-activity",
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .seller-activity {
    height: 7rem;
    position: relative;
    @mixin img {
      position: absolute;
      width: 33.33%;
      box-sizing: border-box;
    }
    .img-1 {
      @include img;
      height: 6rem;
      left: 0;
      top: 0;
      padding-left: 0.5rem;
      padding-right: 0.25rem;
    }
    .img-2 {
      @include img;
      height: 6rem;
      left: 33.33%;
      top: 0;
      padding: 0 0.25rem;
    }
    .img-3 {
      @include img;
      height: 3rem;
      right: 0;
      top: 0;
      padding-left: 0.25rem;
      padding-right: 0.5rem;
      padding-bottom: 0.25rem;
    }
    .img-4 {
      @include img;
      height: 3rem;
      right: 0;
      top: 3rem;
      padding-left: 0.25rem;
      padding-right: 0.5rem;
      padding-top: 0.25rem;
    }
  }
</style>
