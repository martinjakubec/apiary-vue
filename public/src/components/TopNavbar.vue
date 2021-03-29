<template>
  <nav class="topnav">
    <router-link to="/" class="topnav-logo">Apiary App</router-link>
    <router-link to="/register" class="topnav-link">Register</router-link>
    <router-link to="/login" class="topnav-link">Login</router-link>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .topnav {
    position: sticky;
    top: 0;
    width: 100%;
    background-color: $lighter-gray;
  }
</style>