<template>
 <div>
    <el-main class="app-main table-page">
        <h2 class="tp-title">设备管理</h2>
        <div>
            <!-- header -->
            <div class="tp-header">
                <div class="tp-left">
                    <el-button size="small" type="primary" @click="fn1">+新增设备</el-button>
                    <el-button size="small" type="primary" @click="fn2">批量导入</el-button>
                </div>
                <div class="tp-right">
                    <div class="tp-result">
                        <span>共搜索到<span class="tp-result-count">{{resultCount}}</span>条记录</span>
                        <el-button size="small" type="text" @click="reset">重置</el-button>
                    </div>
                    <div class="tp-input-group">
                        <ul>
                            <li>
                                <!-- 查询输入框1 -->
                                <el-input size="small" :clearable="true" v-model="inputValue" placeholder="输入设备名称或IP查询"></el-input>
                            </li>
                            <li>
                                <!-- 查询输入框2 -->
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
                <!-- 将你的 el-table替换下面的el-table -->
                <el-table
                    :data="tableLists"
                    style="width: 100%;"
                    border
                    >
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
                    >
                        <template slot-scope="scope">
                            <el-button type="text" @click="editItem(scope)">编辑</el-button>
                            <el-button type="text" @click="removeItem(scope)" class="red">删除</el-button>
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
                @current-change="currentPageChange"
            ></el-pagination>
            </div>
        </div>
    </el-main>
 </div>
</template>
<script>
const TABLEHEADER = [
  { label: "序号", prop: "index" },
  { label: "设备名称", prop: "equipName" },
  { label: "IP", prop: "IP" },
  { label: "编号", prop: "number" },
  { label: "类型", prop: "type" },
  { label: "配置参数", prop: "configArg" },
  { label: "设备区域", prop: "area" },
  { label: "设备地址", prop: "address" },
  { label: "经纬度", prop: "latlng" }
];
export default {
  name: "DeviceManagerEdit",
  data() {
    return {
      resultCount: "12",
      inputValue: "",
      tableHeader: TABLEHEADER,
      allCount: 100,
      tableLists: [{
            index:'0',
            equipName:'张三',
            IP: '广东省深圳市',
            number:'x',
            type:'x',
            configArg:'x',
            area:'x',
            address:'x',
            latlng:'x',
            handle:'x',
            flag: true
        }]
    };
  },
  methods: {
    fn1() {
      console.log("fn2");
    },
    fn2() {
      console.log( 'fn2' )
    },
    reset() {
      console.log("reset");
    },
    search(){
        console.log( 'search' )
    },
    editItem(data) {
      console.log("editItem");
    },
    removeItem(data) {
      console.log(data, "removeItem");
    },
    currentPageChange(index) {
      console.log(index, "sizeChange");
    }
  },

};
</script>
<style lang="scss">
@import "../../common/css/tablePageCommon.scss";
</style>
