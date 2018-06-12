<template>
 <div class="device-manager">
    <el-main class="app-main table-page">
      <h2 class="tp-title">设备管理</h2>
      <div class="">
          <div class="tp-header">
              <div class="tp-left">
                  <el-button size="small" type="primary" @click="eAddEquipment">+新增设备</el-button>
                  <el-button size="small" type="primary" @click="eImport">&nbsp;批量导入</el-button>
              </div>
              <div class="tp-right">
                  <div class="tp-result">
                      <span>共搜索到<span class="tp-result-count">{{resultCount}}</span>条记录</span>
                      <el-button size="small" type="text" @click="eReset">重置</el-button>
                  </div>
                  <div class="tp-input-group" ref="xy">
                      <ul>
                          <li class="select">
                            <el-tooltip :content="devTypeTip" placement="top" effect="dark">
                              <el-select size="small" v-model="devType" @change="eTypeChange">
                                <el-option
                                  v-for="item in devTypeList" 
                                  :key="item.value"
                                  :value="item.value"
                                  :label="item.label"
                                ></el-option>
                              </el-select>
                            </el-tooltip>
                          </li>
                          <li class="select">
                            <el-tooltip :content="areaTip" placement="top" effect="dark">
                              <el-select size="small" v-model="areaType" @change="eAreaChange">
                                <el-option
                                  v-for="item in areaTypeList" 
                                  :key="item.value"
                                  :value="item.value"
                                  :label="item.label"
                                ></el-option>
                              </el-select>
                            </el-tooltip>
                          </li>
                          <li class="input">
                              <el-input size="small" 
                              @keyup.native.delete="eBackSpaceAndDelete"
                              @clear="eClear" 
                              @keyup.native.enter="eEnter" 
                              :clearable="true" 
                              :maxlength="45" 
                              v-model="keyword" 
                              placeholder="输入设备名称或IP查询"></el-input>
                          </li>
                          <li>
                              <el-button size="small" type="primary" @click="eSearch">搜索</el-button>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div>
              <el-table
                  :data="tableList"
                  border
                  style="width: 100%;"
                  >
                  <el-table-column 
                      v-for="(value, index) in tableHeaderList" :key="index"
                      :width="index === 0 ? '50px': ''"
                      :label="value.label"
                      :prop="value.prop"
                      align="center"
                      >
                  </el-table-column>
                  <el-table-column
                    label="经纬度"
                    align="center"
                  >
                    <template slot-scope="scope">
                      {{scope.row.lat ? `Lat:${scope.row.lat}`: ''}}
                      <br>
                      {{scope.row.lng ? `Lng:${scope.row.lng}`: ''}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-button type="text" @click="eEdit(scope)">编辑</el-button>
                      <el-button type="text" @click="eRemoveItem(scope)" class="red">删除</el-button>
                    </template>
                  </el-table-column>
              </el-table>
          </div>
          <div class="tp-page">
             <el-pagination
                @current-change="eCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="allCount">
            </el-pagination>
          </div>

          <!-- dialog -->
          <el-dialog title="批量导入设备" 
            :visible.sync="isDialogShow"
            :close-on-press-escape="false"
            @close="eDialogClose"
            :close-on-click-modal="false">
            <div class="dm-dialog-content">
              <el-progress :stroke-width="5" :show-text="false" :style="{visibility: percentage?'visible':'hidden'}" :percentage="percentage"></el-progress>
              <div class="dm-upload clearfix">
                <el-upload
                  action=""
                  ref="upload"
                  class="dm-btn-groud"
                  :auto-upload="false"
                  :http-request="_fSubmitUpload"
                  :on-change="eFileChange"
                  :on-remove="eFileRemove"
                  :limit="2"
                  accept=".xlsx,.xls"
                  >
                  <el-button class="dm-file" slot="trigger" size="small" type="primary">选择上传文件</el-button>
                  <el-button class="dm-download" size="small" type="text"><a :href="masterplatePath">下载模版</a></el-button>
                  <el-button class="dm-upload" size="small" type="success" @click="eUpload" :disabled="!isUploadBtnActive">上传检查数据格式</el-button>
                </el-upload>
              </div>
              <div class="dm-result">
                <p class="result">共检测{{importCount}}条记录， {{importErrorCount}}条记录格式有误无法导入</p>
                <el-table
                    :data="uploadErrorTableList"
                    style="width: 100%;"
                    >
                    <!-- border -->
                    <el-table-column 
                        v-for="(value, index) in uploadErrorHeaderList" :key="index"
                        :width="index === 0 ? '50px': ''"
                        :label="value.label"
                        :prop="value.prop"
                        align="center"
                        >
                    </el-table-column>
                </el-table>
                <div v-show="uploadId">
                  <el-button :disabled="importCount<=importErrorCount" class="dm-upload" @click="eUploadValidateExcelItem" style="margin-top: 10px; width: 150px;" size="small" type="primary">上传{{importCount - importErrorCount}}条合法格式记录</el-button>
                  <el-button style="width: 150px;" plain size="small" @click="eCancleUploadValidateExcelItem">取消</el-button>
                </div>
              </div>
            </div>
          </el-dialog>
      </div>
    </el-main>
 </div>
</template>
<script>
import BASE from './js/basePath'
import {errorException, successTip, errorTip, confirmModal} from './js/tip'
import {debounce} from './js/utils'
const BASEPATH = BASE.BASEPATH
const BASEPATH2 = BASE.BASEPATH2
const BASEPATH3 = BASE.BASEPATH3
const FTPPATH = BASE.FTPPATH
const TABLEHEADER = [
  { label: "序号", prop: "index" },
  { label: "IP", prop: "deviceIp" },
  { label: "编号", prop: "deviceNo" },
  { label: "MAC地址", prop: "deviceMac" },
  { label: "地址", prop: "deviceAdrr" },
  { label: "名称", prop: "deviceName" },
  { label: "类型", prop: "deviceTypeName" },
  { label: "区域名称", prop: "areaName" },
];

const UPLOAD_ERROR_HEADER = [
  { label: "序号", prop: "index" },
  { label: "IP", prop: "ip" },
  { label: "名称", prop: "name" },
  { label: "错误原因", prop: "reason" },
]
const MASTERPLATE_PATH = '../../../static/DeviceInfo_Template_Import.xlsx'

export default {
  name: "DeviceManagerEdit",
  data() {
    return {
      resultCount: '',
      devType: '',
      devTypeList: [{value: '', label: '全部类型'}],
      areaType: '',
      areaTypeList: [{value: '', label: '全部区域'}],
      keyword: '',
      tableList: [],
      tableHeaderList: TABLEHEADER,
      currentPage: 1,
      pageSize: 10,
      allCount: 0,

      // isDialogShow: true,
      isDialogShow: false,
      importCount: 0,
      importErrorCount: 0,
      uploadErrorHeaderList: UPLOAD_ERROR_HEADER,
      uploadErrorTableList: [],
      masterplatePath: MASTERPLATE_PATH,
      
      percentage: 0,// 进度条
      file: null,
      uploadId: '',
      loading: null,
    };
  },
  created() {
    this._getDevTypeList()
    this._getAreaTypeList()
    this._getTableList(this.currentPage)
  },
  watch: {
    isDialogShow(){
      if (!this.isDialogShow) {
        this.uploadErrorTableList = []
        this.file = null
        this.uploadId = ''
        this.importCount = 0
        this.importErrorCount = 0
      }
    }
  },
  computed: {
    isUploadBtnActive(){
      return !!this.file
    },
    devTypeTip(){
      for (let i = 0, len = this.devTypeList.length; i < len; i++) {
        let item = this.devTypeList[i]
        if (item.value == this.devType) {
          return item.label
        }
      }
    },
    areaTip(){
      for (let i = 0, len = this.areaTypeList.length; i < len; i++) {
        let item = this.areaTypeList[i]
        if (item.value == this.areaType) {
          return item.label
        }
      }
    }
  },
  methods: {
    // fetch
    _getTableList(a, b){
      console.log( a, b, 'cc' )
      let url = `${BASEPATH}/info/deviceManage/findDevPageList/${this.currentPage - 1}/${this.pageSize}`
      this.$axios({
        method: 'POST',
        url: url,
        data: {
          areaId: this.areaType,
          deviceTypeId: this.devType,
          deviceIp: this.keyword,
          deviceName: this.keyword
        }
      })
        .then(( data )=>{
            this.handleTableList(data.data)
        })
        .catch((e)=>{this.mCatchException(e)})
    },
    _getDevTypeList(){
      this.$axios.get(BASEPATH + '/info/deviceManage/findDevTypeList')
        .then(( data )=>{
          data = data.data
          data.forEach(( v, i )=>{
            this.devTypeList.push({value: v.deviceTypeId, label: v.deviceTypeName})
          })
        })
        .catch((e)=>{this.mCatchException(e)})
    },
    _getAreaTypeList(){
      this.$axios.get(BASEPATH2 + '/info/area/getAllSysArea')
      .then(( data )=>{
        data = data.data
        data.forEach(( v, i )=>{
          this.areaTypeList.push({value: v.areaId, label: v.areaName})
        })
      })
      .catch((e)=>{this.mCatchException(e)})
    },
    _deleteDev(id){
      return this.$axios({
        type: 'GET',
        url: BASEPATH + '/info/deviceManage/deleteDevInfo/' + id,
      })
    },
    // upload
    _fSubmitUpload: function(content) {
      let formData = new FormData();
      formData.append("file", this.file.raw);
      let config = {
        "Content-Type": "multipart/form-data"
      };
      var var_this = this;
      this.$axios
        .post(`${FTPPATH}/upload/uploadFile`, formData, config)
        // .post(`${FTPPATH}/uploadFile`, formData, config)
        .then((data)=>{
          data = data.data[0]
          this.uploadId = data.uploadId
          this.loading = this.$loading({
            lock: true,
            text: '数据检测中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.handleAfterUpload(data.id, data.uploadId)
          this.handleAfterUploadStyle()
        })
        .catch(( e )=>{  this.mCatchException(e)  });
    },
    _checkUploadExcelValidate(uploadId){
      let option = {
        type: 'GET',
        url: `${BASEPATH3}/info/deviceManage/batchCheckDevInfo/${uploadId}`
      }
      this.$axios(option)
        .then(( data )=>{
            this.loading.close()
            // 分页暂时不做
            data = data.data
            this.importErrorCount = data.errCount
            this.importCount = data.total
            this.uploadErrorTableList = []
            data.devErrList.forEach(( v, i )=>{
                this.uploadErrorTableList.push({
                  index: i + 1,
                  ip: v.deviceIp,
                  name: v.deviceName,
                  reason: v.errMsg
                })
            })
        })
        .catch(( e )=>{  
          this.loading.close()
          this.mCatchException(e)  
        });
    },
    _uploadValidateExcelItem(){
      let option = {
        type: 'GET',
        url: `${BASEPATH3}/info/deviceManage/batchCreateDevInfo/${this.uploadId}`
      }
      this.$axios(option)
        .then(( data )=>{
            this.mSuccessTip('上传合法数据成功！')
            this.isDialogShow = false
        })
        .catch(( e )=>{  this.mCatchException(e)  });
    },

    // handler fn
    handleTableList(data){
      this.allCount = this.resultCount = data.totalElements
      this.tableList = []
      data.content.forEach(( v, i )=>{
        this.tableList.push({
          index: (this.currentPage - 1) * 10 + i + 1,
          deviceIp: v.deviceIp,
          deviceNo: v.deviceNo,
          deviceAdrr: v.deviceAdrr,
          deviceName: v.deviceName,
          deviceMac: v.deviceMac,
          deviceTypeName: v.deviceTypeName,
          areaName: v.areaName,
          lat: v.lat,
          lng: v.lng,
          deviceId: v.id
        })
      })
    },
    handleAfterUploadStyle(){
      this.file = null
      var tid = setInterval((  )=>{
        this.percentage += 10
        if (this.percentage > 100) {
          this.percentage = 0
          this.$refs.upload.clearFiles()
          clearInterval(tid)
        }
      }, 16)
    },
    handleAfterUpload(id, uploadId){
      this._checkUploadExcelValidate(uploadId)
    },
    
    // dom event
    eUploadValidateExcelItem(){
      this._uploadValidateExcelItem()
    },
    eCancleUploadValidateExcelItem(){
      this.isDialogShow = false
    },

    eFileChange(file, files){
      let fileName = file.name
      let reg = /\.(xls|xlsx){1}$/
      if (!reg.test(fileName)) {
        files.pop()
        this.mConfirmModal('仅支持上传.xls以及.xlsx文件!').catch((  )=>{})
        return
      }
      this.file = file
      if (files.length > 1) {
        files.shift()
      }
    },
    eUpload(){
      this.$refs.upload.submit();
    },
    eFileRemove(){
      this.file = null
    },
    eDialogClose(){
      this.$refs.upload.clearFiles()
      this.file = null
    },
    eImport(){
      this.isDialogShow = true
    },
    eEnter(){
      this.debounce(this._getTableList)
    },
    eClear(){
      this._getTableList()
    },
    eBackSpaceAndDelete(v){
      if (!this.keyword) {
        this.debounce(this._getTableList)
      }
    },
    eReset(){
      this.devType = ''
      this.areaType = ''
      this.keyword = ''
      this.currentPage = 1
      this.debounce(this._getTableList, '123', '1x23')
    },
    eTypeChange(){
      this._getTableList()
    },
    eAreaChange(){
      this._getTableList()
    },
    eSearch(){
      this.debounce(this._getTableList)
    },
    eAddEquipment(){
      this.$router.push({name: 'deviceEdit'})
    },
    eEdit(data){
      let deviceId = data.row.deviceId
      this.$router.push({name: 'deviceEdit', query: {id: deviceId}})
    },
    eRemoveItem(data){
      this.mConfirmModal('您确定删除此条数据？')
        .then((  )=>{
          let deviceId = data.row.deviceId
          this._deleteDev(deviceId)
            .then((  )=>{
              this._getTableList()
              this.mSuccessTip('删除成功')
            })
            .catch((e)=>{this.mCatchException(e)})
        })
        .catch(()=>{})
    },
    eCurrentChange(index){
      this.currentPage = index
      this._getTableList()
    },
     //tip fn
    mCatchException(e, nocatchDesc = '请检查您的网络是否异常！'){
      return errorException(this, e, nocatchDesc)
    },
    mSuccessTip(msg='操作成功'){
      return successTip(this, msg)
    },
    mErrorTip(msg = '操作失败！'){
      return errorTip(this, msg)
    },
    mConfirmModal(msg = '您确定进行此操作？'){
      return confirmModal(this, msg)
    },
    
    // utils fn
    debounce(fn){
      debounce(fn, this, 200, ...[].slice.call(arguments, 1))
    },

  }
};
</script>
<style lang="scss">
@import "../../common/css/tablePageCommon.scss";
.device-manager {
  .el-table div.el-table__body-wrapper button.el-button{
    line-height: 22px;
  }
  .input {
    width: 180px;
  }
  .select {
    width: 110px;
    // .el-input {
    //   .el-input__inner {
    //     padding-right: 0px;
    //     text-align: left;
    //   }
    //   .el-input__suffix {
    //     display: none;
    //   }
    // }
  }
  .el-dialog {
    border-radius: 5px;
  }
  .el-dialog__header {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    span {
      font-size: 16px;
      font-weight: bold;
      padding-left: 40px;
      text-align: left;
      display: block;
    }
  }
  .el-dialog__body {
    padding-top: 10px;
  }
  .dm-result .el-table {
    overflow: scroll;
    max-height: 300px;
  }
  .dm-dialog-content {
    margin: 0px 30px;
    border-radius: 5px;
    min-height: 200px;
    padding: 10px;
    overflow-x: scroll;
    .el-table {
      border: 1px solid #eee !important;
      &::before {
        display: none;
      }
      div.el-table__body-wrapper {
        max-height: 260px;
        overflow: scroll;
      }
    }
  }
  .el-progress {
    margin-top: -10px;
    margin-bottom: 5px;
  }
  
  .dm-btn-groud {
    .el-upload-list--text {
      padding-top: 35px;
      li {
        text-align: left;
      }
    }
    .el-upload--text {
      float: left;
      margin-right: 10px;
    }
    .dm-download {
      float: left;
      a {
        color: #409EFF;
        &:active, &:hover{
          color: #66b1ff;
        }
      }
    }
    .dm-upload {
      float: right;
    }
  }
  .dm-result {
    .result {
      text-align: left;
      padding: 10px 0px;
    }
  }
  button.red span {
    color: red;
  }
}
</style>
