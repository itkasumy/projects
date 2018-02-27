<template>
  <ul class="tab-bar">
    <li v-for="(item, index) in linkList" :key="index">
      <router-link :to="item.url">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{item.name}}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "tab-bar",
    data() {
      return {
        linkList: [
          {url: '/home', name: '首页', icon: 'icon-home'},
          {url: '/order/all', name: '订单', icon: 'icon-order'},
          {url: '/user', name: '我的', icon: 'icon-user'}
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  ul.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    border-top: 1px solid #ddd;
    background: #fff;
    display: flex;
    li {
      flex: 1;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &.router-link-active {
          color: $primary;
        }
        i {
          font-size: 20px;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
</style>
