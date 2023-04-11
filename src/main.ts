import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import './assets/normalize.css';
import { Language } from './typings/global.types';
import en from './translations/en.json';
import pl from './translations/pl.json';

import App from './App.vue';
import router from './router';

const i18n = createI18n({
  legacy: false,
  locale: Language.EN,
  fallbackLocale: Language.PL,
  messages: { en, pl },
});

library.add(faArrowUp);

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount('#app');
