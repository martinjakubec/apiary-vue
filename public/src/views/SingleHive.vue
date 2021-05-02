<template>
  <div>
    <h1>{{ $t('locale.pageTitles.singleHive', {hiveNumber: $route.params.id}) }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'SingleHive',
  // async beforeRouteEnter (to, from, next) {
    
  // }
};
</script>

<style lang="scss">
//
</style>
