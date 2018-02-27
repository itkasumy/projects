<template>
  <div class="modal-add-address">
    <el-dialog :title="title" :visible.sync="visible" width="600px" class="c-dialog">
      <el-form label-width="150px">
        <el-form-item label="姓名">
          <el-input v-model="addName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addSex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址">
          <div class="el-input">
            <input :id="searchInput" placeholder="地址" type="text" class="el-input__inner" v-once :value="editAddresss">
          </div>
        </el-form-item>
        <el-form-item>
          <div :id="mapId" class="map"></div>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="addHouseNumer" placeholder="详细地址(门牌号)"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addPhone" placeholder="手机号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAddress" :loading="submitLoading">保存</el-button>
        <el-button type="primary" plain @click="visible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import $ from 'jquery'
export default {
  components: {},
  props: ['item'],
  data() {
    return {
      visible: false,
      addName: '', //姓名
      addSex: '0', //性别
      addPhone: '', //手机
      addHouseNumer: '', //具体地址门牌号,
      map: null, //地图接口
      autocomplete: null, //搜索框
      marker: null, //地图标记
      country: { 'country': ['PHL', 'CN'] }, //查询范围 国家给单位
      pos: {}, //选中后的经纬度对象
      radius: 500, //查询半径 以当前地点为圆心
      submitLoading: false
    }
  },
  computed: {
    mapId() {
      if (this.item == null) {
        return 'mapAdd';
      } else {
        return 'mapEdit_' + this.item.id;
      }
    },
    searchInput() {
      if (this.item == null) {
        return 'searchInput';
      } else {
        return 'searchInput_' + this.item.id;
      }
    },
    editAddresss() {
      if (this.item != null) {
        return (this.item.address);
      } else {
        return '';
      }
    },
    title() {
      if (this.item == null) {
        return '新增收货地址';
      } else {
        return '编辑收货地址';
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions('user', ['ajaxNewAddress', 'ajaxChangeAddress']),
    show() {
      this.visible = true;
      if (this.item == null) {
        this.reset();
      } else {
        this.setData();
      }
      this.initMap();
    },
    reset() {
      let self = this;
      this.addName = '';
      this.addSex = '0';
      this.addPhone = '';
      this.addHouseNumer = '';
      $('#' + this.searchInput).val('');
      this.pos = {};
    },
    setData() {
      let self = this;
      this.addName = this.item.name;
      this.addSex = this.item.sex + '';
      this.addPhone = this.item.phone;
      this.addHouseNumer = this.item.houseNumber;
      $('#' + this.searchInput).val(this.editAddresss);
      this.pos = {
        lat: parseFloat(this.item.lat),
        lng: parseFloat(this.item.lon)
      };
    },
    initMap() {
      let self = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = null;
          if (self.item == null) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            self.pos = pos;
            //self.getPlaceByLatLng(pos);
          } else {
            pos = self.pos;
          }
          self.map = new google.maps.Map(document.getElementById(self.mapId), {
            zoom: 15,
            center: pos
          });
          self.marker = new google.maps.Marker({
            position: pos,
            draggable: true,
            animation: google.maps.Animation.DROP,
            map: self.map,
          });
          google.maps.event.addListener(self.marker, 'dragend', function(MouseEvent) {
            self.pos = {
              lat: MouseEvent.latLng.lat(),
              lng: MouseEvent.latLng.lng()
            };
            self.getPlaceByLatLng(self.pos);
          });
          let circle = new google.maps.Circle({
            center: pos,
            radius: self.radius
          });
          if (self.autocomplete == null) {
            self.autocomplete = new google.maps.places.Autocomplete(document.getElementById(self.searchInput), {
              types: [],
              'componentRestrictions': self.country,
              bounds: circle.getBounds()
            });
          }
          self.autocomplete.addListener('place_changed', self.onPlaceChanged);
        }, function() {

        });
      }
    },
    onPlaceChanged() {
      let self = this;
      let place = self.autocomplete.getPlace();
      if (place.geometry) {
        self.pos = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        self.map.panTo(place.geometry.location);
        self.map.setZoom(15);
        if (typeof(self.marker) != "undefined") {
          self.marker.setMap(null);
        }
        self.marker = new google.maps.Marker({
          position: place.geometry.location,
          draggable: true,
          animation: google.maps.Animation.DROP,
          map: self.map,
        });
        google.maps.event.addListener(self.marker, 'dragend', function(MouseEvent) {
          self.pos = {
            lat: MouseEvent.latLng.lat(),
            lng: MouseEvent.latLng.lng()
          };
          self.getPlaceByLatLng(self.pos);
        });
      }
    },
    getPlaceByLatLng(location) {
      let self = this;
      let administrative_area_level_1 = '',
        locality = '',
        sublocality = '',
        route = '',
        neighborhood = '';
      if (self.geocoder == null) {
        self.geocoder = new google.maps.Geocoder();
      }
      self.geocoder.geocode({ 'location': location }, function(results, status) {
        if (status == 'OK') {
          for (let i = 0; i < results[0].address_components.length; i++) {
            let types = results[0].address_components[i].types;
            if ((types.indexOf("administrative_area_level_1")) != -1) {
              administrative_area_level_1 = results[0].address_components[i].long_name;
            }
            if ((types.indexOf("locality")) != -1) {
              locality = results[0].address_components[i].long_name;
            }
            if ((types.indexOf("sublocality")) != -1) {
              sublocality = results[0].address_components[i].long_name;
            }
            if ((types.indexOf("route")) != -1) {
              route = results[0].address_components[i].long_name;
            }
            if ((types.indexOf("neighborhood")) != -1) {
              neighborhood = results[0].address_components[i].long_name;
            }
          }
          let fromatAdd = administrative_area_level_1 + locality + sublocality + route;
          $('#' + self.searchInput).val(fromatAdd);
        } else {
          self.$message.error('定位错误，请重试');
        }
      });
    },
    async saveAddress() {
      let self = this;
      let params = {
        address: $('#' + self.searchInput).val(),
        name: self.addName,
        sex: self.addSex,
        phone: self.addPhone,
        houseNumer: self.addHouseNumer,
        lat: self.pos.lat,
        lon: self.pos.lng,
      }
      if (this.item != null) {
        params.addrId = self.item.id;
      }
      if (!params.address || !params.name || !params.phone || !params.houseNumer) {
        self.$message.error('请填写完整')
      } else {
        self.submitLoading = true
        if (this.item == null) {
          let res = await self.ajaxNewAddress(params)
          if (self.$checkData(res)) {
            self.visible = false;
            self.$message.success('新增地址成功')
            self.$emit('refreshList');
          }
        } else {
          let res = await self.ajaxChangeAddress(params)
          if (self.$checkData(res)) {
            self.visible = false;
            self.$message.success('修改地址成功')
            self.$emit('refreshList');
          }
        }
        self.submitLoading = false
      }
    }

  }
}

</script>
<style scope lang="scss">
.map {
  width: 100%;
  height: 380px;
}

.modal-add-address {
  .el-row {
    margin-bottom: 20px;
  }
  .left-text {
    text-align: right;
    padding-right: 20px;
    height: 36px;
    line-height: 36px;
  }
}

</style>
