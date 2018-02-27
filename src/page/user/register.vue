<template>
  <div class="register">
    <v-header title="注册"/>
    <div class="form">
      <v-list-item :title="area" @click="toAreaList"/>
      <phone-input v-model="phone" @click="openModel"/>
      <v-input placeholder="密码" type="password" v-model="password"/>
      <v-input placeholder="验证码" v-model="verify"/>
    </div>
    <v-button type="primary" @click="submit">注册</v-button>
    <send-message ref="sendModel" :phone="phone"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import PhoneInput from '@/components/common/phone-input'
  import SendMessage from '@/components/common/send-message'

  export default {
    name: "register",
    components: {PhoneInput, SendMessage},
    data() {
      return {
        phone: null,
        password: null,
        verify: null
      }
    },
    computed: {
      ...mapState('user', ['areaCode']),
      area() {
        let areaCode = this.areaCode
        if(areaCode.phoneCode && areaCode.countryName) {
          return areaCode.phoneCode + '' + areaCode.countryName
        }else {
          return '请选择区号'
        }
      }
    },
    methods: {
      toAreaList() {
        console.log('click')
        // this.$router.go('/user/area-list')
      },
      openModel() {
        this.$refs.sendModel.show()
      },
      async submit() {
        let token = this.$refs.sendModel.getToken()
        console.log(token)
      }
    }
  }
</script>

<style scoped lang="scss">
  .register {
    .v-button {
      margin-top: 1.5rem;
    }
  }
</style>
