<template>
  <div class="address-card" :class="{'disabled':item.disabled,'u-link-bg':!item.disabled}">
    <div class="card__inner">
      <div class="address__name">
        {{item.address}} {{item.houseNumber}}
      </div>
      <div class="tel__name">
        <span class="name">{{item.name}}</span>
        <span class="tel">{{item.phone | phoneTran}}</span>
        <i class="iconfont icon-bianji u-link" v-if="noEdit==null" @click="edit()"/>
      </div>
    </div>
    <div class="choose" v-if="addChoosed">
      <i class="iconfont icon-successful"></i>
    </div>
    <div class="shad__cover">
      <img src="../../assets/img/out-range.png">
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: "address-card",
    props: ['item', 'noEdit','isOrder'],
    computed: {
      ...mapState('order', ['address']),
      addChoosed(){
        if(this.isOrder){
          if(this.address!=null){
            if(this.address.id==this.item.id){
              return true;
            }else{
              return false;
            }
          }else{
            return false;
          }
        }else{
          return false;
        }
      }
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
      edit() {
        this.$router.push('/user/address/' + this.item.id)
      }
    }
  }
</script>

<style scoped lang="scss">
  .address-card {
    background: #fff;
    border-bottom: 1px solid $grey-ddd;
    position: relative;
    &.disabled {
      .shad__cover {
        display: block;
      }
    }
    &:last-child {
      border-bottom: 0;
    }
    .shad__cover {
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      z-index: 5;
      background: #ffffffa3;
      img{
        width: 2.9rem;
        position: absolute;
        top: 50%;
        left: 65%;
        transform: translateY(-50%);
      }
    }
    .choose {
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      color: #fff;
      background: red;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        border: .75rem solid transparent;
        border-right-color: #fff;
        border-bottom-color: #fff;
      }
      i {
        position: absolute;
        top: 0.05rem;
      }
    }
    .card__inner {
      padding: .75rem;
      position: relative;
      z-index: 3;
    }
    .address__name {
      font-size: 14px;
      color: $font-important;
      margin-bottom: .45rem;
    }
    .tel__name {
      font-size: 14px;
      color: #BBBBBB;
      .name {
        margin-right: .75rem;
      }
      i {
        float: right;
        font-size: 22px;
        margin-top: -4px;
      }
    }
  }
</style>
