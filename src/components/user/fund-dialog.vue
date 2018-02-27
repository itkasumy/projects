<template>
  <div @keyup.enter="submit">
    <el-dialog class="fund-dialog" :visible.sync="visible" width="600px" title="设置资金密码">
      <div class="form-group special" v-if="!isSet || level===1">
        <label>识别码</label>
        <el-input placeholder="请输入识别码" v-model="verifyImg" />
        <p class="img-loading" v-show="tokenLoading">加载中...</p>
        <img :src="codeImg" @click="getCodeImg" v-show="!tokenLoading">
      </div>
      <div class="form-group" v-if="!isSet || level===1">
        <label>手机号码</label>
        <p class="phone">+{{userInfo.phonePre}} {{userInfo.phone | formatPhone}}</p>
      </div>
      <div class="form-group special" v-if="!isSet || level===1">
        <label>手机验证码</label>
        <el-input placeholder="手机验证码" v-model="verifyMsg" />
        <el-button type="primary" :loading="sendLoading" @click="sendMessage" :disabled="countdown!==0">
          <span v-if="countdown===0">获取验证码</span>
          <span v-else>{{countdown}}s</span>
        </el-button>
      </div>
      <div class="form-group" v-if="isSet && level !== 1">
        <label>原密码</label>
        <el-input type="password" placeholder="原密码" v-model="oldPassword" />
      </div>
      <div class="form-group">
        <label>新密码</label>
        <el-input type="password" placeholder="新密码" v-model="newPassword" />
      </div>
      <div class="form-group">
        <label>确认密码</label>
        <el-input type="password" placeholder="确认密码" v-model="confirmPassword" />
      </div>
      <!--<div class="btn-group">-->
      <!--<el-button type="primary" class="submit" :loading="submitLoading" @click="submit">提交</el-button>-->
      <!--<el-button type="primary" plain @click="visible = false">取消</el-button>-->
      <!--</div>-->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="visible = false">取消</el-button>
        <el-button type="primary" class="submit" :loading="submitLoading" @click="submit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "fund-dialog",
  props: ['upThe'],
  data() {
    return {
      visible: false,
      level: 0,
      codeImg: null,
      token: null,
      verifyImg: null,
      verifyMsg: null,
      countdown: 0,
      tokenLoading: false,
      sendLoading: false,
      submitLoading: false,
      oldPassword: null,
      newPassword: null,
      confirmPassword: null
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    isSet() {
      let { upThe } = this
      return parseInt(upThe) !== -1
    }
  },
  methods: {
    ...mapActions('user', ['ajaxCodeImg', 'ajaxSendMessage',
      'ajaxChangePassword', 'ajaxAddMoneyPassword', 'ajaxForgetPassword'
    ]),
    // 显示Dialog
    show() {
      this.visible = true
      this.verifyImg = null
      this.verifyMsg = null
      this.oldPassword = null
      this.newPassword = null
      this.confirmPassword = null
      this.getCodeImg()
    },
    // 获取图片验证码
    async getCodeImg() {
      if (this.tokenLoading) return
      this.tokenLoading = true
      let { token, codeImg } = await this.ajaxCodeImg()
      this.token = token
      this.codeImg = codeImg
      this.tokenLoading = false
    },
    // 发送短信验证码
    async sendMessage() {
      if (this.sendLoading) return
      this.sendLoading = true
      let { token, verifyImg } = this
      let { phone } = this.userInfo
      let res = await this.ajaxSendMessage({ verify: verifyImg, token, phone })
      console.log(res)
      if (res.code === 1) {
        this.countdown = 60
        const timer = setInterval(() => {
          if (this.countdown <= 0) clearInterval(timer)
          else this.countdown -= 1
        }, 1000)
      } else {
        this.$message.error(res.message)
        this.getCodeImg()
      }
      this.sendLoading = false
    },
    // 提交
    async submit() {
      if (this.submitLoading) return
      this.submitLoading = true
      let { level, isSet } = this
      if (level === 1) {
        await this.forgetPassword()
      }
      if (level !== 1 && isSet) {
        await this.changePassword()
      }
      if (level !== 1 && !isSet) {
        await this.setPassword()
      }
      this.submitLoading = false
    },
    // 设置密码
    async setPassword() {
      let { newPassword, confirmPassword, verifyMsg, token } = this
      let { phone } = this.userInfo
      if (!verifyMsg) {
        this.$message.error('请输入手机验证码')
      } else if (!newPassword) {
        this.$message.error('请输入密码')
      } else if (newPassword !== confirmPassword) {
        this.$message.error('两次密码不一致')
      } else {
        let MoneyPassword = this.$md5(newPassword)
        let res = await this.ajaxAddMoneyPassword({ MoneyPassword, verify: verifyMsg, token, phone })
        // console.log('设置', res)
        if (res.code === 1) {
          this.visible = false
          setTimeout(() => {
            this.$message.success('设置成功')
          }, 100)
        } else {
          this.$message.error(res.message)
        }
      }
    },
    // 修改密码
    async changePassword() {
      let { newPassword, confirmPassword, oldPassword } = this
      if (!oldPassword) {
        this.$message.error('请输入旧密码')
      } else if (!newPassword) {
        this.$message.error('请输入密码')
      } else if (newPassword !== confirmPassword) {
        this.$message.error('两次密码不一致')
      } else {
        let MoneyPassword = this.$md5(oldPassword)
        let NewMoneyPassword = this.$md5(newPassword)
        let res = await this.ajaxChangePassword({ MoneyPassword, NewMoneyPassword })
        // console.log('修改', res)
        if (res.code === 1) {
          this.visible = false
          setTimeout(() => {
            this.$message.success('修改成功')
          }, 100)
        } else {
          this.$message.error(res.message)
        }
      }
    },
    // 忘记密码
    async forgetPassword() {
      let { newPassword, confirmPassword, verifyMsg, token } = this
      let { phone } = this.userInfo
      if (!verifyMsg) {
        this.$message.error('请输入手机验证码')
      } else if (!newPassword) {
        this.$message.error('请输入密码')
      } else if (newPassword !== confirmPassword) {
        this.$message.error('两次密码不一致')
      } else {
        let NewMoneyPassword = this.$md5(newPassword)
        let res = await this.ajaxForgetPassword({ NewMoneyPassword, verify: verifyMsg, phone, token })
        // console.log('忘记', res)
        if (res.code === 1) {
          this.visible = false
          setTimeout(() => {
            this.$message.success('重置成功')
          }, 100)
        } else {
          this.$message.error(res.message)
        }
      }
    }
  }
}

