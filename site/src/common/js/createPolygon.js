import { setAreaName } from './setAreaName'

/**
 * 格式化经纬度格式函数
 * @param {需要格式化在经纬度} array 
 * @returns 格式化好的经纬度数组
 */
const fmtLatLng = (array = []) => {
  const coords = []
  if (array === null) return
  array.forEach(item => {
    coords.push({lat: item.lat, lng: item.lng})
  })
  return coords
}

/**
 * 比较两个数组是否相等到函数，数组中的元素为经纬度对象
 * @param {数组1} arr1 
 * @param {数组1} arr2 
 * @returns 数组是否相等（布尔值）
 */
export const arrCompare = (arr1 = [], arr2 = []) => {
  let flag = false
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) if (arr1[i].lat !== arr2[i].lat || arr1[i].lng !== arr2[i].lng) return false
  return true
}

/**
 * 异常处理函数
 * @param {this对象} that 
 * @param {异常对象} data 
 */
export const errorException = (that, data) => {
  if (data.response) {
    that.$message({
      type: 'error',
      message: data.response.data.message,
      showClose: true,
      center: true
    })
  } else {
    // that.$message({
    //   type: 'error',
    //   message: '请检查您的网络是否异常！',
    //   showClose: true,
    //   center: true
    // })
    console.log(data)
  }
}

/**
 * 时间格式化函数 将任意时间格式化为 hh:mm\nMM-dd
 * @param {时间字符串} str 
 */
export const fmtTime = (str) => {
  const month = String(new Date(str).getMonth() + 1).padStart(2, 0)
  const day = String(new Date(str).getDate()).padStart(2, 0)
  const hour = String(new Date(str).getHours()).padStart(2, 0)
  const minute = String(new Date(str).getMinutes()).padStart(2, 0)
  return `${hour}:${minute}\n${month}-${day}`
}

/**
 * 计算一个字符串的长度，一个中文算两个字符
 * @param {要计算长度的字符串} str 
 */
export const calcAlphaLen = (str) => {
  let len = 0
  const arr = str.split('')
  arr.forEach(item => {
    len += /[\x00-xff]/.test(item) ? 1 : 2
  })
  return len
}

export const createPolygon = (map, editable, drawingMode, that) => {
  const drawManager = new google.maps.drawing.DrawingManager({
    drawingMode: drawingMode,
    drawingControl: false,
    polygonOptions: {
      fillColor: '#caefff',
      fillOpacity: .35,
      strokeWeight: 2,
      strokeColor: '#109eff',
      clickable: true,
      zIndex: 1,
      editable: editable,
      draggable: true
    }
  })

  drawManager.setMap(map)

  document.getElementById('cacelEditing').onclick = () => {
    whichToShow(that)
    drawManager.setMap(null)
  }

  return drawManager
}

export const listenOverlayComplete = (drawManager, coords, callback, that) => {
  google.maps.event.addListener(drawManager, 'overlaycomplete', event => {
    drawManager.setDrawingMode(null)
    if (event.type === 'polygon') {
      const path = event.overlay.getPath().getArray()
      if (path.length < 3) {
        that.$message({
          type: 'warning',
          message: '绘制区域至少需要三个坐标点',
          center: true
        })
        event.overlay.setPaths([])
        whichToShow(that)
        return
      }    
      let lat = 0
      let lng = 0
      path.forEach(pa => {
        const l = pa.lat()
        const n = pa.lng()
        if (lng < n) {
          lat = l
          lng = n
        }
        coords.push({
          lat: l,
          lng: n
        })
      })
      callback(event)
    }
  })
}

export const initPolyon = (crds, map, value, that, areaId) => {
  let coords = fmtLatLng(crds)
  const id = `areaId${areaId}`
  const block = setAreaName(map, {
    content: `
      <div
        id="${id}"
        style="padding-left: 6px;
          color: #109eff;
          width: 100%;
          text-shadow: 1px 1px 0 #fff,
            -1px -1px 0 #fff,
            1px -1px 0 #fff,
            -1px 1px 0 #fff,
            2px 2px 0 #fff,
            -2px -2px 0 #fff,
            2px -2px 0 #fff,
            -2px 2px 0 #fff;
          font-size: 16px;"
      >${value}</div>`,
    path: coords
  })

  updatePolyon(block, id, that)

  return block
}

