import Vue from 'vue'
import Router from 'vue-router'
import Website from './Website'

Vue.use(Router)

export default new Router({
  routes: [
    ...Website
  ]
})
