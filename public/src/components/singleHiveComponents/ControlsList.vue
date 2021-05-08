<template>
  <div>
    <h3>Controls</h3>
    <base-button :buttonType="'ghost'" @click="openModal" >Add control</base-button>
    <p v-for="control of $props.controls" :key="control.controlCustomid">cocuou</p>
    <base-modal v-if="isModalVisible" @close-modal="closeModal">
      
    </base-modal>
  </div>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
import BaseModal from '../base/BaseModal.vue'
export default {
  components: { BaseModal, BaseButton },
  data() {
    return {
      isModalVisible: false
    }
  },
  props: {
    controls: {
      type: Array,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    openModal() {
      this.isModalVisible = true;
    }
  },
}
</script>

<style lang="scss" scoped>
  h3 {
    font-size: 3rem;
    font-weight: bold;
    font-style: italic;
    color: $dark-yellow;
    margin-bottom: 1.5rem;
  }
</style>