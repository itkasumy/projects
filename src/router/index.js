import Vue from 'vue'
import Router from 'vue-router'
import Page404 from '@/page/404'
import Home from '@/page/home'
import Order from '@/page/order'
import User from '@/page/user'
import Search from '@/page/search'
import PlaceOrder from '@/page/place-order'
import PayOrder from '@/page/pay-order'
import SellerList from '@/page/seller-list'
import userRouter from './user'
import orderRouter from './order'
import ChooseAddress from '@/page/choose-address'
import CouponList from '@/page/consume/coupon-list'
import Setting from '@/page/setting'
// 店铺
import Seller from '@/page/seller'
import SellerHome from '@/page/seller/home'
import SellerComment from '@/page/seller/comment'
import SellerInfo from '@/page/seller/info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: Page404
    }, {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      component: Home
    }, {
      path: '/seller-list',
      component: SellerList
    }, {
      path: '/order/:type',
      component: Order
    }, {
      path: '/user',
      component: User
    }, {
      path: '/seller/:id',
      component: Seller,
      children: [
        {
          path: '/home',
          component: SellerHome
        }, {
          path: '/comment',
          component: SellerComment
        }, {
          path: '/info',
          component: SellerInfo
        }
      ]
    }, {
      path: '/search',
      component: Search
    }, {
      path: '/place-order',
      component: PlaceOrder
    }, {
      path: '/choose-address',
      component: ChooseAddress
    }, {
      path: '/coupon-list',
      component: CouponList
    }, {
      path: '/pay-order/:id',
      component: PayOrder
    },{
      path: '/setting',
      component: Setting
    },
    ...userRouter,
    ...orderRouter
  ]
})
