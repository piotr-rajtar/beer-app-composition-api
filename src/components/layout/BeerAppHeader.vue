<template>
  <header :class="style.headerContainer">
    <h1 :class="style.header">{{ t('GENERAL.APP_TITLE') }}</h1>
  </header>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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