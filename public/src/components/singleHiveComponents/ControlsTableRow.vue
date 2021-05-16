<template>
  <tr>
    <td class="first-col mid-cell">
      {{ new Date($props.control.dateOfControl).toLocaleDateString() }}
    </td>
    <td>{{ $props.control.numberOfFrames }}</td>
    <td>{{ $props.control.numberOfFullFrames }}</td>
    <td>{{ $props.control.numberOfFramesWithSealedBrood }}</td>
    <td>{{ $props.control.unsealedBrood == true ? 'yes' : 'no' }}</td>
    <td>{{ $props.control.queenSpotted == true ? 'yes' : 'no' }}</td>
    <td>{{ $props.control.freshEggs == true ? 'yes' : 'no' }}</td>
    <td>{{ $props.control.weather }}</td>
    <td>{{ $props.control.temperature }}°C</td>
    <td>{{ $props.control.hostility }}</td>
    <td class="wide-cell">
      <span v-for="workDone of $props.control.workDone" :key="workDone">
        - {{ workDone }}
        <br />
      </span>
    </td>
    <td class="wide-cell">
      <span v-for="workToDo of $props.control.workToDo" :key="workToDo.text">
        - {{ workToDo.text }}
        <br />
      </span>
    </td>
    <td>
      <base-button @click="openModal" buttonType="ghost" buttonSize="small">Edit</base-button>
    </td>
    <td>
      <base-button @click="handleDeleteControl" buttonType="danger" buttonSize="small" >Delete</base-button>
    </td>
  </tr>
  <base-modal v-if="isModalVisible" @close-modal="closeModal">
    <base-form @submit.prevent="handleEditControl">
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
  props: {
    control: {type: Object},
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  emits: ['update-hive', 'error-emitted'],
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    openModal() {
      this.isModalVisible = true;
    },
    async handleDeleteControl() {
      try {
        const controlId = this.$props.control.controlCustomId;
        const token = localStorage.getItem('token');
        const deleteControlApiUrl =
          process.env.VUE_APP_API_URL + this.$route.fullPath + '/deleteControl';
        const deleteControlRequest = await fetch(deleteControlApiUrl, {
          method: 'POST',
          headers: {
            Authorization: token,
            Accepts: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            controlCustomId: controlId,
          }),
        });
        const deleteControlResponse = await deleteControlRequest.json();
        if (deleteControlResponse.status === 'ok') {
          this.$emit('update-hive');
        } else {
          this.$emit('error-emitted', deleteControlResponse.error);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async handleEditControl() {
      console.log('editting away');
    },
  },
};
</script>

<style lang="scss" scoped>
.mid-cell {
  min-width: 150px;
}
.wide-cell {
  min-width: 220px;
}
</style>
