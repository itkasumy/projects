<template>
 <div>
     <el-container id="da">
         <!-- 左 -->
         <el-aside>
             <h3>新增用户</h3>
             <!-- 上传头像 -->
            <el-upload
                class="avatar-uploader"
                :action="url1+'/upload/uploadFile'"
                :limit='1'
                :show-file-list="false"
                :auto-upload="true"
                :on-exceed='handleExceed'
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
         </el-aside>
         <!-- 右 -->
          <el-main>
            <h4>账户信息</h4>
            <ul class="accountMassage clearfix">
                <li>
                    <span>用户名</span>
                    <el-input @change='checkUserName' size="small"  v-model="editData.userName" placeholder="TestName"></el-input>   
                    <i v-show="isShowUserName" :class="isUserName?'el-icon-check':'el-icon-close'"></i>             
                </li>
                <li>
                    <i>请按照要求填写必要信息</i>
                </li>
                <li>
                    <span>密&nbsp;&nbsp;码</span>
                    <el-input v-model="editData.password" size="small" @change='checkPassword'  placeholder="字母,数字组成,不少于8位,不允许特殊字符"></el-input>
                    <i v-show="isShowPassword" :class="isPassword?'el-icon-check':'el-icon-close'"></i>
                </li>
                <li>
                    <i>确认密码</i>
                    <el-input v-model="password" size="small" @change='judgePassword' placeholder="请确认密码"></el-input>
                    <i v-show="isJudgePassword" :class="isJudge?'el-icon-check':'el-icon-close'"></i>
                </li>
                <li>
                    <span>角&nbsp;&nbsp;色</span>
                     <el-select size="small" v-model="editData.userRoleRelationList[0].roleId" placeholder="角色">
                        <el-option
                        v-for="item in roleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <i>账号状态</i>
                    <el-select size="small" v-model="editData.flag" placeholder="账号状态">
                        <el-option
                        v-for="item in flagOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <h4>用户信息</h4>
            <ul class="usertMassage clearfix">
                <li>
                    <span>姓&nbsp;&nbsp;名</span>
                    <el-input v-model="editData.userRealname" size="small"  @change='checkUserRealname'  placeholder="姓名"></el-input>
                    <i v-show="isShowUserRealname" :class="isUserRealname?'el-icon-check':'el-icon-close'"></i>
                </li>
                <li style="width:320px;height:40px;">
                    <span>性&nbsp;&nbsp;别</span>
                    <el-radio size="small" v-model="editData.userSex" label="0">未知</el-radio>
                    <el-radio size="small" v-model="editData.userSex" label="1">男</el-radio>
                    <el-radio size="small" v-model="editData.userSex" label="2">女</el-radio>
                </li>
                <li>
                    <i>联系电话</i>
                    <el-input size="small" v-model="editData.userPhone"  @change='checkUserPhone'  placeholder="联系电话"></el-input>
                    <i v-show="isShowUserPhone" :class="isUserPhone?'el-icon-check':'el-icon-close'"></i>
                </li>
                <li>
                    <i>身份证号</i>
                    <el-input size="small" v-model="editData.userIdcard" @change='checkUserIdcard' placeholder="身份证号"></el-input>
                    <i v-show="isShowUserIdcard" :class="isUserIdcard?'el-icon-check':'el-icon-close'"></i>
                </li>
                <li>
                    <span>警&nbsp;&nbsp;号</span>
                    <el-input size="small" v-model="editData.userNo" @change='checkUserNo' placeholder="警号"></el-input>
                    <i v-show="isShowUserNo" :class="isUserNo?'el-icon-check':'el-icon-close'"></i>
                </li>
                <li>
                    <span>职&nbsp;&nbsp;位</span>
                    <el-input size="small" v-model="editData.userPosition" @change='checkUserPosition' placeholder="职位"></el-input>
                    <i v-show="isShowUserPosition" :class="isUserPosition?'el-icon-check':'el-icon-close'"></i>
                </li>
                <li>
                    <span>机&nbsp;&nbsp;构</span>
                    <el-cascader
                        size="small"
                        id="dept"
                        :options="deptNameOptions"
                        filterable
                        change-on-select
                        @change='handleItemChange'
                        :props="props"
                        clearable
                        ref="deptNameRef"
                        :show-all-levels="false"
                    ></el-cascader>
                </li>
            </ul>
            <!-- 备注 -->
            <div class="remark clearfix">
                <span>备&nbsp;&nbsp;注</span>
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="editData.userRemark">
                </el-input>
            </div>
            <div class="btn">
                  <el-button @click="addUser" type="primary">新增</el-button>
                  <el-button @click="cancelAdd">取消</el-button>
            </div>
          </el-main>
     </el-container>
 </div>
</template>

