<template>
	<div class="change-monpass">
    <v-header title="设置资金密码" class="u-fixed-header"/>
    <div class="u-main-content fixed ">
      <div class="input__wrapper">
        <v-input type="text" placeholder="请输入图片验证码" class="indent"/>
        <v-input type="text" placeholder="请输入手机验证码" class="indent"/>
        <v-input type="password" placeholder="新密码" class="indent"/>
        <v-input type="password" placeholder="确认密码" class="indent nobd"/>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
		name: "change-monpass",
		props: [],
		components: {},
		data() {
			return {}
		},
		computed: {
      type(){
        let type=this.$route.query.type || false;
        return type;
      }
    },
		mounted() {
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.change-monpass {
  .input__wrapper{
    background: #fff;
  }
	}
</style>
