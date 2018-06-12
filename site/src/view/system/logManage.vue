<template>
 <div class="log-manage">
    <el-main class="app-main table-page">
        <h2 class="tp-title">日志管理</h2>
        <div>
            <div class="tp-header">
                <!-- <div class="tp-left"></div> -->
                <div class="tp-right">
                    <div class="tp-result">
                        <span>共搜索到<span class="tp-result-count">{{allCount}}</span>条记录</span>
                        <el-button size="small" type="text" @click="reset">重置</el-button>
                    </div>
                    <div class="tp-input-group">
                        <ul>
                            <li class="date-picker">
                                <el-date-picker
                                  v-model="time"
                                  type="datetimerange"
                                  align="right"
                                  unlink-panels
                                  size="small"
                                  width="500px"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  >
                                </el-date-picker>
                            </li>
                            <li class="select">
              
                            </li>
                            <li class="input">
                                <el-input size="small" :clearable="true" v-model="inputValue" placeholder="操作项/操作人"></el-input>
                            </li>
                            <li>
                                <el-button size="small" type="primary" @click="search()">搜索</el-button>
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
                    >
                    <el-table-column 
                        v-for="(value, index) in tableHeader" :key="index"
                        :width="value.width"
                        :label="value.label"
                        :prop="value.prop"
                        align="center"
                      >
                    </el-table-column>
                    
                </el-table>
            </div>
        
            <!-- page -->
            <div class="tp-page">
            <el-pagination
                background
                layout="prev, pager, next, jumper"
                :total="allCount"
                @current-change="currentPageChange"
            ></el-pagination>
            </div>
        </div>
    </el-main>
 </div>
</template>
<script>import { dateFmt } from "../../common/js/utils.js";
const TABLEHEADER = [
 
  { label: "时间", prop: "time" ,width:"250px" },
  { label: "操作人", prop: "operator" ,width:"250px" },
  { label: "操作项", prop: "operation",width:"250px"  },
  { label: "操作详情", prop: "desc" }
];
export default {
  name: "DeviceManagerEdit",
  data() {
    return {
      url:"",
      resultCount: "0",
      time: [],
      operator: "",
      operatorLists: [
        { label: "area1", value: "1" },
        { label: "area2", value: "2" }
      ],
      inputValue: "",

      tableHeader: TABLEHEADER,
      tableLists: [ ],

      allCount: 0,

    };
  },
   created() {
      this.getLogList(0, 10);
   },
  methods: {
    reset() {
      this.inputValue = "";
      this.getLogList(0,10)
      
    },
    getLogList(page, size) {
      const url = this.url+"/base/log/getLogList/" + page + "/" + size;
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
                   id:dl.id,
                   time : dateFmt(dl.operateTime),
                   operator : dl.operateUser,
                   operation : dl.operateFunction,
                   desc :dl.operateMsg,
               }
            this.tableLists.push(temp);
          });
        })
        .catch(error => {
          //this.canNotSearch = false;
          this.allCount = 0;
          this.$message.error("服务器异常");
        });
    },

    operatorChange() {
      console.log("operatorChange");
    },
  search(index = 0) {
      if (this.inputValue.trim() == "" && !this.time) {
        this.getLogList(index, 10);
      } else {
        let temp = {
          search:this.inputValue||"",
        }
        let var_this = this;
        var_this.time&&var_this.time[0]&&(temp.startTime = var_this.time[0])
        var_this.time&&var_this.time[1]&&(temp.endTime = var_this.time[1])
        console.log(temp.endTime);
        const url = this.url+"/base/log/getLogList/"+ index +"/10";
        var_this.$axios({
          method: "post",
          url: url,
          params: temp
        })
          .then(res => {
            var_this.tableLists = [];
            var_this.allCount = res.data.totalElements;
            var_this.pageCount = res.data.totalPages;
            res.data.content.forEach((dl,index) => {
                let temp = {
                   id:dl.roleId,
                   time : dateFmt(dl.operateTime),
                   operator : dl.operateUser,
                   operation : dl.operateFunction,
                   desc :dl.operateMsg,
                }
                var_this.tableLists.push(temp);
            });
          })
          .catch(error => {
            //var_this.canNotSearch = false;
            var_this.allCount = 0;
            var_this.$message.error("服务器异常");
          });
      }
    },
  
    currentPageChange(index) {
      console.log(index);
      this.search(index - 1);
    }
  }
};
</script>
<style lang="scss">
@import "../../common/css/tablePageCommon.scss";
.log-manage {
  .input {
    width: 160px;
  }

  .tp-result button.el-button--text {
    margin-right: 20px;
  }
  .date-picker {
    .el-input__icon.el-range__close-icon {
      position: absolute;
      right: 0px;
    }

    .el-date-editor {
      width: 100%;
    }
    .el-range-separator,
    input {
      font-size: 12px;
    }
  }
}
</style>
