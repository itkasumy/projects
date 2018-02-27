<template>
  <div class="verify-input">
    <input placeholder="验证码" :value="value" @input="inputEvent($event.target.value)">
    <div class="icon" v-if="loading">
      <i class="iconfont icon-loading icon-rotating"/>
    </div>
    <img :src="codeImg" @click="getCodeImg" v-else>
  </div>
</template>

<script>
  export default {
    name: "verify-input",
    props: ['value', 'codeImg', 'loading'],
    methods: {
      inputEvent(value) {
        this.$emit('input', value)
      },
      getCodeImg() {
        this.$emit('getCodeImg')
      }
    }
  }
</script>

<style scoped lang="scss">
  .verify-input {
    display: flex;
    background: #fff;
    /*border-bottom: 1px solid #ddd;*/
    input {
      flex: 3;
      height: 2.4rem;
      border-radius: 0;
      border: none;
      outline: none;
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
      padding: 0 1rem;
      font-size: 16px;
      box-sizing: border-box;
      &::placeholder {
        color: #ccc;
      }
    }
    img {
      flex: 1;
      height: 1.6rem;
      margin-right: 0.5rem;
      margin-top: 0.4rem;
    }
    .icon {
      height: 1.6rem;
      line-height: 1.6rem;
      margin-right: 0.5rem;
      margin-top: 0.4rem;
      width: 4rem;
      text-align: center;
      font-size: 20px;
    }
  }
</style>
