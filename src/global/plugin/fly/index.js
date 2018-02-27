import Fly from './fly'

export default {
  install(Vue, init = {}) {
    const FlyController = Vue.extend(Fly)
    Vue.prototype.$fly = (option = {}) => {
      let instance = new FlyController().$mount(document.createElement('div'))
      document.body.appendChild(instance.$el)
      instance.init()
      setTimeout(() => {
        instance.close()
      }, 2000)
    }
  }
}
