<template>
  <div class="area-authority">
    <el-main class="app-main table-page">
      <h2 class="tp-title">区域权限</h2>
      <div class="">
        <!-- header -->
        <div class="tp-header">
          <div class="tp-left">
            <el-button size="small" type="primary" @click="addNewGroup">+新增区域分组</el-button>
          </div>
          <div class="tp-right">
            <div class="tp-result">
              <span>共搜索到<span class="tp-result-count">{{resultCount}}</span>条记录</span>
              <el-button size="small" type="text" @click="reset">重置</el-button>
            </div>
            <div class="tp-input-group">
              <ul>
                <li>
                  <el-input
                    :size="'small'"
                    v-model="searchsomething"
                    placeholder="请输入内容"
                    @keyup.enter.native="search()"
                    @keyup.native="excNameRegSearch(searchsomething)"
                  ></el-input>
                </li>
                <li>
                  <el-button size="small" type="primary" @click="search">搜索</el-button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- table -->
        <div>
          <el-table :data="tableLists" style="width: 100%;" border>
            <el-table-column 
              v-for="(value, index) in tableHeader" :key="index"
              :label="value.label"
              :prop="value.prop"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="editItem(scope)">编辑</el-button>
                <span v-show="scope.row.del">|</span>
                <el-button v-show="scope.row.del" type="text" @click="removeItem(scope)" class="red">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <!-- page -->
        <div class="tp-page">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :total="allCount"
            @current-change="currentPageChange"
            :page-size="10"
          ></el-pagination>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
  const TABLEHEADER = [
    { label: '序号', prop: 'index' },
    { label: '组名称', prop: 'areaGroupName' },
    { label: '区域名称', prop: 'areaName' },
    { label: '状态', prop: 'status' }
  ]

  export default {
    name: 'DeviceManagerEdit',
    data() {
      return {
        resultCount: 0,
        tableHeader: TABLEHEADER,
        tableLists: [],
        allCount: 10,
        searchsomething: '',
        currentPage: 1,
        pageSize: 10
      }
    },

    methods: {
      addNewGroup () {
        this.$router.push({ name: "areaAuthorityAdd" })
      },
      reset () {
        this.searchsomething = ''
        this.getAreaGroupList(this.currentPage, this.pageSize, this.searchsomething)
        $('.el-pager .number').first().trigger('click')
      },
      getAreaGroupList (currentPage = 0, pageSize = 10, query = '') {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios
          .post(`/info/areagroup/getGroupPageList/${currentPage - 1}/${pageSize}?groupName=${query}&timeStemp=${+new Date()}`)
          .then(data => {
            loading.close()
            this.resultCount = data.data.totalElements
            this.allCount = data.data.totalElements
            const result = []
            data.data.content.forEach((item, idx) => {
              result.push({
                index: (currentPage - 1) * pageSize + idx + 1,
                areaGroupName: item.areaGroupName,
                areaName: item.areaNames === null ? '' : item.areaNames.replace(/\,/g, '、'),
                status: item.bound === 0 ? '未使用' : '已使用',
                del: item.bound === 0 ? true : false,
                areaGroupId: item.areaGroupId
              })
            })
            this.tableLists = result
          })
          .catch(err => {
            if (err.response) {
               this.$message({
                type: 'error',
                message: err.response.data.message,
                center: true
              })
            }
            loading.close()
            console.log(err)
          })
      },
      search () {
        this.currentPage = 1
        this.pageSize = 10
        this.getAreaGroupList(this.currentPage, this.pageSize, this.searchsomething)
        $('.el-pager .number').first().trigger('click')
      },
      editItem (data) {
        this.$router.push({ path: `areaAuthority/areaAuthorityEdit/${data.row.areaGroupId}`})
      },
      removeItem (info) {
        this.$confirm('此操作将永久删除该区域组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
            center: true
          })
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$axios.post(`/info/areagroup/deleteAreaGroup?groupId=${info.row.areaGroupId}`)
          .then(data => {

            this.tableLists.splice(info.$index, 1)
            setTimeout(() => {
              loading.close()
            }, 500)
          })
          .catch(err => {
            if (err.response) {
               this.$message({
                type: 'error',
                message: err.response.data.message,
                center: true
              })
            }
            console.log(err)
            loading.close()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center: true
          })
        })
      },
      currentPageChange (index) {
        this.currentPage = index
        this.getAreaGroupList(this.currentPage, this.pageSize, this.searchsomething)
      },
      excNameRegSearch (val) {
        if (!/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}$/.test(val) && val.length > 0) {
          this.$message({
            message: '请使用"汉字"、"字母"、"数字"、"_"、"-"（1-15个字符）',
            type: 'warning',
            center: true
          })
          this.searchsomething = val.match(/^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,15}/)[0]
        }
      }
    },

    mounted () {
      this.getAreaGroupList(this.currentPage, this.pageSize, this.searchsomething)
    }
  }
</script>

<style lang="scss" scoped>
  .el-button.red.el-button--text {
    margin-left: 0;
  }
</style>

<style lang="scss">
  @import "../../common/css/tablePageCommon.scss";
  .area-authority {
    .el-table div.el-table__body-wrapper button.el-button{
      line-height: 22px;
    }
    .input {
      width: 200px;
    }
    button.red span {
      color: #ff4242;
    }
  }  
</style>
