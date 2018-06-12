import Vue from 'vue'
/**
 * 
 * @param {canvas} node 
 * @param {canvas的父盒子} parentNode 
 * @param {drag的样式} grabbing 
 * @param {全屏时候canvas的父盒子} isFullScreen 
 */
export const watchDrag = (parentNode, cvState, isFullScreen = false) => {
  let
    srcLeft = 0,
    srcTop = 0,
    srcCoordX = 0,
    srcCoordY = 0,
    tarLeft = 0,
    tarTop = 0,
    tarCoordX = 0,
    tarCoordY = 0,
    limitLeft = isFullScreen ? -970 : -1196,
    limitTop = isFullScreen ? -553 : -686
  const handler = (e) => {
    parentNode.style.left = srcLeft + e.clientX - srcCoordX + 'px'
    parentNode.style.top = srcTop + e.clientY - srcCoordY + 'px'
    parentNode.style.left = parentNode.offsetLeft < limitLeft ? `${limitLeft}px` : parentNode.offsetLeft > 0 ? 0 : `${srcLeft + e.clientX - srcCoordX}px`
    parentNode.style.top = parentNode.offsetTop < limitTop ? `${limitTop}px` : parentNode.offsetTop > 0 ? 0 : `${srcTop + e.clientY - srcCoordY}px`
  }
  parentNode.addEventListener('mousedown', (e) => {
    srcLeft = parentNode.offsetLeft
    srcTop = parentNode.offsetTop
    srcCoordX = e.clientX
    srcCoordY = e.clientY
    Vue.set(cvState, 'grabbing', true)
    parentNode.addEventListener('mousemove', handler)
  })
  document.addEventListener('mouseup', (e) => {
    Vue.set(cvState, 'grabbing', false)
    parentNode.removeEventListener('mousemove', handler)
  })
}

export const randomStr = (len) => {
  const str = 'abc-def_ghijklm-nop_qrstuv-w_xyz1234_-567890_-ABCDE_F-GHIJ_KLMNO-PQRS-TUVWXYZ'
  const arr = []
  for (let i = 0; i < len; i++) arr.push(str[Math.floor(Math.random() * str.length)])
  return arr.join('')
}

export const dateFmt = (str) => {
  const year = String(new Date(str).getFullYear())
  const month = String(new Date(str).getMonth() + 1).padStart(2, 0)
  const day = String(new Date(str).getDate()).padStart(2, 0)
  const hour = String(new Date(str).getHours()).padStart(2, 0)
  const minute = String(new Date(str).getMinutes()).padStart(2, 0)
  const second = String(new Date(str).getSeconds()).padStart(2, 0)
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
