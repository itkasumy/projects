export const setMapCenter = (markerOrPolygon, map) => {
    if (markerOrPolygon.getPath) {
        const coords = []
        let totalLat = 0
        let totalLng = 0
        markerOrPolygon.getPath().getArray().forEach(item => {
        coords.push({lat: item.lat(), lng: item.lng()})
        })
        coords.forEach(item => {
        totalLat += item.lat
        totalLng += item.lng
        })
        const centerLat = totalLat / coords.length
        const centerLng = totalLng / coords.length
        map.setCenter(new google.maps.LatLng(centerLat, centerLng))
    }else {
        map.setCenter(new google.maps.LatLng(markerOrPolygon.position.lat(), markerOrPolygon.position.lng()))

    }
}



