<template>
  <div>
    <h1>{{ $t('locale.pageTitles.login') }}</h1>
    <form class="inputs" @submit.prevent="$emit('user-logged-in', $event)">
      <input-text
        :isRequired="true"
        :label="$t('locale.input.username')"
        :id="'username'"
        :name="'username'"
      ></input-text>
      <input-password
        :isRequired="true"
        :label="$t('locale.input.password')"
        :id="'password'"
        :name="'password'"
      ></input-password>
      <base-button :isGhostButton="false">{{
        $t('locale.input.login')
      }}</base-button>
      <p class="register-prompt">
        {{$t('locale.pages.Login.noAccountPrompt')}} <router-link class="register-link" to="/register">{{$t('locale.pages.Login.registerPrompt')}}</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue';
import InputPassword from '../components/base/inputs/InputPassword.vue';
import InputText from '../components/base/inputs/InputText.vue';
// @ is an alias to /src

export default {
  components: {BaseButton, InputText, InputPassword},
  name: 'Login',
  emits: ['error-emitted', 'user-logged-in'],
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

.register-prompt {
  margin-top: 2rem;
}

.register-link {
  color: $dark-yellow;
}
</style>
