<template>
  <div class="v-header" :class="{transparent : type === 'transparent'}">
    <div class="back" @click="$goBack"><i class="iconfont icon-return" /></div>
    <div class="title">{{ title }}</div>
    <router-link class="link" :to="linkUrl" v-if="linkUrl">{{ link }}</router-link>
  </div>
</template>
<script>
export default {
  name: "v-header",
  props: ['type', 'title', 'link', 'linkUrl']
}

</script>
<style scoped lang="scss">
.v-header {
  z-index: 1;
  background-color: #fff;
  height: 2.2rem;
  line-height: 2.2rem;
  position: relative;
  @include border-bottom(#ddd);
  .back {
    position: absolute;
    top: 0;
    left: 0.8rem;
    -webkit-tap-highlight-color: transparent;
    i {
      font-size: 24px;
    }
    &:active {
      color: #ddd;
    }
  }
  .link {
    position: absolute;
    top: 0;
    right: 0.8rem;
    font-size: 16px;
  }
  .title {
    font-size: 18px;
    text-align: center;
  }
  &.transparent {
    color: #fff;
    background: transparent;
    &:after {
      background: transparent;
    }
  }
}

</style>
