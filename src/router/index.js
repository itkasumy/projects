import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../page/home'
import ChooseAddress from '../page/choose-address'
import Login from '../page/account/login'
import Register from '../page/account/register'
import RetrievePassword from '../page/account/retrieve-password'
import Search from '../page/search'
import Place from '../page/place'
import Seller from '../page/seller/seller'
import SellerRate from '../page/seller/rate'
import SellerInfo from '../page/seller/info'
import MyOrder from '../page/user/my-order'
import DeliveryDetail from '../page/user/order/delivery-detail'
import OrderDetail from '../page/user/order/order-detail'
import RefundDetail from '../page/user/order/refund-detail'
import EvaluateOrder from '../page/user/order/evaluate-order'
import EvaluateDetail from '../page/user/order/evaluate-detail'
import MyCollection from '../page/user/my-collection'
import MyCoupon from '../page/user/my-coupon'
import MyAddress from '../page/user/my-address'
import MyAccount from '../page/user/my-account'
import MyBalance from '../page/user/my-balance'
import BalanceRecharge from '../page/user/balance-recharge'
import BalanceWithdrawal from '../page/user/balance-withdrawal'
import PlaceOrder from '../page/consume/place-order'
import PayOrder from '../page/consume/pay-order'
import Page404 from '../page/404'

export default new Router({
  routes: [{
    path: '*',
    component: Page404
  }, {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/choose-address',
    name: 'choose-address',
    component: ChooseAddress
  }, {
    path: '/account/login',
    name: 'login',
    component: Login
  }, {
    path: '/account/register',
    name: 'register',
    component: Register
  }, {
    path: '/account/retrieve-password',
    name: 'retrieve-password',
    component: RetrievePassword
  }, {
    path: '/search',
    name: 'search',
    component: Search
  }, {
    path: '/user/my-order/:type',
    name: 'my-order',
    component: MyOrder
  }, {
    path: '/place',
    name: 'place',
    component: Place
  }, {
    path: '/seller/:id',
    name: 'seller',
    component: Seller
  }, {
    path: '/user/order/order-detail/:id',
    name: 'order-detail',
    component: OrderDetail
  },
    {
      path: '/seller/rate/:id',
      name: 'seller-rate',
      component: SellerRate
    }, {
      path: '/user/order/refund-detail/:id',
      name: 'refund-detail',
      component: RefundDetail
    }, {
      path: '/seller/info/:id',
      name: 'seller-info',
      component: SellerInfo
    }, {
      path: '/user/order/evaluate-order/:id',
      name: 'evaluate-order',
      component: EvaluateOrder
    }, {
      path: '/order/place/',
      name: 'place-order',
      component: PlaceOrder
    }, {
      path: '/order/pay/:id',
      name: 'pay-order',
      component: PayOrder
    }, {
      path: '/user/order/evaluate-detail/:id',
      name: 'evaluate-detail',
      component: EvaluateDetail
    }, {
      path: '/user/order/delivery-detail/:id',
      name: 'delivery-detail',
      component: DeliveryDetail
    }, {
      path: '/user/my-collection',
      name: 'my-collection',
      component: MyCollection
    }, {
      path: '/user/my-coupon',
      name: 'my-coupon',
      component: MyCoupon
    }, {
      path: '/user/my-address',
      name: 'my-address',
      component: MyAddress
    }, {
      path: '/user/my-account',
      name: 'my-account',
      component: MyAccount
    }, {
      path: '/user/my-balance',
      name: 'my-balance',
      component: MyBalance
    }, {
      path: '/user/balance-recharge',
      name: 'balance-recharge',
      component: BalanceRecharge
    }, {
      path: '/user/balance-withdrawal',
      name: 'balance-withdrawal',
      component: BalanceWithdrawal
    }]
})
