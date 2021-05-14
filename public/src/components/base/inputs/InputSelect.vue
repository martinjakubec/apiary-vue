<template>
  <div class="input-wrapper">
    <label :class="{'has-value': hasValue, 'is-required': isRequired}" :for="id">{{ label }}</label>
    <select
      v-model="selected"
      :id="id"
      :name="name"
      :required="isRequired"
    >
    <option v-for="option of options" :key="option.value" :value="option.value" :selected="true">{{option.name}}</option>
    </select>
  </div>  
</template>

<script>
export default {
  props: {
    label: {type: String, required: true},
    id: {type: String, required: true},
    name: {type: String, required: true},
    isRequired: {type: Boolean},
    options: {type: Array, required: true}, // object with value and name keys
    defaultValue: {type: String}
  },
  data() {
    return {
      selected: this.defaultValue ? this.defaultValue : '',
    };
  },
  computed: {
    hasValue() {
      return this.selected.length > 0 ? true : false;
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
  select {
    display: block;
    color: $dark-yellow;
    font-size: 1.6rem;
    padding: 1.3rem;
    padding-right: 2rem;
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
