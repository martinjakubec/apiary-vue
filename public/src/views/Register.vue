<template>
  <div>
    <h1>{{ $t('locale.pageTitles.register') }}</h1>
    <form class="inputs" @submit.prevent="handleRegistration">
      <p v-if="registrationSuccessful">
        {{$t('locale.pages.Register.registrationSuccessful')}}
      </p>
      <input-text
        :isRequired="true"
        :label="$t('locale.input.username')"
        :id="'username'"
        :name="'username'"
      ></input-text>
      <input-email
        :isRequired="true"
        :label="$t('locale.input.email')"
        :id="'email'"
        :name="'email'"
      ></input-email>
      <input-password
        :isRequired="true"
        :label="$t('locale.input.password')"
        :id="'password'"
        :name="'password'"
      ></input-password>
      <base-button :isGhostButton="false">{{
        $t('locale.input.register')
      }}</base-button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseButton from '../components/base/BaseButton';
import InputEmail from '../components/base/inputs/InputEmail.vue';
import InputText from '../components/base/inputs/InputText.vue';
import InputPassword from '../components/base/inputs/InputPassword.vue';

export default {
  name: 'Register',
  components: {
    BaseButton,
    InputEmail,
    InputText,
    InputPassword,
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
            }, 3000);
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

<style lang="scss" scoped>
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
