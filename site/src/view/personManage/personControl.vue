<template>
    <div id="personControl" class="person-control">
        <el-main class="table-page">
            <h2 class="tp-title">布控人员</h2>
            <div class="equipment-manager">
                <!-- 搜索区域 -->
                <div class="em-header tp-header">
                    <div class="fl tp-left" >
                        <el-button size="small" type="primary" @click="cancelControl(personIds)">撤销布控</el-button>
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
                                    <!-- 时间选择 -->
                                    <el-date-picker style="width:350px;" size="small" @blur="handleSelectTime" v-model="timeVal" type="datetimerange" :picker-options="pickerOption" start-placeholder="开始时间" end-placeholder="结束时间" align="center" prefix-icon='el-icon-date' format="yyyy-MM-dd HH:mm:ss" >
                                    </el-date-picker>
                                </li>
                                <li>
                                    <el-select size="small" style="width:130px;" v-model="targetLevel" @change="targetLevelChange" placeholder="布控等级">
                                        <el-option v-for="item in rank" :key="item.value" :value="item.value" :label="item.value"></el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <el-select size="small" style="width:100px;" v-model="areaName" @change="areaNameQuery" placeholder="布控区域">
                                        <el-option v-for="item in area" :key="item.value" :value="item.value" :label="item.value"></el-option>
                                    </el-select>
                                </li>
                                <li class="w150">
                                    <el-input size="small" v-model="searchWord" style="width:180px;" placeholder="请输入姓名/身份证"></el-input>
                                </li>
                                <li class="btn-search">
                                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 表格区域 -->
                <div>
                    <!-- 填写表格的数据 -->
                    <el-table :data="tableLists" style="width: 100%;" border id="myTable" :resizable="true" :default-sort="{prop: 'targetTime', order: 'ascending'}" 
                     @select="handleSelectionChange"
                     @select-all='handleSelectionChange'>
                        <!-- 表头数据 -->
                        <!-- 选择属性 type="selection"-->
                        <el-table-column label="选择" prop="personId" align="center" type="selection">
                        </el-table-column>
                        <!-- 自动展开属性 type='expand' -->
                        <el-table-column label="" prop="personId" align="center" type='expand'>
                          <template slot-scope="props">
                            <!-- <el-form label-position="left" inline class="demo-table-expand">
                              <el-form-item label="头像" >
                                  <img :src=" props.row.img" alt="">
                              </el-form-item>
                              <el-form-item label="代用名"  >
                                  <span >{{ props.row.oldName }}</span>
                              </el-form-item>
                              <el-form-item label="性别"  >
                                  <span>{{ props.row.sex }}</span>
                              </el-form-item>
                              <el-form-item label="类型"  >
                                  <span>{{ props.row.type }}</span>
                              </el-form-item>
                              <el-form-item label="手机号/MAC"  >
                                  <span>{{ props.row.phoneMac }}</span>
                              </el-form-item>
                              <el-form-item label="手机号/MAC"  >
                                  <span>{{ props.row.phoneMac }}</span>
                              </el-form-item>
                              <el-form-item label="来源"  >
                                  <span>{{ props.row.from }}</span>
                              </el-form-item>
                              <el-form-item label="录入时间"  >
                                  <span>{{ props.row.update }}</span>
                              </el-form-item>
                            </el-form>     -->
                            <el-table  :data="props.row.tableExpandLists"  style="margin:15px;width:98%;background-color:'green'" border :resizable="true">
                              <el-table-column label="头像" prop="uploadId" align="center">
                                <template slot-scope='scope' >
                                  <img :src="scope.row.personPhoto" style="width:26px;height:26px;" onerror="this.src = '../../../static/images/noPhoto.png'">
                                  <!-- <img src="@/assets/images/test.png" style="width:26px;height:26px;" id="testId" @click="zoom('/src/assets/images/test.png')"> -->
                                </template>
                              </el-table-column>
                              <el-table-column  v-for="(item , index) in table" :key="index" :label="item.label" :prop="item.prop" align="center">
                              </el-table-column>
                            </el-table>
                          </template>
                        </el-table-column>
                        <el-table-column label="头像" prop="personPhoto" align="center">
                            <template slot-scope='scope'>
                                <img :src="scope.row.personPhoto" style="width:26px;height:26px;" onerror="this.src = '../../../static/images/noPhoto.png'">
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" prop="personName" align="center">
                        </el-table-column>
                        <el-table-column label="身份证" prop="identityCard" align="center">
                        </el-table-column>
                        <el-table-column label="住址" prop="personAddr" align="center">
                        </el-table-column>
                        <el-table-column label="备注" prop="personRemark" align="center">
                        </el-table-column>
                        <el-table-column label="布控时间" prop="targetTime" align="center" sortable>
                        </el-table-column>
                        <el-table-column label="布控区域" prop="areaGroupList" align="center">
                        </el-table-column>
                        <el-table-column label="布控等级" prop="targetLevelName"  align="center" >
                        </el-table-column>
                        <el-table-column label="操作" prop="personId" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="removeControl(scope.row)">撤销布控</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <!-- 分页 -->
                <div class="em-page tp-page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next, jumper"
                        :total="allCount">
                    </el-pagination>
                </div>
            </div>
        </el-main>
    </div>
