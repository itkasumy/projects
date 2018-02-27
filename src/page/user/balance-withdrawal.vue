<template>
  <div>
    <!--头部-->
    <common-header/>
    <div class="withdrawal__container clearfix">
      <div class="u-pc-sidebar">
        <!--侧边栏-->
        <side-bar></side-bar>
      </div>
      <div class="withdrawal__wrapper u-pc-content">
        <div class="top__header">
          <a href="javascript:;" class="left__todo" @click="toUrl('/my-balance')"><i class="iconfont icon-return"></i>账户余额</a>
        </div>
        <div class="withdrawal__stepbar">
          <el-row>
            <el-col :span="8" :class="{active:step==1}">
              绑定提现银行卡
            </el-col>
            <el-col :span="8" :class="{active:step==2}">
              输入提现金额和密码
            </el-col>
            <el-col :span="8" :class="{active:step==3}">
              提现完成
            </el-col>
          </el-row>
        </div>
        <div class="withdrawal__form__wrapper" v-if="step==1">
          <el-row>
            <el-col :span="12">
              <div class="withdrawal__form">
                <el-form label-width="80px" size="small">
                  <el-form-item label="持卡人">
                    <el-input placeholder="请输入持卡人姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="卡号">
                    <el-input placeholder="请输入银行卡号"></el-input>
                  </el-form-item>
                  <el-form-item label="银行">
                    <el-input placeholder="请输入银行名称"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="step=2">下一步</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="12" class="notic__wrapper">
              <div class="notic">
                <img src="../../assets/img/idcheck.png">
                <p>为了您的金钱账号安全，您的银行卡信息必须与实名认证信息一致</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="withdrawal__form__wrapper" v-if="step==2">
          <el-row>
            <el-col :span="12">
              <div class="withdrawal__form">
                <el-form label-width="100px" size="small">
                  <el-form-item label="提现银行卡">
                    <p>花旗银行 尾号（2356）</p>
                    <p class="tips__text">单笔最高提现¥200</p>
                  </el-form-item>
                  <el-form-item label="提现金额">
                    <el-input placeholder="00.00"></el-input>
                    <p class="tips__text">最多可提10000</p>
                  </el-form-item>
                  <el-form-item label="交易密码">
                    <el-input placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="step=3">提现</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="12" class="notic__wrapper">
              <div class="notic">
                <img src="../../assets/img/enterpass.png">
                <p>为了您的金钱账号安全，您的提现金额和交易密码请确认无误再提交</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="withdrawal__form__wrapper" v-if="step==3">
          <el-row>
            <el-col :span="12">
              <div class="withdrawal__form">
                <div class="success">
                  <div class="u-align-c">
                    <div class="circle"><i class="iconfont icon-gou"></i></div><span>提现完成</span>
                  </div>
                  <div class="u-align-c">
                    <el-button type="primary" plain>查看交易详情</el-button>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="notic__wrapper">
              <div class="notic">
                <img src="../../assets/img/withdrawal.png">
                <p>您的金额账户已提现成功，请及时查看您的账户余额及提现金额 </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SideBar from "../../components/user/side-bar";
export default {
  data() {
    return {
      step: 1
    }
  },
  components: { SideBar },
  methods: {
    toUrl(url) {
      this.$router.push(url)
    }
  }
}

</script>
<style scope lang="scss">
.withdrawal__container {
  @include container;
  top: 20px;
  .withdrawal__wrapper {
    .withdrawal__stepbar {
      margin: 20px 20px 0 20px;
      text-align: center;
      .el-col {
        color: #E0E0E0;
        padding-bottom: 20px;
        &.active {
          color: $imp-color;
          border-bottom: 1px solid $imp-color;
        }
      }
    }
    .withdrawal__form__wrapper {
      margin: 20px;
      border: 1px solid $bd-gray;
      border-radius: 4px;
      .el-col {

        &:first-child {
          border-right: 1px solid $bd-gray;
        }
      }
      .withdrawal__form {
        padding: 50px 0;
        margin: 0 auto;
        width: 310px;
        min-height: 320px;
        display: table;
        .el-form {
          display: table-cell;
          vertical-align: middle;
        }
        .tips__text {
          font-size: 12px;
          color: #999999;
        }
        .success {
          font-size: 16px;
          color: $imp-color;
          display: table-cell;
          vertical-align: middle;
          div.u-align-c {
            &:first-child {
              margin-bottom: 40px;
            }
          }
          .circle {
            width: 40px;
            height: 40px;
            background: $body-bg;
            border-radius: 100%;
            display: inline-block;
            border: 1px solid $bd-gray;
            text-align: center;
            line-height: 40px;
            border-radius: 100%;
            display: inline-block;
            margin-right: 20px;
            i {
              color: $bd-gray;
              font-size: 20px;
            }
          }
        }
      }
      .notic__wrapper {
        min-height: 320px;
        display: table;
        .notic {
          padding: 50px 0;
          text-align: center;
          display: table-cell;
          vertical-align: middle;
          img {
            width: 130px;
          }
          p {
            width: 280px;
            margin: 0 auto;
            margin-top: 30px;
            color: #999;
          }
        }
      }
    }
  }
}

</style>
