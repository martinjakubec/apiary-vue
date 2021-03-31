<template>
  <nav class="topnav">
    <router-link to="/" class="topnav-logo">{{ appName }}</router-link>
    <router-link to="/register" class="topnav-link">{{
      $t('topNavBar.register')
    }}</router-link>
    <router-link to="/login" class="topnav-link">{{
      $t('topNavBar.login')
    }}</router-link>
  </nav>
</template>

<script>
export default {
  computed: {
    appName() {
      return process.env.VUE_APP_TITLE;
    },
  },
};
</script>

<style lang="scss" scoped>
.topnav {
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 20px 10px;
  background-color: $lighter-gray;
  justify-content: flex-end;

  a {
    color: $dark-yellow;
    text-decoration: none;
    font-size: 2.5rem;
    padding-left: 15px;
    font-weight: bold;

    &:first-child {
      margin-right: auto;
      padding-left: 10px;
    }

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
