<template>
  <top-navbar></top-navbar>
  <locale-switcher/>
  <router-view/>
</template>

<script>
import LocaleSwitcher from './components/LocaleSwitcher';
import TopNavbar from './components/TopNavbar.vue';

export default {
  components: {
    LocaleSwitcher,
    TopNavbar
  }
}
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>
