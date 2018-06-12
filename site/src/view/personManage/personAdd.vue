<template>
 <div class="back">
	<el-container id="mc">
	<el-aside id="my-aside">
		<div id="demo" class="demo"></div>
		<div class="my-container fl">
			<div class="title">新增重点人员</div>
			<div class="img-edit">
				<div>
          <el-upload action=""
					:limit="5"
					:auto-upload="false"
					:on-exceed="handleExceed"
					:on-preview="handlePreview"
					:on-success="changeUpload"
					ref="upload1"
					:before-upload="beforeUpload"
					multiple
					:show-file-list="false"
					:http-request="submitUpload"
					:on-change="changeUpload"
					:file-list="imageSrcs"
					:disabled="imgUploadDisable">
          <img :src="defaultImg" class="my-img">
          <img src="../../assets/images/mark_toPhoto.png" class="fl setDefaultButton" v-show="setToButtonShow && (uploadDefaultImg != defaultImg)" @click="setDefaultImg">
          <img src="../../assets/images/mark_defaultPhoto.png" class="fl setDefaultButton" v-show="uploadDefaultImg == defaultImg">
          </el-upload>
				</div>
				<div class="b-edit">
					<el-upload action=""
					:limit="5"
					:auto-upload="false"
					:on-exceed="handleExceed"
					:on-preview="handlePreview"
					:on-success="changeUpload"
					ref="upload"
					:before-upload="beforeUpload"
					multiple
					:show-file-list="false"
					:http-request="submitUpload"
					:on-change="changeUpload"
					:file-list="imageSrcs"
					style="height:0px;">
					<el-button size="small" v-show="showUploadButton" v-if="isAdd">添加</el-button>
					</el-upload>
					<el-button @click="submitAssess" size="small" v-show="showUploadButton" v-if="!isAdd">上传</el-button>
					<!-- <el-upload
						class="my-bt"
						action="http://kc-0001-1523.kuang-chi.org:8089/upload/uploadFile"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:before-remove="beforeRemove"
						:before-upload="beforeUpload"
						:on-success="uploadSuccess"
						multiple
						:limit="5"
						:on-exceed="handleExceed"
						:file-list="imageSrcs"
						:show-file-list="false"
						>
						<el-button>添加</el-button>
						</el-upload> -->
					<!-- <el-button class="my-bt">删除</el-button> -->
				</div>
			</div>
			<div class="img-container">
				<div class="small-img" :key="index"  v-for="(is, index) in imageSrcs">
					<img src="../../assets/images/img-close.png" class="close-icon" @click="deleteImg(is.url,index)">
					<img :src="is.url" class="sma" @click="updateDefaultImg(is.url)">
				</div>
			</div>
		</div>
	</el-aside>
        <el-main id="my-main">
			<el-form ref="form" :model="form" label-width="80px" class="my-form">
        <ul class="all-line clearfix">
                        <li>
                            <span><i class="red">*</i>姓名</span>
                            <el-input
                                v-model="form.name"
                                size="small"
                                :maxlength = 20
                                clearable
                                @change="validateName()"
                                placeholder="请输入姓名">
                            </el-input>
                           <i class="red">{{nameValidationMsg}}</i>
                        </li>
                        
                        <li>
                          <span><i class="red">*</i>身份证号</span>
                            <el-input
                                v-model="form.identity"
                                size="small"
                                clearable
                                @change="validateIdentity()"  
                                placeholder="请输入身份证号">
                            </el-input>
                            	<i class="red">{{identityValidationMsg}}</i>
                        </li>
                         <li>
                          <span>性别</span>
                            <el-radio-group v-model="form.sex">
                              <el-radio label="未知"></el-radio>
                              <el-radio label="男"></el-radio>
                              <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </li>
        </ul>
        <ul :key="index" v-for="(pam, index) in phoneamacs" class="half-line clearfix">
                        <li>
                          <span>手机号</span>
                            <el-input v-model="pam.phone" @change="validatePhoneNumber(index)" size="small"></el-input>
                        </li>
                        <li>
                            <span>MAC地址</span>
                            	<el-input v-model="pam.mac" @change="validateMacAdd(index)" size="small"></el-input>
                        </li>
                        <li>
                          <el-button @click="addPhoneamac(index)" v-if="index==0 || index==1" size="small">+</el-button>
                          <el-button @click="delPhoneamac(index)" v-if="index==1 || index==2" size="small">-</el-button>
                        </li>
                        <li>
                          <i class="red" >{{pam.phoneValidationMsg}}</i>
                        </li>
                        <li>
                          <i class="red">{{pam.macValidationMsg}}</i>
                        </li>
                        
        </ul>
        <ul class="all-line center clearfix">
