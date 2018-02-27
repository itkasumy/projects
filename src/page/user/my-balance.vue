<template>
  <div>
    <!--头部-->
    <common-header/>
    <div class="balance__container clearfix">
      <div class="u-pc-sidebar">
        <!--侧边栏-->
        <side-bar pageId="4"></side-bar>
      </div>
      <div class="balance__wrapper u-pc-content">
        <div class="top__header no-bd">
          <h2>账户余额</h2>
          <common-loading v-if="loading" />
          <div class="balance__detail" v-else>
            <span class="money">{{balance}}</span>
            <el-button type="primary" size="small" plain>提现</el-button>
            <el-button type="primary" size="small">充值</el-button>
          </div>
        </div>
        <div class="u-panel transaction__wrapper nobt">
          <div class="tran__header">
            <h2>交易记录</h2>
            <div class="u-float-r">
              <el-radio-group v-model="transactionType" @change="getBalanceList">
                <el-radio label="0">所有记录</el-radio>
                <el-radio label="1">充值记录</el-radio>
                <el-radio label="2">提现记录</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="tran__list">
            <el-table :data="tranData" :empty-text="noData">
              <el-table-column prop="createTime" label="交易时间">
              </el-table-column>
              <el-table-column prop="accountBalanceType" label="交易类型">
              </el-table-column>
              <el-table-column prop="money" label="交易金额">
              </el-table-column>
              <el-table-column prop="disableStatus" label="交易状态">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button round size="mini" @click="showBalanceDetails(scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="u-pagination" v-if="parseInt(totalPage)>10">
              <el-pagination layout="prev, pager, next" :total="totalPage" :current-page="currentPage" @current-change="changePage"></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <common-footer/>
    <el-dialog title="交易详情" :visible.sync="tranDetailsVisible" class="c-dialog" width="600px">
        <el-form ref="form" label-width="150px" class="c-form" label-position="left">
          <el-form-item :label="item.label" v-for="(item, index) in tranDataDetail" :key="item.index">
            <span>{{item.data}}</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tranDetailsVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import SideBar from "../../components/user/side-bar";
export default {
  data() {
    return {
      noData: '加载中...',
      transactionType: '0',
      balance: '',
      tranData: [],
      tranDataDetail: [],
      pageSize: 8,
      currentPage: 1,
      totalPage: 0,
      pageSize: 8,
      tranDetailsVisible: false,
      loading: true
    }
  },
  components: { SideBar },
  async mounted() {
    this.getBalance();
    this.getBalanceList();
  },
  methods: {
    ...mapActions('user', ['ajaxBalanceAndCoupon', 'ajaxBalanceLog']),
    async getBalance() {
      let self = this;
      self.loading = true;
      let res = await this.ajaxBalanceAndCoupon();
      if (self.$checkData(res)) {
        self.balance = res.data.BalanceSize;
      }
      self.loading = false;
    },

    async getBalanceList() {
      let self = this;
      let type = self.transactionType;
      self.tranData = [];
      self.noData = '加载中...'
      let { pageSize, currentPage } = self
      let res = await self.ajaxBalanceLog({ pageSize, currentPage, type: type })
      if (self.$checkData(res)) {
        self.totalPage = res.data.balance.totalPages * 10
        res.data.balance.content.forEach(item => {
          self.tranData.push(item)
        })
      }
      if (self.tranData.length === 0) {
        self.noData = '暂无数据'
      }
    },
    showBalanceDetails(item) {
      this.tranDataDetail = [{
        label: '操作',
        data: item.accountBalanceType
      }, {
        label: '结果',
        data: item.disableStatus
      }, {
        label: '涉及金额',
        data: item.money
      }, {
        label: '创建时间',
        data: item.createTime
      }, {
        label: '交易流水号',
        data: item.orderId
      }];
      this.tranDetailsVisible = true;
    },
    changePage(page) {
      this.currentPage = page
      this.getBalanceList()
      window.scrollTo(0, 0)
    }
  }
}

</script>
<style scope lang="scss">
.balance__container {
  @include container;
  margin-top: 20px;
  .balance__wrapper {
    min-height: 0;
    background: none;
    .top__header {
      background: #fff;
      margin-bottom: 20px;
      h2 {
        margin-bottom: 15px;
      }
      .balance__detail {
        .money {
          font-size: 38px;
          color: $imp-color;
          margin-right: 50px;
        }
        button {
          position: relative;
          bottom: 9px;
        }
      }
    }
    .transaction__wrapper {
      min-height: 642px;
      .tran__header {
        padding: 20px;
        h2 {
          font-size: 16px;
          display: inline-block;
        }
      }
      .tran__list {
        padding: 0 20px 20px 20px;
        th,
        td {
          text-align: center;
        }
        thead {
          th {
            background: $bg-gray--light;
            color: rgba(102, 102, 102, 0.50);
          }
          .cell {
            font-weight: 500;
          }
        }
      }
    }
  }
}

.tran__detail__wrapper {
  width: 400px;
  margin: 0 auto;
}

</style>
