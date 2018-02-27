<template>
  <div>
    <!--头部-->
    <common-header/>
    <div class="my__address__container clearfix">
      <div class="u-pc-sidebar">
        <!--侧边栏-->
        <side-bar pageId="7" />
      </div>
      <div class="address__wrapper u-pc-content">
        <div class="top__header">
          <h2>我的收货地址</h2>
        </div>
        <common-loading v-if="loading" />
        <div class="address__list">
          <el-row v-if="!loading">
            <el-col :span="12" v-for="(item, index) in addressList" :key="index" :item="item">
              <card-address ref="cardAddress" :item="item" @refreshList="initData" />
            </el-col>
            <el-col :span="12">
              <div class="address__list__wrapper u-cursor-pointer" @click="$refs.modalAddress.show()">
                <div class="add__address u-middle-all">
                  <i class="iconfont icon-icon_add_big"></i><span>添加新地址</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <common-footer/>
    <modal-address ref="modalAddress" @refreshList="initData" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import SideBar from "../../components/user/side-bar";
import ModalAddress from '../../components/common/common-address'
import CardAddress from '../../components/user/card-address'

export default {
  data() {
    return {
      addressList: [],
      loading: true,
      changeLoading: false,
    }
  },
  components: { SideBar, ModalAddress, CardAddress },
  async mounted() {
    this.initData()
  },
  methods: {
    ...mapActions('user', ['ajaxAddressList', 'ajaxDeleteAddress']),
    async initData() {
      let self = this;
      self.loading = true;
      let res = await this.ajaxAddressList();
      if (self.$checkData(res)) {
        self.addressList = [];
        res.data.forEach(item => {
          item.deleteShow = false;
          self.addressList.push(item)
        })
      }
      self.loading = false;
    },
    // 删除
    async deleteAddress(id) {
      let self = this;
      if (self.changeLoading) {
        return false;
      }
      let load = self.$message({
        message: '正在删除...',
        type: 'warning',
        duration: 0
      });
      let res = await this.ajaxDeleteAddress({ addrId: id })
      load.close();
      self.changeLoading = false;
      if (self.$checkData(res)) {
        self.$message.success('删除地址成功');
        self.initData()
      }
    }
  }
}

</script>
<style scope lang="scss">
.my__address__container {
  @include container;
  margin-top: 20px;
  .address__list {
    padding: 10px;
    .el-col {
      padding: 10px;
      .address__list__wrapper {
        border: 1px solid $bd-gray;
        padding: 15px 20px;
        border-radius: 4px;
        min-height: 132px;
        .add__address {
          text-align: center;
          i {
            font-size: 20px;
            color: #ccc;
            position: relative;
            top: 2px;
          }
          span {
            margin-left: 20px;
          }
        }
      }
    }
  }
}

</style>
