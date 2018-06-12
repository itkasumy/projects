<template>
  <div id="organManage">
    <!-- 下边主体 -->
    <el-main  class="app-main table-page orgMan" >
      <h2 class="tp-title">机构管理</h2>
      <div>
        <div class="tp-header">
          <div class="tp-left">
            <el-button size="small" type="primary" round @click="addEquipment">+新增机构</el-button>
          </div>
          <div class="tp-right">
            <div class="tp-result">
              <span>共搜索到<span class="tp-result-count">{{resultCount}}</span>条记录</span>
              <el-button size="small" type="text" @click="reset">重置</el-button>
            </div>
              <div class="tp-input-group">
                <ul>
                  <li class="input">
                    <el-input size="small" :clearable="true" v-model="inputValue" placeholder="输入操作项查询"></el-input>
                  </li>
                  <li>
                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>

      <div class="org-dept-list-container">
            <div style="display:flex;flex-direction:column;flex:1; height:100%;">
              <div style="display:flex" class="el-col-style" v-for="(o, index) in  num%4 >= 1 ? Math.ceil(num/4) :Math.floor(num/4)" :key="o" >
                <el-card  body-style="height: auto;width:300px;border:1px solid #E5EDF6;border-radius:4%;">
                  <div class="level-card" @mouseover="enter(index)" @mouseout="leave(index)">
                     <div class="org-card-title">w我是测试来saaaaaaaaaassss的w我是</div>
                        <div class="level-card-top">
                          <img src="../../assets/images/btn-areaGroup.png" style="width:20px;height:20px" @click="cfgOrgAreaGroupAuthority(o)">
                          <div class="organ-operation-hover" :id="'aaaa'+index">
                            <img src="../../assets/images/edit.png" style="width:20px;height:20px"  @click="editItem(o)">
                            <img src="../../assets/images/delete.png"  style="margin-left:6px;width:20px;height:20px" @click="deleteItem(o)">
                          </div>
                          <div class="organ-operation-unhover" :id="'bbbb'+ index">
                             <img src="../../assets/images/btn-areaGroup-full.png" class= "area-img"  @click="editItem(o)">
                          </div>
                      </div>
                      <div class="level-card-content">
                        <m-tree
                          v-model="tableTree"
                          @SaveEdit="SaveEdit"
                          @DelNode="DelNode"
                          @NodeClick="handleNodeClick"></m-tree>
                      </div>
                      <div class="org-card-area-lable">
                          <div class="org-card-area-img"  @click="addBg()">
                            <img :src="areaShowFlag?img1:img2" >
                          </div>
                          <div v-show="areaShowFlag" style="height:100px;text-align:left;overflowe-y:scroll">
                            <el-tag class="org-card-area-tag"
                              v-for="tag in tags"
                              :key="tag.name"
                              size = "small"
                              :type="tag.type">
                              {{tag.name}}
                            </el-tag>
                          </div>
                      </div>
                  </div>
                </el-card>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;flex:1; height:100%;">
              <div style="display:flex" class="el-col-style" v-for="(o, index) in  num%4 >= 2 ? Math.ceil(num/4) :Math.floor(num/4)" :key="o" >
                <el-card  body-style="height: auto;width:300px;border:1px solid #E5EDF6;border-radius:4%;">
                    <div class="level-card" @mouseover="enter(index)" @mouseout="leave(index)">
                     <div class="org-card-title">w我是测试来saaaaaaaaaassss的w我是</div>
                        <div class="level-card-top">
                          <img src="../../assets/images/btn-areaGroup.png" style="width:20px;height:20px" @click="cfgOrgAreaGroupAuthority(o)">
                          <div class="organ-operation-hover" :id="'aaaa'+index">
                            <img src="../../assets/images/edit.png" style="width:20px;height:20px"  @click="editItem(o)">
                            <img src="../../assets/images/delete.png"  style="margin-left:6px;width:20px;height:20px" @click="deleteItem(o)">
                          </div>
                          <div class="organ-operation-unhover" :id="'bbbb'+ index">
                             <img src="../../assets/images/btn-areaGroup-full.png" class= "area-img"  @click="editItem(o)">
                          </div>
                      </div>
                      <div class="level-card-content">
                        <el-tree :data="testData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                      </div>
                      <div class="org-card-area-lable">
                          <div class="org-card-area-img"  @click="addBg()">
                            <img :src="areaShowFlag?img1:img2" >
                          </div>
                          <div v-show="areaShowFlag" style="height:100px;text-align:left;overflowe-y:scroll">
                            <el-tag class="org-card-area-tag"
                              v-for="tag in tags"
                              :key="tag.name"
                              size = "small"
                              :type="tag.type">
                              {{tag.name}}
                            </el-tag>
                          </div>
                      </div>
                  </div>
                </el-card>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;flex:1; height:100%;">
              <div style="display:flex" class="el-col-style" v-for="(o, index) in  num%4 >= 3 ? Math.ceil(num/4) :Math.floor(num/4)" :key="o" >
                <el-card  body-style="height:auto;width:300px;border:1px solid #E5EDF6;border-radius:4%;">
                 <div class="level-card" @mouseover="enter(index)" @mouseout="leave(index)">
                     <div class="org-card-title">w我是测试来saaaaaaaaaassss的w我是</div>
                        <div class="level-card-top">
                          <img src="../../assets/images/btn-areaGroup.png" style="width:20px;height:20px" @click="cfgOrgAreaGroupAuthority(o)">
                          <div class="organ-operation-hover" :id="'aaaa'+index">
                            <img src="../../assets/images/edit.png" style="width:20px;height:20px"  @click="editItem(o)">
                            <img src="../../assets/images/delete.png"  style="margin-left:6px;width:20px;height:20px" @click="deleteItem(o)">
                          </div>
                          <div class="organ-operation-unhover" :id="'bbbb'+ index">
                             <img src="../../assets/images/btn-areaGroup-full.png" class= "area-img"  @click="editItem(o)">
                          </div>
                      </div>
                      <div class="level-card-content">
                        <el-tree :data="testData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                      </div>
                      <div class="org-card-area-lable">
                          <div class="org-card-area-img"  @click="addBg()">
                            <img :src="areaShowFlag?img1:img2" >
                          </div>
                          <div v-show="areaShowFlag" style="height:100px;text-align:left;overflowe-y:scroll">
                            <el-tag class="org-card-area-tag"
                              v-for="tag in tags"
                              :key="tag.name"
                              size = "small"
                              :type="tag.type">
                              {{tag.name}}
                            </el-tag>
                          </div>
                      </div>
                  </div>
                </el-card>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;flex:1; height:100%;">
              <div style="display:flex" class="el-col-style" v-for="(o, index) in Math.floor(num/4)" :key="o" >
                <el-card  body-style="height: auto;width:300px;border:1px solid #E5EDF6;border-radius:4%;">
                 <div class="level-card" @mouseover="enter(index)" @mouseout="leave(index)">
                     <div class="org-card-title">w我是测试来saaaaaaaaaassss的w我是</div>
                        <div class="level-card-top">
                          <img src="../../assets/images/btn-areaGroup.png" style="width:20px;height:20px" @click="cfgOrgAreaGroupAuthority(o)">
                          <div class="organ-operation-hover" :id="'aaaa'+index">
                            <img src="../../assets/images/edit.png" style="width:20px;height:20px"  @click="editItem(o)">
                            <img src="../../assets/images/delete.png"  style="margin-left:6px;width:20px;height:20px" @click="deleteItem(o)">
                          </div>
                          <div class="organ-operation-unhover" :id="'bbbb'+ index">
                             <img src="../../assets/images/btn-areaGroup-full.png" class= "area-img"  @click="editItem(o)">
                          </div>
                      </div>
                      <div class="level-card-content">
                        <el-tree :data="testData" :props="defaultProps"  @node-click="handleNodeClick"></el-tree>
                      </div>
                      <div class="org-card-area-lable">
                          <div class="org-card-area-img"  @click="addBg()">
                            <img :src="areaShowFlag?img1:img2" >
                          </div>
                          <div v-show="areaShowFlag" style="height:100px;text-align:left;overflowe-y:scroll">
                            <el-tag class="org-card-area-tag"
                              v-for="tag in tags"
                              :key="tag.name"
                              size = "small"
                              :type="tag.type">
                              {{tag.name}}
                            </el-tag>
                          </div>
                      </div>
                  </div>
                </el-card>
              </div>
            </div>
        <ul class="org-dept-list">
          <li>
            <div class="orgItemHeader">
              <el-tooltip class="item" effect="dark" content="机构名称机构名称机构名称机构名称机构名称机构名称" placement="top-start">
                <h4 class="title">机构名称机构名称机构名称机构名称机构名称机构名称</h4>
              </el-tooltip>
              <div class="toolTips">
                <div class="configBtn">
                  <el-button size="mini" icon="el-icon-share"></el-button>分配区域组
                </div>
                <div class="cfgEdtDel">
                  <div class="cfgBtnCt"><el-button size="mini" icon="el-icon-share"></el-button></div>
                  <div class="edtBtnCt"><el-button size="mini" icon="el-icon-edit"></el-button></div>
                  <div class="delBtnCt"><el-button size="mini" icon="el-icon-delete"></el-button></div>
                </div>
              </div>
            </div>

            <div class="ortItemBody">
              <el-tree :data="testData" :props="defaultProps"  @node-click="handleNodeClick"></el-tree>
            </div>

            <div class="orgItemFooter">
              <div class="title showAreaGroupsTag"></div>
              <div class="tagsListCt">
                <div class="tagItem">
                  <el-tooltip class="item" effect="dark" content="机构名称机构名称机构名称机构名称机构名称机构名称" placement="top-start">
                    <span>区域组名称</span>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <el-dialog :visible="createNewOrgModal" width="560px" :show-close="false" :close-on-click-modal="false" class="createOrg">
        <div class="organInfoCollectionCont">
          <h2 class="title">新建机构</h2>
          <div class="infoBox">
            <tree-menu :data="newOrg" @renderSubMenu="renderSubMenu"></tree-menu>
          </div>
        </div>
        <div class="btnCont">
          <el-button type="primary" size="small" @click="createADepartment">保存</el-button>
          <el-button size="small" @click="createNewOrgModal = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible="editOrgModel" width="998px" :show-close="false" :close-on-click-modal="false" class="editOrg">
        <div class="configTitle">
          <h2 class="title">分配区域组权限</h2>
          <p class="subTitle">请优先给机构分配区域组权限</p>
        </div>
        <div class="configCont">
          <div class="funcList">
            <div class="infoBox">
              <tree-menu :data="newOrg" @renderSubMenu="renderSubMenu"></tree-menu>
            </div>
          </div>
          <div class="areaGroupList">
            <h4 class="areaGroupListTitle">区域组列表</h4>
            <div class="areaGroupListCont">
              <el-checkbox-group v-model="areasGroupCheckedList" :min="min" :max="max">
                <el-tooltip v-for="item in areaGroupList" class="item" effect="dark" :open-delay="800" :content="item.areaGroupName" placement="top-start" :key="item.areaId">
                  <el-checkbox @click.native.stop="checkLen" :label="item.areaGroupId">{{item.areaGroupName}}</el-checkbox>
                </el-tooltip>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="btnCont">
          <el-button type="primary" size="small" @click="createADepartment">保存</el-button>
          <el-button size="small" @click="editOrgModel = false">重置</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
  import MTree from './tree/Index.vue'
  import treeMenu from 'components/treeMenu'
  import { fmtNewOrg } from '@/common/js/organManage'
  export default {
    data () {
      return {
        resultCount: 0,
        createNewOrgModal: false,
        newOrg: [
          {
            deptName: '',
            showSubTree: false,
            showAddMinusBtn: false,
            level: 1
          }
        ],
        editOrgModel: false,
        areaGroupList: [],
        areasGroupCheckedList: [],
        min: 1,
        max: 6,
        inputValue: "",
        img1: require('../../assets/images/up-areaGroup.png'),
        img2: require('../../assets/images/down-areaGroup.png'),

        num:11,
        cardTitle: false,
        areaShowFlag :false,
          tags: [
            { name: '标签一标签一标签一标签一标签一', type: 'info' },
            { name: '标签二', type: 'info' },
            { name: '标签三', type: 'info' },
            { name: '标签四', type: 'info' },
            { name: '标签五', type: 'info' },
            { name: '标签1标签一标签一标签一标签一', type: 'info' },
            { name: '标签3', type: 'info' },
            { name: '标签4', type: 'info' },
            { name: '标签1', type: 'info' },
            { name: '标签2', type: 'info' }

          ],
          tableTree: [
            {
              "value": 1,
              "label": "安检部",
              "status":0,
              "children": [
                {
                  "value": 2,
                  "label": "DOTA2",
                  "status":-1,
                  "children": []
                },
                {
                  "value": 3,
                  "label": "测试表格二",
                  "status":-1,
                  "children": []
                },
                {
                  "value": 4,
                  "label": "测试表格三",
                  "status":-1,
                  "children": []
                }
              ]
            },
            {
              "value": 5,
              "label": "护卫部",
              "status":0,
              "children": [
                {
                  "value": 6,
                  "label": "测试表格四",
                  "status":-1,
                  "children": []
                },
                {
                  "value": 7,
                  "label": "测试表格五",
                  "status":-1,
                  "children": []
                }
              ]
            },
            {
              "value": 8,
              "label": "其他部",
              "status":0,
              "children": [
                {
                  "value": 9,
                  "label": "其他一部",
                  "status":0,
                  "children": [
                    {
                      "value": 11,
                      "label": "内容测试",
                      "status":0,
                      "children": [
                        {
                          "value": 12,
                          "label": "测试表格六",
                          "status":-1,
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "value": 10,
                  "label": "其他二部",
                  "status":0,
                  "children": [
                    {
                      "value": 13,
                      "label": "测试表格七",
                      "status":-1,
                      "children": []
                    }
                  ]
                }
              ]
            }
      ],
        testData: [],
        defaultProps: {
          children: "children",
          label: "label"
        }
      };
    },
    components: { 
        MTree,
        treeMenu
      },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      addEquipment() {
        this.createNewOrgModal = true
      },
      renderSubMenu (list) {
        this.$set(this.newOrg[0], 'deptChildrenList', list)
      },
      createADepartment () {
        // console.log(this.newOrg)
        // console.log(fmtNewOrg(this.newOrg))
        const fmtedNewOrgan = fmtNewOrg(this.newOrg)
        this.$axios.post('/base/depts', fmtedNewOrgan)
          .then(() => {
            // this.newOrg = [{deptName: '', showSubTree: false, showAddMinusBtn: false, level: 1 }]
            // console.log(this.newOrg)
          })
          .catch(err => {
            console.log(err)
            // this.newOrg = [{deptName: '', showSubTree: false, showAddMinusBtn: false, level: 1 }]
          })
          // this.newOrg = [{deptName: '', showSubTree: false, showAddMinusBtn: false, level: 1 }]
        this.createNewOrgModal = false
      },
      getAllGroup () {
        this.$axios.post('/info/areagroup/getAllGroup')
        .then(data => {
          const backList = data.data
          // console.log(backList)
          backList.forEach(item => {
            this.areaGroupList.push({
              areaGroupId: item.areaGroupId,
              areaGroupName: item.areaGroupName
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
      },
      checkLen () {
        if (this.areasGroupCheckedList.length >= this.max) {
          this.$message({
            message: `最多可以选择${this.max}个区域`,
            type: 'warning',
            center: true
          })
        }
      },
      cfgOrgAreaGroupAuthority (id) {
        this.editOrgModel = true
        this.$axios.post(`/base/depts/${id}/overview`)
          .then(data => {})
          .catch(err => {})
      },
      reset() {
        console.log("reset");
      },
      search() {
        console.log("search");
      },
      addBg() {
          this.areaShowFlag = !this.areaShowFlag;
          // this.isSelect = this.isSelect ? false : true;
        },

        handleNodeClick(nodeData){
          // if(nodeData.status == -1 ){
          //   this.$http.get(this.HOST+'/admin/data/table/'+nodeData.label+'/create').then((response) => {
          //     if(response.status == 200){
          //       var data = response.body.data
          //       var tableParam = {
          //         name:nodeData.label,
          //         label:nodeData.label,
          //         type:'data',
          //         info:data,
          //         active:true
          //       }
          //       this.$store.commit('addTabItem', tableParam)
          //     }
          //   })
          // }
        },
        SaveEdit(parentNode,data,next){
          // var param = {
          //   isAdd:data.isAdd,
          //   parentNode:parentNode,
          //   node:data
          // }
          // this.$http.post(this.HOST+'/admin/system/tree/edit',param).then((response) => {
          //   if(response.status == 200){
          //     if(data.isAdd){
          //       next(true,response.body.data.tid)
          //     }else{
          //       next(true)
          //     }
          //   }
          // })
        },
        DelNode(parentNode,data,next){
        //     var param = {
        //       node:data
        //     }
        //     this.$http.post(this.HOST+'/admin/system/tree/del',param).then((response) => {
        //       if(response.status == 200){
        //         next(true)
        //       }
        //     })
        //   }
        // }
        },
        enter: function(o) {
          document.getElementById("bbbb"+o).style.transform = "scaleX(0)" 
          document.getElementById("bbbb"+o).style.webkitTransform = "scaleX(0)" 
          document.getElementById("aaaa"+o).style.transform = "scaleX(1)" 
          document.getElementById("aaaa"+o).style.webkitTransform = "scaleX(1)" 
          //  $("#aaaa").hide();
        },
        leave: function(o) {
            document.getElementById("aaaa"+o).style.transform = "scaleX(0)" 
          document.getElementById("aaaa"+o).style.webkitTransform = "scaleX(0)" 
          document.getElementById("bbbb"+o).style.transform = "scaleX(1)" 
          document.getElementById("bbbb"+o).style.webkitTransform = "scaleX(1)" 
            // $("#aaaa").show();
        }
    },
    created () {
      this.getAllGroup()
    }
  }
</script>

<style  lang="scss">
@import "../../common/css/tablePageCommon.scss";
.orgMan {
  .el-main {
    color: #333;
    background-color: #fff;
  }

  .level-card {
    text-align: center;
    margin-bottom: 18px;
    .level-card-color {
      margin-left: 40%;
      // margin: 0% 40%;
      border-radius:50%;
      -webkit-border-radius: 50%;
      height: 50px;
      width: 50px;
      // background-color:red;
      margin-top: 10px;
    }
    .org-card-title{
      width: 60%;
      float: left;
      font-size: 16px;
      font-weight: bold;
      color: rgb(71,162,255);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .org-card-area-lable{
      margin-top: 2%;
      .org-card-area-img{
        text-align: left;
      }
    }
    .org-card-area{
      height:100px;
      text-align:left;
      overflow-y:scroll;
    }
   
    .org-card-area-tag{
      margin-left: 2%;
       margin-top: 5px;
       border-radius: 11px
    }
    .organ-operation-unhover{
      margin-top: -28%;
      float: right;
      transition: all ease 400ms;
      -webkit-transition: all ease 400ms;
      -moz-transition: all ease 400ms;
      -o-transition: all ease 400ms;
      transform-origin: 0% 50%;
    }
    .organ-operation-hover{
      float: right;
      transition: all ease 400ms;
      -webkit-transition: all ease 400ms;
      -moz-transition: all ease 400ms;
      -o-transition: all ease 400ms;
      transform-origin: 0% 50%;
    }
    .area-img{
      width: 61px;
      height: 20px;
      margin-right: 2px;
    }
//  #aaaa:hover{
//   width: 0px;
// }
    .level-card-top {
      margin-left: 70%;
      height: 20px;
      position: relative;
    }
    .level-card-content {
      margin-top: 5%;
      font-size: 16px;
      min-height: 300px;
      text-align: center;
      width: auto;
    }
  }

  .el-col-style {
    margin-top: 3%;
    padding-left: 30px;
    padding-right: 30px;
    .el-card {
      -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
      border: 0px solid #e5edf6;
      border-radius: 4%;
    }
    .el-card:hover {
      -webkit-box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.1);
      border: 0px solid #e5edf6;
      border-radius: 4%;
    }
  }
}
</style>

<style lang="scss">
  #organManage {
    .org-dept-list-container {
      padding: 18px 24px;
      .org-dept-list {
        column-count: 4;
        /* display: flex;
        flex-direction: row;
        flex-wrap: wrap; */
        > li {
          width: 362px;
          min-height: 472px;
          padding: 15px 20px;
          margin-bottom: 60px;
          box-sizing: border-box;
          break-inside: avoid;
          border: 1px solid #DFE9F4;
          border-radius: 8px;
          text-align: left;
          &:hover {
            border: 1px solid transparent;
            box-shadow: 0 0 10px #DFE9F4;
          }
          .orgItemHeader {
            height: 28px;
            line-height: 28px;
            padding-bottom: 14px;
            .title {
              float: left;
              width: 180px;
              height: 28px;
              padding-right: 8px;
              font-size: 15px;
              color: #409eff;
              font-weight: 500;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .toolTips {
              float: right;
              width: 104px;
              .configBtn {
                width: 97px;
                height: 28px;
                line-height: 28px;
                background: #eff7ff;
                border-radius: 6px;
                color: #229fff;
                .el-button {
                  width: 28px;
                  height: 28px;
                  line-height: 28px;
                  text-align: center;
                  padding: 0;
                  background: transparent;
                  border: none;
                  color: #229fff;
                  font-size: 22px;
                  font-weight: 700;
                  vertical-align: middle;
                }
              }
              .cfgEdtDel {
                width: 104px;
                display: none;
                justify-content: space-between;
                .cfgBtnCt, .edtBtnCt, .delBtnCt {
                  width: 28px;
                  height: 28px;
                  .el-button {
                    width: 28px;
                    height: 28px;
                    padding: 0;
                    text-align: center;
                    border: none;
                    color: #409eff;
                    background: #EFF7FF;
                    border-radius: 6px;
                  }
                }
                .delBtnCt {
                  .el-button {
                    color: #ff7c7c;
                  }
                  &.unDelAbl {
                    color: #ff7c7c;
                  }
                }
              }
              &:hover {
                .configBtn {
                  display: none;
                }
                .cfgEdtDel {
                  display: flex;
                  justify-content: space-between;
                }
              }
            }
          }

          .orgItemFooter {
            .title {
              height: 28px;
              background: url("../../assets/images/down-areaGroup.png") 0 7px no-repeat;
              &.showAreaGroupsTag {
                background: url("../../assets/images/up-areaGroup.png") 0 7px no-repeat;
              }
            }
            .tagsListCt {
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              .tagItem {
                width: auto;
                max-width: 160px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                padding: 0 14px;
                margin: 7px 10px 7px 0;
                background: #f3f7fa;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #999999;
                border-radius: 14px;
                cursor: pointer;
                &:hover {
                  color: #409eff;
                }
              }
            }
          }
        }
      }
    }

    .createOrg {
      .el-dialog {
        height: 754px;
        border-radius: 6px;
        padding: 22px 20px 22px 35px;
        .el-dialog__header {
          display: none;
        }
        .el-dialog__body {
          display: flex;
          padding: 0;
          .organInfoCollectionCont {
            flex: 1;
            .title {
              line-height: 32px;
              font-size: 18px;
              font-weight: 500;
              text-align: left;
            }
            .infoBox {
              text-align: left;
              padding-top: 20px;
              height: 640px;
              overflow-y: scroll;
              .oganNameCont {
                padding-left: 15px;
                display: flex;
              }
              .deptNameCont {
                padding-left: 38px;
                display: flex;
              }
              // .el-input {
              //   width: auto;
              //   margin: 0 2px;
              //   line-height: 18px;
              // }
              .el-input__inner {
                width: auto;
                height: 24px;
                line-height: 24px;
                border: none;
                color: #5a5a5a;
                transition: none;
                border: 1px solid transparent;
                &:focus {
                  border: 1px solid #dcdfe6;
                }
              }
              // .el-button {
              //   width: 18px;
              //   height: 18px;
              //   background: none;
              //   line-height: 18px;
              //   padding: 0px;
              //   font-size: 18px;
              //   color: #44aeff;
              //   border: none;
              // }
            }
          }
          .btnCont {
            width: 100px;
            .el-button {
              width: 100px;
              margin: 0;
              &.el-button--default {
                margin-top: 11px;
              }
            }
          }
        }      
      }
    }

    .editOrg {
      .el-dialog {
        height: 754px;
        border-radius: 6px;
        padding:  20px 20px 60px 35px;
        .el-dialog__header {
          display: none;
        }
        .el-dialog__body {
          padding: 0;
          .configTitle {
            height: 81px;
            text-align: left;
            .title {
              line-height: 38px;
              font-size: 18px;
              font-weight: 500;
            }
            .subTitle {
              line-height: 12px;
              color: #a1a1a1;
            }
          }
          .configCont {
            height: 518px;
            display: flex;
            .funcList {
              width: 271px;
              border-right: 2px solid #EDF2FB;
            }
            .areaGroupList {
              flex: 1;
              text-align: left;
              padding: 0 42px 42px;
              .areaGroupListTitle {
                height: 42px;
                line-height: 34px;
                font-size: 14px;
                font-weight: 500;
                color: #5a5a5a;
              }
              .areaGroupListCont {
                height: 420px;
                overflow-y: scroll;
                .el-checkbox {
                  width: 33.33%;
                  line-height: 35px;
                  margin: 0;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .el-checkbox__label {
                  color: #868686;
                }
              }
            }
          }
          .btnCont {
            height: 32px;
            padding-top: 43px;
            .el-button {
              width: 100px;
              margin: 0;
              &:nth-child(2) {
                margin-left: 12px;
              }
            }
          }
          // .organInfoCollectionCont {
          //   .infoBox {
          //     text-align: left;
          //     padding-top: 20px;
          //     height: 640px;
          //     overflow-y: scroll;
          //     .oganNameCont {
          //       padding-left: 15px;
          //       display: flex;
          //     }
          //     .deptNameCont {
          //       padding-left: 38px;
          //       display: flex;
          //     }
          //     .el-input {
          //       width: auto;
          //       margin: 0 2px;
          //       line-height: 18px;
          //     }
          //     .el-input__inner {
          //       width: auto;
          //       height: 24px;
          //       line-height: 24px;
          //       border: none;
          //       color: #5a5a5a;
          //       transition: none;
          //       border: 1px solid transparent;
          //       &:focus {
          //         border: 1px solid #dcdfe6;
          //       }
          //     }
          //     // .el-button {
          //     //   width: 18px;
          //     //   height: 18px;
          //     //   background: none;
          //     //   line-height: 18px;
          //     //   padding: 0px;
          //     //   font-size: 18px;
          //     //   color: #44aeff;
          //     //   border: none;
          //     // }
          //   }
          // }
        }      
      }
    }
  }
</style>
