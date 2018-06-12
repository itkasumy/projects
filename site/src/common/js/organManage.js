import Vue from 'vue'
/**
 * 新建机构/部门时格式化新建部门体系的递归函数
 * @param {接受一个未格式化的数组} arr
 * @returns 返回一个符合后台接收的格式化的对象 
 */
export const fmtNewOrg = (arr = []) => {
  const resObj = {}
  const resArr = []
  if (arr.length && arr[0].level === 1) {
    resObj.deptName = arr[0].deptName
    arr[0].deptChildrenList && arr[0].deptChildrenList.length && (resObj.deptChildrenList = fmtNewOrg(arr[0].deptChildrenList))
  } else {
    arr.forEach(item => {
      const obj = {}
      obj.deptName = item.deptName
      item.deptChildrenList && item.deptChildrenList.length && (obj.deptChildrenList = fmtNewOrg(item.deptChildrenList))
      resArr.push(obj)
    })
    return resArr
  }
  return resObj
}

/**
 * 请求回所有数据后的包装函数
 * @param {格式化原数组} arr 
 * @param {等级标识} sign 
 */
export const fmtAllOrgList = (obj, sign, areaGroupList = []) => {
  const resObj = {}
  obj.areaGroupList && obj.areaGroupList.length && obj.areaGroupList.forEach(item => {
    let flag = true
    areaGroupList.forEach(areaGroup => areaGroup.areaGroupId === item.areaGroupId && (flag = false))
    flag && areaGroupList.push(item)
  })
  resObj.areaGroupList = []
  obj.areaGroupList && obj.areaGroupList.length && obj.areaGroupList.forEach(item => resObj.areaGroupList.push(item))
  resObj.level = sign
  resObj.deptId = obj.deptId
  resObj.deptName = obj.deptName
  resObj.showSubTree = true
  resObj.unEditable = true
  resObj.highLight = false
  resObj.deptChildrenList = []
  obj.deptChildrenList && obj.deptChildrenList.length && obj.deptChildrenList.forEach(item => resObj.deptChildrenList.push(fmtAllOrgList(item, (++sign, sign--), areaGroupList)))
  if (sign === 1) {
    resObj.toEdit = true
    resObj.iptOnFocus = true
  } else {
    resObj.toEdit = false
    resObj.iptOnFocus = false
    return resObj
  }
  return {resObj: resObj, areaGroupList: areaGroupList}
}

/**
 * 去重函数 --- kill
 * @param {去重原数组} arr 
 */
export const uniqueAreaGroupList = (arr) => {
  const resArr = [arr[0]]
  for (let item of arr) {
    for (let itm of resArr) {
      item.areaGroupId !== itm.areaGroupId && resArr.push(item)
      break
    }
  }
  return resArr
}

/**
 * 树形数组对象找到自己，并排他
 * @param {树形数组中每个对象的唯一标识} id 
 * @param {树形数组} arr 
 */
export const findSelf = (id, arr = []) => {
  arr.forEach(item => {
    Vue.set(item, 'highLight', item.deptId === id)
    item.deptChildrenList && item.deptChildrenList.length && findSelf(id, item.deptChildrenList)
  })
}

/**
 * 当机构管理中的每一项编辑按钮点击时让树状图变成可点击进行编辑的状态，并且让第一个处于焦点状态
 * @param {树形数组} arr 
 */
export const whenToEditOrgCfgClick = (arr = []) => {
  arr.forEach(item => {
    item.level && item.level === 1 ? (Vue.set(item, 'unEditable', false), Vue.set(item, 'toEdit', false)) : (Vue.set(item, 'unEditable', false), Vue.set(item, 'toEdit', true))
    item.deptChildrenList && item.deptChildrenList.length && whenToEditOrgCfgClick(item.deptChildrenList)
  })
}

/**
 * 当机构管理中的每一项完成按钮点击时让树状图变成不可编辑状态
 * @param {树形数组} arr
 */
export const whenSubmitModify = (arr = []) => {
  arr.forEach(item => {
    item.level && item.level === 1 ? (Vue.set(item, 'unEditable', true), Vue.set(item, 'toEdit', true)) : (Vue.set(item, 'unEditable', true), Vue.set(item, 'toEdit', true))
    item.deptChildrenList && item.deptChildrenList.length && whenSubmitModify(item.deptChildrenList)
  })
}

/**
 * 为一个树状图添加子节点的函数
 * @param {要增添子节点的当前节点对象} item 
 */
export const appendChildToSubTree = (item) => {
  const newChildBranch = {
    deptName: '',
    showSubTree: true,
    level: item.level + 1,
    unEditable: false,
    toEdit: false,
    iptOnFocus: true,
    deptChildrenList: []
  }
  item.deptChildrenList && item.deptChildrenList.length ? item.deptChildrenList.push(newChildBranch) : Vue.set(item, 'deptChildrenList', [newChildBranch])
}

