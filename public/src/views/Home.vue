<template>
  <div>
    <h1>{{ $t('locale.pageTitles.home') }}</h1>
    <base-error v-if="isErrorVisible" @close-error="closeError">
    </base-error>
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
      isErrorVisible: false,
    };
  },
  methods: {
    closeError() {
      this.isErrorVisible = false;
    },
  },
  props: {
    isUserLoggedIn: {
      type: Boolean,
    },
  },
  created() {
    if(!this.$props.isUserLoggedIn) {
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
