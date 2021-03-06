<template>
  <div class="base-modal">
    <div class="base-modal-wrapper" :class="widthClass">
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

const acceptedWidthTypes = ['normal', 'flexible'];

export default {
  components: {BaseButton},
  props: {
    widthType: {
      type: String,
      validator(value) {
        return acceptedWidthTypes.indexOf(value) !== -1;
      },
    },
  },
  computed: {
    widthClass() {
      return this.$props.widthType;
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
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparentize($lighter-gray, $amount: 0.3);

  &-wrapper {
    overflow-y: scroll;
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

    &.flexible {
      width: fit-content;
      width: --moz-fit-content;
      height: fit-content;
      height: --moz-fit-content;
      max-height: 80%;
      padding: 5rem;

      .button-close {
        margin-bottom: 2rem;
      }
    }

    &::-webkit-scrollbar {
      background-color: darken($lighter-gray, 4%);
      height: 15px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      &-thumb {
        background-color: $lighter-gray;
        &:hover {
          background-color: $dark-yellow;
        }
      }
    }
  }

  .button-close {
    position: sticky;
    top: 10px;
    left: 100%;
    margin-bottom: -100%;

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
