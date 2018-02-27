<template>
  <div class="account">
    <v-header title="账户与安全" class="u-fixed-header"/>
    <div class="u-main-content fixed ">
      <div class="todo__wrapper">
        <div class="todo__list">
          <ul>
            <li>
              <div class="item-content u-link-bg user__img__wrapper" id="change__img__btn">
                <div class="item-inner">
                  <span>用户头像</span>
                  <div class="right__icon">
                    <img :src="userInfo.headIcon" class="head__img" v-if="userInfo.headIcon"/><i
                    class="iconfont icon-enter"></i>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <router-link to="/user/change-nickname">
                <div class="item-content u-link-bg">
                  <div class="item-inner">
                    <span>用户名</span>
                    <div class="right__icon">
                      <span>{{userInfo.nichName}}</span><i class="iconfont icon-enter"></i>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="todo__list">
          <div class="list__title">
            安全设置
          </div>
          <ul>
            <li>
              <router-link to="/user/change-pass">
                <div class="item-content u-link-bg">
                  <div class="item-inner">
                    <span>登录密码</span>
                    <div class="right__icon">
                      <span class="u-red">修改</span><i class="iconfont icon-enter"></i>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
            <li>
                <div class="item-content u-link-bg">
                  <div class="item-inner">
                    <span>提现密码</span>
                    <div class="right__icon">
                      <span class="u-red" v-if="upThe===-1" @click="moneyPass(0)">设置</span><span class="u-red" v-if="upThe===1" @click="moneyPass(1)">修改</span><i class="iconfont icon-enter"></i>
                    </div>
                  </div>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapMutations} from 'vuex'

  export default {
    name: "account",
    props: [],
    components: {},
    data() {
      return {
        userInfo: {
          headIcon: null,
          nichName: ''
        },
        changeLoading: false,
        upThe: null
      }
    },
    computed: {},
    async mounted() {
      this.$toast.loading()
      await this.initData();
      await this.getMoneyPasswordStatus();
      this.initQiniu();
      this.$toast.close()
    },
    methods: {
      ...mapActions('user', ['ajaxUserInfo', 'ajaxChangeUserInfo', 'ajaxMoneyPasswordStatus']),
      ...mapActions('order', ['ajaxGetQiniuToken']),
      ...mapMutations('user', ['setUser']),
      async initData() {
        let self = this;
        let res = await this.ajaxUserInfo();
        if (self.$checkData(res)) {
          self.userInfo = res.data.userinfo;
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
              {title: "Image files", extensions: "jpg,gif,png,jpeg"},
            ]
          },
          init: {
            'FilesAdded': function (up, files) {
            },
            'BeforeUpload': function (up, file) {
            },
            'UploadProgress': function (up, file) {
            },
            'FileUploaded': function (up, file, info) {
              let domain = up.getOption('domain');
              let res = eval("(" + info + ")");
              let sourceLink = domain + "/" + res.key;
              self.changeAvatar(res.key);
            },
            'Error': function (up, err, errTip) {
              //self.$message.error(errTip)
            },
            'UploadComplete': function () {
            },
            'Key': function (up, file) {
              let key = "";
              return key
            }
          }
        });
      },
      async changeAvatar(img) {
        let self = this;
        if (self.changeLoading) {
          return false;
        }
        this.$toast.loading('正在上传头像...')
        self.changeLoading = true;
        let res = await this.ajaxChangeUserInfo({Picture: img})
        this.$toast.close();
        self.changeLoading = false;
        if (self.$checkData(res)) {
          self.setUser(res.data.user);
          self.userInfo = res.data.user;
          let auth = {headers: {Authorization: res.data.token}}
          localStorage.setItem('auth', JSON.stringify(auth))
          this.$toast.success('修改头像成功')
        }
      },
      async getMoneyPasswordStatus() {
        let res = await this.ajaxMoneyPasswordStatus()
        if (res.code === 1) {
          this.upThe = res.data.UpThe
        }
      },
      moneyPass(type){
        this.$router.push({
          path: '/user/change-monpass',
          query: {
            type: type,
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .account {
    .todo__wrapper {
      margin-top: .5rem;
      .todo__list {
        .list__title {
          padding: .75rem;
          font-size: 16px;
          color: #666666;
        }
        ul {
          background: #fff;
          li {
            &:last-child {
              .item-content {
                .item-inner {
                  border: 0;
                }
              }
            }
            .item-title {
              line-height: 2.5rem;
              margin-left: .75rem;
              border-bottom: 1px solid $grey-ddd;
              span {
                font-size: 16px;
              }
            }
            .item-content {
              line-height: 2.5rem;
              &.user__img__wrapper {
                line-height: 3rem;
              }
              .item-inner {
                margin-left: .75rem;
                font-size: 14px;
                color: $font-primary;
                border-bottom: 1px solid $grey-ddd;
                clear: both;
                .right__icon {
                  float: right;
                  margin-right: .75rem;
                  font-size: 15px;
                  .icon-enter {
                    color: $grey-ddd;
                    margin-left: .625rem;
                  }
                  .head__img {
                    width: 2rem;
                    height: 2rem;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
