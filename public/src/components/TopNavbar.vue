<template>
  <nav class="topnav">
    <router-link to="/" class="topnav-logo">{{ appName }}</router-link>
    <router-link v-if="!isUserLoggedIn" to="/register" class="topnav-link">{{
      $t('locale.pageTitles.register')
    }}</router-link>
    <router-link v-if="!isUserLoggedIn" to="/login" class="topnav-link">{{
      $t('locale.pageTitles.login')
    }}</router-link>
    <a v-if="isUserLoggedIn" class="topnav-link" @click="$emit('user-logout')">{{
      $t('locale.pageTitles.logout')
    }}</a>
  </nav>
</template>

<script>
export default {
  computed: {
    appName() {
      return process.env.VUE_APP_TITLE;
    },
  },
  props: {
    isUserLoggedIn: Boolean
  }
};
</script>

<style lang="scss" scoped>
.topnav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 20px 10px;
  background-color: $lighter-gray;
  justify-content: flex-end;
  z-index: 99;

  a {
    color: $dark-yellow;
    text-decoration: none;
    font-size: 2rem;
    padding-left: 15px;
    font-weight: bold;
    cursor: pointer;

    &.topnav-logo {
      font-size: 2.5rem;
      margin-right: auto;
      padding-left: 22px;
    }

    &:hover, &:focus {
      text-decoration: underline;
    }
  }
}
</style>
