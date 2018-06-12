<template>
 <div class="back">
    <el-main class="app-main table-page">
        <h2 class="tp-title">行人管理</h2>
        <div class="equipment-manager">
           <div class="em-header tp-header">
                <!-- header-right -->
                <div class="fr tp-right">
                    <div class="fl search-result tp-result">
                        <span>共</span><span class="tp-result-count">{{allCount}}</span><span>条记录</span>
                        <el-button size="small" type="text" @click="reset" class="blue record">重置</el-button>
                    </div>
                    <div class="fr search-condition tp-input-group">
                        <ul>
                            <li class="w200">
                                <el-input size="small" :clearable="true" v-model="inputValue" placeholder="输入uid/MAC地址" @clear="reset"></el-input>
                            </li>
                            <li class="btn-search">
                                <el-button size="small" type="primary" @click="search" :disabled="canNotSearch">搜索</el-button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableLists"
                    style="width: 100%;"
                    border
                    id="passer-manage-table"
                    ref="table"
                    >
                  <el-table-column label="头像" prop="img" align="center" width="200">
                    <template slot-scope='scope'>
                      <img class="preview" src='../../../static/images/noPhoto.png' style="width:26px;height:26px;"  onerror="this.src = '../../../static/images/noPhoto.png'">
                    </template>
                  </el-table-column>
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
                      <el-button type="text" @click="setSuspect(scope)" class="inbox">设为重点人员</el-button>
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
    </el-main>
 </div>
</template>
<script>
import { dateFmt } from "../../common/js/utils";
const TABLEHEADER = [
  { label: "行人uid", prop: "uId", width: '400' },
  { label: "MAC地址", prop: "mac" }
 /*  { label: "MAC地址", prop: "mac2" },
  { label: "MAC地址", prop: "mac3" } */
];

export default {
  name: "PasserManage",
  data() {
    return {
      tableHeader: TABLEHEADER,
      tableLists: [],
      allCount: 0,
      pageCount: 0,
      currentPage: 1,
      inputValue:'',
      canNotSearch:false,
    };
  },
  created() {
    this.getPassers(0, 10, {});
  },
  methods: {
    getPassers(page, size, params) {
      const url = "/info/person/getMacsWithUid/" + page + "/" + size;
      let var_this = this;
      this.$axios({
        method: "post",
        url: url,
        data: params
       })
        .then(res => {
          this.canNotSearch = false;
          this.tableLists = res.data.content;
        })
        .catch(error => {
          this.canNotSearch = false;
        });
    },
    reset(){
      this.inputValue = "";
      if (this.currentPage != 1) {
        this.currentPage = 1;
      } else {
        this.getPassers(0, 10,{});
      }
    },
    search(){
      this.canNotSearch = true;
      if (this.inputValue.trim() == "") {
        this.getPassers(0, 10,{});
      } else {
        this.getPassers(0,10,{queryStr: this.inputValue});
      }
    },
    setSuspect(scope){
      console.log(scope);
      const url = "/info/person/createPersonWithPedestrian";
      let mac = scope.row.mac;
      this.$axios({
        method: "post",
        url: url,
        data: {
          personName:scope.row.uId,
          personDetailVO: {
            personMac1:mac?mac.split(',')[0]?mac.split(',')[0]:null:null,
            personMac2:mac?mac.split(',')[1]?mac.split(',')[1]:null:null,
            personMac3:mac?mac.split(',')[2]?mac.split(',')[2]:null:null
          },
        }
       })
        .then(res => {
          this.$message.success('已成功将该行人设为重点人员')
        })
        .catch(error => {
        });
    },
    currentPageChange(){

    }
  }
};
</script>
<style lang="scss">
@import "../../common/css/tablePageCommon.scss";
#passer-manage-table .el-table__body-wrapper > table > tbody > tr > td {
    height: 30px;
    padding: 10px 0;
    font-size: 12px;
    color: #9ca3ac;
}
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
