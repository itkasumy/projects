<template>
 <div class="back">
    <el-main class="app-main table-page">
        <h2 class="tp-title">车辆布控</h2>
        <div class="equipment-manager">
           <div class="em-header tp-header">
                    <div class="fl tp-left" >
                        <el-button size="small" type="primary" @click="cancelControl(multipleSelection)">撤销布控</el-button>
                    </div>
                    <div class="fr tp-right">
                        <div class="fl search-result tp-result">
                            <span>共搜索到
                                <span class="tp-result-count">{{allCount}}</span>条记录</span>
                            <el-button size="small" type="text" @click="reset" style="padding-left:0;">重置</el-button>
                        </div>
                        <div class="fr search-condition tp-input-group">
                            <ul>
                                <li>
                                    布控时间：
                                    <el-date-picker style="width:350px;" v-model="timeVal" type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small">
                                    </el-date-picker>
                                </li>
                                <li>
                                    <el-select size="small" style="width:140px;" v-model="targetLevel" placeholder="布控等级" :clearable="true">
                                        <el-option v-for="item in personControlLevels" :key="item.levelId" :value="item.levelId" :label="item.levelName"></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <el-select size="small" style="width:140px;" v-model="areaGroupName" placeholder="布控区域组" :clearable="true">
                                        <el-option  v-for="area in areas" :label="area.areaGroupName" :value="area.areaGroupId" :key="area.areaGroupId">{{area.areaClipName}}</el-option>
                                    </el-select>
                                </li>
                                <li class="w150">
                                    <el-input size="small" v-model="inputValue" style="width:120px;" placeholder="输入车牌号"></el-input>
                                </li>
                                <li class="btn-search">
                                    <el-button size="small" type="primary" @click="search">搜索</el-button>
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
                    id="cart-control-table"
                    ref="table"
                    @selection-change="handleSelectionChange">
                  <el-table-column label="选择" prop="personId" align="center" type="selection">
                        </el-table-column>
                        <el-table-column label="车牌号" prop="plateNo" align="center">
                        </el-table-column>
                        <el-table-column label="布控时间" prop="targetTime" align="center">
                        </el-table-column>
                        <el-table-column label="布控区域组" prop="areaGroupNameList" align="center">
                        </el-table-column>
                        <el-table-column label="布控等级" prop="targetLevelName"  align="center">
                        </el-table-column>
                        <el-table-column label="操作" prop="personId" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="removeControl(scope.row)">撤销布控</el-button>
                            </template>
                        </el-table-column>
                </el-table>
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
        </div>
    </el-main>
 </div>
</template>
<script>
import { dateFmt } from "../../common/js/utils";
const TABLEHEADER = [
  { label: "车牌号", prop: "plateNO", width: "220" },
  { label: "采集时间", prop: "traceTime", width: "260" },
  { label: "采集地点", prop: "traceAddress" }
];

