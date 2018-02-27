<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import './assets/scss/reset.scss'

  export default {
    name: 'App',
    created() {
      let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
      if (clientWidth > 780) {
        location.href = 'https://loong.ph/loong/'
      }
    },
    mounted() {
      document.body.addEventListener('touchstart', () => {
      })
    }
  }
</script>

