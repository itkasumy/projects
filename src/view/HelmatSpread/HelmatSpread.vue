<template>
  <div id="mapContainer">
    <div class="map" ref="gaodeRef"></div>
    <div class="funcContent">
      <el-select v-model="value" placeholder="请选择推送类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import IMAP from 'IMAP'
// import { getHelmatList } from 'http'
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data () {
    return {
      mapInstance: null,
      markerList: [],
      marker: null,
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      options: [{
        value: '1',
        label: '通缉令'
      }, {
        value: '2',
        label: '普通消息'
      }],
      value: ''
    }
  },
  methods: {
    init () {
      this.mapInstance = new IMAP.Map(this.$refs.gaodeRef, {
        minZoom: 4,
        zoom: 18,
        center: new IMAP.LngLat(121.49055, 31.23916),
        animation: true,
        keyboard: true
      })
      this.mapInstance.addEventListener(IMAP.Constants.CLICK, function (event) {
        var lnglat = event.lnglat
        alert(`您点击的当前位置为(${lnglat.lng}, ${lnglat.lat})`)
      }, this.mapInstance)
    },
    doSearch () {
      // var keyword="望京国际商业中心",city="北京市";
      // this.map.plugin(['IMAP.PoiSearch'], () => {
      //   poiSearch = new IMAP.PoiSearch({
      //     panel: 'resultDiv',
      //     map: this.map,
      //     pageSize: 9,
      //     scope: 'all'
      //   })
      //   poiSearch.setPageNumber(parseInt(pageNo - 1))
      //   poiSearch.search(keyword, city, resultsCallback)
      // })
    },
    addMarker () {
      this.removeMarker()
      const opts = new IMAP.MarkerOptions()
      opts.anchor = IMAP.Constants.BOTTOM_CENTER
      opts.icon = new IMAP.Icon(`${IMAP.MapConfig.API_REALM_NAME}images/point_1.png`, {
        size: new IMAP.Size(35, 30),
        offset: new IMAP.Pixel(1, 0)
      })

      const lnglat = new IMAP.LngLat(121.4904, 31.23911)
      if (lnglat) {
        this.marker = new IMAP.Marker(lnglat, opts)
        this.marker.editable(true)
        this.mapInstance.getOverlayLayer().addOverlay(this.marker, true)
        this.markerClickHandler(this.marker)
      }
    },
    removeMarker (marker) {
      if (!marker) {
        return
      }
      this.mapInstance.getOverlayLayer().removeOverlay(marker)
      marker = null
    },
    markerClickHandler (marker) {
      marker.addEventListener(IMAP.Constants.CLICK, (event) => {
        alert('您点击的覆盖物是点标记!')
      }, marker)
    },
    dragableMarker (marker) {
      if (!marker) {
        return
      }
      marker.editable(true)
    },
    undragableMarker (marker) {
      if (!marker) {
        return
      }
      marker.editable(false)
    },
    drawLine () {
      const vectors = []
      const linePath = []
      linePath.push(new IMAP.LngLat(121.48941, 31.24989))
      linePath.push(new IMAP.LngLat(121.48986, 31.24792))
      linePath.push(new IMAP.LngLat(121.49076, 31.24597))
      linePath.push(new IMAP.LngLat(121.49075, 31.24555))
      linePath.push(new IMAP.LngLat(121.4907, 31.24511))
      linePath.push(new IMAP.LngLat(121.49006, 31.24281))
      linePath.push(new IMAP.LngLat(121.49, 31.24199))
      linePath.push(new IMAP.LngLat(121.49024, 31.24061))
      linePath.push(new IMAP.LngLat(121.49046, 31.23574))
      const polyline = new IMAP.Polyline(linePath, {
        strokeOpacity: 1,
        strokeColor: '#f20'
      })
      // console.log(polyline)
      vectors.push(polyline)
      this.mapInstance.getOverlayLayer().addOverlays(vectors, false)
    },
    boundary (keyword) {
      this.mapInstance.plugin(['IMAP.DistrictSearch'], () => {
        const boundarySearch = new IMAP.DistrictSearch({
          subdistrict: 1,
          showbiz: false
        })
        const overlays = []
        boundarySearch.search(keyword, (status, result) => {
          if (status === '0') {
            const paths = result.results
            var pathArray
            for (let i = 0, l = paths.length; i < l; i++) {
              if (paths[i]) {
                pathArray = paths[i].polyline.split('|')
                var path
                for (var j = 0, jl = pathArray.length; j < jl; ++j) {
                  const lnglats = []
                  path = pathArray[j].split(';')
                  for (var n = 0, nl = path.length; n < nl; ++n) {
                    var lnglat = path[n].split(',')
                    lnglat = new IMAP.LngLat(lnglat[0], lnglat[1])
                    lnglats.push(lnglat)
                  }
                  var polygon = new IMAP.Polygon(lnglats, {
                    fillOpacity: 0.5,
                    strokeStyle: IMAP.Constants.OVERLAY_LINE_DASHED,
                    strokeWeight: 2
                  })
                  overlays.push(polygon)
                }
              }
            }
            const content = `<div style="padding: 0px 0px 0px 4px;">
              名称：${keyword}<br />
              行政区划级别：${paths[0].level === 'country' ? '国家' : paths[0].level === 'province' ? '省/直辖市' : paths[0].level === 'city' ? '市' : paths[0].level === 'district' ? '区/县' : '街道'}<br />
              区号：${paths[0].citycode}<br />
              行政区编码：${paths[0].adcode}
            </div>`
            const infowindow = new IMAP.InfoWindow(content, {
              size: new IMAP.Size(240, 180),
              title: keyword,
              position: paths[0].center,
              autoPan: true,
              type: IMAP.Constants.OVERLAY_INFOWINDOW_DEFAULT
            })
            overlays.push(infowindow)
            this.mapInstance.getOverlayLayer().addOverlays(overlays, true)
          }
        })
      })
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  },
  mounted () {
    this.init()
    this.addMarker()
    this.drawLine()
    this.boundary('中国')
  }
}
</script>

<style lang="stylus" scoped>
#mapContainer
  position relative
  width 100%
  height 100%
  border-radius .03125rem
  overflow hidden
  .map
    height 100%
  .funcContent
    position absolute
    top 0
    width 100%
    height 1.041667rem
    display flex
    background #ff2200
    z-index 10000
</style>

<style lang="stylus">
.el-checkbox+.el-checkbox
  display block
  margin-left 0
</style>
