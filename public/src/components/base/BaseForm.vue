<template>
  <form :class="isFullWidth ? 'full-width' : ''">
    <slot></slot>
  </form>
</template>

<script>
export default {
  props: {
    isFullWidth: Boolean
  }
}
</script>

<style lang="scss" scoped>
  form {
    display: flex;
    flex-direction: column;
    min-width: 500px;
    margin: auto;
    align-items: center;
    padding-top: 20px;

    &.full-width {
      width: 100%;
    }
  }
</style>