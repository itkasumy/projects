<template>
    <div class="menu-list">
        <div>
            <el-row>
                <el-col :span="3"><div class="auth-list-title">权限列表</div></el-col>
                <el-col :span="7"><div class="auth-list-input">  <el-input size="small" :clearable="true" v-model="inputValue" placeholder="输入功能名称"></el-input></div></el-col>
                <el-col :span="6"> <el-button size="small" type="primary" @click="search">搜索</el-button></el-col>
            </el-row>
        </div>
        <div class="auth-list-body">
            <el-tree :data="dataList" show-checkbox ref="xyz"
                :node-key="defaultProps.id" :props="defaultProps" :filter-node-method="filterNode" class="auth-list-tree"></el-tree>
        </div>
    </div>
</template>
<script>
export default {
  name: "menuList",
  props: {
    dataList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      inputValue:"",
      defaultProps: {
        children: "children",
        label: "name",
        id:"key"
      }
    };
  },
  mounted(){
    setTimeout(() => {
      this.$emit("xyz", {x: 'xyz'})
    }, 1000);
  },
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
    },
    getCheckedNodes(){
      return this.$refs.xyz.getCheckedNodes();
    },
    getCheckedList(){
      let xyz = this.$refs.xyz
      let res= xyz.getCheckedNodes();
      let temp = [];
      res.forEach((dl, index) => {
        let flag = 0 
        dl.children&&dl.children.forEach((dl1, index) => {
          dl1.children&&(flag=1);
        })
         flag&&temp.push(dl)
      })
      let res1= xyz.getCheckedNodes(true);
      let  aas= xyz.getHalfCheckedNodes()
       aas.forEach((dl, index) => {
        let halfFlag = 0; 
          let dltemp = JSON.parse(JSON.stringify(dl))
           dltemp.children =[];
            console.log(dl)
         dl.children&&dl.children.forEach((dl1, index) => {
             let dl1temp = JSON.parse(JSON.stringify(dl1))
             dl1temp.children =[];
          res1.forEach((aa,i) => {
            if(dl1.children&&dl1.children.indexOf(aa)!==-1){
              dl1temp.children.push(aa)
            };
          })
          dl1temp.children.length&&dltemp.children.push(dl1temp)
          dl1.children&&(halfFlag = 1)
           //dl.children&&console.log(dl.children.indexOf(aa))
         })
         halfFlag&&temp.push(dltemp)
       })
       return temp;
    },

    search() {
      if(this.inputValue){
        this.$refs.xyz.filter(this.inputValue);
      }else{
        this.$refs.xyz.filter(null)
      }
    }
  }
};
</script>
<style lang="scss" >
.menu-list {
  margin: 0% 3%;
  .auth-list-input {
    width: 160px;
  }
  .auth-list-title {
    font-size: 14px;
    font-weight: bold;
    line-height: 34px;
    color: #5a5a5a;
  }
  .auth-list-body {
    margin-top: 2%;
    font-size: 12px;
  }
  .auth-list-tree {
    color: #868686;
  }
}
</style>
