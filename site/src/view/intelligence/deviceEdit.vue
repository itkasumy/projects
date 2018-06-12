<template>
<div>
    <el-main>
        <div class="equipment-edit">
            <el-collapse 
                v-model="aciveCollapse"
                @change = "collapseChange"
                >
                <el-collapse-item
                  :title="collapseLists[0]"
                  :name="collapseLists[0]">   
                    <ul class="all-line clearfix">
                        <li>
                            <span><i class="red">*</i>设备IP</span>
                            <div>
                              <el-input
                                :class="{'not-input': !IP&&check}"
                                placeholder="请输入设备IP"
                                v-model="IP"
                                :maxlength="15"
                                size="small"
                                @input='IpChange(IP)'
                                clearable>
                              </el-input>
                              <span class="tip" v-show="!ipValid">您输入的ip不合法</span>
                            </div>
                        </li>
                        <li>
                            <span><i class="red">*</i>设备编号</span>
                            <div>
                              <el-input
                                placeholder="请输入设备编号(45个字符以内)"
                                :class="{'not-input': number.length<1&&check}"
                                v-model="number"
                                :maxlength="45"
                                size="small"
                                @input='numberChange(number)'
                                clearable>
                              </el-input>
                              <span class="tip" v-show="!numberValid">{{this.baseSupportStr}}</span>
                            </div>
                        </li>
                        <li>
                            <span><i class="red">*</i>设备名称</span>
                            <div>
                              <el-input
                                :class="{'not-input': name.length<1&&check}"
                                placeholder="请输入设备名称(45个字符以内)"
                                :maxlength="45"
                                v-model="name"
                                @input='nameChange(name)'
                                size="small"
                                clearable>
                              </el-input>
                              <span class="tip" v-show="!nameValid">{{this.baseSupportStr}}</span>
                            </div>
                        </li>
                        <li>
                            <span><i class="red">*</i>设备类型</span>
                            <el-select
                              :class="{'not-input': !type&&check}"
                              placeholder="请选择设备类型"
                              v-model="type"
                              size="small"
                              @change = "devTypeChange"
                              clearable>
                              <el-option v-for="(item, index) in options" 
                                :key="index"
                                :value="item.value"
                                :label="item.label"
                              ></el-option>
                            </el-select>
                        </li>
                        <li>
                            <span>设备MAC地址</span>
                            <div>
                              <el-input
                                placeholder="请输入MAC(17个字符)"
                                :maxlength="17"
                                v-model="deviceMac"
                                @input='MACChange(deviceMac)'
                                size="small"
                                clearable>
                              </el-input>
                              <span class="tip" v-show="!MACValid">{{this.macSupportStr}}</span>
                            </div>
                        </li>
                        <li>
                          <span>{{deviceSettingList[0].span}}</span>
                          <div>
                            <el-select
                              placeholder="请选择区域"
                              v-model="deviceSettingList[0].model"
                              size="small"
                              @change="devTypeChange"
                              clearable
                            >
                              <el-option v-for="(item, index) in areaList" 
                                :key="index"
                                :value="item.value"
                                :label="item.label"
                              ></el-option>
                            </el-select>
                          </div>
                        </li>
                        <li v-for="(item, index) in deviceSettingList.slice(1,3)" :key="index">
                          <span :class="{sp: item.sp}">{{item.span}}</span>
                          <div v-if="item.validateFn == 'latFn'">
                            <el-input
                              :placeholder="'请输入' + item.span"
                              v-model="item.model"
                              @input='latFn(item, index+1, true)'
                              size="small"
                              :maxlength="item.maxlength || 20"
                              clearable>
                            </el-input>
                            <span class="tip" v-show="!item.validate">经度范围在-90到90之间！</span>
                          </div>
                          <div v-if="item.validateFn == 'lngFn'">
                            <el-input
                              :placeholder="'请输入' + item.span"
                              v-model="item.model"
                              @input='lngFn(item, index+1, true)'
                              size="small"
                              :maxlength="item.maxlength || 20"
                              clearable>
                            </el-input>
                            <span class="tip" v-show="!item.validate">经度范围在-180到180之间！</span>
                          </div>
                        </li>
                         <li>
                            <span>设备地址</span>
                            <div>
                              <el-input
                                type="textarea"
                                placeholder="请输入设备地址(150个字符以内)"
                                v-model="address"
                                size="small"
                                resize="none"
                                :rows="4"
                                :maxlength="150"
                                @input='addressChange(address)'>
                              </el-input>
                            </div>
                        </li>
                    </ul>
                </el-collapse-item>
               
                <el-collapse-item
                  :title="collapseLists[1]"
                  :name="collapseLists[1]"
                  >
                  <ul class="half-line clearfix">
                    <li v-for="(item, index) in deviceSettingList.slice(3)" :key="item.key">
                      <span :class="{sp: item.sp}">{{item.span}}</span>
                      <div v-if="item.validateFn == 'normalNumberAriValidateFn'">
                        <el-input
                          :placeholder="'请输入' + item.span"
                          v-model="item.model"
                          @input='normalNumberAriValidateFn(item, index+3)'
                          size="small"
                          :maxlength="item.maxlength || 20"
                          clearable>
                        </el-input>
                        <span class="tip" v-show="!item.validate">请输入合法数字！</span>
                        <span class="tip" v-show="item.openTip">&nbsp;</span>
                      </div>
                      <div v-if="item.validateFn == 'latFn'">
                        <el-input
                          :placeholder="'请输入' + item.span"
                          v-model="item.model"
                          @input='latFn(item, index+3)'
                          size="small"
                          :maxlength="item.maxlength || 20"
                          clearable>
                        </el-input>
                        <span class="tip" v-show="!item.validate">经度范围在-90到90之间！</span>
                        <span class="tip" v-show="item.openTip">&nbsp;</span>
                      </div>
                      <div v-if="item.validateFn == 'lngFn'">
                        <el-input
                          :placeholder="'请输入' + item.span"
                          v-model="item.model"
                          @input='lngFn(item, index+3)'
                          size="small"
                          :maxlength="item.maxlength || 20"
                          clearable>
                        </el-input>
                        <span class="tip" v-show="!item.validate">经度范围在-180到180之间！</span>
                        <span class="tip" v-show="item.openTip">&nbsp;</span>
                      </div>
                    </li>
                    <li v-for="(item, index) in arithmeticLists" :key="index">
                      <span :class="{sp: item.sp}">{{item.span}}</span>
                      <div v-if="item.validateFn == 'normalNumberAriValidateFn'">
                        <el-input
                          :placeholder="'请输入' + item.span"
                          v-model="item.model"
                          @input='normalNumberAriValidateFn(item, index)'
                          size="small"
                          :maxlength="item.maxlength || 10"
                          clearable>
                        </el-input>
                        <span class="tip" v-show="!item.validate">请输入合法数字！</span>
                        <span class="tip" v-show="item.openTip">&nbsp;</span>
                      </div>
                      <div v-if="item.validateFn == 'latFn'">
                        <el-input
                          :placeholder="'请输入' + item.span"
                          v-model="item.model"
                          @input='latFn(item, index)'
                          size="small"
                          :maxlength="item.maxlength || 20"
                          clearable>
                        </el-input>
                        <span class="tip" v-show="!item.validate">经度范围在-90到90之间！</span>
                        <span class="tip" v-show="item.openTip">&nbsp;</span>
                      </div>
                      <div v-if="item.validateFn == 'lngFn'">
                        <el-input
                          :placeholder="'请输入' + item.span"
                          v-model="item.model"
                          @input='lngFn(item, index)'
                          size="small"
                          :maxlength="item.maxlength || 20"
                          clearable>
                        </el-input>
                        <span class="tip" v-show="!item.validate">经度范围在-180到180之间！</span>
                        <span class="tip" v-show="item.openTip">&nbsp;</span>
                      </div>
                      <div v-else-if="item.validateFn == 'powerZeroNumberAriValidateFn'">
                        <el-input
                          :placeholder="'请输入' + item.span"
                          v-model="item.model"
                          size="small"
                          @input='powerZeroNumberAriValidateFn(item, index)'
                          :maxlength="item.maxlength || 10"
                          clearable>
                        </el-input>
                        <span class="tip" v-show="!item.validate">请输入大于0的数字！</span>
                        <span class="tip" v-show="item.openTip">&nbsp;</span>
                      </div>
                      <div v-else-if="item.validateFn == 'pathAriValidateFn'">
                        <el-input
                          :placeholder="'请输入' + item.span"
                          v-model="item.model"
                          size="small"
                          @input='pathAriValidateFn(item, index)'
                          :maxlength="item.maxlength || 10"
                          clearable>
                        </el-input>
                        <span class="tip" v-show="!item.validate">请正确输入路径！</span>
                        <span class="tip" v-show="item.openTip">&nbsp;</span>
                      </div>
                      <div v-else-if="item.validateFn == 'gpuAriValidateFn'">
                        <el-input
                          :placeholder="'请输入' + item.span"
                          v-model="item.model"
                          size="small"
                          @input='gupAriValidateFn(item, index)'
                          :maxlength="1"
                          clearable>
                        </el-input>
                        <span class="tip" v-show="!item.validate">gup编号为0-3之间</span>
                        <span class="tip" v-show="item.openTip">&nbsp;</span>
                      </div>
                      <div v-else-if="item.validateFn == 'intAriValidateFn'">
                        <el-input
                          :placeholder="'请输入' + item.span"
                          v-model="item.model"
                          size="small"
                          @input='intAriValidateFn(item, index)'
                          :maxlength="2"
                          clearable>
                        </el-input>
                        <span class="tip" v-show="!item.validate">请输入整数</span>
                        <span class="tip" v-show="item.openTip">&nbsp;</span>
                      </div>
                    </li>
                  </ul>
                </el-collapse-item>
            </el-collapse>
            <div class="edit-btns">
                <el-button size="small" type="primary" v-if="this.$route.query.id" @click="save">保存</el-button>
                <el-button size="small" type="primary" v-else @click="submit">新增</el-button>
                <el-button size="small" type="default" @click="cancle">取消</el-button>
            </div>
        </div>
    </el-main>
