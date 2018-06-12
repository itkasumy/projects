<template>
 <div class="role-manage">
    <el-main class="app-main table-page">
        <h2 class="tp-title">角色管理</h2>
        <div>
            <!-- header -->
            <div class="tp-header">
                <div class="tp-left">
                    <el-button size="small" type="primary" @click="add">+新增角色</el-button>
                    <el-button size="small" type="primary" @click="authorRole">  角色授权  </el-button>
                </div>
                <div class="tp-right">
                    <div class="tp-result">
                        <span>共搜索到<span class="tp-result-count">{{allCount}}</span>条记录</span>
                        <el-button size="small" type="text" @click="reset">重置</el-button>
                    </div>
                    <div class="tp-input-group">
                        <ul>
                            <!-- <li class="select">
                                <el-select size="small" v-model="status" @change="change">
                                  <el-option
                                    v-for="item in statusLists" 
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label"
                                  ></el-option>
                                </el-select>
                            </li> -->
                            <li class="input">
                                <!-- 查询输入框1 -->
                                <el-input size="small" :clearable="true" v-model="inputValue" placeholder="输入角色名称"></el-input>
                            </li>
                            <li>
                                <!-- 查询输入框 .... -->
                            </li>
                            <li>
                                <el-button size="small" type="primary" @click="search">搜索</el-button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- table -->
            <div>
                <el-table
                    :data="tableLists"
                    style="width: 100%;"
                    border
                    >
                    <el-table-column 
                        v-for="(value, index) in tableHeader" :key="index"
                        :width="value.width"
                        :label="value.label"
                        :prop="value.prop"
                        align="center"
                        >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    align="center"
                    width="300px"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" @click="editItem(scope)">编辑</el-button>
                            <el-button type="text" @click="removeItem(scope)" class="red" :disabled="scope.row.status == '已使用'">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        
            <!-- page -->
            <div class="tp-page">

              <el-pagination
                background
                layout="prev, pager, next, jumper"
                :total="allCount"
                :page-count="pageCount"
                @current-change="currentPageChange"
                :current-page.sync="currentPage"
              ></el-pagination>
            </div>
        </div>
        <!-- 新增角色弹框 -->
         <div>
            <el-dialog
            title=""
            :visible.sync="centerDialogVisible"
            width="40%"
            center>
                <span>
                    <div class="content">
                        <div class="content-title">
                            {{dialogTitle}}角色
                        </div>
                        <div class="content-body">
                            <el-row :gutter="20" class="row-bg">
                                <el-col :span="4"><span><i class="red">*</i>角色名称</span></el-col>
                                <el-col :span="8"><el-input
                                            placeholder="请输入角色名称"
                                            :maxlength="15"
                                            size="small"
                                            v-model="roleName"
                                            clearable>
                                        </el-input>
                                        <!-- <span class="tip" v-show="true">您输入的名称不合法</span> -->
                                </el-col>
                                <el-col :span="12">
                                        <span class="tip" v-show="false">您输入的名称不合法</span>
                                </el-col>
                            </el-row>
                            <el-row :gutter="0" class="row-bg" >
                                <el-col :span="4"><span>角色描述</span></el-col>
                                <el-col :span="20">
                                      <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入角色描述"
                                            v-model="roleDesc"
                                            clearable>
                                        </el-input>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </span>
                <span slot="footer" class="dialog-footer">
                     <el-button type="primary" @click="addOrEdit">确 定</el-button>
                    <el-button @click="centerDialogVisible = false;">取 消</el-button>
                </span>
            </el-dialog>
         </div>
              <!-- 角色授权弹框 -->
         <div>
             <el-dialog
            title=""
            :visible.sync="authorDialogVisible"
            width="50%"
            center>
                <span>
                    <div class="auth-content">
                        <div class="auth-content-title">
                            角色授权
                        </div>
                        <div class="auth-content-body">
                          <el-tabs :tab-position="tabPosition" style="height: 500px;color:#868686">
                            <el-tab-pane v-for="(value, index) in tableLists" :key="index" :label="value.name">
                                <menu-list :dataList = "menu" @xyz="xxx" ref="menuList"></menu-list>
                            </el-tab-pane>
                          </el-tabs>
                        </div>
                    </div>
                </span>
                <span slot="footer" class="dialog-footer">
                     <el-button type="primary" @click="addRoleCom">确 定</el-button>
                    <el-button @click="authorDialogVisible = false;">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </el-main>
 </div>
