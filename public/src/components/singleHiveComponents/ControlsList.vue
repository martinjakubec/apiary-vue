<template>
  <div>
    <h3>Controls</h3>
    <base-button :buttonType="'ghost'" @click="openModal"
      >Add control</base-button
    >
    <p v-for="control of $props.controls" :key="control.controlCustomid">
      coucou
    </p>
    <base-modal v-if="isModalVisible" @close-modal="closeModal">
      <base-form @submit.prevent="handleAddControl">
        <input-date
          :id="'dateOfControl'"
          :label="'Date of control'"
          :name="'dateOfControl'"
        />
        <input-number
          name="numberOfFrames"
          id="numberOfFrames"
          label="Number of frames"
          :min="1"
        />
        <input-number
          name="numberOfFullFrames"
          id="numberOfFullFrames"
          label="Number of full frames"
          :min="1"
        />
        <input-number
          name="numberOfFramesWithSealedBrood"
          id="numberOfFramesWithSealedBrood"
          label="NOF with sealed brood"
          :min="1"
        />
        <input-radio-wrapper label="Unsealed brood">
          <input-radio
            id="unsealedBroodTrue"
            name="unsealedBrood"
            label="True"
            :value="true"
          />
          <input-radio
            id="unsealedBroodFalse"
            name="unsealedBrood"
            label="False"
            :value="false"
          />
        </input-radio-wrapper>
        <input-radio-wrapper label="Queen spotted">
          <input-radio
            id="queenSpottedTrue"
            name="queenSpotted"
            label="True"
            :value="true"
          />
          <input-radio
            id="queenSpottedFalse"
            name="queenSpotted"
            label="False"
            :value="false"
          />
        </input-radio-wrapper>
        <input-radio-wrapper label="Fresh eggs">
          <input-radio
            id="freshEggsTrue"
            name="freshEggs"
            label="True"
            :value="true"
          />
          <input-radio
            id="freshEggsFalse"
            name="freshEggs"
            label="False"
            :value="false"
          />
        </input-radio-wrapper>
        <input-select
          :options="[
            {name: 'Sunny/Clear', value: 'sunny'},
            {name: 'parially cloudy', value: 'partiallyCloudy'},
            {name: 'Overcast', value: 'overcast'},
            {name: 'Rain', value: 'rain'},
            {name: 'Drizzle', value: 'drizzle'},
            {name: 'Snow', value: 'snow'},
            {name: 'Before storm', value: 'beforeStorm'},
            {name: 'Stormy', value: 'stormy'},
          ]"
          name="weather"
          id="weather"
          label="Weather"
        />
        <input-number
          name="temperature"
          label="Temperature"
          id="temperature"
          :min="-100"
          :max="100"
        />
        <input-number
          name="hostility"
          id="hostility"
          :min="0"
          :max="10"
          label="Hostility"
        />
        <controls-todo ref="workDone">Work done</controls-todo>
        <controls-todo ref="workToDo">Work to do</controls-todo>
        <base-button>Add control</base-button>
      </base-form>
    </base-modal>
  </div>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
import BaseForm from '../base/BaseForm.vue';
import BaseModal from '../base/BaseModal.vue';
import InputDate from '../base/inputs/InputDate.vue';
import InputNumber from '../base/inputs/InputNumber.vue';
import InputRadio from '../base/inputs/InputRadio.vue';
import InputRadioWrapper from '../base/inputs/InputRadioWrapper.vue';
import InputSelect from '../base/inputs/InputSelect.vue';
import ControlsTodo from './ControlsTodo.vue';
export default {
  components: {
    BaseModal,
    BaseButton,
    InputDate,
    BaseForm,
    InputNumber,
    InputRadio,
    InputRadioWrapper,
    InputSelect,
    ControlsTodo,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  props: {
    controls: {
      type: Array,
      required: true,
    },
  },
  emits: ['error-emitted', 'update-hive'],
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    openModal() {
      this.isModalVisible = true;
    },
    async handleAddControl(e) {
      const form = e.target;
      const dateOfControl = Date(form.dateOfControl.value);
      const numberOfFrames = Number(form.numberOfFrames.value);
      const numberOfFullFrames = Number(form.numberOfFullFrames.value);
      const numberOfFramesWithSealedBrood = Number(
        form.numberOfFramesWithSealedBrood.value
      );
      const unsealedBrood = form.unsealedBrood.value == 'true' ? true : false;
      const queenSpotted = form.queenSpotted.value == 'true' ? true : false;
      const freshEggs = form.freshEggs.value == 'true' ? true : false;
      const weather = form.weather.value;
      const temperature = Number(form.temperature.value);
      const hostility = Number(form.hostility.value);
      const originalWorkDone = this.$refs.workDone.getValue();
      const workDone = [];
      if (originalWorkDone.length > 0) {
        originalWorkDone.forEach((item) => {
          workDone.push(item);
        });
      }
      const originalWorkToDo = this.$refs.workToDo.getValue();
      const workToDo = [];
      if (originalWorkToDo.length > 0) {
        originalWorkToDo.forEach((item) => {
          workToDo.push({
            text: item,
            isDone: false,
          });
        });
      }

      const postBody = {
        dateOfControl,
        numberOfFrames,
        numberOfFullFrames,
        numberOfFramesWithSealedBrood,
        unsealedBrood,
        queenSpotted,
        freshEggs,
        weather,
        temperature,
        hostility,
        workDone,
        workToDo,
      };
      try {
        const constructedApiPath =
          process.env.VUE_APP_API_URL + this.$route.fullPath + '/addcontrol';
        const token = localStorage.getItem('token');
        const addControlRequest = await fetch(constructedApiPath, {
          method: 'POST',
          headers: {
            Accepts: 'application/json',
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        });
        const addControlResponse = await addControlRequest.json();
        if (addControlResponse.status === 'ok') {
          this.$emit('update-hive');
        } else {
          this.$emit('error-emitted', addControlResponse.error);
        }
        this.isModalVisible = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 3rem;
  font-weight: bold;
  font-style: italic;
  color: $dark-yellow;
  margin-bottom: 1.5rem;
}
</style>
