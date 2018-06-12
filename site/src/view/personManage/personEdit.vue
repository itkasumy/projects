<template>
<div>
    <el-main>
        <div class="equipment-edit">
            <el-collapse  v-model="activeNames">
                <el-collapse-item
                    :title="baseInf"
                    :name="baseInf"
                >   
                <img :src="uploadDefaultImg" class="my-img" onerror="this.src = '../../../static/images/noPhoto.png'" style="margin-left:66px;">
                    <ul class="all-line clearfix">
                        <li>
                            <span><i class="red">*</i>姓名</span>
                            <el-input
                                :class="{'not-input': !name&&check&&validateNameTag}"
                                v-model="name"
                                size="small"
                                :maxlength = 20
                                clearable>
                            </el-input>
                        </li>
                        <li>
                          <span><i class="red">*</i>身份证号</span>
                            <el-input
                                :class="{'not-input': !identityCard&&check&&validateIdentityTag}"
                                v-model="identityCard"
                                size="small"
                                clearable>
                            </el-input>
                        </li>
                        <li>
                            <span>住址</span>
                            <el-input
                                v-model="address"
                                :maxlength = 75
                                placeholder="住址不能超过75字" 
                                size="small"
                                clearable>
                            </el-input>
                        </li>
                        <li>
                            <span>备注</span>
                            <el-input
                                type="textarea"
                                v-model="remark"
                                :maxlength = 75
                                placeholder="备注不能超过75字" 
                                size="small"
                                :rows="2">
                            </el-input>
                        </li>
                    </ul>
                </el-collapse-item>
                <el-collapse-item
                v-for="(value, index) in collapseLists" :key="index"
                    :title="value.title"
                    :name="index"
                   
                >
                <template  slot-scope="scope" >
                  <div style="display:inline-block;margin-top:10px;">
				<div>
          <div style="display: inline-block;position: relative;left: 166px;top: 28px;">
					<el-upload action=""
					:limit="value.limit"
					:auto-upload="false"
					:on-exceed="handleExceed"
					:on-success="changeUpload"
					ref="upload"
					:before-upload="beforeUpload"
					multiple
					:show-file-list="false"
					:http-request="submitUpload"
					:on-change="changeUpload"
					style="height:0px;">
					<el-button class="add-upload" size="small" v-show="value.imageSrcs.length > 0 && value.imageSrcs.length < 5 && value.uploadSrcs.length == 0" @click="changeValue(value)">添加</el-button>
					</el-upload>
					<el-button class="add-upload"  @click="submitAssess(index)" size="small" v-show="value.uploadSrcs.length > 0">上传</el-button>
				</div>
          <el-upload action=""
					:limit="value.limit"
					:auto-upload="false"
					:on-exceed="handleExceed"
					:on-success="changeUpload"
					ref="upload1"
					:before-upload="beforeUpload"
					multiple
					:show-file-list="false"
					:http-request="submitUpload"
					:on-change="changeUpload"
					:disabled="value.imageSrcs.length > 0"
          >
          <img :src="value.defaultImg" class="my-img" onerror="this.src = '../../../static/images/noPhoto.png'" @click="value.imageSrcs.length ==  0?changeValue(value):''">
          <img src="../../assets/images/mark_toPhoto_alpha.png" class="fl setDefaultButton" v-show="value.imageSrcs.length == 0">
          <img src="../../assets/images/mark_toPhoto.png" class="fl setDefaultButton" v-show="value.imageSrcs.length>0 && (uploadDefaultImg != value.defaultImg)" @click="setDefaultImg(value)">
          <img src="../../assets/images/mark_defaultPhoto.png" class="fl setDefaultButton" v-show="uploadDefaultImg == value.defaultImg">
          </el-upload>
				</div>
				
        <div class="img-container">
          <div class="small-img" :key="index"  v-for="(is, index) in value.imageSrcs">
            <img :src="is" class="sma" @click="updateDefaultImg(value,is)">
            <img src="../../assets/images/img-close.png" class="close-icon" @click="deleteImg(is,index,value)">
          </div>
			  </div>
			</div>
      
                    <ul class="half-line clearfix">
                      <li>
                        <span>类型</span>
                        <el-input
                                v-model="value.type" 
                                size="small"
                                :maxlength = 20
                                clearable>
                              </el-input>
                      </li>
                      <!-- <li>
                        <span>类型</span>
                          <el-select 
                          v-model="value.typeId" 
                          placeholder="请选择类型" 
                          size="small"
    :class="{'not-input': !value.typeId&&check}"
                           >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
                      </li> -->
                      <li>
                          <span>性别</span>
                            <el-radio-group v-model="value.personSex" size="small">
                              <el-radio label="未知" border class="myEdit"></el-radio>
                              <el-radio label="男" border class="myEdit"></el-radio>
                              <el-radio label="女" border class="myEdit"></el-radio>
                            </el-radio-group>
                        </li>
                        <li  v-for="(item, index) in value.arithmeticList" :key="index">
                            <span>{{item.span}}</span>
                              <el-input
                                  :class="{'not-input': !item.model&&check}"
                                  v-model="item.model"
                                  size="small"
                                  :disabled="item.canEdit"
                                  :maxlength="item.maxLength">
                              </el-input>
                        </li>
                    </ul>
                </template>
                </el-collapse-item>
            </el-collapse>
            <div class="edit-btns">
                <el-button size="small" type="default" @click="cancel">取消</el-button>
                <el-button size="small" type="primary" @click="submit">保存</el-button>
                <!-- <el-button size="small" type="primary" @click="testModel">测试</el-button> -->
            </div>
        </div>
    </el-main>
