<template>
  <div class="v-score">
    <i class="iconfont icon-shoucangicon1" :class="{'active':index<=intNum}" v-for="index in 5"
       :style="{'font-size':size}" @click="change(index)">
      <i class="iconfont icon-shoucangicon1 active inner" v-if="deciNum!==0 && index===intNum+1"
         :style="{'font-size':size,'width':deciWidth}"/>
    </i>
  </div>
</template>
<script>
  export default {
    name: "v-score",
    props: {
      disabled: {default: null},
      value: {default: 0},
      size: {default: '16px'}
    },
    data() {
      return {
        val: this.value,
      }
    },
    computed: {
      dis() {
        return this.disabled !== null;
      },
      intNum() {
        return parseInt(this.val);
      },
      deciNum() {
        return (this.val * 10) % 10;
      },
      deciWidth() {
        return this.deciNum * 10 + '%';
      }
    },
    mounted() {
    },
    methods: {
      change(index) {
        if (this.dis) return
        this.value = index
      }
    }
  }
</script>

<style scoped lang="scss">
  .v-score {
    display: inline-block;
    i {
      position: relative;
      color: #ccc;
      margin-right: .25rem;
      &:last-child {
        margin-right: .5rem;
      }
      &.active {
        color: $primary;
      }
      &.inner {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        overflow: hidden;
      }
    }
  }
</style>
