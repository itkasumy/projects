import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      address: null,
      coupon: null,
      reduction: null,
      couponList: [],
      reductionList: []
    }
  },
  // getters: {
  //   couponMoney({coupon}) {
  //     // if(coupon)
  //   },
  //   reductionMoney() {
  //   }
  // },
  mutations: {
    setAddress(state, data) {
      state.address = data
    },
    setCoupon(state, data) {
      state.coupon = data
      state.reduction = null
    },
    setReduction(state, data) {
      state.reduction = data
      state.coupon = null
    },
    setCouponList(state, data) {
      state.couponList = data
    },
    setReductionList(state, data) {
      state.reductionList = data
    },
  },
  actions: {
    // 下单（创建订单）
    async ajaxPlaceOrder(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/orderinfo', data, JSON.parse(auth))
      return res
    },
    // 订单列表
    async ajaxOrderList(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/userOrders', data, JSON.parse(auth))
      return res
    },
    // 订单详情
    async ajaxOrderDetail(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/getOrderInfo', data, JSON.parse(auth))
      return res
    },
    // 退款详情
    async ajaxRefundDetail(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/getRefundInfo', data, JSON.parse(auth))
      return res
    },
    // 获取配送详情
    async ajaxDeliveryDetail({store}, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/dispatchingOrderInfo', data, JSON.parse(auth))
      return res
    },
    //删除订单
    async ajaxDeleteOrder(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/removeOrder', data, JSON.parse(auth))
      return res
    },
    // 取消订单
    async ajaxCancelOrder(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/CancelOrder', data, JSON.parse(auth))
      return res
    },
    //获取qiniu token
    async ajaxGetQiniuToken(store, data) {
      let auth = localStorage.getItem('auth')
      let { data: res } = await axios.post('/innerservice/QiniuYun', null, JSON.parse(auth))
      return res.data;
    },
  }
}
