<template>
  <ul class="treeFunc">
    <li v-for="(item, index) in scope" :key="index">
      <div class="father">
        <el-button
          v-show="item.deptChildrenList && item.deptChildrenList.length"
          :class="[{'el-icon-caret-right': !item.showSubTree}, {'el-icon-caret-bottom': item.showSubTree}]"
          @click="item.showSubTree = !item.showSubTree"
        ></el-button>
        <div v-if="item.unEditable">
          <el-tooltip
            class="item"
            effect="dark"
            :open-delay="1200"
            :content="item.deptName"
            placement="top-start"
          >
            <p class="orgDeptName">{{item.deptName}}</p>
          </el-tooltip>
        </div>
        <div v-else class="iptEditCnt">
          <div v-if="item.toEdit">
            <el-tooltip
              class="item"
              effect="dark"
              :open-delay="1200"
              :content="item.deptName"
              placement="top-start"
            >
              <p class="orgDeptName" style="margin-right: 6px;" @click="updateItem(item)">{{item.deptName}}</p>
            </el-tooltip>
          </div>
          <div v-else>
            <el-input
              v-model="item.deptName"
              v-focus="item.iptOnFocus"
              @focus="itemOnFocus(item)"
              @blur="itemOnBlur(item)"
              :ref="`iptEditCnt${item.deptId}`"
              :placeholder="item.level === 1 ? '请输入机构名称' : item.level === 2 ? '请输入部门名称' : '请输入名称'"
            ></el-input>
          </div>
          <div class="addReBtn">
            <el-button
              class="additional"
              :class="{'iptOnFocus': item.iptOnFocus}"
              v-show="item.level !== 4"
              icon="el-icon-circle-plus-outline" 
              @click="appendChildToSubTree(item)"
            ></el-button>
            <el-button
              class="removal"
              :class="{'iptOnFocus': item.iptOnFocus}"
              v-show="item.level !== 1"
              icon="el-icon-remove-outline"
              @click="removeSelf(item)"
            ></el-button> 
          </div>
        </div>
      </div>
      <tree-func
        v-if="item.deptChildrenList && item.deptChildrenList.length"
        @removeItem="removeItem"
        v-show="item.showSubTree"
        :data="item.level <= 4 && item.deptChildrenList || []"
      ></tree-func>
    </li>
  </ul>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import  { findSelf, appendChildToSubTree } from '../common/js/organManage'
  export default {
    name: 'treeFunc',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      unEditable: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        scope: this.data
      }
    },
    methods: {
      appendChildToSubTree (item) {
        appendChildToSubTree(item)
      },
      removeSelf (item) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('removeItem', item)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center: true
          })
        })
      },
      removeItem (item) {
        this.scope.forEach(itm => {
          itm.deptChildrenList.forEach((it, idx) => {
            if (item === it) {
              console.log(item)
              this.addToDelList(item.deptId)
              console.log(this.delList)
              itm.deptChildrenList.splice(idx, 1)
              this.$message({
                type: 'success',
                message: '删除成功!',
                center: true
              })
            }
          })
        })
      },
      itemOnFocus (item) {
        this.$set(item, 'iptOnFocus', true)
      },
      itemOnBlur (item) {
        if (item.deptName && item.deptName.length <= 0) {
          this.$message({
            message: '名称不能为空...',
            type: 'warning',
            center: true
          })
        } else {
          this.$set(item, 'iptOnFocus', false)
          this.$set(item, 'toEdit', true)
        }
      },
      updateItem (item) {
        console.log(item)
        this.$set(item, 'toEdit', false)
        this.$nextTick(() => {
          this.$refs[`iptEditCnt${item.deptId}`][0].focus()
        })
      },
      ...mapActions([
        'addToDelList',
        'emptyDelList'
      ])
    },
    directives: {
      focus: {
        update (el) {
          el.querySelector('input').focus()
        },
        inserted (el) {
          el.querySelector('input').focus()
        }
      }
    },
    computed: {
      ...mapGetters([
        'delList'
      ])
    }
  }
</script>

<style lang="scss">
  .treeFunc {
    margin-left: 15px;
    .father {
      position: relative;
      padding-left: 24px;
      height: 28px;
      display: flex;
      &:hover {
        .iptEditCnt {
          .addReBtn {
            .additional {
              display: block;
              &.iptOnFocus {
                display: none;
              }
            }
            .removal {
              display: block;
            }
          }
        }
      }
      .iptEditCnt {
        display: flex;
        .el-input {
          .el-input__inner {
            width: 163px;
            height: 28px;
            line-height: 28px;
            border: none;
            color: #5a5a5a;
            transition: none;
            border: 1px solid transparent;
            &:focus {
              border: 1px solid #dcdfe6;
            }
          }
        }
        .addReBtn {
          display: flex;
          .additional, .removal {
            position: relative;
            display: none;
            margin-left: 6px;
          }
          .removal {
            color: #ff9090;
          }
        }
      }
    .el-button {
      position: absolute;
      left: 0;
      top: 2px;
      width: 24px;
      height: 24px;
      line-height: 24px;
      background: none;
      margin: 0;
      padding: 0px;
      font-size: 18px;
      color: #44aeff;
      border: none;
    }
    .orgDeptName {
      width: auto;
      max-width: 150px;
      height: 28px;
      line-height: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #5a5a5a;
      cursor: pointer;
      &:hover {
        color: #44aeff;
      }
    }
    }
  }
</style>
