<template>
  <ul class="treeList">
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
        <el-tooltip
          class="item"
          effect="dark"
          :open-delay="800"
          :content="item.deptName"
          placement="top-start"
          :key="item.areaId"
        >
          <p class="orgDeptName" :id="`orgDeptName${item.deptId}`" :class="{'highLight': item.highLight}" @click="cfgAuthority(item)">{{item.deptName}}</p>
        </el-tooltip>
      </div>
      <div class="areaGroupList" v-show="triggerId === item.deptId">
        <h4 class="areaGroupListTitle">区域组列表</h4>
        <div class="areaGroupListCont">
          <el-checkbox-group v-model="areasGroupCheckedList" :min="min" :max="max" @change="handleChange(item)">
            <el-tooltip
              v-for="areaItem in areaGroupList"
              class="item" effect="dark"
              :open-delay="800"
              :content="areaItem.areaGroupName"
              placement="top-start"
              :key="areaItem.areaId"
            >
              <el-checkbox @click.native.stop="checkLen" :label="areaItem.areaGroupId">{{areaItem.areaGroupName}}</el-checkbox>
            </el-tooltip>
          </el-checkbox-group>
        </div>
      </div>
      <tree-list
        v-if="item.deptChildrenList && item.deptChildrenList.length"
        @dieOut="dieOut"
        v-show="item.showSubTree"
        :data="item.level < 4 && item.deptChildrenList"
      ></tree-list>
    </li>
  </ul>
</template>

<script>
  import { findSelf, areaGroupId } from '../common/js/organManage'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'treeList',
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        scope: this.data,
        areaGroupList: [],
        areasGroupCheckedList: [],
        min: 1,
        max: 6
      }
    },
    methods: {
      cfgAuthority (item) {
        item.level && item.level === 1 ? this.$emit('cfgAreaGroup', item.deptId) : this.$emit('dieOut', item.deptId)
        this.setTriggerId(item.deptId)
        this.areasGroupCheckedList.splice(0)
        item.areaGroupList.forEach(areaGroup => typeof areaGroup === 'object' ? this.areasGroupCheckedList.push(areaGroup.areaGroupId) : this.areasGroupCheckedList.push(areaGroup))
        this.updateDeptAreaGroup({
          deptId: item.deptId,
          areaGroupIdList: this.areasGroupCheckedList
        })
      },
      dieOut (id) {
        this.scope.forEach(item => item.level && item.level === 1 ? this.$emit('cfgAreaGroup', id) : this.$emit('dieOut', id))
      },
      ...mapActions([
        'updateDeptAreaGroup',
        'setTriggerId'
      ]),
      checkLen () {
        if (this.areasGroupCheckedList.length >= this.max) {
          this.$message({
            message: `最多可以选择${this.max}个区域`,
            type: 'warning',
            center: true
          })
        }
      },
      getAllGroup () {
        this.$axios.post('http://10.10.18.42:8082/info/areagroup/getAllGroup')
        .then(data => {
          const backList = data.data
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
      handleChange (item) {
        item.areaGroupList.splice(0)
        this.areasGroupCheckedList.forEach(el => item.areaGroupList.push(el))
        this.updateDeptAreaGroup({
          deptId: item.deptId,
          areaGroupIdList: this.areasGroupCheckedList
        })
      }
    },
    computed: {
      ...mapGetters([
        'triggerId',
        'areasToUpdate'
      ])
    },
    watch: {
      triggerId: {
        handler (newVal, oldVal) {
          console.log(newVal, oldVal)
          setTimeout(() => this.scope.forEach(item => item.deptId === this.triggerId && this.cfgAuthority(item)), 0)
        },
        deep: true
      }
    },
    created () {
      this.getAllGroup()
    },
    mounted () {
      setTimeout(() => this.scope.forEach(item => item.deptId === this.triggerId && this.cfgAuthority(item)), 0)
    }
  }
</script>

<style lang="scss">
  .treeList {
    margin-left: 15px;
    .father {
      position: relative;
      padding-left: 24px;
      height: 28px;
      display: flex;
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
      &.highLight {
        color: #44aeff;
      }
      &:hover {
        color: #44aeff;
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
    .areaGroupList {
      position: absolute;
      width: 400px;
      height: 480px;
      top: 0;
      left: 273px;
      padding: 0 42px 42px;
      text-align: left;
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
</style>
