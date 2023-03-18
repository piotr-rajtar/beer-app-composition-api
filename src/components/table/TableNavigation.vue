<template>
  <fieldset :class="style.container">
    <legend>Choose navigation type</legend>
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
        type="radio"
        @change="onNavigationTypeChange"
      />
      <label :for="navigationType.id">{{ navigationType.label }}</label>
    </span>
  </fieldset>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';

import { navigationTypes } from '../../const/table-const';
import { TableNavigator } from '../../typings/table-types';

interface NavigationTypeEmits {
  (event: 'navigation-type-change', tableNavigator: Ref<TableNavigator>): void,
}

const emit = defineEmits<NavigationTypeEmits>();

const activeTableNavigator = ref(TableNavigator.LOAD_MORE);

const onNavigationTypeChange = (): void => {
  emit('navigation-type-change', activeTableNavigator);
};
</script>

<style lang="scss" module="style">
@use '@/styles/spacings.scss';

.container {
  margin: 0 0 4 * spacings.$spacing-unit 0;
  padding: 0;
  border: 0;
}

.singleRadioContainer {
  margin-right: 2 * spacings.$spacing-unit;
}
</style>