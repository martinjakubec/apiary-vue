<template>
  <div>
    <single-hive-head
      :hiveData="hiveData"
      @update-hives="fetchHiveData"
    ></single-hive-head>
    <!-- single-hive-controls -->
    <base-button :buttonType="'danger'" @click="deleteHive"
      >Delete hive</base-button
    >
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue';
import SingleHiveHead from '../components/singleHiveComponents/SingleHiveHead.vue';
// @ is an alias to /src

export default {
  components: {SingleHiveHead, BaseButton},
  name: 'SingleHive',
  emits: ['error-emitted'],
  data() {
    return {
      hiveData: {},
    };
  },
  methods: {
    async fetchHiveData() {
      try {
        const token = localStorage.getItem('token');
        const fetchHiveRequest = await fetch(
          process.env.VUE_APP_API_URL + `/hive/${this.$route.params.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: token,
              Accepts: 'application/json',
            },
          }
        );
        const fetchHiveResponse = await fetchHiveRequest.json();
        if (fetchHiveResponse.status === 'ok') {
          this.hiveData = fetchHiveResponse.data;
        } else {
          this.$emit('error-emitted', fetchHiveResponse.error);
          this.$router.push('/hives');
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteHive() {
      const verificationNumber = parseInt(
        prompt(
          'You are about to delete this hive permanently. Write the hive number to confirm this.'
        )
      );
      if (verificationNumber === this.hiveData.hiveNumber) {
        const token = localStorage.getItem('token');
        const requestBody = {
          hiveNumber: this.hiveData.hiveNumber,
        };
        try {
          const deleteHiveRequest = await fetch(
            process.env.VUE_APP_API_URL + '/deletehive',
            {
              method: 'POST',
              headers: {
                Accepts: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token,
              },
              body: JSON.stringify(requestBody),
            }
          );
          const deleteHiveResponse = await deleteHiveRequest.json();
          if (deleteHiveResponse.status === 'ok') {
            this.$router.push('/hives');
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$emit(
          'error-emitted',
          'Wrong number. If you wish to delete this hive, try again.'
        );
      }
    },
  },
  created() {
    this.fetchHiveData();
  },
};
</script>

<style lang="scss">
h1 {
  margin-bottom: 20px !important;
}

h2 {
  font-size: 2.5rem !important;
  margin-bottom: 20px !important;
  margin-left: 20px !important;
  font-style: italic !important;
}
.link-back {
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &::before {
    content: '';
    background: url('../assets/img/cil-arrow-circle-left.svg');
    display: inline-block;
    height: 1.6em;
    margin-right: 0.8em;
    aspect-ratio: 1 / 1;
    transition-property: transform;
    transition-duration: 0.2s;
  }

  &:hover {
    &::before {
      transform: translateX(-0.8em);
      transition-property: transform;
      transition-duration: 0.2s;
    }
  }
}

.description-label {
  font-weight: bold;
  color: $dark-yellow;
}
</style>