<script >
import { errorException } from './js/tip.js'
 export default {
   data() {
        // require('../../../static/images/login_btn.png')
     return {
         url1: '',
         url2: '',
         url3: '',
        //  url1: 'http://10.10.18.32:8089',   // 头像
        //  url2: 'http://10.10.18.88:8080',   // 角色
        //  url3: 'http://10.10.18.82:8080',   // 机构名称
        //  url3: 'http://10.10.5.46:20131',   // 机构名称
         imageUrl: '',
         editData: {
             'userName': '',
             'password': '',
             'userRoleRelationList': [{'roleId': null}],
             'flag': '0',
             'userRealname': '',
             'userSex': '1',
             'userPhone': '',
             'userIdcard': '',
             'deptName': '',
             'deptId': '',
             'userPosition': '',
             'userNo': '',
             'userRemark': '',
             'userImg': '',
         },
         roleOptions: [],
         flagOptions: [
             {label: '冻结' , value: '1'},
             {label: '正常' , value: '0'},
         ],
         deptNameOptions: [],
         props: {
            value: 'deptId',
            label: 'deptName',
            children: 'deptOverviewVOList'
         },
         password: '',
         isUserName: true,  
         isShowUserName: false,   
         isPassword: true,
         isShowPassword: false,  
         isJudge: true,
         isJudgePassword: false, 
         isUserRealname: true,
         isShowUserRealname: false,
         isUserPhone: true,
         isShowUserPhone: false,
         isUserIdcard: true,
         isShowUserIdcard: false,
         isUserPosition: true,
         isShowUserPosition: false,
         isUserNo: true,
         isShowUserNo: false,
     }

   },
   created(){
       this.getRoleOptions();
       this.getDeptNameOptions();
   },
   components: {

   },
   methods:{
       // 初始化数据
       getRoleOptions(){
           const url = `${this.url2}/base/role/allRoleList`
           this.$axios.get(url).then(res => {
                //    console.log('查询的所有角色:' , res.data);
                res.data.forEach(item => {
                    this.roleOptions.push({
                        label: item.roleName,
                        value: item.roleId
                    })
                    if(item.roleName == '超级管理员'){
                        this.editData.userRoleRelationList[0].roleId = item.roleId;
                    }
                });
           })
       },
       getDeptNameOptions(){
           const url = `${this.url2}/base/depts/all/overview`
           this.$axios.get(url).then(res => {
               // 递归方式 , 把最后的空数组变成null
               let arr = res.data;
               function print(arr) {  
                   for (const key in arr) {
                       if(Array.isArray(arr[key])){
                           if(arr[key].length <= 0){
                               return arr[key]=null
                            }else{
                                for (let i = 0; i < arr[key].length; i++) {
                                    print(arr[key][i]);                                    
                                }
                            }
                       }
                   }
               }
               for (let i = 0; i < arr.length; i++) {
                    print(arr[i]);                   
               }
               //    console.log('机构的出现' , arr)
               arr.forEach(item => {
                   let ary = item.deptOverviewVOList;                   
                   this.deptNameOptions.push({
                        deptName: item.deptName,
                        deptId: item.deptId,
                        deptOverviewVOList: ary
                   })
               })
           }).catch(res => {
               errorException(this, res);
           })
       },
       //上传头像
        beforeAvatarUpload(file){
            console.log(file);
            const isJPG = (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 png jpeg jpg gif 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleExceed(file){
            this.$message.error('只能上传一张头像图片');
        },
       handleAvatarSuccess(file){
          //  console.log('上传成功的文件是: ' , file);
           this.imageUrl = `${this.url1}/upload/showImg?id=${file[0].id}`
           this.editData.userImg = file[0].uploadId
       },
       // 验证
       checkUserName(val){
            this.isShowUserName = true;
            if(val.trim()){
                this.isUserName = true;
                return true
            }else{
                this.isUserName = false;
            }
       },
       checkPassword(val){
           this.isShowPassword = true;
            if(/^[a-zA-Z0-9]{8,}$/.test(val.trim())){
                this.isPassword = true;
                return true
            }else{
                this.isPassword = false;
            }
       },
       judgePassword(val){
           this.isJudgePassword = true;
           if(val == this.editData.password){
               this.isJudge = true;
               return true
           }else{
               this.isJudge = false;
               return this.$message.error('请确定密码是否正确!');
           }
       },
       checkUserRealname(val){
           this.isShowUserRealname = true;
            if(val.trim()){
                this.isUserRealname = true;
                return true
            }else{
                this.isUserRealname = false;
            }
       },
       checkUserPhone(val){
           this.isShowUserPhone = true;
           if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(val.trim()) ||
           /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(val.trim())){
                this.isUserPhone = true;
                return true
            }else{
                this.isUserPhone = false;
            }
       },
       checkUserIdcard(val){
           this.isShowUserIdcard = true;
           if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val.trim())){
                this.isUserIdcard = true;
                return true
            }else{
                this.isUserIdcard = false;
            }
       },
       checkUserPosition(val){
           this.isShowUserPosition = true;
           if(val.trim()){
                this.isUserPosition = true;
                return true
            }else{
                this.isUserPosition = false;
            }
       },
       checkUserNo(val){
           this.isShowUserNo = true;
           if(val.trim()){
                this.isUserNo = true;
                return true
            }else{
                this.isUserNo = false;
            }
       },
       // 选择机构
       handleItemChange(val){
            // console.log('机构变化' , val);
            this.editData.deptId = val[val.length - 1]
            this.editData.deptName = this.$refs.deptNameRef.currentLabels[this.$refs.deptNameRef.currentLabels.length - 1]
       },
       cancelAdd(){
           this.$router.push({ name: 'userManage' })
       },
       addUser(){
           if(
            this.checkUserName(this.editData.userName) && 
            this.checkPassword(this.editData.password) &&
            this.judgePassword(this.password) &&
            this.checkUserRealname(this.editData.userRealname) &&
            this.checkUserPhone(this.editData.userPhone) &&
            this.checkUserIdcard(this.editData.userIdcard) &&
            this.checkUserPosition(this.editData.userPosition) &&
            this.checkUserNo(this.editData.userNo) 
           ){
            //    console.log('成功了. 可以提交了...', this.editData);
            for (const key in this.editData) {
              if(key != 'userRemark' && key != 'userImg'){
                if(this.editData[key]==''||this.editData[key]==null){
                    this.$message.error('缺少必备信息');
                    return
                }
              }
            }
               const url = `${this.url2}/base/user/createUser`
               this.$axios.post(url , this.editData).then(res=>{
                  //  console.log('新增成功: ' , res);
                   this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                   this.$router.push({name: 'userManage'})
               }).catch((res) => {
                    errorException(this , res) ;  
              });
           }else{
               this.$message.error('新增失败 , 请核对用户信息是否正确!');
           }
       }
   }
 }
