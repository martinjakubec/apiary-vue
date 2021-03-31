<template>
  <top-navbar />
  <left-navbar />
  <div class="router-view">
    <router-view>
      <template v-slot="{Component}">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </template>
    </router-view>
  </div>
</template>

<script>
import LeftNavbar from './components/LeftNavbar.vue';
import TopNavbar from './components/TopNavbar.vue';

export default {
  components: {
    TopNavbar,
    LeftNavbar,
  },
};
</script>

<style lang="scss">
.router-view {
  padding-left: 250px;
  padding-top: 35px;
}
</style>
