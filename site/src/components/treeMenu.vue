<template>
  <ul class="trMenu">
    <li
      v-for="(item, index) in scope"
      :key="index"
      @mouseover.stop.prevent="item.showAddMinusBtn = true"
      @mouseout.stop.prevent="item.showAddMinusBtn = false"
    >
      <div class="father">
        <el-button
          v-show="item.deptChildrenList && item.deptChildrenList.length"
          :class="[{'el-icon-caret-right': !item.showSubTree}, {'el-icon-caret-bottom': item.showSubTree}]"
          @click="item.showSubTree = !item.showSubTree"
        ></el-button>
        <el-input
          v-model="item.deptName"
          v-focus
          :placeholder="item.level === 1 ? '请输入机构名称' : item.level === 2 ? '请输入部门名称' : '请输入名称'"
          @keyup.native="showFunc(item)"
        ></el-input>
        <el-tooltip
          class="item"
          effect="dark"
          :open-delay="600"
          content="点击创建当前组织的子节点"
          placement="top-start"
        >
          <el-button
            v-show="item.level !== 3 && item.showAddMinusBtn"
            icon="el-icon-circle-plus-outline" 
            @click="appendChildToSubTree(item, index)"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          :open-delay="600"
          content="点击删除当前节点"
          placement="top-start"
        >
          <el-button
            v-show="item.showAddMinusBtn && item.level !== 1"
            icon="el-icon-remove-outline"
            @click="removeSelf(index)"
          ></el-button>
        </el-tooltip>
      </div>
      <tree-menu
        v-if="item.deptChildrenList && item.deptChildrenList.length"
        v-show="item.showSubTree"
        :data="item.level < 3 && item.deptChildrenList"
      ></tree-menu>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'treeMenu',
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        scope: this.data
      }
    },
    methods: {
      appendChildToSubTree (item, index) {
        let list = []
        if (this.scope[index].deptChildrenList) {
          this.scope[index].deptChildrenList.push({
            deptName: '',
            showSubTree: false,
            showAddMinusBtn: false,
            level: (() => (++item.level, item.level--))()
          })
        } else {
          this.scope[index].deptChildrenList = []
          this.scope[index].deptChildrenList.push({
            deptName: '',
            showSubTree: false,
            showAddMinusBtn: false,
            level: (() => (++item.level, item.level--))()
          })
        }
        this.scope[index].showSubTree = true
        list = this.scope[index].deptChildrenList
        this.$emit('renderSubMenu', list)
      },
      removeSelf (index) {
        this.$confirm('是否删除此分支?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.data.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!',
            center: true
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center: true
          })
        })
      },
      showFunc (item) {
        item.showAddMinusBtn = item.deptName.length > 0
      }
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
    }
  }
</script>

<style lang="scss">
  .trMenu {
    margin-left: 15px;
    .father {
      position: relative;
      padding-left: 24px;
      height: 24px;
      display: flex;
    }
    .el-input {
      width: auto;
      margin: 0 2px;
      line-height: 24px;
    }
    .el-input__inner {
      display: block;
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
    .el-button {
      width: 24px;
      height: 24px;
      background: none;
      margin: 0;
      line-height: 24px;
      padding: 0px;
      font-size: 18px;
      color: #44aeff;
      border: none;
      &:nth-child(1) {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
</style>
