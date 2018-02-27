import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      cart: [],
      address: {
        id: null
      }
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
    // 总原价
    originalTotal({cart}) {
      let totalPrice = 0
      cart.forEach(item => {
        let price = (item.data.originalPrice || 0).mul(item.num)
        totalPrice = totalPrice.add(price)
      })
      return totalPrice
    },
    // 总现价
    presentTotal({cart}) {
      let totalPrice = 0
      cart.forEach(item => {
        totalPrice = totalPrice.add(item.price)
      })
      return totalPrice
    }
  },
  mutations: {
    // 设置购物车
    setCart(state, data) {
      state.cart = data
    },
    // 添加到购物车
    addToCart({cart}, data) {
      let isExisted = false
      let price = data.presentPrice || data.originalPrice || 0
      cart.forEach(item => {
        if (item.data.id === data.id) {
          if (data.maxNum && data.maxNum <= item.num) {
            isExisted = true
            return
          }
          if (data.limitNum && data.limitNum <= item.num) {
            price = data.originalPrice || 0
          }
          item.num++
          item.price = item.price.add(price)
          isExisted = true
        }
      })
      !isExisted && cart.push({data, num: 1, price})
    },
    // 从购物车中减少
    removeFromCart({cart}, data) {
      let price = data.presentPrice || data.originalPrice || 0
      cart.forEach((item, index) => {
        if (item.data.id === data.id) {
          if (item.num === 1) {
            cart.splice(index, 1)
          }
          if (data.limitNum && data.limitNum <= item.num) {
            price = data.originalPrice || 0
          }
          item.num--
          item.price = price.sub(item.price)
        }
      })
    },
    // 清空购物车
    clearCart({cart}) {
      cart.splice(0, cart.length)
      sessionStorage.removeItem('cart')
    },
    // 选择地址
    setAddress(state, data) {
      // console.log(data)
      state.address = data
      // state.address.id = data.id
    }
  },
  actions: {
    // 订单列表
    async ajaxOrderList(store, data) {
      let auth = localStorage.getItem('auth')
      let { data: res } = await axios.post('/innerservice/userOrders', data, JSON.parse(auth))
      return res
    },
    // 订单详情
    async ajaxOrderDetail(store, data) {
      let auth = localStorage.getItem('auth')
      let { data: res } = await axios.post('/innerservice/getOrderInfo', data, JSON.parse(auth))
      return res
    },
    // 退款详情
    async ajaxRefundDetail(store, data) {
      let auth = localStorage.getItem('auth')
      let { data: res } = await axios.post('/innerservice/getRefundInfo', data, JSON.parse(auth))
      return res
    },
    // 下单（创建订单）
    async ajaxPlaceOrder(store, data) {
      let auth = localStorage.getItem('auth')
      let { data: res } = await axios.post('/innerservice/orderinfo', data, JSON.parse(auth))
      return res
    },
    // 删除订单
    async ajaxDeleteOrder(store, data) {
      let auth = localStorage.getItem('auth')
      let { data: res } = await axios.post('/innerservice/removeOrder', data, JSON.parse(auth))
      return res
    },
    // 取消订单
    async ajaxCancelOrder(store, data) {
      let auth = localStorage.getItem('auth')
      let { data: res } = await axios.post('/innerservice/CancelOrder', data, JSON.parse(auth))
      return res
    },
    //获取qiniu token
    async ajaxGetQiniuToken(store, data) {
      let auth = localStorage.getItem('auth')
      let { data: res } = await axios.post('/innerservice/QiniuYun', null, JSON.parse(auth))
      return res.data;
    },
    // 提交订单评价
    async ajaxSubmitEvaluate({store}, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/CommentOnTheOrder', data, JSON.parse(auth))
      return res
    },
    // 获取评价详情
    async ajaxEvaluateDetail({store}, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/CommentOnTheDetails', data, JSON.parse(auth))
      return res
    },
    // 获取配送详情
    async ajaxDeliveryDetail({store}, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/dispatchingOrderInfo', data, JSON.parse(auth))
      return res
    },
  }
}
