<template>
  <div class="seller-info">
    <common-header/>
    <seller-header v-if="!error"/>
    <div class="main" v-if="!error">
      <!--链接-->
      <div class="header">
        <router-link :to="item.url" :class="{active : index === 2}" v-for="(item, index) in urlList" :key="index">
          {{item.name}}
        </router-link>
      </div>
      <!--证书-->
      <div class="qualification" v-if="!loading">
        <div class="title">商家证书</div>
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item, index) in qualification" :key="index">
            <img :src="item">
          </el-col>
        </el-row>
      </div>
      <!--环境-->
      <div class="environment" v-if="!loading">
        <div class="title">商家环境</div>
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item, index) in environment" :key="index">
            <img :src="item">
          </el-col>
        </el-row>
      </div>
      <!--加载中-->
      <common-loading v-if="loading"/>
    </div>
    <common-no-data v-if="error" message="店铺不存在" style="min-height: 580px; padding-top: 100px;"/>
    <common-footer/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import SellerHeader from "../../components/seller/seller-header"

  export default {
    name: "seller-info",
    components: {SellerHeader},
    data() {
      return {
        error: false,
        loading: false,
        qualification: [],
        environment: []
      }
    },
    computed: {
      sellerId() {
        return this.$route.params.id
      },
      urlList() {
        let arr = []
        let {sellerId} = this
        arr[0] = {url: `/seller/${sellerId}`, name: '所有商品'}
        arr[1] = {url: `/seller/rate/${sellerId}`, name: '商家评论'}
        arr[2] = {url: `/seller/info/${sellerId}`, name: '商家资质'}
        return arr
      }
    },
    mounted() {
      this.getSellerQualification()
    },
    methods: {
      ...mapActions('seller', ['ajaxSellerQualification']),
      async getSellerQualification() {
        this.loading = true
        let {sellerId} = this
        let res = await this.ajaxSellerQualification({sellerId})
        console.log('商家资质', res)
        if (res.code === 1) {
          let data = res.data
          this.qualification.push(data.dti)
          this.qualification.push(data.bir)
          data.picture.split(',').forEach(item => {
            this.environment.push(item)
          })
        } else {
          this.error = true
        }
        this.loading = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .seller-info {
    .main {
      @include container;
      margin-top: 20px;
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
      .environment,
      .qualification {
        padding: 30px;
        img {
          margin-top: 20px;
          width: 340px;
          height: 200px;
          box-sizing: border-box;
          padding: 10px;
          background: #FAFAFA;
          border: 1px solid #DDDDDD;
        }
      }
      .qualification {
        border-bottom: 1px dashed #ddd;
      }
      .title {
        font-size: 16px;
        color: #666666;
      }
    }
  }
</style>
