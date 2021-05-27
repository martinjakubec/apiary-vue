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
      <div class="left-col">
      <information-view v-if="!isInEditMode" :hiveData="hiveData" @open-edit="openEditMode"></information-view>
      <edit-view v-else :hiveData="hiveData" @close-edit="closeEditMode" @error="$emit('error-emitted')" @update-hives="$emit('update-hive')"></edit-view>
      </div>
      <div class="right-col">
        <hive-table />
      </div>
    </div>
  </div>
</template>

<script>
import EditView from './EditView.vue';
import HiveTable from './HiveTable.vue';
import InformationView from './InformationView.vue';
export default {
  components: {InformationView, EditView, HiveTable},
  props: {
    hiveData: {
      type: Object,
      required: true,
    },
  },
  emits: ['update-hive', 'error-emitted'],
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

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
}

.link-back {
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &::before {
    content: '';
    background: url('../../assets/img/cil-arrow-circle-left.svg');
    display: inline-block;
    height: 1.6em;
    margin-right: 0.8em;
    aspect-ratio: 1 / 1;
    transition-property: transform;
    transition-duration: 0.2s;
  }

  &:hover {
    &::before {
      transform: translateX(-0.8em);
      transition-property: transform;
      transition-duration: 0.2s;
    }
  }
}

h2 {
  font-size: 2.5rem !important;
  margin-bottom: 20px !important;
  margin-left: 20px !important;
  font-style: italic !important;
}

.left-col, .right-col {
  vertical-align: top;
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  min-height: 100px;

  @include media-breakpoint-down(lg) {
    width: 100%;
  }
}
</style>
