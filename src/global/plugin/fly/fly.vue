<template>
  <div class="fly" v-if="visible">
    <h1>Fly</h1>
    <canvas id="fly"></canvas>
  </div>
</template>

<script>
  export default {
    name: "fly",
    data() {
      return {
        visible: true,
        canvas: null
      }
    },
    methods: {
      init() {
        const ctx = document.querySelector('#fly').getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
        ctx.stroke();
      },
      close() {
        this.visible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .fly {
    #fly {
      width: 100%;
      height: 200px;
    }
  }
</style>
