import Vue from 'vue'
import Element from 'element-ui'//导入element-ui
import router from './router'// 导入路由
import App from './App'//导入根组件
import store from './store'//全局状态管理
import $ from 'jquery'
import VueVideoPlayer from 'vue-video-player'
Vue.use(VueVideoPlayer);

// require videojs style
require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
require('videojs-contrib-hls/dist/videojs-contrib-hls');

Vue.config.productionTip = false
//基于vue的
Vue.use(Element)
//导入初始化样式
import  './common/css/base.css'

//导入element-ui的全局样式
import 'element-ui/lib/theme-chalk/index.css'

// 全局过滤器


router.beforeEach(( to, from, next )=>{
    next()
})

new Vue({
  el: '#app',
  router,
  data:{
    Bus:new Vue(),
    groupId: ''
  },
  store,
  render:h=>h(App)
})
