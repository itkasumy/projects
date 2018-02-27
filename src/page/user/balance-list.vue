<template>
	<div class="balance-list bg-white">
    <template v-if="!showDetail">
    <v-header title="交易记录" class="u-fixed-header"></v-header>
    <div class="u-main-content fixed ">
      <ul class="list-type">
        <li class="u-link-bg" :class="{active:type===0}" @click="type=0"><span>全部</span></li>
        <li class="u-link-bg" :class="{active:type===1}" @click="type=1"><span>收入</span></li>
        <li class="u-link-bg" :class="{active:type===2}" @click="type=2"><span>支出</span></li>
      </ul>
      <div class="list__container">
        <template v-if="tranData.length === 0 && !loading">
          <common-no-data message="暂无任何交易明细"/>
        </template>
        <div class="list__wrapper u-link-bg" v-for="(item, index) in tranData" :key="index" :item="item" @click="detail(item)">
          <div class="title clearfix">
            <span class="todoName">{{item.accountBalanceType}}</span>
            <span class="mon">{{item.money}} P</span>
          </div>
          <div class="clearfix">
            <span class="time">{{item.createTime}}</span>
            <span class="status">{{item.disableStatus}}</span>
          </div>
        </div>
      </div>
    </div>
    </template>
    <template v-if="showDetail">
      <div class="detail__header u-fixed-header">
        <div class="back" @click="showDetail=false"><i class="iconfont icon-return" /></div>
        <div class="title">交易详情</div>
      </div>
      <div class="u-main-content fixed ">
        <ul class="detail__wrapper">
          <li>
            <span class="todo">操作方式</span>
            <span class="con">{{tranDataDetail.accountBalanceType}}</span>
          </li>
          <li>
            <span class="todo">交易状态</span>
            <span class="con">{{tranDataDetail.disableStatus}}</span>
          </li>
          <li>
            <span class="todo">交易金额</span>
            <span class="con">{{tranDataDetail.money}} P</span>
          </li>
          <li>
            <span class="todo">创建时间</span>
            <span class="con">{{tranDataDetail.createTime}}</span>
          </li>
          <li>
            <span class="todo">交易流水号</span>
            <span class="con">{{tranDataDetail.orderId}}</span>
          </li>
        </ul>
      </div>
    </template>
	</div>
</template>

<script>
  import {mapActions} from 'vuex'
  import CommonNoData from '@/components/common/common-no-data'
	export default {
		name: "balance-list",
		props: [],
		components: {CommonNoData},
		data() {
			return {
        type: 0,
        pageSize: 8,
        currentPage: 1,
        totalPage: 0,
        tranData:[],
        tranDataDetail:{},
        loading:true,
        showDetail:false
      }
		},
    watch: {
      type() {
        this.getBalanceList()
      }
    },
		computed: {},
		mounted() {
		  this.getBalanceList();
		},
		methods: {
      ...mapActions('user', [ 'ajaxBalanceLog']),
      async getBalanceList() {
        let self = this;
        let type = self.type;
        self.loading=true;
        self.$toast.loading();
        self.tranData = [];
        let { pageSize, currentPage } = self
        let res = await self.ajaxBalanceLog({ pageSize, currentPage, type: type })
        self.$toast.close();
        self.loading=false;
        if (self.$checkData(res)) {
          self.totalPage = res.data.balance.totalPages * 10
          res.data.balance.content.forEach(item => {
            self.tranData.push(item)
          })
        }
        window.scrollTo(0, 0)
      },
      detail(item){
        this.tranDataDetail=item;
        this.showDetail=true;
      }
    }
	}
</script>

<style scoped lang="scss">
	.balance-list {
    ul.list-type {
      border-bottom: 1px solid $grey-ddd;
      top: 2.2rem;
      position: fixed;
      width: 100%;
      display: flex;
      text-align: center;
      line-height: 2.2rem;
      background: #fafafa;
      font-size: 14px;
      li {
        flex: 1;
        &.active {
          span {
            display: inline-block;
            height: 2.2rem;
            border-bottom: 2px solid $primary;
          }
        }
      }
    }
    .list__container{
      margin-top: 2.35rem;
      .list__wrapper{
        padding: .75rem;
        border-bottom:1px solid $grey-ddd;
        .title{
          margin-bottom: .75rem;
          .todoName{
            float: left;
            font-size: 16px;
            color: $font-important;
          }
          .mon{
            float: right;
            font-size: 16px;
            color: #FB4E44;
          }
        }
        .time,.status{
          float: left;
          font-size: 14px;
          color: #999999;
        }
        .status{
          float: right;
        }
      }
    }
    .detail__header {
      z-index: 1;
      background-color: #fff;
      height: 2.2rem;
      line-height: 2.2rem;
      position: relative;
      @include border-bottom(#ddd);
      .back {
        position: absolute;
        top: 0;
        left: 0.8rem;
        -webkit-tap-highlight-color: transparent;
        i {
          font-size: 24px;
        }
        &:active {
          color: #ddd;
        }
      }
      .title {
        font-size: 18px;
        text-align: center;
      }
      &.transparent {
        color: #fff;
        background: transparent;
        &:after {
          background: transparent;
        }
      }
    }
    .detail__wrapper{
      li{
        padding: .75rem;
        border-bottom: 1px solid $grey-ddd;
        &:after {
          clear: both;
          content: ".";
          display: block;
          font-size: 0;
          height: 0;
          line-height: 0;
          visibility: hidden;
        }
        .todo{
          float: left;
          font-size: 14px;
          color: $font-primary;
        }
        .con{
          float: right;
          font-size: 14px;
          color: $font-important;
        }
      }
    }
	}
</style>
