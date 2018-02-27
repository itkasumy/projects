import Vue from 'vue'

// 插件
import Swiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(Swiper)

// 自定义插件
import Toast from './plugin/toast'
import Fly from './plugin/fly'

Vue.use(Toast)
Vue.use(Fly)

// 全局指令
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

// 全局函数
import md5 from 'md5'
import NP from 'number-precision'
import axios from 'axios'

Vue.prototype.$md5 = md5
Vue.prototype.$math = NP
Vue.prototype.$http = axios

// 全局混合
import VHeader from './components/v-header'
import VButton from './components/v-button'
import VInput from './components/v-input'
import VScore from './components/v-score'
import VListItem from './components/v-list-item'
import VListLoading from './components/v-list-loading'
import VInputNumber from './components/v-input-number'
import VLoading from './components/v-loading'

Vue.mixin({
  components: {
    VHeader, VButton, VInput, VScore, VListItem, VListLoading, VInputNumber, VLoading
  },
  filters: {
    sexTran(sex) {
      return sex === 0 ? '男' : '女'
    },
    numTran(num) {
      return parseInt(num) > 999 ? '999+' : num
    },
    dateTran(timestamp) {
      let date = new Date(timestamp)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '-' + month + '-' + day
    },
    phoneTran(phone) {
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
    }
  },
  methods: {
    $goBack() {
      this.$router.go(-1)
    },
    $getBottomDistance() {
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      return scrollHeight - clientHeight - scrollTop
    },
    $checkData(data) {
      if (data.code === 1 || data.code === 9004) {
        return true;
      } else if (data.code === 401) {
        this.$router.push('/user/login');
      } else {
        this.$toast.error(data.message);
        return false;
      }
    }
  }
})

