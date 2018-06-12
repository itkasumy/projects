<template>
 <div class="back">
    <el-main class="app-main table-page">
        <h2 class="tp-title">人员管理</h2>
        <div class="equipment-manager">
            <!-- header -->
            <div class="em-header tp-header">
                <!-- header-left -->
                <div class="fl tp-left">
                    <el-button size="small" type="primary" @click="addPerson">+新增重点人员</el-button>
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
                                <el-input size="small" :clearable="true" v-model="inputValue" placeholder="输入姓名/手机号/身份证号" @clear="reset"></el-input>
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
                    id="key-person-table"
                    ref="table"
                    @expand-change="expandRow">
                    <el-table-column
                      type="selection"
                      width="0">
                    </el-table-column>
                    
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <div>
                        <el-table
                    :data="scope.row.tableExpandLists"
                    style="width: 100%;"
                    border
                    >
                    <el-table-column
                    label="头像"
                    align="center"
                    prop="image"
                    >
                    <template slot-scope='scope'>
                    <img :src="scope.row.img" style="width:26px;height:26px;"  onerror="this.src = '../../../static/images/noPhoto.png'">
                    </template>
                    </el-table-column>
                      <el-table-column 
                        v-for="(value, index) in tableExpand" :key="index"
                        :label="value.label"
                        :prop="value.prop"
                        align="center"
                        >
                      </el-table-column>
                      <el-table-column
                    label="操作"
                    align="center"
                    width="200"
                  >
                  
                    <template slot-scope="scope">
                      <el-button type="text" @click="editItem(scope)" class="inbox">编辑</el-button>
                      <el-button type="text" @click="removeItem(scope)" class="inbox" :disabled="scope.row.personSource == 'sits'">删除</el-button>
                    </template>
                  </el-table-column>
                  
                        </el-table>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="头像" prop="img" align="center">
                                        <template slot-scope='scope'>
                                            <img class="preview" :src="scope.row.image" style="width:26px;height:26px;"  onerror="this.src = '../../../static/images/noPhoto.png'">
                                        </template>
                                    </el-table-column>
                  <el-table-column 
                    v-for="(value, index) in tableHeader" :key="index"
                    :label="value.label"
                    :prop="value.prop"
                    align="center"
                    >
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    width="200"
                  >
                  
                    <template slot-scope="scope">
                      <el-button type="text" @click="editPerson(scope)" class="inbox">编辑</el-button>
                      <el-button type="text" @click="changeControl(scope)" class="inbox">{{scope.row.targetFlag==1?'布控':'已布控'}}</el-button>
                      <el-button type="text" @click="removePerson(scope)" class="inbox" :disabled="scope.row.targetFlag != 1">删除</el-button>
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
              <el-dialog title="重点人员布控" :visible.sync="dialogFormVisible">
                <el-container v-show="isDialogVisiable">
                  <el-aside id="my-aside" v-if="isImgVisiable">
                <div class="my-container fl" >
                  <div class="title"></div>
                  <div class="img-edit">
                    <div>
                      <img :src="defaultImg" class="my-img">
                    </div>
                  </div>
                  <div class="si" :key="index"  v-for="(is, index) in imageSrcs" >
                    <img :src="is.url" class="ma">
                  </div>
                </div>
              </el-aside>
              <el-form ref="form" :model="form" class="m-form" v-show="isDialogRightVisiable">
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
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="confirmControl">确 定</el-button>
                </div>
              </el-dialog>
            </div>
        </div>
    </el-main>
 </div>
</template>
<script>
import {imagePreview} from './js/showLargeImg.js'
import { dateFmt } from "../../common/js/utils";
const TABLEHEADER = [
  // { label: "头像", prop: "img" },
  { label: "姓名", prop: "personName" },
  { label: "身份证号", prop: "identityCard" },
  { label: "住址", prop: "personAddr" },
  { label: "备注", prop: "personRemark" }
];
const TABLEEXPAND = [
  // { label: "头像", prop: "img" },
  { label: "代用名", prop: "personAliasName" },
  { label: "性别", prop: "personSex" },
  { label: "类型", prop: "personTypeName" },
  { label: "手机号/MAC地址", prop: "personamac1" },
  { label: "手机号/MAC地址", prop: "personamac2" },
  { label: "手机号/MAC地址", prop: "personamac3" },
  { label: "来源", prop: "personSource" },
  { label: "录入时间", prop: "createTime" }
];
// const areaOptions = ["上海", "北京", "广州", "深圳"];

