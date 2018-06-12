import * as types from './mutation-types'

export const addToDelList = ({commit, state}, id) => commit(types.DEL_LIST, id)

export const emptyDelList = ({commit, state}) => commit(types.EMPTY_DEL_LIST)

export const setTriggerId = ({commit, state}, triggerId) => commit(types.TRIGGER_ID, triggerId)

export const updateDeptAreaGroup = ({commit, state}, {deptId, areaGroupIdList}) => {
  commit(types.INIT_AREA_TO_UPDATE, deptId)
  const deptAreaGroupList = state.areasToUpdate[deptId] ? state.areasToUpdate[deptId] : []
  deptAreaGroupList.length && commit(types.EMPTY_A_DEPT_AREAGROUP, deptId)
  areaGroupIdList.forEach(areaGroupId => commit(types.AREAS_TO_UPDATE, {deptId, areaGroupId}))
}

export const resetAreaToUpdate = ({commit, state}) => commit(types.RESET_AREA_TO_UPDATE, state)
