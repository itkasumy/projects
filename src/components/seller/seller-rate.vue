<template>
  <div class="seller-rate">
    <!--链接-->
    <div class="header">
      <router-link :to="item.url" :class="{active : index === 1}" v-for="(item, index) in urlList" :key="index">
        {{item.name}}
      </router-link>
    </div>
    <!--评论列表-->
    <div class="list">
      <div class="evaluate" v-for="(item, index) in rateList" :key="index" :class="{last: index + 1 === rateList.length}">
        <!--用户头像-->
        <div class="avatar">
          <img :src="item.headIcon">
        </div>
        <div class="content">
          <div class="top">
            <!--用户名称-->
            <div class="name">{{item.nichName}}</div>
            <!--评分-->
            <el-rate v-model="item.orderScore" disabled :colors="['#FF644C', '#FF644C', '#FF644C']" show-score text-color="#666" score-template="评分{value}"></el-rate>
            <!--日期-->
            <div class="date">{{item.date}}</div>
          </div>
          <!--评论内容-->
          <p>{{item.desc}}</p>
          <!--评论照片-->
          <div class="photos">
            <el-row>
              <el-col :span="8" v-for="(photo, index) in item.photos" :key="index">
                <img :src="photo" @click="showImageSwiper(item.photos,index)">
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <common-no-data message="暂无评价" v-if="!loading && rateList.length === 0" />
      <common-loading v-if="loading" />
      <el-col :span="24" class="bottom-line" v-if="!loading && loadAll && rateList.length > 0">我是有底线的</el-col>
    </div>
  </div>
</template>
<script>
export default {
  name: "seller-rate",
  props: ['rateList', 'loading', 'loadAll'],
  components: {},
  data() {
    return {}
  },
  computed: {
    sellerId() {
      return this.$route.params.id
    },
    urlList() {
      let arr = []
      let { sellerId } = this
      arr[0] = { url: `/seller/${sellerId}`, name: '所有商品' }
      arr[1] = { url: `/seller/rate/${sellerId}`, name: '商家评论' }
      arr[2] = { url: `/seller/info/${sellerId}`, name: '商家资质' }
      return arr
    }
  },
  mounted() {},
  methods: {
    showImageSwiper(imgList, index) {
      this.$imgView({
        list: imgList,
        index: index
      });
    },
  }
}

</script>
<style scoped lang="scss">
.seller-rate {
  /*min-height: 500px;*/
  margin-top: 20px;
  width: 780px;
  background: #fff;
  .header {
    height: 50px;
    border-bottom: 1px solid #ddd;
    a {
      display: inline-block;
      height: 48px;
      line-height: 48px;
      padding: 0 20px;
      margin: 0 20px;
      &.active,
      &:hover {
        color: $color-primary;
        border-bottom: 2px solid $color-primary;
      }
    }
  }
  .list {
    .evaluate {
      overflow: hidden;
      padding: 30px 20px;
      border-bottom: 1px dashed #ddd;
      &.last {
        border-bottom: none;
      }
      .avatar {
        float: left;
        width: 60px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
      .content {
        float: left;
        width: 680px;
        padding-left: 20px;
        .top {
          overflow: hidden;
          .name {
            float: left;
            font-weight: bold;
          }
          .el-rate {
            float: left;
            margin-left: 10px;
          }
          .date {
            float: right;
            font-size: 12px;
            color: #999999;
          }
        }
        p {
          margin-top: 5px;
          font-size: 12px;
          color: #999999;
        }
        .photos {
          .el-col {
            height: 0;
            padding-bottom: 120px;
            overflow: hidden;
            padding-top: 15px;
          }
          img {
            width: 210px;
            height: 120px;
            cursor: pointer;
            cursor: zoom-in;
          }
        }
      }
    }
  }
}

</style>
