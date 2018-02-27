<template>
  <div class="seller-list">
    <!--排序方式-->
    <div class="sort-type">
      <ul>
        <li v-for="(item, index) in sortType" :key="index" :class="{active : index === chooseSort}"
            @click="changeSort(item, index)">
          <span>{{item.name}}</span>
        </li>
      </ul>
      <span class="right">更高的质量，更快的速度~</span>
    </div>
    <!--商家列表-->
    <el-row class="list">
      <el-col :span="6" class="seller" v-for="(item, index) in sellerList" :key="index">
        <div class="seller-content" :class="(index + 1) % 4 === 0 ? 'left': 'right'" @click="toSeller(item)">
          <div class="header">
            <img :src="item.logoPic">
            <div class="price-data">
              <span>配送费：P{{item.logistics || 0}}</span>
              <span>起送费：P{{item.limitDeliveryCost}}</span>
            </div>
          </div>
          <div class="seller-name">{{item.sellerName}}</div>
          <div class="seller-score">
            <el-rate v-model="item.score" disabled show-score :colors="['#FF644C', '#FF644C', '#FF644C']"
                     text-color="#666" score-template="评分{value}"/>
          </div>
          <div class="seller-info">
            <span>距离您的位置：{{item.km}}km</span>
            <span>最近销量：{{item.sel || 0}}单</span>
          </div>
        </div>
        <div class="hidden-card" :class="(index + 1) % 4 === 0 ? 'left': 'right'">
          <div class="card-content">
            <div class="top">
              <div class="name">{{item.sellerName}}</div>
              <div class="card-data">
                <span>配送费：P{{item.logistics || 0}}</span>
                <span>起送费：P{{item.limitDeliveryCost}}</span>
              </div>
            </div>
            <div class="announce">
              <div class="title">商家公告</div>
              <p>{{item.notice || '暂无公告'}}</p>
            </div>
          </div>
        </div>
      </el-col>
      <common-no-data type="shop" message="未搜索到相关的商家信息" v-if="!loading && sellerList.length === 0"/>
      <common-loading v-if="loading"/>
      <el-col :span="24" class="bottom-line" v-if="!loading && loadAll && sellerList.length > 0">我是有底线的</el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "seller-list",
    props: ['sellerList', 'loading', 'loadAll'],
    data() {
      return {
        sortType: [
          {name: '默认排序', type: null},
          {name: '销量优先', type: 1},
          {name: '评分最高', type: 2},
          {name: '起送费用', type: 3},
        ],
        chooseSort: 0
      }
    },
    methods: {
      changeSort(item, index) {
        this.chooseSort = index
        this.$emit('changeSort', item)
      },
      toSeller(item) {
        this.$router.push(`/seller/${item.id}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .seller-list {
    @include container;
    margin-top: 20px;
    .sort-type {
      background: #FAFAFA;
      border: 1px solid #DDDDDD;
      box-sizing: border-box;
      overflow: hidden;
      height: 60px;
      line-height: 60px;
      color: #999999;
      ul {
        float: left;
        overflow: hidden;
        margin-left: 10px;
        li {
          float: left;
          padding: 0 30px;
          position: relative;
          height: 60px;
          box-sizing: border-box;
          cursor: pointer;
          span {
            display: inline-block;
            height: 58px;
            box-sizing: border-box;
          }
          &:not(:first-child):before {
            content: '';
            width: 1px;
            height: 10px;
            background: #DDDDDD;
            position: absolute;
            left: 0;
            top: 25px;
          }
          &:hover,
          &.active {
            color: $color-primary;
            span {
              border-bottom: 2px solid $color-primary;
            }
          }
        }
      }
      span.right {
        float: right;
        margin-right: 20px;
      }
    }
    .list {
      min-height: 500px;
      background: #fff;
      box-sizing: border-box;
      border: 1px solid #DDDDDD;
      border-top: none;
      overflow: hidden;
      padding: 20px 30px 80px;
      position: relative;
      .seller {
        height: 275px;
        margin-top: 10px;
        border: 1px solid #fff;
        .seller-content {
          border: 1px solid #fff;
          padding: 15px 15px;
          cursor: pointer;
          &.right {
            border-right: none;
          }
          &.left {
            border-left: none;
          }
        }
        .seller-content:hover {
          border-color: #DDDDDD;
          box-shadow: 1px 0 8px 2px #e4e4e436;
          + .hidden-card {
            display: block;
            box-shadow: 1px 0 8px 2px #e4e4e436;
          }
        }
        .header {
          height: 154px;
          overflow: hidden;
          position: relative;
          img {
            width: 247px;
            height: 154px;
          }
          .price-data {
            width: 100%;
            height: 30px;
            line-height: 30px;
            background: rgba(0, 0, 0, .4);
            color: #fff;
            position: absolute;
            bottom: 0;
            text-align: center;
            font-size: 12px;
            span:first-child {
              position: relative;
              padding-right: 10px;
              &:after {
                content: '';
                width: 4px;
                height: 4px;
                background: #fff;
                border-radius: 50%;
                position: absolute;
                top: 6px;
                right: 0;
                margin-right: -3px;
              }
            }
            span:last-child {
              padding-left: 7px;
            }
          }
        }
        .seller-name {
          margin-top: 10px;
          font-size: 16px;
          font-weight: bold;
        }
        .seller-score {
          margin-top: 10px;
        }
        .seller-info {
          margin-top: 10px;
          color: #666;
          font-size: 12px;
          span:first-child {
            padding-right: 10px;
            /*border-right: 1px solid #666666;*/
            position: relative;
            &:after {
              content: '';
              position: absolute;
              right: 0;
              top: 2px;
              height: 12px;
              width: 1px;
              background-color: #666;
            }
          }
          span:last-child {
            padding-left: 10px;
          }
        }
        .hidden-card {
          display: none;
          width: 100%;
          height: 273px;
          position: absolute;
          top: 0;
          z-index: 1;
          background: #fff;
          border: 1px solid #ddd;
          box-sizing: border-box;
          &.right {
            right: 0;
            transform: translateX(100%);
            .card-content:before {
              left: 0;
              transform: translateX(-50%) rotate(-45deg);
              border-left: 1px solid #ddd;
            }
          }
          &.left {
            left: 0;
            transform: translateX(-100%);
            .card-content:before {
              right: 0;
              transform: translateX(50%) rotate(45deg);
              border-right: 1px solid #ddd;
            }
          }
          .card-content {
            position: relative;
            height: 100%;
            padding: 20px;
            &:before {
              content: '';
              width: 15px;
              height: 15px;
              z-index: 2;
              background: #fff;
              position: absolute;
              top: 30px;
              border-top: 1px solid #ddd;
            }
          }
          .top {
            padding-bottom: 20px;
            border-bottom: 1px dashed #ddd;
            .name {
              color: #333333;
              font-size: 16px;
              font-weight: bold;
            }
            .card-data {
              margin-top: 10px;
              font-size: 12px;
              color: #666666;
              span:first-child {
                position: relative;
                padding-right: 10px;
                &:after {
                  content: '';
                  width: 4px;
                  height: 4px;
                  background: #666666;
                  border-radius: 50%;
                  position: absolute;
                  top: 6px;
                  right: 0;
                  margin-right: -3px;
                }
              }
              span:last-child {
                padding-left: 7px;
              }
            }
          }
          .announce {
            padding: 20px 0;
            .title {
              color: #333333;
              font-weight: bold;
            }
            p {
              margin-top: 10px;
              font-size: 12px;
              color: #666666;
            }
          }
        }
      }
    }
  }
</style>
