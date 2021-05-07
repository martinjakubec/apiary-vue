<template>
  <div class="single-hive-head">
    <div class="data-column">
      <router-link to="/hives" class="link-back">Back to all hives</router-link>
      <h1>
        {{ $t('locale.pageTitles.singleHive', {hiveNumber: $route.params.id}) }}
      </h1>
      <h2 v-if="hiveData.hiveDescription">
        {{ hiveData.hiveDescription }}
      </h2>
      <information-view v-if="!isInEditMode" :hiveData="hiveData" @open-edit="openEditMode"></information-view>
      <edit-view v-else :hiveData="hiveData" @close-edit="closeEditMode" @error="$emit('error-emitted')" @update-hives="$emit('update-hives')"></edit-view>
    </div>
  </div>
</template>

<script>
import EditView from './EditView.vue';
import InformationView from './InformationView.vue';
export default {
  components: {InformationView, EditView},
  props: {
    hiveData: {
      type: Object,
      required: true,
    },
  },
  emits: ['update-hives', 'error-emitted'],
  data() {
    return {
      isInEditMode: false,
    };
  },
  methods: {
    openEditMode() {
      this.isInEditMode = true;
    },
    closeEditMode() {
      this.isInEditMode = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