/**
 * 递归搜集树的各个分支存到结果数组
 * @param {数组} arr 
 * @param {结果数组} resArr 
 */
export const collectBranchList = (arr = [], resArr = []) => {
  arr.forEach(item => {
    item.deptId && resArr.push({[item.deptId]: item.deptName})
    item.deptChildrenList && item.deptChildrenList.length && collectBranchList(item.deptChildrenList, resArr)
  })
  return resArr
}

/**
 * 比较对象数组，取出更改的保存到结果数组
 * @param {原对象数组} srcArr 
 * @param {新数组对象} tarArr 
 * @param {结果数组} resArr 
 */
export const compareObjArr = (srcArr = [], tarArr = [], resArr = []) => {
  srcArr.forEach(srcEl => {
    tarArr.forEach(tarEl => {
      /* for (let srcKey in srcEl) {
        for (let tarKey in tarEl) {
          if (srcKey === tarKey && srcEl[srcKey] !== tarEl[tarKey]) {
            for (let key in tarEl) {
              resArr.push({
                deptId: key,
                deptName: tarEl[key]
              })
            }
          }
        }
      } */
      for (let [srcKey, srcVal] of srcEl) {
        for (let [tarKey, tarVal] of tarEl) {
          if (srcKey === tarKey && srcVal !== tarVal) {
            for (let [key, val] of tarEl) {
              resArr.push({
                deptId: key,
                deptName: val
              })
            }
          }
        }
      }
    })
  })
  return resArr
}

/**
 * 格式化树对象，只留三个属性
 * @param {树对象} treeObj 
 */
export const fmtTree = (treeObj) => {
  const resObj = {}
  resObj.deptName = treeObj.deptName
  treeObj.deptId && (resObj.deptId = treeObj.deptId)
  resObj.deptChildrenList = []
  treeObj.deptChildrenList && treeObj.deptChildrenList.length && treeObj.deptChildrenList.forEach(item => resObj.deptChildrenList.push(fmtTree(item)))
  return resObj
}

/**
 * 两个树状数组对象对比找出新树中新增的子元素放到结果数组中去
 * @param {原树状数组} srcTreeArr 
 * @param {新树状数组} tarTreeArr 
 * @param {结果数组} resArr 
 */
export const compareObjTree = (srcTreeArr = [], tarTreeArr = [], resArr = []) => {
  srcTreeArr.forEach(srcEl => {
    tarTreeArr.forEach(tarEl => {
      if (srcEl['deptId'] === tarEl['deptId'] && srcEl['deptChildrenList'].length === 0 && tarEl['deptChildrenList'].length > 0) {
        tarEl['deptChildrenList'].forEach(item => {
          if (item.hadBeenInResArr) return
          item.hadBeenInResArr = true
          resArr.push({fDeptId: srcEl['deptId'], deptName: item.deptName, deptChildrenList: item.deptChildrenList})
        })
      } else if (srcEl['deptId'] === tarEl['deptId'] && srcEl['deptChildrenList'].length > 0 && tarEl['deptChildrenList'].length > 0) {
        tarEl['deptChildrenList'].forEach(tarChildEl => {
          let flag = true
          srcEl['deptChildrenList'].forEach(srcChildEl => {
            if (srcChildEl['deptId'] === tarChildEl['deptId']) {
              flag = false
              tarChildEl['deptChildrenList'].length &&  srcChildEl['deptChildrenList'].length === 0 && tarChildEl['deptChildrenList'].forEach(ele => {
                if (ele.hadBeenInResArr) return
                ele.hadBeenInResArr = true
                resArr.push({fDeptId: srcChildEl['deptId'], deptName: ele.deptName, deptChildrenList: ele.deptChildrenList})
              })
              tarChildEl['deptChildrenList'].length &&  srcChildEl['deptChildrenList'].length && compareObjTree(srcEl['deptChildrenList'], tarEl['deptChildrenList'], resArr)
            }
          })
          if (flag) {
            if (tarChildEl.hadBeenInResArr) return
            tarChildEl.hadBeenInResArr = true
            resArr.push({fDeptId: srcEl['deptId'], deptName: tarChildEl.deptName, deptChildrenList: tarChildEl.deptChildrenList})
          }
        })
      }
    })
  })
  return resArr
}

/**
 * 去重数组 --- kill
 * @param {含有重复对象的数组} arr 
 */
export const uniAddTree = (arr) => {
  const resArr = [arr[0]]
  arr.forEach(item => {
    let flag = true
    resArr.forEach(ele => item.fDeptId === ele.fDeptId && item.deptName === ele.deptName && (flag = false))
    flag && resArr.push(item)
  })
  return resArr
}
