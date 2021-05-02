<template>
  <div>
    <h1>{{ $t('locale.pageTitles.register') }}</h1>
    <form class="inputs" @submit.prevent="handleRegistration">
      <p v-if="registrationSuccessful">
        Registration successful, you will be redirected to login page.
      </p>
      <base-input
        :inputType="'text'"
        :placeholder="$t('locale.input.username')"
        :autocomplete="'off'"
        :name="'username'"
      ></base-input>
      <base-input
        :inputType="'email'"
        :placeholder="$t('locale.input.email')"
        :autocomplete="'off'"
        :name="'email'"
      ></base-input>
      <base-input
        :inputType="'password'"
        :placeholder="$t('locale.input.password')"
        :autocomplete="'off'"
        :name="'password'"
      ></base-input>
      <base-button :isGhostButton="false">{{
        $t('locale.input.register')
      }}</base-button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseInput from '../components/base/BaseInput';
import BaseButton from '../components/base/BaseButton';

export default {
  name: 'Register',
  components: {
    BaseInput,
    BaseButton,
  },
  emits: ['error-emitted'],
  data() {
    return {
      registrationSuccessful: false,
    };
  },
  methods: {
    async handleRegistration(e) {
      const username = e.target.username.value.trim();
      const email = e.target.email.value.trim();
      const password = e.target.password.value.trim();
      if (username && email && password) {
        const body = JSON.stringify({
          username,
          email,
          password,
        });
        try {
          const registerUserRequest = await fetch(
            `${process.env.VUE_APP_API_URL}/register`,
            {
              method: 'POST',
              body,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const registerRequestResponse = await registerUserRequest.json();
          if (registerRequestResponse.status === 'ok') {
            this.registrationSuccessful = true;
            setTimeout(() => {
              this.$router.push('/login');
            }, 3000)
          } else {
            console.log(registerRequestResponse.error);
            this.$emit('error-emitted', registerRequestResponse.error);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<style lang="scss">
h1 {
  text-align: center;
}

.inputs {
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  p {
    margin-bottom: 20px;
  }
}
</style>