export default {
  name: "PersonManager",
  data() {
    return {
      tableLists: [], //外层表格数据
      resultCount: "0",
      area: "all",
      inputValue: "",
      tableHeader: TABLEHEADER,
      tableExpand: TABLEEXPAND,
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
      isIndeterminate: false,
      screenWidth: document.body.clientWidth,
      isDialogRightVisiable: true,
      isDialogVisiable: true,
      isInControlSettingPersonId: null,
      isInControlSettingPersonTargetId: null,
      defaultImg: require("../../assets/images/noPhoto.png"),
      imageSrcs: [],
      canNotSearch: false,
      isImgVisiable: true,
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
    imagePreview(){	
	/* CONFIG */
		
		var xOffset = 10;
		var yOffset = 30;

  $("img.preview").hover(function(e){
    console.log('hover')
		this.t = this.title;
		this.title = "";	
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$("body").append("<div id='preview'><img src='"+ this.src +"' alt='Image preview' />"+ c +"</div>");								 
		$("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");						
    },
	function(){
		this.title = this.t;	
		$("#preview").remove();
    });	
	$("img.preview").mousemove(function(e){
		$("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});			
},
expandRow(person,expandRows){
   const url = "/info/person/getPersonDetailListById/" + person.personId;
   const var_this = this;
      this.$axios.get(url).then(res => {
        let dl = res.data;
        this.tableLists[person.expandRow].tableExpandLists = [];
        if (dl.length > 0) {
          dl.forEach(d => {
            if (d.personPhone1 != null && d.personMac1 != null) {
              d.personamac1 = d.personPhone1 + "\n" + d.personMac1;
            }else if(d.personPhone1 != null && d.personMac1 == null){
              d.personamac1 = d.personPhone1;
            }else{
              d.personamac1 = d.personMac1;
            }
            if (d.personPhone2 != null && d.personMac2 != null) {
              d.personamac2 = d.personPhone2 + "\n" + d.personMac2;
            }else if(d.personPhone2 != null && d.personMac2 == null){
              d.personamac2 = d.personPhone2;
            }else{
              d.personamac2 = d.personMac2;
            }
            if (d.personPhone3 != null && d.personMac3 != null) {
              d.personamac3 = d.personPhone3 + "\n" + d.personMac3;
            }else if(d.personPhone3 != null && d.personMac3 == null){
              d.personamac3 = d.personPhone3;
            }else{
              d.personamac3 = d.personMac3;
            }
            d.expandRow = person.expandRow;
            d.personSex =
              d.personSex == "0" ? "未知" : d.personSex == "1" ? "男" : "女";
            d.createTime = dateFmt(d.createTime);
            var_this.$axios.get("/upload/fileAttFiles?uploadId=" + d.uploadId).then(res => {
              if(res.data.length > 0){
                d.img = "/upload/showImg?id="+res.data[0].id;
              }else{
                d.img = require('../../assets/images/noPhoto.png');
              }
              this.tableLists[person.expandRow].tableExpandLists.push(d);
            });
            
          });
         
        }
      });
},
    getPersonControlLevels() {
      const url = "/info/surveillanceLevel/getSurveillanceLevelData";
      this.$axios.get(url).then(res => {
        this.personControlLevels = res.data;
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
             if(ar.areaClipName.length > 7){
              ar.areaClipName = ar.areaClipName.substring(0,7)+"...";
             }
           })
        }
      });
     
    },
    getPersons(page, size,params) {
      const url = "/info/person/getPersonList/" + page + "/" + size;
      let var_this = this;
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(res => {
          
          var_this.canNotSearch = false;
          var_this.tableLists = [];
          var_this.allCount = res.data.totalElements;
          var_this.pageCount = res.data.totalPages;
          res.data.content.forEach((dl, index) => {
            if (dl.personPhoto) {
              dl.image = "/upload/showImg?id=" + dl.personPhoto;
            } else {
              dl.image = require("../../assets/images/noPhoto.png");
            }
            dl.expandRow = index;
            dl.tableExpandLists = [];
            var_this.tableLists.push(dl);
            // var_this.getPersonDetail(dl, index);
          });
        })
        .catch(error => {
          this.canNotSearch = false;
          this.allCount = 0;
          this.$message.error("服务器异常");
        });
       
    },
    getPersonDetail(person, index) {
      const url = "/info/person/getPersonDetailListById/" + person.personId;
      this.$axios.get(url).then(res => {
        let dl = res.data;
        if (dl.length > 0) {
          dl.forEach(d => {
            if (d.personPhone1 != null && d.personMac1 != null) {
              d.personamac1 = d.personPhone1 + "\n" + d.personMac1;
            }else if(d.personPhone1 != null && d.personMac1 == null){
              d.personamac1 = d.personPhone1;
            }else{
              d.personamac1 = d.personMac1;
            }
            if (d.personPhone2 != null && d.personMac2 != null) {
              d.personamac2 = d.personPhone2 + "\n" + d.personMac2;
            }else if(d.personPhone2 != null && d.personMac2 == null){
              d.personamac2 = d.personPhone2;
            }else{
              d.personamac2 = d.personMac2;
            }
            if (d.personPhone3 != null && d.personMac3 != null) {
              d.personamac3 = d.personPhone3 + "\n" + d.personMac3;
            }else if(d.personPhone3 != null && d.personMac3 == null){
              d.personamac3 = d.personPhone3;
            }else{
              d.personamac3 = d.personMac3;
            }
            d.expandRow = index;
            d.img = "/upload/showImg?id=" + person.personPhoto;
            d.personSex =
              d.personSex == "0" ? "未知" : d.personSex == "1" ? "男" : "女";
            d.createTime = dateFmt(d.createTime);
          });
          person.tableExpandLists = dl;
          // person.uploadId = dl[0].uploadId;
        }
        this.tableLists.push(person);
        this.tableLists.sort(function compare(val1,val2){
          return val1.createTime < val2.createTime;
          });
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
    addPerson() {
      this.$router.push("/personManage/keyPerson/personAdd");
    },
    reset() {
      this.refresh();
    },
    search() {
      this.canNotSearch = true;
      if (this.inputValue.trim() == "") {
        this.getPersons(0, 10,{});
      } else {
        this.getPersons(0,10,{queryStr: this.inputValue});
      }
    },
    editItem(data) {
      this.$router.push(
        "/personManage/keyPerson/personEdit/" + data.row.personId
      );
    },
    editPerson(scope) {
      this.$router.push(
        "/personManage/keyPerson/personEdit/" + scope.row.personId
      );
    },
    removeItem(data) {
      let var_this = this;
      this.$confirm("此操作将删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const url = "/info/person/delPersonDetail/" + data.row.personDetailId;

          var_this.$axios
            .get(url)
            .then(res => {
              var_this.$message({
                type: "success",
                message: "删除成功!"
              });
              var_this.tableLists[data.row.expandRow].tableExpandLists.splice(
                data.$index,
                1
              );
              // var_this.$refs.table.toggleRowExpansion(index)
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
              var_this.getPersons(this.currentPage - 1, 10,{});
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
      this.inputValue = "";
      if (this.currentPage != 1) {
        this.currentPage = 1;
      } else {
        this.getPersons(0, 10,{});
      }
    },
    currentPageChange(index) {
      if (this.inputValue.trim() == "") {
        this.getPersons(index-1, 10,{});
      } else {
        this.getPersons(index-1,10,{queryStr: this.inputValue});
      }
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
    getPersonControlMsg(personId) {
      const url = "/target/targetPerson/getTargetPersonByPersonId/" + personId;
      let var_this = this;

      this.$axios.get(url).then(res => {
        var_this.form = {
          level: "",
          time: []
        };
        var_this.checkedAreas = [];
        var_this.isInControlSettingPersonTargetId = null;
        if (res.data.targetKeyFlag != null) {
          var_this.isInControlSettingPersonTargetId = res.data.personTargetId;
          var_this.form = {
            level: res.data.targetLevel,
            time: []
          };
          if (res.data.sysAreaList != null && res.data.sysAreaList.length > 0) {
            res.data.sysAreaList.forEach(sy => {
              var_this.checkedAreas.push(sy.areaGroupId);
            });
          }
          var_this.screenWidth = document.body.clientWidth;
        }
        // var_this.resizeDialogVisable();
        var_this.dialogFormVisible = true;
      });
    },
    changeControl(scope) {
      if (scope.row.targetFlag == "1") {
        this.getPersonControlMsg(scope.row.personId);
        if (scope.row.uploadId) {
          this.isImgVisiable = true;
          this.getImages(scope.row.uploadId);
        } else {
          this.imageSrcs = [];
          this.defaultImg = "";
          this.isImgVisiable = false;
        }
        this.isInControlSettingPersonId = scope.row.personId;
      }
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
      if(this.form.time.length == 0 || !this.form.level || this.checkedAreas.length == 0){
        this.$message.warning('布控信息不完全，请补充！');
        return;
      }
      this.dialogFormVisible = false;
      const url = "/target/targetPerson/createOrUpdateTargetPerson";
      // let tl = this.getControlLevel(this.form.level);
      // this.getControlAreas();
      let var_this = this;
      let params = {
        personTargetId: var_this.isInControlSettingPersonTargetId,
        personId: var_this.isInControlSettingPersonId,
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
@import "./common.scss";
#key-person-table .el-table__body-wrapper > table > tbody > tr > td {
    height: 30px;
    padding: 10px 0;
    font-size: 12px;
    color: #9ca3ac;
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
</style>
