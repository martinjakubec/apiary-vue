<template>
  <nav class="left-navbar">
    <router-link class="left-navbar-link" to="/">{{$t('pageTitles.home')}}</router-link>
    <router-link class="left-navbar-link" to="/hives">{{$t('pageTitles.hives')}}</router-link>
    <router-link class="left-navbar-link space-after" to="/todos">{{$t('pageTitles.todos')}}</router-link>
    <router-link class="left-navbar-link" to="/profile">{{$t('pageTitles.profile')}}</router-link>
    <router-link class="left-navbar-link" to="/manual">{{$t('pageTitles.manual')}}</router-link>
    <locale-switcher class="locale-switcher"></locale-switcher>
  </nav>
</template>

<script>
import LocaleSwitcher from './LocaleSwitcher';
export default {
  components: {
    LocaleSwitcher,
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