</div>
</template>
<script>
import BASE from './js/basePath'
import {errorException} from './js/tip'
const BASEPATH = BASE.BASEPATH
const  BASEPATH2 = BASE.BASEPATH2
const COLLAPSELISTS = ["基本设置", "算法参数设置"]

export default {
  name: 'DeviceEdit',
  data() {
    return {
      collapseLists: COLLAPSELISTS,
      aciveCollapse: [COLLAPSELISTS[0]],

      IP: "",
      name: "",
      type: "",
      deviceMac: "",
      options: [],
      areaList: [],
      number: "",
      address: "",

      deviceSettingList: [
        { openTip: false, validate: true, span: '设备区域', model: '', key: 'areaId' },
        { openTip: false, validate: true, validateFn: 'latFn', span: '设备纬度', model: '', key: 'lat' },
        { openTip: false, validate: true, validateFn: 'lngFn', span: '设备经度', model: '', key: 'lng' },
      ],

  // 默认长度为10
      arithmeticLists: [
        { openTip: false, validate: true, validateFn: 'normalNumberAriValidateFn', span: '设备盲区距离(m)', model: '', key: 'blindLength' },
        { openTip: false, validate: true, validateFn: 'normalNumberAriValidateFn', span: '设备监控总距离(m)', model: '', key: 'totalLength' },
        { openTip: false, validate: true, validateFn: 'normalNumberAriValidateFn', span: '设备监控水平最小宽度(m)', model: '', key: 'leastWidth', sp: true},
        { openTip: false, validate: true, validateFn: 'latFn', span: '监控画面中轴点纬度', model: '', key: 'videoMidLat' },
        { openTip: false, validate: true, validateFn: 'lngFn', span: '监控画面中轴点经度', model: '', key: 'videoMidLng' },
        { openTip: false, validate: true, validateFn: 'normalNumberAriValidateFn', span: '监控画面中轴点距设备的距离(m)', model: '', key: 'videoMidLength',sp: true },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '监控有效面积', model: '', key: 'validArea' },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '监控盲区面积', model: '', key: 'blindArea' },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '内外框左侧间隔', model: '', key: 'leftX' },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '内外框右侧间隔', model: '', key: 'rightX' },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '内外框上侧间隔', model: '', key: 'topY' },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '内外框下侧间隔', model: '', key: 'bottomY' },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '第一根检测线起点', model: '', key: 'line1A', maxlength: 40 },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '第一根检测线终点', model: '', key: 'line1B', maxlength: 40 },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '第二根检测线起点', model: '', key: 'line2A', maxlength: 40 },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '第二根检测线终点', model: '', key: 'line2B', maxlength: 40 },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '帧数阈值', model: '', key: 'threshImgNum'},
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '位置差阈值', model: '', key: 'threshHeadY' },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: 'X方向阈值', model: '', key: 'threshDisX' },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: 'Y方向阈值', model: '', key: 'threshDisY' },
        {openTip: false, validate:true, validateFn: 'pathAriValidateFn', span: '摄像头路径', model: '', key: 'videoPath', type: 'path', maxlength: 100 },
        {openTip: false, validate:true, validateFn: 'gpuAriValidateFn', span: 'GPU编号', model: '', key: 'gpuNo'},
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '相隔多少帧检测', model: '', key: 'frameInterval', maxlength: 5 },
        {openTip: false, validate:true, validateFn: 'normalNumberAriValidateFn', span: '进出方向', model: '', key: 'directionInOut'},
        {openTip: false, validate:true, validateFn: 'pathAriValidateFn', span: '模型配置参数路径', model: '', key: 'prototxt', type: 'path', maxlength: 100 },
        {openTip: false, validate:true, validateFn: 'pathAriValidateFn', span: '模型路径', model: '', key: 'caffemodel', type: 'path', maxlength: 100  },
        {openTip: false, validate:true, validateFn: 'pathAriValidateFn', span: '读写文件地址', model: '', key: 'filePath', type: 'path', maxlength: 100 },
      ],
      check: false,
      deviceId: '',
      ipValid: true,
      numberValid: true,
      nameValid: true,
      addressValid: true,
      configFlag: '0',
      MACValid: true,
      baseSupportStr: '请使用"汉字"、"字母"、"数字"、"_"、"-"',
      macSupportStr: '请输入合法的MAC地址（支持 - 或 : 间隔方式）',
      baseReg: /^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,45}$/
    };
  },
  created(){
    this._getDevTypeList()
    this._getAreaList()
    let id = this.$route.query.id
    if (id) {
      this.deviceId =id
      this._getDetail(id)
    }
  },

  methods: {
    _getAreaList() {
      this.$axios.get(BASEPATH + '/info/area/getAllSysArea')
        .then(( data )=>{
          data.data && data.data.forEach(( v ) => {
            this.areaList.push({ label: v.areaName, value: v.areaId })
          })
        })
        .catch(( e )=>{  errorException(this, e)  })
    },
    _getDetail(id){
      this.$axios({
        method: 'GET',
        url: BASEPATH + '/info/deviceManage/findDevInfoDetail/' + id
      })
        .then(( data )=>{
          data = data.data
          this.configFlag = data.configFlag
          let mapObj = {IP:'deviceIp', name: 'deviceName', type: 'deviceTypeId', address: 'deviceAdrr', number: 'deviceNo'}
          for (const key in mapObj) {
            this[key] = data[mapObj[key]]
          }
          this.deviceMac = data.deviceMac || ''// 防止length报错
          this.type = data.deviceTypeId
          for (let i = 0, len = this.arithmeticLists.length; i < len; i++) {
            let item = this.arithmeticLists[i]
            item.model = data[item.key] || ''
          }
          for (let i = 0, len = this.deviceSettingList.length; i < len; i++) {
            let item = this.deviceSettingList[i]
            item.model = data[item.key] || ''
          }
        })
         .catch(( e )=>{  errorException(this, e)})
    },
    _save(data) {
      this.$axios({
        method: 'POST',
        url: BASEPATH + '/info/deviceManage/updateDevInfo',
        params: data
      }).then((  )=>{
            this.showMessage(true, '保存成功')
            setTimeout(() => {
              this.$router.push({name: 'deviceManage'})
            }, 1000);
        }).catch(( e )=>{  errorException(this, e)  })
    },
    _getDevTypeList(){
      this.$axios.get(BASEPATH + '/info/deviceManage/findDevTypeList')
        .then(( data )=>{
          this.options = []
          for (let i = 0, l = data.data.length; i < l; i++) {
            let item = data.data[i]
            this.options.push({label: item.deviceTypeName, value: item.deviceTypeId, configFlag: item.configFlag})
          }
        })
         .catch(( e )=>{  errorException(this, e)  })
    },
    cancle() {
      this.$router.push({ name: "deviceManage" });
    },
    save(){
      if (!this.validateBeforeSubmitAndSave())  return

      let data = this.collectData();
      data = this.map(data)
      data.id = this.deviceId
      data.deviceMac = this.deviceMac
      this._save(data)
    },
    checkAriArg(){
      for (let i = 0, len = this.arithmeticLists.length; i < len; i++) {
        let item = this.arithmeticLists[i]
        if (!item.validate) {
          this.aciveCollapse = [COLLAPSELISTS[0], COLLAPSELISTS[2]]
          return false
        }
      }
      return true
    },
    
    submit() {
      if (!this.validateBeforeSubmitAndSave())  return
      
      let data = this.collectData();
      data = this.map(data)
      data.deviceMac = this.deviceMac
      this.$axios({
        method: 'post',
        url: BASEPATH + '/info/deviceManage/createDevInfo',
        params: data
      })
        .then((  )=>{
          this.$message({
            type: 'success',
            message: '新增成功！'
          });
          setTimeout(() => {
            this.$router.push({name: 'deviceManage'})
          }, 1000);
        })
        .catch(( e )=>{ errorException(this, e)  })
    },
    devTypeChange(e){
      for (let i = 0, len = this.options.length; i < len; i++) {
        let item = this.options[i]
        if(item.value == e) {
          this.configFlag = item.configFlag
          break
        }
      }
      if (this.configFlag == '1') {
          this.aciveCollapse = ['基本设置']
      }
    },
    MACChange(MAC){
      var reg1 = /^[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}$/i
      var reg2 = /^[A-F\d]{2}\-[A-F\d]{2}\-[A-F\d]{2}\-[A-F\d]{2}\-[A-F\d]{2}\-[A-F\d]{2}$/i
      this.MACValid = reg1.test(MAC) || reg2.test(MAC) || !MAC
    },
    collapseChange(e){
      let flag = false
      for (let i = 0, len = e.length; i < len; i++) {
        if (e[i].indexOf('算法') !== -1) {
          flag = true
          break
        }
      }
      if (this.configFlag == '1' && flag) {
        this.showWarningBox('当前设备类型的视角为不可配置，所以算法参数不可设置')
          .then((  )=>{
            this.aciveCollapse = ['基本设置']
          })
          .catch((  )=>{
            this.aciveCollapse = ['基本设置']
          })
      }
    },
    IpChange(value){
      this.ipValid = this.checkIP(value)
    },
    numberChange(value){
      this.numberValid = this.baseReg.test(value)
    },
    nameChange(value){
      this.nameValid = this.baseReg.test(value)
    },
    addressChange(value){
      this.addressValid = true
    },
    ariCheck(item, index, reg, isDevice){
      let relativeItem = isDevice ? this.getRelativeItemDeviceSetting(index): this.getRelativeItem(index)
      item.validate = !item.model.length || reg.test(item.model)

      if (!item.validate || !relativeItem.validate) { 
        // at least has a error
        item.validate && (item.openTip = true)
        relativeItem.validate && (relativeItem.openTip = true)
      }else {
        // all success
        relativeItem.openTip = false
        item.openTip = false
      }
    },
    // /(^[1-9]\d*\.?)|(^0\.)\d*/
    normalNumberAriValidateFn(item, index, isDevice){
      this.ariCheck(item, index, /(^[1-9]{1}\d*(\.\d+)?$)|(^0(\.\d+)?$)/, isDevice)// 正数负数小数
    },
    // -90 , 90
    latFn(item, index, isDevice) {
      this.ariCheck(item, index, /(^[+-]?90(\.0+)?$)|(^([+-]?[0-8]\d(\.\d+)?)$)|(^[+-]?\d(\.\d+)?$)/, isDevice)
    },
    // -180 180
    lngFn(item, index, isDevice) {
      this.ariCheck(item, index, /(^[+-]?180(\.0+)?$)|(^([+-]?1[0-7]\d(\.\d+)?)$)|(^[+-]?\d{1,2}(\.\d+)?$)/, isDevice)
    },
    intAriValidateFn(item, index) {
      this.ariCheck(item, index, /(^[1-9]\d*$)|(^0$)/)// 整数
    },
    powerZeroNumberAriValidateFn(item, index) {
      this.ariCheck(item, index, /^\d+(\.\d+)?$/)// 大于0的数字
    },
    pathAriValidateFn(item, index){
      this.ariCheck(item, index, /^[\u4E00-\u9FA5\uF900-\uFA2D\w-.\\\/:]{1,100}$/)// 路径
    },
    gupAriValidateFn(item, index){
      this.ariCheck(item, index, /^[0-3]{1}$/)// 0 - 3
    },
    inoutAriValidateFn(item, index){
      this.ariCheck(item, index, /^[0-1]{1}$/)// 0 - 1
    },
    getRelativeItem(index){
      if(index == this.arithmeticLists.length - 1) return {}
      let relativeItemIndex = index + (index % 2 == 1 ? -1: 1)
      return this.arithmeticLists[relativeItemIndex]
    },
    getRelativeItemDeviceSetting(index){
      if(index == this.deviceSettingList.length - 1) return {}
      let relativeItemIndex = index + (index % 2 == 1 ? -1: 1)
      return this.deviceSettingList[relativeItemIndex]
    },
    checkRequire(arr) {
      this.check = true;
      let temp,
        res = true;
      for (let i = 0, len = arr.length; i < len; i++) {
        temp = this[arr[i]];
        typeof temp === "string" ? (this[arr[i]] = temp = temp.trim()) : "";
        if (temp.length < 1) {
          res = false;
        }
      }
      return res;
    },
    collectData() {
      let o = {};
      o.IP = this.IP;
      o.name = this.name;
      o.type = this.type;
      o.address = this.address;

      this.number ? (o.number = this.number) : "";
      let arr = this.arithmeticLists;
      for (let i = 0, len = arr.length; i < len; i++) {
        if ((arr[i].model + '').trim()) {
          o[arr[i].key] = (arr[i].model + '').trim();
        }
      }
      let arrDevice = this.deviceSettingList;
      for (let i = 0, len = arrDevice.length; i < len; i++) {
        if ((arrDevice[i].model + '').trim()) {
          o[arrDevice[i].key] = (arrDevice[i].model + '').trim();
        }
      }
      return o;
    },
    map(data){
      let mapObj = {IP:'deviceIp', name: 'deviceName', type: 'deviceTypeId', address: 'deviceAdrr', number: 'deviceNo'}
      for (const key in data) {
        if (mapObj[key]) {
          data[mapObj[key]] = data[key]
          delete data[key]
        }
      }
      return data
    },
    checkIP(ip) {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      return reg.test(ip)
    },
    showWarningBox(tip){
      return this.$confirm(tip, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
    },
    showMessage(isSuccess, msg){
      if (isSuccess) {
        this.$message.success(msg)
      }else {
        this.$message.error(msg)
      }
    },
    validateBeforeSubmitAndSave() {
      if (!this.checkRequire(["IP", "name", "type", 'number'])) {
        this.showWarningBox('请完整填写字段!').catch(()=>{})
        return false
      }
      if (!this.ipValid) {
        this.showWarningBox('IP字段不合法！').catch((  )=>{})
        return false
      }
      if (!this.numberValid) {
        this.showWarningBox('设备编号字段不合法！').catch((  )=>{})
        return false
      }
      if (!this.nameValid) {
        this.showWarningBox('设备名称字段不合法！').catch((  )=>{})
        return false
      }
      if (!this.MACValid) {
        this.showWarningBox('MAC地址字段不合法！').catch((  )=>{})
        return false
      }
      if (!this.checkAriArg()) {
        this.showWarningBox('算法参数设置有误，请重新检查！')
        return false
      }
      if (!this.checkDeviceArg()) {
        this.showWarningBox('设备位置设置有误，请重新检查！')
        return false
      }
      return true
    },
    checkDeviceArg(){
      for (let i = 0, len = this.deviceSettingList.length; i < len; i++) {
        let item = this.deviceSettingList[i]
        if (!item.validate) {
          this.aciveCollapse = [COLLAPSELISTS[0], COLLAPSELISTS[1]]
          return false
        }
      }
      return true
    },
  }
};
</script>
<style lang="scss">
$input_color: #dcdfe6;
$input_warn_color: #f35151;

