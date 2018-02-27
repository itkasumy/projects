<template>
  <div class="choose-address">
    <v-header title="选择收货地址" class="u-fixed-header" v-if="notLogin"></v-header>
    <v-header title="选择收货地址" link="新增" linkUrl="/user/address/new" class="u-fixed-header" v-if="!notLogin"></v-header>
    <div class="u-main-content fixed">
      <div class="search__wrapper clearfix">
        <div class="city u-link" @click="cityListDisplay">
          <span>{{gussCity}}</span>
          <i class="iconfont icon-jiantou32"></i>
        </div>
        <div class="input u-mid-c--flex">
          <input type="text" placeholder="请输入地址" id="add__search" @keyup="search()">
        </div>
      </div>
      <div class="autoHide">
        <div class="choose__this__pos u-link-bg" @click="checkStaticPos">
          <i class="iconfont icon-dingwei"></i>点击定位当前位置
        </div>
        <div class="address__list__wrapper" v-if="!notLogin && addressList.length!=0">
          <div class="title">
            <i class="iconfont icon-dingwei1"></i>收货地址
          </div>
            <address-card v-for="(item, index) in addressList" :key="index" :item="item" noEdit="true"  @click.native="myAddChoose(item)"/>
        </div>
      </div>
      <div class="goo__search__list" v-if="searchList.length!=0">
        <div class="list__wrapper u-link-bg" v-for="(item, index) in searchList" :key="index" :item="item" @click="jump(item)">
          <div class="inner">
            <div class="add__name">
              {{item.name}}
            </div>
            <p>
              {{item.formatted_address}}
            </p>
          </div>
        </div>
      </div>
      <div class="city__list" v-if="cityListDis">
        <common-no-data message="获取城市列表出错，请刷新页面" v-if="noCityList && !getCityListloading" />
        <div class="list__wrapper u-link-bg" v-for="(item, index) in cityList" :key="index" :item="item" @click="changeCity(item)" v-else>
          <div class="inner">
            <div class="add__name">
              {{item.name}}
            </div>
          </div>
        </div>
        <v-button unblock v-if="noCityList && !getCityListloading" @click="getAddressArea(1)">刷新</v-button>
      </div>
      <div id="map">
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { mapActions } from 'vuex'
import CommonNoData from '@/components/common/common-no-data'
import AddressCard from '@/components/user/address-card'
export default {
  name: "choose-address",
  props: [],
  components: { CommonNoData,AddressCard },
  data() {
    return {
      map: null,
      placeService: null,
      radius: 500, //查询半径 以当前地点为圆心
      country: { 'country': ['PHL', 'CN'] }, //查询范围 国家给单位
      locPos: null, //选择定位位置
      staticLoc: null, //本地位置
      posLoading: true, //正在定位中
      gussCity: '定位中',
      searchList: [],
      maxL: 10, //列表最多显示条数
      cityList: [],
      cityListDis: false, //城市列表是否显示
      noCityList: false, //获取城市列表失败
      getCityListloading: true, //获取城市列表加载中
      getPositionLoading:true, //正在定位中
      addressList: [],
      notLogin:true
    }
  },
  mounted() {
    this.initialize();
  },
  methods: {
    ...mapActions('user', ['ajaxArea', 'ajaxPosition','ajaxAddressList']),
    initialize() {
      let self = this;
      self.getAddressList();
      self.getAddressArea();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          let location = JSON.parse(localStorage.getItem('location'));
          if (location) {
            self.locPos = {
              lat: location.lat,
              lng: location.lon
            };
            self.gussCity = location.cityName;
            self.getPositionLoading=false;
          } else {
            self.locPos = pos;
            self.getCity(pos);
          }
          self.staticLoc = pos;
          self.initMap();
        }, function() {});
      }
    },
    async getAddressList(){
      let self=this;
      self.$toast.loading();
      let res = await self.ajaxAddressList();

      if(res.code==1){
        self.addressList = [];
        res.data.forEach(item => {
          item.deleteShow = false;
          self.addressList.push(item)
        })
        self.notLogin=false;
      }else{
        if(res.code==403){
         self.notLogin=true;
        }
      }
      self.$toast.close();
    },
    initMap() {
      let self = this;
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: self.locPos
      });
      self.placeService = new google.maps.places.PlacesService(self.map);
    },
    search() {
      let self = this;
      let searchText = $('#add__search').val();
      if (searchText != "") {
        if(self.getPositionLoading){
          self.$toast.error('正在定位中，请稍后...');
          return false;
        }
        self.$toast.loading('正在查询...')
        $('.autoHide').hide();
        self.cityListDis = false;
        let request = {
          radius: self.radius,
          location: self.locPos,
          query: searchText
        };
        self.placeService.textSearch(request, self.searchCallback);

      } else {
        self.searchList = [];
        $('.autoHide').show();
        window.scrollTo(0, 0)
      }
    },
    searchCallback(results, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        return;
      }
      let self = this;
      let showl = 0;
      self.searchList = [];
      if (results.length >= self.maxL) {
        showl = self.maxL;
      } else {
        showl = results.length;
      }
      for (let i = 0; i < showl; i++) {
        self.searchList.push({
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng(),
          name: results[i].name,
          formatted_address: results[i].formatted_address
        });
      }
      self.$toast.close();
    },
    getCity(location) {
      let self = this;
      let locality = null,
        route = null,
        neighborhood = null;
      if (self.geocoder == null) {
        self.geocoder = new google.maps.Geocoder();
      }
      self.geocoder.geocode({ 'location': location }, function(results, status) {
        if (status == 'OK') {
          for (let i = 0; i < results[0].address_components.length; i++) {
            let types = results[0].address_components[i].types;
            if ((types.indexOf("locality")) != -1) {
              locality = results[0].address_components[i].long_name;
            }
            if ((types.indexOf("route")) != -1) {
              route = results[0].address_components[i].long_name;
            }
            if ((types.indexOf("neighborhood")) != -1) {
              neighborhood = results[0].address_components[i].long_name;
            }
          }
          if (locality != null) {
            locality = locality;
          } else if (route != null) {
            locality = route;
          } else {
            locality = neighborhood;
          }
          self.gussCity = locality;
          self.staticLoc.cityName = locality;
          self.posLoading = false;
          self.getPositionLoading=false;
        } else {
          self.$toast.error('定位错误，请刷新页面重试')
        }
      });
    },
    //获取已开通城市列表
    async getAddressArea(type = '') {
      let self = this;
      self.getCityListloading = true;
      if (type == 1) {
        self.$toast.loading()
      }
      let res = await self.ajaxArea()
      if (type == 1) {
        self.$toast.close()
      }
      self.getCityListloading = false;
      if (res.code === 1) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].value = res.data[i].name;
          self.cityList.push(res.data[i]);
        }
        self.noCityList = false;
      } else {
        self.noCityList = true;
        self.$toast.error(res.message)
      }

    },
    cityListDisplay() {
      // if (this.getCityListloading) {
      //   this.$toast.error('正在获取城市列表，请稍后!');
      //   return false;
      // }
      if (this.cityListDis) {
        $('.autoHide').show();
        window.scrollTo(0, 0)
      } else {
        $('.autoHide').hide();
      }
      this.cityListDis = !this.cityListDis;
      this.searchList = [];
    },
    changeCity(item) {
      let self = this;
      self.gussCity = item.name;
      let pos = {
        lat: item.lat,
        lng: item.lon
      };
      self.locPos = pos;
      self.cityListDisplay();
    },
    async jump(item) {
      let self = this;
      self.$toast.loading('正在查询该城市个开通状态...')
      let res = await self.ajaxPosition({ lat: item.lat, lon: item.lng })
      self.$toast.close();
      if (res.code != 1) {
        self.$toast.error(res.message)
        return false;
      }
      let choosed = {
        lat: item.lat,
        lon: item.lng
      };
      choosed.cityName = res.data.list.name;
      localStorage.setItem('location', JSON.stringify(choosed));
      this.$router.push('/home')
    },
    async checkStaticPos() {
      let self = this;
      if (self.staticLoc == null) {
        self.$toast('正在定位请稍后...');
      } else {
        self.$toast.loading('正在查询该城市开通状态...')
        let res = await self.ajaxPosition({ lat: self.staticLoc.lat, lon: self.staticLoc.lng })
        self.$toast.close();
        if (res.code != 1) {
          self.$toast.error(res.message)
          return false;
        }
        let choosed = {
          lat: self.staticLoc.lat,
          lon: self.staticLoc.lng
        };
        choosed.cityName = res.data.list.name;
        localStorage.setItem('location', JSON.stringify(choosed));
        this.$router.push('/home')
      }
    },
    async myAddChoose(item){
      let self=this;
      self.$toast.loading('正在查询该城市开通状态...')
      let res = await self.ajaxPosition({ lat: item.lat, lon: item.lon })
      self.$toast.close();
      if (res.code != 1) {
        self.$toast.error(res.message)
        return false;
      }
      let choosed = {
        lat: item.lat,
        lon: item.lon
      };
      choosed.cityName = res.data.list.name;
      localStorage.setItem('location', JSON.stringify(choosed));
      this.$router.push('/home')
    }
  }
}

