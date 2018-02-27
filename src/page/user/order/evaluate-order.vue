<template>
  <div>
    <!--头部-->
    <common-header/>
    <div class="evaluate__order__container u-detail-box ">
      <div class="clearfix c-detail-header">
        <h2 class="title">{{$t('order.detail.evalOrder')}}</h2>
        <a href="javascript:;" class="back" @click="goBack">{{$t('common.back')}}<i class="iconfont icon-enter"></i></a>
      </div>
      <div class="evaluate__order__wrapper">
        <common-loading v-if="loading" />
        <common-no-data type="order" :message="$t('common.noOrder')" v-if="noOrder" />
        <div class="order__wrapper" v-if="!noOrder">
          <div class="shop__info">
            <el-row>
              <el-col :span="12">
                <router-link :to="link"><img :src="orderInfo.logo"></router-link>
                <div class="u-middle info__detail">
                  <router-link :to="link">
                    <h2>{{orderInfo.sellerName}}</h2></router-link>
                  <div class="location clearfix">
                    <i class="iconfont icon-location"></i>
                    <el-tooltip placement="top">
                      <div slot="content">{{orderInfo.location}}</div>
                      <span>{{orderInfo.location}}</span>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="u-middle">
                  <div class="eval__star__wrapper">
                    <span>{{$t('order.detail.label.goodsRaty')}}</span>
                    <el-rate show-text class="u-inner-block" :colors="rateColor" v-model="orderScore"></el-rate>
                  </div>
                  <div class="eval__star__wrapper">
                    <span>{{$t('order.detail.label.deliRaty')}}</span>
                    <el-rate show-text class="u-inner-block" :colors="rateColor" v-model="deliScore"></el-rate>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="evaluate__textarea">
            <el-input type="textarea" cols="3" :placeholder="$t('order.detail.evalTextarea')" v-model="evalContent"></el-input>
          </div>
          <div class="clearfix">
            <div class="upload__img__container">
              <span>{{$t('order.detail.uploadImg')}}</span>
              <div class="upload__img__wrapper">
                <ul class="clearfix">
                  <li v-for="(item, index) in addImgList" :key="index" :class="item.id">
                    <img src="">
                    <div class="loading">
                      <i class="iconfont icon-loading icon-rotating"></i>
                    </div>
                    <span class="close__btn" @click="delAddImg(index)">
                    <i class="iconfont icon-jian"></i>
                  </span>
                  </li>
                  <li class="add__img">
                    <div id="add__img-file--btn">
                      <i class="iconfont icon-camera_full"></i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="recommend__food">
              <span>{{$t('order.detail.recomendGoods')}}:</span>
              <div class="recommend__food__wrapper">
                <ul class="clearfix">
                  <li v-for="(item, index) in goodsList" :key="index" :item="item">
                    <el-row>
                      <el-col :span="20">
                        <img :src="item.goodsPic">
                        <div class="c-dis-table">
                          <div class="v-middle">{{item.goodsName}}</div>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div class="c-dis-table zan" :data-id="index" @click="zanClick($event.currentTarget)">
                          <div class="v-middle">
                            <i class="iconfont icon-icon_recommend"></i>
                            <i class="iconfont icon-icon_recommend_xuanzhong"></i>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="submit__wrapper">
            <el-button type="primary" @click="submit" :loading="submitLoading">{{$t('common.sub')}}</el-button>
          </div>
        </div>
      </div>
    </div>
    <common-footer/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import $ from 'jquery'
