<template>
  <div class="v-loading" :class="size">
    <div class="wrap" v-for="i in 12" :key="i">
      <span :style="{background: color}"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "v-loading",
    props: {
      color: {default: '#000'},
      size: {default: 'middle'}
    }
  }
</script>

<style scoped lang="scss">
  .v-loading {
    position: relative;
    &.middle {
      width: 2rem;
      height: 2rem;
      border-radius: 4px;
      margin: 1rem auto 0;
      span {
        width: .2rem;
        height: 0.5rem;
        margin: 0 auto;
        border-radius: .1rem;
      }
    }
    &.tiny {
      width: 1rem;
      height: 1rem;
      border-radius: 2px;
      margin: 0 auto;
      span {
        width: .1rem;
        height: 0.25rem;
        margin: 0 auto;
        border-radius: .05rem;
      }
    }
    div.wrap {
      display: inline-block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      span {
        display: block;
        animation: fadeDelay 1.2s infinite ease-in-out both;
      }
      @for $i from 1 through 13 {
        &:nth-child(#{$i}) {
          $deg: ($i - 1) * 30;
          transform: rotate(#{$deg}deg);
          @if ($i > 1) {
            span {
              $delay: ($i * 0.1) - 1.3;
              animation-delay: #{$delay}s;
            }
          }
        }
      }
      @keyframes fadeDelay {
        0%, 39%, 100% {
          opacity: .3;
        }
        40% {
          opacity: 1;
        }
      }
    }
  }
</style>
