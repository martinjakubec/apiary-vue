<template>
  <div class="flex">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>


<style lang="scss" scoped>
 .flex {
   display: flex;
   flex-wrap: wrap;
   justify-content: flex-start;
 }
</style>