export default {
  data() {
    return {
      rateColor: ['#FF644C', '#FF644C', '#FF644C'],
      deliScore: 1, //配送评分
      orderScore: 1, //订单评分
      evalContent: '', //评论详情
      goodsList: [], //商品列表
      orderInfo: { //订单详情
        logo: null,
        sellerName: null,
        orderTime: null
      },
      addImgList: [], //上传图片集合
      maxNum: 9, //最大上传个数
      submitLoading: false,
      noOrder: false,
      loading: true
    }
  },
  computed: {
    link() {
      return '/seller/' + this.orderInfo.sellerId;
    },
    orderId() {
      return this.$route.params.id;
    },
  },
  async mounted() {
    let self = this;
    await this.initData();
    this.loading = false;
    if (!this.noOrder) {
      $('.order__wrapper').show();
    }
    let uptoken = await self.ajaxGetQiniuToken();
    Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: 'add__img-file--btn', // 上传选择的点选按钮，必需
      uptoken: uptoken, // uptoken是上传凭证，由其他程序生成
      get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的uptoken
      unique_names: true, // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
      domain: 'http://p09c65oxn.bkt.clouddn.com', // bucket域名，下载资源时用到，必需
      max_retries: 9, // 上传失败最大重试次数
      chunk_size: '4mb', // 分块上传时，每块的体积
      auto_start: false, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      filters: {
        max_file_size: '20mb',
        prevent_duplicates: true,
        mime_types: [
          { title: "Image files", extensions: "jpg,gif,png" }, // 限定jpg,gif,png后缀上传
        ]
      },
      init: {
        'FilesAdded': function(up, files) {
          let lastNum = self.maxNum - self.addImgList.length;
          let chooseNum = files.length;
          if (chooseNum <= lastNum) {
            plupload.each(files, function(file) {
              self.addImgList.push(file)
            });
            self.checkIfUpload();
            up.start();
          } else {
            self.$message.error(self.$t('order.detail.alert.uploadImgLim'))
          }
        },
        'BeforeUpload': function(up, file) {},
        'UploadProgress': function(up, file) {},
        'FileUploaded': function(up, file, info) {
          let domain = up.getOption('domain');
          let res = eval("(" + info + ")");
          let sourceLink = domain + "/" + res.key;
          $('.' + file.id + ' img').attr('src', sourceLink);
          $('.' + file.id + ' img').show();
          $('.' + file.id + ' .loading').hide();
          $('.' + file.id + ' .close__btn').show();
        },
        'Error': function(up, err, errTip) {
          self.$message.error(errTip)
        },
        'UploadComplete': function() {},
        'Key': function(up, file) {
          let key = "";
          return key
        }
      }
    });
  },
  methods: {
    ...mapActions('order', ['ajaxOrderDetail', 'ajaxGetQiniuToken', 'ajaxSubmitEvaluate']),
    async initData() {
      let self = this;
      let orderId = this.orderId;
      let res = await this.ajaxOrderDetail({ orderId: orderId })
      if (self.$checkData(res)) {
        if (res.code === 9004) {
          self.noOrder = true;
          return false;
        }
        self.orderInfo = res.data.orderAndSeller;
        res.data.goods.forEach((item, index) => {
          self.goodsList.push(item);
        })
      }
    },
    delAddImg(index) {
      this.addImgList.splice(index, 1);
      this.checkIfUpload();
    },
    checkIfUpload() {
      let self = this;
      if (self.addImgList.length >= self.maxNum) {
        $('.add__img__wrapper').hide();
      } else {
        $('.add__img__wrapper').show();
      }
    },
    // 提交评价
    async submit() {
      let self = this;
      let goodsId = '',
        recommendFood = '',
        picture = '',
        rGoodsIds = [],
        goodsList = self.goodsList,
        orderInfo = self.orderInfo,
        addImgList = self.addImgList;
      $('.zan.active').each(function() {
        let id = $(this).data('id');
        rGoodsIds.push(id);
      });
      for (let i = 0; i < rGoodsIds.length; i++) {
        if (i == rGoodsIds.length - 1) {
          goodsId = goodsId + goodsList[rGoodsIds[i]].id;
          recommendFood = recommendFood + goodsList[rGoodsIds[i]].goodsName;
        } else {
          goodsId = goodsId + goodsList[rGoodsIds[i]].id + ',';
          recommendFood = recommendFood + goodsList[rGoodsIds[i]].goodsName + ',';
        }
      }
      for (let i = 0; i < addImgList.length; i++) {
        if (i == addImgList.length - 1) {
          picture = picture + addImgList[i].target_name;

        } else {
          picture = picture + addImgList[i].target_name + ',';

        }
      }
      let params = {
        deliveryId: orderInfo.deliveryId,
        goodsId: goodsId,
        RecommendFood: recommendFood,
        orderId: orderInfo.orderId,
        userDesc: self.evalContent,
        picture: picture,
        orderScore: self.orderScore,
        sellerId: orderInfo.sellerId,
        deliveryScore: self.deliScore
      }
      if (!params.userDesc) {
        self.$message.error(self.$t('common.notFull'))
      } else {
        this.submitLoading = true
        let res = await this.ajaxSubmitEvaluate(params);
        if (res.code === 1) {
          self.$message({
            message: self.$t('order.status.evalComplete'),
            type: 'success',
            onClose: function() {
              self.$router.go(-1)
            }
          });
        } else {
          if (res.code === 401) {
            this.$router.push('/account/login');
          } else {
            this.submitLoading = false
            this.$message.error(res.message)
          }
        }
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    zanClick(obj) {
      if ($(obj).hasClass('active')) {
        $(obj).removeClass('active');
      } else {
        $(obj).addClass('active');
      }
    }
  }
}

</script>
<style scope lang="scss">
.evaluate__order__container {
  @include container;
  margin-top: 20px;
  background: #fff;
  .evaluate__order__wrapper {
    .order__wrapper {
      display: none;
    }
    .shop__info {
      .info__detail {
        overflow: hidden;
        padding-right: 20px;
      }
      .el-col {
        height: 90px;
      }
      img {
        width: 130px;
        height: 90px;
        float: left;
        margin-right: 30px;
      }
      h2 {
        font-size: 18px;
      }
      .location {
        margin-top: 25px;
        i {
          position: relative;
          top: -1px;
          font-size: 20px;
          float: left;
          margin-right: 10px;
        }
        span {
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          overflow: hidden;
          color: $imp-color;
          width: 90%;
          float: left;
        }
      }
      .eval__star__wrapper {
        &:first-child {
          margin-bottom: 30px;
        }
        .el-rate {
          margin-left: 20px;
          top: -2px;
        }
      }
    }
    .evaluate__textarea {
      margin: 40px 0;
      textarea {
        height: 150px;
        background: $bg-gray--light;
        padding: 20px;
      }
    }
    .upload__img__container {
      float: left;
      width: 340px;
      margin-right: 40px;
      .upload__img__wrapper {
        padding: 10px;
        margin-top: 20px;
        height: 340px;
        border: 1px solid $bd-gray;
        overflow: hidden;
        ul {
          li {
            border: 1px solid $bd-gray;
            position: relative;
            width: 84px;
            height: 84px;
            float: left;
            margin: 10px;
            border-radius: 4px;
            img {
              width: 100%;
              height: 100%;
              display: none;
            }
            .close__btn {
              display: none;
              position: absolute;
              top: -8px;
              right: -10px;
              cursor: pointer;
              background: $color-primary;
              border-radius: 100%;
              width: 20px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              i {
                font-size: 14px;
                color: #fff;
              }
            }
            .loading {
              text-align: center;
              top: 50%;
              transform: translateY(-50%);
              i {
                font-size: 20px;
              }
            }
            &.add__img {
              border: 1px dashed $bd-gray;
              border-radius: 6px;
              background: $bg-gray--light;
              line-height: 86px;
              text-align: center;
              cursor: pointer;
              i {
                font-size: 25px;
                color: #ccc;
              }
            }
          }
        }
      }
    }
    .recommend__food {
      overflow: hidden;
      .recommend__food__wrapper {
        margin-top: 20px;
        padding: 20px;
        border: 1px solid $bd-gray;
        min-height: 340px;
        ul {
          li {
            float: left;
            width: 50%;
            padding: 10px;
            box-sizing: border-box;
            img {
              width: 40px;
              height: 40px;
              margin-right: 10px;
              float: left;
            }
            span {
              color: $imp-color;
            }
            .c-dis-table {
              height: 40px;
              &.zan {
                position: absolute;
                right: 0;
                cursor: pointer;
                i {
                  color: #ccc;
                }
                .icon-icon_recommend_xuanzhong {
                  display: none;
                }
                .icon-icon_recommend {
                  display: block;
                }
                &.active {
                  i {
                    color: $color-primary;
                  }
                  .icon-icon_recommend_xuanzhong {
                    display: block;
                  }
                  .icon-icon_recommend {
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
    }
    .submit__wrapper {
      text-align: center;
      margin-top: 40px;
    }
  }
}

</style>
