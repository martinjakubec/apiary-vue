<template>
  <div>
    <h1>{{ $t('locale.pageTitles.todos') }}</h1>
    <div v-if="hasHives" class="todo-wrapper row">

      <div
        v-for="hive of hives"
        :key="hive.hiveNumber"
        class="single-todo-wrapper col-3"
      >
        <h3>Hive n°{{ hive.hiveNumber }}</h3>
        <div v-for="control of hive.controls" :key="control.controlCustomId">
          
          <p v-for="todo of control.workToDo" :key="todo.text" :class="{'done': todo.isDone}">
            {{todo.text}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Todos',
  data() {
    return {
      hives: [],
    };
  },
  computed: {
    hasHives() {
      if (this.hives.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  emits: ['error-emitted'],
  async created() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const getTodosUrl = process.env.VUE_APP_API_URL + '/todos';
        const getTodosRequest = await fetch(getTodosUrl, {
          method: 'GET',
          headers: {
            Accepts: 'application/json',
            Authorization: token,
          },
        });
        const getTodosResponse = await getTodosRequest.json();
        if (getTodosResponse.status === 'ok') {
          this.hives = getTodosResponse.data.hives;
          console.log(this.hives);
        } else {
          this.$emit('error-emitted', getTodosResponse.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style lang="scss">
h3 {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.done {
  text-decoration: line-through;
}
</style>