</script>
<style scoped lang="scss">
.choose-address {
  .u-main-content {
    position: relative;
    .search__wrapper {
      z-index: 2;
      position: fixed;
      width: 100%;
      top: 2.2rem;
      background: #E3E3E3;
      height: 2rem;
      line-height: 2rem;
      box-sizing: border-box;
      padding: 0 .75rem;
      overflow: hidden;
      .city {
        float: left;
        width: 4rem;
        text-align: center;
        line-height: 2rem;
        height: 2rem;
        color: $font-important;
        text-align: left;
        span {
          font-size: 14px;
          margin-right: .5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 2.1rem;
          display: inline-block;
        }
        i {
          position: absolute;
        }
      }
      .input {
        height: 2rem;
        line-height: 2rem;
        overflow: hidden;
        input {
          width: 100%;
          border-radius: 8px;
          height: 1.5rem;
          border: none;
          outline: none;
          -webkit-appearance: none;
          padding: 0 1rem;
          font-size: 16px;
          &::placeholder {
            color: #ccc;
          }
        }
      }
    }
    .choose__this__pos {
      margin-top: 2.5rem;
      background: #fff;
      text-align: center;
      font-size: 14px;
      color: #999999;
      height: 2rem;
      line-height: 2rem;
      i {
        margin-right: .5rem;
      }
    }
    .address__list__wrapper {
      .title {
        font-size: 14px;
        color: #999999;
        padding: 0 .75rem;
        line-height: 2.25rem;
        i {
          margin-right: .5rem;
        }
      }
    }
    .goo__search__list,
    .city__list {
      top: 4.2rem;
      position: absolute;
      width: 100%;
      .list__wrapper {
        font-size: 16px;
        background: #fff;
        &:last-child {
          .inner {
            border: 0;
          }
        }
        .inner {
          border-bottom: 1px solid $grey-ddd;
          padding: .75rem .75rem .75rem 0;
          margin-left: .75rem;
          .add__name {
            color: $font-important;
          }
          p {
            margin-top: .45rem;
            color: #999999;
          }
        }
      }
    }
    #map {
      display: none;
    }
  }
}

</style>
