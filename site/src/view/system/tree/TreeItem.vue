<template>
  <span class="span_item">
    <span @click="Expanded">
      <input v-if="node.status == 1" style="width: 100px;" v-model="node.label" size="small" />
      <i v-if="node.status == 0" type="asterisk"></i>
      <i v-if="node.status == -1" type="ios-keypad-outline"></i>
      <span v-if="node.status != 1">{{node.label}}</span>
    </span>
    <span v-if="node.status == 1">
      <Button  style="margin-left: 8px;" size="small" type="success" icon="checkmark-circled" @click="SaveEdit">确认</Button>
      <Button style="margin-left: 8px;" size="small" type="ghost" icon="checkmark-circled" @click="CancelEdit">取消</Button>
    </span>
    <span class="span_icon">
       <i v-show="node.status != 1" style="margin-left: 8px" class="el-icon-edit" @click="OpenEdit"></i>
       <i v-show="node.status != 1" style="margin-left: 8px" class="el-icon-plus" @click="Append"></i>
       <i v-show="node.status != 1" style="margin-left: 8px" class="el-icon-delete" @click="Delete"></i>
    </span>
  </span>
</template>

<script>
    export default {
      data() {
        return {
          node:this.value,
          nodeData:JSON.parse(JSON.stringify(this.value))
        }
      },
      props:{
        value:{
          default: function () {
            return {}
          }
        },
        treeNode:{
          default: function () {
            return {}
          }
        }
      },
      methods:{
        OpenEdit(){
           this.$emit('OpenEdit',this.nodeData)
        },
        Append(){
          //添加节点事件
          this.$emit('Append')
        },
        SaveEdit(){
          //保存节点事件
          this.$emit('SaveEdit',this.nodeData)
        },
        CancelEdit(){
          this.node.status = 0
          this.$emit('CancelEdit',this.nodeData)
        },
        Delete(){
          this.$emit('Delete',this.nodeData)
        },
        Expanded(){
          this.treeNode.expanded = false
        }
      },
      watch:{
        value:{
          handler:function(val,oldVal){
            this.node = val
          },
          deep:true
        },
        node:{
          handler:function(val){
            this.$emit('input',val)
          },
          deep:true
        }
      }
    }
</script>
<style>
  .span_item:hover .span_icon {
    display:inline;
  }
  .span_icon {
    margin-left: 10px;
    display: none;
  }
</style>
