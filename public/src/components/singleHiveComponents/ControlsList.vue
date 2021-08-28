<template>
  <div>
    <h3>{{ $t('locale.controls.controlsTitle') }}</h3>
    <base-button :buttonType="'ghost'" @click="openModal"
      >{{ $t('locale.controls.addControl') }}</base-button
    >
    <controls-table
      v-if="hasControls"
      :controls="$props.controls"
      @update-hive="$emit('update-hive')"
      @error-emitted="$emit('error-emitted')"
    />
    <base-modal v-if="isModalVisible" @close-modal="closeModal">
      <base-form @submit.prevent="handleAddControl">
        <input-date
          :id="'dateOfControl'"
          :label="$t('locale.controls.dateOfControl')"
          :name="'dateOfControl'"
        />
        <input-number
          name="numberOfFrames"
          id="numberOfFrames"
          :label="$t('locale.controls.numberOfFrames')"
          :min="1"
        />
        <input-number
          name="numberOfFullFrames"
          id="numberOfFullFrames"
          :label="$t('locale.controls.numberOfFullFrames')"
          :min="1"
        />
        <input-number
          name="numberOfFramesWithSealedBrood"
          id="numberOfFramesWithSealedBrood"
          :label="$t('locale.controls.numberOfFramesWithSealedBrood')"
          :min="1"
        />
        <input-radio-wrapper :label="$t('locale.controls.unsealedBrood.label')">
          <input-radio
            id="unsealedBroodTrue"
            name="unsealedBrood"
            :label="$t('locale.controls.unsealedBrood.true')"
            :value="true"
          />
          <input-radio
            id="unsealedBroodFalse"
            name="unsealedBrood"
            :label="$t('locale.controls.unsealedBrood.false')"
            :value="false"
          />
        </input-radio-wrapper>
        <input-radio-wrapper :label="$t('locale.controls.queenSpotted.label')">
          <input-radio
            id="queenSpottedTrue"
            name="queenSpotted"
            :label="$t('locale.controls.queenSpotted.true')"
            :value="true"
          />
          <input-radio
            id="queenSpottedFalse"
            name="queenSpotted"
            :label="$t('locale.controls.queenSpotted.false')"
            :value="false"
          />
        </input-radio-wrapper>
        <input-radio-wrapper :label="$t('locale.controls.freshEggs.label')">
          <input-radio
            id="freshEggsTrue"
            name="freshEggs"
            :label="$t('locale.controls.freshEggs.true')"
            :value="true"
          />
          <input-radio
            id="freshEggsFalse"
            name="freshEggs"
            :label="$t('locale.controls.freshEggs.false')"
            :value="false"
          />
        </input-radio-wrapper>
        <input-select
          :options="[
            {name: $t('locale.controls.weather.sunny'), value: 'sunny'},
            {name: $t('locale.controls.weather.partiallyCloudy'), value: 'partiallyCloudy'},
            {name: $t('locale.controls.weather.overcast'), value: 'overcast'},
            {name: $t('locale.controls.weather.rain'), value: 'rain'},
            {name: $t('locale.controls.weather.drizzle'), value: 'drizzle'},
            {name: $t('locale.controls.weather.snow'), value: 'snow'},
            {name: $t('locale.controls.weather.beforeStorm'), value: 'beforeStorm'},
            {name: $t('locale.controls.weather.stormy'), value: 'stormy'},
          ]"
          name="weather"
          id="weather"
          :label="$t('locale.controls.weather.label')"
        />
        <input-number
          name="temperature"
          :label="$t('locale.controls.temperature')"
          id="temperature"
          :min="-100"
          :max="100"
        />
        <input-number
          name="hostility"
          id="hostility"
          :min="0"
          :max="10"
          :label="$t('locale.controls.hostility')"
        />
        <controls-todo ref="workDone">{{$t('locale.controls.workDone')}}</controls-todo>
        <controls-todo ref="workToDo">{{$t('locale.controls.workToDo')}}</controls-todo>
        <base-button>{{$t('locale.controls.addControl')}}</base-button>
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
import ControlsTable from './ControlsTable.vue';
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
    ControlsTable,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  computed: {
    hasControls() {
      if (this.$props.controls.length > 0) {
        return true;
      } else {
        return false;
      }
    },
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
      const dateOfControl = new Date(form.dateOfControl.value);
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
