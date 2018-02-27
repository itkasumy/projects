<template>
  <div class="common-footer">
    <div class="footer-content">
      <div class="logo">
        <img src="../../assets/img/pic_logo_footer.png" alt="logo">
        <ul>
          <li><i class="iconfont icon-facebook"></i></li>
          <li><i class="iconfont icon-twitter"></i></li>
          <li><i class="iconfont icon-google"></i></li>
          <li>中文</li>
        </ul>
      </div>
      <ul class="list">
        <li>关于</li>
        <li>关于LOONG DELIVERY</li>
        <li>用户条款</li>
        <li>合作伙伴协议</li>
      </ul>
      <ul class="list">
        <li>商务合作</li>
        <li>商家入驻</li>
        <li>骑手入驻</li>
        <li>代理商合作</li>
      </ul>
      <ul class="list">
        <li>更多</li>
        <li>常见问题</li>
        <li>App下载</li>
        <li>建议意见</li>
      </ul>
    </div>
    <div class="bottom">
      <p>© 2018 Loong-delivery Technologies Inc.</p>
      <ul>
        <li>帮助</li>
        <li>反馈</li>
        <li>隐私</li>
        <li>条款</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "common-footer",
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .common-footer {
    width: 100%;
    height: 354px;
    background: #FAFAFA;
    box-sizing: border-box;
    padding-top: 50px;
    margin-top: 20px;
    border-top: 1px solid #DDDDDD;
    .footer-content {
      @include container;
      overflow: hidden;
      padding-bottom: 50px;
      border-bottom: 1px solid #DDDDDD;
      .logo {
        float: left;
        ul {
          margin-top: 30px;
          overflow: hidden;
          li {
            float: left;
            width: 70px;
            height: 40px;
            background: #fff;
            text-align: center;
            line-height: 40px;
            box-sizing: border-box;
            border-top: 1px solid #EBEBEB;
            border-bottom: 1px solid #EBEBEB;
            border-right: 1px solid #EBEBEB;
            i {
              color: #999999;
              font-size: 20px;
            }
            &:first-child {
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              border-left: 1px solid #EBEBEB;
            }
            &:last-child {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
          }
        }
      }
      ul.list {
        float: left;
        margin-top: 30px;
        margin-left: 200px;
        li:first-child {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 25px;
          color: #333333;
        }
        li {
          font-size: 14px;
          color: #999999;
          padding: 3px 0;
        }
      }
    }
    .bottom {
      @include container;
      line-height: 94px;
      color: #999999;
      font-size: 14px;
      p {
        float: left
      }
      ul {
        float: right;
        li {
          float: left;
          padding: 0 20px;
          position: relative;
          &:not(:first-child):before {
            content: '';
            height: 14px;
            width: 1px;
            background: #999999;
            position: absolute;
            left: 0;
            top: 40px;
          }
        }
      }
    }
  }
</style>
