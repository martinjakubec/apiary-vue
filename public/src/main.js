import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

import * as enLocale from './locales/en.json';
import * as skLocale from './locales/sk.json';


const messages = {
  'English': enLocale.default,
  'Slovak': skLocale.default
}

const i18n = createI18n({
  locale: 'English',
  fallbackLocale: 'English',
  messages
})

createApp(App).use(router).use(i18n).mount('#app')
