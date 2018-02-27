<template>
  <div class="seller-licence" v-if="licence">
    <!--证书-->
    <div class="qualification" v-if="!loading">
      <div class="title">商家资质</div>
      <div class="img-list">
        <div class="img-warp">
          <img :src="licence.bir" class="img-responsive">
        </div>
        <div class="img-warp">
          <img :src="licence.dti" class="img-responsive">
        </div>
      </div>
    </div>
    <!--环境-->
    <div class="environment" v-if="!loading">
      <div class="title">店铺图片</div>
      <div class="img-list">
        <div class="img-warp" v-for="(img, index) in imgList" :key="index">
          <img :src="img" class="img-responsive">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "seller-licence",
    props: ['licence'],
    data() {
      return {
        loading: false
      }
    },
    computed: {
      imgList() {
        let imgList = []
        let {picture} = this.licence
        if (picture) imgList = picture.split(',')
        return imgList
      }
    }
  }
</script>

<style scoped lang="scss">
  .seller-licence {
    background: #fff;
    min-height: calc(100vh - 8rem - 2.2rem);
    .qualification {
      padding: 0 0.5rem;
      .img-warp {
        width: 50%;
      }
    }
    .environment {
      padding: 0 0.5rem;
      .img-warp {
        width: 33.33%;
      }
    }
    .title {
      font-size: 16px;
      padding: 0.5rem 0;
    }
    .img-list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      margin: 0 -0.2rem;
      .img-warp {
        padding: 0.2rem;
        box-sizing: border-box;
      }
    }
  }
</style>
