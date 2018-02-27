import Vue from 'vue'
import NP from 'number-precision'

export default {
  namespaced: true,
  state() {
    return {
      cart: []
    }
  },
  getters: {
    // 获取商品在购物车中的数量
    getNumInCart: ({cart}) => (id) => {
      let num = 0
      cart.forEach(item => {
        if (item.data.id === id) num = item.num
      })
      return num
    },
    // 购物车商品总数
    totalNum({cart}) {
      let num = 0
      cart.forEach(item => {
        num += item.num
      })
      return num
    },
    // 总价
    totalPrice({cart}) {
      let totalPrice = 0
      cart.forEach(item => {
        totalPrice = NP.plus(totalPrice, item.price)
      })
      return totalPrice
    },
    // 总原价
    originalTotal({cart}) {
      let totalPrice = 0
      cart.forEach(item => {
        let price = NP.times(item.data.originalPrice, item.num)
        totalPrice = NP.plus(totalPrice, price)
      })
      return totalPrice
    },
  },
  mutations: {
    // 清空购物车
    clearCart(state) {
      state.cart = []
    },
    // 添加到购物车
    addToCart({cart}, data) {
      let isExisted = false
      let price = data.presentPrice || data.originalPrice
      cart.forEach(item => {
        if (item.data.id === data.id) {
          isExisted = true
          // 超过最多购买
          if (data.maxNum && data.maxNum <= item.num) {
            Vue.prototype.$toast.warning('超过最多购买')
            return
          }
          // 超过最多优惠
          if (data.limitNum && data.limitNum <= item.num) {
            Vue.prototype.$toast(`限${data.limitNum}件优惠`)
            price = data.originalPrice || 0
          }
          item.num++
          item.price = NP.plus(item.price, price)
        }
      })
      !isExisted && cart.push({data, num: 1, price})
    },
    // 从购物车中移除
    removeFromCart({cart}, data) {
      let price = data.presentPrice || data.originalPrice
      cart.forEach((item, index) => {
        if (item.data.id === data.id) {
          if (item.num === 1) {
            cart.splice(index, 1)
            return
          }
          if (data.limitNum && data.limitNum <= item.num) {
            price = data.originalPrice
          }
          item.num--
          item.price = NP.minus(item.price, price)
        }
      })
    },
  }
}
