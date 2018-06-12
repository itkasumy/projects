<template>
 <div class="back">
    <el-main class="app-main table-page">
        <h2 class="tp-title">警员管理</h2>
        <div class="equipment-manager">
            <!-- header -->
            <div class="em-header tp-header">
                <!-- header-left -->
                <div class="fl tp-left">
                    <el-button size="small" type="primary" @click="addPolice">+新增警员</el-button>
                </div>
                <!-- header-right -->
                <div class="fr tp-right">
                    <div class="fl search-result tp-result">
                        <span>共</span><span class="tp-result-count">{{allCount}}</span><span>条记录</span>
                        <el-button size="small" type="text" @click="reset" class="blue record">重置</el-button>
                    </div>
                    <div class="fr search-condition tp-input-group">
                        <ul>
                            <li class="w200">
                                <el-input size="small" :clearable="true" v-model="inputValue" placeholder="输入警员姓名或警号"></el-input>
                            </li>
                            <li class="btn-search">
                                <el-button size="small" type="primary" @click="search" :disabled="canNotSearch">搜索</el-button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <!-- 外层表格数据 -->
                <el-table
                    :data="tableLists"
                    style="width: 100%;"
                    border
                    id="police-manage-table"
                    ref="table"
                    >
                  <el-table-column 
                    v-for="(value, index) in tableHeader" :key="index"
                    :label="value.label"
                    :prop="value.prop"
                    align="center"
                    :width="value.width">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-button type="text" @click="editPolice(scope)" class="inbox">编辑</el-button>
                      <el-button type="text" @click="bind(scope)" class="inbox">{{scope.row.device == null?'执行任务':'解除任务'}}</el-button>
                      <el-button type="text" @click="removePolice(scope)" class="inbox" :disabled="scope.row.device!=null">删除</el-button>
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

            <div class="em-dialog">
              <el-dialog :title="isAdd?'警员新增':'修改警员信息'" :visible.sync="dialogFormVisible" width="30%">
                <el-container v-show="isDialogVisiable">
              <el-form ref="form" :model="form" class="m-form" v-show="isDialogRightVisiable">
                <el-form-item>
                    <el-col>
                      <span class="red">*</span><span>警员警号</span>
                      <el-input size="small" :clearable="true" v-model="policeNo" placeholder="输入警员警号" style="width:300px;"></el-input>
                    </el-col>
                </el-form-item>
               <el-form-item>
                    <el-col>
                      <span class="red">*</span><span>警员名称</span>
                      <el-input size="small" :clearable="true" v-model="policeName" placeholder="输入警员姓名" style="width:300px;" maxlength="10"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                  <span class="red">*</span><span>警员级别</span>
                    <el-select v-model="policeLevel" placeholder="请选择警员级别" size="small"  style="width:300px;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                </el-form>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="confirmControl">确 定</el-button>
                </div>
              </el-dialog>
            </div>
             <div class="em-dialog">
              <el-dialog title="头盔绑定" :visible.sync="dialogForm2Visible" width="30%">
                <el-container>
              <el-form ref="form" :model="form" class="m-form" v-show="isDialogRightVisiable">
                <el-form-item>
                  <span class="red">*</span><span>智能头盔</span>
                    <el-select v-model="helmetId" placeholder="请选择头盔进行绑定操作" size="small"  style="width:300px;">
                    <el-option
                      v-for="item in helmetOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                </el-form>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="confirmBind">确 定</el-button>
                  <el-button @click="dialogForm2Visible = false">取 消</el-button>
                </div>
              </el-dialog>
            </div>
        </div>
    </el-main>
 </div>
</template>
<script>
import { dateFmt } from "../../common/js/utils";
const TABLEHEADER = [
  { label: "警员名称", prop: "policeName" },
  { label: "警员警号", prop: "policeNo" },
  { label: "警员等级", prop: "policeLevel" },
  { label: "头盔名称", prop: "device.deviceName" }
];

