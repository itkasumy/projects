<template>
  <div class="v-input">
    <input :type="type" :placeholder="placeholder" :value="value" @input="inputEvent($event.target.value)">
  </div>
</template>

<script>
  export default {
    name: "v-input",
    props: ['type', 'placeholder', 'value'],
    methods: {
      inputEvent(value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style scoped lang="scss">
  .v-input {
    background: #fff;
    border-bottom: 1px solid #ddd;
    /*@include border-bottom(#ddd);*/
    input {
      width: 100%;
      height: 2.25rem;
      border-radius: 0;
      border: none;
      outline: none;
      -webkit-appearance: none;
      padding: 0 .75rem;
      font-size: 16px;
      box-sizing: border-box;
      &::placeholder {
        color: #ccc;
      }
    }
    &.indent{
      margin-left: .75rem;
      input{
        padding-left: 0;
      }
    }
    &.nobd{
      border:0;
    }
  }
</style>
