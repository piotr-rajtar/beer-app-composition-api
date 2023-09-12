<template>
  <header :class="style.headerContainer">
    <h1 :class="style.header">{{ t('HEADER.APP_TITLE') }}</h1>
    <LanguageSwitch
      :class="style.languageSwitch"
      @language-switch="onLanguageSwitch"
    />
  </header>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import type { Language } from '../../typings';

import LanguageSwitch from '../UI/LanguageSwitch.vue';

const { locale, t } = useI18n();

const onLanguageSwitch = (activeLanguage: Language): void => {
  locale.value = activeLanguage;
};
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/fonts.scss';
@use '@/styles/spacings.scss';

.headerContainer {
  background: linear-gradient(colors.$yellow-light-02, colors.$yellow-dark);

  display: grid;
  grid-template-columns: 1fr auto 1fr;

  padding: 3 * spacings.$spacing-unit 10 * spacings.$spacing-unit;
}

.header {
  grid-column: 2;
  place-self: center;

  font-size: fonts.$font-size-xxl;
}

.languageSwitch {
  place-self: center self-end;
}
</style>
