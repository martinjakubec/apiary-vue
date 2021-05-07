<template>
  <div>
    <p v-if="hiveData.overalState">
      <span class="description-label">Overal state: </span
      >{{ hiveData.overalState }}
    </p>
    <p v-if="hiveData.totalNumberOfFrames">
      <span class="description-label">Total number of frames: </span
      >{{ hiveData.totalNumberOfFrames }}
    </p>
    <p v-if="hiveData.hiveColor" :style="{color: hiveData.hiveColor}">
      <span class="description-label">Hive color: </span
      >{{ hiveData.hiveColor }}
    </p>
    <p v-if="hiveData.queenBreed">
      <span class="description-label">Queen breed: </span
      >{{ hiveData.queenBreed }}
    </p>
    <p v-if="hiveData.queenNumber">
      <span class="description-label">Queen number: </span
      >{{ hiveData.queenNumber }}
    </p>
    <p v-if="hiveData.queenColor">
      <span class="description-label">Queen color: </span
      >{{ hiveData.queenColor }}
    </p>
    <p v-if="hiveData.dateAdded">
      <span class="description-label">Date added: </span
      >{{ new Date(Date.parse(hiveData.dateAdded)).toLocaleDateString() }}
    </p>
    <p v-if="hiveData.honeySuper">
      <span class="description-label">Number of honey supers: </span
      >{{ hiveData.honeySuper }}
    </p>
    <p v-if="hiveData.honeyAmount">
      <span class="description-label">Honey amount: </span
      >{{ hiveData.honeyAmount }}
    </p>
    <base-button :buttonType="'ghost'" @click="$emit('open-edit')"
      >Edit info</base-button
    >
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
