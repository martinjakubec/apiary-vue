<template>
  <div class="input-wrapper">
    <label :class="{'has-value': hasValue, 'is-required': isRequired}" :for="id">{{ label }}</label>
    <input
      type="password"
      v-model="value"
      :id="id"
      :name="name"
      :required="isRequired"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {type: String, required: true},
    id: {type: String, required: true},
    name: {type: String, required: true},
    isRequired: {type: Boolean},
    defaultValue: {type: String}
  },
  data() {
    return {
      value: this.defaultValue ? this.defaultValue : '',
    };
  },
  computed: {
    hasValue() {
      return this.value.length > 0 ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  margin: 1.7rem;
  &:focus-within {
    label {
      top: -25%;
      transition-duration: 0.3s;
      transition-property: top;
    }
  }

  label {
    transition-duration: 0.3s;
    transition-property: top;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    display: block;
    cursor: text;

    &.has-value {
      top: -25%;
      transition-duration: 0.3s;
      transition-property: top;
    }

    &.is-required {
      &::after {
        content: "*";
      }
    }
  }
  input {
    display: block;
    color: $dark-yellow;
    font-size: 1.6rem;
    padding: 1.3rem;
    background-color: $lighter-gray;
    border-radius: 10px;
    box-shadow: inset 0px 0px 0px 0px transparent;
    outline: none;
    min-width: 250px;
    max-width: 350px;
    box-sizing: border-box;
    height: 50px;
    border: none;
    transition-duration: 0.3s;
    transition-property: box-shadow;

    &:focus {
      box-shadow: inset 0px 0px 0px 3px $dark-yellow;
      background-color: $lighter-gray;
      transition-duration: 0.3s;
      transition-property: box-shadow;
    }
  }
}
</style>
