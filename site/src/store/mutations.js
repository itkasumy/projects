import * as types from './mutation-types'

export default {
  [types.DEL_LIST] (state, id) {
    state.delList.push(id)
  },
  [types.EMPTY_DEL_LIST] (state) {
    state.delList.splice(0)
  },
  [types.TRIGGER_ID] (state, triggerId) {
    state.triggerId = triggerId
  },
  [types.INIT_AREA_TO_UPDATE] (state, deptId) {
    state.areasToUpdate[deptId] = []
  },
  [types.AREAS_TO_UPDATE] (state, {deptId, areaGroupId}) {
    state.areasToUpdate[deptId].push(areaGroupId)
  },
  [types.EMPTY_A_DEPT_AREAGROUP] (state, deptId) {
    state.areasToUpdate[deptId].splice(0)
  },
  [types.RESET_AREA_TO_UPDATE] (state) {
    state.areasToUpdate = {}
  }
}
