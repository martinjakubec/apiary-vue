<template>
  <div>
    <h1>{{ $t('locale.pageTitles.hives') }}</h1>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="!hasHives">
      You don't seem to have any hives, feel free to add your first one!
    </p>
    <base-button
      :buttonSize="'normal'"
      :buttonType="'ghost'"
      @button-clicked="openModal"
      >Add hive</base-button
    >

    <base-flex v-if="hasHives">
      <base-card v-for="hive of hives" :key="hive.hiveNumber">
        <h3 class="card-title">Hive n°{{ hive.hiveNumber }}</h3>
        <div
          class="hive-color"
          :style="{'background-color': hive.hiveColor}"
        ></div>
        <p class="hive-description">{{ hive.hiveDescription }}</p>
        <router-link
          :to="{name: 'Hive', params: {id: hive.hiveNumber}}"
          class="see-more-link"
        >
          <base-button :buttonSize="'normal'" :buttonType="'ghost'" >See more</base-button>
        </router-link>
      </base-card>
    </base-flex>

    <base-modal
      v-if="isModalVisible"
      @close-modal="isModalVisible = false"
    >
      <base-form :isFullWidth="true" @submit.prevent="handleAddHive">
        <input-number
          :id="'hiveNumber'"
          :name="'hiveNumber'"
          :label="'Hive number'"
          :min="0"
          :isRequired="true"
        />
        <input-text
          :id="'hiveDescription'"
          :name="'hiveDescription'"
          :label="'Hive description'"
          :maxLength="100"
        />
        <input-number
          :id="'totalNumberOfFrames'"
          :name="'totalNumberOfFrames'"
          :label="'Total number of frames'"
          :isRequired="true"
        />
        <input-color
          :id="'hiveColor'"
          :name="'hiveColor'"
          :label="'Hive color'"
          ref="hiveColor"
        />
        <input-text
          :id="'queenBreed'"
          :name="'queenBreed'"
          :label="'Queen breed'"
          :maxLength="100"
        />
        <input-number
          :id="'queenNumber'"
          :name="'queenNumber'"
          :label="'Queen number'"
          :min="1"
          :max="100"
        />
        <input-select
          :id="'queenColor'"
          :name="'queenColor'"
          :label="'Queen color'"
          :options="[
            {value: 'white', name: 'White'},
            {value: 'yellow', name: 'Yellow'},
            {value: 'red', name: 'Red'},
            {value: 'green', name: 'Green'},
            {value: 'blue', name: 'Blue'},
            {value: 'N/A', name: 'Not marked', isDefault: true},
          ]"
        />
        <input-date
          :id="'dateAdded'"
          :name="'dateAdded'"
          :label="'Date added'"
          :isRequired="true"
        />
        <input-number
          :id="'honeySuper'"
          :name="'honeySuper'"
          :label="'Number of honey supers'"
          :min="0"
          :max="7"
        />
        <base-button>Submit</base-button>
      </base-form>
    </base-modal>
  </div>
</template>

<script>
import BaseButton from '../components/base/BaseButton.vue';
import BaseCard from '../components/base/BaseCard.vue';
import BaseForm from '../components/base/BaseForm.vue';
import BaseModal from '../components/base/BaseModal.vue';
import BaseFlex from '../components/base/BaseFlex.vue';
import InputColor from '../components/base/inputs/InputColor.vue';
import InputDate from '../components/base/inputs/InputDate.vue';
import InputNumber from '../components/base/inputs/InputNumber.vue';
import InputSelect from '../components/base/inputs/InputSelect.vue';
import InputText from '../components/base/inputs/InputText.vue';
// @ is an alias to /src

export default {
  components: {
    BaseButton,
    BaseModal,
    BaseForm,
    InputNumber,
    InputText,
    InputColor,
    InputDate,
    InputSelect,
    BaseFlex,
    BaseCard,
  },
  name: 'Hives',
  data() {
    return {
      hives: [],
      isModalVisible: false,
      isLoading: true,
    };
  },
  computed: {
    hasHives() {
      if (this.hives.length == 0) {
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
    async fetchHives() {
      try {
        const token = localStorage.getItem('token');
        const hivesRequest = await fetch(
          process.env.VUE_APP_API_URL + '/hives',
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
              Accepts: 'application/json',
            },
          }
        );
        const hivesResponse = await hivesRequest.json();
        if (hivesResponse.status === 'ok') {
          const sortedHives = hivesResponse.data.hives.sort((a, b) => a.hiveNumber - b.hiveNumber)
          this.hives = sortedHives;
          this.isLoading = false;
          // console.log(this.hives);
        } else {
          this.$emit('error-emitted', hivesResponse.error);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async handleAddHive(e) {
      const hiveNumber = parseInt(e.target.hiveNumber.value);
      const hiveDescription = e.target.hiveDescription.value;
      const totalNumberOfFrames = parseInt(e.target.totalNumberOfFrames.value);
      const hiveColor = this.$refs.hiveColor.getValue();
      const queenBreed = e.target.queenBreed.value;
      const queenNumber = parseInt(e.target.queenNumber.value);
      const queenColor = e.target.queenColor.value;
      const dateAdded = e.target.dateAdded.value
        ? new Date(e.target.dateAdded.value)
        : '';

      console.log(e.target.dateAdded.value);

      const requestBody = {
        hiveNumber,
        hiveDescription,
        totalNumberOfFrames,
        hiveColor,
        queenBreed,
        queenNumber,
        queenColor,
        dateAdded,
      };

      const token = localStorage.getItem('token');
      try {
        const addHiveRequest = await fetch(
          process.env.VUE_APP_API_URL + '/addhive',
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
        if (addHiveResponse.status === 'ok') {
          this.fetchHives();
        } else {
          // console.log(addHiveResponse.error);
          this.$emit('error-emitted', addHiveResponse.error);
        }
      } catch (err) {
        console.log(err);
      }
      this.isModalVisible = false;
    },
  },
  async created() {
    if (this.isUserLoggedIn) {
      this.fetchHives();
    } else {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss" scoped>
.hive-color {
  height: 5px;
  width: 100%;
  margin-bottom: 2rem;
}

.card-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: bold;
}

.hive-description {
  font-style: italic;
}

.see-more-link {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
</style>