</template>
<script>
import { dateFmt } from "../../common/js/utils";
export default {
  name: "DeviceManagerEdit",
  data() {
    return {
        tableLists: [],              //表格数据
        allCount: 0,                 // 总页数
        currentPage: 1,             //当前页
        pageSize: 10,                //页容量
        pickerOption: {
            shortcuts: [
            {
                text: "最近一周",
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
                }
            },
            {
                text: "最近两周",
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
                picker.$emit("pick", [start, end]);
                }
            },
            {
                text: "最近一个月",
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
                }
            }
            ]
        },                          //时间的快捷方式
        rank: [],                   //布控等级
        area: [],                   //布控区域组
        timeVal: [],                //实时绑定的时间
        targetLevel: null,          //实时绑定的布控等级
        searchWord: null,           //实时绑定名字
        areaName: null,             //实时绑定区域名称
        params: {},                 //筛选的参数
        table: [
            { label: "代用名", prop: "personAliasName" },
            { label: "性别", prop: "personSex" },
            { label: "类型", prop: "personTypeIdName" },
            { label: "手机号/MAC地址", prop: "personPhone1" },
            { label: "手机号/MAC地址", prop: "personPhone2" },
            { label: "手机号/MAC地址", prop: "personPhone3" },
            { label: "来源", prop: "personSource" },
            { label: "录入时间", prop: "createTime" }
        ],                          //二级表格的表头数据
        personIds: [],              //批量撤销的id数组
        // ===========测试=============
        url1: '',
        url2: '',
        url3: '',
        url4: '',
        url5: '',
        // url1: 'http://10.10.18.46:8084',         // 一级表格请求
        // url2: 'http://10.10.18.46:8082',         // 二级表格请求
        // url3: 'http://10.12.26.3:20039',         // 二次拼接 照片路径
        // url4: 'http://10.10.18.87:8082',         // 布控等级 
        // url5: 'http://10.10.18.42:8082',         // 区域组    

    };
  },
  computed: {
  },
  created() {
    this.getTableLists(this.params)         
    this.getRank()                          
    this.getAllGroup()                      
  },
  methods: {
    getTableLists(params) {
      params = params || null ;
      const url = `${this.url1}/target/targetPerson/getTargetPersonListPage/${this.currentPage -1}/${this.pageSize}`;
      this.$axios.post(url , params).then(res => {
        //   console.log(res.data.content)
        let table = [];
        this.tableLists = [];
        table = res.data.content;
        this.allCount = res.data.totalElements  

        table.forEach(item => {
          // console.log("第一层item:" , item)
          const ur = `${this.url2}/info/person/getPersonDetailListById/${item.personEntity.personId}`
          let photo = item.personEntity.personPhoto?`${this.url3}/upload/showImg?id=` + item.personEntity.personPhoto:require("../../assets/images/noPhoto.png")
          let areaGroupList = [] 
          item.areaGroupList.forEach(val=>{
              areaGroupList.push(val.areaGroupName)
          })

          // console.log("头像:" , photo)
          this.$axios.get(ur).then(res=>{
            let ele = [];
            ele = res.data[0]
            let personSex = null
            // console.log("ele,二层表格:" , res.data)
            if(ele.personSex == "0" ){ personSex = '未知'}else if(ele.personSex == "1" ){ personSex = '男';}else{ personSex = '女';} //性别过滤
            let personPhone1 = ele.personPhone1?ele.personPhone1:'';
            let personMac1 = ele.personMac1? '  ' +ele.personMac1:'';
            let personPhone2 = ele.personPhone2?ele.personPhone2:'';
            let personMac2 = ele.personMac2? '  ' +ele.personMac2:'';
            let personPhone3 = ele.personPhone3?ele.personPhone3:'';
            let personMac3 = ele.personMac3? '  ' +ele.personMac3:'';
              this.tableLists.push({
                  "personId": item.personEntity.personId,
                  "personPhoto": photo,
                  "personName": item.personEntity.personName,
                  "identityCard": item.personEntity.identityCard,
                  "personAddr": item.personEntity.personAddr,
                  "personRemark": item.personEntity.personRemark,
                  "targetTime": dateFmt(+new Date(item.targetStartTime)) + " 至 " + dateFmt(+new Date(item.targetEndTime)),
                  "areaGroupList": areaGroupList.join(' | '),
                  "targetLevel": item.targetLevel,
                  "targetLevelName": item.targetLevelName,
                  "tableExpandLists" : [{
                    "personAliasName": ele.personAliasName,
                    "personSex": personSex,
                    "personPhoto": photo,
                    "personTypeIdName": ele.personTypeIdName,
                    "personPhone1": personPhone1 + personMac1,
                    "personPhone2": personPhone2 + personMac2,
                    "personPhone3": personPhone3 + personMac3,
                    "personSource": ele.personSource,
                    "createTime": dateFmt(+new Date(ele.createTime))
                }]
              })
          }).catch(() => {
              this.tableLists.push({
                "personId": item.personEntity.personId,
                "personPhoto": photo,
                "personName": item.personEntity.personName,
                "identityCard": item.personEntity.identityCard,
                "personAddr": item.personEntity.personAddr,
                "personRemark": item.personEntity.personRemark,
                "targetTime": dateFmt(+new Date(item.targetStartTime)) + " 至 " + dateFmt(+new Date(item.targetEndTime)),
                "areaGroupList":  areaGroupList.join(' | '),
                "targetLevel": item.targetLevel,
                "targetLevelName": item.targetLevelName,
                })
              this.$message({
                  type: 'info',
                  message: '存在无详细信息人员！'
              });
          });
        });
        //   console.log(this.tableLists);
      })
      .catch(() => {
          this.$message({type: 'info', message: '表格数据请求失败!'});
      });
    },
    // 获取布控等级基本信息
    getRank(){
      const url = `${this.url4}/info/surveillanceLevel/getSurveillanceLevelData`
      this.$axios.get(url).then(res=>{
          // console.log("布控等级: " ,res.data);
          res.data.forEach( item =>{
              this.rank.push({
                  label: item.levelId,
                  value: item.levelName,
                  type: item.levelType
              })
          })
      }).catch(()=>{
          this.$message.error('布控等级请求错误');
      })
    },
    // 获取布控区域组基本信息
    getAllGroup(){
      const url = `${this.url5}/info/areagroup/getAllGroup`
      this.$axios.get(url).then(res=>{
        // console.log('区域组:' , res.data)
        res.data.forEach(item => {
          this.area.push({
            label: item.areaGroupId,
            value: item.areaGroupName
          })
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '布控区域请求失败！'
        });
      })
    },
    // 搜索布控等级的过滤 转出id方便搜索
    filterRank(val){
      let targetLevel = null;
      this.rank.forEach(item =>{
        if(item.value == val){
          targetLevel = item.label;
        }
      })
      return targetLevel;
    },
    // 搜索布控区域组 , 转出id
    filterAreaGroup(val){
      let areaGroupId = null;
      this.area.forEach( item => {
        if(item.value == val){
            areaGroupId = item.label;
        }
      })
      return areaGroupId;
    },
    // 单独撤销布控
    removeControl(row) {
      this.$confirm(`确定需要撤销${row.personName}的布控吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log("这一行的id是: " ,row.personId)
        const url = `${this.url1}/target/targetPerson/cancelTargetPerson/${row.personId}`
        this.$axios.get(url).then(res => {
          this.timeVal = [];
          this.targetLevel = null;
          this.searchWord = null;
          this.params = null;
          this.areaName = null;
          this.getTableLists()
        })
      }).catch(() => {
        this.$message({ type: 'info',  message: '已取消操作' });          
      });
    },
    // 页容量改变 , 没调用
    handleSizeChange(){
      console.log("handleSizeChange")
    },
    // 页码改变
    handleCurrentChange(val){
      this.currentPage = val;
      this.getTableLists();
    },
    // 选择某行时
    handleSelectionChange(selection, row){
      this.personIds = []
      selection.forEach(item => {
          this.personIds.push(item.personId);
      })
        // console.log('所有的personIds数组' , this.personIds);
        // console.log('selection',selection) //能获取所有被选择的row
    },
    // 展开某行=============================
        // handleExpandChange(row,expandedRows){
        //     // console.log(expandedRows);
        //     // console.log(row.personId);
        //     const url = `${this.url2}/person/getPersonDetailListById/${row.personId}`
        //     this.$axios.get(url).then(res => {
        //         res.data.forEach(item => {
        //             // console.log(row.personId)
        //             let stl = [];
        //             stl.push({
        //                 "personAliasName": item.personAliasName,
        //                 "personSex": item.personSex,
        //                 "personTypeIdName": item.personTypeIdName,
        //                 "personPhone1": item.personPhone1 + '/' + item.personMac1,
        //                 "personPhone2": item.personPhone2 + '/' + item.personMac2,
        //                 "personPhone3": item.personPhone3 + '/' + item.personMac3,
        //                 "personSource": item.personSource,
        //                 "createTime": dateFmt(+new Date(item.createTime))
        //             })
        //             for(let i = 0 ; i<this.tableLists.length;i++){
        //                 if(this.tableLists[i].personId == row.personId){
        //                     this.tableLists[i].tableExpandLists = stl;
        //                 }
        //             }
        //         })
        //     })
        // },
    // 展开某行=============================
    // 做选择时间
    handleSelectTime(val){
        let times0 = this.timeVal?this.timeVal[0]:null;
        let times1 = this.timeVal?this.timeVal[1]:null;
        this.params = {
            areaGroupId: this.filterAreaGroup(this.areaName) || null,
            personNameIdCardQuery: this.searchWord || null,
            targetStartTime: times0,
            targetEndTime: times1,
            targetLevel: this.filterRank(this.targetLevel) || null
        }
         this.getTableLists(this.params)
        // console.log('选择的时间',val);
    },
    // 做等级筛选时
    targetLevelChange(val){
        this.targetLevel = val  
        let times0 = this.timeVal?this.timeVal[0]:null;
        let times1 = this.timeVal?this.timeVal[1]:null;
        this.params = {
            areaGroupId: this.filterAreaGroup(this.areaName) || null,
            personNameIdCardQuery: this.searchWord || null,
            targetStartTime: times0,
            targetEndTime: times1,
            targetLevel: this.filterRank(this.targetLevel) || null
        }
        this.getTableLists(this.params)
    },
    // 做区域筛选
    areaNameQuery(val){
        // console.log(val)
        // console.log(this.filterAreaGroup(this.areaName))
        this.areaName = val;
        let times0 = this.timeVal?this.timeVal[0]:null;
        let times1 = this.timeVal?this.timeVal[1]:null;
        this.params = {
            areaGroupId: this.filterAreaGroup(this.areaName) || null,
            personNameIdCardQuery: this.searchWord || null,
            targetStartTime: times0,
            targetEndTime: times1,
            targetLevel: this.filterRank(this.targetLevel) || null
        }
        this.getTableLists(this.params)
    },
    // 搜索按钮
    search() {
        // console.log('this.areaName',this.areaName)
        // console.log('this.searchWord',this.searchWord)
        // console.log('this.timeVal',this.timeVal)
        // console.log('this.targetLevel',this.targetLevel)
        let times0 = this.timeVal?this.timeVal[0]:null;
        let times1 = this.timeVal?this.timeVal[1]:null;
        this.params = {
            areaGroupId: this.filterAreaGroup(this.areaName) || null,
            personNameIdCardQuery: this.searchWord || null,
            targetStartTime: times0,
            targetEndTime: times1,
            targetLevel: this.filterRank(this.targetLevel) || null
        }
        // console.log(this.params)
        this.getTableLists(this.params)
    },
    // 重置按钮
    reset() {
      this.timeVal = [];
      this.targetLevel = null;
      this.searchWord = null;
      this.params = null;
      this.areaName = null;
      this.getTableLists(this.params)
    },
    // 批量撤销
    cancelControl(val) {
        if(val.length == 0){
            val = [null];
             this.$message.error('请至少选择一人进行撤销!');
             return
        }
        this.$confirm('确定需要撤销选中布控人员吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = `${this.url1}/target/targetPerson/cancelTargetPersonBatch`
          this.$axios.post(url , val).then(res => {
            this.timeVal = [];
            this.targetLevel = null;
            this.searchWord = null;
            this.params = null;
            this.areaName = null;
            this.getTableLists();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消布控'
          });          
        });
    }
  }
};
</script>

<style lang="scss">
  @import "../../common/css/tablePageCommon.scss";

  .el-main.person-control {
    padding: 0;
    border: 0px solid #000;
    .tp-title{
      padding: 20px 0 30px 10px;
    }
    .equipment-manager{
      padding: 10px;
      .search-condition {
        ul{
          li{
            &:nth-child(1) {
              width: 350px;
            }
            &:nth-child(2) {
              width: 130px;
            }
            &:nth-child(4) {
              width: 180px;
            }
          }
        }
      }
    }
  }
  // 由于'展开'和图片撑大了表格，需要重置
  /*表格头部样式 */
  #myTable > .el-table__header-wrapper > table > thead > tr > th {
    padding: 5px 0;
  }
  /*表格内部的样式*/
  #myTable .el-table__body-wrapper > table > tbody > tr > td {
    height: 30px;
    padding: 10px 0;
    font-size: 12px;
    color: #9ca3ac;
  }
  #personControl {
    background-color: #edf2fb;
  }
  // 展开二级表格
  .demo-table-expand {
    font-size: 0;
    background-color: skyblue;
    border-radius: 10px;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-left: 0;
    margin-bottom: 0;
    width: 40%;
    text-align: left;
  }
  .demo-table-expand .el-form-item span {
    line-height: 40px;
  }
</style>


