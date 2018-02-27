<template>
  <div class="v-button">
    <div class="btn" :class="[type,{'unblock':unblock!=null},{'plain':plain!=null}]" @click="click">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "v-button",
    props: ['type', 'disabled', 'unblock', 'plain'],
    data() {
      return {}
    },
    computed: {
      btnClass() {
        switch (this.type) {
          default:
            return ''
        }
      }
    },
    methods: {
      click() {
        this.$emit('click')
      }
    }
  }

</script>

<style scoped lang="scss">
  .v-button {
    text-align: center;
    .btn {
      margin: 0 1rem;
      border-radius: 4px;
      padding: .6rem 0;
      font-size: 0.8rem;
      text-align: center;
      color: #fff;
      background: $primary;
      /*-webkit-tap-highlight-color: transparent;*/
      user-select: none;
      //@include border(all, $primary-level-2);
      &:after {
        border-radius: 8px;
      }
      &:active {
        background: $primary-level-2;
      }
      &.unblock {
        display: inline-block;
        padding: .6rem 1.5rem;
      }
      &.plain {
        background: #fff;
        border: 1px solid $primary;
        color: $primary;
        &:active {
          color: $primary-level-2;
        }
      }
    }
  }
</style>
