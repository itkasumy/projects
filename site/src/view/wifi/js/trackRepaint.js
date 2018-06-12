import Vue from 'vue'
/**
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
    limitLeft = isFullScreen ? -970 : -967,
    limitTop = isFullScreen ? -553 : -606
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

export const createData = () => {
  let myData = {
    '192.168.9.2': [],
    '192.155.37.2': []
  } 
  for (let i = 0; i < 10; i++) {
    for (const key in myData) {
      if (myData.hasOwnProperty(key)) {
        const ele = myData[key];
        if(key === '192.168.9.2'){
          if(i % 2 === 0){
            ele.push({
              x: (i + 1) * (i + 15),
              y: (i + 1) * (i + 16)
            })
          }else {
            ele.push({
              x: (i + 1) * (i + 7),
              y: (i + 1) * (i + 16)
            })
          }
        }else {
          if(i % 2 === 0){
            ele.push({
              x: (i + 3) * (i + 29),
              y: (i + 3) * (i + 10)
            })
          }else {
            ele.push({
              x: (i + 3) * (i + 29),
              y: (i + 3) * (i + 30)
            })
          }
        }
      }
    }        
  }
  myData = {
    '192.168.3.2': [{x: 444, y: 1077}, {x: 767, y: 1197}, {x: 756, y: 943}, {x: 1028, y: 1000}, {x: 1044, y: 797}, {x: 1198, y: 717}, {x: 1271, y: 674}, {x: 1320, y: 617}, {x: 1419, y: 543}, {x: 1493, y: 507}, {x: 1549, y: 469}] ,
    '168.175.16.52': [{x: 761, y: 1208}, {x: 873, y: 1136}, {x: 961, y: 976}, {x: 1064, y: 1000}, {x: 1239, y: 859}, {x: 1320, y: 800}, {x: 1242, y: 883}, {x: 1128, y: 944}, {x: 1044, y: 996}, {x: 901, y: 1090}, {x: 814, y: 1160}] 
  }
  return myData;
}

export const drawLine = (cvNode, coordinateData, selectedMac) => {
  let cv = document.getElementById(cvNode);
  let lineColor = ['#57d046', '#f8b551', '#69b9ff', '#d563ce', '#53d8da', '#cbd04b', '#f45c8e', '#f6703b', '#48e4b3', '#6879f9']
  let lineIndex = 0;
  // 兼容性
  if(cv.getContext) {
    let context = cv.getContext('2d');
    // 清画布
    context.clearRect(0, 0, 2880, 1620);
    for (const key in coordinateData) {
      context.beginPath();
      if (coordinateData.hasOwnProperty(key)) {
        const item = coordinateData[key];
        item.forEach((ele, index) => {
          // // 末尾字体
          // context.font = "16px serif";
          // context.fillText(key, item[item.length - 1].x + 25, item[item.length - 1].y - 30);
          // 末尾头像
          // var img = new Image();
          // if(selectedMac===key){
          //   img.src = `../../../../static/images/color/ff0000.png`;
          // }else {
          //   img.src = `../../../../static/images/color/${lineColor[lineIndex].slice(1)}.png`;
          // }
          // img.onload = function(){
          //     context.drawImage(img, item[item.length - 1].x - 21, item[item.length - 1].y - 60);             
          // };
          // 线
          if(index == 0){
            context.moveTo(ele.x, ele.y);
          }else{
            context.lineTo(ele.x, ele.y);
          }
        });
      }
      context.lineWidth = 3;
      context.lineCap = "round";
      context.strokeStyle = selectedMac==key?'#ff0000':lineColor[lineIndex];
      lineIndex = lineIndex>8?0:++lineIndex;
      context.stroke();
    }
  }else {
    alert('你们家的浏览器不支持');
  }
}

