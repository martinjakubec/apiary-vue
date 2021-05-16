<template>
  <nav class="left-navbar">
    <router-link class="left-navbar-link" to="/">{{$t('locale.pageTitles.home')}}</router-link>
    <router-link v-if="isUserLoggedIn" class="left-navbar-link" to="/hives">{{$t('locale.pageTitles.hives')}}</router-link>
    <router-link v-if="isUserLoggedIn" class="left-navbar-link space-after" to="/todos">{{$t('locale.pageTitles.todos')}}</router-link>
    <router-link v-if="isUserLoggedIn" class="left-navbar-link" to="/profile">{{$t('locale.pageTitles.profile')}}</router-link>
    <router-link class="left-navbar-link" to="/manual">{{$t('locale.pageTitles.manual')}}</router-link>
    <locale-switcher class="locale-switcher"></locale-switcher>
  </nav>
</template>

<script>
import LocaleSwitcher from './LocaleSwitcher';
export default {
  components: {
    LocaleSwitcher,
  },
  props: {
    isUserLoggedIn: Boolean
  }  
}
</script>

<style lang="scss" scoped>
  .left-navbar {
    position: fixed;
    top: 60px;
    width: 180px;
    background-color: $lighter-gray;
    height: calc(100vh - 60px);
    border-right: 3px solid $dark-yellow;
    display: flex;
    flex-direction: column;
    align-items: left;
    padding-left: 30px;
    padding-top: 30px;
    z-index: 98;

    .locale-switcher {
      margin-top: auto;
      margin-bottom: 20px;
    }

    &-link {
      color: $dark-yellow;
      padding: 12px;
      text-decoration: none;
      font-size: 2rem;
      margin-right: -3px;
      border-radius: 10px 0 0 10px;

      &.router-link-active {
        border: 3px solid $dark-yellow;
        border-right: 3px solid $dark-gray;
        background-color: $dark-gray;
        z-index: 10;
        position: relative;
        padding: 9px;
        font-weight: bold;
        
        &:active {
          color: $dark-yellow;
          font-weight: normal;
          text-decoration: none;
        }
      }

      &:hover, &:focus {
        // background-color: $dark-yellow;
        color: $dark-yellow;
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }

  .space-after {
    margin-bottom: 100px;
  }
  
</style>