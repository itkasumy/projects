<template>
<div>
    <span class="text">当前位置：</span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>{{firstBreadCrumbList.text}}</el-breadcrumb-item>
    <el-breadcrumb-item :to="{name: item.name}" v-for="(item, index) in breadcrumbLists" :key="index">{{item.text}}</el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>
<script>
export default {
  props: {
    lists: {
      type: Array,
      default: []
    }
  },
  computed: {
    firstBreadCrumbList() {
      return this.lists[0];
    },
    breadcrumbLists() {
      if(this.lists.length > 0){
        this.lists.forEach((l,index) => {
          if(l.text == undefined){
            this.lists.splice(index,1);
            return this.lists.slice(1);
          }
        })
      }
      return this.lists.slice(1);
    }
  }
};
</script>
<style>
header.el-header {
  padding-left: 96px;
  margin: 10px;
  background-color: #fff;
  border-radius: 5px;
  height: 40px !important;
  position: relative;
  color: #9ca3ac;
}
.el-header span {
  font-size: 12px;
  line-height: 40px;
  color: #9ca3ac;
  font-weight: normal;
}
.el-header .el-breadcrumb__item:last-child span {
  color: #229fff;
}
.el-header .el-breadcrumb__item:last-child:hover span {
  color: #229fff;
}
.el-header span.text {
  position: absolute;
  left: 30px;
}
</style>