export default {
  name: "PoliceManager",
  data() {
    return {
      resultCount: "0",
      area: "all",
      inputValue: "",
      tableHeader: TABLEHEADER,
      tableLists: [],
      tableExpandLists: [],
      allCount: 0,
      pageCount: 0,
      currentPage: 1,
      dialogFormVisible: false,
      form: {
        level: "",
        time: []
      },
      formLabelWidth: "120px",
      labelPosition: "left",
      checkAll: false,
      areas: [],
      personControlLevels: [],
      checkedAreas: [],
      areaIds: [],
      checkedAreaIds: [],
      isIndeterminate: true,
      screenWidth: document.body.clientWidth,
      isDialogRightVisiable: true,
      isDialogVisiable: true,
      dialogForm2Visible: false,
      canNotSearch: false,
      options: [
        {
          value: "警员级别一级",
          label: "警员级别一级"
        },
        {
          value: "警员级别二级",
          label: "警员级别二级"
        },
        {
          value: "警员级别三级",
          label: "警员级别三级"
        },
        {
          value: "警员级别四级",
          label: "警员级别四级"
        },
        {
          value: "警员级别五级",
          label: "警员级别五级"
        }
      ],
      helmetOptions: [
        {
          value: "头盔1",
          label: "头盔1"
        },
        {
          value: "头盔2",
          label: "头盔2"
        },
        {
          value: "头盔3",
          label: "头盔3"
        },
        {
          value: "头盔4",
          label: "头盔4"
        },
        {
          value: "头盔5",
          label: "头盔5"
        }
      ],
      helmetId: "",
      policeLevel: "",
      policeNo: "",
      policeName: "",
      isAdd: true,
      editPoliceId: ""
    };
  },
  computed: {},
  watch: {
    screenWidth(val) {
      this.screenWidth = val;
      this.resizeDialogVisable();
    }
  },
  created() {
    this.getPersons(0, 10);
    // this.getHelmets();
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    confirmBind() {
      const url = "/info/police/addPoliceDevice";
      this.$axios
        .post(url, { policeId: this.editPoliceId, deviceId: this.helmetId })
        .then(res => {
          this.$message.success("绑定头盔成功");
          this.refresh();
        })
        .catch(error => {
          this.$message.error("绑定头盔失败");
        });
      this.dialogForm2Visible = false;
    },
    getHelmets() {
      const url = "/info/police/getAllDevice";
      this.$axios
        .post(url, {})
        .then(res => {
          this.helmetOptions = [];
          if (res.data.length > 0) {
            res.data.forEach(hm => {
              this.helmetOptions.push({
                label: hm.deviceName,
                value: hm.id
              });
            });
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message);
        });
    },
    bind(scope) {
      if (scope.row.device == null) {
        const url = "/info/police/getAllDevice";
        this.$axios
          .post(url, {})
          .then(res => {
            this.helmetOptions = [];
            if (res.data.length > 0) {
              res.data.forEach(hm => {
                this.helmetOptions.push({
                  label: hm.deviceName,
                  value: hm.id
                });
              });
              this.dialogForm2Visible = true;
              this.editPoliceId = scope.row.policeId;
            } else {
              this.$message.error(error.response.data.message);
            }
          })
          .catch(error => {
            this.$message.error(error.response.data.message);
          });
      } else {
        const url = "/info/police/deletePoliceDevice";
        this.$axios.post(url,{
          policeId:scope.row.policeId,
          deviceId:scope.row.device.id
        }).then(res => {
          this.$message.success('解绑头盔成功');
          this.refresh();
        }).catch(error => {
          this.$message.error(error.response.data.message);
        })
      }
    },
    addPolice() {
      this.policeNo = "";
      this.policeName = "";
      this.policeLevel = "";
      this.isAdd = true;
      this.dialogFormVisible = true;
    },
    getPersons(page, size) {
      const url = "/info/police/getPolicePage/" + page + "/" + size;
      this.$axios({
        method: "get",
        url: url
      })
        .then(res => {
          this.canNotSearch = false;
          this.tableLists = res.data.content;
          this.allCount = res.data.totalElements;
          this.pageCount = res.data.totalPages;
        })
        .catch(error => {
          this.canNotSearch = false;
          this.allCount = 0;
          this.$message.error("服务器异常");
        });
    },
    handleCheckAllChange(val) {
      this.checkedAreas = [];
      if (val) {
        this.areas.forEach(ar => {
          this.checkedAreas.push(ar.areaId);
        });
      }
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.areas.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.areas.length;
    },
    reset() {
      this.inputValue = "";
    },
    search() {
      this.canNotSearch = true;
      if (this.inputValue.trim() == "") {
        this.getPersons(0, 10);
      } else {
        this.tableLists = [];
        let var_this = this;
        const url = "/info/police/getPolicePage/0/10";
        this.$axios({
          method: "get",
          url: url,
          params: {
            condition: this.inputValue
          }
        })
          .then(res => {
            var_this.canNotSearch = false;
            var_this.tableLists = res.data.content;
            var_this.allCount = res.data.totalElements;
            var_this.pageCount = res.data.totalPages;
          })
          .catch(error => {
            var_this.canNotSearch = false;
            var_this.allCount = 0;
            var_this.$message.error("服务器异常");
          });
      }
    },
    editPolice(data) {
      this.dialogFormVisible = true;
      this.isAdd = false;
      this.editPoliceId = data.row.policeId;
      this.policeNo = data.row.policeNo;
      this.policeName = data.row.policeName;
      this.policeLevel = data.row.policeLevel;
    },
    removePolice(data) {
      let var_this = this;
      this.$confirm("此操作将删除该警员记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const url = "/info/police/delPolice/" + data.row.policeId;

          var_this.$axios
            .get(url)
            .then(res => {
              var_this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.refresh();
            })
            .catch(error => {
              this.$message.error(error.response.data.message);
            });
        })
        .catch(() => {
          var_this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    removePerson(data) {
      let var_this = this;
      this.$confirm("此操作将删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const url = "/info/person/delPerson/" + data.row.personId;
          var_this.$axios
            .get(url)
            .then(res => {
              var_this.$message({
                type: "success",
                message: "删除成功!"
              });
              var_this.getPersons(this.currentPage - 1, 10);
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
    refresh() {
      if (this.currentPage != 1) {
        this.currentPage = 1;
      } else {
        this.getPersons(0, 10);
      }
    },
    currentPageChange(index) {
      this.getPersons(index - 1, 10);
    },
    resizeDialogVisable() {
      if (this.screenWidth >= 1610) {
        this.isDialogRightVisiable = true;
        this.isDialogVisiable = true;
      } else if (this.screenWidth >= 700 && this.screenWidth < 1610) {
        this.isDialogRightVisiable = false;
        this.isDialogVisiable = true;
      } else {
        this.isDialogVisiable = false;
      }
    },
    carControl() {
      this.screenWidth = document.body.clientWidth;
      this.resizeDialogVisable();
      this.dialogFormVisible = true;
    },
    confirmControl() {
      if (this.isAdd) {
        /* if(this.form.time.length == 0 || !this.form.level || this.checkedAreas.length == 0){
                this.$message.warning('布控信息不完全，请补充！');
                return;
              } */
        this.dialogFormVisible = false;
        const url = "/info/police/createPolice";
        let var_this = this;
        let params = {
          policeNo: this.policeNo,
          policeName: this.policeName,
          policeLevel: this.policeLevel
        };
        this.$axios({
          method: "post",
          url: url,
          data: params
        }).then(res => {
          this.$message.success("警员新增成功");
          this.refresh();
        });
      } else {
        /* if(this.form.time.length == 0 || !this.form.level || this.checkedAreas.length == 0){
                this.$message.warning('布控信息不完全，请补充！');
                return;
              } */
        this.dialogFormVisible = false;
        const url = "/info/police/updatePolice";
        let var_this = this;
        let params = {
          policeId: this.editPoliceId,
          policeNo: this.policeNo,
          policeName: this.policeName,
          policeLevel: this.policeLevel
        };
        this.$axios({
          method: "post",
          url: url,
          data: params
        }).then(res => {
          this.$message.success("修改警员信息成功");
          this.refresh();
        });
      }
    },
    getControlLevel(levelName) {
      let levelId = "1";
      this.personControlLevels.forEach(pcl => {
        if (pcl.levelName == levelName) {
          levelId = pcl.levelId;
        }
      });
      return levelId;
    }
  }
};
</script>
<style lang="scss">
@import "../../common/css/tablePageCommon.scss";
.my-container {
  margin: 30px 0 0 30px;
  text-align: start;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .img-edit {
    display: flex;
    .my-img {
      width: 100%;
      position: relative;
    }

    .b-edit {
      display: inline-block;
      .my-bt {
        display: block;
        margin: 0;
      }
    }
  }
  .si {
    display: inline;
    text-align: center;
    .ma {
      padding: 1%;
      width: 18%;
      margin: auto;
    }
  }
  .img-container {
    display: flex;
    flex-direction: row;
    .small-img {
      text-align: center;
      .sma {
        width: 90%;
        max-width: 60px;
        max-height: 50px;
      }
      .close-icon {
        position: absolute;
      }
    }
  }
}
#my-main {
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  padding-top: 80px;
}
#preview {
  position: absolute;
  border: 1px solid #ccc;
  background: #333;
  padding: 5px;
  display: none;
  color: #fff;
}
.el-radio.is-bordered.myEdit {
  border: 1px solid transparent;
  padding: 8px 15px 0 0;
}

.m-form {
  text-align: start;
  margin-top: 30px;
  .el-form-item__content {
    margin-left: 30px;
  }
  .el-checkbox-group {
    margin-left: 46px;
  }
}
.my-ec {
  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0;
  }
  .ec {
    width: 140px;
    border: transparent;
  }
}
.red {
  color: red;
}
#police-manage-table .el-table__body-wrapper > table > tbody > tr > td {
    height: 30px;
    padding: 17px 0;
    font-size: 12px;
    color: #9ca3ac;
  }
</style>
