<template>
  <div class="choose__address__container">
    <!--头部-->
    <common-header/>
    <div class="choose__address__wrapper clearfix">
      <div class="map__wrapper">
        <div id="map">
        </div>
      </div>
      <div class="address__list__wrapper">
        <el-popover ref="cityPopover" placement="bottom-start" width="420" trigger="click" v-model="cityDis">
          <div class="city__choose__container">
            <div class="top clearfix">
              <div class="u-inner-block">猜你在
                <el-button type="primary" plain size="mini" @click="changeToStatic">{{gussCity}}</el-button>
              </div>
              <el-autocomplete class="inline-input u-float-r" :fetch-suggestions="querySearch" placeholder="请输入城市名称" :trigger-on-focus="false" size="mini" @select="changeCity"></el-autocomplete>
            </div>
            <hr>
            <div class="city__list">
              <ul class="clearfix">
                <common-loading v-if="loading" />
                <li v-else v-for="(item, index) in cityList" :key="index" :item="item" @click="changeCity(item)">{{item.name}}</li>
              </ul>
            </div>
          </div>
        </el-popover>
        <div class="search__input__wrapper">
          <div class="el-input el-input--suffix clearrfix">
            <div class="select-city" v-popover:cityPopover>
              <a href="javascript:;" class="city__choose">
                <span>{{chooseCity}}</span>
                <i class="iconfont icon-arrLeft-fill1"></i>
              </a>
            </div>
            <div class="input__wrapper">
              <input placeholder="搜索商品、商店" type="text" class="el-input__inner" id="add__search" @keyup.enter="search">
              <span class="el-input__suffix">
            	<span class="el-input__suffix-inner">
            		<i class="el-input__icon el-icon-search"></i>
            	</span>
              </span>
            </div>
          </div>
        </div>
        <p class="address__num">搜索地址数: <span>{{showl}}</span></p>
        <div class="address__list">
          <h2>结果列表</h2>
          <ul class="list__wrapper">
            <common-no-data message="未搜索到相关地址" v-if="posList.length === 0 && isload==0" />
            <li v-for="(pos, index) in posList" :key="pos.index" @click="posChange(pos, index)" :class="{active: index === showIndex}">
              <a href="javascript:;">
              <i class="iconfont icon-location"></i>
              <h3>{{pos.name}}</h3>
              <p>{{pos.formatted_address}}</p>
            </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import $ from "jquery";
