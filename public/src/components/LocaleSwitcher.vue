<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
        >{{ locale }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  created() {
    const cachedLocale = localStorage.getItem('locale');
    if (cachedLocale) {
      this.$i18n.locale = cachedLocale;
    }
  },
  computed: {
    localeChosen() {
      return this.$i18n.locale;
    },
  },
  watch: {
    localeChosen(newLocale) {
      localStorage.setItem('locale', newLocale);
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  width: 120px;
  height: 50px;
  padding: 10px;
  font-size: 1.4rem;
  font-weight: bold;
  border: 3px solid $dark-yellow;
  background: $lighter-gray;
  outline: none;
  border-radius: 10px;
  text-align: center;
  color: $dark-yellow;
  margin-bottom: 20px;

  &:focus {
    background-color: $dark-gray;
  }
}
</style>
