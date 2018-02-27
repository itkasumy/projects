<template>
  <div class="send-message" v-show="visible">
    <div class="panel">
      <div class="title">请输入图片验证码</div>
      <div class="code">
        <input placeholder="验证码" v-model="verify">
        <div class="icon" v-if="tokenLoading">
          <i class="iconfont icon-loading icon-rotating"/>
        </div>
        <img :src="codeImg" @click="getCodeImg" v-else>
      </div>
      <div class="btns">
        <div class="confirm" @click="submit">确认</div>
        <div class="cancel" @click="close">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import VerifyInput from '@/components/common/verify-input'

  export default {
    name: "send-message",
    props: {
      phone: {required: true}
    },
    components: {VerifyInput},
    data() {
      return {
        visible: false,
        verify: null,
        token: null,
        codeImg: null,
        tokenLoading: false,
        submitLoading: false
      }
    },
    mounted() {
      this.getCodeImg()
    },
    methods: {
      ...mapActions('user', ['ajaxCodeImg', 'ajaxSendMessage']),
      async getCodeImg() {
        if (this.tokenLoading) return
        this.tokenLoading = true
        let {token, codeImg} = await this.ajaxCodeImg()
        this.token = token
        this.codeImg = codeImg
        this.tokenLoading = false
      },
      show() {
        this.getCodeImg()
        this.visible = true
      },
      close() {
        this.visible = false
      },
      getToken() {
        return this.token
      },
      async submit() {
        if (this.submitLoading) return
        this.sendLoading = true
        this.$toast.loading()
        let {token, verify, phone} = this
        console.log({verify, token, phone})
        let res = await this.ajaxSendMessage({verify, token, phone})
        console.log(res)
        if (res.code === 1) {
          this.$toast.success(res.message)
          this.close()
        } else {
          this.$toast.error(res.message)
          this.getCodeImg()
        }
        this.sendLoading = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .send-message {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(51, 51, 51, 0.5);
    z-index: 10;
    .panel {
      background: #F9F9F9;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 12px;
      width: 15rem;
      .title {
        text-align: center;
        font-size: 15px;
        height: 1.6rem;
        line-height: 1.6rem;
        padding-top: 0.3rem;
      }
      .code {
        display: flex;
        width: 100%;
        padding: 1.5rem 0.5rem;
        box-sizing: border-box;
        input {
          width: 9.5rem;
          height: 1.6rem;
          border-radius: 0;
          border: none;
          outline: none;
          -webkit-appearance: none;
          padding-left: 0.5rem;
          margin-right: 0.5rem;
          font-size: 16px;
          box-sizing: border-box;
          &::placeholder {
            color: #ccc;
          }
        }
        img {
          width: 4rem;
        }
        .icon {
          width: 4rem;
          text-align: center;
        }
      }
      .btns {
        display: flex;
        text-align: center;
        font-size: 15px;
        border-top: 1px solid #EDEAEA;
        color: #FF644C;
        .confirm {
          flex: 1;
          padding: 0.5rem 0;
          background: #fff;
          border-bottom-left-radius: 12px;
          border-right: 1px solid #EDEAEA;
          &:active {
            background: #EDEAEA;
          }
        }
        .cancel {
          flex: 1;
          padding: 0.5rem 0;
          background: #fff;
          border-bottom-right-radius: 12px;
          &:active {
            background: #EDEAEA;
          }
        }
      }
    }
  }
</style>
