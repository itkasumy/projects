<template>
  <div>
    <!--头部-->
    <common-header/>
    <div class="delivery__detail__container u-detail-box ">
      <div class="clearfix c-detail-header">
        <h2 class="title">{{$t('order.detail.deliDetail')}}</h2>
        <a href="javascript:;" class="back" @click="goBack">{{$t('common.back')}}<i class="iconfont icon-enter"></i></a>
      </div>
      <div class="detail__wrapper clearfix">
        <common-loading v-if="loading" />
        <common-no-data type="order" :message="$t('common.noOrder')" v-if="noOrder" />
        <div class="detail__out__wrapper" v-if="!noOrder">
          <div class="info">
            <div class="step__container green">
              <div class="step__wrapper">
                <div class="icon__wrapper">
                  <i class="iconfont icon-peisongxiangqing_dingdanicon"></i>
                </div>
                <div class="step__con clearfix">
                  <div class="arrow">
                    <em></em><span></span>
                  </div>
                  <div class="status u-middle">
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
                  <div class="status u-middle">
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
                  <div class="status u-middle">
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
          <div class="map">
            <div id="map">
            </div>
          </div>
        </div>
      </div>
    </div>
    <common-footer/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import $ from 'jquery'
export default {
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
    await this.initData();
    if (this.orderInfo.activityStatus === 5) {
      this.ifDeliverySuccess = true;
    }
    this.loading = false;
    if (!this.noOrder) {
      $('.detail__out__wrapper').show();
      this.initMap();
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
        markerShowHtml = `<div class="map__show__info">
        <h3>${this.$t('order.detail.step.myPos')}</h3>
        </div>`;
      } else {
        markerShowHtml = `<div class="map__show__info">
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
<style scope lang="scss">
.delivery__detail__container {
  @include container;
  margin-top: 20px;
  background: #fff;
  .detail__wrapper {
    border: 1px solid $bd-gray;
    .detail__out__wrapper {
      display: none;
    }
    .info {
      float: left;
      width: 450px;
      padding: 60px;
      .step__container {
        border-left: 1px solid $bd-gray;
        height: 150px;
        .step__wrapper {
          top: 50%;
          transform: translateY(-50%);
        }
        &.green {
          .icon__wrapper {
            border: 1px solid $green;
            .iconfont {
              color: $green;
            }
          }
          .step__con {
            .status {
              span {
                color: $green;
              }
            }
          }
        }
        &.black {
          .icon__wrapper {
            border: 1px solid $imp-color;
            .iconfont {
              color: $imp-color;
            }
          }
          .step__con {
            .status {
              span {
                color: $imp-color;
              }
            }
          }
        }
        &.gray {
          .icon__wrapper {
            border: 1px solid $bd-gray;
            .iconfont {
              color: $bd-gray;
            }
          }
          .step__con {
            background: #f5f5f5;
            .status {
              span {
                color: $bd-gray;
              }
              p {
                color: $bd-gray;
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
          left: -16px;
          background: #fff;
          border-radius: 100%;
          width: 32px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          top: 29px;
        }
        .step__con {
          border: 1px solid $bd-gray;
          border-radius: 4px;
          background: #fff;
          height: 90px;
          padding: 0 30px;
          margin-left: 40px;
          .arrow {
            position: absolute;
            bottom: 52px;
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
              border-color: $bd-gray transparent transparent;
            }
            span {
              border-color: #FFF transparent transparent;
              top: -1px;
            }
          }
          .arrow * {
            display: block;
            border-width: 8px;
            position: absolute;
            border-style: solid dashed dashed dashed;
            font-size: 0;
            line-height: 0;
          }
          .status {
            span {
              display: block;
              margin-bottom: 10px;
            }
            p {
              position: relative;
              font-size: 12px;
              color: #666;
              margin-bottom: 10px;
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
    .map {
      overflow: hidden;
      #map {
        width: 100%;
        height: 570px;
      }
    }
  }
}

.map__show__info {
  h3 {
    font-size: 18px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    margin: 0 0 5px;
    font-size: 14px;
    color: #666666;
    font-weight: 600;
  }
}

</style>
