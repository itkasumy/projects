<template>
  <div class="home">
    <!--头部-->
    <common-header/>
    <!--搜索功能-->
    <div class="main">
      <div class="container">
        <div class="panel" :class="{showMap:mapShow}">
          <h3 class="showMapHide"># PLEASE ENTER</h3>
          <h1 class="showMapHide">
            <span>YOUR</span> LOCATION
          </h1>
          <div class="search clearfix">
            <el-popover ref="cityPopover" placement="bottom-start" width="420" trigger="click" v-model="cityDis">
              <div class="city__choose__container">
                <div class="top clearfix">
                  <div class="u-inner-block">猜你在
                    <el-button type="primary" plain size="mini" @click="changeToStatic">{{gussCity}}</el-button>
                  </div>
                  <el-autocomplete class="inline-input u-float-r" :fetch-suggestions="querySearch" placeholder="请输入城市名称"
                                   :trigger-on-focus="false" size="mini" @select="changeCity"></el-autocomplete>
                </div>
                <hr>
                <div class="city__list">
                  <ul class="clearfix">
                    <common-loading v-if="loading"/>
                    <li v-else v-for="(item, index) in cityList" :key="index" :item="item" @click="changeCity(item)">
                      {{item.name}}
                    </li>
                  </ul>
                </div>
              </div>
            </el-popover>
            <div class="select-city" v-popover:cityPopover>
              <a href="javascript:;" class="city__choose">
                <span>{{chooseCity}}</span>
                <i class="iconfont icon-arrLeft-fill1"></i>
              </a>
            </div>
            <div class="el-input">
              <input placeholder="请输入用餐地址（办公室、单元或街道）" id="add__search" type="text" class="el-input__inner"
                     @keyup.enter="search">
            </div>
            <el-button type="primary" @click="search" class="search__btn">搜索</el-button>
            <div class="search__resalut clearfix">
              <div class="address__list__wrapper">
                <p class="address__num">搜索地址数: <span>{{showl}}</span></p>
                <div class="address__list">
                  <ul class="list__wrapper">
                    <common-no-data message="未搜索到相关地址" v-if="posList.length === 0 && isload==0"/>
                    <li v-for="(pos, index) in posList" :key="pos.index" @click="posChange(pos, index)"
                        :class="{active: index === showIndex}">
                      <a href="javascript:;">
                        <i class="iconfont icon-location"></i>
                        <h3>{{pos.name}}</h3>
                        <p>{{pos.formatted_address}}</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="google-map">
                <div id="map">
                </div>
              </div>
            </div>
          </div>
          <p class="showMapHide">
            At every moment, there are countless clients entrusted and expected to be delivered successfully, along with
            the prospectors, and with the achievement.
          </p>
        </div>
      </div>
    </div>
    <!--静态内容-->
    <home-static/>
    <!--底部-->
    <common-footer/>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import HomeStatic from "../components/home-static";
  import $ from "jquery";

  export default {
    data() {
      return {
        radius: 500, //查询半径 以当前地点为圆心
        country: {'country': ['PHL', 'CN']}, //查询范围 国家给单位
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
        jumpLoading: false, //跳转之前的判断 该地区是否开通
        mapShow: false, //判断是否显示搜索地图,
        clickMarker: null, //点击地图事件添加标记
        changeLoading: false //点击地图事件loading
      }
    },
    components: {HomeStatic},
    async mounted() {
      let self = this;
      let location = localStorage.getItem('location')
      if (location) {
        self.chooseCity = JSON.parse(location).cityName
      }
      $(document).on('click', '.map__show__info button', function () {
        let lat = $(this).data('lat');
        let lng = $(this).data('lng');
        let pos = {
          lat: lat,
          lon: lng
        };
        self.jump(pos);
      });
      await self.getAddressArea();
      self.initialize();
    },
    methods: {
      ...mapActions('user', ['ajaxArea', 'ajaxPosition']),
      //获取已开通城市列表
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
      //搜索
      search() {
        let self = this;
        if (self.posLoading) {
          return false;
        }
        if ($('#add__search').val() == '') {
          self.showl = 0;
        } else {
          if (!self.mapShow) {
            self.mapShow = true;
            self.initMap();
            self.initMapChoose();
          }
          let request = {
            radius: self.radius,
            location: self.locPos,
            query: $('#add__search').val()
          };
          if (self.isload == 0) {
            self.service.textSearch(request, self.searchCallback);
            self.showIndex = 0;

          }
        }
      },
      initialize() {
        let self = this;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            self.locPos = pos;
            self.initAutocomplete();
            self.geocoder = new google.maps.Geocoder();
            self.getCity(pos);
          }, function () {
          });
        } else {
          self.$message.error('定位错误，请刷新页面重试');
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
      initMapChoose() {
        let self = this;
        google.maps.event.addListener(self.map, "click", function (e) {
          if (self.clickMarker != null) {
            self.clickMarker.setMap(null);
            self.clickMarker = null;
          }
          let pos = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          }
          self.getMapChoose(pos, function (chooseInfo) {
            self.clickMarker = new google.maps.Marker({
              position: pos,
              map: self.map
            });
            let markerShowHtml = `<div class="map__show__info">
        <p>${chooseInfo}</p>
        <button data-lat="${pos.lat}" data-lng="${pos.lng}" type="button" class="el-button el-button--primary el-button--mini"><span>查看商家</span></button>
        </div>`;
            self.infowindow.setContent(markerShowHtml);
            setTimeout(function () {
              self.infowindow.open(self.map, self.clickMarker);
            }, 100)
            google.maps.event.addListener(self.clickMarker, 'click', function () {
              self.infowindow.setContent(markerShowHtml);
              self.infowindow.open(self.map, self.clickMarker);
            });

          });
        });
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
      //定位城市
      getCity(location) {
        let self = this;
        let locality = null,
          route = null,
          neighborhood = null;
        self.geocoder.geocode({'location': location}, function (results, status) {
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
            let storLocation = localStorage.getItem('location')
            if (!storLocation) {
              self.chooseCity = locality;
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
      //地图点选详情
      getMapChoose(location, fn) {
        let self = this;
        if (self.chooseLoading) {
          return false;
        }
        let load = self.$message({
          message: '正在获取位置信息...',
          duration: 0
        });
        self.chooseLoading = true;
        self.geocoder.geocode({'location': location}, function (results, status) {
          self.chooseLoading = false;
          load.close();
          if (status == 'OK') {
            fn(results[0].formatted_address);
          } else {
            self.$message.error('获取位置信息错误，请重新选择');
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
            self.addMarkerWithTimeout(results[i], i, self.showl);
          }
          $('.list__wrapper').animate({scrollTop: 0}, 100);
          self.map.setCenter(results[0].geometry.location);
          self.map.setZoom(15);
        } else {
          self.showl = 0;
          self.isload = 0;
        }
      },
      addMarkerWithTimeout(res, i, showl) {
        let self = this;
        self.markers[i] = new google.maps.Marker({
          position: res.geometry.location,
          map: self.map
        });
        google.maps.event.addListener(self.markers[i], 'click', function () {
          self.mapInfoShow(self.posList[i]);
        });
        if (i == showl - 1) {
          self.isload = 0;
          self.mapInfoShow(self.posList[0]);
        }
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
        <button data-lat="${posObj.lat}" data-lng="${posObj.lng}" type="button" class="el-button el-button--primary el-button--mini"><span>查看商家</span></button>
        </div>`;
        self.infowindow.setContent(markerShowHtml);
        self.infowindow.open(self.map, self.markers[posObj.index]);
      },
      changeCity(item) {
        let self = this;
        self.chooseCity = item.name;
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
        self.cityDis = false;
      },
      changeToStatic() {
        if (this.posLoading) {
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
      async jump(pos) {
        let self = this;
        if (self.jumpLoading) {
          return false;
        }
        let load = self.$message({
          message: '正在查询该地区开通状态...',
          duration: 0
        });
        self.jumpLoading = true;
        let res = await self.ajaxPosition({lat: pos.lat, lon: pos.lon})
        load.close();
        self.jumpLoading = false;
        if (res.code != 1) {
          self.$message.error(res.message);
          return false;
        }
        let choosed = pos;
        choosed.areaId = res.data.list.id;
        choosed.cityName = res.data.list.name;
        localStorage.setItem('location', JSON.stringify(choosed));
        self.$router.push('/place')
      }
    }
  }

</script>
<style lang="scss">
  .home {
    background: #fff;
    .main {
      width: 100%;
      height: 600px;
      background: url("/loong/static/img/pic_search_bg.png") center;
      .container {
        @include container;
      }
      .panel {
        width: 600px;
        padding-top: 169px;
        transition-duration: 1s;
        &.showMap {
          padding-top: 70px;
          .showMapHide {
            display: none;
          }
          .search__resalut {
            opacity: 1 !important;
          }
        }
        h3 {
          font-size: 30px;
          color: #665C5C;
          font-weight: normal;
        }
        h1 {
          font-size: 64px;
          span {
            font-weight: 300;
          }
        }
        .search {
          margin-top: 20px;
          .search__resalut {
            transition-duration: 1s;
            opacity: 0;
            position: absolute;
            width: 1180px;
            top: 70px;
            z-index: 1;
            box-shadow: 2px 2px 10px -2px #a9a9a9;
            .address__list__wrapper {
              height: 600px;
              float: left;
              width: 380px;
              background: #fff;
              overflow: hidden;
              .address__num {
                font-size: 18px;
                color: #333;
                margin: 0;
                padding: 30px 0;
                text-align: center;
                span {
                  margin-left: 10px;
                  position: relative;
                }
              }
              .address__list {
                background: #fff;
                padding: 20px;
                ul {
                  overflow-x: hidden;
                  overflow-y: auto;
                  height: 476px;
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
            .google-map {
              overflow: hidden;
              #map {
                width: 100%;
                height: 600px;
              }
            }
          }
          .select-city {
            float: left;
            width: 142px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            background: #fff;
            border: 1px solid #dcdfe6;
            border-right: none;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            .city__choose {
              display: inline-block;
              width: 104px;
              position: relative;
              text-align: center;
              color: #333333;
              padding: 0 20px;
              span {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                display: block;
                width: 82px;
                position: relative;
              }
              i {
                color: #999;
                position: absolute;
                bottom: 0px;
                right: 25px;
              }
            }
          }
          .el-input {
            float: left;
            width: 358px;
            height: 60px;
            .el-input__inner {
              height: 60px;
              border-right: none;
              border-radius: 0;
            }
          }
          .search__btn {
            float: left;
            width: 100px;
            height: 60px;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
          }
        }
        p {
          margin-top: 26px;
          color: #999999;
          font-size: 14px;
        }
      }
    }
  }

  .map__show__info {
    h3 {
      font-size: 18px !important;
      color: #333 !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 13px !important;
      color: #999 !important;
      margin-top: 2px !important;
    }
    button {
      margin-top: 10px;
    }
  }

  .city__choose__container {
    .top {
      font-size: 12px;
      color: #333333;
      margin: 3px 10px 15px 10px;
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
