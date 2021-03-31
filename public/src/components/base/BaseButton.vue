<template>
  <button @click="$emit('button-clicked')" class="button " :class="[isGhostButton ? 'button-ghost' : 'button-full']">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    isGhostButton: {
      type: Boolean,
    }
  },
  emits: ['button-clicked']
}
</script>

<style lang="scss" scoped>
  .button {
    margin: 10px;
    padding: 10px 20px;
    min-height: 50px;
    min-width: 120px;
    border-radius: 10px;
    outline: none;
    font-size: 2rem;
    font-weight: bold;
    box-sizing: border-box;

    &:focus, &:hover {
      outline: none;
    }


    &-full {
      background-color: $dark-yellow;
      border: none;
      box-shadow: 0px 5px 10px 4px rgba(0, 0, 0, 0.25);
      transition-property: background-color, box-shadow;
      transition-duration: 0.15s;
      transition-timing-function: ease-in-out;
      &:hover, &:focus {
        background-color: $darker-yellow;
        box-shadow: 0px 5px 10px 4px rgba(0, 0, 0, 0.45);
      }
    }

    &-ghost {
      background-color: transparent;
      border: 3px solid $dark-yellow;
      color: $dark-yellow;
      transition-property: background-color, color;
      transition-duration: 0.15s;
      &:hover, &:focus {
        background-color: $dark-yellow;
        color: $dark-gray;
      }
    }

  }
</style>