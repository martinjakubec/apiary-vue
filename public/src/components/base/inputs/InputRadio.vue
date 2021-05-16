<template>
  <div class="radio " :class="$props.isBigRadio ? 'radio-big' : ''">
    <input
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :bigRadio="bigRadio"
      :checked="isChecked"
    />
    <label :for="$props.id">{{ $props.label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    id: {type: String},
    name: {type: String},
    label: {type: String},
    value: {type: Boolean},
    bigRadio: {type: Boolean},
    checked: {type: Boolean}
  },
  computed: {
    isChecked() {
      return this.$props.checked === true ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped>
.radio {
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 5px;
  margin-right: 5px;
  display: inline-block;

  &.radio-big {
    width: 120px;
    height: 120px;

    label {
      font-size: 3rem;
      @include media-breakpoint-down(md) {
        font-size: 11rem;
      }
    }
  }

  input[type='radio'] {
    appearance: none;
    position: relative;
    border: 3px solid $dark-yellow;
    border-radius: 10px;
    content: none;
    outline: none;
    box-shadow: inset 0px 0px 0px 0px $dark-yellow;
    cursor: pointer;
    height: 100%;
    width: 100%;
    transition-duration: 0.2s;
    transition-property: background-color, box-shadow;

    &:focus,
    &:hover {
      box-shadow: inset 0px 0px 0px 2px $dark-yellow;
      transition-property: box-shadow;
      transition-duration: 0.2s;
    }

    &:checked {
      appearance: none;
      outline: none;
      padding: 0;
      content: none;
      background-color: $dark-yellow;
      transition-duration: 0.2s;
      transition-property: background-color;

      & + label {
        color: $dark-gray;
      }
    }

    & + label {
      font-weight: bold;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  }
}
</style>
