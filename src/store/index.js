import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import createPersistedState from 'vuex-persistedstate'

// axios.defaults.baseURL = 'http://192.168.1.49:8899/waimai'
axios.defaults.baseURL = 'http://192.168.1.48/waimai'
// axios.defaults.baseURL = 'https://loong.ph/waimai'
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
import cart from './cart'

export default new Vuex.Store({
  state() {
    return {
      count: 1
    }
  },
  plugins: [createPersistedState()],
  mutations: {
    add(state) {
      state.count++
    }
  },
  modules: {
    user, seller, order, cart
  }
})
