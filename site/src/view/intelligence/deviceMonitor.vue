<template>
  <div class="device-player">
    <el-main  class="device-player-body">
     <div style="display:flex;">
              <!-- 左边浮动 -->
      <div class="device-player-left" >
        <div class="device-player-left-content" id="content" v-if="leftContent">
          <div class="content">
            <el-tree :data="data" :props="defaultProps" class="tree" @node-click="handleNodeClick"></el-tree>
          </div>
          <div class="bar" @click="hideLeftContent" ></div>
          <div style="margin-top:-45px">
            <img :src="layout1" @click="changeLayout(1)"/>
            <img :src="layout4" @click="changeLayout(4)"/>
            <img :src="layout9" @click="changeLayout(9)"/>
          </div>
        </div>
        <div  class="device-player-left-toolBar" v-if="leftToolBar" @click="showLeftContent()" ></div>
      </div>
        <!-- 右边窗体 -->
       <div style="display:flex;flex-wrap:wrap;justify-content: space-around;">
            <div class="player" v-for="(item, index) in videos" :key="index" v-show="index < layoutFlag">
              <div class="player-border">

              </div>
                <!-- <video-player :options="item.playerOptions" id="video"  ref="item.ref"></video-player> -->
            </div>
            <!-- <li class="player" v-for="(item, index) in monitorItems2" :key="index+3">
                <video-player :options="item.playerOptions" id="video"  ref="item.ref"></video-player>
            </li>
            <li class="player" v-for="(item, index) in monitorItems3" :key="index+6">
                <video-player :options="item.playerOptions" id="video"  ref="item.ref"></video-player>
            </li> -->
      </div>

     </div>

    </el-main>

       
  </div>
