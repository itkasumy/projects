<template>
  <div class="address-list">
    <div class="top">
      <p>请确认收货地址
        <router-link to="/user/my-address">管理收货地址</router-link>
      </p>
      <div class="switch" @click="switchLength"><i class="iconfont icon-unfold"></i>查看其他地址</div>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in addressList" :key="index" v-show="index<showLength">
        <card-address @refreshList="refreshList" @setAdd="setAdd" :item="item"/>
      </el-col>
      <el-col :span="6" class="add-address">
        <div class="content" @click="$refs.modalAddress.show()">
          <div class="button">
            <i class="iconfont icon-icon_add_big"></i>
            <br>添加新地址
          </div>
        </div>
      </el-col>
    </el-row>
    <modal-address ref="modalAddress" @refreshList="refreshList" />
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import ModalAddress from '../../components/common/common-address'
import CardAddress from '../../components/consume/card-address'
export default {
  name: "address-list",
  props: ['addressList'],
  data() {
    return {
      showLength: 3,
      item: null
    }
  },
  components: { ModalAddress, CardAddress },
  computed: {
    ...mapState('order', ['address'])
  },
  methods: {
    ...mapMutations('order', ['setAddress']),
    chooseAddress(item) {
      if (item.disabled) return
      this.setAddress(item)
    },
    refreshList() {
      this.$emit('refreshList');
    },
    switchLength() {
      this.showLength = this.showLength > 3 ? 3 : this.addressList.length
    },
    editAddress(add) {
      this.item = add;
      console.log(this.item);
      this.$refs.modalEditAddress.show()
    },
    setAdd(item) {
      this.setAddress(item)
    },
  }
}

</script>
<style scoped lang="scss">
.address-list {
  .top {
    overflow: hidden;
    margin-top: 30px;
    p {
      float: left;
      font-size: 14px;
      color: #666666;
      a {
        margin-left: 10px;
        color: #D69D00;
        font-size: 12px;
      }
    }
    .switch {
      float: right;
      color: #999999;
      cursor: pointer;
      user-select: none;
      i {
        margin-right: 5px;
      }
      &:hover {
        color: $color-primary;
      }
    }
  }

  .el-col {
    margin-top: 30px;
    cursor: pointer;
  }

  .add-address {
    .content {
      width: 100%;
      position: relative;
      .button {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #999999;
      }
      i {
        color: #CCCCCC;
        font-size: 30px;
      }
    }
  }
}

</style>
