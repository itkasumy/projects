<template>
<div class="device-type-edit">
 <el-main>
    <div class="dte add-page">
        <div class="dte-box ap-border">
            <h2 class="page-title ap-title" v-if="devTypeId">编辑设备类型</h2>
            <h2 class="page-title ap-title" v-else>新增设备类型</h2>
            <ul>
                <li class="input-item clearfix">
                    <span><i class="red">*</i>新增设备类型</span>
                    <div>
                      <el-input
                          :class="{'not-input': deviceTypeName.length<1&&check}"
                          v-model="deviceTypeName"
                          :maxlength="45"
                          placeholder="请输入类型名称(45个字符以内)"
                          size="small"
                          @input='typeNameChange(deviceTypeName)'
                          clearable>
                      </el-input>
                      <span class="tip" v-show="!deviceTypeNameValid">{{this.baseSupportStr}}</span>
                    </div>
                </li>
                <li class="radio-item" id="radio-item">
                    <span><i class="red">*</i>类型图标</span>
                    <el-radio-group v-model="deviceTypeIcon">
                       <div>
                          <el-radio label="camera">
                          </el-radio>
                       </div>
                       <div>
                        <el-radio label="wifi">
                        </el-radio>
                       </div>
                       <div>
                        <el-radio label="radar">
                        </el-radio>
                       </div>
                       <div>
                        <el-radio label="swan">
                        </el-radio>
                       </div>
                       <div>
                        <el-radio label="H1">
                        </el-radio>
                       </div>
                       <div>
                        <el-radio label="helmet">
                        </el-radio>
                       </div>
                       <div>
                        <el-radio label="other">
                        </el-radio>
                       </div>
                    </el-radio-group>
                </li>
                <li class="select">
                  <span><i class="red">*</i>监控视角</span>
                    <el-select size="small" v-model="configFlag">
                      <el-option value="1" label="不可配置监控视角"></el-option>
                      <el-option value="0" label="可配置监控视角"></el-option>
                    </el-select>
                </li>
                <li class="input-item">
                    <span>&nbsp;备注</span>
                    <div>
                      <el-input
                          type="textarea"
                          placeholder="请输入备注文本(150个字符以内)"
                          v-model="deviceTypeRemark"
                          size="small"
                          :rows="4"
                          resize="none"
                          :maxlength="150"
                          @input='deviceTypeRemarkChange(deviceTypeRemark)'
                          clearable>
                      </el-input>
                      <span class="tip" v-show="!deviceTypeNameRemarkValid">{{this.baseSupportStr}}</span>
                    </div>
                </li>
            </ul>
            <div class="edit-btns ap-btns">
                <el-button size="small" type="primary" @click="save" v-if="this.devTypeId">保存</el-button>
                <el-button size="small" type="primary" @click="submit" v-else>新增</el-button>
                <el-button size="small" type="default" @click="cancle">取消</el-button>
            </div>
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

