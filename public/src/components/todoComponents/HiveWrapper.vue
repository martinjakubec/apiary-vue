<template>
  <base-card
    :size="'flexible'"
    class="todo-card"
    v-if="$props.hive.controls.length"
  >
    <h3>Hive n°{{ $props.hive.hiveNumber }}</h3>
    <to-do-wrapper :dateOfControl="recentControl.dateOfControl">
      <to-do
        v-for="todo of recentControl.workToDo"
        :key="todo.todoCustomId"
        :text="todo.text"
        :isDone="todo.isDone"
        :id="todo.todoCustomId"
        :hiveNumber="$props.hive.hiveNumber"
      ></to-do>
      <base-button
        v-if="$props.hive.controls.length > 1"
        class="see-more-button"
        buttonType="ghost"
        buttonSize="normal"
        @click="openModal"
      >
        See more
      </base-button>
    </to-do-wrapper>
  </base-card>
  <base-modal
    v-if="isModalVisible"
    @close-modal="closeModal"
    :widthType="'flexible'"
  >
    <to-do-wrapper
      v-for="control of $props.hive.controls"
      :dateOfControl="control.dateOfControl"
      :key="control.controlCustomid"
    >
      <to-do
        v-for="todo of control.workToDo"
        :key="todo.todoCustomId"
        :text="todo.text"
        :isDone="todo.isDone"
        :id="todo.todoCustomId"
        :hiveNumber="$props.hive.hiveNumber"
      ></to-do>
    </to-do-wrapper>
  </base-modal>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
import BaseCard from '../base/BaseCard.vue';
import BaseModal from '../base/BaseModal.vue';
import ToDo from './ToDo.vue';
import ToDoWrapper from './ToDoWrapper.vue';
export default {
  name: 'Hive Wrapper',
  components: {
    ToDoWrapper,
    ToDo,
    BaseButton,
    BaseModal,
    BaseCard,
  },
  props: {
    hive: {type: Object},
  },
  data() {
    return {
      isModalVisible: false,
      dataForModal: {},
    };
  },
  computed: {
    recentControl() {
      const controls = this.$props.hive.controls;
      return controls[controls.length - 1];
    },
  },
  emits: ['update-todos'],
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.$emit('update-todos');
      this.isModalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.hive-wrapper {
  margin-bottom: 2rem;
}

.todo-card {
  padding-bottom: 8rem;
}

.see-more-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
</style>
