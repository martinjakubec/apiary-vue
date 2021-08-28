<template>
  <div class="edit-view">
    <form id="form1" @submit.prevent="handleEditHive" class="edit-view-form">
      <input-text
        :id="'overalState'"
        :name="'overalState'"
        :label="$t('locale.pages.SingleHive.overalState')"
        :defaultValue="hiveData.overalState"
        :maxLength="100"
      />
      <input-text
        :id="'hiveDescription'"
        :name="'hiveDescription'"
        :label="$t('locale.pages.SingleHive.hiveDescription')"
        :defaultValue="hiveData.hiveDescription"
        :maxLength="100"
      />
      <input-number
        :id="'totalNumberOfFrames'"
        :name="'totalNumberOfFrames'"
        :label="$t('locale.pages.SingleHive.totalNumberOfFrames')"
        :defaultValue="String(hiveData.totalNumberOfFrames)"
      />
      <input-color
        :id="'hiveColor'"
        :name="'hiveColor'"
        :label="$t('locale.pages.SingleHive.hiveColor')"
        :defaultValue="hiveData.hiveColor"
        ref="hiveColor"
      />
      <input-text
        :id="'queenBreed'"
        :name="'queenBreed'"
        :label="$t('locale.pages.SingleHive.queenBreed')"
        :defaultValue="hiveData.queenBreed"
        :maxLength="100"
      />
      <input-number
        :id="'queenNumber'"
        :name="'queenNumber'"
        :label="$t('locale.pages.SingleHive.queenNumber')"
        :min="1"
        :max="100"
      />
      <input-select
        :id="'queenColor'"
        :name="'queenColor'"
        :label="$t('locale.pages.SingleHive.queenColor.label')"
        :options="[
          {value: 'white', name: $t('locale.pages.SingleHive.queenColor.white')},
          {value: 'yellow', name: $t('locale.pages.SingleHive.queenColor.yellow')},
          {value: 'red', name: $t('locale.pages.SingleHive.queenColor.red')},
          {value: 'green', name: $t('locale.pages.SingleHive.queenColor.green')},
          {value: 'blue', name: $t('locale.pages.SingleHive.queenColor.blue')},
          {value: 'N/A', name: $t('locale.pages.SingleHive.queenColor.NA'), isDefault: true},
        ]"
        :defaultValue="hiveData.queenColor"
      />
      <input-date
        :id="'dateAdded'"
        :name="'dateAdded'"
        :label="$t('locale.pages.SingleHive.dateAdded')"
        :defaultValue="hiveData.dateAdded ? hiveData.dateAdded.slice(0, 10) : ''"
      />
      <input-number
        :id="'honeySuper'"
        :name="'honeySuper'"
        :label="$t('locale.pages.SingleHive.honeySuper')"
        :min="0"
        :max="7"
        :defaultValue="String(hiveData.honeySuper)"
      />
    </form>
    <div class="button-wrapper">
      <base-button
        :buttonType="'ghost'"
        @click="closeEdit"
        class="form-button"
        >{{$t('locale.pages.SingleHive.close')}}</base-button
      >
      <base-button type="submit" form="form1" class="form-button"
        >{{$t('locale.pages.SingleHive.saveChanges')}}</base-button
      >
    </div>
  </div>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
import InputColor from '../base/inputs/InputColor.vue';
import InputDate from '../base/inputs/InputDate.vue';
import InputNumber from '../base/inputs/InputNumber.vue';
import InputSelect from '../base/inputs/InputSelect.vue';
import InputText from '../base/inputs/InputText.vue';
export default {
  components: {
    BaseButton,
    InputText,
    InputNumber,
    InputColor,
    InputSelect,
    InputDate,
  },
  emits: ['close-edit', 'update-hives', 'error-emitted'],
  props: {
    hiveData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async handleEditHive(e) {
      const overalState = e.target.overalState.value;
      const hiveDescription = e.target.hiveDescription.value;
      const totalNumberOfFrames = parseInt(e.target.totalNumberOfFrames.value);
      const hiveColor = this.$refs.hiveColor.getValue();
      const queenBreed = e.target.queenBreed.value;
      const queenNumber = parseInt(e.target.queenNumber.value);
      const queenColor = e.target.queenColor.value;
      const dateAdded = e.target.dateAdded.value
        ? new Date(e.target.dateAdded.value)
        : '';
      const honeySuper = e.target.honeySuper.value;

      const requestBody = {
        overalState,
        hiveDescription,
        totalNumberOfFrames,
        hiveColor,
        queenBreed,
        queenNumber,
        queenColor,
        dateAdded,
        honeySuper,
      };

      // console.log(requestBody);
      const token = localStorage.getItem('token');
      try {
        const addHiveRequest = await fetch(
          process.env.VUE_APP_API_URL + '/hive/'+ this.$props.hiveData.hiveNumber +'/edit',
          {
            method: 'POST',
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
              Accepts: 'application/json',
            },
            body: JSON.stringify(requestBody),
          }
        );
        const addHiveResponse = await addHiveRequest.json();
        console.log(addHiveResponse);
        if (addHiveResponse.status === 'ok') {
          this.$emit('update-hives');
          this.$emit('close-edit');
        } else {
          // console.log(addHiveResponse.error);
          this.$emit('error-emitted', addHiveResponse.error);
        }
      } catch (err) {
        console.log(err);
      }
    },
    closeEdit() {
      this.$emit('close-edit');
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-view {
  &-form {
    max-height: 500px;
    max-width: 100%;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    margin-bottom: 2rem;
  }
}

.button-wrapper {
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem;

  .form-button {
    margin: 10px;
  }
}
</style>
