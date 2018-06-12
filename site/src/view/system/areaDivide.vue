<template>
  <div style="background: rgb(17, 60, 85);" id="areaDivide">
    <el-main id="areaCon">
      <div v-if="toDrawing" @click="toDraw" class="toDrawing"></div>
      <div v-show="toEditing" @click="toDraw" class="toEditing"></div>
      <div v-show="!toEditing" v-if="!toDrawing" class="cacelEditing" id="cacelEditing"></div>
      <div class="side-content" v-show="showAside">
        <div class="search-content">
          <input
            type="text"
            :disabled="!lock"
            v-model="areaToSearch"
            @keyup.enter="searchArea"
            @keyup.108="searchAll(areaToSearch)"
            @keyup.8="searchAll(areaToSearch)"
            @keyup.46="searchAll(areaToSearch)"
            @keyup="excNameRegSearch(areaToSearch)"
            placeholder="请输入区域名称"
            class="search-box el-icon-close"
          />
          <div class="operate">
            <div class="clear el-icon-close" v-show="clearAreaToSearch" @click="clearToSearch"></div>
            <div class="search-btn" @click="searchArea">搜索</div>
          </div>
        </div>
        <div class="area-content">
          <ul class="corner-wrapper">
            <li class="corner"></li>
            <li class="corner"></li>
            <li class="corner"></li>
            <li class="corner"></li>
          </ul>
          <div id="listWrapper" ref="listWrap">
            <ul class="list-wrapper">
              <li
                v-for="(item, index) in areas"
                :key="index"
                :class="{'active': index === selected}"
                @click.prevent="highLight(index)"
              >
                <input
                  class="areaname"
                  type="text"
                  :disabled="item.disabled"
                  v-model="item.areaName"
                  @click.stop
                  v-focus="item.focusState"
                  @keyup="excNameRegAside(item.areaName, index)"
                  @keyup.enter="enterEditAreaName(index, item.areaName)"
                />
                <el-tooltip class="item btnEdit" v-show="item.disabled" effect="dark" content="单击修改区域名称" placement="bottom-end">
                  <el-button @click.stop="toEditAreaName(index)"></el-button>
                </el-tooltip>
                <el-tooltip class="item btnDel" v-show="item.disabled" v-if="item.bound" effect="dark" content="单击删除此区域" placement="right-start">
                  <el-button @click.stop="delArea(index)"></el-button>
                </el-tooltip>
                <el-tooltip class="item btnDelDisabled" v-show="item.disabled" v-if="!item.bound" effect="dark" content="该区域已被占用，不可删除" placement="right-start">
                  <el-button></el-button>
                </el-tooltip>
                <div class="area_ok" v-show="!item.disabled" @click.stop="blurEditAreaName(index, item.areaName)"></div>
                <div class="area_no" v-show="!item.disabled" @click.stop="cacelEdit(index)"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tip" v-show="tipShow">
        <p id="tipInfo">双击区域即可修改区域范围</p><i class="close-tip" @click="closeTip"></i>
      </div>
      <div id="allmap" style="width: 100%; height: 100%;"></div>
    </el-main>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import { createMap } from '@/common/js/createMap'
  import { createPolygon, listenOverlayComplete, initPolyon, updatePolyon, errorException, setMapCenter, arrCompare, whichToShow } from '@/common/js/createPolygon'

  export default {
    data () {
      return {
        map: null,
        toDrawing: true,
        toEditing: false,
        drawingMode: null,
        coords: [],
        areaToSearch: '',
        showAside: false,
        selected: 0,
        areas: [],
        tipShow: false,
        clearAreaToSearch: false,
        lock: true
      }
    },
    components: {},
    methods: {
      // 定义初始化地图函数
      init () {
        const fullscreen = require('fullscreen'),
          areaDivide = document.getElementById('areaDivide'),
          map = document.getElementById('allmap'),
          areaCon = document.getElementById('areaCon'),
          fs = fullscreen(areaDivide)

        fs.on('release', () => {
          this.fullscreen = false
          areaDivide.classList.remove('elAdd')
          areaCon.classList.remove('areaAdd')
          map.classList.remove('mapAdd')
        })

        this.map = createMap('allmap')
      },
      nameSpace (event) {
        this.$prompt('区域名称：', '命名该区域', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}$/,
          inputErrorMessage: '非法字符，请使用"汉字"、"字母"、"数字"、"_"、"-"（1-15个字符）',
          center: true,
          closeOnClickModal: false
        }).then(({ value }) => {
          this.$axios.post(`/info/area/findSysAreaName?areaName=${value}`).then(data => {
            if (!data.data) {
              this.$message({
                message: `区域名${value}已存在，请重新命名该区域`,
                type: 'error',
                center: true
              })
              this.nameSpace(event)
              return
            }
            event.overlay.setPaths([])
            const points = []
            this.coords.forEach(item => {
              points.push({lat: item.lat, lng: item.lng})
            })
            this.$axios
              .post('/info/area/addArea', {
                areaName: value,
                pointList: points
              })
              .then(data => {
                const id = data.data.sysArea.areaId
                data.data.block = initPolyon(this.coords, this.map, value, this, id)
                this.areas.unshift(data.data)
                Vue.set(this.areas[0], 'disabled', true)
                Vue.set(this.areas[0], 'focusState', false)
                Vue.set(this.areas[0], 'bound', true)
                Vue.set(this.areas[0], 'areaName', data.data.sysArea.areaName)
                Vue.set(this.areas[0], 'editable', false)
                this.$message({
                  message: '添加成功',
                  type: 'success',
                  center: true
                })
                this.toEditing = true
                this.showAside = true
                this.selected = 0
                this.highLight(this.selected)
              })
              .catch(error => {
                whichToShow(this)
                if (error.response.data.errorCode === 'info.area.00105') {
                  this.$message({
                    type: 'error',
                    message: error.response.message,
                    center: true
                  })
                }
                errorException(this, error)
              })
          }).catch(err => {
            console.log(err)
          })          
        }).catch(() => {
          whichToShow(this)
          this.$message({
            type: 'info',
            message: '已取消绘制',
            center: true
          }) 
          event.overlay.setPaths([])
        })
      },
      toDraw () {
        if (!this.lock) {
          this.$alert('您当前有区域正在编辑，请确认编辑完成', '温馨提示：', {
            confirmButtonText: '确定'
          })
          return
        }
        const that = this
        this.coords = []
        this.showAside = false
        this.toDrawing = false
        this.toEditing = false
        this.drawingMode = google.maps.drawing.OverlayType.POLYGON
        this.$nextTick(() => {
          const drawManager = createPolygon(this.map, this.editable, this.drawingMode, this)
          listenOverlayComplete(drawManager, this.coords, this.nameSpace, this)
        })
      },
      clearToSearch () {
        this.areaToSearch = ''
        this.clearAreaToSearch = false
        this.searchArea()
      },
      searchArea () {
        if (!this.lock) {
          this.$alert('您当前有区域正在编辑，请确认编辑完成', '温馨提示：', {
            confirmButtonText: '确定'
          })
          return
        }
        const url = this.areaToSearch.trim().length === 0 ? '/info/area/getAllSysAreaPoint' : `/info/area/findSysAreaLike?areaName=${this.areaToSearch.trim()}`
        // if (!this.areaToSearch.length) return
        this.$axios
          .post(url)
          .then(data => {
            this.areas.forEach(item => {
              item.block.ifnoBox.close()
              item.block.polygon.setMap(null)
            })
            this.rederArea(data.data, this.serchNoArea)
          })
          .catch(error => {
            errorException(this, error)
          })
        // this.areaToSearch = ''
      },
      toEditAreaName (index) {
        this.highLight(index)
        if (this.lock) {
          this.lock = !this.lock
          this.areas[index].disabled = false
          this.areas[index].focusState = true
        } else {
          this.$alert('您当前有区域正在编辑，请确认编辑完成', '温馨提示：', {
            confirmButtonText: '确定'
          })
        }
      },
      blurEditAreaName (index, val) {
        this.lock = !this.lock
        this.areas[index].disabled = true
        this.editAreaName(index, val)
      },
      enterEditAreaName (index, val) {
        this.lock = !this.lock
        this.areas[index].focusState = false
        this.areas[index].disabled = true
        this.editAreaName(index, val)
      },
      editAreaName (index, val) {
        // this.$confirm(`是否确认修改此区域名为"${val}"?`, '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        //   closeOnClickModal: false
        // }).then(() => {
          this.areas[index].disabled = true
          this.areas[index].focusState = false
          const coords = []
          this.areas[index].block.polygon.getPath().getArray().forEach(item => {
            coords.push({lat: item.lat(), lng: item.lng()})
          })
          if (this.areas[index].sysArea.areaName === val && arrCompare(coords, this.areas[index].pointList)) {
            this.$message({
              type: 'info',
              message: '您未做任何修改',
              center: true
            })
            return
          }
          const id = `areaId${this.areas[index].sysArea.areaId}`
          this.$axios
            .post('/info/area/updateArea', {
              areaName: val,
              pointList: coords,
              areaId: this.areas[index].sysArea.areaId
            })
            .then(data => {
              this.areas[index].areaName = val
              this.areas[index].sysArea.areaName = val
              this.areas[index].pointList = coords
              document.getElementById(id).innerHTML = val
              this.$message({
                message: '修改成功',
                type: 'success',
                center: true
              })
            })
            .catch(error => {
              if (error.response.data.errorCode === 'info.area.00105') {
                this.$message({
                  type: 'error',
                  message: error.response.message,
                  center: true
                })
              }
              this.areas[index].areaName = this.areas[index].sysArea.areaName
              errorException(this, error)
            })
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消修改',
        //     center: true
        //   })
        //   this.areas[index].disabled = true
        //   this.areas[index].areaName = this.areas[index].sysArea.areaName
        // })
      },
      cacelEdit (index) {
        // this.$confirm('确认是否取消此次修改', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        //   closeOnClickModal: false
        // }).then(() => {
          this.lock = !this.lock
          this.areas[index].disabled = true
          this.areas[index].focusState = false
          this.$message({
            type: 'info',
            message: '已取消修改',
            center: true
          })
          this.areas[index].areaName = this.areas[index].sysArea.areaName
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '您可以继续修改',
        //     center: true
        //   })
        //   this.areas[index].disabled = false
        //   this.areas[index].focusState = false
        //   setTimeout(() => {
        //     this.areas[index].focusState = true
        //   }, 0)
        // })
      },
      delArea (index) {
        if (!this.lock) {
          this.$alert('您当前有区域正在编辑，请确认编辑完成', '温馨提示：', {
            confirmButtonText: '确定'
          })
          return
        }
        this.highLight(index)
        this.$confirm('此操作将永久删除该区域, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          const url = `/info/area/deleteArea?areaId=${this.areas[index].sysArea.areaId}`
          this.$axios
            .post(url)
            .then(data => {
              this.areas[index].block.ifnoBox.close()
              this.areas[index].block.polygon.setMap(null)
              this.areas.splice(index, 1)
              this.$message({
                message: '删除成功！',
                type: 'success',
                center: true
              })
              index === this.areas.length ? this.highLight(this.areas.length - 1) : this.highLight(index)
            })
            .catch(error => {
              errorException(this, error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center: true
          })
        })
      },
      getAreaInfo () {
        this.$axios
          .post('/info/area/getAllSysAreaPoint')
          .then(data => {
            if (this.areas.length > 0) {
              this.areas.forEach(item => {
                item.block.polygon.setMap(null)
              })
            }
            this.rederArea(data.data)
          })
          .catch(error => {
            errorException(this, error)
          })
      },
      rederArea (data, fn) {
        const datas = data
        datas.forEach(item => {
          item.sysArea = {}
          item.sysArea.areaId = item.areaId
          item.sysArea.areaName = item.areaName
          item.sysArea.bound = item.bound
          item.sysArea.createTime = item.createTime
        })
        this.areas = datas
        if (this.areas.length > 0) {
          this.$nextTick(() => {
            this._initScroll()
          })
          this.showAside = true
          this.toDrawing = false
          this.toEditing = true
          this.tipShow = true
          this.drawingMode = google.maps.drawing.OverlayType.POLYGON
          this.areas.forEach((item, index) => {
            item.block = initPolyon(item.pointList, this.map, item.sysArea.areaName, this, item.sysArea.areaId)
            Vue.set(this.areas[index], 'disabled', true)
            Vue.set(this.areas[index], 'focusState', false)
            Vue.set(this.areas[index], 'bound', item.sysArea.bound === 0 ? true : false)
            Vue.set(this.areas[index], 'areaName', item.sysArea.areaName)
            Vue.set(this.areas[index], 'editable', true)
          })
        } else {
          if (fn) fn()
        }
        setTimeout(() => {
          this.highLight(0)
        }, 0)
      },
      serchNoArea () {
        this.$message({
          message: '没有搜索到相关区域...',
          type: 'warning',
          center: true
        })
        setTimeout(() => {
          this.getAreaInfo()
        }, 3000)
      },
      closeTip () {
        this.tipShow = false
      },
      highLight (index = 0) {
        if (this.lock) {
          this.selected = index 
          this.areas.forEach(item => {
            item.block.polygon.setOptions({
              strokeColor:'#229fff',
              fillColor:'#caefff'
            })
          })
          this.areas[index].block.polygon.setOptions({
            strokeColor:'#f01e1e',
            fillColor:'#fdb4b4'
          })
          setTimeout(() => {
            let scrolling = -index * 114
            const maxScrolling = -(this.areas.length * 114 - 758)
            if (scrolling > maxScrolling) {
              this.listScroll.scrollTo(0, scrolling, 500)
            } else if (this.areas.length * 114 < 758) {
              this.listScroll.scrollTo(0, 0, 500)
            } else {
              this.listScroll.scrollTo(0, maxScrolling, 500)
            }
          }, 0)
          setMapCenter(this.areas[index].block, this.map)
        } else {
          this.$alert('您当前有区域正在编辑，请确认编辑完成', '温馨提示：', {
            confirmButtonText: '确定'
          })
        }
      },
      excNameRegAside (val, index) {
        if (!/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}$/.test(val) && val.length > 0) {
          this.$message({
            message: '请使用"汉字"、"字母"、"数字"、"_"、"-"（1-15个字符）',
            type: 'warning',
            center: true
          })
          this.areas[index].areaName = val.match(/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}/) ? val.match(/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}/)[0] : ''
        }
      },
      excNameRegSearch (val) {
        if (!/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}$/.test(val) && val.length > 0) {
          this.$message({
            message: '请使用"汉字"、"字母"、"数字"、"_"、"-"（1-15个字符）',
            type: 'warning',
            center: true
          })
          this.areaToSearch = val.match(/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}/)[0]
        }
      },
      searchAll (val) {
        if (val.length === 0) {
          this.searchArea('')
        }
      },
      _initScroll () {
        this.listScroll = new BScroll(this.$refs.listWrap, {
          click: true,
          bounce: false,
          mouseWheel: true
        })
      }
    },
    mounted () {
      this.init()
      document.body.addEventListener('DOMSubtreeModified', () => {
        setTimeout(() => {
          Array.from(document.querySelectorAll('.el-message-box__wrapper')).forEach(item => item && (item.style.zIndex = 2147483648))
          Array.from(document.querySelectorAll('.v-modal')).forEach(item => item && (item.style.zIndex = 2147483646))
          Array.from(document.querySelectorAll('.el-message')).forEach(item => item && (item.style.zIndex = 2147483648))
        }, 0)
      }, false)
    },
    created () {
      this.getAreaInfo()
      this.$root.Bus.$on('fullScreen', val => {
        if (val) {
          const fullscreen = require('fullscreen'),
            areaDivide = document.getElementById('areaDivide'),
            map = document.getElementById('allmap'),
            areaCon = document.getElementById('areaCon')

          if (!Array.from(areaDivide.classList).join().includes('elAdd')) areaDivide.classList.add('elAdd')
          if (!Array.from(areaCon.classList).join().includes('areaAdd')) areaCon.classList.add('areaAdd')
          if (!Array.from(map.classList).join().includes('mapAdd')) map.classList.add('mapAdd')

          const fs = fullscreen(areaDivide)
          fs.request()
        }
      })
    },
    watch: {
      areaToSearch: {
        handler (val) {
          this.clearAreaToSearch = val.length > 0 ? true : false
        }
      }
    },
    directives: {
      focus: {
        update (el) {
          el.focus()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.el-main {
  position: relative;
  color: #333;
  background-color: skyblue;
  padding: 0;
}
.toDrawing {
  width: 154px;
  height: 154px;
  background: url("/static/images/btn_drawArea.png") no-repeat;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-124px, -44px);
}
.toEditing, .cacelEditing {
  width: 154px;
  height: 154px;
  background: url("/static/images/btn_drawArea.png") no-repeat;
  position: absolute;
  z-index: 1;
  right: 18px;
  top: 18px;
}
.cacelEditing {
  background: url("/static/images/btn_drawArea_cancel.png") no-repeat;
}
.side-content {
  position: absolute;
  width: 276px;
  z-index: 1;
  left: 10px;
  top: 10px;
  bottom: 10px;
  .search-content {
    width: 276px;
    height: 46px;
    line-height: 46px;
    display: flex;
    background: #009bc6;
    color: #ffffff;
    border: 1px solid #6adaf9;
    .search-box {
      width: 170px;
      height: 46px;
      padding-left: 10px;
      background: transparent;
      font-size: 12px;
      color: #ffffff;
      &::-moz-placeholder {
        color: #ffffff;
      }
      &:-ms-input-placeholder {
        color: #ffffff;
      }
      &:-moz-placeholder {
        color: #ffffff;
      }
      &::-webkit-input-placeholder {
        color: #ffffff;
      }
    }
    .operate {
      position: relative;
      display: flex;
      width: 100px;
      height: 46px;
      .clear {
        width: 40px;
        line-height: 46px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        transition: transform .5s;
        &:hover {
          transform: rotate(180deg);
        }
      }
      .search-btn {
        position: relative;
        position: absolute;
        width: 60px;
        height: 46px;
        top: 0;
        right: 0;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        &::before {
          position: absolute;
          content: "";
          width: 1px;
          height: 24px;
          background: rgb(154, 196, 193);
          left: 0;
          top: 11px;
        }
      }
    }
  }
  .area-content {
    position: relative;
    width: 272px;
    height: calc(100% - 60px);
    background: rgba(26, 32, 40, .7);
    margin-top: 10px;
    .corner-wrapper {
      .corner {
        position: absolute;
        width: 18px;
        height: 18px;
        &:nth-child(1) {
          left: -3px;
          top: -3px;
          border-top: 3px solid #fff;
          border-left: 3px solid #fff;
        }
        &:nth-child(2) {
          right: -3px;
          top: -3px;
          border-top: 3px solid #fff;
          border-right: 3px solid #fff;
        }
        &:nth-child(3) {
          left: -3px;
          bottom: -3px;
          border-bottom: 3px solid #fff;
          border-left: 3px solid #fff;
        }
        &:nth-child(4) {
          right: -3px;
          bottom: -3px;
          border-bottom: 3px solid #fff;
          border-right: 3px solid #fff;
        }
      }
    }
    #listWrapper {
      position: relative;
      height: 100%;
      overflow: scroll;
      .list-wrapper {
        li {
          width:  272px;
          height: 114px;
          display: flex;
          align-items: center;
          &:nth-child(1) {
            margin-top: 0;
          }
          &:nth-last-child(1) {
            border-bottom: 1px solid rgb(104, 123, 125);
          }
          &.active {
            background: url("/static/images/highlight.png") 0 0 / 272px 114px no-repeat;
            .areaname {
              color: #41efff;
            }
          }
          .areaname {
            position: relative;
            background: transparent;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            padding-left: 15px;
            width: 60%;
            z-index: 20;
            cursor: default;
            &:focus {
              cursor: text;
              text-decoration: underline;
            }
          }
          .btnEdit, .btnDel, .btnDelDisabled {
            width: 30px;
            height: 30px;
            margin-left: 10px;
            background: url("/static/images/area_edit.png") 0 0 / 30px 30px no-repeat;
            cursor: pointer;
          }
          .btnDel {
            background: url("/static/images/area_delete.png") 0 0 / 30px 30px no-repeat;
          }
          .btnDelDisabled {
            background: url("/static/images/area_delete_disable.png") 0 0 / 30px 30px no-repeat;
          }
          .area_ok, .area_no {
            width: 36px;
            height: 30px;
            cursor: pointer;
            background: url("/static/images/area_ok.png") 0 0 / 36px 28px no-repeat;
          }
          .area_no {
            margin-left: 8px;
            background: url("/static/images/area_no.png") 0 0 / 36px 28px no-repeat;
          }
        }
      }
    }
  }
}

.tip {
  position: absolute;
  width: 420px;
  height: 46px;
  line-height: 46px;
  left: 50%;
  top: 5px;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, .8);
  z-index: 1;
  border-radius: 8px;
  color: #5a5a5a;
  font-size: 16px;
  p {
    text-align: center;
    &::before {
      position: relative;
      display: inline-block;
      content: "";
      width: 24px;
      height: 24px;
      background: url("/static/images/tip-icon.png") no-repeat;
      margin-right: 7px;
      top: 7px;
    }
  }
  .close-tip {
    position: absolute;
    width: 24px;
    height: 24px;
    background: url("/static/images/close-tip-icon.png") no-repeat;
    top: 9px;
    right: 11px;
  }
}
</style>
<style lang="scss">
#areaDivide.elAdd{
  width: 100%;
  height: 100%;
}
#allmap.mapAdd{
  clip-path: polygon(10px 50px, 1860px 50px, 1910px 110px, 1910px 930px, 1764px 1070px, 54px 1070px, 10px 1024px);
  -webkit-clip-path: polygon(10px 50px, 1860px 50px, 1910px 110px, 1910px 930px, 1764px 1070px, 54px 1070px, 10px 1024px);
}
#areaCon.areaAdd{
  background: url("../../assets/images/fullScreen_bg.png") no-repeat;
  margin: 0;
  width: 100%;
  height: 100%;
  .side-content {
    top: 60px;
  }
  .tip {
    top: 55px;
  }
  .toEditing, .cacelEditing {
    top: 68px;
  }
}
#areaDivide {
  input {
    outline: none;
  }
  .el-message-box--center .el-message-box__content {
    display: flex;
    text-align: left;
    padding: 60px 80px;
    .el-message-box__message p {
      line-height: 70px;
    }
    .el-message-box__input {
      flex: 1;
    }
  }
  .el-message-box--center {
    width: 560px;
  }
  .el-button {
    border: none;
    padding: 0;
  }
}
</style>
