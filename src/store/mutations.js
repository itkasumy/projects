import * as types from './mutation-types'

export default {
  [types.DEVICE_ONLINE_ID_LIST] (state, deviceOnlineIdList) {
    state.deviceOnlineIdList.push(deviceOnlineIdList)
  },
  [types.EMPTY_DEVICE_ONLINE_ID_LIST] (state) {
    state.deviceOnlineIdList.splice(0)
  },
  [types.DEVICE_ID_ACTIVE] (state, deviceIdActive) {
    state.deviceIdActive = deviceIdActive
  },
  [types.PDF_URL] (state, pdfUrl) {
    state.pdfUrl = pdfUrl
  },
  [types.SET_PDF_SHOW] (state, pdfShow) {
    state.pdfShow = pdfShow
  }
}
