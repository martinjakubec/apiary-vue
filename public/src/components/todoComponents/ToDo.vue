<template>
  <p :class="{done: scopedIsDone}" class="single-todo">
    <span
      tabindex="0"
      @click="handleChangeToDo"
      @keydown.enter.space="handleChangeToDo"
      class="checkbox"
    ></span>
    {{ $props.text }}
  </p>
</template>

<script>
export default {
  name: 'ToDo',
  props: {
    text: {type: String, required: true},
    isDone: {type: Boolean, required: true},
    id: {type: String, required: true},
    hiveNumber: {type: Number, required: true},
  },
  watch: {
    isDone(newVal) {
      this.scopedIsDone = newVal;
    }
  },
  data() {
    return {
      scopedIsDone: this.$props.isDone,
    };
  },
  emits: ['error-emitted'],
  methods: {
    async handleChangeToDo() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const apiUrl =
            process.env.VUE_APP_API_URL +
            `/hive/${this.$props.hiveNumber}/updatetodo`;
          const body = {
            todoCustomId: this.$props.id,
            toDoValue: !this.scopedIsDone,
          };
          const updateToDoRequest = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
              Accepts: 'application/json',
            },
            body: JSON.stringify(body),
          });
          const updateToDoResponse = await updateToDoRequest.json();
          if (updateToDoResponse.status === 'ok') {
            this.scopedIsDone = !this.scopedIsDone;
          } else {
            this.$emit('error-emitted', updateToDoResponse.error);
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
.single-todo {
  padding-left: 1.5rem;
}

.checkbox {
  height: 1em;
  width: 1em;
  display: inline-block;
  position: relative;
  top: 2px;
  aspect-ratio: 1 / 1;
  border: 2px solid $dark-yellow;
  border-radius: 2px;
  cursor: pointer;

  &::before {
    content: '';
    display: none;
    height: 110%;
    width: 110%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url('../../assets/img/check-solid-gray.svg');
    background-color: $dark-yellow;
  }
}

.done {
  text-decoration: line-through;
  .checkbox {
    &::before {
      display: block;
    }
  }
}
</style>