.equipment-edit {
  .el-form-item {
    width: 50%;
    float: left;
  }
  .arithmetic-ruleForm {
    padding: 30px 2% 0 0;
  }
  .el-collapse-item__content {
    text-align: left;
  }
}

.equipment-edit {
  font-size: 12px;
  line-height: 30px;
  border: 1px solid #ccc;
  width: 100%;
  .all-line {
    padding: 25px 5% 0px 5%;
    .tip {
      float: left;
      position: inherit !important;
      left: 0;
      width: 100%;
      text-align: left;
      color: red;
    }
  }
  .half-line {
    .tip {
      float: left;
      color: red;
    }
  }
  .el-collapse-item__header {
    position: relative;
    text-align: left;
    padding-left: 50px;
    font-weight: bolder;
    &.is-active {
      background-color: #f5f5f5;
    }
  }
  .el-collapse-item__arrow {
    position: absolute;
    right: 20px;
  }
  .equipment-edit .el-collapse-item .el-collapse-item__header.is-active {
    background-color: #f5f5f5;
  }
  li {
    position: relative;
    float: left;
    font-size: 12px;
    line-height: 32px;
    padding: 5px 0 5px 80px;
    width: 50%;
    box-sizing: border-box;
    min-width: 300px;
    margin-left: 1px;
    > span {
      position: absolute;
      left: 0px;
      &.sp {
        line-height: 16px;
        word-wrap: break-word;
        word-break: break-all;
        width: 105px;
      }
    }
    .el-select--small {
      width: 100%;
    }
    .el-checkbox-group {
      text-align: left;
      .el-checkbox {
        margin-left: 0;
        padding-right: 30px;
      }
    }
    input,
    textarea,
    .el-checkbox__label {
      font-size: 12px;
    }
  }

  .half-line {
    padding: 25px 3% 0 3%;
    min-width: 700px;
    li {
      margin-left: 0;
      padding-left: 110px;
      width: 48%;
      &:nth-child(even) {
        float: right;
      }
    }
  }

  // 高亮没有输入的必填项
  .not-input {
    .el-input__inner,
    .el-textarea__inner {
      border-color: $input_warn_color;
    }
  }
  .red {
    color: red;
  }
  .edit-btns {
    padding: 30px 0;
  }
  .edit-btns button {
    width: 100px;
  }
}
</style>