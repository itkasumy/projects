<template>
  <div class="address__container bg-white">
    <v-header :title="title" class="u-fixed-header"></v-header>
    <div class="u-main-content fixed">
      <div class="address__table">
        <div class="item clearfix">
          <div class="title">
            姓名
          </div>
          <div class="content">
            <input type="text" placeholder="请输入姓名" v-model="addName">

          </div>
        </div>
        <div class="item clearfix sex__wrapper">
          <div class="content">
            <label><input name="sex" type="radio" value="0" v-model="addSex"/>先生 </label>
            <label><input name="sex" type="radio" value="1" v-model="addSex"/>女士 </label>
          </div>
        </div>
        <div class="item clearfix">
          <div class="title">
            手机
          </div>
          <div class="content">
            <input type="text" placeholder="请输入电话" v-model="addPhone">
          </div>
        </div>
        <div class="item clearfix address__choose">
          <div class="title">
            地址
          </div>
          <div class="content u-link" @click="mapOpen">
            <i class="iconfont icon-location1"/>
            <p :class="{active:chooseAdd}">{{chooseAdd || '点击选择收货地址'}}</p><i class="iconfont icon-enter"></i>
          </div>
        </div>
        <div class="item clearfix">
          <div class="title">
            门牌号
          </div>
          <div class="content">
            <input type="text" placeholder="如：12号楼808室" v-model="addHouseNumer">
          </div>
        </div>
        <v-button type="primary" class="sub--btn" @click="saveAddress">确定</v-button>
      </div>
    </div>
    <div class="map" :class="{show:mapShow}">
      <div class="top__search">
        <i class="iconfont icon-search"/><input type="text" placeholder="输入要查找的地区" v-model="addSearch"
                                                @keyup="search()">
      </div>
      <div class="goo__search__list" v-if="searchList.length!=0">
        <div class="list__wrapper u-link-bg" v-for="(item, index) in searchList" :key="index" :item="item"
             @click="changPos(item)">
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
      <div class="bottom">
        <div class="my__pos u-link" @click="changeToStatic">
          <i class="iconfont icon-dingwei1"/>
        </div>
        <div class="msg__box">{{chooseAdd}}</div>
        <v-button type="primary" @click="mapShow=false">确定</v-button>
      </div>
      <div id="map"></div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    props: [],
    components: {},
    data() {
      return {
        addName: '', //姓名
        addSex: '0', //性别
        addPhone: '', //手机
        addHouseNumer: '', //具体地址门牌号,
        locPos: null,
        staticPos: null,
        map: null,
        placeService: null,
        marker: null,
        searchList: [],
        addSearch: '',
        choosed: null, //选择的地址
        chooseAdd: null, //选择的地址名称
        geocoder: null,
        mapShow: false,
        mapInit: false,
        addDetail: null
      }
    },
    computed: {
      addressType() {
        return this.$route.params.type;
      },
      title() {
        if (this.addressType === 'new') {
          return '新增收货地址';
        } else {
          return '编辑收货地址';
        }
      },
      type(){
        let type=this.$route.query.type || false;
        return type;
      },
      sellerId(){
        let id=this.$route.query.sellerId || false;
        return id;
      }
    },
    mounted() {
      if (this.addressType !== 'new') {
        this.setData();
      }
    },
    methods: {
      ...mapActions('user', ['ajaxNewAddress', 'ajaxChangeAddress', 'ajaxAddressDetail']),
      async setData() {
        let self = this;
        self.$toast.loading();
        let res = await self.ajaxAddressDetail({addrId: self.addressType});
        self.$toast.close();
        if (self.$checkData(res)) {
          self.addDetail = res.data;
          self.addName = res.data.name;
          self.addSex = res.data.sex + '';
          self.addPhone = res.data.phone;
          self.addHouseNumer = res.data.houseNumber;
          self.chooseAdd = res.data.address;
          self.locPos = {
            lat: parseFloat(res.data.lat),
            lng: parseFloat(res.data.lon)
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
            self.staticPos = pos;
            if (self.addressType === 'new') {
              self.locPos = pos;
              self.getAdd(pos);
            }
            self.initMap();
          }, function () {
          });
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
        self.placeService = new google.maps.places.PlacesService(self.map);
        self.marker = new google.maps.Marker({
          position: self.locPos,
          animation: google.maps.Animation.DROP,
          map: self.map,
        });
        google.maps.event.addListener(self.map, 'drag', function (MouseEvent) {
          let pos = {
            lat: self.map.getCenter().lat(),
            lng: self.map.getCenter().lng()
          }
          self.marker.setPosition(pos)
        });
        google.maps.event.addListener(self.map, 'dragend', function (MouseEvent) {
          let pos = {
            lat: self.map.getCenter().lat(),
            lng: self.map.getCenter().lng()
          }
          self.locPos = pos;
          self.getAdd(pos);
        });
      },
      search() {
        let self = this;
        let searchText = self.addSearch;
        if (searchText != "") {
          self.$toast.loading('正在查询...')
          self.cityListDis = false;
          let request = {
            radius: self.radius,
            location: self.locPos,
            query: searchText
          };
          self.placeService.textSearch(request, self.searchCallback);

        } else {
          self.searchList = [];
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
      changPos(item) {
        this.locPos = {
          lat: item.lat,
          lng: item.lng,
        }
        this.map.panTo(this.locPos);
        this.marker.setPosition(this.locPos)
        this.chooseAdd = item.formatted_address;
        this.searchList = [];
      },
      getAdd(location) {
        let self = this;
        if (self.geocoder == null) {
          self.geocoder = new google.maps.Geocoder();
        }
        self.geocoder.geocode({'location': location}, function (results, status) {
          if (status == 'OK') {
            self.chooseAdd = results[0].formatted_address;
          } else {
            //self.$toast.error('定位错误，请刷新页面重试')
          }
        });
      },
      changeToStatic() {
        this.map.panTo(this.staticPos);
        this.marker.setPosition(this.staticPos);
        this.getAdd(this.staticPos);
      },
      mapOpen() {
        this.mapShow = true;
        if (!this.mapInit) {
          this.initialize();
          this.mapInit = true;
        }
      },
      async saveAddress() {
        let self = this;
        if (!self.chooseAdd || !self.addName || !self.addPhone || !self.addHouseNumer || self.locPos == null) {
          self.$toast.error('请填写完整')
        } else {
          self.$toast.loading('正在提交...')
          let params = {
            address: self.chooseAdd,
            name: self.addName,
            sex: self.addSex,
            phone: self.addPhone,
            houseNumer: self.addHouseNumer,
            lat: self.locPos.lat,
            lon: self.locPos.lng,
          }
          if (self.addressType === 'new') {
            let res = await self.ajaxNewAddress(params)
            self.$toast.close();
            if (self.$checkData(res)) {
              self.$toast.success('新增地址成功')
              setTimeout(() => {
                if(self.type){
                  self.$router.push({
                    path: '/user/address-list',
                    query: {
                      type: 'order',
                      sellerId:self.sellerId
                    }
                  })
                }else{
                  self.$router.go(-1)
                }
              }, 1500)
            }
          } else {
            params.addrId = self.addDetail.id;
            let res = await self.ajaxChangeAddress(params)
            self.$toast.close();
            if (self.$checkData(res)) {
              self.$toast.success('编辑地址成功')
              setTimeout(() => {
                self.$router.go(-1)
              }, 1500)
            }
          }
        }
      }
    }
  }

</script>
<style scoped lang="scss">
  .address__container {

    .map {
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      z-index: 2;
      padding-top: 2.2rem;
      box-sizing: border-box;
      &.show {
        display: block;
      }
      .top__search {
        padding: .375rem .75rem;
        background: #E2E3E6;
        box-shadow: inset 0 -1px 0 0 #DDDDDD;
        position: absolute;
        width: 100%;
        z-index: 1;
        box-sizing: border-box;
        height: 2.2rem;
        i {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 1.5rem;
          z-index: 1;
        }
        input {
          width: 100%;
          border: none;
          outline: none;
          -webkit-appearance: none;
          font-size: 16px;
          box-sizing: border-box;
          height: 1.4rem;
          border-radius: 5px;
          padding-left: 1.8rem;
          padding-right: .75rem;
          top: 50%;
          transform: translateY(-50%);
          position: relative;
          &::placeholder {
            color: #ccc;
          }
        }
      }
      .goo__search__list {
        top: 4.4rem;
        position: absolute;
        width: 100%;
        z-index: 1;
        height: 400px;
        overflow: auto;
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
      .bottom {
        position: absolute;
        width: 100%;
        bottom: .5rem;
        z-index: 1;
        .msg__box {
          font-size: 14px;
          color: $font-important;
          margin: 0 1rem .5rem 1rem;
          background: #fff;
          padding: .75rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.50);
          border-radius: 2px;
        }
        .my__pos {
          width: 2rem;
          height: 2rem;
          background: #fff;
          text-align: center;
          line-height: 2rem;
          border-radius: 100%;
          position: absolute;
          right: 1rem;
          top: -2.5rem;
          i {
            font-size: 22px;
          }
        }
      }
      #map {
        width: 100%;
        height: 100%;
      }
    }
    .u-main-content {
      .address__table {
        .item {
          padding: 0 .75rem;
          border-bottom: 1px solid $grey-ddd;
          position: relative;
          &.sex__wrapper {
            margin-left: 4.75rem;
            padding: 0;
            font-size: 15px;
            color: $font-important;
          }
          &.address__choose {
            .content {
              i.icon-location1 {
                margin-right: .5rem;
                float: left;
              }
              p {
                font-size: 15px;
                color: #CCCCCC;
                overflow: hidden;
                margin-right: .75rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                &.active {
                  color: $font-important;
                }
              }
              i.icon-enter {
                position: absolute;
                right: .75rem;
                top: 0;
              }
            }
          }
          .title {
            font-size: 15px;
            color: $font-important;
            float: left;
            margin-right: .5rem;
            line-height: 2.25rem;
            width: 3.5rem;
          }
          .content {
            overflow: hidden;
            line-height: 2.25rem;
            input[type="text"] {
              width: 100%;
              border-radius: 0;
              border: none;
              outline: none;
              -webkit-appearance: none;
              font-size: 16px;
              box-sizing: border-box;
              &::placeholder {
                color: #ccc;
              }
            }

          }
        }
        .sub--btn {
          margin-top: 1.5rem;
        }
      }
    }
  }

</style>