export default {
  name: "PersonManager",
  data() {
    return {
      areaGroupName: "",
      timeVal: "",
      targetLevel: "",
      areaName: "",
      rank: [],
      inputValue: "",
      tableLists: [], //外层表格数据
      resultCount: "0",
      area: "all",
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
      isInControlSettingPersonId: null,
      isInControlSettingPersonTargetId: null,
      defaultImg: require("../../assets/images/noPhoto.png"),
      imageSrcs: [],
      canNotSearch: false,
      isImgVisiable: true,
      controlDate: [dateFmt(+new Date() - 86400 * 1000), dateFmt(+new Date())],
      controlPlateNumber: "",
      multipleSelection: []
    };
  },
  computed: {},
  watch: {
    screenWidth(val) {
      this.screenWidth = val;
      this.resizeDialogVisable();
    }
  },
  ready() {
    this.imagePreview();
  },
  created() {
    this.getPersons(0, 10, {});
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    this.getPersonControlLevels();
    this.getPersonControlAreas();
  },
  methods: {
    controlTimeChange() {
      if (this.timeVal == null) {
        this.getPersons(0, 10, {});
      } else {
        this.getPersons(0, 10, {
          targetStartTime: this.timeVal[0],
          targetEndTime: this.timeVal[1]
        });
      }
    },
    cancelControl(selections) {
      if (selections.length == 0) {
        this.$message.warning("请至少选择一条车牌记录进行布控");
        return;
      } else {
        this.$confirm("此操作将删除多条车辆布控记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let sels = [];
          selections.forEach(se => {
            sels.push(se.carTargetId);
          });
          const url = "/target/targetCar/cancelTargetCarBatch";
          this.$axios.post(url, sels).then(res => {
            this.$message.success("车辆撤销布控成功");
            this.refresh();
          });
        });
      }
    },
    removeControl(data) {
      this.$confirm("此操作将删除该车辆布控记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const url = "/target/targetCar/cancelTargetCar/" + data.carTargetId;
        this.$axios.get(url).then(res => {
          this.$message.success("车辆撤销布控成功");
          this.refresh();
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    targetLevelChange() {
      if (this.targetLevel) {
        this.getPersons(0, 10, { targetLevel: this.targetLevel });
      } else {
        this.getPersons(0, 10, {});
      }
    },
    areaNameQuery() {},
    getPersonControlLevels() {
      const url = "/info/surveillanceLevel/getSurveillanceLevelData";
      this.$axios.get(url).then(res => {
        this.personControlLevels = res.data;
        console.log("levels", this.personControlLevels);
      });
    },
    getPersonControlAreas() {
      const url = "/info/areagroup/getAllGroup";
      let var_this = this;
      this.$axios.get(url).then(res => {
        if (res.data.length > 0) {
          res.data.forEach(ar => {
            var_this.areas.push(ar);
            var_this.areaIds.push(ar.areaGroupId);
          });
          var_this.areas.forEach(ar => {
            ar.areaClipName = ar.areaGroupName;
            if (ar.areaClipName.length > 7) {
              ar.areaClipName = ar.areaClipName.substring(0, 7) + "...";
            }
          });
        }
      });
    },
    getPersons(page, size, params) {
      const url = "/target/targetCar/getTargetCarListPage/" + page + "/" + size;
      // const url = "http://10.12.26.181:8084/target/targetCar/getTargetCarListPage/" + page + "/" + size;
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(res => {
          this.canNotSearch = false;
          this.tableLists = [];
          if (res.data.content.length > 0) {
            res.data.content.forEach(car => {
              car.targetTime =
                dateFmt(car.targetStartTime) +
                " 至 " +
                dateFmt(car.targetEndTime);

              if (car.areaGroupList.length > 0) {
                car.areaGroupList.forEach((gl, index) => {
                  if (index == 0) {
                    car.areaGroupNameList = "";
                  }
                  if (index < car.areaGroupList.length - 1) {
                    car.areaGroupNameList =
                      car.areaGroupNameList + gl.areaGroupName + " | ";
                  } else {
                    car.areaGroupNameList =
                      car.areaGroupNameList + gl.areaGroupName;
                  }
                });
              }
              this.tableLists.push(car);
            });
          }

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
      if(val){
        this.getPersons(0,10,{areaGroupId:val});
      }else{
        this.getPersons(0,10,{});
      }
    },
    reset() {
      this.inputValue = "";
    },
    search() {
      console.log(this.inputValue,this.timeVal,this.targetLevel,this.areaGroupName);
      this.canNotSearch = true;
      this.getPersons(0,10,{
        plateNo:this.inputValue.trim() == ""?null:this.inputValue,
        targetStartTime:!this.timeVal?null:this.timeVal[0],
        targetEndTime:!this.timeVal?null:this.timeVal[1],
        targetLevel:!this.targetLevel?null:this.targetLevel,
        areaGroupId:!this.areaGroupName?null:this.areaGroupName
      })
    },
    refresh() {
      if (this.currentPage != 1) {
        this.currentPage = 1;
      } else {
        this.getPersons(0, 10, {});
      }
    },
    currentPageChange(index) {
      this.getPersons(index - 1, 10, {});
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
    getImages(uploadId) {
      this.imageSrcs = [];
      const url = "/upload/fileAttFiles?uploadId=" + uploadId;
      this.$axios.get(url).then(res => {
        if (res.data.length > 0) {
          res.data.forEach(img => {
            let url = "/upload/showImg?id=" + img.id;
            let img1 = {
              name: name,
              url: url,
              status: "finished"
            };
            this.imageSrcs.push(img1);
          });
          this.defaultImg = this.imageSrcs[this.imageSrcs.length - 1].url;
        }
      });
    },
    confirmControl() {
      // if(this.form.time.length == 0 || !this.form.level || this.checkedAreas.length == 0){
      //   this.$message.warning('布控信息不完全，请补充！');
      //   return;
      // }
      this.dialogFormVisible = false;
      const url = "/target/targetCar/createOrUpdateTargetCar";
      // const url = "http://10.12.26.181:8084/target/targetCar/createOrUpdateTargetCar";
      let var_this = this;
      let params = {
        plateNo: var_this.controlPlateNumber,
        targetLevel: var_this.form.level,
        targetStartTime: var_this.form.time[0],
        targetEndTime: var_this.form.time[1],
        areaGroupIds: var_this.checkedAreas
      };
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(res => {
          this.refresh();
          this.$message.success("车牌号布控成功");
        })
        .catch(error => {
          this.$message.error(error.response.data.message);
        });
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
#cart-control-table .el-table__body-wrapper > table > tbody > tr > td {
    height: 30px;
    padding: 17px 0;
    font-size: 12px;
    color: #9ca3ac;
}
</style>
