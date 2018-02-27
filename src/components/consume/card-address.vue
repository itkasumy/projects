<template>
  <div class="content address-card" :class="{active: item.id === address.id}" @click="chooseAddress(item)">
    <div class="name">{{item.name}}
      <a hraf="javascript:;" class="edit__address" @click="$refs.modalEditAddress.show()" v-if="!item.disabled">
        <i class="iconfont icon-zhanghushezhi-bianjiicon1"></i>
      </a>
    </div>
    <div class="phone">
      <span>{{item.sex | sexTranslate }}</span>
      <span>{{item.phone}}</span>
    </div>
    <div class="address">
      <span>{{item.address}}</span>
      <span>{{item.houseNumber}}</span>
    </div>
    <div class="out-distance" v-if="item.disabled">
      <div class="out-content">
        <span>超出距离</span>
        <br>
        <span>我们很抱歉</span>
      </div>
    </div>
    <modal-address ref="modalEditAddress" @refreshList="refreshList" :item="item"/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import ModalAddress from '../../components/common/common-address'

  export default {
    props: ['item'],
    data() {
      return {}
    },
    computed: {
      ...mapState('order', ['address'])
    },
    components: {ModalAddress},
    methods: {
      chooseAddress(item) {
        if (item.disabled) return
        this.$emit('setAdd', item);
      },
      refreshList() {
        this.$emit('refreshList');
      }
    }
  }

</script>
<style scope lang="scss">
  .content {
    border: 1px solid #EBEBEB;
    height: 160px;
    padding: 20px;
    position: relative;
    &.active {
      @mixin line {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 2px solid;
        box-sizing: border-box;
      }
      &:before {
        @include line;
        border-image: linear-gradient(to bottom, $color-primary 25%, white 25%, white 75%, $color-primary 75%) 1;
        border-top: none;
        border-bottom: none;
      }
      &:after {
        @include line;
        border-image: linear-gradient(to right, $color-primary 25%, white 25%, white 75%, $color-primary 75%) 1;
        border-left: none;
        border-right: none;
      }
    }
  }

  .address-card {
    .name {
      color: #666666;
      padding-bottom: 12px;
      border-bottom: 1px solid #EBEBEB;
      font-weight: bold;
    }
    .phone {
      margin-top: 12px;
      span {
        font-size: 12px;
        color: #666666;
        margin-right: 10px;
      }
    }
    .address {
      margin-top: 12px;
      font-size: 12px;
      color: #666666;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .out-distance {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 160px;
      background: rgba(255, 255, 255, .7);
      display: table;
      .out-content {
        margin: 0 auto;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        padding: 22px 0;
        span:first-child {
          font-size: 20px;
          color: #666666;
          background: #fff;
        }
        span:last-child {
          font-size: 10px;
          color: #666666;
          background: #fff;
        }
      }
    }
  }

  .edit__address {
    position: absolute;
    right: 0;
    z-index: 1;
    color: #ccc;
  }

</style>
