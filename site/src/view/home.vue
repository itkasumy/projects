<template>
 <div>
     <!-- logo部分 -->
     <logo></logo>
      <el-container class="outside-container" :class="top_bg" id="outsideContainer">
     <!-- 侧边栏部分 -->
          <navMenu></navMenu>
          <el-container :class="{noNav: noNav}">
            <!-- breakcrumb  -->
              <el-header id="breadCrumb" v-show="isBreadShow"><app-breakcrumb :lists="breadcrumbLists" /></el-header>
              <!-- 内容部分 -->
              <router-view  style="width:100%; position:relative;"></router-view>    
            </el-container>
      </el-container>
 </div>
</template>

<script >
import logo from "./layOut/logo.vue"; //logo组件
import navMenu from "./layOut/navMenu.vue"; //侧边栏组件
import appBreakCrumb from "../components/breadCrumb.vue";
import router from "../router/index.js"; //导入路由

import { routes } from "../router/index";
import { CN_EN_router_map } from "../common/js/utils.js";
import {errorException} from './intelligence/js/tip'
const CN_EN_ROUTER_MAP = CN_EN_router_map(routes);
// 生产一条数据：activeEndTime: 过期时间
// http://10.10.5.46:20131/message/putEmergencyMsg?title=ceshiyong&correlationId=zhangsan&activeEndTime=2018-04-24 14:45:56&messageBody=这是一条紧急消息
// 消费一条数据：level：消息级别 0.全部 1:紧急 2:重要 3:一般 4:中低
// http://10.10.5.46:20131/message/getMsgsByPerson?personId=zhangsan&level=1
// http://10.10.18.38:5555/message/getMsgsByPerson?personId=fengkang&level=0
// http://10.10.5.42:6060/getdoc/message
// const BASEPATH = ''
const BASEPATH = ''
const PERSON_NAME = 'chenji'
export default {
  data() {
    return {
      breadcrumbLists: [],
      top_bg: '',
      msgIdPack :[],
      timer:null,
      allClose:false,
      showedMessageIdList: [],
      allMessageIdList: [],
      newNessageIdList: [],
      isBreadShow:true,
      noNav: false
    };
  },
  components: {
    logo,
    navMenu,
    "app-breakcrumb": appBreakCrumb
  },
  methods: {
    en2cn(arr) {
      let o,
        res = [];
      for (let i = 0, len = arr.length; i < len; i++) {
        let str = arr[i]
        let index = str.indexOf('?')
          o = {};
        if (index !== -1) {
          str = str.slice(0, index)
          o.text = '编辑' + CN_EN_ROUTER_MAP[str].slice(2)
        }else {
          o.text = CN_EN_ROUTER_MAP[str];
        }
        o.name = str;
        res.push(o);
      }
      return res;
    },
    createBreadcrumb() {
      let arr = this.$router.history.current.fullPath.slice(1).split("/");
      arr = this.en2cn(arr);
      this.breadcrumbLists = arr;
      
    },
    changeCss() {
      router.beforeEach((to, from, next) => {
        try { this.changeCssCore(to.meta.title) } catch (e) {}
        next();
      });
    },
    mCatchException(e, nocatchDesc = '请检查您的网络是否异常！'){
      clearInterval(this.timer);
    },
    _getPushMessage(personId){
      let option = {
        method: 'GET',
        url: `${BASEPATH}/message/getMsgsByOther?correlationType=4&userId=${personId}&correlationId=${personId}&level=0`
      }
      this.$axios(option)
        .then(( data )=>{
          data.data.forEach(( v, i )=>{
            setTimeout(((v, i)=>{
                return ()=>{
                  this.showMessage(v)
                }
             })(v,i), i*500);
              
           })
        })
        .catch((e)=>{this.mCatchException(e)})
    },
    showMessage(data){
      let title = '红色', className = 'red'
      switch (data.level) {
        case '1':
          title = '红色预警'
          className = 'red'
          break;
        case '2':
          title = '橙色预警'
          className = 'orange'
          break;
        case '3':
          title = '黄色预警'
          className = 'yellow'
          break;
        case '4':
          title = '蓝色预警'
          className = 'blue'
          break;
      }
      let tipMsg = (data.title =="person"||data.title =="wifi")? `
          <p>${data.messageBody}</p>
          <a href="/#/personManage/warningOntime" id="${data.messageId}" data="${data.correlationId}" >查看详情</a>
          `: `
          <p>${data.messageBody}</p>
          <a href="/#/cartManage/cartWarning" id="${data.messageId}" data="${data.correlationId}" >查看详情</a>
          `
      // let classType = 
      // 车还是人的预警，跳到不同的页面， 还是需要知道personId或者是carId
      if(this.msgIdPack.indexOf(data.messageId)==-1){
        let aaa = this.$notify({
            title: `${title}`,
            dangerouslyUseHTMLString: true,
            showClose: true,
            position: 'bottom-right',
            onClose:()=>{!this.allClose?this.msgDiaClose(data.messageId,data.correlationId):""},
            customClass: `push-message ${className}`,
            message:tipMsg,
            duration: 0,
          });
          if(data.messageId){
            setTimeout(()=>{
              document.getElementById(data.messageId).addEventListener('click',this.turnToDetail)
              this.msgIdPack.push(data.messageId)
            },100)
          }
        }
    },
    turnToDetail(event){
      // console.log(event.target.id)
       this.allClose=true;
       this.$notify.closeAll()
  
        let option = {
          method: 'GET',
          url: `${BASEPATH}/message/readMsg?messageId=${event.target.id}&userId=${event.target.data}`
        }
        this.$axios(option)
        .then(( data )=>{
           this.msgIdPack = [];
          this.allClose=false;
          // console.log( '标记已读', data )
          })
        .catch((e)=>{this.mCatchException(e)})
     },
    msgDiaClose(messageId,personId){
      //  console.log('标记已读',messageId,personId )
      let option = {
        method: 'GET',
        url: `${BASEPATH}/message/readMsg?messageId=${messageId}&userId=${personId}`
      }
      this.$axios(option)
        .then(( data )=>{
          let index = this.msgIdPack.indexOf(messageId);
          index>-1&&this.msgIdPack.splice(index,1);
          // console.log( '标记已读', data )
          })
          .catch((e)=>{this.mCatchException(e)})
    },
    changeCssCore(title) {
      if(
        title == "人员轨迹" || title == "区域划分" || title == "地图分布" ||
        title == "车辆轨迹" || title == "统计报表" || title == "警员执勤" ||
        title == "人员分布" || title == "人数统计" || title == "视频监控"
        ) {
        this.top_bg = 'top_bg'
        $("#outsideContainer").css("backgroundColor", "#004158");
        $("#breadCrumb").css({ marginTop: 0, marginBottom: 0,});
      }else {
        this.top_bg = ''
        $("#outsideContainer").css("backgroundColor", "#eee");
        $("#breadCrumb").css({ marginTop: "10PX", marginBottom: "10PX", background: "#fff" });
      }
    }

  },
  created() {
    this.createBreadcrumb();
    this.changeCss();
  },
  mounted(){
    this._getPushMessage(PERSON_NAME)
    this.timer = setInterval(()=>{this._getPushMessage(PERSON_NAME)},20*1000)
    this.changeCssCore(this.$route.meta.title)
  },
  watch: {
    $route() {
      this.createBreadcrumb();
    },
    breadcrumbLists(val){
      this.isBreadShow = true;
      this.noNav = false
      if(this.breadcrumbLists.length > 0){
        if(this.breadcrumbLists[0].text == '首页' || (this.breadcrumbLists[1] && this.breadcrumbLists[1].text == 'personSpreadPng') || this.breadcrumbLists[0].text == 'wifi'){
          this.isBreadShow = false;
          this.noNav = true
        }
      }
    }
  }
  
};
</script>

