<template>
  <div>
    <single-hive-head
      :hiveData="hiveData"
      @update-hive="fetchHiveData"
      class="hive-head"
    ></single-hive-head>
    <controls-list
      :controls="hiveData.controls"
      @update-hive="fetchHiveData"
    ></controls-list>
    <base-button :buttonType="'danger'" @click="deleteHive"
      >{{ $t('locale.pages.SingleHive.deleteHive') }}</base-button
    >
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue';
import ControlsList from '../components/singleHiveComponents/ControlsList.vue';
import SingleHiveHead from '../components/singleHiveComponents/SingleHiveHead.vue';
// @ is an alias to /src

export default {
  components: {SingleHiveHead, BaseButton, ControlsList},
  name: 'SingleHive',
  emits: ['error-emitted'],
  data() {
    return {
      hiveData: {
        controls: [],
      },
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
          const sortedControlsByDate = Array.from(this.hiveData.controls).sort(
            (control, control2) =>
              new Date(control.dateOfControl) - new Date(control2.dateOfControl)
          );
          this.hiveData.controls = sortedControlsByDate;
        } else {
          this.$emit('error-emitted', fetchHiveResponse.error);
          this.$router.push('/hives');
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteHive() {
      const verificationNumber = prompt(
        this.$t('locale.pages.SingleHive.deleteHivePrompt')
      );
      if (verificationNumber === null) {
        return;
      } else if (parseInt(verificationNumber) === this.hiveData.hiveNumber) {
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

<style lang="scss" scoped>
h1 {
  margin-bottom: 20px !important;
}

.hive-head {
  margin-bottom: 3.5rem;
}
</style>
