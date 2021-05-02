<template>
  <div>
    <h1>{{ $t('locale.pageTitles.login') }}</h1>
    <form class="inputs" @submit.prevent="$emit('user-logged-in', $event)">
      <base-input
        :inputType="'text'"
        :placeholder="$t('locale.input.username')"
        :autocomplete="'off'"
        :name="'username'"
      ></base-input>
      <base-input
        :inputType="'password'"
        :placeholder="$t('locale.input.password')"
        :autocomplete="'off'"
        :name="'password'"
      ></base-input>
      <base-button :isGhostButton="false">{{
        $t('locale.input.login')
      }}</base-button>
      <p class="register-prompt">
        No account yet? <router-link to="/register">Register!</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue';
import BaseInput from '../components/base/BaseInput.vue';
// @ is an alias to /src

export default {
  components: {BaseInput, BaseButton},
  name: 'Login',
  emits: ['error-emitted', 'user-logged-in'],
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

.register-prompt {
  margin-top: 2rem;
}
</style>
