<template>
  <div>
    <h1>{{ $t('pageTitles.home') }}</h1>
    <base-error :isModalVisible="isErrorVisible" @close-error="closeError">
      <p>toto je test text</p>
    </base-error >
  </div>
</template>

<script>
import BaseError from '../components/base/BaseError.vue';
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    BaseError,
  },
  data() {
    return {
      isErrorVisible: true
    }
  },
  methods: {
    closeError() {
      this.isErrorVisible = false
    }
  },
  beforeUnmount() {
    console.log('imma get shreked');
  },
};
</script>

<style lang="scss">
//
</style>
