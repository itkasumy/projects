<template>
  <div class="seller-announce">
    <div class="announce" v-if="parseInt(type) === 1">
      <div class="title">商家公告</div>
      <p>
        尊敬的顾客您好！为了您能尽快享用老娘舅的美食，建议您提前
        1小时下单！谢谢您对我们的喜爱！商家支持开发票，开票订单
        金额10元起，请在下单时填写好发票抬头。
      </p>
    </div>
    <div class="delivery" v-if="parseInt(type) === 1">
      <div class="title">配送说明</div>
      <ul>
        <li>配送费用：P{{sellerInfo.logistics}}</li>
        <li>配送说明：中文配送</li>
      </ul>
    </div>
    <div class="points" v-if="parseInt(type) === 2">
      <div class="title">综合评分</div>
      <div class="points-content">
        <div class="top">
          <div class="score">{{sellerInfo.score || 0}}</div>
          <div class="count">
            <el-rate v-model="sellerInfo.score" disabled :colors="['#FF644C', '#FF644C', '#FF644C']"></el-rate>
            <span>总共 {{count}} 评价</span>
          </div>
        </div>
        <ul>
          <li v-for="(item, index) in scoreList">
            <div class="point">{{item.points}} 评分</div>
            <el-progress :percentage="item.percent" class="progress"></el-progress>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "seller-announce",
    props: ['type', 'count'],
    data() {
      return {
        scoreList: []
      }
    },
    computed: {
      ...mapState('seller', ['sellerInfo']),
      sellerId() {
        return this.$route.params.id
      }
    },
    mounted() {
      this.getSellerPoints()
    },
    methods: {
      ...mapActions('seller', ['ajaxSellerPoints']),
      async getSellerPoints() {
        let {sellerId} = this
        let res = await this.ajaxSellerPoints({sellerId})
        if (res.code === 1) {
          res.data.forEach(item => {
            this.scoreList.push(item)
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .seller-announce {
    .title {
      color: #666666;
      border-bottom: 1px solid #ddd;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      font-weight: bold;
    }
    @mixin panel {
      width: 380px;
      margin-top: 20px;
      background: #fff;
    }
    .announce {
      @include panel;
      p {
        padding: 20px;
        font-size: 12px;
        color: #666;
      }
    }
    .delivery {
      @include panel;
      ul {
        padding: 20px;
        font-size: 12px;
        color: #666;
        li {
          height: 22px;
          line-height: 22px;
        }
      }
    }
    .points {
      @include panel;
      .points-content {
        padding: 10px 20px 20px;
        .top {
          overflow: hidden;
          .score {
            float: left;
            font-size: 48px;
            color: $color-primary;
            font-weight: bold;
          }
          .count {
            float: left;
            margin-left: 20px;
            margin-top: 15px;
            span {
              color: #999999;
            }
          }
        }
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
            /*.el-progress-bar__outer {*/
              /*height: 10px !important;*/
            /*}*/
          }
        }
      }
    }
  }
</style>
