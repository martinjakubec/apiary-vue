<template>
  <div class="card">
    <slot></slot>

  </div>
</template>

<script>
export default {
  name: 'Base Card',
};
</script>

<style lang="scss" scoped>
.card {
  border: 3px solid $dark-yellow;
  background-color: $lighter-gray;
  color: $dark-yellow;
  padding: 2rem;
  margin-right: 3rem;
  margin-top: 3rem;
  border-radius: 10px;
  box-sizing: border-box;
  width: 280px;
  height: 340px;
  transition-duration: 0.2s;
  transition-property: transform;
  position: relative;
  overflow: hidden;

  &:last-child {
    margin-right: 0;
  }

  &:hover,
  &:focus,
  &:focus-within {
    transform: translateY(-10px);
    transition-duration: 0.2s;
    transition-property: transform;
  }
}
</style>
