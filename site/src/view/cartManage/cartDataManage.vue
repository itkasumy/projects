<template>
 <div class="back">
    <el-main class="app-main table-page">
        <h2 class="tp-title">车辆数据管理</h2>
        <div class="equipment-manager">
            <!-- header -->
            <div class="em-header tp-header">
                <!-- header-left -->
                <div class="fl tp-left">
                    <el-button size="small" type="primary" @click="carControl">布控车辆</el-button>
                </div>
                <!-- header-right -->
                <div class="fr tp-right">
                    <div class="fl search-result tp-result">
                        <span>共</span><span class="tp-result-count">{{allCount}}</span><span>条记录</span>
                        <el-button size="small" type="text" @click="reset" class="blue record">重置</el-button>
                    </div>
                    <div class="fr search-condition tp-input-group">
                        <ul>
                          <li>
                                    <!-- 时间选择 -->
                                    <el-date-picker style="width:350px;" v-model="controlDate" type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small">
                                    </el-date-picker>
                                </li>
                            <li class="w200">
                                <el-input size="small" :clearable="true" v-model="inputValue" placeholder="输入车牌号码"></el-input>
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
                    id="cart-manage-table"
                    ref="table"
                    >
                  <el-table-column 
                    v-for="(value, index) in tableHeader" :key="index"
                    :label="value.label"
                    :prop="value.prop"
                    align="center"
                    :width="value.width">
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
              <el-dialog title="车辆布控" :visible.sync="dialogFormVisible" width="40%">
                <el-container v-show="isDialogVisiable">
              <el-form ref="form" :model="form" class="m-form" v-show="isDialogRightVisiable">
                <el-form-item>
                    <el-col>
                      <span class="red">*</span><span>布控车牌号</span>
                      <el-input size="small" :clearable="true" v-model="controlPlateNumber" placeholder="输入车牌号码" style="width:84%;"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col>
                      <span class="red">*</span><span>布控时间</span>
                      <el-date-picker  v-model="form.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                  <span class="red">*</span><span>布控等级</span>
                    <el-radio-group v-model="form.level" size="small">
                        <el-radio :key="index"  v-for="(pcl, index) in personControlLevels" :label="pcl.levelId" border class="myEdit">{{pcl.levelName}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <span class="red">*</span><span>布控区域组</span>
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                  <el-checkbox-group v-model="checkedAreas" @change="handleCheckedCitiesChange" class="my-ec">
                    <el-checkbox v-for="area in areas" :label="area.areaGroupId" :key="area.areaGroupId" class="ec" size="small" border>{{area.areaClipName}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                </el-form>
                </el-container>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="confirmControl">确 定</el-button>
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
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
  { label: "车牌号", prop: "plateNo",width:'220' },
  { label: "采集时间", prop: "traceTime",width:'260' },
  { label: "采集地点", prop: "traceAddress" }
];


export default {
  name: "PersonManager",
  data() {
    return {
      
      tableLists: [], //外层表格数据
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
      isInControlSettingPersonId: null,
      isInControlSettingPersonTargetId: null,
      defaultImg: require("../../assets/images/noPhoto.png"),
      imageSrcs: [],
      canNotSearch: false,
      isImgVisiable: true,
      controlDate:'', 
      controlPlateNumber:''
    };
  },
  computed: {},
  watch: {
    screenWidth(val) {
      this.screenWidth = val;
      // this.resizeDialogVisable();
    }
  },
  ready(){
    this.imagePreview();
  },
  created() {
    this.getPersons(0, 10,{});
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

    getPersonControlLevels() {
      const url = "/info/surveillanceLevel/getSurveillanceLevelData";
      this.$axios.get(url).then(res => {
        this.personControlLevels = res.data;
        console.log('levels',this.personControlLevels);
      }).catch((e) => {console.log( e )})
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
             if(ar.areaClipName.length > 7){
              ar.areaClipName = ar.areaClipName.substring(0,7)+"...";
             }
           })
        }
      }).catch((e) => {console.log( e )})
     
    },
    getPersons(page, size,params) {
      const url = "/trace/carTrace/getCarTraceList/" + page + "/" + size;
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
      .then(res => {
          this.canNotSearch = false;
          this.tableLists = [];
          if(res.data.content.length > 0){
            res.data.content.forEach(car => {
              car.traceTime = dateFmt(car.traceTime);
              this.tableLists.push(car);
            })
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
      this.checkedAreas = [];
      if (val) {
        this.areas.forEach(ar => {
          this.checkedAreas.push(ar.areaGroupId);
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
      this.getPersons(0,10,{
        plateNO:this.inputValue.trim() == ""?null:this.inputValue,
        traceTimeStart :!this.controlDate?null:this.controlDate[0],
        traceTimeEnd :!this.controlDate?null:this.controlDate[1],
      })
      // if (this.inputValue.trim() == "") {
      //   this.getPersons(0, 10);
      // } else {
      //   let var_this = this;
      //   const url = "/trace/carTrace/getCarTraceList/0/10";
      //   this.$axios({
      //     method: "post",
      //     url: url,
      //     data: {
      //       plateNO: this.inputValue
      //     }
      //   })
      //     .then(res => {
      //       var_this.canNotSearch = false;
      //       var_this.tableLists = [];
      //     if(res.data.content.length > 0){
      //       res.data.content.forEach(car => {
      //         car.traceTime = dateFmt(car.traceTime);
      //         var_this.tableLists.push(car);
      //       })
      //     }
      //       var_this.allCount = res.data.totalElements;
      //       var_this.pageCount = res.data.totalPages;
      //     })
      //     .catch(error => {
      //       var_this.canNotSearch = false;
      //       var_this.allCount = 0;
      //       var_this.$message.error("服务器异常");
      //     });
      // }
    },
    refresh() {
      if (this.currentPage != 1) {
        this.currentPage = 1;
      } else {
        this.getPersons(0, 10,{});
      }
    },
    currentPageChange(index) {
      this.getPersons(index - 1, 10,{});
    },
    resizeDialogVisable() {
      // if (this.screenWidth >= 1610) {
      //   this.isDialogRightVisiable = true;
      //   this.isDialogVisiable = true;
      // } else if (this.screenWidth >= 700 && this.screenWidth < 1610) {
      //   this.isDialogRightVisiable = false;
      //   this.isDialogVisiable = true;
      // } else {
      //   this.isDialogVisiable = false;
      // }
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
      }).then(res => {
        this.refresh();
        this.$message.success("车牌号布控成功");
      }).catch(error =>{
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
.my-container{
	margin:30px 0  0 30px;
  text-align: start;
	.title{
		font-size:18px;
		font-weight:bold;
		margin-bottom: 30px;
	}
	.img-edit{
		display: flex;
		.my-img{
			width:100%;
			position: relative;
		}
		
		.b-edit{
			display: inline-block;
			.my-bt{
				display: block;
				margin: 0;
			}
		}
	}
	.si{
		display: inline;
		text-align: center;
		.ma{
			padding: 1%;
			width: 18%;
			margin: auto;
		}
	}
	.img-container{
		display: flex;
		flex-direction: row;
		.small-img{
			text-align: center;
			.sma{
				width: 90%;
				max-width: 60px;
				max-height: 50px;
			}
			.close-icon{
		position: absolute;
		
	}
		}
	}
	
}
#my-main{
	background-color: white;
	margin-left: auto;
	margin-right:auto;
	padding-top: 80px;
}
#preview{position:absolute;border:1px solid #ccc;background:#333;padding:5px;display:none;color:#fff;}
.el-radio.is-bordered.myEdit{
  border: 1px solid transparent;
  padding: 8px 15px 0 0;
}

.m-form {
  text-align: start;
  margin-top: 30px;
  .el-form-item__content{
    margin-left: 30px;
  }
  .el-checkbox-group{
    margin-left: 46px;
  }
}
.my-ec {
  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }
  .el-checkbox.is-bordered+.el-checkbox.is-bordered{
    margin-left: 0;
  }
  .ec {
    width: 140px;
    border: transparent;
  }
  
}
.red{
  color: red;
}
#cart-manage-table .el-table__body-wrapper > table > tbody > tr > td {
    height: 30px;
    padding: 18px 0;
    font-size: 12px;
    color: #9ca3ac;
  }
</style>
