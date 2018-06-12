<template>
    <div class="user-manager">
        <el-main class="app-main table-page">
            <h2 class="tp-title">用户管理</h2>
            <div class="">
                <!-- 搜索 -->
                <div class="tp-header">
                    <div class="tp-left">
                        <el-button size="small" type="primary" @click="add">+新增用户</el-button>
                    </div>
                    <div class="tp-right">
                        <div class="tp-result">
                            <span>共搜索到
                                <span class="tp-result-count">{{allCount}}</span>条记录</span>
                            <el-button size="small" type="text" @click="reset">重置</el-button>
                        </div>
                        <div class="tp-input-group">
                            <ul>
                                <li class="select">
                                    <el-select clearable size="small" v-model="accountStatus" @change="accountStatusChange" placeholder="选择帐号状态">
                                        <el-option v-for="item in accountStatusLists" :key="item.value" :value="item.value" :label="item.label"></el-option>
                                    </el-select>
                                </li>
                                <li class="input">
                                    <el-input size="small" :clearable="true" v-model="inputValue" placeholder="输入用户名/姓名/手机号/机构"></el-input>
                                </li>
                                <li>
                                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 表格 -->
                <div>
                    <el-table :data="tableLists" style="width: 100%;" border id="myTable" >
                        <el-table-column v-for="(value, index) in tableHeader" :key="index" :label="value.label" :prop="value.prop" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="editItem(scope)">编辑</el-button>
                                <el-button type="text" @click="makeIce(scope)" style="color:#00cce3;" v-show="scope.row.isIce">冻结</el-button>
                                <el-button type="text" @click="cancelIce(scope)" style="color:#00cce3;" v-show="!scope.row.isIce">解冻</el-button>
                                <el-button type="text" @click="removeItem(scope)" v-if="scope.row.flag" class="red">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <!-- 分页 -->
                <div class="tp-page">
                    <!-- <el-pagination background layout="prev, pager, next, jumper" :total="allCount" @current-change="currentPageChange"></el-pagination> -->
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" background :page-size="pageSize" layout="prev, pager, next, jumper" :total="allCount"></el-pagination>
                </div>
            </div>
        </el-main>
    </div>
</template>
<script>
import { errorException } from './js/tip.js';
const TABLEHEADER = [
  { label: "序号", prop: "index" },
  { label: "用户名称", prop: "userName" },
  { label: "角色", prop: "roleName" },
  { label: "姓名", prop: "userRealname" },
  { label: "性别", prop: "userSex" },
  { label: "联系电话", prop: "userPhone" },
  { label: "身份证", prop: "userIdcard" },
  { label: "机构", prop: "deptName" },
  { label: "职位", prop: "userPosition" },
  { label: "工号", prop: "userNo" },
  { label: "备注", prop: "userRemark" },
  { label: "帐号状态", prop: "flag" }
];

