<template>
  <div :class="style.container">
    <div :class="style.imageContainer">
      <img src="../../assets/empty-beer.svg" :alt="t('GENERAL.NO_DATA')" />
    </div>
    <p :class="style.text">{{ t('GENERAL.NO_DATA') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss" module="style">
@use '@/styles/fonts.scss';

.container {
  display: flex;
  align-items: center;
}

.imageContainer {
  display: flex;
  width: 200px;
}

.text {
  margin: 0;

  font-size: fonts.$font-size-xxl;
  font-weight: fonts.$font-bold;
}
</style>
