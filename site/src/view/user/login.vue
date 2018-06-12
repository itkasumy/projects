<template>
 <div id="login">
     <div class="word">
         <img src="../../../static/images/login_logo.png" alt="">
     </div>
     <div class="outer">
         <div class="cicle">
        </div>
        <div class="login">
            <ul class="clearfix">
                <li>
                    <i></i>
                    <!-- <el-input style="border-radius: 0;background-color: rgba(0, 0, 0, 0);" v-model="userName" placeholder="用户名"></el-input> -->
                    <input type="text" v-model="userName">
                </li>
                <li>
                    <i></i>
                    <!-- <el-input v-model="password" placeholder="密码"></el-input> -->
                    <input v-model="password" type="password">
                </li>
                <li>
                    <i>忘记密码请联系管理员 : 联系电话18270821320</i>
                    <span @click="register"></span>
                </li>
            </ul>
        </div>
     </div>
 </div>
</template>


<script >
import { Base64 } from './js/stringToBase64.js'
import { errorException } from './js/tip.js'
 export default {
   data() {
     return {
        url1: '',
        // url1: 'http://10.10.18.82:8080',
        userName: 'kang.feng',
        password: 'pass'
     }

   },   
   mounted(){
       this.doAnimate();
   },
   components: {

   },
   created(){
       
   },  
   methods: {
       register(){
           console.log('Basic ' + Base64.encode(`${this.userName}:${this.password}`))
           const url = `${this.url1}/base/doLogin`
           this.$axios({
                method: 'get',
                url: url,
                headers: {'Authorization' : `Basic a2FuZy5mZW5nOnBhc3M=`}
                // headers: {'Authorization': 'Basic ' + Base64.encode(`${this.userName}:${this.password}`)}
           }).then(res => {
               console.log('返回额数据:', res.data);
           }).catch(res => {
               console.log('登录失败')
               errorException(this , res);
           })
       },
       doAnimate(){
           $('.cicle').animate({left:'0px',width:'700px',height:'680px',top:'0px;'},1500)
           $('.login').on('mousemove',function () {  
               $('.cicle').css('animation-play-state','paused');
           }).on('mouseout',function () {  
               $('.cicle').css('animation-play-state','running');
           })
       }
   }
 }
</script>

<style scoped lang="scss">
    #login {
        width: 100%;
        height: 1054px;
        position: relative;
        background-size: cover;
        background-image: url('../../../static/images/login_bg.png');
        .word {
            transition: all 1s;
            img{
                height: 150px;
                &:hover{
                    animation: heart 1s  infinite;
                }
            }
        }
        .outer{
            .cicle {
                position: relative;
                background: url('../../../static/images/login_cirle.png') no-repeat  center center ;
                background-size: cover;
                margin: 30px auto;
                width: 290px;
                height: 250px;
                left: -1300px;
                animation: cicle 4s 1.5s infinite;
                border-radius: 50%;
                &:hover{
                    animation-play-state: paused;
                }
            }
            .login {
                width: 300px;
                height: 300px;
                position: relative;
                margin: -520px auto;
                background-color: rgba(0, 0, 0, 0);
                ul{
                    overflow: hidden;
                    li {
                        margin-top: 40px;
                        margin-left: 20px;
                        text-align: left;
                        i{
                            width: 90px;
                            height: 21px;
                            display: inline-block;
                            position: relative;
                            top: 5px;
                        }
                        input{
                            width: 170px;
                            padding: 10px;
                            margin-left: 3px;
                            box-sizing: border-box;
                            border-radius: 0;
                            border-bottom: 2px solid #6beeff;
                            background-color: rgba(0, 0, 0, 0);
                            color: #6beeff;
                            outline: none;
                            font-size: 18px;
                            font-weight: bold;
                        }
                    }
                    li:nth-child(1){
                        i{
                            background: url('../../../static/images/login_userN.png') no-repeat;
                        }
                    }
                     li:nth-child(2){
                        i{
                            background: url('../../../static/images/login_password.png');
                        }
                     }
                     li:nth-child(3){
                        margin-top: 5px;
                        i {
                            font-size: 12px;
                            display: inline;
                            color: #93bcc1;
                        }
                        span {
                            margin-top: 20px;
                            margin-left: 40px;
                            width: 195px;
                            height: 88px;
                            display: inline-block;
                            cursor: pointer;
                            background: url('../../../static/images/login_btn.png');
                         }
                     }
                }
            }
        }
    }
    @keyframes cicle {
        50%     {transform: rotateZ(180deg) scale(1.1)}
        100%    {transform: rotateZ(0deg) scale(1)}
    }
    @keyframes heart {
        50%     {transform: scale(1.1)}
        100%    {transform: scale(1)}
    }
</style>
