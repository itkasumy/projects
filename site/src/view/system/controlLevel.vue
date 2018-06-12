<template>
    <el-main class="control-level">
        <h2 class="tp-title">布控等级</h2>
        <div>
            <el-col :span="6" v-for="(o, index) in levelData" :key="index" class="el-col-style">
                <el-card v-if="index== levelData.length-1" body-style="height: 175px;border:1px solid #E5EDF6;border-radius:4%;">
                    <div class="text item">
                        <el-button type="text" @click="addLevel">    +新增等级</el-button>
                    </div>
                    </el-card>
                <el-card  v-if="index!=levelData.length-1"   body-style="height: 175px;border:1px solid #E5EDF6;border-radius:4%;">
                    <div class="level-card" @mouseover="enter(o)" @mouseout="leave(o)">
                         <div class="level-card-top">
                            <img src="../../assets/images/edit.png" style="width:20px;height:20px" v-show="o.cardTitle" @click="editItem(o)"/>
                            <img src="../../assets/images/delete.png"  style="margin-left:6px;width:20px;height:20px" v-show="o.cardTitle" @click="deleteItem(o)"/>
                            <!-- <span v-show="o.cardTitle">title</span> -->
                        </div>
                        <div class="level-card-color">
                            <img :src="o.showColor">
                        </div>
                        <div class="level-card-content">
                            {{o.levelName}}
                        </div>
                    </div>
                </el-card>
            </el-col> 
        </div>
        <div>
            <el-dialog
            title=""
            :visible.sync="centerDialogVisible"
            width="40%"
            center>
                <span>
                    <div class="content">
                        <div class="content-title">
                            {{dialogTitle}}等级
                        </div>
                        <div class="content-body">
                            <el-row :gutter="20" class="row-bg">
                                <el-col :span="4"><span><i class="red">*</i>等级名称</span></el-col>
                                <el-col :span="8"><el-input
                                            placeholder="请输入等级名称"
                                            :maxlength="15"
                                            size="small"
                                            v-model="levelSelName"
                                            @change="validateName"
                                            clearable>
                                        </el-input>
                                        <!-- <span class="tip" v-show="true">您输入的名称不合法</span> -->
                                </el-col>
                                <el-col :span="12">
                                        <span class="tip red" v-show="isTipShow">您输入的名称不合法</span>
                                </el-col>
                            </el-row>
                            <el-row :gutter="0" class="row-bg" >
                                <el-col :span="4"><span><i class="red">*</i>等级颜色</span></el-col>
                                <el-col :span="20">
                                    <div :class="selectionColor == 'red'?'colorSS':'colorSelection'" @click="selectColor(0)">
                                           <img src="../../assets/images/red.png" style="width:20px;height:20px;vertical-align:middle;margin-left:10px;">
                                           <span style="line-height:20px;margin-left:4px;font-size:12px;margin-right:14px;">红色</span>
                                    </div>
                                       <div :class="selectionColor == 'orange'?'colorSS':'colorSelection'" @click="selectColor(1)">
                                           <img src="../../assets/images/orange.png" style="width:20px;height:20px;vertical-align:middle;margin-left:10px;">
                                           <span style="line-height:20px;margin-left:4px;font-size:12px;margin-right:14px;">橙色</span>
                                       </div>
                                        <div :class="selectionColor == 'yellow'?'colorSS':'colorSelection'" @click="selectColor(2)">
                                           <img src="../../assets/images/yellow.png" style="width:20px;height:20px;vertical-align:middle;margin-left:10px;">
                                           <span style="line-height:20px;margin-left:4px;font-size:12px;margin-right:14px;">黄色</span>
                                        </div>
                                        <div :class="selectionColor == 'blue'?'colorSS':'colorSelection'" @click="selectColor(3)">
                                           <img src="../../assets/images/blue.png" style="width:20px;height:20px;vertical-align:middle;margin-left:10px;">
                                           <span style="line-height:20px;margin-left:4px;font-size:12px;margin-right:14px;">蓝色</span>
                                        </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </span>
                <span slot="footer" class="dialog-footer">
                     <el-button type="primary" @click="confirm">确 定</el-button>
                    <el-button @click="exit">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </el-main>
