<template>
  <div>
    <!--头部-->
    <common-header/>
    <div class="my__account__container clearfix">
      <div class="u-pc-sidebar">
        <!--侧边栏-->
        <side-bar pageId="6" />
      </div>
      <div class="account__wrapper u-pc-content">
        <div class="top__header">
          <h2>账户信息</h2>
        </div>
        <common-loading v-if="loading" />
        <template v-else>
          <div class="account__info clearfix">
            <div class="info__img">
              <img :src="userInfo.headIcon || defaultAvatar" v-if="userInfo.headIcon!=null">
              <div class="change__img__wrapper">
                <div id="change__img__btn">修改头像</div>
              </div>
            </div>
            <div class="info">
              <div class="u-middle">
                <p>昵称</p>
                <p>{{userInfo.nichName}}<span><i class="iconfont icon-zhanghushezhi-bianjiicon1 u-cursor-pointer" @click="editNicknameDia=true"></i></span></p>
              </div>
            </div>
          </div>
          <div class="info__list">
            <el-row class="with-bg list__header">
              <el-col :span="8">
                项目
              </el-col>
              <el-col :span="8">
                内容
              </el-col>
              <el-col :span="8">
                编辑
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <i class="iconfont icon-zhanghushezhi-mimaicon1"></i><span>密码</span>
              </el-col>
              <el-col :span="8">
                ******
              </el-col>
              <el-col :span="8">
                <i class="iconfont icon-zhanghushezhi-bianjiicon1 u-cursor-pointer" @click="editPassDia=true"></i>
              </el-col>
            </el-row>
            <el-row class="with-bg">
              <el-col :span="8">
                <i class="iconfont icon-zhanghushezhi-shoujiicon1"></i><span>手机号码</span>
              </el-col>
              <el-col :span="8">
                +{{userInfo.phonePre}} {{userInfo.phone | formatPhone}}
              </el-col>
              <el-col :span="8">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <i class="iconfont icon-zhanghushezhi-zijinmimaicon1"></i><span>资金密码</span>
              </el-col>
              <el-col :span="8">
                <template v-if="parseInt(userInfo.setUpThe)===-1">未设置</template>
                <template v-else>******</template>
                <span class="forget-money-password" v-if="parseInt(upThe) === 1" @click="moneyPass(1)">忘记资金密码</span>
              </el-col>
              <el-col :span="8">
                <i class="iconfont icon-zhanghushezhi-bianjiicon1 u-cursor-pointer" @click="moneyPass(0)"></i>
              </el-col>
            </el-row>
          </div>
        </template>
      </div>
    </div>
    <common-footer/>
    <el-dialog title="修改昵称" :visible.sync="editNicknameDia" class="c-dialog" width="600px">
      <div @keyup.enter="changeNickname">
        <el-form label-width="100px">
          <el-form-item label="原昵称">
            {{userInfo.nichName}}
          </el-form-item>
          <el-form-item label="新昵称">
            <el-input placeholder="新昵称" v-model="nickname"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeNickname" :loading="changeLoading">确认修改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="editPassDia" class="c-dialog" width="600px">
      <div @keyup.enter="changePass">
        <el-form label-width="100px">
          <el-form-item label="旧密码">
            <el-input placeholder="旧密码" type="password" v-model="oldpass"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input placeholder="新密码" type="password" v-model="newpass"></el-input>
          </el-form-item>
          <el-form-item label="新密码确认">
            <el-input placeholder="新密码确认" type="password" v-model="newpassr"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePass" :loading="changeLoading">确认修改</el-button>
      </div>
    </el-dialog>
    <fund-dialog ref="funDialog" :upThe="upThe" />
  </div>
</template>
<script>
import defaultAvatar from '../../assets/img/avatar-male.svg'
import { mapActions, mapMutations } from 'vuex'
import SideBar from "../../components/user/side-bar";
import FundDialog from '../../components/user/fund-dialog'

