<template>
  <div>
    <h1>{{ $t('locale.pageTitles.todos') }}</h1>
    <div class="card-wrapper">
      <base-card v-for="hive of hives" :key="hive.hiveNumber" size="flexible">
        <h3>Hive n°{{ hive.hiveNumber }}</h3>
        <p>
          Last control:
          {{
            new Date(
              hive.controls[hive.controls.length - 1].dateOfControl
            ).toLocaleDateString()
          }}
        </p>
        <p>Last To Dos:</p>
        <p v-for="todo of hive.controls[hive.controls.length - 1].workToDo" :key="todo.text">{{todo.text}}</p>
        <router-link class="see-more-link" :to="`/hive/${hive.hiveNumber}`">
          <base-button buttonType="ghost">
            See more
          </base-button>
        </router-link>
      </base-card>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue';
import BaseCard from '../components/base/BaseCard.vue';
// @ is an alias to /src

export default {
  components: {
    BaseCard,
    BaseButton,
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
.see-more-link {
  
}
</style>
