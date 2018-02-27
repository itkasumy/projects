<template>
  <div class="seller-header clearfix">
    <div class="left" v-if="!loading">
      <div class="seller">
        <div class="clearfix">
          <div class="avatar">
            <img :src="sellerInfo.logo" height="150" width="260">
          </div>
          <div class="info">
            <div class="name">{{sellerInfo.sellerName}}</div>
            <div class="seller-score">
              <el-rate v-model="sellerInfo.score || 0" disabled show-score :colors="['#FF644C', '#FF644C', '#FF644C']"
                       text-color="#666" score-template="评分{value}"/>
            </div>
            <ul>
              <li><i class="iconfont icon-icon_phone"></i>商家电话：{{sellerInfo.phone}}</li>
              <li><i class="iconfont icon-time"></i>营业时间：{{sellerInfo.businessStartTime}} -
                {{sellerInfo.businessEndTime}}
              </li>
              <li class="shop__address__wrapper">
                <div class="lab"><i class="iconfont icon-icon-address"></i></div>
                <p>店铺地址：{{sellerInfo.location}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="shop__detail">
          <div class="raty__num">
            <span class="num">{{sellerInfo.score || 0}}</span>
            <div class="score__detail">
              <el-rate v-model="sellerInfo.score || 0" disabled :colors="['#FF644C', '#FF644C', '#FF644C']"/>
            </div>
            <p class="eval__detail">总共 {{count}} 评价</p>
          </div>
          <div class="raty__detail">
            <ul>
              <li v-for="(item, index) in scoreList">
                <div class="point">{{item.points}} 评分</div>
                <el-progress :percentage="item.percent" class="progress"></el-progress>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="right" v-if="!loading">
      <ul>
        <li>
          <div class="price">P{{sellerInfo.limitDeliveryCost}}</div>
          <div class="text">起送费用</div>
        </li>
        <li>
          <div class="price">P{{sellerInfo.logistics}}</div>
          <div class="text">配送费用</div>
        </li>
        <li @click="collect" class="col__btn">
          <div class="star">
            <i class="iconfont" v-if="!colLoading"
               :class="[colStatus==='0' ? 'active' : '', colStatus==='0' ? 'icon-shoucangicon1':'icon-shoucangicon']"/>
            <i class="iconfont icon-loading icon-rotating" v-else></i>
          </div>
          <div class="text">
            <template v-if="colStatus==='0'">已收藏</template>
            <template v-else>收藏店铺</template>
          </div>
        </li>
      </ul>
    </div>
    <common-loading v-if="loading" style="margin-top: 40px;"/>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "seller-header",
    data() {
      return {
        loading: false,
        location: null,
        colLoading: false,
        colStatus: null,
        scoreList: [],
        count: 0,
        pageSize: 8,
        currentPage: 1,
      }
    },
    computed: {
      ...mapState('seller', ['sellerInfo']),
      sellerId() {
        return this.$route.params.id
      }
    },
    mounted() {
      let location = localStorage.getItem('location')
      if (!location) {
        this.$router.push('/')
      } else {
        this.location = JSON.parse(location)
        this.getSellerInfo()
        this.getCollectStatus()
        this.getSellerPoints()
        this.getSellerRate()
      }
    },
    methods: {
      ...mapActions('user', ['ajaxCollectStatus', 'ajaxCollect']),
      ...mapActions('seller', ['ajaxSellerInfo', 'ajaxSellerPoints', 'ajaxSellerRate']),
      async getSellerInfo() {
        this.loading = true
        let {sellerId} = this
        let {lat, lon} = this.location
        let res = await this.ajaxSellerInfo({sellerId, lat, lon})
        this.loading = false
      },
      async getSellerRate() {
        let {sellerId, pageSize, currentPage} = this
        let {lat, lon} = this.location
        let res = await this.ajaxSellerRate({sellerId, pageSize, currentPage, lat, lon})
        if (res.code === 1) {
          this.count = res.data.map.count
        }
      },
      async getSellerPoints() {
        let {sellerId} = this
        let res = await this.ajaxSellerPoints({sellerId})
        if (res.code === 1) {
          res.data.forEach(item => {
            this.scoreList.push(item)
          })
        }
      },
      async getCollectStatus() {
        let {sellerId} = this
        let res = await this.ajaxCollectStatus({sellerId})
        if (res.code === 1) {
          this.colStatus = res.data;
        }
      },
      async collect() {
        if (this.colLoading) return
        let {sellerId} = this
        this.colLoading = true
        let res = await this.ajaxCollect({sellerId})
        if (this.$checkData(res)) {
          await this.getCollectStatus();
        }
        this.colLoading = false;
      }
    }
  }

</script>
<style scoped lang="scss">
  .seller-header {
    @include container;
    background: #fff;
    margin-top: 20px;
    position: relative;
    .left {
      width: 660px;
      height: 150px;
      float: left;
      .seller {
        width: 100%;
        height: 150px;
        box-sizing: border-box;
        cursor: pointer;
        &.open,
        &:hover {
          box-shadow: 1px 1px 22px 4px #efefef;
          height: 360px;
          z-index: 1;
          background: #fff;
          .shop__detail {
            display: block;
          }
          .info {
            .shop__address__wrapper {
              p {
                text-overflow: unset;
                white-space: unset;
                overflow: unset;
              }
            }
          }
        }
        .shop__detail {
          display: none;
          margin-top: 20px;
          .raty__num {
            float: left;
            margin-right: 30px;
            width: 260px;
            text-align: center;
            .num {
              margin-top: 55px;
              font-size: 48px;
              color: $color-primary;
            }
            .score__detail {
              margin-top: 3px;
            }
            .eval__detail {
              color: #999999;
              margin-top: 10px;
            }
          }
          .raty__detail {
            overflow: hidden;
            padding-right: 30px;
            ul {
              li {
                overflow: hidden;
                margin-top: 10px;
              }
              .point {
                float: left;
                width: 15%;
              }
              .el-progress {
                float: left;
                width: 85%;
                .el-progress-bar__outer {
                  height: 10px !important;
                }
              }
            }
          }
        }
        .avatar {
          float: left;
          margin-right: 30px;
        }
        .info {
          overflow: hidden;
          padding: 20px 30px 15px 0;
          height: 150px;
          box-sizing: border-box;
          .shop__address__wrapper {
            .lab {
              float: left;
            }
            p {
              line-height: 18px;
              position: relative;
              top: 2px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
          .name {
            font-size: 16px;
            font-weight: bold;
            color: #333333;
          }
          .seller-score {
            margin: 5px 0;
          }
          ul {
            li {
              font-size: 12px;
              color: #666666;
              height: 22px;
              line-height: 22px;
              i {
                margin-right: 10px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .right {
      background: url("../../assets/img/pic_title_bg.png") no-repeat;
      background-position-x: right;
      height: 150px;
      float: right;
      ul {
        height: 100%;
        padding: 50px 60px 50px 0;
        overflow: hidden;
        box-sizing: border-box;
        li {
          float: left;
          padding: 0 30px;
          position: relative;
          text-align: center;
          height: 100%;
          width: 60px;
          &.col__btn {
            cursor: pointer;
          }
          .price {
            font-size: 24px;
            color: #999999;
          }
          .star {
            padding-top: 5px;
            i {
              font-size: 20px;
              cursor: pointer;
              &:hover,
              &.active {
                color: #F5AF22;
              }
            }
          }
          .text {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
          &:not(:first-child):before {
            content: '';
            width: 1px;
            height: 35px;
            background: #E6E6E6;
            position: absolute;
            left: 0;
            top: 10px;
          }
        }
      }
    }
  }

</style>
