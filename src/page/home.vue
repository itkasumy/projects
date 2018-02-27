 <template>
  <div class="home">
    <template v-if="noOpen">
      <common-no-data message="当前位置未开通外卖服务，请重新选择收货地址！"/>
      <v-button unblock @click="toChooseCity">选择收货地址</v-button>
    </template>
    <template v-if="!noOpen && !loading">
      <!--头部-->
      <home-header/>
      <!--搜索-->
      <search-input/>
      <!--轮播-->
      <swiper ref="mySwiper" :options="swiperOption">
        <swiper-slide v-for="(item, index) in swiperImages" :key="index">
          <img :src="item.pic" width="100%">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!--商家分类-->
      <ul class="seller-class">
        <li v-for="(item, index) in sellerClass" :key="index" @click="toList(item)">
          <div class="img"><img :src="item.iconPic"></div>
          <div class="name">{{item.name}}</div>
        </li>
      </ul>
      <!--活动-->
      <div class="seller-activity">
        <div class="home-title">活动专区</div>
        <seller-activity/>
      </div>
      <!--列表-->
      <div class="seller-list">
        <div class="home-title">附近商家</div>
        <ul class="filter-list">
          <li>默认排序</li>
          <li>销量优先</li>
          <li>距离最近</li>
          <li>评分最高</li>
        </ul>
        <div class="list">
          <div v-for="(item, index) in sellerList" :key="index">
            <seller-list-card :item="item"/>
          </div>
        </div>
        <div class="load-text" v-if="sellerList.length > 0">
          <span v-if="loadedAll">已加载全部</span>
          <span v-else><v-loading size="tiny"/></span>
        </div>
      </div>
    </template>
    <!--导航-->
    <tab-bar/>
  </div>
</template>

<script>
  import {mapActions, mapMutations} from 'vuex'
  import TabBar from '@/components/common/tab-bar'
  import HomeHeader from '@/components/home/home-header'
  import SearchInput from "@/components/common/search-input"
  import SellerListCard from '@/components/seller/seller-list-card'
  import CommonNoData from '@/components/common/common-no-data'
  import SellerActivity from '@/components/seller/seller-activity'

  export default {
    name: "home",
    components: {SearchInput, TabBar, HomeHeader, SellerListCard, CommonNoData, SellerActivity},
    data() {
      return {
        swiperImages: [],
        swiperOption: {autoplay: true, loop: true, pagination: {el: '.swiper-pagination'}},
        sellerClass: [],
        sellerList: [],
        location: null,
        noOpen: true,
        loading: true,
        pageSize: 8,
        currentPage: 1,
        listLoading: false,
        loadedAll: false,
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    async mounted() {
      let self = this;
      let location = localStorage.getItem('location');
      if (location) {
        this.loading = false;
        this.location = JSON.parse(location);
        this.$toast.loading()
        self.initData();
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            };
            self.checkCity(pos);
          }, function () {
          });
        }
      }
    },
    methods: {
      ...mapActions('seller', ['ajaxAdvertiseImg', 'ajaxSellerClass', 'ajaxSellerList']),
      ...mapActions('user', ['ajaxPosition']),
      ...mapMutations('seller', ['setType']),
      async checkCity(pos) {
        self.loading = true;
        this.$toast.loading()
        let res = await this.ajaxPosition(pos)
        this.loading = false;
        if (res.code !== 1) {
          this.noOpen = true;
          this.$toast.close()
        } else {
          this.location = pos;
          this.initData();
        }
      },
      // 数据初始化
      async initData() {
        await this.getAdvertiseImg()
        await this.getSellerClass()
        await this.getSellerList()
        this.$toast.close()
        window.addEventListener('scroll', this.scrollHandler)
      },
      // 获取首页广告图片
      async getAdvertiseImg() {
        let res = await this.ajaxAdvertiseImg()
        console.log('首页广告', res)
        if (res.code === 1) {
          res.data.list.forEach(item => {
            this.swiperImages.push(item)
          })
        } else {
          console.log(res.message)
        }
      },
      // 获取商家分类
      async getSellerClass() {
        let res = await this.ajaxSellerClass()
        console.log('商家分类', res)
        if (res.code === 1) {
          res.data.forEach(item => {
            this.sellerClass.push(item)
          })
        } else {
          console.log(res.message)
        }
      },
      // 获取商家列表
      async getSellerList() {
        let data = {
          lat: this.location.lat,
          lon: this.location.lon,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          type: null
        }
        let res = await this.ajaxSellerList(data)
        if (res.code === 1) {
          let {content} = res.data
          content.forEach(item => {
            this.sellerList.push(item)
          })
          if (content.length < this.pageSize) {
            this.loadedAll = true
            window.removeEventListener('scroll', this.scrollHandler)
          }
          this.currentPage++
        } else {
          this.$toast.error(res.message)
        }
      },
      // 跳转地址选择
      toChooseCity() {
        this.$router.push('/choose-address')
      },
      // 跳转店铺列表（类型）
      toList(item) {
        this.setType(item)
        this.$router.push('/seller-list')
      },
      // 滚动加载
      async scrollHandler() {
        let distance = this.$getBottomDistance()
        if (distance < 100 && !this.listLoading) {
          this.listLoading = true
          let data = {
            lat: this.location.lat,
            lon: this.location.lon,
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            type: this.sellerType
          }
          let {data: res} = await this.$http.post('/openservice/sortSeller', data)
          if (res.code === 1) {
            let {content} = res.data
            if (content.length === 0) {
              this.loadedAll = true
              window.removeEventListener('scroll', this.scrollHandler)
            } else {
              content.forEach((item) => {
                this.sellerList.push(item)
              })
              this.currentPage++
            }
          } else {
            this.$toast.error(res.message)
          }
          this.listLoading = false
        }
      }
    }
  }
</script>

<style lang="scss">
  .home {
    padding-bottom: 2.5rem;
    background: $body-bg;
    ul.seller-class {
      background: #fff;
      overflow: hidden;
      display: flex;
      flex-flow: row wrap;
      li {
        flex: 20vw;
        box-sizing: border-box;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 14px;
        text-align: center;
        .img {
          width: 20vw;
          box-sizing: border-box;
          padding: 0 .7rem;
          img {
            display: inline-block;
            width: 100%;
            height: auto;
          }
        }
        .name {
          margin-top: .5rem;
        }
      }
    }
    .seller-activity {
      background: #fff;
    }
    .seller-list {
      background: #fff;
      ul.filter-list {
        display: flex;
        font-size: 13px;
        margin-top: 0.2rem;
        @include border-bottom(#ddd);
        li {
          flex: 1;
          text-align: center;
          padding-bottom: 0.5rem;
        }
      }
      .load-text {
        text-align: center;
        font-size: 14px;
        padding: 0.5rem 0;
        background: #f0f0f0;
      }
    }
    .home-title {
      $brown: #665252;
      width: 100vw;
      text-align: center;
      color: $brown;
      font-size: 14px;
      margin-top: 0.5rem;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      height: 1.5rem;
      line-height: 1.5rem;
      position: relative;
      @mixin line {
        position: absolute;
        width: 1.5rem;
        height: .1rem;
        background: $brown;
        top: 50%;
      }
      &:before {
        @include line
      }
      &:after {
        @include line
      }
    }
  }
</style>
