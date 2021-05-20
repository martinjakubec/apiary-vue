<template>
  <div>
    <h1>{{ $t('locale.pageTitles.todos') }}</h1>
    <div class="card-wrapper">
    <hive-wrapper
      v-for="hive of hives"
      :key="hive.hiveNumber"
      :hive="hive"
      @update-todos="fetchTodos"
    />
    </div>
  </div>
</template>

<script>
import HiveWrapper from '../components/todoComponents/HiveWrapper.vue';
// @ is an alias to /src

export default {
  components: {
    HiveWrapper,
  },
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
  methods: {
    async fetchTodos() {
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
            const sortedHives = getTodosResponse.data.hives.sort(
              (hive1, hive2) => {
                return hive1.hiveNumber - hive2.hiveNumber;
              }
            );
            sortedHives.forEach((hive) => {
              hive.controls.sort((control1, control2) => {
                return (
                  new Date(control1.dateOfControl) -
                  new Date(control2.dateOfControl)
                );
              });
            });
            this.hives = sortedHives;
          } else {
            this.$emit('error-emitted', getTodosResponse.error);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  emits: ['error-emitted'],
  async created() {
    this.fetchTodos();
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
