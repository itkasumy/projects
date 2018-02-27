import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import './global'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

Vue.config.productionTip = false
//i18n
let lang=null,messages=null;
if (localStorage.getItem('lang') === null) {
	lang = 'zh';
} else {
	lang = localStorage.getItem('lang');
}
switch (lang) {
  case 'zh':
	messages = require('@/assets/json/lang/zh.json')
    break;
}
const i18n = new VueI18n({
  locale: lang,
  messages: messages,
});
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App },
  i18n
}).$mount('#app');
