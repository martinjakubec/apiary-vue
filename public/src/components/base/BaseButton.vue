<template>
  <button @click="$emit('button-clicked')" class="button " :class="className">
    <slot></slot>
  </button>
</template>

<script>
const acceptedTypes = ['ghost', 'full', 'danger'];
const acceptedSizes = ['normal', 'square-small', 'square-big', 'tiny', 'small', 'medium'];

export default {
  props: {
    buttonSize: {
      type: String,
      default: 'normal',
      validator: function(value) {
        return acceptedSizes.indexOf(value) !== -1;
      },
    },
    buttonType: {
      type: String,
      default: 'full',
      validator: function(value) {
        return acceptedTypes.indexOf(value) !== -1;
      },
    },
  },
  computed: {
    className() {
      return `${this.buttonType} ${this.buttonSize}`;
    },
  },
  emits: ['button-clicked'],
};
</script>

<style lang="scss" scoped>
.button {
  margin: 10px 0;
  padding: 10px 20px;
  min-height: 50px;
  min-width: 120px;
  border-radius: 10px;
  outline: none;
  font-size: 2rem;
  font-weight: bold;
  box-sizing: border-box;

  &:focus,
  &:hover {
    outline: none;
  }

  &.full {
    background-color: $dark-yellow;
    border: none;
    box-shadow: 0px 5px 10px 4px rgba(0, 0, 0, 0.25);
    transition-property: background-color, box-shadow;
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    &:hover,
    &:focus {
      background-color: $darker-yellow;
      box-shadow: 0px 5px 10px 4px rgba(0, 0, 0, 0.45);
    }
  }

  &.ghost {
    background-color: transparent;
    border: 3px solid $dark-yellow;
    color: $dark-yellow;
    transition-property: background-color, color;
    transition-duration: 0.15s;
    &:hover,
    &:focus {
      background-color: $dark-yellow;
      color: $dark-gray;
    }
  }
  
  &.danger {
    background-color: transparent;
    border: 3px solid $danger-red;
    color: $danger-red;
    transition-property: background-color, color;
    transition-duration: 0.15s;
    &:hover,
    &:focus {
      background-color: $danger-red;
      color: $dark-gray;
    }
  }

  &.square-big {
    min-width: 160px;
    aspect-ratio: 1 / 1;
  }

  &.square-small {
    min-width: 80px;
    aspect-ratio: 1 / 1;
  }
  &.tiny {
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
    padding: 5px;
    aspect-ratio: 1 / 1;
  }
  &.small {
    min-width: 70px;
    max-width: 90px;
    font-size: 1.4rem;
    min-height: 30px;
    max-height: 30px;
    padding: 0 5px;
    margin: 0;
  }
  &.medium {
    min-width: 90px;
    max-width: 120px;
    font-size: 1.5rem;
    min-height: 40px;
    max-height: 40px;
    padding: 0 5px;
    margin: 0;
  }
}
</style>
