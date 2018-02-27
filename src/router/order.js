import OrderDetail from '@/page/order/order-detail'
import RefundDetail from '@/page/order/refund-detail'
import DeliveryDetail from '@/page/order/delivery-detail'

export default [{
  path: '/order/order-detail/:id',
  component: OrderDetail
},
  {
    path: '/order/refund-detail/:id',
    component: RefundDetail
  },
  {
    path: '/order/delivery-detail/:id',
    component: DeliveryDetail
  }
]
