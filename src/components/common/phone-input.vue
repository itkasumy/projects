<template>
  <div class="phone-input">
    <input type="tel" placeholder="手机号码" :value="value" @input="inputEvent($event.target.value)">
    <div class="button" @click="click">获取验证码</div>
  </div>
</template>

<script>
  export default {
    name: "phone-input",
    props: ['value'],
    methods: {
      inputEvent(value) {
        this.$emit('input', value)
      },
      click() {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped lang="scss">
  .phone-input {
    display: flex;
    background: #fff;
    @include border-bottom(#ddd);
    input {
      flex: 3;
      height: 2.4rem;
      border-radius: 0;
      border: none;
      outline: none;
      -webkit-appearance: none;
      padding: 0 1rem;
      font-size: 16px;
      box-sizing: border-box;
      &::placeholder {
        color: #ccc;
      }
    }
    .button {
      flex: 1;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      margin-right: 0.5rem;
      margin-top: 0.5rem;
      border-radius: 4px;
      font-size: 13px;
      border: 1px solid $primary;
      color: $primary;
      background: rgba(255, 100, 76, 0.1);
      box-sizing: border-box;
      &:active {
        background: $primary;
        color: #fff;
      }
    }
  }
</style>
