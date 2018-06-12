<template>
  <div id="map" class="ps-container">
    <el-main id="person-track" style="padding: 0;">
      <div id="allmap">
        <div class="cvCont" :class="{active: cvState.grabbing}" ref="cvCont">
          <canvas id="cv" ref="cv"></canvas>
        </div>
      </div>
      <mapAndVectorSwitch
      :url="'/personManage/personTrack'"
      :inSatellitePage="false"
      :inPngPage="true"
      class="mapAndVectorSwitch">
      </mapAndVectorSwitch>
    </el-main>  
  </div>
</template>

<script>
import mapAndVectorSwitch from '@/components/mapAndVectorSwitch.vue'
import { watchDrag } from '@/common/js/silverStar'
export default {
  data () {
    return {
      cvState: {
        grabbing: false
      },
      ctx: null,
      fullScreen: false
    }
  },
  components: {
    mapAndVectorSwitch
  },
  created () {
    this.$root.Bus.$on('fullScreen', value => {
      if (value) {
        const
          fullscree = require('fullscreen'),
          el = document.getElementById('map'),
          map1 = document.getElementById('allmap'),
          ps = document.getElementById('person-spread')
        this.fullScreen = true
        !Array.from(el.classList).join().includes('elAdd') && el.classList.add('elAdd')
        !Array.from(map1.classList).join().includes('mapAdd') && map1.classList.add('mapAdd')
        !Array.from(ps.classList).join().includes('psAdd') && ps.classList.add('psAdd')
        const fs = fullscree(el)
        fs.request()
      }
    })
  },
  mounted () {
    this.ready()
    this.init()
  },
  watch: {
    fullScreen: {
      handler (newVal) {
        watchDrag(this.$refs.cvCont, this.cvState, newVal)
      }
    }
  },
  methods: {
    ready () {
      const
        fullscreen = require('fullscreen'),
        el = document.getElementById('map'),
        map1 = document.getElementById('allmap'),
        ps = document.getElementById('person-track')
      const fs = fullscreen(el)
      fs.on('release', () => {
        this.fullScreen = false
        Array.from(el.classList).join().includes('elAdd') && el.classList.remove('elAdd')
        Array.from(map1.classList).join().includes('mapAdd') && map1.classList.remove('mapAdd')
        Array.from(ps.classList).join().includes('psAdd') && ps.classList.remove('psAdd')
      })
    },
    init () {
      this.$refs.cv.width = 2880
      this.$refs.cv.height = 1620
      this.ctx = this.$refs.cv.getContext('2d')
      watchDrag(this.$refs.cvCont, this.cvState, this.fullScreen)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './css/personTrackVector.scss';
</style>
