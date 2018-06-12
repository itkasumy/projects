<template>
    <div>
        <!-- 上部分LOGO -->
        <el-container id="logo">
            <el-row style="line-height:60px; width:100%;">
                <el-col :span="10" class="logo_left ">

                </el-col>
                <el-col :span="14" class="logo_right">
                    <ul>
                        <li>
                            <a href="javascript:;" @click="logOut">
                                <i></i>
                                退出
                            </a>
                        </li>
                        <li>
                            <router-link to="/user/changePassword" style="color:#fff;">修改密码</router-link>
                        </li>
                        <li>
                            <i></i>
                            超级管理员</li>
                        <li>
                            <i></i>
                        </li>
                        <li>
                            <i @click.prevent.stop="fullScreen"></i>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </el-container>
    </div>
</template>

<style scoped>
/* LOGO */
#logo {
  height: 60px;
  background: url("../../assets/images/top_bg_01.png");
  position: relative;
}
#logo .logo_left {
  background: url("../../assets/images/logo_01.png") no-repeat;
  height: 60px;
}
#logo .logo_right {
  padding-right: 40px;
}
#logo .logo_right li {
  float: right;
  margin: 0 25px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  position: relative;
}
#logo .logo_right li:first-child a {
  color: #fff;
  font-size: 12px;
  position: relative;
  display: inline-block;
  width: 80px;
  height: 60px;
}
#logo .logo_right li:first-child i {
  background: url("../../assets/images/top_ico_07.png");
  background-size: contain;
  width: 25px;
  height: 25px;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 55px;
  transform: translateY(-50%);
}

#logo .logo_right li:nth-child(4),
#logo .logo_right li:nth-child(5) {
  width: 20px;
  height: 60px;
}
#logo .logo_right li:nth-child(3) i {
  background: url("../../assets/images/menuicon_f_12.png");
  background-size: contain;
  width: 20px;
  height: 20px;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 65px;
  transform: translateY(-50%);
}
#logo .logo_right li:nth-child(4) i {
  background: url("../../assets/images/top_ico_05.png");
  background-size: contain;
  width: 26px;
  height: 26px;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
#logo .logo_right li:nth-child(5) i {
  background: url("../../assets/images/top_ico_03.png");
  background-size: contain;
  width: 26px;
  height: 26px;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
</style>
<script >
import { errorException } from './js/tip.js'
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    fullScreen(){
      this.$root.Bus.$emit('fullScreen',true)
    },
    logOut(){
        this.$confirm('是否继续退出操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            // const url = ``
            this.$axios.get(url).then(res => {
                console.log('退出的数据是: ' , res.data)
                if(res.data){
                    this.$router.push({name: 'login'})
                }else{
                    this.$message.error('退出失败');
                }
            }).catch(res => {
                errorException(this, res)
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消退出'
            });          
        });
    }
  }
};
</script>
