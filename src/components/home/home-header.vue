<template>
  <div class="home-header">
    <div class="top">
      <div class="left">
        <router-link to="/choose-address">
          <i class="iconfont icon-location"/>{{cityName}}
        </router-link>
      </div>
      <div class="right">
        <i class="iconfont icon-cart"/>0件
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "home-header",
    data() {
      return {
        cityName: 'xxx'
      }
    },
    computed: {},
    mounted() {
      let self=this;
      let location = localStorage.getItem('location')
      if (location) {
        self.cityName = JSON.parse(location).cityName
      }else{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            self.getCity(pos);
          }, function () {
          });
        }
      }
    },
    methods: {
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
            self.cityName=locality;
          } else {
            self.$toast.error('定位错误，请刷新页面重试')
          }
        });
      },
    }
  }

</script>
<style scoped lang="scss">
  .home-header {
    background: #fff;
    .top {
      height: 1.8rem;
      line-height: 1.8rem;
      /*background: #ececec;*/
      overflow: hidden;
      padding: 0 0.5rem;
      font-size: 13px;
      .left {
        float: left;
        i {
          margin-right: 0.3rem;
        }
      }
      .right {
        float: right;
        i {
          margin-right: 0.3rem;
        }
      }
    }
  }

</style>
