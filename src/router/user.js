import Login from '@/page/user/login'
import Register from '@/page/user/register'
import ForgetPassword from '@/page/user/forget-password'
import NewAddress from '@/page/user/new-address'
import AreaList from '@/page/user/area-list'
import Address from '@/page/user/address'
import AddressList from '@/page/user/address-list'
import Balance from '@/page/user/balance'
import BalanceList from '@/page/user/balance-list'
import Collection from '@/page/user/collection'
import Coupon from '@/page/user/coupon'
import Account from '@/page/user/account'
import ChangeNickname from '@/page/user/change-nickname'
import ChangePass from '@/page/user/change-pass'
import ChangeMonPass from '@/page/user/change-monpass'
export default [{
  path: '/user/login',
  component: Login
}, {
  path: '/user/register',
  component: Register
}, {
  path: '/user/area-list',
  component: AreaList
}, {
  path: '/user/forget-password',
  component: ForgetPassword
}, {
  path: '/user/new-address',
  component: NewAddress
}, {
  path: '/user/address/:type',
  component: Address
}, {
  path: '/user/address-list',
  component: AddressList
}, {
  path: '/user/balance',
  component: Balance
}, {
  path: '/user/balance-list',
  component: BalanceList
}, {
  path: '/user/collection',
  component: Collection
}, {
  path: '/user/coupon',
  component: Coupon
}, {
  path: '/user/account',
  component: Account
}, {
  path: '/user/change-nickname',
  component: ChangeNickname
}, {
  path: '/user/change-pass',
  component: ChangePass
}, {
  path: '/user/change-monpass',
  component: ChangeMonPass
}]
