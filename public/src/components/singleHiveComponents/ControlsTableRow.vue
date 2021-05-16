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
      <span v-for="workToDo of $props.control.workToDo" :key="workToDo.text" :class="{'done': workToDo.isDone}">
        - {{ workToDo.text }}
        <br />
      </span>
    </td>
    <td>
      <base-button @click="openModal" buttonType="ghost" buttonSize="small"
        >Edit</base-button
      >
    </td>
    <td>
      <base-button
        @click="handleDeleteControl"
        buttonType="danger"
        buttonSize="small"
        >Delete</base-button
      >
    </td>
  </tr>
  <base-modal v-if="isModalVisible" @close-modal="closeModal">
    <base-form @submit.prevent="handleEditControl">
      <input-date
        :id="'dateOfControl'"
        :label="'Date of control'"
        :name="'dateOfControl'"
        :defaultValue="
          $props.control.dateOfControl
            ? $props.control.dateOfControl.slice(0, 10)
            : ''
        "
      />
      <input-number
        name="numberOfFrames"
        id="numberOfFrames"
        label="Number of frames"
        :min="1"
        :defaultValue="String($props.control.numberOfFrames)"
      />
      <input-number
        name="numberOfFullFrames"
        id="numberOfFullFrames"
        label="Number of full frames"
        :min="1"
        :defaultValue="String($props.control.numberOfFullFrames)"
      />
      <input-number
        name="numberOfFramesWithSealedBrood"
        id="numberOfFramesWithSealedBrood"
        label="NOF with sealed brood"
        :min="1"
        :defaultValue="String($props.control.numberOfFramesWithSealedBrood)"
      />
      <input-radio-wrapper label="Unsealed brood">
        <input-radio
          id="unsealedBroodTrue"
          name="unsealedBrood"
          label="True"
          :value="true"
          :checked="$props.control.unsealedBrood ? true : false"
        />
        <input-radio
          id="unsealedBroodFalse"
          name="unsealedBrood"
          label="False"
          :value="false"
          :checked="!$props.control.unsealedBrood ? true : false"
        />
      </input-radio-wrapper>
      <input-radio-wrapper label="Queen spotted">
        <input-radio
          id="queenSpottedTrue"
          name="queenSpotted"
          label="True"
          :value="true"
          :checked="$props.control.queenSpotted ? true : false"
        />
        <input-radio
          id="queenSpottedFalse"
          name="queenSpotted"
          label="False"
          :value="false"
          :checked="!$props.control.queenSpotted ? true : false"
        />
      </input-radio-wrapper>
      <input-radio-wrapper label="Fresh eggs">
        <input-radio
          id="freshEggsTrue"
          name="freshEggs"
          label="True"
          :value="true"
          :checked="$props.control.freshEggs ? true : false"
        />
        <input-radio
          id="freshEggsFalse"
          name="freshEggs"
          label="False"
          :value="false"
          :checked="!$props.control.freshEggs ? true : false"
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
        :defaultValue="$props.control.weather"
      />
      <input-number
        name="temperature"
        label="Temperature"
        id="temperature"
        :min="-100"
        :max="100"
        :defaultValue="String($props.control.temperature)"
      />
      <input-number
        name="hostility"
        id="hostility"
        :min="0"
        :max="10"
        label="Hostility"
        :defaultValue="String($props.control.hostility)"
      />
      <controls-todo :defaultValue="$props.control.workDone" ref="workDone"
        >Work done</controls-todo
      >
      <controls-todo :defaultValue="workToDoArr" ref="workToDo"
        >Work to do</controls-todo
      >
      <base-button>Apply changes</base-button>
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
  computed: {
    workToDoArr() {
      const arr = [];
      this.$props.control.workToDo.forEach((todo) => arr.push(todo.text));
      return arr;
    },
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
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const controlId = this.$props.control.controlCustomId;
          const deleteControlApiUrl =
            process.env.VUE_APP_API_URL +
            this.$route.fullPath +
            '/deletecontrol';
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
      }
    },
    // async handleEditControl() {
    //   console.log('coucou');
    // },
    async handleEditControl(e) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const controlId = this.$props.control.controlCustomId;
          const deleteControlApiUrl =
            process.env.VUE_APP_API_URL + this.$route.fullPath + '/editcontrol';

          const dateOfControl = new Date(e.target.dateOfControl.value);
          const numberOfFrames = parseInt(e.target.numberOfFrames.value);
          const numberOfFullFrames = parseInt(e.target.numberOfFullFrames.value);
          const numberOfFramesWithSealedBrood = parseInt(
            e.target.numberOfFramesWithSealedBrood.value
          );
          const unsealedBrood =
            e.target.unsealedBrood.value == 'true' ? true : false;
          const queenSpotted =
            e.target.queenSpotted.value == 'true' ? true : false;
          const freshEggs = e.target.freshEggs.value == 'true' ? true : false;
          const weather = e.target.weather.value;
          const temperature = parseInt(e.target.temperature.value);
          const hostility = parseInt(e.target.hostility.value);
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
            controlCustomId: controlId,
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

          const editControlRequest = await fetch(deleteControlApiUrl, {
            method: 'POST',
            headers: {
              Authorization: token,
              Accepts: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody),
          });

          const editControlResponse = await editControlRequest.json();

          if (editControlResponse.status == 'ok') {
            this.$emit('update-hive');
            this.closeModal();
          } else {
            this.$emit('error-emitted', editControlResponse.error);
          }
        } catch (err) {
          console.log(err);
        }
      }
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

span {
  &.done {
    text-decoration: line-through;
  }
}
</style>
