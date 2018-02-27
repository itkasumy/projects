import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/scss/global.scss'
import md5 from 'md5'
// 全局插件
import ImgView from './plugins/imgView'

Vue.use(ImgView)
Vue.use(ElementUI)
Object.defineProperty(Vue.prototype, '$md5', { value: md5 })

import CommonHeader from './components/common/common-header'
import CommonFooter from './components/common/common-footer'
import CommonBackTop from './components/common/common-back-top'
import CommonNoData from './components/common/common-no-data'
import CommonLoading from './components/common/common-loading'
import CommonImgShow from './components/common/common-img-show'

Vue.component('common-header', CommonHeader)
Vue.component('common-footer', CommonFooter)
Vue.component('common-back-top', CommonBackTop)
Vue.component('common-no-data', CommonNoData)
Vue.component('common-loading', CommonLoading)
Vue.component('common-img-show', CommonImgShow)
/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
}

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

// 除法
function accDiv(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) {}
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) {}
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), accMul(c / d, Math.pow(10, f - e));
}

// 给Number类型增加方法
Number.prototype.add = function(arg) {
  if (this === null || arg === null) return null
  return accAdd(arg, this);
};
Number.prototype.sub = function(arg) {
  if (this === null || arg === null) return null
  return accSub(arg, this);
};
Number.prototype.mul = function(arg) {
  if (this === null || arg === null) return null
  return accMul(arg, this);
};
Number.prototype.div = function(arg) {
  if (this === null || arg === null) return null
  return accDiv(this, arg);
};

function formatDateTime(inputTime, type = '') {
  let date = new Date(inputTime);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  if (type == 'ymd') {
    return y + '-' + m + '-' + d;
  } else {
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  }

}

function checkData(data) {
  if (data.code === 1 || data.code === 9004) {
    return true;
  } else {
    if (data.code === 401) {
      this.$router.push('/account/login');
    } else {
      this.$message.error(data.message);
      return false;
    }
  }
}

Object.defineProperty(Vue.prototype, '$formatDateTime', { value: formatDateTime })
Object.defineProperty(Vue.prototype, '$checkData', { value: checkData })

Vue.filter('sexTranslate', (sex) => {
  return sex === 1 ? '女士' : '先生'
})
Vue.filter('formatPhone', (phone) => {
  let phoneArr = phone.split("");
  let everyN = parseInt(phoneArr.length / 4);
  let formatPhone = '';
  for (let i = 0; i < phoneArr.length; i++) {
    if (i >= 2 * everyN && i <= 3 * everyN) {
      formatPhone = formatPhone + '*';
    } else {
      formatPhone = formatPhone + phoneArr[i];
    }
  }
  return formatPhone;
})
// Vue.filter('toInt', (score) => {
//   return parseInt(score)
// })
// Vue.component('add-cart-animation', {
//   render() {
//     return <div style={{width: '30px', height: '30px', background: 'red'}}/>
//   }
// })
