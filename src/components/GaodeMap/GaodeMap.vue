<template>
  <div class="publishWanted" v-if="publishWantedShow">
    <div id="map" ref="gaodeRef"></div>
    <div id="publishWanted">
      <span class="ctrlIcon" :class="releaseNoteShow ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'" @click="releaseNoteShow = !releaseNoteShow"></span>
      <div class="releaseNote" :class="{active: releaseNoteShow}">
        <div class="typeSel">
          <el-select v-model="typeSel" placeholder="请选择发布类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <!-- <div class="destinationSetting">
          <el-button @click="searchDesShow = !searchDesShow" v-show="!searchDesShow" plain>搜索目的地</el-button>
          <el-input v-show="searchDesShow" @keyup.native="searchDestination" v-model="destination" placeholder="请输入搜索目的地"></el-input>
        </div> -->
        <span class="publishIcon" @click="toPublish">发布</span>
      </div>
    </div>
    <!-- <div id="resultDiv" style="background: #fff;"></div> -->
  </div>
</template>

<script>
import IMAP from 'IMAP'
export default {
  data () {
    return {
      mapInstance: null,
      drivingSearch: null,
      releaseNoteShow: false,
      options: [
        {
          value: 1,
          label: '通缉令'
        },
        {
          value: 2,
          label: '图文消息'
        }
      ],
      typeSel: '',
      destination: '',
      searchDesShow: false
    }
  },
  props: {
    startLatLng: {
      type: Object
    },
    destinationLatLng: {
      type: Object
    },
    publishWantedShow: false
  },
  methods: {
    init () {
      this.mapInstance = new IMAP.Map(this.$refs.gaodeRef, {
        minZoom: 4,
        zoom: 15,
        center: new IMAP.LngLat(121.49055, 31.23916),
        animation: true,
        keyboard: true
      })
      // this.mapInstance.addEventListener(IMAP.Constants.CLICK, function (event) {
      //   var lnglat = event.lnglat
      //   alert(`您点击的当前位置为(${lnglat.lng}, ${lnglat.lat})`)
      // }, this.mapInstance)
    },
    routePlan () {
      this.mapInstance.plugin(['IMAP.Driving'], () => {
        this.drivingSearch = new IMAP.Driving({map: this.mapInstance})
        const slnglat = new IMAP.LngLat(this.startLatLng.longitude, this.startLatLng.latitude)
        const elnglat = new IMAP.LngLat(this.destinationLatLng.longitude, this.destinationLatLng.latitude)
        this.drivingSearch.search(slnglat, elnglat, function () {})
      })
    },
    searchDestination (pageNo = 1) {
      this.mapInstance.plugin(['IMAP.PoiSearch'], () => {
        const poiSearch = new IMAP.PoiSearch({
          // panel: 'resultDiv',
          map: this.mapInstance,
          pageSize: 10,
          scope: 'all'
        })
        poiSearch.setPageNumber(parseInt(pageNo - 1))
        poiSearch.search(this.destination, '上海市')
      })
    },
    toPublish () {
      console.log(this.typeSel)
      if (this.typeSel === 1) {
        this.$router.push('/wanted')
      } else if (this.typeSel === 2) {
        this.$router.push('/graphicMsg')
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.publishWantedShow) {
        this.init()
      }
    })
  },
  watch: {
    publishWantedShow: {
      handler (newVal) {
        console.log(123456)
        this.$nextTick(() => {
          if (newVal) {
            this.init()
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.publishWanted
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  #map
    position absolute
    top 0
    right 0
    bottom 0
    left 0
  #publishWanted
    position absolute
    top 0
    right 0
    z-index 1000
    .ctrlIcon
      position absolute
      top .072917rem
      right .052083rem
      width .208333rem
      height .208333rem
      background rgba(255, 255, 255, .8)
      border-radius .020833rem
      color #058
      cursor pointer
      &::before
        position absolute
        width .208333rem
        height .208333rem
        line-height .208333rem
        font-size .1875rem
        text-align center
        font-weight 800
    .releaseNote
      position absolute
      top .052083rem
      right .338542rem
      width 0
      height .25rem
      border-radius .020833rem
      overflow hidden
      transition width .6s
      &.active
        width 2.083333rem
      .typeSel
        position absolute
        top .020833rem
        left 0
        width .755208rem
        height .208333rem
        line-height .208333rem
        text-align center
        font-size .083333rem
      .destinationSetting
        position absolute
        top .020833rem
        left .807292rem
        width .9375rem // 180px
        height .208333rem
        line-height .208333rem
        text-align center
        font-size .083333rem
      .publishIcon
        position absolute
        top .020833rem
        right .020833rem
        width .208333rem
        height .208333rem
        line-height .208333rem
        text-align center
        background rgba(255, 255, 255, .8)
        border-radius .020833rem
        cursor pointer
        font-size .083333rem
        font-weight 700
        color #058
  #resultDiv
    position absolute
    left 0
    top .3125rem
    width 1.666667rem
    height 2.083333rem
    font-size .072917rem
    z-index 1200
</style>
