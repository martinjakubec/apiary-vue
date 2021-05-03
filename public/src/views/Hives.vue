<template>
  <div>
    <h1>{{ $t('locale.pageTitles.hives') }}</h1>
    <p v-if="doesHaveHives">
      You don't seem to have any hives, feel free to add your first one!
    </p>
    <base-button
      :buttonSize="'normal'"
      :buttonType="'full'"
      @button-clicked="openModal"
      >Add hive</base-button
    >
    <base-modal
      v-if="isModalVisible"
      :stages="10"
      @close-modal="isModalVisible = false"
    >
      <base-form :isFullWidth="true" @submit.prevent="handleAddHive">
        <base-input
          :name="'hiveNumber'"
          :inputType="'number'"
          :placeholder="'Hive number'"
          :autocomplete="'off'"
        ></base-input>
        <base-input
          :name="'hiveDescription'"
          :inputType="'text'"
          :placeholder="'Short description'"
          :autocomplete="'off'"
        ></base-input>
        <base-input
          :name="'totalNumberOfFrames'"
          :inputType="'number'"
          :placeholder="'Total number of frames'"
          :autocomplete="'off'"
        ></base-input>
        <base-input
          :name="'queenColor'"
          :inputType="'select'"
          :placeholder="'Color of the queen'"
          :selectValues="[
            {
              value: 'white',
              description: 'White',
            },
            {
              value: 'yellow',
              description: 'Yellow',
            },
            {
              value: 'red',
              description: 'Red',
            },
            {
              value: 'green',
              description: 'Green',
            },
            {
              value: 'blue',
              description: 'Blue',
            }
          ]"
        ></base-input>
        <base-input
          :name="'hiveColor'"
          :inputType="'color'"
          :placeholder="'Hive color'"
          :autocomplete="'off'"
        ></base-input>
        <base-button :buttonType="'full'" :buttonSize="'normal'"
          >Submit</base-button
        >
      </base-form>
    </base-modal>
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue';
import BaseForm from '../components/base/BaseForm.vue';
import BaseInput from '../components/base/BaseInput.vue';
import BaseModal from '../components/base/BaseModal.vue';
// @ is an alias to /src

export default {
  components: {BaseButton, BaseModal, BaseInput, BaseForm},
  name: 'Hives',
  data() {
    return {
      hives: null,
      isModalVisible: false,
    };
  },
  computed: {
    doesHaveHives() {
      if (!this.hives || this.hives.length === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  props: {
    isUserLoggedIn: {
      type: Boolean,
    },
  },
  emits: ['error-emitted'],
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async handleAddHive(e) {
      console.log(e.target.hiveColor.value);
      this.isModalVisible = false;
    },
  },
  async created() {
    if (this.isUserLoggedIn) {
      try {
        const token = localStorage.getItem('token');
        const hivesRequest = await fetch('http://localhost:3000/api/hives', {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            Accepts: 'application/json',
          },
        });
        const hivesResponse = await hivesRequest.json();
        console.log(hivesResponse);
        if (hivesResponse.status === 'ok') {
          this.hives = hivesResponse.data;
        } else {
          this.$emit('error-emitted', hivesResponse.error);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss">
//
</style>
