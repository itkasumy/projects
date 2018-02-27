<template>
  <div class="account-footer">
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
    name: "account-footer",
    props: [],
    components: {},
    data() {
      return {}
    },
    computed: {},
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .account-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    margin-bottom: -1px;
    background: #FAFAFA;
    border-top: 1px solid #DDDDDD;
    .bottom {
      @include container;
      line-height: 94px;
      color: #999999;
      font-size: 14px;
      overflow: hidden;
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
