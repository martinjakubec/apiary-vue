<template>
  <button class="button button-ghost">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['class']
}
</script>