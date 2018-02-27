<template>
  <div class="place">
    <!--头部-->
    <common-header/>
    <!--筛选条件-->
    <seller-class :classList="classList" :loading="classLoading" @changeType="changeType"/>
    <!--商家列表-->
    <seller-list :sellerList="sellerList" :loading="listLoading" :loadAll="loadAll" @changeSort="changeSort"/>
    <!--返回顶部-->
    <common-back-top/>
    <!--底部-->
    <common-footer/>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import SellerList from "../components/seller/seller-list";
  import SellerClass from "../components/seller/seller-class";

  export default {
    name: "place",
    components: {SellerClass, SellerList},
    data() {
      return {
        listLoading: false,
        classLoading: false,
        loadAll: false,
        pageSize: 16,
        currentPage: 1,
        totalPage: null,
        type: null,
        sortType: null,
        location: null,
        sellerList: [],
        classList: [{name: '所有分类', id: null}]
      }
    },
    async mounted() {
      let location = localStorage.getItem('location');
      if (!location) {
        this.$router.push('/')
      } else {
        this.location = JSON.parse(location)
        this.getSellerClass()
        this.initList()
      }
    },
    methods: {
      ...mapActions('seller', ['ajaxSellerList', 'ajaxSellerClass']),
      // 获取商家类型
      async getSellerClass() {
        this.classLoading = true
        let res = await this.ajaxSellerClass()
        if (res.code === 1) {
          // console.log('商家类型', res)
          res.data.forEach(item => {
            this.classList.push(item)
          })
        } else {
          this.$message.error(res.message)
        }
        this.classLoading = false
      },
      // 初始化列表
      async initList() {
        let res = await this.getSellerList()
        if (res.code === 1 && res.data.content.length < this.pageSize) {
          this.loadAll = true
        } else if (res.code === 1) {
          window.addEventListener('scroll', this.scrollHandler)
        }
      },
      // 获取商家列表
      async getSellerList() {
        if (this.listLoading) return
        this.listLoading = true
        let {pageSize, currentPage, type, sortType} = this
        let {lat, lon, areaId} = this.location
        let res = await this.ajaxSellerList({lat, lon, areaId, pageSize, currentPage, type, sortType})
        if (res.code === 1) {
          // console.log('商家列表', res)
          res.data.content.forEach(item => {
            item.score = parseFloat(item.score)
            this.sellerList.push(item)
          })
        } else {
          this.$message.error(res.message)
        }
        this.listLoading = false
        return res
      },
      // 切换商家类型
      async changeType(type) {
        this.sellerList = []
        this.loadAll = false
        this.type = type.id
        this.currentPage = 1
        this.initList()
      },
      // 切换排序方式
      async changeSort(sortType) {
        this.sellerList = []
        this.loadAll = false
        this.sortType = sortType.type
        this.currentPage = 1
        this.initList()
      },
      // 滚动加载
      async scrollHandler() {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let distance = scrollHeight - clientHeight - scrollTop
        if (distance < 500) {
          this.currentPage += 1
          let res = await this.getSellerList()
          if (res && res.code === 1 && res.data.content.length < this.pageSize) {
            window.removeEventListener('scroll', this.scrollHandler)
            this.loadAll = true
          }
        }
      }
    }
  }

</script>
<style scoped lang="scss">
  .place {
  }
</style>
