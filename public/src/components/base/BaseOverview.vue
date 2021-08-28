<template>
  <div class="col-12 col-md-6 overview">
    <h2>{{title}}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 2.2rem;
  font-weight: bold;
  font-style: italic;
  // width: fit-content;
  margin-bottom: 10px;

  &::after {
    content: "";
    display: block;
    width: 80%;
    height: 2px;
    position: relative;
    left: -2px;
    top: 2px;
    background-color: $dark-yellow;
  }
}

.overview {
  margin-bottom: 10rem;
}
</style>