</script>

<style  lang="scss">
@import '../personManage/common.scss';
#da {
    background-color: #fff;
    margin-left: 10px;
    .el-aside {
        h3{
            font-weight: normal;
            position: relative;
            text-align: left;
            left: 20px;
            top: 20px;
        }
        // 上传
        .avatar-uploader{
            margin-top: 50px;
            .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 50%;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
            .avatar {
                border-radius: 50%;
                width: 178px;
                height: 178px;
                display: block;
            }
        }
    }
    .el-main{
        .el-icon-check {
            color: rgb(64, 157, 255) !important;
        }
        .el-icon-close{
            color: red !important;
        }
        h4 {
            text-align: left;
            margin-top: 40px;
            font-weight: normal;
            font-size: 18px;
            color: #5a5a5a;
        }
        // 表单主体 账号信息
        .accountMassage {
            width: 900px;
            margin: 0px;
            li {
                float: left;
                margin-top: 10px;
                text-align: left;
                width: 365px;
                &:nth-child(2n){
                    margin-left: 65px;
                }
                &:last-child {
                    margin-left: 65px;
                }
                .el-input {
                    font-size: 12px;
                }
                .el-select{
                    font-size: 12px;
                    margin-left: 0px;
                }
                >i{
                    line-height: 32px;
                    color: #868686;
                    &:first-child{
                        &::before{
                            content: '*';
                            color: red;
                            display: inline;
                            font-size: 16px;
                            margin-right: 5px;
                        }
                    }
                }
                >span {
                    color: #868686;
                    letter-spacing: 5px;
                    &::before{
                        content: '*';
                        color: red;
                        display: inline;
                        font-size: 16px;
                    }
                }
                div{
                    width: 250px;
                    margin-left: 20px;
                    input{
                        
                    }
                }
            }
        }
        // 机构内的span不要间隙
        #dept{
          span {
            letter-spacing: 0px;
          }
        }
        // 用户信息
        .usertMassage {
            width: 900px;
            margin: 0px;
            li {
                float: left;
                margin-top: 10px;
                text-align: left;
                width: 365px;
                &:nth-child(2n){
                    margin-left: 65px;
                }
                &:last-child{
                    position: relative;
                }
                &:nth-child(2){
                  margin-left: 65px;
                }
                .el-input {
                    font-size: 12px;
                }
                .el-cascader{  
                    position: relative;
                    right: 5px;
                    .el-cascader__label{
                        padding-left: 30px; 
                    }
                }
                .el-radio {
                    line-height: 32px;
                    width: 58px;
                }
                >i{
                    color: #868686;
                    line-height: 32px;
                    &:first-child {
                        &::before{
                            content: '*';
                            color: red;
                            display: inline;
                            font-size: 16px;
                            margin-right: 10px;
                        }
                    }
                }
                >span {
                    color: #868686;
                    letter-spacing: 5px;
                    &.el-cascader{
                        &::before{
                            content: '';
                        }
                    }
                    &::before{
                        content: '*';
                        color: red;
                        display: inline;
                        font-size: 16px;
                        margin-right: 5px;
                    }
                }
                div{
                    width: 250px;
                    margin-left: 20px;
                    input{

                    }
                }
            }
        }
        // 备注
        .remark {
            color: #868686;
            margin-top: 30px;
            span {
                float: left;
                line-height: 100px;
                letter-spacing: 5px;
            }
            div{
                float: left;
                margin-left: 36px;
                width: 750px;
                textarea{

                }
            }
        }
        // 按钮
        .btn {
            margin-top: 30px;
            margin-left: 78px;
            text-align: left;
        }
    }
}
</style>