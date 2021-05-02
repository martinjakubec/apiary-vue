import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n';

import messages from './locales/messages';

const i18n = createI18n({
  locale: 'English',
  fallbackLocale: 'English',
  messages: messages
})

createApp(App).use(router).use(i18n).mount('#app')
