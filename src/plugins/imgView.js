import CommonImgShow from '../components/common/common-img-show'

export default {
  install: function (Vue, para = {}) {
    const ImgViewController = Vue.extend(CommonImgShow)
    Vue.prototype.$imgView = (para = {}) => {
      let instance = new ImgViewController().$mount(document.createElement('div'))
      instance.para = para
      document.body.appendChild(instance.$el)
      return instance;
    }
  }
}
