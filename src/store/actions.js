import * as types from './mutation-types'

export const setDeviceOnlineIdList = ({commit, state}, list) => {
  commit(types.EMPTY_DEVICE_ONLINE_ID_LIST)
  list.forEach(item => commit(types.DEVICE_ONLINE_ID_LIST, item))
}

export const setDeviceIdActive = ({commit, state}, deviceIdActive) => {
  commit(types.DEVICE_ID_ACTIVE, deviceIdActive)
}

export const setPdfUrl = ({commit, state}, pdfUrl) => {
  commit(types.PDF_URL, pdfUrl)
}

export const setPdfShow = ({commit, state}, pdfShow) => {
  commit(types.SET_PDF_SHOW, pdfShow)
}
