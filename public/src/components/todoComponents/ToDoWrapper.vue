<template>
  <div class="todo-wrapper">
    <h3>
      {{ $t('locale.controls.todos.dateOfControl', {dateOfControl: localizedDate}) }}
    </h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    dateOfControl: {type: String},
  },
  computed: {
    localizedDate() {
      const newDate = new Date(this.$props.dateOfControl).toLocaleDateString();
      return newDate;
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.todo-wrapper {
  margin-bottom: 3.5rem;
}
</style>
