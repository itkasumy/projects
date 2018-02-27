<template>
	<div class="change-pass">
    <v-header title="修改密码" class="u-fixed-header"/>
    <div class="u-main-content fixed ">
      <div class="input__wrapper">
      <v-input type="password" placeholder="原密码" class="indent" v-model="oldpass"/>
      <v-input type="password" placeholder="新密码" class="indent" v-model="newpass"/>
      <v-input type="password" placeholder="再次确认密码" class="indent nobd" v-model="newpassr"/>
      </div>
      <v-button type="primary" @click="changePass">确认提交</v-button>
    </div>
	</div>
</template>

<script>
  import { mapActions } from 'vuex'
	export default {
		name: "change-pass",
		props: [],
		components: {},
		data() {
			return {
        oldpass: null,
        newpass: null,
        newpassr: null,
        changeLoading:false
      }
		},
		computed: {},
		mounted() {
		},
		methods: {
      ...mapActions('user', ['ajaxChangePassword']),
      async changePass() {
        if (this.changeLoading) return
        if (!this.oldpass || !this.newpass || !this.newpassr) {
          this.$toast.error('请填写完整')
          return
        }
        if (this.newpass !== this.newpassr) {
          this.$toast.error('两次新密码输入不相同')
          return
        }
        this.changeLoading = true
        this.$toast.loading('正在修改密码...')
        let res = await this.ajaxChangePassword({
          password: this.$md5(this.oldpass),
          newpassword: this.$md5(this.newpassr)
        });
        if (this.$checkData(res)) {
          this.$toast.success('修改密码成功');
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
	.change-pass {
  .input__wrapper{
    background: #fff;
    margin-bottom: 1.5rem;
  }
	}
</style>
