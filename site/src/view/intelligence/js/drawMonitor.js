/**
 * 
 * @param {地图对象} map 
 * @param {是否添加蒙板} isAddMask 
 * @param {最多可以画几个点, 默认四个点} maxPoints 
 * 
 * how to use ?
 *  1. manager = new markersManager(map)
 *  2. manager.run()// after you can drawmarker in map
 * 
 *  // if you need to clear line and marker where in map
 *  3. manager.reset()
 * 
 *  // if you need to point's lat lng
 *  4. manager.getPath()
 * 
 * event support
 *  computed, set_at// set_at will call while move the range
 * use:
 *  manager.addListener('computed', ( paths )=>{ })
 * 
 * how it work ?
 *  1. draw markers
 *  2. draw lines base on markers
 *  3. while markers's count is equal maxPoints , hidden lines , and draw polygon
 *  4. listen markers's drag event then reset polygon'path
 * 
 * 
 * attention: 
 *  sometime map can't listener click event beacause some polygon above map, it prevent click event.
 *  You can call new MakersManager(map, true), and then manager will call manager.addMask() resolve this problem
 * 
 */
function markersManager(map, isAddMask, maxPoints) {
  if (typeof map !== 'object') {
    throw new Error('you param not validate!')
  }
  this.init(map)
  this.map = map
  this.isAddMask = isAddMask
  this.maxPoints = maxPoints || 4
}

markersManager.prototype.addMask = function () {
  let bounds = this.map.getBounds();
  let southWest = bounds.getSouthWest();
  let northEast = bounds.getNorthEast();
  let southEast = {lat:southWest.lat(),lng:northEast.lng()}
  let northWest = {lat:northEast.lat(),lng:southWest.lng()}

  let southWestLatLng = {lat:southWest.lat(),lng:southWest.lng()}
  let northEastLatLng = {lat:northEast.lat(),lng:northEast.lng()}

  let path = [northEastLatLng,northWest,southWestLatLng, southEast]
  if (this.mask) {
    this.mask.setOptions({path: path})
  }else {
    let mask = new google.maps.Polygon({
      path: path,
      strokeColor:'transparent',
      fillColor:"transparent",
      map: this.map,
      zIndex: 999
    });
    this.mask = mask
  }
}
markersManager.prototype.run = function () {
  var _this = this
  if (this.isAddMask) {
    this.addMask()
    this.map.addListener('bounds_changed', function () {
      _this.addMask()
    })
  }
  var box = this.mask || this.map
  box.addListener('click', function (event) {
    _this.draw(event)
  })
}

markersManager.prototype.draw = function (event) {
  if (this.markers.length == this.maxPoints)  return
  var marker = new google.maps.Marker({
      position: event.latLng,
      map: this.map,
      draggable: true,
      icon: '../../../../static/images/point_drawArea.png',
  });
  console.log( marker, 'marker........' )
  var markerCount = this.markers.push(marker)
  var markerIndex = markerCount - 1
  var _this = this
  marker.addListener('drag', function (e) {
      if (_this.lines) {
          _this.notifyLines()
      }else {
          _this.notifyPolygon()
          _this.__event__set_at && _this.__event__set_at(_this.getPath())
      }
  })
}
markersManager.prototype.reset = function () {
  for (let i = 0, len = this.markers.length; i < len; i++) 
      this.markers[i].setMap(null)

  this.lines && this.lines.setMap(null)
  this.polygon && this.polygon.setMap(null)
  this.init(this.map)
}
markersManager.prototype.getPath = function (isRelease) {
  let res = this.getPathByMarkers(this.markers)
  isRelease && this.release()
  return res
}
markersManager.prototype.release = function () {
  this.map = null
  this.polygon = null
  this.markers = null
  this.lines = null
  this.mask = null
}
/**
 * 
 * @param {事件名称} event 
 * @param {回调函数} callback 
 * now it only support computed and set_at event
 */
markersManager.prototype.addListener = function (event, callback) {
  this['__event__' + event] = callback
}
markersManager.prototype.eventManager = function () {}

markersManager.prototype.init = function (map) {
  this.markers = this.createArrLike()
  this.markerLatLngs = this.createArrLike()
  this.lines = this.drawLine(map, [])
  this.polygon = this.drawPolygon(map, [])
  this.mutator(this.markers, 'push', function( v ) {
      if (v.length === this.maxPoints) {
          this.polygon.setOptions({ path: this.getPathByMarkers(v) })
          this.lines.setMap(null)
          this.lines = null
          this.__event__computed && this.__event__computed(this.getPath())
          return
      }
      this.notifyLines()
  })
}

markersManager.prototype.notifyLines = function () {
  let paths = this.getPathByMarkers(this.markers)
  this.lines.setOptions({ path: paths })
}
markersManager.prototype.notifyPolygon = function () {
  let paths = this.getPathByMarkers(this.markers)
  this.polygon.setOptions({ path: paths })
}

markersManager.prototype.getPathByMarkers = function (markers) {
  var paths = []
  for (var i = 0, len = markers.length; i < len; i++) 
      paths.push(this.getLatLngByMarker(markers[i]))
  return paths
}
markersManager.prototype.getLatLngByMarker = function (marker) {
  var pos = marker.position
  return {lat: pos.lat(), lng: pos.lng()}
}

markersManager.prototype.createArrLike = function () {
  return Object.create(Array.prototype)
}
markersManager.prototype.mutator = function (arrLike, fnName, handler) {
  let _this = this
  Object.defineProperty(arrLike, fnName, {
      configurable: false,
      enumerable: false,
      writable: true,
      value: function () {
          let res = [][fnName].apply(arrLike, arguments)
          handler.call(_this, arrLike)
          return res
      }
  })
}

markersManager.prototype.drawLine = function (map, paths) {
  return new google.maps.Polyline({
      map:map,
      path: paths,
      fillColor: '#ff0',
      fillOpacity: .35,
      strokeWeight: 2,
      strokeColor: 'gold',
      clickable: false,
      zIndex: 999,
      draggable: false,
  });
}
markersManager.prototype.drawPolygon = function (map, paths) {
  return new google.maps.Polygon({
      map:map,
      path: paths,
      fillColor: '#ff0',
      fillOpacity: .35,
      strokeWeight: 2,
      strokeColor: 'gold',
      clickable: false,
      zIndex: 999,
      draggable: false,
  });
}

export default markersManager