</div>
</template>

<script>
import {
  validateIdentityCard,
  validatePhoneNumber,
  validateSpecialWords,
  validateMac
} from "./js/commonValidation.js";
const TABLEEXPAND = [
  { label: "代用名", prop: "personAliasName" },
  { label: "性别", prop: "personSex" },
  { label: "类型", prop: "personTypeId" },
  { label: "手机号1", prop: "personPhone1" },
  { label: "MAC地址1", prop: "personMac1" },
  { label: "手机号2", prop: "personPhone2" },
  { label: "MAC地址2", prop: "personMac2" },
  { label: "手机号3", prop: "personPhone3" },
  { label: "MAC地址3", prop: "personMac3" }
];
export default {
  name: "PersonEdit",
  data() {
    return {
      baseInf: "人员基本信息",
      collapseLists: [],
      remark: "",
      name: "",
      type: "",
      identityCard: "",
      address: "",
      arithmeticLists: [],
      check: false,
      options: [],
      tableExpand: TABLEEXPAND,
      validateNameTag: false,
      validateIdentityTag: false,
      validateAddressTag: false,
      activeNames: [],
      imgUploadDisable: false,
      defaultImg: require("../../assets/images/upload_default.png"),
      showUploadButton: false,
      imageSrcs: [],
      isAdd: false,
      setDefaultButtonShow: false,
      uploadDefaultImg: "",
      editValue: ""
    };
  },
  mounted() {
    // this.getTypes();
    this.getResoureTitle();
  },
  methods: {
    deleteImg(url, index, value) {
      value.limit++;
      this.$axios.get(url.replace("showImg", "delFile")).then(res => {
        if (res.data) {
          value.imageSrcs.splice(index, 1);
        }
        if(value.imageSrcs.length == 0){
          value.defaultImg =  require("../../assets/images/upload_default.png");
        }
      });
    },
    setDefaultImg: function(value) {
      this.uploadDefaultImg = value.defaultImg;
      this.defaultImgId = this.uploadDefaultImg.split("=")[1];
    },
    updateDefaultImg: function(value, imgUrl) {
      value.defaultImg = imgUrl;
    },
    getTypes() {
      const url = "/info/person/getPersonTypeList";
      let var_this = this;
      this.$axios.get(url).then(res => {
        if (res.data.length > 0) {
          res.data.forEach(rs => {
            let da = {
              value: rs.personTypeId,
              label: rs.personTypeName
            };
            var_this.options.push(da);
          });
        }
      });
    },
    getResoureTitle() {
      this.getResources(this.$route.params.personId);
    },
    getResources(personId) {
      const url = "/info/person/getPersonBaseDetailInfoById/" + personId;
      let var_this = this;
      this.$axios.get(url).then(res => {
        let dl = res.data;
        this.activeNames.push(this.baseInf);
        var_this.name = dl.personName;
        var_this.identityCard = dl.identityCard;
        var_this.address = dl.personAddr;
        var_this.remark = dl.personRemark;
        if (dl.personPhoto) {
          var_this.uploadDefaultImg =
            "/upload/showImg?id=" + dl.personPhoto;
        } else {
          var_this.uploadDefaultImg = require("../../assets/images/noPhoto.png");
        }
        if (dl.personDetailList.length > 0) {
          dl.personDetailList.forEach((d, index) => {
            var_this.activeNames.push(index);
            let person = {};
            let arithmeticList = [];
            arithmeticList.push(
              {
                span: "代用名",
                model: d.personAliasName,
                canEdit: false,
                maxLength: 20
              },
              {
                span: "手机号1",
                model: d.personPhone1,
                canEdit: false,
                maxLength: 11
              },
              {
                span: "MAC地址1",
                model: d.personMac1,
                canEdit: false,
                maxLength: 17
              },
              {
                span: "手机号2",
                model: d.personPhone2,
                canEdit: false,
                maxLength: 11
              },
              {
                span: "MAC地址2",
                model: d.personMac2,
                canEdit: false,
                maxLength: 17
              },
              {
                span: "手机号3",
                model: d.personPhone3,
                canEdit: false,
                maxLength: 11
              },
              {
                span: "MAC地址3",
                model: d.personMac3,
                canEdit: false,
                maxLength: 17
              },
              {
                span: "时间",
                model: d.createTime,
                canEdit: true,
                maxLength: 30
              }
            );
            person.arithmeticList = arithmeticList;
            var_this.$axios
              .get(
                "/upload/fileAttFiles?uploadId=" +
                  d.uploadId
              )
              .then(res => {
                if (res.data.length > 0) {
                  person.defaultImg =
                    "/upload/showImg?id=" +
                    res.data[0].id;
                  person.imageSrcs = [];
                  res.data.forEach(rs => {
                    person.imageSrcs.push(
                      "/upload/showImg?id=" + rs.id
                    );
                  });
                } else {
                  person.imageSrcs = [];
                  person.defaultImg = require("../../assets/images/upload_default.png");
                }
                person.limit = 5 - person.imageSrcs.length;
                person.uploadSrcs = [];
                person.type = d.personTypeName;
                person.uploadId = d.uploadId;
                person.personSex =
                  d.personSex == "0"
                    ? "未知"
                    : d.personSex == "1" ? "男" : "女";
                person.personDetailId = d.personDetailId;
                person.title = "人员详细信息（来源：" + d.personSource + "）";
                var_this.collapseLists.push(person);
              })
              .catch(error => {
                person.uploadSrcs = [];
                person.imageSrcs = [];
                person.limit = 5;
                person.uploadId = d.uploadId;
                person.defaultImg = require("../../assets/images/noPhoto.png");
                person.type = d.personTypeName;
                person.personSex =
                  d.personSex == "0"
                    ? "未知"
                    : d.personSex == "1" ? "男" : "女";
                person.personDetailId = d.personDetailId;
                person.title = "人员详细信息（来源：" + d.personSource + "）";
                var_this.collapseLists.push(person);
              });
          });
        }
      });
    },
    changeValue(value) {
      console.log('this.editValue.uploadId');
      this.editValue = value;
    },
    cancel() {
      this.$router.push({ name: "keyPerson" });
    },
    submit() {
      //检查基本信息必填项
      let checkItems = [
        this.name,
        this.identityCard
        // this.address,
        // this.remark
      ];
      //检查详细信息必填项
      var initialCheck = true;
      if (this.collapseLists.length > 0) {
        this.collapseLists.forEach(cs => {
          // checkItems.push(cs.typeId);
          let ar = cs.arithmeticList;
          if (ar.length > 0) {
            for (let i = 0; i < ar.length; i++) {
              // checkItems.push(ar[i].model);
              if (i == 1 || i == 3 || i == 5) {
                if (initialCheck) {
                  if (!validatePhoneNumber(ar[i].model)) {
                    initialCheck = validatePhoneNumber(ar[i].model);
                    this.$message.error(
                      "手机号" + (i + 1) / 2 + "输入不正确，请检查！"
                    );
                  }
                }
              }
              if (i == 2 || i == 4 || i == 6) {
                if (initialCheck) {
                  if (!validateMac(ar[i].model)) {
                    initialCheck = validateMac(ar[i].model);
                    this.$message.error(
                      "Mac地址" + i / 2 + "输入不正确，请检查！"
                    );
                  }
                }
              }
            }
          }
        });
      }
      if (!initialCheck) {
        return;
      }
      if (!this.checkRequire(checkItems)) {
        this.check = true;
        this.$message.error("请按要求填写必填字段!");
        return;
      }
      //正则校验
      if (!this.validateName()) {
        this.$message.error("姓名中不能包含特殊字符，请检查！");
        return;
      }
      if (!this.validateIdentityC()) {
        this.$message.error("身份证号码输入不正确，请检查！");
        return;
      }
      if (!this.validateAddress()) {
        this.$message.error("地址中不能包含特殊字符，请检查！");
        return;
      }

      //提交基本信息修改
      const url = "/info/person/updatePersonBase";
      let var_this = this;
      this.$axios({
        method: "post",
        url: url,
        data: {
          personId: this.$route.params.personId,
          identityCard: this.identityCard,
          personName: this.name,
          personAddr: this.address,
          personRemark: this.remark,
          personPhoto: this.defaultImgId
        }
      })
        .then(res => {
          this.$message.success("修改人员成功");
          this.$router.push({ name: "keyPerson" });
        })
        .catch(error => {
          this.$message.error(
            "人员基本信息修改失败," + error.response.data.message
          );
        });
      //提交详细信息修改
      if (this.collapseLists.length > 0) {
        this.collapseLists.forEach(ca => {
          this.editDetails(ca);
        });
      }
    },
    validateName() {
      this.validateNameTag = validateSpecialWords(this.name);
      return this.validateNameTag;
    },
    validateIdentityC() {
      this.validateIdentityTag = validateIdentityCard(this.identityCard);
      return this.validateIdentityTag;
    },
    validateAddress() {
      this.validateAddressTag = validateSpecialWords(this.address);
      return this.validateAddressTag;
    },
    editDetails(person) {
      const url1 = "/info/person/updatePersonDetail";
      const params = {
        personDetailId: person.personDetailId,
        personTypeName: person.type,
        personAliasName: person.arithmeticList[0].model,
        personSex:
          person.personSex == "未知"
            ? "0"
            : person.personSex == "男" ? "1" : "2",
        personPhone1: person.arithmeticList[1].model,
        personMac1: person.arithmeticList[2].model,
        personPhone2: person.arithmeticList[3].model,
        personMac2: person.arithmeticList[4].model,
        personPhone3: person.arithmeticList[5].model,
        personMac3: person.arithmeticList[6].model,
        uploadId:person.uploadId
      };
      this.$axios({
        method: "post",
        url: url1,
        data: params
      })
        .then(res => {})
        .catch(error => {});
    },
    checkRequire(arr) {
      let temp = true;
      arr.forEach(ar => {
        temp = temp && (ar != undefined && ar.trim() != "");
      });
      return temp;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `每条来源信息仅支持上传五张图片，本次选择了 ${
          files.length
        } 张图片，超过了图片数量限制`
      );
    },
    changeUpload: function(file, fileList) {
      //预览图片
      if (file.status === "ready") {
        this.editValue.uploadSrcs.push(file);
      }
      // if(this.editValue.uploadSrcs.length > 0){
      // this.showUploadButton = true;
      // this.isAdd = false;
      // this.imgUploadDisable = false;
      // }
    },
    beforeUpload(file, fileList) {
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
    submitUpload: function(content) {
      //自定义的上传图片的方法
      if (this.editValue.uploadSrcs.length == 0) return;
      let upFiles = [];
      let formData = new FormData();
      this.editValue.uploadSrcs.forEach(us => {
        formData.append("file", us.raw);
      });
      if (this.editValue.uploadId != null) {
        formData.append("uploadId", this.editValue.uploadId);
      }
      this.editValue.uploadSrcs = [];
      let config = {
        "Content-Type": "multipart/form-data"
      };
      var var_this = this;
      this.$axios
        .post("/upload/uploadFile", formData, config)
        .then(function(response) {
          if (response.data.length > 0) {
            var_this.editValue.uploadId = response.data[0].uploadId;
            response.data.forEach((img,index) => {
              let name = img.id;
              let url = "/upload/showImg?id=" + img.id;
              if(index == 0){
                var_this.editValue.defaultImg = url;
              }
              var_this.editValue.imageSrcs.push(url);
            });
            
            if (var_this.editValue.imageSrcs.length < 5) {
              var_this.$message(
                "已有" +
                  var_this.editValue.imageSrcs.length +
                  "张上传图片成功，你可以从中选择一张图片作为默认图片,也可以继续添加图片"
              );
            } else {
              var_this.$message(
                "上传图片成功，你可以从中选择一张图片作为默认图片"
              );
            }
          }
        })
        .catch(function(error) {
          console.log("error", error);
          if (var_this.editValue.imageSrcs.length == 0) {
            var_this.$message("图片上传失败，请重新添加图片并上传");
          } else {
            var_this.$message(
              "已有" +
                var_this.editValue.imageSrcs.length +
                "张图片上传成功，其它图片上传失败，可重新添加图片并上传"
            );
          }
        });
    },
    submitAssess: function(index) {
      if (this.editValue.defaultImg.indexOf("data:image/png;base64") < 0) {
        this.$refs.upload[index].submit();
      } else {
        this.$refs.upload1[index].submit();
      }
    }
  }
};
</script>
<style lang="scss">
$input_color: #dcdfe6;
$input_warn_color: #f35151;
.add-upload.el-button{
  margin-left: 110px;
}
.b-edit {
  .addButton {
    position: relative;
  }
}
.img-container {
  margin-left: 76px;
  display: flex;
  flex-direction: row;
  .small-img {
    width: 40px;
    height: 40px;
    .sma {
      position: relative;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
    }
    .close-icon {
      position: relative;
      top: -50px;
      left: 26px;
    }
  }
}
.setDefaultButton {
  position: relative;
  top: 0px;
  left: 76px;
}
.el-radio.is-bordered.myEdit {
  border: 1px solid transparent;
}
.el-radio.is-bordered.is-checked.myEdit {
  border: 1px solid transparent;
  border-color: transparent;
}
.my-img {
  width: 200px;
  height: 200px;
}
.equipment-edit {
  font-size: 12px;
  line-height: 30px;
  border: 1px solid #ccc;
  width: 100%;
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
    width: 100%;
    box-sizing: border-box;
    min-width: 300px;
    margin-left: 1px;
    > span {
      position: absolute;
      left: 0px;
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
  .all-line {
    display: inline-block;
    padding: 25px 5% 0px 5%;
    width: 50%;
  }
  .half-line {
    display: inline-block;
    padding: 34px 3% 0px 6%;
    width: 74%;
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
}
.edit-btns {
  padding: 30px 0;
}
.edit-btns button {
  width: 100px;
}
</style>