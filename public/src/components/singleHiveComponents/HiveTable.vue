<template>
  <div class="canvas-wrapper">
    <canvas> </canvas>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  position: relative;
  height: 100%;
}
canvas {
  position: absolute;
  top: 0;
  right: 0;
  height: 300px;
  width: 500px;
  border: 1px solid red;
}
</style>
