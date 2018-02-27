<template>
  <div class="change-nickname">
    <v-header title="修改用户名" class="u-fixed-header"/>
    <div class="u-main-content fixed ">
      <div class="input__wrapper">
        <span class="input__title">新用户名：</span>
        <v-input type="text" placeholder="填写新用户名" v-model="nickname"/>
      </div>
      <v-button type="primary" @click="changeNickname">确认提交</v-button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  export default {
    name: "change-nickname",
    props: [],
    components: {},
    data() {
      return {
        nickname: null,
        changeLoading:false
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      ...mapActions('user', ['ajaxChangeUserInfo']),
      ...mapMutations('user', ['setUser']),
      async changeNickname() {
        if (this.changeLoading) return
        let { nickname } = this
        if (!nickname) {
          this.$toast.error('请填写完整')
          return
        }
        this.changeLoading = true
        this.$toast.loading('正在修改用户名...')
        let res = await this.ajaxChangeUserInfo({ nichName: nickname })
        if (this.$checkData(res)) {
          this.setUser(res.data.user);
          let auth = { headers: { Authorization: res.data.token } }
          localStorage.setItem('auth', JSON.stringify(auth))
          this.$toast.success('修改昵称成功')
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500)
        }
        this.changeLoading = false
      },
    }
  }
</script>

<style scoped lang="scss">
  .change-nickname {
    .input__wrapper {
      padding: 0 .75rem;
      background: #fff;
      margin-bottom: 1.5rem;
      span.input__title{
        font-size: 15px;
        color: #CCCCCC;
      }
      .v-input{
        display: inline-block;
        border: 0;
      }
    }
  }
</style>
