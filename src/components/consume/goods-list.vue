<template>
  <div class="goods-list">
    <div class="title">确认订单信息</div>
    <ul class="top">
      <li>菜品</li>
      <li class="price">单价</li>
      <li>数量</li>
      <li>小计</li>
    </ul>
    <div class="list">
      <ul v-for="(item, index) in goodsList" :key="index">
        <li>
          <img :src="item.data.photoPic">
          <div>
            <span :class="{responsive: item.data.limitNum !== null}">{{item.data.name}}</span>
            <span v-if="item.data.limitNum" :class="{responsive: item.data.limitNum !== null}">
              限{{item.data.limitNum}}件优惠
            </span>
          </div>
        </li>
        <li class="price">
          <span :class="{responsive: item.data.limitNum !== null}">
            P{{item.data.presentPrice || item.data.originalPrice}}
          </span>
          <span v-if="item.data.presentPrice" :class="{responsive: item.data.limitNum !== null}">
            P{{item.data.originalPrice}}
          </span>
        </li>
        <li>{{item.num}}</li>
        <li>P{{item.price}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goods-list",
    props: ['goodsList'],
    data() {
      return {}
    },
    computed: {
      // console.log()
    },
  }
</script>

<style scoped lang="scss">
  .goods-list {
    margin-top: 30px;
    .title {
      margin-top: 30px;
    }
    .top {
      margin-top: 30px;
      background: #F5F5F5;
      overflow: hidden;
      height: 50px;
      line-height: 50px;
      border: 1px solid #EBEBEB;
      li {
        float: left;
        width: 10%;
        box-sizing: border-box;
        text-align: center;
        &:first-child {
          width: 70%;
          padding-left: 30px;
          text-align: left;
        }
        &.price {
          text-align: left;
        }
        &:last-child {
          text-align: right;
          padding-right: 40px;
        }
      }
    }
    .list {
      ul {
        overflow: hidden;
        border-left: 1px solid #EBEBEB;
        border-right: 1px solid #EBEBEB;
        &:nth-child(2n) {
          background: #FAFAFA;
        }
        li {
          float: left;
          height: 80px;
          line-height: 80px;
          width: 10%;
          box-sizing: border-box;
          text-align: center;
          border-bottom: 1px solid #EBEBEB;
          &:first-child {
            padding-left: 30px;
            width: 70%;
            overflow: hidden;
            text-align: left;
            img {
              width: 50px;
              height: 50px;
              float: left;
              margin-top: 15px;
            }
            div {
              float: left;
              margin-left: 20px;
              margin-top: 15px;
              span {
                display: block;
                height: 50px;
                line-height: 50px;
                color: #999999;
                &:first-child {
                  color: #333333;
                  font-weight: bold;
                }
                &.responsive {
                  height: 25px;
                  line-height: 25px;
                }
              }
            }
          }
          &.price {
            padding-top: 15px;
            text-align: left;
            span {
              display: block;
              height: 50px;
              line-height: 50px;
              color: #999999;
              &:first-child {
                color: #333333;
                font-weight: bold;
              }
              &.responsive {
                height: 25px;
                line-height: 25px;
              }
            }
          }
          &:last-child {
            color: #FF644D;
            text-align: right;
            padding-right: 40px;
          }
        }
      }
    }
  }
</style>
