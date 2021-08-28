<template>
  <base-overview :title="'Hives'">
    <p>{{ $t('locale.pages.Home.totalNumberOfHives', {numberOfHives}) }}</p>
    <h3>{{ $t('locale.pages.Home.lastControlsDataTitle') }}</h3>
    <p>{{ $t('locale.pages.Home.numHivesWithoutEggs', {noEggsHivesNumber}) }}</p>
    <p>{{ $t('locale.pages.Home.numHivesWithoutQueen', {noQueenHivesNumber}) }}</p>
    <p>{{ $t('locale.pages.Home.numHivesWithoutEggsAndQueen', {noEggsAndQueenHivesNumber}) }}</p>
    <router-link :to="'/hives'">
      <base-button :buttonType="'ghost'">{{ $t('locale.pages.Home.seeAllHives') }}</base-button>
    </router-link>
  </base-overview>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
import BaseOverview from '../base/BaseOverview.vue';
export default {
  components: {BaseOverview, BaseButton},
  data() {
    return {
      numberOfHives: undefined,
      noEggsHivesNumber: undefined,
      noQueenHivesNumber: undefined,
      noEggsAndQueenHivesNumber: undefined,
    };
  },
  emits: ['error-emitted'],
  /**
   * Fetches hive info 
   */
  async created() { 
    const token = localStorage.getItem('token');
    const hivesRequest = await fetch(process.env.VUE_APP_API_URL + '/hives', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
    });
    const hivesResponse = await hivesRequest.json();
    if (hivesResponse.status === 'ok') {
      this.numberOfHives = hivesResponse.data?.hives?.length;
      // eslint-disable-next-line
      let noEggsHivesNumber = 0;
      let noQueenHivesNumber = 0;
      let noEggsAndQueenHivesNumber = 0;
      for (let hive of hivesResponse.data.hives) {
        const lastHiveControl = hive.controls[hive.controls.length - 1];
        if (lastHiveControl) {
          if (lastHiveControl.freshEggs === false) {
            noEggsHivesNumber++;
          }
          if (lastHiveControl.queenSpotted === false) {
            noQueenHivesNumber++;
          }
          if (
            lastHiveControl.freshEggs === false &&
            lastHiveControl.queenSpotted === false
          ) {
            noEggsAndQueenHivesNumber++;
          }
        }
      }
      this.noEggsHivesNumber = noEggsHivesNumber;
      this.noQueenHivesNumber = noQueenHivesNumber;
      this.noEggsAndQueenHivesNumber = noEggsAndQueenHivesNumber;
    } else {
      this.$emit('error-emitted', hivesResponse.error);
    }
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-style: italic;
  &::after {
    content: '';
    display: block;
    width: 80%;
    height: 1px;
    position: relative;
    top: 2px;
    left: -2px;
    background-color: $dark-yellow;
  }
}
</style>
