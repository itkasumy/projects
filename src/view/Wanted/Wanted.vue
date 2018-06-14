<template>
  <div id="wanted">
    <h3 class="title">发布通缉令</h3>
    <!-- <el-form ref="formInfo" :model="formInfo" label-width="80px">
      <el-form-item :required="true" label="标题" prop="title">
        <el-input v-model="formInfo.title" size="small"></el-input>
      </el-form-item>
      <el-form-item :required="true" label="头像" prop="imgUrl">
        <input type="file" name="file" @change="getBase64" id="img" >
        <img v-if="formInfo.imgUrl" :src="formInfo.imgUrl" class="avatar">
      </el-form-item>
      <el-form-item :required="true" label="姓名" prop="name">
        <el-input v-model="formInfo.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formInfo.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
          <el-radio :label="2">未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :required="true" label="民族" prop="nation">
        <el-select v-model="formInfo.nation" placeholder="请选择民族" size="small">
          <el-option
            v-for="item in nationList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
      </el-select>
      </el-form-item>
      <el-form-item :required="true" label="出生日期" prop="birth">
        <el-date-picker v-model="formInfo.birth" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item :required="true" label="户籍地址" prop="hometown">
        <el-input v-model="formInfo.hometown" size="small"></el-input>
      </el-form-item>
      <el-form-item :required="true" label="内容" prop="detailMsg">
        <el-input type="textarea" v-model="formInfo.detailMsg"></el-input>
      </el-form-item>
      <el-form-item :required="true" label="发布单位" prop="policeStation">
        <el-input v-model="formInfo.policeStation" size="small"></el-input>
      </el-form-item>
      <el-form-item :required="true" label="发布时间" prop="date">
        <el-date-picker v-model="formInfo.date" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formInfo')" size="small">立即发布</el-button>
        <el-button @click="resetForm('formInfo')" type="warning" size="small">重置</el-button>
        <el-button @click="back" size="small" type="info">返回</el-button>
      </el-form-item>
    </el-form> -->
    <el-upload
      class="pdfUploader"
      action=""
      :limit="1"
      :multiple="false"
      :auto-upload="false"
      :file-list="fileList"
      :on-change="handleChange"
      :on-preview="handlePreview"
      :on-remove="beforeRemove"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      accept=".doc,.docx,.pdf"
    >
      <!-- :http-request="handleUpload" -->
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="handleUpload">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传 .doc 、 .docx 、 .pdf 格式文件</div>
    </el-upload>
  </div>
</template>

<script>
// import nationJson from 'common/js/nation'
// import { publishWanted } from 'http'
import { uploadWordPDF } from 'http'
// import { dateFmt } from 'common/js/util'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      formInfo: {
        msgType: 1,
        title: '',
        imgUrl: '',
        name: '',
        sex: 1,
        nation: '',
        birth: '',
        hometown: '',
        detailMsg: '',
        policeStation: '',
        date: ''
      },
      // nationList: nationJson,
      fileList: [],
      file: null,
      msgType: 1,
      fileType: 1
    }
  },
  methods: {
    /* submitForm () {
      this.formInfo.birth = dateFmt(new Date(this.formInfo.birth)).split(' ')[0]
      this.formInfo.date = dateFmt(new Date(this.formInfo.date)).split(' ')[0]
      publishWanted({
        deviceIdList: this.deviceOnlineIdList,
        ...this.formInfo
      }).then(res => {
        if (res.data.success) {
          this.$message({
            message: '消息已推送成功!',
            type: 'success',
            center: true,
            showClose: true
          })
        } else {
          this.$message({
            message: '消息推送失败!',
            type: 'warning',
            center: true,
            showClose: true
          })
        }
      })
      setTimeout(() => this.$router.push('/'), 300)
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
    }, */
    back () {
      this.$router.push('/')
    },
    handleChange (file, fileList) {
      this.fileType = file.name.endsWith('.pdf') ? 2 : 1
      console.log('handleChange:', file, fileList)
      this.file = file
    },
    handlePreview (file) {
      console.log('handlePreview:', file)
    },
    beforeRemove (file, fileList) {
      console.log('beforeRemove:', file, fileList)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleUpload () {
      const fd = new FormData()
      fd.append('file', this.file.raw)
      fd.append('msgType', this.msgType)
      fd.append('fileType', this.fileType)
      fd.append('deviceIdList', this.deviceOnlineIdList)
      uploadWordPDF(fd).then(data => {
        const result = data.data
        console.log(result, 1234567)
        this.setPdfUrl(result.obj.detailMsg)
      }).catch(err => {
        console.log(err)
      })
      this.setPdfShow(true)
      setTimeout(() => this.$router.push('/'), 300)
    },
    ...mapActions([
      'setPdfUrl',
      'setPdfShow'
    ])
  },
  computed: {
    ...mapGetters([
      'deviceOnlineIdList'
    ])
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
  .pdfUploader
    width 50%
    padding 20px
    font-size 12px
  /* #img
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
    cursor pointer */
</style>

<style lang="stylus">
// #wanted
  /* .el-textarea__inner
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
    padding-top 22px */
</style>
