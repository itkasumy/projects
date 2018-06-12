<template>
  <div id="organManage">
    <el-main  class="app-main table-page orgMan" >
      <h2 class="tp-title">机构管理</h2>
      <div>
        <div class="tp-header">
          <div class="tp-left">
            <el-button size="small" type="primary" round @click="addEquipment">+新增机构</el-button>
          </div>
          <div class="tp-right">
            <div class="tp-result">
              <span>共搜索到<span class="tp-result-count"> {{resultCount}} </span>条记录</span>
              <el-button size="small" type="text" @click="reset">重置</el-button>
            </div>
              <div class="tp-input-group">
                <ul>
                  <li class="input">
                    <el-input size="small" :clearable="true" @keyup.native.enter="search" v-model="searchingStr" placeholder="输入操作项查询"></el-input>
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
        <ul class="org-dept-list">
          <li v-for="(item, idx) in orgList" :key="idx">
            <div class="content">
              <div class="orgItemHeader" :class="{'fbdshow': item.optState.operateBtnsShow}">
                <el-tooltip class="item" effect="dark" :content="item.treeList[0].deptName" placement="top-start">
                  <h4 class="title">{{item.treeList[0].deptName}}</h4>
                </el-tooltip>
                <div class="toolTips">
                  <div class="configBtn">
                    <el-button size="mini" icon="el-icon-share"></el-button>分配区域组
                  </div>
                  <div class="cfgEdtDel">
                    <div class="cfgBtnCt"><el-button @click="cfgOrgAreaGroupAuthority(item)" size="mini" icon="el-icon-share"></el-button></div>
                    <div class="edtBtnCt"><el-button @click="toEditOrgCfg(item)" size="mini" icon="el-icon-edit"></el-button></div>
                    <div class="delBtnCt">
                      <el-button v-show="true" size="mini" icon="el-icon-delete" @click="delCurOrg(item)"></el-button>
                      <el-tooltip class="item" effect="dark" content="机构已被使用，不可删除" placement="top-start">
                        <el-button class="unDelAbl" v-show="false" size="mini" icon="el-icon-delete"></el-button>
                      </el-tooltip>
                    </div>
                  </div>
                  <div class="secondCheck" v-show="item.optState.checkOrGiveUp">
                    <div class="yesBtnCtn"><el-button @click="submitModify(item)" size="mini" type="primary">确定</el-button></div>
                    <div class="noBtnCtn"><el-button @click="cancelModify(item)" size="mini" type="primary">取消</el-button></div>
                  </div>
                </div>
              </div>

              <div class="orgItemBody">
                <tree-func :data="item.treeList" :unEditable="item.treeList[0].unEditable" @cfgAreaGroup="cfgAreaGroup"></tree-func>
              </div>

              <div class="orgItemFooter" :class="{'showAreaGroupsTag': item.areaGroupShow}" ref="orgItemFooter">
                <div class="title" :class="{'showAreaGroupsTag': item.areaGroupShow}" @click="lookUpAreaGroup(item)"></div>
                <div class="tagsListCt" v-show="item.areaGroupShow">
                  <div class="tagItem" v-for="areaGroup in item.areaGroupList" :key="areaGroup.areaGroupId" v-if="areaGroup">
                    <el-tooltip class="item" effect="dark" :content="areaGroup.areaGroupName" placement="top-start">
                      <span>{{areaGroup.areaGroupName}}</span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>

            <el-dialog :visible.sync="item.editOrgModel" width="998px" :show-close="false" :close-on-click-modal="false" class="editOrg">
              <div class="configTitle">
                <h2 class="title">分配区域组权限</h2>
                <p class="subTitle">请优先给机构分配区域组权限</p>
              </div>
              <div class="configCont">
                <div class="funcList">
                  <div class="infoBox" style="margin-left: -15px;">
                    <tree-list :ref="`treeList${item.deptId}`" :data="item.treeList" @cfgAreaGroup="cfgAreaGroup" :level="1"></tree-list>
                  </div>
                </div>
              </div>
              <div class="btnCont">
                <el-button type="primary" size="small" @click="updateOrgGroupListCfg(item)">保存</el-button>
                <el-button size="small" @click="resetOrgCfg(item)">取消</el-button>
              </div>
            </el-dialog>
          </li>
        </ul>
      </div>

      <div v-if="createNewOrgModal" class="creatOrgCnt">
        <div class="createOrg">
          <div class="organInfoCollectionCont">
            <h2 class="title">新建机构</h2>
            <div class="infoBox">
              <tree-menu :data="newOrg" @renderSubMenu="renderSubMenu"></tree-menu>
            </div>
          </div>
          <div class="btnCont">
            <el-button type="primary" size="small" @click="createADepartment">保存</el-button>
            <el-button size="small" @click="cancelCreateADepartment">取消</el-button>
          </div>
        </div>
      </div>

      <!-- <el-dialog :visible.sync="editOrgModel" width="998px" :show-close="false" :close-on-click-modal="false" class="editOrg">
        <div class="configTitle">
          <h2 class="title">分配区域组权限</h2>
          <p class="subTitle">请优先给机构分配区域组权限</p>
        </div>
        <div class="configCont">
          <div class="funcList">
            <div class="infoBox" style="margin-left: -15px;">
              <tree-list :data="orgListToCfg" @cfgAreaGroup="cfgAreaGroup" :level="1"></tree-list>
            </div>
          </div>
        </div>
        <div class="btnCont">
          <el-button type="primary" size="small" @click="updateOrgGroupListCfg">保存</el-button>
          <el-button size="small" @click="editOrgModel = false">重置</el-button>
        </div>
      </el-dialog> -->
    </el-main>
  </div>
