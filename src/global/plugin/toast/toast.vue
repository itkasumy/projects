<template>
  <transition name="toast">
    <div class="toast" v-if="visible">
      <!--文字-->
      <div v-if="type === 'message'" class="message">
        {{message}}
      </div>
      <!--加载中-->
      <div v-if="type === 'loading'" class="with-icon">
        <!--<i class="iconfont icon-jiazaiicon icon-rotating"></i>-->
        <v-loading color="#fff"/>
        <p>{{message}}</p>
      </div>
      <!--成功-->
      <div v-if="type === 'success'" class="with-icon">
        <i class="iconfont icon-successful"></i>
        <p>{{message}}</p>
      </div>
      <!--失败-->
      <div v-if="type === 'error'" class="with-icon">
        <i class="iconfont icon-error"></i>
        <p>{{message}}</p>
      </div>
      <!--警告-->
      <div v-if="type === 'warning'" class="with-icon">
        <i class="iconfont icon-warning"></i>
        <p>{{message}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  import VLoading from "../../components/v-loading";

  export default {
    components: {VLoading},
    name: 'toast',
    data() {
      return {
        visible: false,
        type: null,
        message: null,
        timer: null,
        duration: 1500,
      }
    },
    methods: {
      show(message) {
        if (this.timer) clearTimeout(this.timer)
        this.type = 'message'
        this.visible = true
        this.message = message || 'toast'
        this.timer = setTimeout(() => {
          this.close()
        }, this.duration)
      },
      loading(message) {
        if (this.timer) clearTimeout(this.timer)
        this.type = 'loading'
        this.visible = true
        this.message = message || '正在加载'
      },
      success(message) {
        if (this.timer) clearTimeout(this.timer)
        this.type = 'success'
        this.visible = true
        this.message = message || '成功'
        this.timer = setTimeout(() => {
          this.close()
        }, this.duration)
      },
      error(message) {
        if (this.timer) clearTimeout(this.timer)
        this.type = 'error'
        this.visible = true
        this.message = message || '失败'
        this.timer = setTimeout(() => {
          this.close()
        }, this.duration)
      },
      warning(message) {
        if (this.timer) clearTimeout(this.timer)
        this.type = 'warning'
        this.visible = true
        this.message = message || '警告'
        this.timer = setTimeout(() => {
          this.close()
        }, this.duration)
      },
      close() {
        if (this.timer) clearTimeout(this.timer)
        this.visible = false
      }
    }
  }
</script>
<style scoped lang="scss">
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .7);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    text-align: center;
    z-index: 1000;
    .message {
      font-size: 14px;
    }
    .with-icon {
      i {
        font-size: 30px;
        border-radius: 50%;
      }
      p {
        margin-top: 10px;
        font-size: 13px
      }
    }
  }
  .toast-enter-active, .toast-leave-active {
    transition: opacity 0.5s;
  }
  .toast-enter, .toast-leave-to {
    opacity: 0;
  }
</style>