export default {
  data() {
    return {
      deviceTypeName: "",
      deviceTypeIcon: "",
      deviceTypeRemark: "",
      inputEle: {},
      check: false,
      configFlag: '0',
      deviceTypeNameValid: true,
      deviceTypeNameRemarkValid: true,
      devTypeId: '',
      baseSupportStr: '请使用"汉字"、"字母"、"数字"、"_"、"-"',
      baseReg: /^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,45}$/
    };
  },
  created(){
    let id = this.$route.query.id
    if (id) {
      this.devTypeId =id
      this._getDetail(id)
    }
  },
  methods: {
    _getDetail(id){
      let url = BASEPATH + '/info/deviceManage/findDevTypeDetail/'+ id +'?timestamp=' + new Date().getTime()
      this.$axios({
        method: 'GET',
        url: url
      })
      .then(( data )=>{
          data = data.data
          this.deviceTypeName = data.deviceTypeName
          this.deviceTypeRemark = data.deviceTypeRemark
          this.deviceTypeIcon = data.deviceTypeIcon
          this.configFlag = data.configFlag
      })
      .catch(e => errorException(this, e))
    },
    _edit(){
       this.$axios({
        method: 'POST',
        url: BASEPATH + '/info/deviceManage/updateDevType/?timestamp=' + new Date().getTime(),
        params: {
          deviceTypeName: this.deviceTypeName.trim(),
          deviceTypeIcon: this.deviceTypeIcon,
          deviceTypeRemark: this.deviceTypeRemark.trim(),
          deviceTypeId: this.devTypeId,
          configFlag: this.configFlag
        }
      }).then((  )=>{
          this.$message.success('修改成功！')
          setTimeout(() => {
            this.$router.push({ name: "deviceType" });
          }, 500);
      }).catch( e => errorException(this, e))
    },
    
    _add() {
      this.$axios({
        method: 'POST',
        url: BASEPATH + '/info/deviceManage/createDevType?timestamp=' + new Date().getTime(),
        params: {
          deviceTypeName: this.deviceTypeName.trim(),
          deviceTypeIcon: this.deviceTypeIcon,
          deviceTypeRemark: this.deviceTypeRemark.trim(),
          configFlag: this.configFlag,
        }
      })
        .then((  )=>{
          this.$message.success('新增成功')
          setTimeout(() => {
            this.$router.push({ name: "deviceType" });
          }, 500);
        }).catch(( e )=>{  errorException(this, e)  })
    },
    cancle() {
      this.$router.push({ name: "deviceType" });
    },
    typeNameChange(value){
      // let reg = /^[\u4E00-\u9FA5\uF900-\uFA2D\w-.\\]{1,45}$/
      this.deviceTypeNameValid = this.baseReg.test(value)
      },
    deviceTypeRemarkChange(value){
      if(value.length>0){
        let reg = /^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,150}$/
        this.deviceTypeNameRemarkValid = reg.test(value)
      }else {
        this.deviceTypeNameRemarkValid = true
      }
    },
    submit() {
      if (!this.checkRequire(["deviceTypeName"])) {
        this.showWarningBox('请按要求填写必填字段!').catch(() => {});
        return;
      }
      if (!this.deviceTypeNameValid) {
        this.showWarningBox('设备类型名称字段不合法!').catch(() => {});
        return
      }
      if (!this.deviceTypeIcon) {
        this.showWarningBox('请选择类型图标!').catch(() => {});
        return;
      }
      if (!this.deviceTypeNameRemarkValid) {
        this.showWarningBox('备注字段不合法!').catch(() => {});
        return
      }
      this._add()
    },
    save(){
      if (!this.checkRequire(["deviceTypeName"])) {
        this.showWarningBox('请按要求填写必填字段!').catch(() => {});
        return;
      }
      if (!this.deviceTypeNameValid) {
        this.showWarningBox('设备类型名称字段不合法!').catch(() => {});
        return
      }
      if (!this.deviceTypeIcon) {
        this.showWarningBox('请选择类型图标!').catch(() => {});
        return;
      }
      if (!this.deviceTypeNameRemarkValid) {
        this.showWarningBox('备注字段不合法!').catch(() => {});
        return
      }
      this._edit()
    },
    preventBack(arr) {
      for (let i = 0, len = arr.length; i < len; i++) {
        if (this[arr[i]]) {
          return true;
        }
      }
      return false;
    },
    checkRequire(arr) {
      this.check = true;
      let temp,
        res = true;
      for (let i = 0, len = arr.length; i < len; i++) {
        temp = this[arr[i]];
        typeof temp === "string" ? (this[arr[i]] = temp = temp.trim()) : "";
        if (!temp.length) {
          res = false;
        }
      }
      return res;
    },
    showWarningBox(tip){
      return this.$confirm(tip, '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
    }
  }
};
</script>
<style lang="scss">
$input_warn_color: #f35151;
@import "../../common/css/addPageCommon.scss";
.device-type-edit {
  .red {
    color: red;
    line-height: 32px;
  }
  .input-item span.tip {
    float: left;
    color: red;
  }
  .not-input {
    .el-input__inner,
    .el-textarea__inner {
      border-color: $input_warn_color;
    }
  }
  #radio-item {
    .el-radio-group {
      div {
        width: 25%;
        height: 80px;
        margin-bottom: 5px;
        float: left;
        label {
          height: 80px;
          width: 80px;
          padding: 0;
          background: transparent url('../../assets/images/ico_01.png') 
          left center no-repeat no-repeat;
          background-size: 78px 78px;
          &.is-checked {
            background: transparent url('../../assets/images/ico_focus_01.png')
              -9px center no-repeat no-repeat;
            background-size: 96px 96px;
          }
          .el-radio__label {
            display: none;
          }
        }
        &:nth-child(1) {
          label {
            background-image: url('../../assets/images/ico_01.png');
            &.is-checked {
              background-image: url('../../assets/images/ico_focus_01.png');
            }
          }
        }
        &:nth-child(2) {
          label {
            background-image: url('../../assets/images/ico_02.png');
            &.is-checked {
              background-image: url('../../assets/images/ico_focus_02.png');
            }
          }
        }
        &:nth-child(3) {
          label {
            background-image: url('../../assets/images/ico_03.png');
            &.is-checked {
              background-image: url('../../assets/images/ico_focus_03.png');
            }
          }
        }
        &:nth-child(4) {
          label {
            background-image: url('../../assets/images/ico_04.png');
            &.is-checked {
              background-image: url('../../assets/images/ico_focus_04.png');
            }
          }
        }
        &:nth-child(5) {
          label {
            background-image: url('../../assets/images/ico_05.png');
            &.is-checked {
              background-image: url('../../assets/images/ico_focus_05.png');
            }
          }
        }
        &:nth-child(6) {
          label {
            background-image: url('../../assets/images/ico_06.png');
            &.is-checked {
              background-image: url('../../assets/images/ico_focus_06.png');
            }
          }
        }
        &:nth-child(7) {
          label {
            background-image: url('../../assets/images/ico_07.png');
            &.is-checked {
              background-image: url('../../assets/images/ico_focus_07.png');
            }
          }
        }
      }
    }
  }
  .el-radio__input {
    display: none;
  }
}
</style>