</template>
<style  lang="scss">
.player {
  flex: 1;
  background: url("../../assets/images/video_defaultPhoto.png") no-repeat;
  background-color: #00465f;
  background-position: center;
  border: #0b8ea1 solid 1px;
  margin: 4px 10px;
  z-index: 1;
  .mini{
    width: 472px;
    height: 274px;
  }
  .middle{
    width: 600px;
    height: 400px;
  }
  .large-short{
    width: 1480px;
    height: 720px;
  }
  .large-long{
    width: 1650px;
    height: 720px;
  }
  .player-border {
    background-color: transparent;
    margin-left: auto;
    margin-right: auto;
  }
}
.player:hover {
  border: #00f0ff solid 1px;
  box-shadow: 0 0 13px #00f0ff;
}
.device-player {
  .device-player-left {
    width: auto;
    height: 850px;
    .device-player-left-content {
      margin-left: -50px;
      .content {
        width: 235px;
        height: 860px;
        background: url("../../assets/images/deviceList_bg.png") no-repeat;
        .tree {
          margin-left: 50px;
          padding-top: 35px;
        }
        .el-tree {
          background-color: rgba(0, 0, 0, 0);
        }
        .el-tree-node__content {
          color: #fff;
          font-size: 16px;
        }
        .is-leaf + .el-tree-node__label {
          color: rgba(154, 172, 173, 1);
          font-size: 14px;
        }
        .is-leaf + .el-tree-node__label:hover{
          color:#fff;
        }
        .el-tree-node:focus > .el-tree-node__content,
        .el-tree-node__content:hover {
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .bar {
        width: 15px;
        height: 290px;
        float: right;
        margin-top: -573px;
        background: url("../../assets/images/deviceList_close.png") no-repeat;
      }
    }
    .device-player-left-toolBar {
      width: 15px;
      height: 290px;
      margin-top: 300px;
      background: url("../../assets/images/deviceList_open.png") no-repeat;
    }
  }
}
.el-main.device-player-body{
  padding: 0;
}
.device-player-body {
  border: 1px solid #4ddcd0;
  background: url("/static/images/right_bg.png") 0 0 / 100% 100% no-repeat;
}
.play-list-color{
  color: #000!important;
}
</style>
<script>
// import "videojs-contrib-hls";
export default {
  data() {
    return {
      videos:[
        {
          ref: "v1",
          playerOptions: {
            width: "520",
            height: "270",
            preload: true,
            sources: [
              {
                type: "application/x-mpegURL",
                src: "http://10.12.26.199:20000/hls/test.m3u8"
              }
            ],
            autoplay: true,
            controls: false,
            poster: ""
          }
        },
        {
          ref: "v2",
          playerOptions: {
            width: "520",
            height: "270",
            preload: true,
            sources: [
              {
                type: "application/x-mpegURL",
                src: "http://10.12.26.199:20000/hls/test.m3u8"
              }
            ],
            autoplay: true,
            controls: false,
            poster: ""
          }
        },
        {
          ref: "v3",
          playerOptions: {
            width: "520",
            height: "270",
            preload: true,
            sources: [
              {
                type: "application/x-mpegURL",
                src: "http://10.12.26.199:20000/hls/test.m3u8"
              }
            ],
            autoplay: true,
            controls: false,
            poster: ""
          }
        },
        {
          ref: "v4",
          playerOptions: {
            width: "500",
            height: "300",
            preload: true,
            sources: [
              {
                type: "application/x-mpegURL",
                src: "http://192.168.0.67:20000/hls/test.m3u8"
              }
            ],
            autoplay: true,
            controls: false,
            poster: ""
          }
        },
        {
          ref: "v5",
          playerOptions: {
            width: "500",
            height: "300",
            preload: true,
            sources: [
              {
                type: "application/x-mpegURL",
                src: "http://192.168.0.67:20000/hls/test.m3u8"
              }
            ],
            autoplay: true,
            controls: false,
            poster: ""
          }
        },
        {
          ref: "v6",
          playerOptions: {
            width: "500",
            height: "300",
            preload: true,
            sources: [
              {
                type: "application/x-mpegURL",
                src: "http://192.168.0.67:20000/hls/test.m3u8"
              }
            ],
            autoplay: true,
            controls: false,
            poster: ""
          }
        },
        {
          ref: "v7",
          playerOptions: {
            width: "500",
            height: "300",
            preload: true,
            sources: [
              {
                type: "application/x-mpegURL",
                src: "http://192.168.0.67:20000/hls/test.m3u8"
              }
            ],
            autoplay: true,
            controls: false,
            poster: ""
          }
        },
        {
          ref: "v8",
          playerOptions: {
            width: "500",
            height: "300",
            preload: true,
            sources: [
              {
                type: "application/x-mpegURL",
                src: "http://192.168.0.67:20000/hls/test.m3u8"
              }
            ],
            autoplay: true,
            controls: false,
            poster: ""
          }
        },
        {
          ref: "v9",
          playerOptions: {
            width: "500",
            height: "300",
            preload: true,
            sources: [
              {
                type: "application/x-mpegURL",
                src: "http://192.168.0.67:20000/hls/test.m3u8"
              }
            ],
            autoplay: true,
            controls: false,
            poster: ""
          }
        }
      ],
      leftContent: false,
      leftToolBar: true,
      layoutFlag:9,
      layout1: require("../../assets/images/deviceMonitor_1.png"),
      layout4: require("../../assets/images/deviceMonitor_4.png"),
      layout9: require("../../assets/images/deviceMonitor_9_focus.png"),
      playIdList:[],
      BASEPATH:"http://10.12.26.3:20039/",
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1"
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1"
            },
            {
              label: "二级 2-2"
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1"
            },
            {
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.getDeviceData();
  },
  mounted(){
    this.changeLayout(9);
  },
  methods: {
    showLeftContent() {
      this.leftContent = true;
      this.leftToolBar = false;
      if(this.layoutFlag == 1){
        $('.player-border').removeClass('large-long');
        $('.player-border').addClass('large-short');
      }
    },
    hideLeftContent() {
      this.leftContent = false;
      this.leftToolBar = true;
      if(this.layoutFlag == 1){
        $('.player-border').removeClass('large-short');
        $('.player-border').addClass('large-long');
      }
    },
    changeLayout(index) {
      if (index!= this.layoutFlag) {
        //图片变量切换
        this["layout"+index] = require("../../assets/images/deviceMonitor_"+index+"_focus.png");
        this["layout"+this.layoutFlag] = require("../../assets/images/deviceMonitor_"+this.layoutFlag+".png");
        this.layoutFlag = index;
        //
      }
      switch (index) {
        case 1:
          $('.player-border').removeClass('mini'); 
          $('.player-border').removeClass('middle');
          $('.player-border').removeClass('large-long');
          $('.player-border').addClass('large-short');
          break;
        case 4:
          $('.player-border').removeClass('mini'); 
          $('.player-border').removeClass('large-short');
          $('.player-border').removeClass('large-long');
          $('.player-border').addClass('middle'); 
          break;
        case 9:
          $('.player-border').removeClass('large-short'); 
          $('.player-border').removeClass('large-long');
          $('.player-border').removeClass('middle');
          $('.player-border').addClass('mini');
          break;
      
        default:
          break;
      }
    },
    getDeviceData(){
      this.$axios({
        method: 'GET',
        url: this.BASEPATH + '/info/deviceManage/findDevListInMap?timestamp=' + new Date().getTime(),
      }).then(( res )=>{
        this.data=[];
        let dataList = res.data
        let parent = []
        let parentbak=[]
        dataList.forEach((item,index) => {
          if(item.areaId){
            let ta = {}
            ta.label=item.areaName
            ta.children = [];
            if(!parentbak.includes(item.areaId))
            {
                parent.push(ta)
                parentbak.push(item.areaId)
            }
          }
        });
        dataList.forEach((item,index) => {
          if(item.areaId){
            let cn = parentbak.indexOf(item.areaId)
            parent[cn].children.push({label:item.deviceName,value:item.id})
          }
        });
         this.data = parent
      })
    },
    handleNodeClick(a,b,c){
      if(!a.children && this.playIdList.indexOf(a.value)==-1){
        if(this.playIdList.length>=this.layoutFlag){
          this.$message.error("aaaaaa")
          return;
        }
        this.playIdList.push(a.value);
        c.$children[0].$el.style.color="#33f7fa"
      }
      console.log(  this.playIdList )
    }
  }
};
</script>


