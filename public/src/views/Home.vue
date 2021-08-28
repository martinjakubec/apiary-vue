<template>
  <div>
    <base-error v-if="isErrorVisible" @close-error="closeError"> </base-error>
    <h1>{{ $t('locale.pageTitles.home') }}</h1>
    <base-row>
      <hive-overview></hive-overview>
      <todo-overview></todo-overview>
    </base-row>
  </div>
</template>

<script>
import BaseError from '../components/base/BaseError.vue';
import BaseRow from '../components/base/BaseRow.vue';
import HiveOverview from '../components/homeComponents/HiveOverview.vue';
import TodoOverview from '../components/homeComponents/TodoOverview.vue';
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    BaseError,
    BaseRow,
    HiveOverview,
    TodoOverview
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
  async created() {
    if (!this.isUserLoggedIn) {
      this.$router.push('/login');
    }
  },
};
</script>

<style lang="scss" scoped></style>