<style lang="scss">

.top_bg.outside-container {
  background: url('../assets/images/bread-crumb.png') left top repeat no-repeat;
  #breadCrumb {
    padding-left: 66px;
    background-color: transparent !important;
    span {
      color: #eee;
    }
    span.text {
      left: 0
    }
    .el-breadcrumb__item:last-child span {
      color: #3fecfe;
    }
  }
  >.el-container {
    >div {
      overflow: initial;
      >.el-main {
        margin-top: -1px;
        border: 1px solid #52dbe7;
        box-shadow: 0px 0px 13px 0px #aef2f9;
      }
    }
  }
}
// 可能会导致样式错乱
.outside-container {
  &.top_bg {
    .el-container {
      >div {
        height: calc(100% - 50px);
        padding-bottom: 0px;
      }
    }
  }
  .el-container {
    margin-left: 200px;// 媒体查询的
    overflow: scroll;
    height: 100%;
    &.noNav {
      #map {
        margin-top: 10px;
      }
      >div {
        height: calc(100% - 20px);
      }
    }
    >div {
      height: calc(100% - 60px);
      overflow: scroll;
      padding-bottom: 10px;
      >main {
        height: 100%;
        margin: 0 10px;
      }
    }
  }
}
@media screen and (max-width: 1920px) and (min-width: 1366px){
  .outside-container {
    .el-container {
      margin-left: 216px;
    }
  }
}
@media screen and (max-width: 1366px) {
  .outside-container {
    .el-container {
      margin-left: 200px;
    }
  }
}

// 通知推送弹出框样式
.push-message.el-notification {
  padding: 0;
  border: none;
  &.orange {
    h2 {
      background-color: #ff8a00;
    }
  }
  &.red {
    h2 {
      background-color: #f00;
    }
  }
  &.yellow {
    h2 {
      background-color: #efed51;
    }
  }
  &.blue {
    h2 {
      background-color: #0090fe;
    }
  }
  .el-notification__group {
    width: 100%;
    margin: 0;
    position: relative;
  }
  h2 {
    color: #fff;
    text-align: left;
    padding: 10px;
    background-color: #f00;
    
  }
  .el-notification__closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    line-height: 26px;
    font-size: 20px;
    color: #ff3232;
    background: rgba(255, 255, 255, 0.5);
  }
  .el-notification__content {
    color: #999;
    line-height: 30px;
    padding: 5px 20px 40px 20px;
    a {
      color: #409EFF;
      float: right;
    }
  }
}




</style>
