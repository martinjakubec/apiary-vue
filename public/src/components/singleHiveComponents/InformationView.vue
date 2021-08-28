<template>
  <div>
    <p v-if="hiveData.overalState">
      <span class="description-label"
        >{{ $t('locale.pages.SingleHive.overalState') }}: </span
      >{{ hiveData.overalState }}
    </p>
    <p v-if="hiveData.totalNumberOfFrames">
      <span class="description-label"
        >{{ $t('locale.pages.SingleHive.totalNumberOfFrames') }}: </span
      >{{ hiveData.totalNumberOfFrames }}
    </p>
    <p v-if="hiveData.hiveColor" :style="{color: hiveData.hiveColor}">
      <span class="description-label"
        >{{ $t('locale.pages.SingleHive.hiveColor') }}: </span
      >{{ hiveData.hiveColor }}
    </p>
    <p v-if="hiveData.queenBreed">
      <span class="description-label"
        >{{ $t('locale.pages.SingleHive.queenBreed') }}: </span
      >{{ hiveData.queenBreed }}
    </p>
    <p v-if="hiveData.queenNumber">
      <span class="description-label"
        >{{ $t('locale.pages.SingleHive.queenNumber') }}: </span
      >{{ hiveData.queenNumber }}
    </p>
    <p v-if="hiveData.queenColor">
      <span class="description-label"
        >{{ $t('locale.pages.SingleHive.queenColor.label') }}: </span
      >{{ hiveData.queenColor }}
    </p>
    <p v-if="hiveData.dateAdded">
      <span class="description-label"
        >{{ $t('locale.pages.SingleHive.dateAdded') }}: </span
      >{{ new Date(Date.parse(hiveData.dateAdded)).toLocaleDateString() }}
    </p>
    <p v-if="hiveData.honeySuper">
      <span class="description-label"
        >{{ $t('locale.pages.SingleHive.honeySuper') }}: </span
      >{{ hiveData.honeySuper }}
    </p>
    <base-button :buttonType="'ghost'" @click="$emit('open-edit')">{{
      $t('locale.pages.SingleHive.editInfo')
    }}</base-button>
  </div>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
export default {
  components: {BaseButton},
  emits: ['open-edit'],
  props: {
    hiveData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