export default {
  name: "DeviceManagerEdit",
  data() {
    return {               // 搜索记录
      tableHeader: TABLEHEADER,          // 表头数据
      tableLists: [],                    // 表格数据
      allCount: 0,                       // 分页总记录数
      pageSize: 10,                      // 分页页容量
      currentPage: 1,                    // 分页当前页
      accountStatusLists: [
        {
            value: '0',
            label: '正常',
        },{
            value: '1',
            label: '冻结',
        }
      ],                                // 账号状态数据
      accountStatus: "",                // 绑定的账号状态
      inputValue: "", 
      url1:'',                          // 绑定搜索的值
      // url1: 'http://10.10.18.88:8080',  // 获取初始值服务
    };
  },
  created(){
    this.getTableLists();
  },
  watch: {
      accountStatus:function (val,old){
        val = val.trim()
        if(val){
          if(this.inputValue.trim()){
            let param = `flag=${this.accountStatus}&condition=${this.inputValue.trim()}`
            this.getTableLists(param);
          }else{
            let param = `flag=${val.trim()}`
            this.getTableLists(param);
          }
        }else{
          if(this.inputValue.trim()){
            let param = `condition=${this.inputValue.trim()}`
            this.getTableLists(param)
          }
        }
      }
  },
  methods: {
    // 获取初始化数据
    getTableLists(param) {
        let url = null
        if(param){
            url = `${this.url1}/base/user/getUserPage/${this.currentPage - 1}/${this.pageSize}?${param}`
        }else{
            url = `${this.url1}/base/user/getUserPage/${this.currentPage - 1}/${this.pageSize}`
        }
        this.$axios.get(url).then(res => {
            // console.log("获取的初始值是: " , res.data);
            let userSex = null;
            this.tableLists = [];
            this.allCount = res.data.totalElements;
            res.data.content.forEach((item,index) => {
                let status = item.flag==0?'正常':'冻结';
                let isIce = item.flag==0?true:false;
                switch (item.userSex) {
                    case '0':
                         userSex = '未知'
                        break;
                    case '1':
                         userSex = '男'
                        break
                    default:
                         userSex = '女'
                        break;
                }
                this.tableLists.push({
                  "index": index + 1,
                  "userName": item.userName,
                  "roleName": item.userRoleNames,
                  "userRealname": item.userRealname,
                  "userSex": userSex,
                  "userPhone": item.userPhone,
                  "userIdcard": item.userIdcard,
                  "deptName": item.deptName,
                  "userPosition": item.userPosition,
                  "userNo": item.userNo,
                  "userRemark": item.userRemark,
                  "flag": status,
                  "userId": item.userId,
                  "isIce": isIce
                })
            });
        })
    },
    // 重置
    reset() {
      this.inputValue = "";
      this.accountStatus = '';
      this.getTableLists();
    },
    // 用户账号状态
    accountStatusChange(val) {
    },
    // 搜索
    search() {
        let val = this.inputValue.trim();
        console.log('下拉框: ',this.accountStatus)
        console.log('输入框: ',this.val)
        if(val){
                if(this.accountStatus){
                    let param = `flag=${this.accountStatus}&condition=${val}`
                    this.getTableLists(param);
                }else{
                    let param = `condition=${val}`
                    this.getTableLists(param);
                }
        }else{
            this.getTableLists();
        }
    },
    // 表格
    // 新增用户
    add() {
        this.$router.push({ name:'userAdd'});
    },
    // 编辑
    editItem(data) {
      this.$router.push({path: `/system/userEdit/${data.row.userId}`})
    },
    // 删除
    removeItem(data) {
      this.$confirm(`确定需要删除${data.row.userRealname}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = `${this.url1}/base/user/delUser/${data.row.userId}`
          this.$axios.get(url).then(res => {
              this.handleCurrentChange(this.currentPage)
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 冻结
    makeIce(val) {
      this.$confirm(`确定需要冻结${val.row.userRealname}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const url = `${this.url1}/base/user/lockUser/${val.row.userId}`;
        this.$axios.get(url).then(res => {
          this.getTableLists()
          this.$message({ type: 'success', message: '冻结成功!' });
        }).catch( res => {
          errorException(this , res);
        })
      }).catch(() => {
        this.$message({ type: 'info',  message: '已取消冻结'  });          
      });
      
    },
    // 解冻
    cancelIce(val) {
      this.$confirm(`确定需要解冻${val.row.userRealname}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const url = `${this.url1}/base/user/unlockUser/${val.row.userId}`;
        this.$axios.get(url).then(res => {
          this.getTableLists()
          this.$message({ type: 'success',  message: '解冻成功!' });
        }).catch( res => {
          errorException(this , res);
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消解冻' });          
      });
    },
    // 分页页容量变化
    handleSizeChange(val) {
        
    },
    // 分页页码变化
    handleCurrentChange(val) {
        this.currentPage = val;
        this.getTableLists();
    },
  }
};
</script>
<style lang="scss">
@import "../../common/css/tablePageCommon.scss";
.user-manager {
  .input {
    width: 200px;
  }
  .select {
    width: 120px;
  }
}
button.red span {
  color: #ff4242;
}
#myTable .el-table__body-wrapper > table > tbody > tr > td {
    height: 30px;
    padding: 17px 0;
    font-size: 12px;
    color: #9ca3ac;
  }
</style>
