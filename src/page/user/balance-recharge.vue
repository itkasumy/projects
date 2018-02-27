<template>
  <div>
    <!--头部-->
    <common-header/>
    <div class="recharge__container clearfix">
      <div class="u-pc-sidebar">
        <!--侧边栏-->
        <side-bar></side-bar>
      </div>
      <div class="recharge__wrapper u-pc-content">
        <div class="top__header">
          <a href="javascript:;" class="left__todo" @click="toUrl('/my-balance')"><i class="iconfont icon-return"></i>账户余额</a>
        </div>
        <div class="recharge__form__wrapper">
          <el-row>
            <el-col :span="12">
              <div class="recharge__form">
                <el-form label-width="80px" size="small">
                  <el-form-item label="充值卡号">
                    <el-input placeholder="请输入卡号"></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox label="我已阅读并同意平台服务协议"></el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary">下一步</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="notic">
                <img src="../../assets/img/recharge.png">
                <p>为了您的金钱账号安全，您的充值卡号和密码请确认无误再提交</p>
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
    return {}
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
.recharge__container {
  @include container;
  top: 20px;
  .recharge__wrapper {
    .recharge__form__wrapper {
      margin: 20px;
      border: 1px solid $bd-gray;
      border-radius: 4px;
      .el-col {
        &:first-child {
          border-right: 1px solid $bd-gray;
        }
      }
      .recharge__form {
        padding: 50px 0;
        margin: 0 auto;
        width: 310px;
      }
      .notic {
        padding: 50px 0;
        text-align: center;
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

</style>
