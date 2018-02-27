<template>
  <div class="search">
    <common-header ref="header" @search="initSearch"/>
    <div class="main">
      <div class="top">搜索结果</div>
      <!--列表-->
      <div class="list" v-for="item in resultList">
        <div class="seller" @click="toSeller(item)">
          <img :src="item.logo" class="logo">
          <div class="name">{{item.sellerName}}</div>
          <el-rate v-model="item.score" disabled show-score :colors="['#FF644C', '#FF644C', '#FF644C']"
                   text-color="#FF644C" score-template="{value}"/>
          <p class="info">
            <span>距离您的位置：{{item.km}}km</span>|
            <span>最近销量：{{item.sel || 0}}</span>
          </p>
        </div>
        <div class="goods-list" v-for="goods in item.inner">
          <div class="name">{{goods.goodsName}}</div>
          <div class="price">${{goods.presentPrice || goods.originalPrice}}</div>
          <div class="info">
            <span><i class="iconfont icon-icon_Salesvolume"/>销量：{{goods.soldNum || 0}}</span>
            <span><i class="iconfont icon-icon_recommend"/>推荐：{{goods.recommendNum || 0}}</span>
          </div>
          <div>
            <el-button type="primary" plain @click="toSeller(item)">购买</el-button>
          </div>
        </div>
      </div>
      <!--状态-->
      <common-loading v-if="loading"/>
      <common-no-data type="shop" message="未搜索到相关的商品或商家" v-if="!loading && resultList.length===0"/>
    </div>
    <common-footer/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "search",
    components: {},
    data() {
      return {
        resultList: [],
        loading: false,
        lastKeyword: null,
        location: null
      }
    },
    computed: {
      keyword() {
        return this.$refs.header.keyword
      }
    },
    mounted() {
      let location = localStorage.getItem('location')
      if (!location) {
        this.$message.error('请选择地址')
        this.$router.push('/')
      } else {
        this.location = JSON.parse(location)
        this.initSearch()
      }
    },
    methods: {
      ...mapActions('seller', ['ajaxSearch']),
      async getSearchResult() {
        this.loading = true
        let {keyword} = this
        let {lat, lon, areaId} = this.location
        let res = await this.ajaxSearch({key: keyword, lat, lon, areaId})
        console.log('搜索结果', res)
        if (res.code === 1) {
          if (res.data.result) {
            res.data.result.forEach(item => {
              item.score = parseFloat(item.score)
              this.resultList.push(item)
            })
          }
        } else {
          this.$message.error(res.message)
        }
        this.loading = false
      },
      async initSearch() {
        let {keyword, lastKeyword} = this
        if (keyword === lastKeyword) return
        this.resultList = []
        await this.getSearchResult()
        this.lastKeyword = keyword
      },
      toSeller(item) {
        this.$router.push(`/seller/${item.id}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .search {
    .main {
      @include container;
      min-height: 600px;
      background: #fff;
      margin-top: 20px;
      .top {
        color: #666666;
        padding: 20px;
        border-bottom: 1px solid #DDDDDD;
      }
      .list {
        padding: 20px;
      }
      .seller {
        height: 100px;
        background: #FCFCFC;
        border: 1px solid #EBEBEB;
        cursor: pointer;
        .logo {
          height: 98px;
          width: 180px;
          float: left;
        }
        @mixin distance {
          padding-left: 190px;
          height: 20px;
          line-height: 20px;
        }
        .name {
          @include distance;
          margin-top: 15px;
          font-size: 16px;
          color: #333333;
          font-weight: bold;
        }
        .el-rate {
          @include distance;
          margin-top: 5px;
          i {
            font-size: 16px;
          }
        }
        p.info {
          @include distance;
          margin-top: 5px;
          font-size: 12px;
          color: #666666;
          span:first-child {
            padding-right: 5px;
          }
          span:last-child {
            padding-left: 5px;
          }
        }
      }
      .goods-list {
        border: 1px solid #EBEBEB;
        border-top: none;
        overflow: hidden;
        padding: 0 20px;
        div {
          float: left;
          height: 60px;
          line-height: 60px;
          width: 25%;
          &.name {
            color: #333333;
          }
          &.info {
            color: #666666;
            span {
              font-size: 12px;
              &:first-child {
                margin-right: 30px;
              }
            }
            i {
              margin-right: 10px;
            }
          }
          .el-button {
            float: right;
            margin-top: 10px;
          }
        }
      }
    }
  }
</style>