export default {
  data() {
    return {
      defaultAvatar,
      userInfo: {},
      changeLoading: false,
      editNicknameDia: false,
      editPassDia: false,
      nickname: null,
      oldpass: null,
      newpass: null,
      newpassr: null,
      loading: true,
      upThe: null
    }
  },
  components: { SideBar, FundDialog },
  async mounted() {
    let self = this;
    await self.initData();
    self.loading = false;
    self.initQiniu();
    self.getMoneyPasswordStatus()
  },
  methods: {
    ...mapActions('user', ['ajaxUserInfo', 'ajaxChangeUserInfo', 'ajaxChangePassword', 'ajaxAddMoneyPassword', 'ajaxMoneyPasswordStatus']),
    ...mapActions('order', ['ajaxGetQiniuToken']),
    ...mapMutations('user', ['setUser']),
    async initData() {
      let self = this;
      let res = await this.ajaxUserInfo();
      if (self.$checkData(res)) {
        self.userInfo = res.data.userinfo;
      }
    },
    async changeAvatar(img) {
      let self = this;
      if (self.changeLoading) {
        return false;
      }
      let load = self.$message({
        message: '正在上传头像...',
        duration: 0
      });
      self.changeLoading = true;
      let res = await this.ajaxChangeUserInfo({ Picture: img })
      load.close();
      self.changeLoading = false;
      if (self.$checkData(res)) {
        self.setUser(res.data.user);
        self.userInfo = res.data.user;
        self.$message.success('修改头像成功');
        let auth = { headers: { Authorization: res.data.token } }
        localStorage.setItem('auth', JSON.stringify(auth))
      }
    },
    async initQiniu() {
      let self = this;
      let uptoken = await self.ajaxGetQiniuToken();
      Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'change__img__btn',
        uptoken: uptoken,
        get_new_uptoken: false,
        unique_names: true,
        domain: 'http://p09c65oxn.bkt.clouddn.com',
        max_retries: 9,
        chunk_size: '4mb',
        auto_start: true,
        multi_selection: false,
        filters: {
          max_file_size: '20mb',
          prevent_duplicates: true,
          mime_types: [
            { title: "Image files", extensions: "jpg,gif,png,jpeg" },
          ]
        },
        init: {
          'FilesAdded': function(up, files) {},
          'BeforeUpload': function(up, file) {},
          'UploadProgress': function(up, file) {},
          'FileUploaded': function(up, file, info) {
            let domain = up.getOption('domain');
            let res = eval("(" + info + ")");
            let sourceLink = domain + "/" + res.key;
            self.changeAvatar(res.key);
          },
          'Error': function(up, err, errTip) {
            //self.$message.error(errTip)
          },
          'UploadComplete': function() {},
          'Key': function(up, file) {
            let key = "";
            return key
          }
        }
      });
    },
    async changeNickname() {
      if (this.changeLoading) return
      let { nickname } = this
      if (!nickname) {
        this.$message.error('请填写完整')
        return
      }
      this.changeLoading = true
      let res = await this.ajaxChangeUserInfo({ nichName: nickname })
      if (this.$checkData(res)) {
        this.editNicknameDia = false;
        this.nickname = '';
        this.setUser(res.data.user);
        this.userInfo = res.data.user;
        this.$message.success('修改昵称成功');
        let auth = { headers: { Authorization: res.data.token } }
        localStorage.setItem('auth', JSON.stringify(auth))
      }
      this.changeLoading = false
    },
    async changePass() {
      if (this.changeLoading) return
      if (!this.oldpass || !this.newpass || !this.newpassr) {
        this.$message.error('请填写完整')
        return
      }
      if (this.newpass !== this.newpassr) {
        this.$message.error('两次新密码输入不相同')
        return
      }
      this.changeLoading = true
      let res = await this.ajaxChangePassword({
        password: this.$md5(this.oldpass),
        newpassword: this.$md5(this.newpassr)
      });
      if (this.$checkData(res)) {
        this.editPassDia = false;
        this.oldpass = '';
        this.newpass = '';
        this.newpassr = '';
        this.$message.success('修改密码成功');
      }
      this.changeLoading = false
    },
    async getMoneyPasswordStatus() {
      let res = await this.ajaxMoneyPasswordStatus()
      if (res.code === 1) {
        this.upThe = res.data.UpThe
      }
    },
    moneyPass(value) {
      this.$refs.funDialog.level = value
      this.$refs.funDialog.show()
    }

  }
}

</script>
<style lang="scss">
.my__account__container {
  @include container;
  margin-top: 20px;
  .account__wrapper {
    .account__info {
      padding: 20px;
      margin-bottom: 40px;
      .info__img {
        width: 200px;
        height: 110px;
        float: left;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
        .change__img__wrapper {
          user-select: none;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          text-align: center;
          height: 40px;
          line-height: 40px;
          position: absolute;
          width: 100%;
          bottom: 0;
          cursor: pointer;
          &:hover {
            background: rgba(0, 0, 0, 0.6);
          }
        }
      }

      .info {
        overflow: hidden;
        height: 110px;
        p {
          &:first-child {
            margin-bottom: 20px;
          }
          i {
            margin-left: 20px;
          }
        }
      }
    }
    .info__list {
      padding: 0 20px;
      .el-row {
        border-bottom: 1px solid $bd-gray;
        &:first-child {
          border-top: 1px solid $bd-gray;
        }
        &.with-bg {
          background: $bg-gray--light;
        }
        &.list__header {
          font-size: 16px;
          .el-col {
            &:first-child {
              text-align: center;
              padding-left: 0;
            }
          }
        }
        .el-col {
          text-align: center;
          height: 60px;
          line-height: 60px;
          &:first-child {
            text-align: left;
            padding-left: 88px;
          }
          i {
            font-size: 20px;
            &.icon-zhanghushezhi-zijinmimaicon1{
              font-size: 18px;
            }
          }
          span {
            margin-left: 20px;
          }
        }
      }
    }
  }
  .forget-money-password {
    cursor: pointer;
    &:hover {
      color: $color-primary;
    }
  }
}

</style>
