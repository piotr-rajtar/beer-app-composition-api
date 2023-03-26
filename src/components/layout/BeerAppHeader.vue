<template>
  <header :class="style.headerContainer">
    <h1 :class="style.header">{{ t('HEADER.APP_TITLE') }}</h1>
    <LanguageSwitch @language-switch="onLanguageSwitch" />
  </header>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Language } from '../../typings/global.types';

import LanguageSwitch from '../UI/LanguageSwitch.vue';

const { locale, t } = useI18n();

const onLanguageSwitch = (activeLanguage: Ref<Language>): void => {
  locale.value = activeLanguage.value;
}
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/fonts.scss';
@use '@/styles/spacings.scss';

.headerContainer {
  margin: 0;
  padding: 2 * spacings.$spacing-unit;
  background: linear-gradient(colors.$yellow-light, colors.$yellow-dark);
  text-align: center;
}

.header {
  font-size: fonts.$font-size-xl;
}
</style>