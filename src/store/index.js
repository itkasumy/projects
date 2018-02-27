import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = 'http://192.168.1.49:8899/waimai'
// axios.defaults.baseURL = 'http://192.168.1.48/waimai'
axios.defaults.baseURL = 'https://loong.ph/waimai'
axios.defaults.timeout = 10000

axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
})

Vue.use(Vuex)

import user from './user'
import seller from './seller'
import order from './order'

export default new Vuex.Store({
  modules: {
    user, seller, order
  }
})

