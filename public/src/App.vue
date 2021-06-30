<template>
  <base-error v-if="errorData" @close-error="closeError">{{
    errorData
  }}</base-error>
  <top-navbar
    :isUserLoggedIn="isUserLoggedIn"
    @user-logout="handleUserLogout"
  />
  <left-navbar :isUserLoggedIn="isUserLoggedIn" v-if="isUserLoggedIn" />
  <div class="router-view">
    <router-view
      :isUserLoggedIn="isUserLoggedIn"
      :userData="userData"
      @error-emitted="openError"
      @user-logged-in="handleUserLogin"
    >
      <template v-slot="{Component}">
        <!-- <keep-alive v-if="isUserLoggedIn">
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive> -->
        <component :is="Component" :key="$route.fullPath" />
      </template>
    </router-view>
  </div>
</template>

<script>
import BaseError from './components/base/BaseError.vue';
import LeftNavbar from './components/LeftNavbar.vue';
import TopNavbar from './components/TopNavbar.vue';

export default {
  components: {
    TopNavbar,
    LeftNavbar,
    BaseError,
  },
  data() {
    return {
      isUserLoggedIn: false,
      userData: null,
      errorData: false,
    };
  },
  async created() {
    this.handleUserLogin()
    const token = localStorage.getItem('token');
    if (token) {
      const [, payload] = token.split('.');
      const username = JSON.parse(atob(payload)).username;
      const verifyToken = await fetch(
        process.env.VUE_APP_API_URL + '/validateToken',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({token}),
        }
      );
      const verifyTokenResponse = await verifyToken.json();
      if (verifyTokenResponse.status === 'ok') {
        this.isUserLoggedIn = true;
        this.fetchUserData(token, username);
      } else {
        this.errorMessage = verifyTokenResponse.error;
        this.handleUserLogout();
      }
    }
  },
  methods: {
    openError(data) {
      this.errorData = data;
    },
    closeError() {
      this.errorData = null;
    },
    async fetchUserData(token) {
      const userDataRequest = await fetch(
        process.env.VUE_APP_API_URL + '/user',
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const userDataResponse = await userDataRequest.json();
      this.userData = userDataResponse;
    },
    async handleUserLogin() {
      const username = 'demo';
      const password = 'demoapp';
      try {
        if (username && password) {
          const loginBody = JSON.stringify({username, password});
          const userLogin = await fetch(
            process.env.VUE_APP_API_URL + '/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: loginBody,
            }
          );
          const userLoginResponse = await userLogin.json();
          if (userLoginResponse.status === 'ok') {
            this.isUserLoggedIn = true;
            this.errorData = null;
            const token = userLoginResponse.data;
            localStorage.setItem('token', token);
            this.fetchUserData(token, username);
            this.$router.push('/');
          } else {
            this.errorData = userLoginResponse.error;
          }
        } else {
          this.errorData = 'Please fill in both fields.';
        }
      } catch (err) {
        console.log(err);
      }
    },
    handleUserLogout() {
      this.isUserLoggedIn = false;
      this.userData = null;
      localStorage.removeItem('token');
      this.$router.push('/login')
    },
  },
};
</script>

<style lang="scss">
.router-view {
  padding-left: 250px;
  padding-right: 50px;
  padding-top: 35px;
  padding-bottom: 40px;
}
</style>