export default {
  data() {
    return {
      radius: 500, //查询半径 以当前地点为圆心
      country: { 'country': ['PHL', 'CN'] }, //查询范围 国家给单位
      locPos: null, //搜索圆心经纬度
      staticLoc: {}, //当前位置信息
      cityList: [], //城市详细信息列表
      loading: false,
      gussCity: '定位中...',
      chooseCity: '定位中...',
      cityDis: false, //城市选择框是否出现
      autocomplete: null,
      geocoder: null,
      posLoading: true, //正在定位中
      map: null,
      infowindow: null,
      service: null,
      posList: [], //查询结果列表显示
      showl: 0, //显示地址总数,
      showIndex: 0,
      isload: 0, //是否已经查询并限时完成
      maxL: 10, //列表最多显示条数
      markers: [], //map 标记
      choosed: {}, //上个页面传过来的数据
      ifStatic: true, //城市选择是否选择的是默认定位的地址
      choosedCity: {}, //已选择的城市,
      choosedId: {},
      choosedName:null
    }
  },
  async mounted() {
    let self = this
    $(window).resize(function() {
      self.autoHeight();
    });
    $(document).on('click', '.map__show__info button', function() {
      let lat = $(this).data('lat');
      let lng = $(this).data('lng');
      let pos = {
        lat: lat,
        lon: lng
      };
      self.jump(pos);
    });
    self.autoHeight();
    self.choosed = JSON.parse(sessionStorage.getItem('choosedLocation'));
    self.choosedId=self.choosed.id;
    self.choosedName=self.choosed.name;
    await self.getAddressArea();
    self.initialize();
  },
  methods: {
    ...mapActions('user', ['ajaxArea']),
    async getAddressArea() {
      let self = this;
      self.loading = true;
      let res = await self.ajaxArea()
      if (res.code === 1) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].value = res.data[i].name;
          self.cityList.push(res.data[i]);
        }
      } else {
        self.$message.error(res.message);
      }
      self.loading = false;
    },
    search() {
      let self = this;
      if ($('#add__search').val() == '') {
        self.showl = 0;
      } else {
        let request = {
          radius: self.radius,
          location: self.locPos,
          query: $('#add__search').val()
        };
        if (self.isload == 0) {
          self.choosedId=self.choosedCity.id;
          self.choosedName=self.choosedCity.name;
          self.service.textSearch(request, self.searchCallback);
        }
      }
    },
    initialize() {
      let self = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          self.locPos = pos;
          self.initMap();
          self.initAutocomplete();
          self.getCity(pos);
          self.changeCity(self.choosed);
          let request = {
            radius: self.radius,
            location: {
              lat: self.choosed.lat,
              lng: self.choosed.lon
            },
            query: self.choosed.searchText
          };
          $('#add__search').val(self.choosed.searchText);
          self.service.textSearch(request, self.searchCallback);
        }, function() {});
      }
    },
    initMap() {
      let self = this;
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: self.locPos,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false
      });
      self.infowindow = new google.maps.InfoWindow();
      self.service = new google.maps.places.PlacesService(self.map);
    },
    initAutocomplete() {
      let self = this;
      let circle = new google.maps.Circle({
        center: self.locPos,
        radius: self.radius
      });
      self.autocomplete = new google.maps.places.Autocomplete(document.getElementById('add__search'), {
        types: [],
        'componentRestrictions': self.country,
        bounds: circle.getBounds()
      });
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
          self.staticLoc = {
            name: locality,
            lat: location.lat,
            lon: location.lng
          }
          self.posLoading = false;
        } else {
          self.$message.error('定位错误，请刷新页面重试');
        }
      });
    },
    searchCallback(results, status) {
      let self = this;
      self.posList = [];
      self.clearMarkers();
      self.showl = 0;
      self.isload = 1;
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (results.length >= self.maxL) {
          self.showl = self.maxL;
        } else {
          self.showl = results.length;
        }
        for (let i = 0; i < self.showl; i++) {
          self.posList.push({
            lat: results[i].geometry.location.lat(),
            lng: results[i].geometry.location.lng(),
            index: i,
            name: results[i].name,
            formatted_address: results[i].formatted_address
          });
          self.addMarkerWithTimeout(results[i], i, self.showl, i * 200);
        }
        self.map.setCenter(results[0].geometry.location);
        self.map.setZoom(15);
      } else {
        self.showl = 0;
        self.isload = 0;
      }
    },
    addMarkerWithTimeout(res, i, showl, timeout) {
      let self = this;
      window.setTimeout(function() {
        self.markers[i] = new google.maps.Marker({
          position: res.geometry.location,
          map: self.map,
          animation: google.maps.Animation.DROP
        });
        google.maps.event.addListener(self.markers[i], 'click', function() {
          self.mapInfoShow(self.posList[i]);
        });
        if (i == showl - 1) {
          self.isload = 0;
          self.mapInfoShow(self.posList[0]);
        }
      }, timeout);
    },
    clearMarkers() {
      let self = this;
      for (let i = 0; i < self.markers.length; i++) {
        self.markers[i].setMap(null);
      }
      self.markers = [];
    },
    posChange(posObj, i) {
      let self = this;
      if (self.isload == 0) {
        self.showIndex = i;
        self.mapInfoShow(posObj);
      }
    },
    mapInfoShow(posObj) {
      let self = this;
      let markerShowHtml = `<div class="map__show__info">
        <h3>${posObj.name}</h3>
        <p>${posObj.formatted_address}</p>
        <button data-lat="${posObj.lat}" data-lng="${posObj.lng}">查看商家</button>
        </div>`;
      self.infowindow.setContent(markerShowHtml);
      self.infowindow.open(self.map, self.markers[posObj.index]);
    },
    changeCity(item) {
      let self = this;
      self.choosedCity = item;
      self.ifStatic = false;
      let pos = {
        lat: item.lat,
        lng: item.lon
      };
      self.locPos = pos;
      let circle = new google.maps.Circle({
        center: self.locPos,
        radius: self.radius
      });
      self.autocomplete.setBounds(circle.getBounds());
      self.chooseCity = item.name;
      self.cityDis = false;
    },
    changeToStatic() {
      if (self.posLoading) {
        return false;
      }
      this.changeCity(this.staticLoc);
      this.ifStatic = true;
    },
    querySearch(queryString, cb) {
      let cityList = this.cityList;
      let results = queryString ? cityList.filter(this.createFilter(queryString)) : cityList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (cityList) => {
        return (cityList.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    autoHeight() {
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      $('#map').css('height', clientHeight - 100);
      $('.address__list__wrapper').css('height', clientHeight - 100);
      $('.list__wrapper').css('height', clientHeight - 495);
    },
    async jump(pos) {
      let self = this;
      if (self.ifStatic) {
        let res = await self.ajaxPosition({ lat: pos.lat, lon: pos.lon })
        if (res.code != 1) {
          self.$message.error(res.message);
        }
        return false;
      }
      let choosed = pos;
      choosed.areaId = self.choosedId;
      choosed.cityName=self.choosedName;
      sessionStorage.setItem('location', JSON.stringify(choosed));
      self.$router.push('/place')
    }
  }
}

</script>
<style lang="scss">
.choose__address__container {
  .choose__address__wrapper {
    .map__wrapper {
      float: left;
      width: 60%;
    }
    .address__list__wrapper {
      width: 40%;
      float: right;
      .search__input__wrapper {
        width: 70%;
        margin: 70px 0 20px 60px;
        .select-city {
          float: left;
          text-align: center;
          background: #fff;
          border: 1px solid #dcdfe6;
          border-right: none;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          height: 40px;
          line-height: 40px;
          .city__choose {
            display: inline-block;
            position: relative;
            text-align: center;
            color: #333333;
            padding: 0 20px;
            width: 50px;
            span {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              display: block;
              position: relative;
              width: 40px;
            }
            i {
              color: #999;
              position: absolute;
              bottom: 0px;
              right: 12px;
            }
          }
        }
        .input__wrapper {
          overflow: hidden;
          input {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
      .address__num {
        width: 70%;
        font-size: 24px;
        color: #333;
        margin-left: 60px;
        span {
          margin-left: 10px;
          position: relative;
        }
      }
      .address__list {
        background: #fff;
        padding: 40px 60px;
        margin-top: 70px;
        h2 {
          font-size: 16px;
          margin-bottom: 40px;
        }
        ul {
          overflow-x: hidden;
          overflow-y: auto;
          li {
            &.active {
              a {
                background-color: #f2f5f7;
              }
              i {
                color: $color-primary;
              }
            }
            a {
              position: relative;
              display: block;
              line-height: 1.6em;
              padding: 15px 15px 15px 45px;
              position: relative;
              display: block;
              line-height: 1.6em;
              &:hover {
                background-color: #f2f5f7;
              }
              i {
                position: absolute;
                color: #666;
                left: 15px;
                top: 20px;
                font-size: 20px !important;
              }
              h3 {
                font-size: 16px;
                color: #333;
                font-weight: 700;
                margin-bottom: 10px;
              }
              p {
                margin: 3px 0;
                font-size: 14px;
                color: #666666;
                line-height: 18px;
              }
            }
          }
        }
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
    font-size: 13px;
    color: #999;
  }
  button {
    padding: 4px;
    font-size: 12px;
    border-radius: 4px;
    color: #fff;
    background-color: #ff4949;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #c4c4c4;
    border-color: #ff4949;
    margin: 0;
    outline: none;
    margin: 10px 0 0;
    &:hover {
      color: #fff;
      background-color: #fb7777;
      border-color: #fb7777;
    }
  }
}

.city__choose__container {
  .top {
    font-size: 12px;
    color: #333333;
    margin: 10px 0 15px 0;
    button {
      margin-left: 10px;
    }
    .city__search {
      width: 130px;
    }
  }
  .city__list {
    margin-top: 20px;
    ul {
      li {
        float: left;
        padding: 5px;
        margin: 0 10px;
        cursor: pointer;
        &:hover {
          color: $color-primary;
        }
      }
    }
  }
}

</style>
