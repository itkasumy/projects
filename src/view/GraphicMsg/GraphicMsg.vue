<template>
  <div id="wanted">
    <h3 class="title">发布图文消息</h3>
    <el-form ref="formInfo" :model="formInfo" label-width="80px">
      <el-form-item :required="true" label="标题" prop="title">
        <el-input v-model="formInfo.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="imgUrl">
        <input type="file" name="file" @change="getBase64" id="img">
        <img v-if="formInfo.imgUrl" :src="formInfo.imgUrl" class="avatar">
      </el-form-item>
      <el-form-item :required="true" label="内容" prop="detailMsg">
        <el-input type="textarea" v-model="formInfo.detailMsg"></el-input>
      </el-form-item>
      <!-- <el-form-item :required="true" label="目的地" prop="destination">
        <el-button size="small" @click="findDestination">选择目的地</el-button>
      </el-form-item> -->
      <el-form-item :required="true" label="发布单位" prop="policeStation">
        <el-input v-model="formInfo.policeStation" size="small"></el-input>
      </el-form-item>
      <el-form-item :required="true" label="发布时间" prop="date">
        <el-date-picker v-model="formInfo.date" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formInfo')" size="small">立即发布</el-button>
        <el-button @click="resetForm('formInfo')" size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="mapCnt" v-show="dialogVisible">
      <div id="mapForDes">
        <i class="el-icon-circle-close-outline closeMapCnt" @click="handleClose"></i>
        <div class="searchCnt">
          <el-input v-model="keyWord" @keyup.native="keyWordSuggest" placeholder="请输入搜索关键字"></el-input>
          <el-button style="margin-left: 10px;" @click="search" size="small">搜索</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nationJson from 'common/js/nation'
import { publishWanted, getKeySearchList } from 'http'
import { dateFmt } from 'common/js/util'
import IMAP from 'IMAP'
export default {
  data () {
    return {
      formInfo: {
        msgType: 2,
        title: '',
        imgUrl: '',
        detailMsg: '',
        destination: '',
        policeStation: '',
        date: ''
      },
      dialogVisible: false,
      nationList: nationJson,
      desMap: null,
      keyWord: ''
    }
  },
  methods: {
    submitForm () {
      this.formInfo.birth = dateFmt(new Date(this.formInfo.birth)).split(' ')[0]
      this.formInfo.date = dateFmt(new Date(this.formInfo.date)).split(' ')[0]
      publishWanted({
        deviceIdList: ['111111'],
        ...this.formInfo
      }).then(res => {
        setTimeout(() => this.$router.push('/'), 300)
      }).catch(err => {
        console.log(err)
        setTimeout(() => this.$router.push('/'), 300)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getBase64 (event) {
      if (event.target.files.length > 0) {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = () => {
          this.formInfo.imgUrl = reader.result
        }
      }
    },
    findDestination () {
      this.dialogVisible = true
      this.$nextTick(() => this.initMap())
    },
    handleClose () {
      this.dialogVisible = false
    },
    initMap () {
      this.desMap = new IMAP.Map('mapForDes', {
        zoom: 15,
        maxZoom: 18,
        center: new IMAP.LngLat(121.455536, 31.249452),
        animation: true
      })
    },
    getKeySearchLists () {
      getKeySearchList({
        query: '上海南站',
        region: '上海市',
        ak: 'ec85d3648154874552835438ac6a02b2'
      }).then(res => {
        console.log(res.date)
      }).catch(err => {
        console.log(err)
      })
    },
    keyWordSuggest () {
      this.desMap.plugin(['IMAP.Suggest'], () => {
        const suggest = new IMAP.Suggest()
        suggest.search('顾村', '上海市', (status, results) => {
          if (status === '0') {
            var records = results.results
            console.log(records)
          }
        })
      })
    },
    search () {}
  },
  mounted () {
    this.getKeySearchLists()
  }
}
</script>

<style lang="stylus" scoped>
#wanted
  height 100%
  padding .416667rem .15625rem .208333rem
  border-radius .03125rem
  background #fff
  overflow-y scroll
  .title
    padding-left 20px
    line-height 18px
    font-size 18px
    color #333
  #img
    height 32px
    line-height 28px
    -webkit-appearance none
    background-color #fff
    background-image none
    border-radius 4px
    box-sizing border-box
    outline none
    padding 0 15px
    margin 0
    cursor pointer
  .mapCnt
    position absolute
    left 0
    top 0
    bottom 0
    right 0
    background rgba(0, 0, 0, .5)
    #mapForDes
      position absolute
      left 50%
      top 50%
      width 90%
      height 90%
      border-radius .020833rem
      transform translate(-50%, -50%)
      background #fff
      .closeMapCnt
        position absolute
        top 10px
        right 10px
        width 36px
        height 36px
        border-radius 50%
        cursor pointer
        color #fff
        font-size 36px
        z-index 10000
      .searchCnt
        position absolute
        top 10px
        left 50%
        width 2.916667rem
        height .197917rem
        transform translateX(-50%)
        display flex
        z-index 10000
</style>

<style lang="stylus">
#wanted
  .el-textarea__inner
    height 1.25rem
    resize none
  .el-form
    width 80%
  .el-textarea__inner
    height .9375rem
  .avatar
    display block
    width .927083rem
    height .927083rem
    padding-top 22px
</style>
