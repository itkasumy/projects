import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      sellerInfo: {
        businessEndTime: null,
        businessStartTime: null,
        deliScheme: null,
        deliveryInfo: null,
        deliveryInfoEn: null,
        distance: null,
        id: null,
        km: null,
        lat: null,
        limitDeliveryCost: null,
        location: null,
        locationEn: null,
        logistics: null,
        logo: null,
        lon: null,
        notice: null,
        noticeEn: null,
        phone: null,
        score: null,
        sellerName: null,
        sellerNameEn: null
      }
    }
  },
  mutations: {
    setSeller(state, data) {
      state.sellerInfo = data
    }
  },
  actions: {
    // 搜索
    async ajaxSearch(store, data) {
      let {data: res} = await axios.post('/openservice/indexSearch', data)
      return res
    },
    // 商家分类
    async ajaxSellerClass() {
      let {data: res} = await axios.post('/openservice/getSellerCat')
      return res
    },
    // 商家列表
    async ajaxSellerList(store, data) {
      let {data: res} = await axios.post('/openservice/sortSeller', data)
      return res
    },
    // 商家信息
    async ajaxSellerInfo(store, data) {
      let {data: res} = await axios.post('/openservice/getSellerInfo', data)
      if (res.code === 1) {
        store.commit('setSeller', res.data.seller)
      }
      return res
    },
    // 商家菜品列表
    async ajaxSellerGoods(store, data) {
      let {data: res} = await axios.post('/openservice/getSellerGoods', data)
      return res
    },
    // 商家评价列表
    async ajaxSellerRate(store, data) {
      let {data: res} = await axios.post('/openservice/getSellerComment', data)
      return res
    },
    // 商家评分统计
    async ajaxSellerPoints(store, data) {
      let {data: res} = await axios.post('/openservice/pcPoints', data)
      return res
    },
    // 商家资质信息
    async ajaxSellerQualification(store, data) {
      let {data: res} = await axios.post('/openservice/getSellerSaterial', data)
      return res
    }
  }
}