<li>
                          <span>住址</span>
                            <el-input
                                v-model="form.address"
                                size="small"
                                clearable
                                :maxlength = 75 
                                placeholder="住址不能超过75字" 
                                @change="validateAddress()">
                            </el-input>
                            	<i class="red">{{addValidationMsg}}</i>
                        </li>
                        <li>
                          <span>备注</span>
                            <el-input
                                type="textarea" 
                                v-model="textarea" 
                                :rows = "3" 
                                :maxlength = 75 
                                placeholder="备注不能超过75字" 
                                size="small"
                                clearable
                                >
                            </el-input>
                        </li>
                        <li  class="enter">
                          <el-button type='primary' @click="onSubmit" size="small">新增</el-button>
				<el-button @click="onExit"  size="small">取消</el-button>
                        </li>
        </ul>
			<!-- <el-form-item label="*姓名" >
				<el-input v-model="form.name" class="my-input" :maxlength = 10 @change="validateName()"  placeholder="请输入姓名" size="small"></el-input>
				<span class="valMsg">{{nameValidationMsg}}</span>
			</el-form-item>
			<el-form-item label="性別">
				<el-radio-group v-model="form.sex">
					<el-radio label="未知"></el-radio>
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="*身份证号">
					<el-input v-model="form.identity" class="my-input" @change="validateIdentity()"  placeholder="请输入身份证号" size="small"></el-input>
					<span class="valMsg">{{identityValidationMsg}}</span>
			</el-form-item>
			</el-form>
			<el-form :inline="true" 
					ref="form" 
					:key="index" 
					v-for="(pam, index) in phoneamacs" 
					label-width="80px" 
					class="my-form">
				<el-form-item label="手机号">
						<el-input v-model="pam.phone" @change="validatePhoneNumber(index)" size="small"></el-input>
				</el-form-item>
				<el-form-item label="MAC地址">
						<el-input v-model="pam.mac" @change="validateMacAdd(index)" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="addPhoneamac(index)" v-if="index==0 || index==1" size="small">+</el-button>
					<el-button @click="delPhoneamac(index)" v-if="index==1 || index==2" size="small">-</el-button>
					<span class="valMsg">{{phoneValidationMsg}}</span>
					<span class="valMsg">{{macValidationMsg}}</span>
				</el-form-item>
			</el-form>
			<el-form  ref="form" :model="form" label-width="80px" class="my-form">
			<el-form-item label="住址">
					<el-input v-model="form.address" class="my-input" :maxlength = 75 placeholder="住址不能超过75字" @change="validateAddress()" size="small"></el-input>
					<span class="valMsg">{{addValidationMsg}}</span>
			</el-form-item>
			<el-form-item label="备注">
					<el-input type="textarea" v-model="textarea" :rows = "3" class="my-input" :maxlength = 75 placeholder="备注不能超过75字" size="small"></el-input>
			</el-form-item>
			<el-form-item class="enter">
				<el-button type='primary' @click="onSubmit" size="small">新增</el-button>
				<el-button @click="onExit"  size="small">取消</el-button>
			</el-form-item> -->
		</el-form>
        </el-main>
	</el-container>
 </div>
</template>

<style lang="scss" scoped>
@import "./common.scss";
$input_color: #dcdfe6;
$input_warn_color: #f35151;
.setDefaultButton{
  position: absolute;
  top: 87px;
  left: 40px;
}
.my-inl {
  display: inline;
}
.my-form {
  text-align: start;
}
.my-input {
  width: 38%;
}
.remark {
  width: 60%;
}
#mc {
  margin: 0 10px;
}

