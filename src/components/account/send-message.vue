<template>
  <div class="send-message" v-if="visible" @keyup.enter.stop="submit">
    <p>请输入识别码</p>
    <div class="close" @click="close"><i class="iconfont icon-chuyidong"></i></div>
    <div class="verify">
      <el-input v-model="verify" placeholder="请输入识别码"></el-input>
      <div class="code-img">
        <img :src="codeImg" v-if="!imgLoading">
        <i class="iconfont icon-shuaxin" :class="{'icon-rotating' : imgLoading}" @click="getCodeImage"></i>
      </div>
    </div>
    <p class="hint">识别码提交后，验证码将发送到您的手机上</p>
    <el-button type="primary" :loading="submitLoading" @click="submit">提交</el-button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "send-message",
    props: ['phone', 'prePhone'],
    data() {
      return {
        verify: null,
        token: null,
        codeImg: null,
        imgLoading: false,
        submitLoading: false,
        visible: false
      }
    },
    methods: {
      ...mapActions('user', ['ajaxCodeImg', 'ajaxSendMessage']),
      async getCodeImage() {
        if (this.imgLoading) return
        this.imgLoading = true
        let {token, codeImg} = await this.ajaxCodeImg()
        this.token = token
        this.codeImg = codeImg
        this.imgLoading = false
      },
      async open() {
        this.getCodeImage()
        this.verify = null
        this.visible = true
      },
      async close() {
        this.visible = false
        this.$emit('close')
      },
      async submit() {
        let {verify, token, phone, prePhone} = this
        if (!verify) {
          this.$message.success('请输入识别码')
          return
        }
        this.submitLoading = true
        let res = await this.ajaxSendMessage({verify, token, phone, prePhone})
        if (res.code === 1) {
          this.$message.success(res.message)
          this.close()
        } else {
          this.$message.error(res.message)
          this.getCodeImage()
        }
        this.submitLoading = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .send-message {
    position: absolute;
    top: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 6px;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.02);
    z-index: 3;
    .verify {
      position: relative;
      margin: 15px 0;
      .el-input {
        padding-right: 145px;
        .el-input__inner {
          padding-right: 145px;
        }
      }
      .code-img {
        position: absolute;
        right: 0;
        top: 5px;
        overflow: hidden;
        img {
          float: left;
          height: 30px;
        }
        i {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          float: right;
          font-size: 18px;
          cursor: pointer;
          margin: 0 5px;
          &:before {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .close {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 30px;
      height: 30px;
      line-height: 10px;
      text-align: center;
      cursor: pointer;
      font-size: 24px;
      &:hover {
        color: $color-primary;
      }
    }
    .hint {
      font-size: 12px;
      color: #999999;
    }
    .el-button {
      margin-top: 15px;
      width: 100%;
    }
  }
</style>
