<template>
 <div>
        <!-- 下边主体 -->
        <el-main>
        <div id="allmap" style ="width:100%; height:100%"></div>
        <count-msg id="countMsgBox" class="back" v-show="isCountMsgShow" @closeCountMsg="changeCountMsg"/>
        <div class="back">
          <img src="../../assets/images/expand.png"  class="expandImg" v-show="!isCountMsgShow" @click="changeCountMsg"/>
        </div>
        </el-main>
 </div>
</template>

<style style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.back{
  z-index: 2;
  position: absolute;
  top: 29px;
  left: 32px;
  // padding: 0.1rem;
  .expandImg{
    margin-top:1px;
    position: relative;
      width: 3rem;
      left: 1.5rem;
  }
}


</style>
<script >
import {createMap} from '../../common/js/createMap.js'
import {setLevelIcon} from '../../common/js/setLevelIcon.js'
import {setAreaName} from '../../common/js/setAreaName.js'
import {setPosMsg} from '../../common/js/setPosMsg.js'
import {createCountMsg} from './js/createCountMsg.js'
import countMsg from '../../components/countMsg.vue'

// 引入柱状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
 export default {
        data() {
            return {
              isCountMsgShow:false,
                map:null,
                zones:[{
                  zoneName:'',
                  zonePath:[
                    {lat:31.23855114,lng:121.48397863}
                  ]
                }],
                people:[{
                  personImgUrl:'',
                  personPoint:{lat:31.23855114,lng:121.48397863}
                }],
                mapZones:[],
                mapPeople:[],
                peopleInZone:[{
                  sum:0,tns:[{typeName:'',number:0}]
                }],
            }

        },
        components: {
          'count-msg': countMsg
        },
        mounted() {
            this.ready();
        },
        watch:{
          zones() {
               if(this.zones.length > 0){
                  this.zones.forEach(zone => {
                    //调用地图组件-画出区域
                    let zm = setAreaName(this.map,{name:zone.zoneName,path:zone.zonePath})
                    this.mapZones.push(zm.polygon);
                    // this.setZoneMouseListener(zm);
                    // this.setZoneClickListener(zm);
                  })
                }
          },
          people() {
                if(this.people.length > 0){
                  this.people.forEach(person => {
                    //调用地图组件画出人头像
                    setLevelIcon(this.map,person.personPoint,{})
                    let mp;
                    // mapPeople.push(mp);
                  })
                }
          },
          mapZones(){
            if(this.mapZones.length > 0){
              this.mapZones.forEach(mz => {
                this.addNumMsg(mz);
              })
            }
          }
        },
        methods:{
            ready:function(){
              var startX = 31.24032140;
              var startY = 121.48093700;
              this.map = createMap('allmap');
              this.showZones();
              this.showPeople();
              const map = this.map;
              //添加重点人员显示InfoBox
              // createCountMsg(this.map,{lat:startX,lng:startY},'');
              //雷达效果==save
              // var startCenterX = map.center.lat();
              // var startCenterY = map.center.lng();
              // var marker = createCountMsg(this.map,{lat:startX,lng:startY},'');
              // this.map.addListener('mousedown',function (params) {
              //   console.log('map+mousedown',params);
              //   startCenterX = map.center.lat();
              //   startCenterY = map.center.lng();
              // })
              // this.map.addListener('mouseup',function (params) {
              //   console.log('map.center',map.center.lat());
              //   startX = map.center.lat() - startCenterX + startX;
              //   startY = map.center.lng() - startCenterY + startY;
              //   marker.setPosition(new google.maps.LatLng(startX,startY));
              // })
            },
            showZones(){
              // const url = '/getZonesTest';
              // this.$axios.get(url).then(res=>{
              //   this.zones = res.data;
                
              // })
              this.zones = [{
                  zoneName:'aaa',
                  zonePath:[
                    {lat:31.23855114,lng:121.48397863},
                    {lat:31.23891592,lng:121.48564160},
                    {lat:31.23761773,lng:121.48587763},
                    {lat:31.23729587,lng:121.48440778}
                  ]
                },{
                  zoneName:'bbb',
                  zonePath:[
                    {lat:31.23699546,lng:121.48282528},
                    {lat:31.23728514,lng:121.48440242},
                    {lat:31.23583674,lng:121.48489058},
                   {lat:31.23527884,lng:121.48333490}
                  ]
                }
                ];
            },
            showPeople(){
              // const url = '/getPeopleTest';
              // this.$axios.get(url).then(res=>{
              //   this.people = res.data;
                
              // })
              this.people = [{
                  personImgUrl:'',
                  personPoint:
                  {lat:31.23940408,lng:121.48526609}
                },{
                  personImgUrl:'',
                  personPoint:{lat:31.23935580,lng:121.48655355}
                },{
                  personImgUrl:'',
                  personPoint:{lat:31.23807371,lng:121.48643553}
                },{
                  personImgUrl:'',
                  personPoint:{lat:31.23628199,lng:121.48678958}
                },{
                  personImgUrl:'',
                  personPoint:{lat:31.23734954,lng:121.48377478}
                }];
            },
            setZoneClickListener(zoneMap){
              //打开区域人员详细表,zoneMap是一个polygon
              let lngs = [];
              zoneMap.getPath().forEach(path => {
                lngs.push(path.lng);
              })
              let maxLng = Math.max(lngs);
              this.createPeopleCountMarker(maxLng);
            },
            createPeopleCountMarker(maxLng){

            },
            changeCountMsg(){
              this.isCountMsgShow = !this.isCountMsgShow;
              let box = document.getElementById('countMsgBox');
              /* if(this.isCountMsgShow){
                box.style.transitionDuration='5s';
                box.style.webkitTransitionDuration = '5s';
                box.style.transform = 'translate(0,300px)';
                box.style.msTransform = 'translate(0,300px)';
                box.style.webkitTransform = 'translate(0,300px)';
                box.style.mozTransform='translate(0,300px)';
                box.style.oTransform='translate(0,300px)';
              }else{
                box.style.transitionDuration='5s';
                box.style.webkitTransitionDuration = '5s';
                box.style.transform = 'translate(0,-300px)';
                box.style.msTransform = 'translate(0,-300px)';
                box.style.webkitTransform = 'translate(0,-300px)';
                box.style.mozTransform='translate(0,-300px)';
                box.style.oTransform='translate(0,-300px)';
              } */
            },
            addNumMsg(zm){
              var path = zm.getPath().getArray();
                var lat = 0;
                var lng = 0;
                path.forEach(pa =>{
                  var l = pa.lat();
                  var n = pa.lng();
                  if(lng < n){
                    lat = l;
                    lng = n;
                  }
                });
                return createCountMsg(this.map,{lat:lat,lng:lng},'');           
            }
        }
    }
</script>
