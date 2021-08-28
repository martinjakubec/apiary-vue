<template>
  <base-overview :title="'To Do List'">
    <p>{{ $t('locale.pages.Home.totalNumberOfTodos', {numberOfTodos: numberOfTodos}) }}</p>
    <base-row v-if="hasHivesWithTodos">
    <h3 class="col-12">{{ $t('locale.pages.Home.hivesWithMostTodos') }}</h3>
      <p
        class="col-5"
        v-for="hiveNumber of hivesWithMaxTodos"
        :key="hiveNumber"
      >
        <router-link :to="`/hive/${hiveNumber}`">
          <base-button :buttonType="'ghost'"> {{ $t('locale.pages.Home.hiveWithNumber', {hiveNumber: hiveNumber}) }} </base-button>
        </router-link>
      </p>
    </base-row>
    <router-link :to="`/todos`">
      <base-button :buttonType="'ghost'">{{ $t('locale.pages.Home.allTodos') }}</base-button>
    </router-link>
  </base-overview>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
import BaseOverview from '../base/BaseOverview.vue';
import BaseRow from '../base/BaseRow.vue';
export default {
  components: {
    BaseOverview,
    BaseRow,
    BaseButton,
  },
  data() {
    return {
      numberOfTodos: undefined,
      hivesWithMaxTodos: [],
      hasHivesWithTodos: false,
    };
  },
  async created() {
    const token = localStorage.getItem('token');
    const todoRequest = await fetch(process.env.VUE_APP_API_URL + '/todos', {
      headers: {
        Authorization: token,
        Accepts: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const todoResponse = await todoRequest.json();
    // eslint-disable-next-line
    let numberOfTodos = 0;
    let maxTodosHives = [];
    let maxTodosNumber = 0;
    if (todoResponse.status === 'ok') {
      for (let hive of todoResponse.data.hives) {
        let currentHiveTodosNumber = 0;
        for (let control of hive.controls) {
          for (let todo of control.workToDo) {
            if (!todo.isDone) {
              numberOfTodos++;
              currentHiveTodosNumber++;
            }
          }
        }
        if (currentHiveTodosNumber >= maxTodosNumber) {
          maxTodosNumber = currentHiveTodosNumber;
          maxTodosHives.push(hive.hiveNumber);
        }
      }
    }
    this.numberOfTodos = numberOfTodos;
    if (maxTodosNumber !== 0) {
      this.hasHivesWithTodos = true;
    }
    this.hivesWithMaxTodos = maxTodosHives;
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-style: italic;
  &::after {
    content: '';
    display: block;
    width: 80%;
    height: 1px;
    position: relative;
    top: 2px;
    left: -2px;
    background-color: $dark-yellow;
  }
}
</style>