</template>

<script>
  import treeMenu from 'components/treeMenu'
  import treeList from 'components/treeList'
  import treeFunc from 'components/treeFunc'
  import { fmtNewOrg, findSelf, whenToEditOrgCfgClick, fmtAllOrgList, whenSubmitModify, AddDelUpdate, collectBranchList, compareObjArr, fmtTree, compareObjTree } from '@/common/js/organManage'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        resultCount: 0,
        searchingStr: '',
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
        orgList: [],
        orgListToCfg: [],
        lock: true,
        updateSrcList: [],
        updateTarList: [],
        srcTree: {},
        tarTree: {}
      }
    },
    components: {
      treeMenu,
      treeList,
      treeFunc
    },
    methods: {
      getAllDeptDetailsList (name = '', fn) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios.post(`/base/depts/all/detail?name=${name}`)
        .then(data => {
          const resData = data.data
          resData.length === 0 && fn && typeof fn === 'function' && fn()
          this.resultCount = resData.length
          this.orgList = []
          resData.forEach(item => {
            const res = fmtAllOrgList(item, 1, [])
            this.orgList.push({
              optState: {
                operateBtnsShow: false,
                checkOrGiveUp: false
              },
              editOrgModel: false,
              areaGroupShow: false,
              treeList: [res.resObj],
              areaGroupList: res.areaGroupList,
              onEdit: false,
              deptId: res.resObj.deptId
            })
          })
          loading.close()
        })
        .catch(err => {
          console.log(err)
          loading.close()
        })
      },
      // 新增机构--start
      addEquipment () {
        this.createNewOrgModal = true
        this.newOrg.splice(0)
        this.newOrg.push(
          {
            deptName: '',
            showSubTree: false,
            showAddMinusBtn: false,
            level: 1
          }
        )
      },
      renderSubMenu (list) {
        this.$set(this.newOrg[0], 'deptChildrenList', list)
      },
      createADepartment () {
        const fmtedNewOrgan = fmtNewOrg(this.newOrg)
        this.$axios.post('/base/depts', fmtedNewOrgan)
          .then(() => {
            this.$message({
              message: '机构创建成功！',
              type: 'success',
              center: true
            })
            this.getAllDeptDetailsList()
          })
          .catch(err => {
            this.$message({
              message: '机构创建失败！',
              type: 'error',
              center: true
            })
          })
        this.createNewOrgModal = false
      },
      cancelCreateADepartment () {
        this.$confirm('取消创建所填写内容不会被保存，是否确认取消?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.createNewOrgModal = false
        })
      },
      // 新增机构--end
      // 搜索重置--start
      reset () {
        this.getAllDeptDetailsList()
      },
      search () {
        this.getAllDeptDetailsList(this.searchingStr, () => {
          this.$message({
            message: '没有搜索到相关机构或区域信息',
            type: 'info',
            center: true
          })
        })
        this.searchingStr = ''
      },
      // 搜索重置--end
      // 删除机构的逻辑--start
      delCurOrg (item) {
        this.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`/base/depts/${item.deptId}/all`)
            .then(data => {
              this.$message({
                type: 'success',
                message: '删除成功!',
                center: true
              })
              this.getAllDeptDetailsList()
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center: true
          })
        })
      },
      // 删除机构的逻辑--end
      toEditOrgCfg (item) {
        this.orgList.forEach(it => it.onEdit && (this.lock = false))
        if (this.lock) {
          // 清除之前原始树的更改记录
          this.updateSrcList.splice(0)
          // 点击开始更改时，格式化原始树准备和更新树比对 -------------- A
          this.srcTree = fmtTree(item.treeList[0])
          // 搜集原始树分支装到数组里面去，之后再次搜集更新树分枝比对id和值检索更改 -------------- B
          collectBranchList(item.treeList).forEach(item => this.updateSrcList.push(item))
          // 清除之前树的删除分支数组
          this.emptyDelList()
          item.onEdit = true
          item.optState.operateBtnsShow = true
          item.optState.checkOrGiveUp = true
          whenToEditOrgCfgClick(item.treeList)
        } else {
          this.$message({
            message: '您有正在编辑的机构未做完成确认...',
            type: 'warning',
            center: true
          })
        }
      },
      submitModify (item) {
        this.lock = true
        item.onEdit = false
        item.optState.operateBtnsShow = false
        item.optState.checkOrGiveUp = false
        whenSubmitModify(item.treeList)
        // 清除之前更新树的更改记录
        this.updateTarList.splice(0)
        // 搜集更新树分枝 -------------- B
        collectBranchList(item.treeList).forEach(item => this.updateTarList.push(item))
        // 比对id和值检索更改 -------------- B
        const updateList = compareObjArr(this.updateSrcList, this.updateTarList)
        // 格式化更新树准备和原始树比对 -------------- A
        this.tarTree = fmtTree(item.treeList[0])
        // 原始树和更新树进行比对，返回新增带父id的树集合
        const AddTreeList = compareObjTree([this.srcTree], [this.tarTree])
        this.$axios.post('/base/depts/list', {
          Add: AddTreeList,
          Update: updateList,
          Delete: this.delList
        })
          .then(data => {
            this.$message({
              message: '操作成功！',
              type: 'warning',
              center: true
            })
            this.getAllDeptDetailsList()
          })
          .catch(err => {})
      },
      cancelModify (item) {
        this.lock = true
        item.onEdit = false
        item.optState.operateBtnsShow = false
        item.optState.checkOrGiveUp = false
        whenSubmitModify(item.treeList)
      },
      lookUpAreaGroup (item) {
        item.areaGroupShow = !item.areaGroupShow
      },
      cfgOrgAreaGroupAuthority (item) {
        item.editOrgModel = true
        this.setTriggerId(item.deptId)
        this.orgListToCfg.splice(0)
        this.orgListToCfg.push(item.treeList[0])
        // console.log(item, this.orgListToCfg)
      },
      cfgAreaGroup (id) {
        findSelf(id, this.orgListToCfg)
      },
      updateOrgGroupListCfg (item) {
        this.$axios.post('http://10.10.18.82:8082/info/depts_areagroup_relation', this.areasToUpdate)
          .then(data => {
            this.$message({
              message: '操作成功！',
              type: 'success',
              center: true
            })
            item.editOrgModel = false
            this.resetAreaToUpdate()
          })
          .catch(err => {})
          this.editOrgModel = false
      },
      resetOrgCfg (item) {
        item.editOrgModel = false
      },
      ...mapActions([
        'emptyDelList',
        'setTriggerId'
      ])
    },
    computed: {
      ...mapGetters([
        'delList',
        'areasToUpdate',
        'resetAreaToUpdate'
      ])
    },
    created () {
      this.getAllDeptDetailsList()
    }
  }