</template>
<script>
const TABLEHEADER = [
  { label: "角色名称", prop: "name", width:"300px" },
  { label: "角色描述", prop: "desc" },
  { label: "授权状态", prop: "author", width:"120px" },
  { label: "状态", prop: "status" ,width:"120px"}
];
import menuList from "./systemMenuList";
export default {
  name: "DeviceManagerEdit",
  data() {
    return {
      url :'',
      resultCount: "0",
      inputValue: "",
      roleName:"",
      roleDesc:"",
      dialogTitle:'',
      editRoleId:'',
      tabPosition:"left",
      tableHeader: TABLEHEADER,
      centerDialogVisible:false,
      authorDialogVisible:false,
      allCount: 0,
      pageCount: 0,
      currentPage: 1,
      tableLists: [],
      nameList :[],
      menu :[],
      status: '',
      statusLists: [
        { label: "area1", value: "1" },
        { label: "area2", value: "2" }
      ],
      accreditLists:[]
    };
  },
  watch:{
      authorDialogVisible(val){
          if(!val){
              this.resetChecked();
          }
      }
  },
  components: {
    "menu-list": menuList
  },
 created() {
    this.getRoleList(0, 10);
    this.getMenuList();
   
  },
  methods: {
    addOrEdit(){
        if(this.dialogTitle == "新增"){
            this.$axios({
                method: "post",
                url: '/base/role/createRole',
                params: {
                    name:this.roleName,
                    remark:this.roleDesc
                }
            }).then(res => {
                this.getRoleList(0,10);
                this.$message.success('创建角色成功');
                this.centerDialogVisible = false;
            }).catch(error => {
                this.$message.error(error.response.data.message);
                this.centerDialogVisible = false;
            })
        }else{
            this.$axios({
                method: "post",
                url: '/base/role/updateRole',
                data: {
                    roleId:this.editRoleId,
                    roleName:this.roleName,
                    roleRemark:this.roleDesc
                }
            }).then(res => {
                this.getRoleList(0,10);
                this.$message.success('修改角色成功');
                this.centerDialogVisible = false;
            }).catch(error => {
                this.$message.error('修改角色失败');
                this.centerDialogVisible = false;
            })
        }
    },
      xxx(data){
        //   console.log( data, '123' )
      },
    add() {
      this.centerDialogVisible=true;
      this.dialogTitle = "新增";
      this.roleName = "";
      this.roleDesc = "";
    },
    editItem(o){
        this.centerDialogVisible = true;
        this.roleName = o.row.name;
        this.roleDesc = o.row.desc;
        this.dialogTitle = "编辑";
        this.editRoleId = o.row.id;
    },
    addRoleCom(){
        let roleMenus = [];
        if(this.tableLists.length > 0){
            this.tableLists.forEach((role,index) => {
                let cns = this.$refs.menuList[index].getCheckedNodes();
                if(cns.length > 0){
                    let pcs = [];
                    cns.forEach(c => {
                        if(c.permissionString){
                            pcs.push(c.permissionString);
                        }
                    })
                    roleMenus.push({
                        roleId:role.id,
                        permissionCodes:pcs
                    })
                }else{
                    if(this.accreditLists.indexOf(role.id)!= -1){
                        roleMenus.push({
                            roleId:role.id,
                            permissionCodes:[]
                        })
                    }
                }
            })
        }
        if(roleMenus.length > 0){
            this.$axios.post(this.url+'/base/role/accreditRole',roleMenus).then(res =>{
                this.$message.success('角色授权成功');
                this.authorDialogVisible = false;
                this.getRoleList(0,10);
            }).catch(error => {
                this.$message.error(this.error.response.message)
            })
        }
        // if(this.levelSelName == ''){
        //     this.$message.warning('角色名称不能为空');
        //       return;
        //   } 
        // let var_this = this;
        // if(this.dialogTitle == "新增"){
        //   const addUrl = this.url + "/role/accreditRole";
        //   this.$axios({
        //         method: "post",
        //         url: addUrl,
        //         params: {
        //             name:var_this.roleName,
        //             remark:var_this.roleDesc,
        //         }
        //     }).then(res => {
        //      var_this.getRoleList(0,10);
        //   })
        // .catch(error => {
        //     console.log(error);
        // });
        //   }else{
        //   const editUrl = this.url + "/base/role/updateRole";
        //     this.$axios({
        //         method: "post",
        //         url: editUrl,
        //         data: {
        //             roleID:var_this.editRoleId,
        //             roleName:var_this.roleName,
        //             roleRemark:var_this.roleDesc,
        //         }
        //     }).then(res => {
        //      var_this.getRoleList(0,10);
        //   })
          
        // .catch(error => {
        //     console.log(error);
        // });
        //   }

        // this.centerDialogVisible = false;
        // // this.clearSelection();
        // // this.editLevelId = '';
    },
    getRoleList(page, size) {
      const url = this.url+"/base/role/getRoleList/" + page + "/" + size;
      this.$axios({
        method: "post",
        url: url,
        data: {}
      })
        .then(res => {
         // this.canNotSearch = false;
          this.tableLists = [];
          this.allCount = res.data.totalElements;
          this.pageCount = res.data.totalPages;
          res.data.content.forEach((dl, index) => {
               let temp = {
                   id:dl.roleId,
                   name : dl.roleName,
                   desc : dl.roleRemark,
                   author : dl.accredit == 0?"未授权":"已授权",
                   status : dl.siz>0?'已使用':'未使用'
               }
               this.accreditLists.push('');
               if(dl.accredit == 1){this.accreditLists.splice(index,1,dl.roleId);}
               this.tableLists.push(temp);
          });
        })
        .catch(error => {
          //this.canNotSearch = false;
          this.allCount = 0;
          this.$message.error("服务器异常");
        });
    },
    getMenuList() {
        const url = this.url+"/base/role/getMenuList";
        this.$axios({
            method: "get",
            url: url,
            data: {}
         })
        .then(res => {
            this.menu = [];
            // res.data.forEach((dl, index) => {
            //     let level2TempArray = [];
            //     let level1Temp = {
            //         label:dl.directoryName,
            //         id:dl.directoryId
            //     }
            //    dl.menuEntiy&&( dl.menuEntiy.forEach((dl2, index) => {
            //         let level3TempArray = [];
            //         let level2Temp = {
            //              label:dl2.menuName,
            //              id:dl2.menuId
            //          }
            //          dl2.menuFunctionEntiy &&(
            //              dl2.menuFunctionEntiy.forEach((dl3, index) => {
            //                 let level3Temp = {
            //                     label:dl3.functionName,
            //                     id:dl3.functionId
            //                 }
            //                 level3TempArray.push(level3Temp)
            //             })
            //          )
            //         level2Temp.children = level3TempArray;
            //         level2TempArray.push(level2Temp)
            //     }))
            //     level1Temp.children = level2TempArray
            //     this.menu.push(level1Temp)
            // })
            this.createKey(res.data);
            this.menu = res.data;
            console.log(this.menu);
          })
        .catch(error => {
          //this.canNotSearch = false;
          console.log(error);
        });
    },
    createKey(list){
        if(list.length > 0){
            list.forEach(l => {
                l.key = l.permissionString?l.permissionString:l.name;
                this.createKey(l.children);
            })
        }
    },
    authorRole(){
      this.authorDialogVisible=true;
      if(this.accreditLists.length > 0){
          let als = [];
          this.accreditLists.forEach(al => {
              if(al){
                  als.push(al);
              }
          })
          if(als.length > 0){
            this.$axios.get("/base/role/getFinishApproveMenuLists?roleId="+als.join()).then(res => {
                if(res.data.length > 0){
                    this.accreditLists.forEach((al,index) => {
                        res.data.forEach(r => {
                            if(r.roleId == al){
                                this.$refs.menuList[index].$refs.xyz.setCheckedKeys(r.permissionCodes);
                            }
                        })
                    })
                }
                
            })
          }
         
      }
      
    },
    resetChecked() {
        if(this.$refs.menuList.length > 0){
            this.$refs.menuList.forEach(ml => {
                ml.$refs.xyz.setCheckedKeys([]);
            })
        }
    },
    change() {
      console.log("change");
    },
    reset() {
         this.inputValue = "";
         this.getRoleList(0,10)
    },
    search() {
      //this.canNotSearch = true;
      if (this.inputValue.trim() == "") {
        this.getRoleList(0, 10);
      } else {
        let var_this = this;
        const url = this.url+"/base/role/getRoleList/0/10";
        this.$axios({
          method: "post",
          url: url,
          params: {
            roleName: this.inputValue
          }
        })
          .then(res => {
            var_this.canNotSearch = false;
            var_this.tableLists = [];
            var_this.allCount = res.data.totalElements;
            var_this.pageCount = res.data.totalPages;
            res.data.content.forEach((dl,index) => {
                let temp = {
                    name : dl.roleName,
                    desc : dl.roleRemark,
                    author : dl.accredit == 0?"未授权":"已授权",
                    status : dl.siz>0?'已使用':'未使用'
                }
                
                var_this.tableLists.push(temp);
            });
          })
          .catch(error => {
            var_this.canNotSearch = false;
            var_this.allCount = 0;
            var_this.$message.error("服务器异常");
          });
      }
    },
    // editItem(data) {
    //   console.log("editItem");
    // },
    setAuthority(data){
      console.log( 'setAuthority' )
    },
    removeItem(data) {
        console.log(data)
      let var_this = this;
      this.$confirm("此操作将删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const url = this.url+"/base/role/delectRole/" + data.row.id;
          var_this.$axios
            .get(url)
            .then(res => {
              var_this.$message({
                type: "success",
                message: "删除成功!"
              });
              var_this.getRoleList(this.currentPage - 1, 10);
            })
            .catch(error => {
              var_this.$message.error(error.response.data.message);
            });
        })
        .catch(() => {
          var_this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    currentPageChange(index) {
      this.getRoleList(index - 1,10);
    }
  }
};
</script>
<style lang="scss">
@import "../../common/css/tablePageCommon.scss";
.role-manage {
    .el-table div.el-table__body-wrapper button.el-button{
      line-height: 22px;
    }
   .content{
        margin: 3% 10%;
        .content-body{
            margin-top: 4%;
        }
        .content-title{
            font-size: 16px;
            line-height: 16px;
            font-weight: bold;
            color: #5a5a5a;
            text-align: left;
        }
    }
    .auth-content{
        margin: 3% 5%;
        .auth-content-body{
           margin: 4% 0 0 6%;
  
        }
        .auth-content-title{
            font-size: 16px;
            line-height: 16px;
            font-weight: bold;
            color: #5a5a5a;
            text-align: left;
        }
    }
    .row-bg {
      padding: 10px 0;
    }
    .red{
        color: red;
    }
    .el-dialog{
        border-radius:8px; 
    }
  .input {
    width: 200px;
  }
  .select {
    width: 120px;
  }
}
</style>
