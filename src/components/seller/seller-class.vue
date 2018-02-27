<template>
  <div class="seller-class">
    <div class="header">
      <span class="title">筛选条件</span>
      <span class="switch" @click="switchIndex" v-if="showIndex===6">
        全部展开 <i class="iconfont icon-unfold"></i>
      </span>
      <span class="switch" @click="switchIndex" v-else>
        全部收起 <i class="iconfont icon-packup"></i>
      </span>
    </div>
    <div class="class-content">
      <span v-if="!loading">商家分类</span>
      <el-row v-if="!loading">
        <el-col :span="4" v-for="(item, index) in  classList" :key="index" v-show="index < showIndex">
          <span :class="{active : index === choose}" @click="changeType(item, index)">{{item.name}}</span>
        </el-col>
      </el-row>
      <common-loading v-if="loading"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "seller-class",
    props: ['classList', 'loading'],
    data() {
      return {
        showIndex: 6,
        choose: 0,
      }
    },
    watch: {
      classList() {
        this.showIndex = this.classList.length
      }
    },
    methods: {
      changeType(item, index) {
        this.choose = index
        this.$emit('changeType', item)
      },
      switchIndex() {
        this.showIndex = this.showIndex === 6 ? this.classList.length : 6
      }
    }
  }
</script>

<style scoped lang="scss">
  .seller-class {
    @include container;
    width: 1179px;
    background: #fff;
    margin-top: 20px;
    border: 1px solid #DDDDDD;
    .header {
      background: #FAFAFA;
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      padding: 0 30px;
      .title {
        float: left;
      }
      .switch {
        float: right;
        cursor: pointer;
        user-select: none;
      }
    }
    .class-content {
      padding: 30px 30px 10px;
      span {
        display: inline-block;
        float: left;
        height: 30px;
        line-height: 30px;
      }
      .el-row {
        overflow: hidden;
        padding-left: 30px;
        box-sizing: border-box;
      }
      .el-col {
        margin-bottom: 20px;
        height: 30px;
        line-height: 30px;
        span {
          text-align: center;
          padding: 0 15px;
          border-radius: 15px;
          user-select: none;
          cursor: pointer;
          &:hover,
          &.active {
            background-image: linear-gradient(to right, #FC8279, #FF644D);
            color: #fff;
          }
        }
      }
    }
  }
</style>