</script>

<style lang="scss">
  @import "../../common/css/tablePageCommon.scss";
  #organManage {
    .org-dept-list-container {
      padding: 18px 24px;
      .org-dept-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        > li {
          width: 362px;
          margin: auto 20px;
          padding-top: 10px;
          break-inside: avoid;
          .content {
            position: relative;
            width: 362px;
            height: 440px;
            padding: 15px 20px;
            margin-bottom: 50px;
            box-sizing: border-box;
            border: 1px solid #DFE9F4;
            border-radius: 8px;
            text-align: left;
            overflow: hidden;
            &:hover {
              border: 1px solid transparent;
              box-shadow: 0 0 10px #DFE9F4;
              .configBtn {
                display: none;
              }
              .cfgEdtDel {
                display: flex!important;
                justify-content: space-between;
              }
            }
            .orgItemHeader {
              height: 28px;
              line-height: 28px;
              padding-bottom: 14px;
              &.fbdshow {
                .toolTips {
                  .configBtn, .cfgEdtDel {
                    display: none!important;
                  }
                }
              }
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
                position: relative;
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
                  display: none;
                  width: 104px;
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
                      &.unDelAbl {
                        margin: 0;
                        color: #E4E8ED;
                      }
                    }
                  }
                }
                .secondCheck {
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 66px;
                  height: 66px;
                  z-index: 999;
                  .yesBtnCtn, .noBtnCtn {
                    width: 48px;
                    height: 28px;
                    .el-button {
                      width: 48px;
                      height: 28px;
                      padding: 0;
                    }
                  }
                  .noBtnCtn {
                    margin-top: 10px;
                    .el-button {
                      background: #EFF7FF;
                      border-color: #DFE9F4;
                      color: #5a5a5a;
                    }
                  }
                }
              }
            }

            .orgItemBody {
              min-height: 120px;
              max-height: 230px;
              margin-bottom: 15px;
              margin-left: -20px;
              overflow-y: scroll;
            }

            .orgItemFooter {
              position: absolute;
              width: 180px;
              height: 36px;
              bottom: 10px;
              left: 20px;
              transition: all 1.2s;
              &.showAreaGroupsTag {
                height: 136px;
              }
              .title {
                cursor: pointer;
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
                width: 320px;
                max-height: 108px;
                overflow-y: scroll;
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
    }

    .creatOrgCnt {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .6);
      .createOrg {
        position: absolute;
        width: 560px;
        height: 754px;
        border-radius: 6px;
        background: #fff;
        padding: 22px 20px 22px 35px;
        left: 50%;
        top: 50%;
        transform: translate(-357px, -399px);
        display: flex;
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
        // }
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
            // display: flex;
            .funcList {
              position: relative;
              width: 271px;
              height: 518px;
              border-right: 2px solid #EDF2FB;
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
        }      
      }
    }
  }
</style>