.enter button {
  width: 100px;
}
.all-line {
  padding: 0 5% 0 5%;
  li {
    position: relative;
    float: left;
    font-size: 12px;
    line-height: 32px;
    padding: 5px 0 5px 80px;
    width: 70%;
    box-sizing: border-box;
    min-width: 300px;
    > span {
      position: absolute;
      left: 10px;
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
}
// 高亮没有输入的必填项
// .not-input {
.el-input__inner,
.el-textarea__inner {
  width: 70%;
  border-color: $input_warn_color;
}
// }
.red {
  color: red;
}

.half-line {
  padding: 0 5% 0 5%;
  li {
    position: relative;
    float: left;
    font-size: 12px;
    line-height: 32px;
    padding: 0 0 5px 80px;
    width: 28%;
    box-sizing: border-box;
    min-width: 300px;
    > span {
      position: absolute;
      left: 10px;
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
}
</style>
<script >
import {
  validateIdentityCard,
  validatePhoneNumber,
  validateSpecialWords,
  validateMac
} from "./js/commonValidation.js";
export default {
  data() {
    return {
      form: {
        name: "",
        sex: "未知",
        identity: "",
        address: ""
      },
      textarea: "",
      phoneamacs: [
        {
          phone: "",
          mac: "",
          phoneValidationMsg:"",
          macValidationMsg:""
        }
      ],
      imageSrcs: [],
      uploadSrcs: [],
      identityValidationMsg: "",
      // phoneValidationMsg: "",
      // macValidationMsg: "",
      nameValidationMsg: "",
      addValidationMsg: "",
      canAddPhones: true,
      uploadId: null,
      defaultImg: require("../../assets/images/upload_default.png"),
      defaultImgId: "",
      showUploadButton:false,
      imgUploadDisable:false,
      isAdd:false,
      setToButtonShow:false,
      setDefaultButtonShow:false,
      uploadDefaultImg:''
    };
  },
  watch: {
    imageSrcs(val) {
      if(val.length == 0){
        this.showUploadButton = false;
        this.setToButtonShow = false;
        this.setDefaultButtonShow = false;
        return;
      }
      if (val.length > 0) {
        this.defaultImg = val[val.length - 1].url;
        if(this.defaultImgId == ""){
          this.defaultImgId = this.defaultImg.split("=")[1];
          this.uploadDefaultImg = this.defaultImg;
        }
        this.setToButtonShow = true;
      }
      if(val.length < 5){
        if(!this.isAdd){
          this.isAdd = true;
        }
        if(!this.showUploadButton){
          this.showUploadButton = true;
        }
      }
    },
    //todo 图片地址变化之后，判断不等于默认图片，则将图片点击效果去掉
    defaultImg(val){
      if(val.indexOf('data:image/png;base64') < 0){
        this.imgUploadDisable = true;
      }else{
        this.imgUploadDisable = false;
      }
    }
  },
  methods: {
    setDefaultImg:function(){
      this.uploadDefaultImg = this.defaultImg;
      this.defaultImgId = this.uploadDefaultImg.split("=")[1];
    },
    updateDefaultImg:function(imgUrl){
      this.defaultImg = imgUrl;
    },
    changeUpload: function(file, fileList) {
      //预览图片
      if (file.status === "ready") {
        this.uploadSrcs.push(file);
      }
      if(this.uploadSrcs.length > 0){
        this.showUploadButton = true;
        this.isAdd = false;
        this.imgUploadDisable = false;
      }
    },
    submitUpload: function(content) {
      //自定义的上传图片的方法
      if (this.uploadSrcs.length == 0) return;
      let upFiles = [];
      let formData = new FormData();
      this.uploadSrcs.forEach(us => {
        formData.append("file", us.raw);
      });
      if (this.uploadId != null) {
        formData.append("uploadId", this.uploadId);
      }
      this.uploadSrcs = [];
      let config = {
        "Content-Type": "multipart/form-data"
      };
      var var_this = this;
      this.$axios
        .post("/upload/uploadFile", formData, config)
        .then(function(response) {
          
          if (response.data.length > 0) {
            var_this.uploadId = response.data[0].uploadId;
            response.data.forEach(img => {
              let name = img.id;
              let url = "/upload/showImg?id=" + img.id;
              let img1 = {
                name: name,
                url: url,
                status: "finished"
              };
              var_this.imageSrcs.push(img1);
            });
            if(var_this.imageSrcs.length < 5){
                var_this.$message('已有'+var_this.imageSrcs.length+'张上传图片成功，你可以从中选择一张图片作为默认图片,也可以继续添加图片')
                var_this.isAdd = true;
              }else{
                var_this.$message('上传图片成功，你可以从中选择一张图片作为默认图片')
                var_this.showUploadButton = false;
              }
          }
        })
        .catch(function(error) {
          console.log('error',error);
          if(var_this.imageSrcs.length == 0){
var_this.$message('图片上传失败，请重新添加图片并上传');
          }else{
var_this.$message('已有'+var_this.imageSrcs.length+'张图片上传成功，其它图片上传失败，可重新添加图片并上传');
          }
        });
    },
    submitAssess: function() {
       if(this.defaultImg.indexOf('data:image/png;base64') < 0){
         this.$refs.upload.submit();
        }else{
          this.$refs.upload1.submit(); //调用submit方法
        }
      
      //其他业务代码。
    },
    handleRemove(file, fileList) {
      console.log("handleRemove");
    },
    handlePreview(file) {
      console.log("handlePreview");
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },
    beforeUpload(file, fileList) {
      console.log("beforeUpload");
      return this.isJPG(file) && this.isLt2M(file);
    },
    isJPG(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/JPEG/PNG 格式!");
      }
      return isJPG;
    },
    isLt2M(file) {
      const isLt2M = file.size < 10 * 1024 * 1024;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt2M;
    },
    deleteImg(url, index) {
      this.$axios.get(url.replace("showImg", "delFile")).then(res => {
        if (res.data) {
          this.imageSrcs.splice(index, 1);
        }
        if(this.imageSrcs.length == 0){
          this.defaultImg =  require("../../assets/images/upload_default.png");
          this.showUploadButton = false;
        }
      });
    },
    onSubmit() {
      let checkItems = [
        this.form.name,
        // this.form.sex,
        this.form.identity
        // this.form.address,
        // this.textarea
      ];
      

      if (!this.checkRequire(checkItems)) {
        this.$message.warning("请按要求填写必填字段!");
        return;
      }

      let checkItems1 = [];
      this.phoneamacs.forEach(pm => {
        checkItems1.push(pm.phoneValidationMsg);
        checkItems1.push(pm.macValidationMsg);
      });
      checkItems1.push(this.identityValidationMsg,this.addValidationMsg,this.nameValidationMsg);
      if(!this.checkCanNotExist(checkItems1)){
         this.$message.warning("信息不合法，请按提示进行检查");
        return;
      }

      let params = {
        identityCard: this.form.identity,
        personName: this.form.name,
        personAddr: this.form.address,
        personRemark: this.textarea,
        personDetailVO: {
          personSex: this.form.sex == "男" ? "1" : this.form.sex == "女" ? "2" : "0",
          personPhone1: this.phoneamacs[0].phone,
          personMac1: this.phoneamacs[0].mac,
          personPhone2:
            this.phoneamacs.length > 1 ? this.phoneamacs[1].phone : null,
          personMac2:
            this.phoneamacs.length > 1 ? this.phoneamacs[1].mac : null,
          personPhone3:
            this.phoneamacs.length > 2 ? this.phoneamacs[2].phone : null,
          personMac3:
            this.phoneamacs.length > 2 ? this.phoneamacs[2].mac : null,
          uploadId: this.uploadId
        },
        personPhoto: this.defaultImgId
      };
      this.createNewPerson(params);
      
    },
    createNewPerson(params) {
      const url = "/info/person/createPerson";
      this.$axios({
        method: "post",
        url: url,
        data: params
      })
        .then(res => {
          this.$message.success("新增人员成功");
          this.$router.push("/personManage/keyPerson");
        })
        .catch(error => {
          this.$message.error('新增人员失败,'+error.response.data.message);
        });
    },
    createPersonDetail(params) {
      const url = "/info/person/createPersonDetail";
      this.$axios({
        method: "post",
        url: url,
        data: params
      }).then(res => {});
    },
    onExit() {
      this.$router.push("/personManage/keyPerson");
    },
    addPhoneamac(index) {
      if (this.phoneamacs.length < 3) {
        this.phoneamacs.push({
          phones: "",
          macs: "",
          phoneValidationMsg:"",
          macValidationMsg:""
        });
      }
    },
    delPhoneamac(index) {
      this.phoneamacs.pop();
    },
    validateIdentity() {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      if (validateIdentityCard(this.form.identity) === false) {
        this.identityValidationMsg = "身份证输入不合法";
      } else {
        this.identityValidationMsg = "";
      }
    },
    validatePhoneNumber(index) {
      if (this.phoneamacs[index].phone) {
        var myreg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        if (!myreg.test(this.phoneamacs[index].phone)) {
            this.phoneamacs[index].phoneValidationMsg = "手机号码错误或含有非法字符";
        } else {
          this.phoneamacs[index].phoneValidationMsg = "";
        }
      } else {
        this.phoneamacs[index].phoneValidationMsg = "";
      }
    },
    validateMacAdd(index) {
      if (this.phoneamacs[index].mac) {
        let mac = this.phoneamacs[index].mac.toUpperCase();
        var expre = /[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}/;
        var regexp = new RegExp(expre);
        if (!regexp.test(mac) || mac.length > 17) {
            this.phoneamacs[index].macValidationMsg = "MAC地址错误或含有非法字符";
        } else {
          this.phoneamacs[index].macValidationMsg = "";
        }
      } else {
        this.phoneamacs[index].macValidationMsg = "";
      }
    },
    validateName() {
      if (!this.validateSpecialWords(this.form.name)) {
        this.nameValidationMsg = "名字中不能含有特殊字符，请检查";
      } else {
        this.nameValidationMsg = "";
      }
    },
    validateAddress() {
      if (!this.validateSpecialWords(this.form.address)) {
        this.addValidationMsg = "住址中不能含有特殊字符，请检查";
      } else {
        this.addValidationMsg = "";
      }
    },
    validateSpecialWords(text) {
      if (text) {
        return /^[\u4E00-\u9FA5\uF900-\uFA2D\w-.]{0,76}$/.test(text);
      } else {
        return true;
      }
    },
    checkRequire(arr) {
      let temp = true;
      arr.forEach(ar => {
        temp = temp && (ar != undefined && ar.trim() != "");
      });
      return temp;
    },
    checkCanNotExist(arr){
      let temp = true;
      arr.forEach(ar => {
        temp = temp && ar.trim() == ""
      })
      return temp;
    }
  },
  
  components: {}
};
</script>