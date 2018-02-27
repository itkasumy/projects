import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      userInfo: null,
      areaCode: {
        countryName: null,
        phoneCode: null
      }
    }
  },
  mutations: {
    setUser(state, data) {
      state.userInfo = data
    },
    setAreaCode(state, data) {
      state.areaCode = data
    }
  },
  actions: {
    // 获取图片验证码
    async ajaxCodeImg() {
      let {data: res} = await axios.get('/openservice/getToken')
      let token = res.data.token
      let encodeToken = encodeURIComponent(token)
      return {token, codeImg: `${axios.defaults.baseURL}/openservice/getCodeImage?token=${encodeToken}`}
    },
    // 发送短信
    async ajaxSendMessage(store, data) {
      let {data: res} = await axios.post('/openservice/judgment', data)
      return res
    },
    // 登录
    async ajaxLogin(store, data) {
      let {data: res} = await axios.post('/openservice/doLogin', data)
      return res
    },
    // 注册
    async ajaxRegister(store, data) {
      let {data: res} = await axios.post('/openservice/registration', data)
      return res
    },
    // token获取用户信息
    async ajaxUserInfo(store) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/PersonalCenter', null, JSON.parse(auth))
      // if (res.code === 1) {
      //   store.commit('setUser', res.data.userinfo)
      // } else if (res.code === 401) {
      //   localStorage.removeItem('auth')
      // }
      return res
    },
    // 忘记密码，忘记资金密码
    async ajaxForgetPassword(store, data) {
      let {data: res} = await axios.post('/openservice/phonePassword', data)
      return res
    },
    // 修改密码，修改资金密码
    async ajaxChangePassword(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/ChangeThePassword', data, JSON.parse(auth))
      return res
    },
    // 新增资金密码
    async ajaxAddMoneyPassword(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/MoneyPassword', data, JSON.parse(auth))
      return res
    },
    // 资金密码状态
    async ajaxMoneyPasswordStatus() {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/balanceAndCoupon', null, JSON.parse(auth))
      return res
    },
    // 修改昵称或头像
    async ajaxChangeUserInfo(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/userinfo', data, JSON.parse(auth))
      return res
    },
    // 地址列表
    async ajaxAddressList(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/getUserAddress', data, JSON.parse(auth))
      return res
    },
    // 新增地址
    async ajaxNewAddress(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/saveAddress', data, JSON.parse(auth))
      return res
    },
    // 修改地址
    async ajaxChangeAddress(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/updateAddress', data, JSON.parse(auth))
      return res
    },
    // 删除地址
    async ajaxDeleteAddress(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/removeAddress', data, JSON.parse(auth))
      return res
    },
    // 地址详情
    async ajaxAddressDetail(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/showUpdateAddrInfo', data, JSON.parse(auth))
      return res
    },
    // 获取收藏列表
    async ajaxCollectList(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/userCollection', data, JSON.parse(auth))
      return res
    },
    // 收藏状态
    async ajaxCollectStatus(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/getUserCollectionStatus', data, JSON.parse(auth))
      return res
    },
    // 收藏，取消收藏
    async ajaxCollect(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/saveUserCollection', data, JSON.parse(auth))
      return res
    },
    // 获取个人中心余额与优惠券数量
    async ajaxBalanceAndCoupon(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/balanceAndCoupon', null, JSON.parse(auth))
      return res;
    },
    // 获取用户余额明细
    async ajaxBalanceLog(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/balanceLog', data, JSON.parse(auth))
      return res;
    },
    // 个人中心优惠券
    async ajaxCouponUser(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/couponlog', data, JSON.parse(auth))
      return res
    },
    // 获取优惠券（下单）
    async ajaxCouponList(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/myCoupon', data, JSON.parse(auth))
      return res
    },
    // 获取满减（下单）
    async ajaxFullReduction(store, data) {
      let auth = localStorage.getItem('auth')
      let {data: res} = await axios.post('/innerservice/FullReduction', data, JSON.parse(auth))
      return res
    },
    // 获取可送外卖地址
    async ajaxArea() {
      let {data: res} = await axios.post('/openservice/getArea', null)
      return res
    },
    // 获取可送外卖地址
    async ajaxPosition(store, data) {
      let {data: res} = await axios.get(`/openservice/positioning?Lon=${data.lon}&Lat=${data.lat}`, null)
      return res
    }
  }
}
