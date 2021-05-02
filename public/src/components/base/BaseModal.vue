<template>
  <div class="base-modal">
    <div class="base-modal-wrapper">
      <base-button
        class="button-close"
        :buttonSize="'tiny'"
        :buttonType="'full'"
        @click="$emit('close-modal')"
      ></base-button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
  components: {BaseButton},
  props: {
    stages: {
      type: Number,
      required: true,
    },
  },
  emits: ['close-modal'],
  created() {
    // console.log(this);
  },
};
</script>

<style lang="scss" scoped>
.base-modal {
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  // transform: translate(-50%);
  width: 100vw;
  height: 100vh;
  background-color: transparentize($lighter-gray, $amount: 0.3);

  &-wrapper {
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border-radius: 10px;
    border: 3px solid $dark-yellow;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: $dark-gray;
    padding: 20px;
  }

  .button-close {
    position: absolute;
    top: 0px;
    right: 0px;

    &::before,
    &::after {
      content: '';
      display: block;
      width: 60%;
      height: 5px;
      background-color: $dark-gray;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 5px;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
</style>
