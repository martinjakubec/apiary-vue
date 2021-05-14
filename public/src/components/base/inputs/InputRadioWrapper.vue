<template>
  <div class="radio-wrapper">
    <p class="radio-label">
    {{$props.label}}
    </p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {type: String}
  }
}
</script>

<style lang="scss" scoped>
  .radio-wrapper {
    min-width: 250px;
    max-width: 350px;
    padding: 10px;  
  }
  .radio-label {
    display: block;
    text-align: left;
  }
</style>