</template>
<script>
import { levels } from "./mock/controlLevelMockData.js";
export default {
  name: "DeviceManagerEdit",
  data() {
    return {
      url: "",
      centerDialogVisible: false,
      cardTitle: false,
      levelData: [],
      dialogTitle: "",
      levelSelName: "",
      levelColor: require("../../assets/images/red.png"),
      selectionColor: "",
      editLevelId: "",
      isTipShow: false
    };
  },
  created() {
    this.getLevelData();
  },
  methods: {
    validateName: function() {
      this.isTipShow = !/^[\u4E00-\u9FA5\uF900-\uFA2D\w-.]{0,15}$/.test(
        this.levelSelName
      );
    },
    addLevel: function() {
      this.levelSelName = "";
      this.dialogTitle = "新增";
      this.selectionColor = "";
      this.clearSelection();
      this.centerDialogVisible = true;
    },
    confirm: function() {
      if (this.isTipShow) {
        this.$message.warning("请填写正确的布控名称");
        return;
      }
      if (this.selectionColor == "") {
        this.$message.warning("请选择等级颜色");
        return;
      }
      if (this.levelSelName == "") {
        this.$message.warning("布控等级名称不能为空");
        return;
      }

      let var_this = this;
      if (this.dialogTitle == "新增") {
        const addUrl =
          this.url + "/info/surveillanceLevel/createSurveillanceLevel";
        this.$axios({
          method: "post",
          url: addUrl,
          params: {
            surveillanceLevelName: var_this.levelSelName,
            surveillanceLevelColor: var_this.selectionColor
          }
        })
          .then(res => {
            var_this.getLevelData();
            var_this.$message({
              type: "success",
              message: "新增成功!"
            });
          })
          .catch(error => {
            this.$message.error("新增等级失败," + error.response.data.message);
          });
      } else {
        const editUrl =
          this.url + "/info/surveillanceLevel/updateSurveillanceLevel";
        this.$axios({
          method: "post",
          url: editUrl,
          data: {
            levelId: var_this.editLevelId,
            levelName: var_this.levelSelName,
            levelColor: var_this.selectionColor
          }
        })
          .then(res => {
            var_this.getLevelData();
            var_this.$message({
              type: "success",
              message: "修改成功!"
            });
          })
          .catch(error => {
            this.$message.error("修改等级失败," + error.response.data.message);
          });
      }

      this.centerDialogVisible = false;
      this.clearSelection();
      this.editLevelId = "";
    },
    exit: function() {
      this.centerDialogVisible = false;
      this.editLevelId = "";
      this.clearSelection();
    },
    enter: function(o) {
      o.cardTitle = true;
    },
    leave: function(o) {
      o.cardTitle = false;
    },
    getLevelData() {
      this.levelData = [];
      const getUrl =
        this.url + "/info/surveillanceLevel/getSurveillanceLevelData";
      this.$axios.get(getUrl).then(res => {
        res.data.forEach(item => {
          item && (item.cardTitle = false);
          item.showColor = require("../../assets/images/" +
            item.levelColor +
            ".png");
          this.levelData.push(item);
        });
        this.levelData.push({});
      });
    },
    selectColor(index) {
      this.selectionColor =
        index == 0
          ? "red"
          : index == 1 ? "orange" : index == 2 ? "yellow" : "blue";
      /* let colorSelections = document.getElementsByClassName('colorSelection');
            console.log(index,colorSelections);
            if(colorSelections.length > 0){
                
                for(let i = 0;i<colorSelections.length;i++){
                    if(i == index){
                       colorSelections[i].style.cssText = " -webkit-box-shadow:0 10px 16px 0 rgba(0,0,0,.1);box-shadow:0 10px 16px 0 rgba(0,0,0,.1);border: 1px solid #E5EDF6;border-radius:10px;";
                    }else{
                       colorSelections[i].style.cssText = " -webkit-box-shadow:0 0 0 0 rgba(0,0,0,.1);box-shadow:0 0 0 0 rgba(0,0,0,.1);border: 0px solid #E5EDF6;border-radius:10px;";
                    }
                }
            } */
    },
    clearSelection() {
      let colorSelections = document.getElementsByClassName("colorSelection");
      if (colorSelections.length > 0) {
        for (let i = 0; i < colorSelections.length; i++) {
          colorSelections[i].style.cssText = "";
        }
      }
    },
    editItem(o) {
      this.centerDialogVisible = true;
      this.levelSelName = o.levelName;
      this.dialogTitle = "编辑";
      // this.clearSelection();
      let color = o.levelColor;
      this.selectColor(
        color == "red" ? 0 : color == "orange" ? 1 : color == "yellow" ? 2 : 3
      );
      this.editLevelId = o.levelId;
    },
    deleteItem(o) {
      this.$confirm("此操作将删除该布控等级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const delUrl =
            this.url +
            "/info/surveillanceLevel/deleteSurveillanceLevel?levelId=" +
            o.levelId;
          this.$axios
            .get(delUrl)
            .then(res => {
              this.getLevelData();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(error => {
              this.$message.error(
                "删除等级失败," + error.response.data.message
              );
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss">
.colorSelection {
  display: inline;
  border-radius: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  // background-color:#00cccc;
}
.colorSS {
  display: inline;
  border-radius: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  -webkit-box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e5edf6;
  border-radius: 10px;
}
// .colorSelection:hover{
//     -webkit-box-shadow:0 10px 16px 0 rgba(0,0,0,.1);
//     box-shadow:0 10px 16px 0 rgba(0,0,0,.1);
//     border: 1px solid #E5EDF6;
//     border-radius:10px;
// }
.control-level {
  .content {
    margin: 3% 10%;
    .content-body {
      margin-top: 4%;
    }
    .content-title {
      font-size: 16px;
      line-height: 16px;
      font-weight: bold;
      color: #5a5a5a;
      text-align: left;
    }
  }
  .level-card {
    text-align: center;

    .level-card-color {
      margin-left: 40%;
      // margin: 0% 40%;
      // border-radius:50%;
      -webkit-border-radius: 50%;
      height: 50px;
      width: 50px;
      // background-color:red;
      margin-top: 10px;
    }
    .level-card-top {
      margin-left: 80%;
      height: 20px;
      position: relative;
    }
    .level-card-content {
      margin-top: 11%;
      font-size: 16px;
      text-align: center;
      width: auto;
    }
  }
  .tp-title {
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
    color: #5a5a5a;
    text-align: left;
  }
  .all-line {
    padding: 25px 5% 0px 5%;
    .tip {
      left: inherit;
      position: absolute;
      right: -170px;
      text-align: left;
      top: 5px;
      width: 150px;
    }
  }
  .red {
    color: red;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .row-bg {
    padding: 10px 0;
  }

  .box-card {
    width: 300px;
    height: 175px;
  }
  .el-dialog {
    border-radius: 8px;
  }
  .el-col-style {
    margin-top: 3%;
    padding-left: 30px;
    padding-right: 30px;
    .el-card {
      -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
      border: 0px solid #e5edf6;
      border-radius: 4%;
    }
    .el-card:hover {
      -webkit-box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.1);
      border: 0px solid #e5edf6;
      border-radius: 4%;
    }
  }
}
</style>