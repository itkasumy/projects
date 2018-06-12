<template>
 <div id="changePassword">
     <h3>修改密码</h3>
     <div class="box">
         <ul>
             <li>
                 <span>旧密码</span>
                 <el-input v-model="oldPassword" @change='checkOldPassword' placeholder="旧密码"></el-input>
                 <i v-show="isShowOldPassword" :class="isOldPassword?'el-icon-check':'el-icon-close'"></i> 
             </li>
             <li>
                 <span>新密码</span>
                 <el-input v-model="newPassword" @change='checkNewPassword' placeholder="确认新密码"></el-input>
                 <i v-show="isShowNewPassword" :class="isNewPassword?'el-icon-check':'el-icon-close'"></i> 
             </li>
             <li>
                 <span>确认密码</span>
                 <el-input v-model="judgeNewPassword" @change='checkjudgeNewPassword' placeholder="再次输入新密码"></el-input>
                 <i v-show="isShowJudgeNewPassword" :class="isJudgeNewPassword?'el-icon-check':'el-icon-close'"></i>
             </li>
         </ul>
         <div class="btn">
             <el-button type="primary">确定</el-button>
             <el-button>取消</el-button>
         </div>
     </div>
 </div>
</template>

<script >
 export default {
   data() {
     return {
         oldPassword: '',
         isShowOldPassword: false,
         isOldPassword: true,
         newPassword: '',
         isShowNewPassword: false,
         isNewPassword: true,
         judgeNewPassword: '',
         isShowJudgeNewPassword: false,
         isJudgeNewPassword: true
     }

   },
   methods: {
       checkOldPassword(val){
            this.isShowOldPassword = true;
            if(/^[a-zA-Z0-9]{8,}$/.test(val.trim())){
                this.isOldPassword = true;
                return true
            }else{
                this.isOldPassword = false;
            }
       },
       checkNewPassword(val){
           this.isShowNewPassword = true;
            if(/^[a-zA-Z0-9]{8,}$/.test(val.trim())){
                this.isNewPassword = true;
                return true
            }else{
                this.isNewPassword = false;
            }
       },
       checkjudgeNewPassword(val){
           this.isShowJudgeNewPassword = true;
           if(val == this.newPassword){
               this.isJudgeNewPassword = true;
               return true
           }else{
               this.isJudgeNewPassword = false;
           }
       }
   },
   components: {

   }
 }
</script>

<style lang='scss'>
    #changePassword {
        height: 100%;
        background-color: #fff;
        margin: 0px 10px 0px 10px;;
        text-align: left;
        h3 {
            position: relative;
            text-align: left;
            left: 100px;
            top: 50px;
            font-size: 16px;
            line-height: 16px;
            font-weight: bold;
            color: #5a5a5a;

        }
        .box {
            width: 1000px;
            height: 400px;
            margin: 100px 80px;
            // background-color: tomato;
            position: relative;
            overflow: hidden;
            ul {
                li{
                    position: relative;
                    left: 20px;
                    margin-top: 30px;
                    span {
                        line-height: 40px;
                        color: #5a5a5a;
                    }
                    .el-input{
                        width: 70%;
                        position: absolute;
                        left: 100px;
                    }
                }
            }
            .btn {
                position: relative;
                margin-top: 50px;
                left: 120px;
                button {
                  width: 100px;
                  height: 32px;
                  line-height: 0;
                  span {
                    line-height: 0;
                  }
                }
            }
        }
    }
 
</style>
