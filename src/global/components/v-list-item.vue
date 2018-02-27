<template>
  <div class="v-list-item" @click="click">
    <div class="icon" v-if="icon">
      <i class="iconfont" :class="icon"/>
    </div>
    <div class="title">{{ title }}</div>
    <div class="item-after" v-if="after">{{ after }}</div>
    <div class="arrow">
      <i class="iconfont icon-enter"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "v-list-item",
    props: ['icon', 'title', 'after'],
    data() {
      return {}
    },
    methods: {
      click() {
        console.log('xs')
        this.$emit('click')
      }
    }
  }
</script>

<style scoped lang="scss">
  .v-list-item {
    height: 2.2rem;
    line-height: 2.2rem;
    box-sizing: border-box;
    position: relative;
    user-select: none;
    background: #fff;
    @include border-bottom(#ddd);
    &:active {
      background: #ddd;
    }
    .icon {
      display: inline-block;
      height: 2.2rem;
      float: left;
      margin-left: 0.5rem;
      i {
        font-size: 20px;
      }
    }
    .title {
      display: inline-block;
      font-size: 16px;
      height: 2.2rem;
      width: calc(100% - 6rem);
      padding-left: 1rem;
      box-sizing: border-box;
      @include text-over;
    }
    .item-after {
      display: inline-block;
      height: 2.2rem;
      position: absolute;
      right: 2rem;
      top: 0;
      font-size: 14px;
      color: #333;
      width: 2.5rem;
      text-align: right;
    }
    .arrow {
      position: absolute;
      right: 0.8rem;
      top: 0;
      font-size: 20px;
      font-weight: bold;
      color: #c8c7cc;
      height: 2.2rem;
    }
  }
</style>
