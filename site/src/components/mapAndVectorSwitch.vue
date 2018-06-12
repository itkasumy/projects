<template>
  <div class="container">
    <div class="png" :class="{active: inPngPage}" @click="swimToPng"></div>
    <div class="satellite" :class="{active: inSatellitePage}" @click="swimToSatellite"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      url: {
        type: String
        // default: '/personManage/personTrack'
      },
      inSatellitePage: false,
      inPngPage: false
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
    width: 115px;
    height: 92px;
    background: rgba(255, 255, 255, .6);
    overflow: hidden;
    transition: all .5s;
    &:hover {
      width: 210px;
      padding-left: 10px;
      .png {
        width: 94px;
        &.active {
          border: 1px solid #74fdfd;
        }
        &::after {
          width: 32px;
          content: "矢量";
        }
      }
    }
    .satellite, .png {
      position: relative;
      float: left;
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
      background: url("/static/images/vectorMap.png") no-repeat;
      &::after {
        transition: all .5s;
        width: 0;
        content: "";
      }
      &.active {
        border: 0px solid #74fdfd;
      }
    }
  }
</style>

