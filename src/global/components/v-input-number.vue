<template>
  <div class="v-input-number">
    <div class="minus" @click="minus"></div>
    <div class="plus" @click="plus"></div>
    <div class="num">{{number}}</div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    name: "v-input-number",
    props: {
      goods: {required: true}
    },
    computed: {
      ...mapGetters('cart', ['getNumInCart']),
      number() {
        // console.log(this.goods)
        let {goods, getNumInCart} = this
        return getNumInCart(goods.id)
      }
    },
    mounted() {
    },
    methods: {
      ...mapMutations('cart', ['addToCart', 'removeFromCart']),
      minus() {
        // this.$emit('minus')
        this.removeFromCart(this.goods)
      },
      plus() {
        // this.$emit('plus')
        this.addToCart(this.goods)
      }
    }
  }
</script>

<style scoped lang="scss">
  .v-input-number {
    display: inline-block;
    overflow: hidden;
    .num {
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      margin: 0 1.2rem;
      padding: 0 0.5rem;
    }
    @mixin button {
      width: 1.2rem;
      height: 1.2rem;
      box-sizing: border-box;
      border-radius: 50%;
      border: 1px solid #F0F0F0;
    }
    @mixin line {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 4px;
      transform: translate(-50%, -50%);
    }
    .minus {
      @include button;
      float: left;
      position: relative;
      background: #fff;
      &:active {
        background: #F0F0F0;
      }
      &:before {
        @include line;
        width: 8px;
        height: 2px;
        background: #666;
      }
    }
    .plus {
      @include button;
      float: right;
      position: relative;
      background: $primary;
      &:active {
        background: $primary-level-2;
      }
      &:before {
        @include line;
        width: 8px;
        height: 2px;
        background: #fff;
      }
      &:after {
        @include line;
        width: 2px;
        height: 8px;
        background: #fff;
      }
    }
  }
</style>
