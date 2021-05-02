<template>
  <div v-if="$props.inputType === 'radio'" class="radio " :class="$props.isBigRadio ? 'radio-big' : ''">
    <input
      :type="inputType"
      :placeholder="placeholder"
      :autocomplete="autocompleteOff"
      :list="autocompleteOff"
      :id="id"
      :name="name"
      :value="value"
      :bigRadio="bigRadio"
    />
    <label :for="$props.id"><slot></slot></label>
  </div>

  <input
    v-else
    :type="inputType"
    :placeholder="placeholder"
    :autocomplete="autocompleteOff"
    :list="autocompleteOff"
    :id="id"
    :name="name"
    :value="value"
  />
</template>

<script>
export default {
  props: {
    inputType: {
      type: String,
      validator: function(value) {
        return (
          ['text', 'number', 'password', 'email', 'radio'].indexOf(value) !== -1
        );
      },
    },
    placeholder: String,
    autocomplete: String,
    name: String,
    id: String,
    value: String,
    isBigRadio: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    autocompleteOff() {
      if (this.$props.autocomplete === 'off') {
        return 'autocompleteOff';
      } else {
        return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input[type='text'],
input[type='password'],
input[type='email'],
input[type='number'] {
  color: $dark-yellow;
  font-size: 1.6rem;
  padding: 1.3rem;
  background-color: $lighter-gray;
  border-radius: 10px;
  border: 3px solid $lighter-gray;
  outline: none;
  width: 350px;
  margin-bottom: 3rem;
  box-sizing: border-box;
  height: 50px;

  &::placeholder {
    color: $dark-yellow;
  }

  &:focus {
    border: 3px solid $dark-yellow;
    background-color: $lighter-gray;
  }
}

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
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;
    height: 100%;
    width: 100%;

    &:checked {
      appearance: none;
      outline: none;
      padding: 0;
      content: none;
      background-color: $dark-yellow;

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
