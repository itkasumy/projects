<template>
  <div class="address-list">
    <v-header title="我的收货地址" link="新增" linkUrl="/user/address/new" class="u-fixed-header"></v-header>
    <div class="u-main-content fixed">
      <template v-if="!loading && addressList.length===0">
      <common-no-data message="您还没有收货地址哦"/>
      <v-button unblock @click="addAdd">添加收货地址</v-button>
      </template>
      <address-card v-for="(item, index) in addressList" :key="index" :item="item" :isOrder="type" @click.native="addClick(item)"/>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapMutations,mapState} from 'vuex'
  import AddressCard from '@/components/user/address-card'
  import CommonNoData from '@/components/common/common-no-data'
  export default {
    name: "address-list",
    props: [],
    components: {AddressCard,CommonNoData},
    data() {
      return {
        addressList:[],
        loading:true
      }
    },
    computed: {
      type(){
        let type=this.$route.query.type || false;
        return type;
      },
      sellerId(){
        let id=this.$route.query.sellerId || false;
        return id;
      }
    },
    mounted() {
      this.getAddressList();
    },
    methods: {
      ...mapMutations('order', ['setAddress']),
      ...mapActions('user', ['ajaxAddressList']),
      async getAddressList() {
        let self = this;
        self.loading=true;
        self.$toast.loading();
        let res=null;
        if(self.type){
          res = await self.ajaxAddressList({sellerId:self.sellerId});
        }else{
          res = await self.ajaxAddressList();
        }
        self.$toast.close();
        self.loading=false;
        if (self.$checkData(res)) {
          self.addressList = [];
          res.data.forEach(item => {
            item.deleteShow = false;
            self.addressList.push(item)
          })
        }
      },
      addClick(item){
        if(this.type){
          if(!item.disabled){
            this.setAddress(item);
            this.$router.push('/place-order')
          }else{
            this.$toast.error('超出配送范围');
          }
        }
      },
      addAdd(){
        this.$router.push('/user/address/new')
      }
    }
  }
</script>
<style scoped lang="scss">
  .address-list {

  }
</style>
