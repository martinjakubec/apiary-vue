<template>
  <div class="error-modal">
    <p>{{$t('errorMessages.errorTitle')}}</p>
    <slot></slot>
    <base-button @button-clicked="$emit('close-error')">{{$t('locale.errors.closeError')}}</base-button>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'
export default {
  components: { BaseButton },
  emits: ['close-error']
}
</script>

<style lang="scss" scoped>
  .error-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 400px;
    min-height: 150px;
    padding: 30px;
    border: 3px solid $dark-yellow;
    border-radius: 10px;
    background-color: $lighter-gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: $dark-yellow;
    
  }
</style>