export const updatePolyon = (block, id, that) => {
  google.maps.event.addListener(block.polygon, 'dblclick', eve => {
    if (!that.lock) {
      that.$alert('您当前有区域正在编辑，请确认编辑完成', '温馨提示：', {
        confirmButtonText: '确定'
      })
      return
    }
    that.areas.forEach(item => {
      if (item.block === block) {
        if (item.editable) {
          document.getElementById('tipInfo').innerHTML = '再次双击确认完成区域修改'
          block.polygon.setOptions({
            draggable: true,
            editable: true
          })
          item.editable = !item.editable
        } else {
          const coords = []
          block.polygon.getPath().getArray().forEach(item => {
            coords.push({lat: item.lat(), lng: item.lng()})
          })
          if (arrCompare(item.pointList, coords)) {
            that.$message({
              type: 'info',
              message: '您未做任何修改',
              center: true
            })
            that.tipShow = true
            document.getElementById('tipInfo').innerHTML = '双击区域即可修改区域范围'
          } else {
            that.$confirm('您是否确认修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              closeOnClickModal: false
            }).then(() => {
              that.$axios
              .post('/info/area/updateArea', {
                areaName: item.areaName,
                pointList: coords,
                areaId: item.sysArea.areaId
              })
              .then(data => {
                block.polygon.setPath(coords)
                that.$message({
                  message: '修改成功',
                  type: 'success',
                  center: true
                })
                that.tipShow = true
                item.pointList = coords
                block.polygon.setPath(item.pointList)
                setMapCenter(block, that.map)
                document.getElementById('tipInfo').innerHTML = '双击区域即可修改区域范围'
              })
              .catch(error => {
                block.polygon.setPath(item.pointList)
                setMapCenter(block, that.map)
                errorException(that, error)
              })
            }).catch(() => {
              that.$message({
                type: 'info',
                message: '已取消修改',
                center: true
              })
              block.polygon.setPath(item.pointList)
              setMapCenter(block, that.map)
            })
          }
          block.polygon.setOptions({
            draggable: false,
            editable: false
          })
          item.editable = !item.editable
        }
      }
    })
  })

  google.maps.event.addListener(block.polygon, 'click', eve => {
    if (!that.lock) {
      that.$alert('您当前有区域正在编辑，请确认编辑完成', '温馨提示：', {
        confirmButtonText: '确定'
      })
      return
    }
    let index = 0
    that.areas.forEach((item, idx) => {
      if (item.block.polygon === block.polygon) {
        index = idx
      }
    })
    that.highLight(index)
    // setTimeout(() => {
    //   let scrolling = -index * 114
    //   const maxScrolling = -(that.areas.length * 114 - 758)
    //   if (scrolling > maxScrolling) {
    //     that.listScroll.scrollTo(0, scrolling, 500)
    //   } else if (that.areas.length * 114 < 758) {
    //     that.listScroll.scrollTo(0, 0, 500)
    //   } else {
    //     that.listScroll.scrollTo(0, maxScrolling, 500)
    //   }
    // }, 0)
  })
}

export const setMapCenter = (block, map) => {
  const coords = []
  let totalLat = 0
  let totalLng = 0
  block.polygon.getPath().getArray().forEach(item => {
    coords.push({lat: item.lat(), lng: item.lng()})
  })
  coords.forEach(item => {
    totalLat += item.lat
    totalLng += item.lng
  })
  const centerLat = totalLat / coords.length
  const centerLng = totalLng / coords.length
  map.setCenter(new google.maps.LatLng(centerLat, centerLng))
}


export const whichToShow = (that) => {
  if (that.areas.length > 0) {
    that.toDrawing = false
    that.toEditing = true
    that.showAside = true
  } else {
    that.toDrawing = true
    that.toEditing = false
    that.showAside = false
  }
}

export const calcImportancePoint = (polygon) => {
  let maxLat = 0
  let importancePoint = {}
  polygon.getPath().getArray().forEach(item => {
    if (item.lat() > maxLat) {
      maxLat = item.lat()
      importancePoint = {lat: item.lat(), lng: item.lng()}
    }
  })
  return importancePoint
}
