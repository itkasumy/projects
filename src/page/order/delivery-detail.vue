<template>
  <div class="delivery-detail">
    <v-header title="配送详情" class="u-fixed-header"></v-header>
    <common-no-data type="order" message="订单不存在" v-if="noOrder && !loading" />
    <v-button @click="goBack" unblock v-if="noOrder && !loading">返回</v-button>
    <div class="u-main-content fixed">
      <div class="map">
        <div id="map">
        </div>
      </div>
      <div class="deli__detail">
        <div class="step__container green">
          <div class="step__wrapper">
            <div class="icon__wrapper">
              <i class="iconfont icon-peisongxiangqing_dingdanicon"></i>
            </div>
            <div class="step__con clearfix">
              <div class="arrow">
                <em></em><span></span>
              </div>
              <div class="status u-mid-c">
                <span>{{$t('order.detail.step.sub')}}</span>
                <p>{{orderInfo.orderTime}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="step__container" :class="{green:ifDeliverySuccess,black:!ifDeliverySuccess}">
          <div class="step__wrapper">
            <div class="icon__wrapper">
              <i class="iconfont icon-peisongxiangqing_shangjiaicon_xuanzhong1"></i>
            </div>
            <div class="step__con clearfix">
              <div class="arrow">
                <em></em><span></span>
              </div>
              <div class="status u-mid-c">
                <span>{{$t('order.detail.step.take')}}</span>
                <p>
                  {{$t('order.detail.step.deliMan')}} {{deliveryInfo.delivName}} {{$t('order.detail.step.deli')}}
                  <span class="phone"><i class="iconfont icon-dianhuacopy" @click="delimanShow"></i></span>
                </p>
                <p>{{orderInfo.accessTime}}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="step__container" :class="{green:ifDeliverySuccess,gray:!ifDeliverySuccess}">
          <div class="step__wrapper">
            <div class="icon__wrapper">
              <i class="iconfont icon-waimaiyiwancheng"></i>
            </div>
            <div class="step__con clearfix">
              <div class="arrow">
                <em></em><span></span>
              </div>
              <div class="status u-mid-c">
                <span>{{$t('order.detail.step.deliComplete')}}</span>
              </div>
              <div class="time" v-if="ifDeliverySuccess">
                <p>{{formatTime.deliverySuccessTime}}
                  <br><span>{{formatTime.deliverySuccessData}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import $ from 'jquery'
import CommonNoData from '@/components/common/common-no-data'
export default {
  components: { CommonNoData },
  data() {
    return {
      deliveryInfo: {},
      orderInfo: {},
      ifDeliverySuccess: false,
      loading: true,
      map: null,
      infowindow: null,
      markers: [],
      noOrder: false

    }
  },
  computed: {
    orderId() {
      return this.$route.params.id;
    },
  },
  async mounted() {
    this.loading = true;
    this.$toast.loading()
    await this.initData();
    if (this.orderInfo.activityStatus === 5) {
      this.ifDeliverySuccess = true;
    }
    this.$toast.close();
    this.loading = false;
    if (!this.noOrder) {
      this.initMap();
      $('.u-main-content').show();
    }
  },
  methods: {
    ...mapActions('order', ['ajaxDeliveryDetail', 'ajaxOrderDetail']),
    async initData() {
      let self = this;
      let orderId = self.orderId;
      let deliveryId = null;
      let res = null;
      let orderRes = await self.ajaxOrderDetail({ orderId: orderId })
      if (self.$checkData(orderRes)) {
        if (orderRes.code === 9004) {
          self.noOrder = true;
          return false;
        }
        self.orderInfo = orderRes.data.orderAndSeller;
        deliveryId = orderRes.data.orderAndSeller.deliveryId
        res = await self.ajaxDeliveryDetail({ orderId: orderId, delivId: deliveryId });
        if (self.$checkData(res)) {
          res.data.locShop = {
            lat: parseFloat(res.data.lat),
            lng: parseFloat(res.data.lon)
          }
          res.data.locDeli = {
            lat: parseFloat(res.data.delivLat),
            lng: parseFloat(res.data.delivLon)
          }
          self.deliveryInfo = res.data;
        }
      }

    },
    initMap() {
      let self = this;
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: self.deliveryInfo.locDeli
      });
      self.infowindow = new google.maps.InfoWindow();
      self.addMarker();
      self.mapInfoShow(1);
    },
    addMarker() {
      let self = this;
      //送货位置
      self.markers[0] = new google.maps.Marker({
        position: self.deliveryInfo.locShop,
        map: self.map
      });
      //配送员位置
      self.markers[1] = new google.maps.Marker({
        position: self.deliveryInfo.locDeli,
        map: self.map
      });
      google.maps.event.addListener(self.markers[0], 'click', function() {
        self.mapInfoShow(0);
      });
      google.maps.event.addListener(self.markers[1], 'click', function() {
        self.mapInfoShow(1);
      });
    },
    mapInfoShow(index) {
      let self = this;
      let markerShowHtml = '';
      let status = `${this.$t('order.detail.step.deliMan')} ${this.deliveryInfo.delivName} ${this.$t('order.detail.step.deli')}`;
      if (self.orderInfo.activityStatus === 5) {
        status = this.$t('order.detail.step.deliComplete');
      }
      if (index === 0) {
        markerShowHtml = `<div class="map__show__info--deli">
        <h3>${this.$t('order.detail.step.myPos')}</h3>
        </div>`;
      } else {
        markerShowHtml = `<div class="map__show__info--deli">
        <p>${status}</p>
        </div>`;
      }
      self.infowindow.setContent(markerShowHtml);
      self.infowindow.open(self.map, self.markers[index]);
    },
    delimanShow() {
      this.$alert(this.deliveryInfo.delivPhone, this.$t('order.detail.step.deliPhone'), {
        confirmButtonText: this.$t('common.ok'),
        callback: action => {}
      });
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}

</script>
<style scoped lang="scss">
.delivery-detail {
  .u-main-content {
    display: none;
  }
  .map {
    width: 100%;
    height: 16.5rem;
    #map {
      width: 100%;
      height: 16.5rem;
    }
  }
  .deli__detail {
    background: #fff;
    padding: 1rem;
    .step__container {
      border-left: 1px solid $grey-ddd;
      padding-bottom: 1.5rem;
      &:last-child {
        padding-bottom: 0;
      }
      .step__wrapper {
        position: relative;
      }
      &.green {
        .icon__wrapper {
          border: 1px solid #67C33A;
          .iconfont {
            color: #67C33A
          }
        }
        .step__con {
          .status {
            span {
              color: #67C33A;
            }
          }
        }
      }
      &.black {
        .icon__wrapper {
          border: 1px solid $font-important;
          .iconfont {
            color: $font-important;
          }
        }
        .step__con {
          .status {
            span {
              color: $font-important;
            }
          }
        }
      }
      &.gray {
        .icon__wrapper {
          border: 1px solid $grey-ddd;
          .iconfont {
            color: $grey-ddd;
          }
        }
        .step__con {
          background: #f5f5f5;
          .status {
            span {
              color: $grey-ddd;
            }
            p {
              color: $grey-ddd;
            }
          }
          .arrow {
            span {
              border-color: #f5f5f5 transparent transparent;
            }
          }
        }
      }
      .icon__wrapper {
        position: absolute;
        left: -.55rem;
        background: #fff;
        border-radius: 100%;
        width: 1.1rem;
        height: 1.1rem;
        top: 29px;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 50%;
        transform: translateY(-50%);
        i {
          font-size: 12px;
        }
      }
      .step__con {
        border: 1px solid $grey-ddd;
        border-radius: 6px;
        background: #fff;
        height: 4.5rem;
        padding: 0 .75rem;
        margin-left: 1.3rem;
        position: relative;
        .arrow {
          position: absolute;
          bottom: 2.65rem;
          left: 0;
          transform: rotate(90deg);
          -ms-transform: rotate(90deg);
          /* IE 9 */
          -moz-transform: rotate(90deg);
          /* Firefox */
          -webkit-transform: rotate(90deg);
          /* Safari 和 Chrome */
          -o-transform: rotate(90deg);
          /* Opera */
          em {
            border-color: $grey-ddd transparent transparent;
          }
          span {
            border-color: #FFF transparent transparent;
            top: -1px;
          }
        }
        .arrow * {
          display: block;
          border-width: .4rem;
          position: absolute;
          border-style: solid dashed dashed dashed;
          font-size: 0;
          line-height: 0;
        }
        .status {
          span {
            display: block;
            margin-bottom: .75rem;
            font-size: 14px;
          }
          p {
            position: relative;
            font-size: 12px;
            color: #666;
            margin-bottom: .5rem;
            .phone {
              border-left: 1px solid #CCCCCC;
              position: absolute;
              right: 0;
              top: 0;
              padding-left: 20px;
              i {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}

</style>
