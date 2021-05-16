<template>
  <div>
    <p class="wrapper-title"><slot></slot></p>
    <div class="input-wrapper">
      <input
        type="text"
        @keydown.enter.prevent="addItem"
        placeholder="Add item"
        ref="addItemValue"
      />
      <span @click="addItemButton">Add</span>
      <div class="work-done-wrapper">
        <p v-for="item of workDone" :key="item">- {{ item }}</p>
        <p class="remove-last bold" @click.prevent="removeLast">
          Remove last item
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workDone: [],
    };
  },
  props: {
    defaultValue: {type: Array}
  },
  methods: {
    addItem(e) {
      const workDoneItem = e.target.value;
      if (workDoneItem) {
        this.workDone.push(workDoneItem);
        e.target.value = '';
      }
    },
    addItemButton() {
      const workDoneItem = this.$refs.addItemValue.value;
      if (workDoneItem) {
        this.workDone.push(workDoneItem);
        this.$refs.addItemValue.value = '';
      }
    },
    removeLast() {
      this.workDone.pop();
    },
    getValue() {
      return this.workDone;
    },
  },
  created() {
    if (this.$props.defaultValue) {
      this.workDone = this.$props.defaultValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-title {
  margin-left: 1.7rem;
  margin-bottom: -1rem;
  padding-left: 10px;
}

.input-wrapper {
  position: relative;
  margin: 1.7rem;

  input {
    display: inline-block;
    color: $dark-yellow;
    font-size: 1.6rem;
    padding: 1.3rem;
    background-color: $lighter-gray;
    border-radius: 10px;
    box-shadow: inset 0px 0px 0px 0px transparent;
    outline: none;
    min-width: 200px;
    margin-right: 13px;
    max-width: 300px;
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

p {
  padding-left: 10px;
  padding-top: 10px;
}

span {
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
  font-style: italic;

  &:hover {
    text-decoration: underline;
  }
}

.bold {
  font-weight: bold;
  cursor: pointer;
  font-style: italic;
  &:hover {
    text-decoration: underline;
  }
}
</style>
