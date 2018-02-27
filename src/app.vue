<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created() {
      let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
      if (clientWidth <= 780) {
        location.href = 'https://loong.ph/h5/'
      }
    },
  }
</script>

