<template>
  <fieldset :class="style.container">
    <legend :class="style.legend">
      {{ t('TABLE_NAVIGATION.LEGEND') }}
    </legend>
    <span 
      v-for="(navigationType, index) in navigationTypes" 
      :key="`navigation-item-${index}`" 
      :class="style.singleRadioContainer"
    >
      <input
        :id="navigationType.id"
        v-model="activeTableNavigator"
        :data-test-id="navigationType.id"
        :value="navigationType.value"
        :class="style.radioInput"
        type="radio"
        @change="onNavigationTypeChange"
      />
      <label :for="navigationType.id" :class="style.label">
        {{ t(navigationType.label) }}
      </label>
    </span>
  </fieldset>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { navigationTypes } from '../../const/table.const';
import { TableNavigator } from '../../typings/table.types';

interface NavigationTypeEmits {
  (event: 'navigation-type-change', tableNavigator: Ref<TableNavigator>): void,
}

const emit = defineEmits<NavigationTypeEmits>();

const { t } = useI18n();

const activeTableNavigator = ref(TableNavigator.LOAD_MORE);

const onNavigationTypeChange = (): void => {
  emit('navigation-type-change', activeTableNavigator);
};
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/fonts.scss';
@use '@/styles/spacings.scss';

.container {
  display: flex;
  justify-content: space-around;
  width: 600px;

  border: spacings.$border-width solid colors.$yellow-dark;
  border-radius: spacings.$spacing-unit;
}

.legend {
  font-size: fonts.$font-size-l;
}

.singleRadioContainer {
  display: grid;
  grid-template-columns: 1em auto;
  gap: 1em;

  &:focus-within {
    color: colors.$yellow-dark;
  }
}

.radioInput {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;

  width: 1.15em;
  height: 1.15em;
  border: spacings.$border-width solid colors.$yellow-dark;
  border-radius: 50%;
  transform: translateY(calc(spacings.$border-width / 2));

  display: grid;
  place-content: center;

  cursor: pointer;

  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em colors.$yellow-dark;
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus {
    outline: spacings.$border-width solid colors.$yellow-dark;
    outline-offset: spacings.$border-width;
  }
}

.label {
  font-size: fonts.$font-size-m;
  font-weight: fonts.$font-bold;

  cursor: pointer;
}
</style>