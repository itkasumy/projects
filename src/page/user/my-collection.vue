<template>
  <div>
    <!--头部-->
    <common-header/>
    <div class="my__collection__container clearfix">
      <div class="u-pc-sidebar">
        <!--侧边栏-->
        <side-bar pageId="8"></side-bar>
      </div>
      <div class="collection__wrapper u-pc-content">
        <div class="top__header">
          <h2>我的收藏</h2>
        </div>
        <common-loading v-if="loading" />
        <common-no-data message="您还没有收藏任何店铺哦" v-if="collectionList.length === 0 && !loading" />
        <div class="collection__list">
          <el-row>
            <el-col :span="8" v-for="(item, index) in collectionList" :key="index" :item="item">
              <div class="collection__list__wrapper">
                <router-link :to="item.link"><img :src="item.logo" class="shopImg"></router-link>
                <router-link :to="item.link">
                  <div class="shop__name">{{item.sellerName}}</div>
                </router-link>
                <div class="shop__rate">
                  <el-rate :colors="rateColor" class="u-inner-block" v-model="item.score" disabled></el-rate>
                  <span class="raty__num">{{item.score}}分</span>
                </div>
                <p class="num__list">起送价: {{item.limitDeliveryCost}}P | 月销量: {{item.sel || 0}}单</p>
                <div class="top__del" @click="item.deleteShow=true">
                  <i class="iconfont icon-shanchuicon1"></i>
                </div>
                <div class="delete__btn__wrapper" v-if="item.deleteShow">
                  <div class="u-middle">
                    <p>确定取消收藏该店铺？</p>
                    <el-button round size="mini" @click="item.deleteShow=false">取消</el-button>
                    <el-button type="primary" round size="mini" @click="deleteCollection(item.id)" :loading="changeLoading">删除</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="u-pagination" v-if="parseInt(totalPage)>10">
            <el-pagination layout="prev, pager, next" :total="totalPage" :current-page="currentPage" @current-change="changePage"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <common-footer/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import SideBar from "../../components/user/side-bar";
export default {
  data() {
    return {
      rateColor: ['#FF644C', '#FF644C', '#FF644C'],
      collectionList: [],
      pageSize: 10,
      currentPage: 1,
      totalPage: 0,
      pos: [],
      loading: true,
      changeLoading: false
    }
  },
  components: { SideBar },
  computed: {

  },
  async mounted() {
    this.initData()
  },
  methods: {
    ...mapActions('user', ['ajaxCollectList', 'ajaxCollect']),
    async initData() {
      let self = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          self.pos = pos;
          self.getCollectionList();
        }, function() {});
      } else {
        self.$message.error('定位出错，请刷新页面重试！');
      }
    },
    async getCollectionList() {
      let self = this;
      let { pageSize, currentPage } = self;
      self.collectionList = [];
      self.loading = true;
      let res = await self.ajaxCollectList({ pageSize, currentPage, lat: self.pos.lat, lon: self.pos.lon });
      if (self.$checkData(res)) {
        self.totalPage = res.data.totalPages * 10;
        res.data.content.forEach(item => {
          item.deleteShow = false;
          item.score = parseInt(item.score);
          item.link = '/seller/' + item.id;
          self.collectionList.push(item)
        })
      }
      self.loading = false;
    },
    async deleteCollection(id) {
      let self = this;
      if (self.changeLoading) {
        return false;
      }
      self.changeLoading = true;
      let res = await self.ajaxCollect({ sellerId: id });
      self.changeLoading = false;
      if (self.$checkData(res)) {
        self.getCollectionList();
        self.$message.success('成功删除收藏');
      }
    },
    changePage(page) {
      this.currentPage = page
      this.getCollectionList()
      window.scrollTo(0, 0)
    }
  }
}

</script>
<style scope lang="scss">
.my__collection__container {
  @include container;
  margin-top: 20px;
  .collection__wrapper {
    .collection__list {
      padding: 10px;
      .el-col {
        padding: 10px;
      }
      .collection__list__wrapper {
        border: 1px solid $bd-gray;
        &:hover {
          .top__del {
            display: block;
          }
        }
        img.shopImg {
          width: 100%;
          height: 150px;
          cursor: pointer;
        }
        .shop__name {
          margin: 10px 0 10px 0;
          color: $imp-color;
          text-align: center;
          font-weight: 600;
        }
        .shop__rate {
          text-align: center;
          margin-bottom: 10px;
          .raty__num {
            color: #888;
            font-size: 12px;
            position: relative;
            top: 2px;
          }
        }
        .num__list {
          text-align: center;
          font-size: 12px;
          color: #666;
          margin-bottom: 20px;
        }
        .delete__btn__wrapper {
          text-align: center;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          overflow: hidden;
          background: rgba(51, 51, 51, 0.70);
          p {
            margin-bottom: 15px;
            color: #fff;
          }
        }
        .top__del {
          display: none;
          position: absolute;
          top: 0px;
          right: 0px;
          background: #FF644C;
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          background: rgba(51, 51, 51, 0.50);
          &:hover {
            background: $color-primary;
          }
          i {
            color: #fff;
            font-size: 14px;
          }
        }
      }
    }
  }
}

</style>
