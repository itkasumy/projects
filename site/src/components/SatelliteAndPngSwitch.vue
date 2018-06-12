<template>
  <div class="container">
    <div class="satellite" :class="{active: inSatellitePage}" :style="{float: direction}" @click="swimToSatellite"></div>
    <div class="png" :class="{active: inPngPage}" :style="{float: direction}" @click="swimToPng"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      url: {
        type: String,
        default: '/home/homePage'
      },
      inSatellitePage: false,
      inPngPage: false,
      direction: {
        validator (v) {
          return /^(left|right)$/.test(v)
        },
        default: 'left'
      }
    },
    methods: {
      swimToSatellite () {
        !this.inSatellitePage && this.$router.push(this.url)
      },
      swimToPng () {
        !this.inPngPage && this.$router.push(this.url)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .container {
    width: 114px;
    height: 92px;
    background: rgba(255, 255, 255, .6);
    overflow: hidden;
    transition: all .5s;
    &:hover {
      width: 218px;
      .png {
        width: 94px;
        &::after {
          width: 32px;
        }
      }
    }
    .satellite, .png {
      position: relative;
      // float: $derection;
      box-sizing: border-box;
      width: 94px;
      height: 72px;
      background: url("/static/images/satelliteMap.png") no-repeat;
      margin: 10px;
      cursor: pointer;
      &.active {
        border: 1px solid #74fdfd;
        &::after {
          background: #409eff;
        }
      }
      &::after {
        position: absolute;
        content: "卫星";
        width: 32px;
        height: 20px;
        top: 0;
        right: 0;
        line-height: 20px;
        font-size: 12px;
        color: #fff;
      }
    }
    .png {
      transition: all .5s;
      width: 0;
      margin: 10px 0 0;
      overflow: hidden;
      background: url("/static/images/vectorMap.png") no-repeat;
      &::after {
        transition: all .5s;
        min-width: 30px;
        content: "矢量";
      }
    }
  }
</style>