</script>
<style lang="scss">
.fund-dialog {
  .el-dialog__title {
    color: #333;
    font-size: 16px;
  }
  .el-dialog__body {
    padding: 30px;
  }
  .el-dialog__header {
    background: #F5F5F5;
  }
  .code {
    overflow: hidden;
    img {
      float: left;
      height: 30px;
      margin-top: 5px;
      width: 100px;
      cursor: pointer;
    }
    p.loading {
      float: left;
      width: 100px;
      height: 40px;
      line-height: 40px;
      padding: 0;
      text-align: left;
    }
    .el-input {
      float: left;
      width: 180px;
      margin-left: 30px;
    }
    .el-button {
      float: right;
      width: 130px;
    }
  }
  .form-group {
    overflow: hidden;
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
    label {
      float: left;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      width: 100px;
      text-align: right;
    }
    .el-input {
      float: left;
      width: 410px;
      margin-left: 30px;
    }
    p.phone {
      height: 40px;
      line-height: 40px;
      margin-left: 30px;
      float: left;
      color: #666;
    }
    &.special {
      .el-input {
        float: left;
        width: 270px;
        margin-left: 30px;
      }
      .el-button {
        margin-left: 20px;
      }
      img {
        margin-left:20px;
        height: 30px;
        margin-top: 5px;
      }
      p.img-loading {
        margin-left:20px;
        padding: 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
    }
  }
  .btn-group {
    margin-top: 20px;
    overflow: hidden;
    .el-button {
      float: right;
      width: 100px;
    }
    .submit {
      margin-left: 30px;
    }
  }
}

</style>
