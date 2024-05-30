<template>
  <div :class="style.filtersContainer">
    <div :class="style.filtersHeaderContainer">
      <h2>{{ t('FILTERS.TITLE') }}</h2>
      <FilterArrowIcon :direction="arrowDirection" @click="onArrowClick" />
    </div>

    <template v-if="isInfoAlertVisible">
      <FilterInfoAlert @close="onInfoAlertClose" />
    </template>

    <div v-if="areFiltersOpen" :class="style.tableFilters">
      <TableFilters @clear="emit('clear')" @filter="emit('filter')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ArrowDirection } from '../../typings';

import { FilterArrowIcon, FilterInfoAlert, TableFilters } from '../';

const emit = defineEmits<{
  (event: 'clear'): void;
  (event: 'filter'): void;
}>();

const { t } = useI18n();

const areFiltersOpen = ref(false);

const arrowDirection = computed<ArrowDirection>(() => {
  return areFiltersOpen.value ? ArrowDirection.UP : ArrowDirection.DOWN;
});

const isInfoAlertOpen = ref(true);

const isInfoAlertVisible = computed<boolean>(() => {
  return isInfoAlertOpen.value && areFiltersOpen.value;
});

const onArrowClick = () => {
  areFiltersOpen.value = !areFiltersOpen.value;

  if (isInfoAlertOpen.value) {
    return;
  }

  isInfoAlertOpen.value = true;
};

const onInfoAlertClose = () => {
  isInfoAlertOpen.value = false;
};
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/mixins.scss';
@use '@/styles/spacings.scss';

.filtersContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8 * spacings.$spacing-unit;
}

.filtersHeaderContainer {
  position: relative;
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4 * spacings.$spacing-unit;

  &::after {
    position: absolute;
    background-color: colors.$yellow-dark;
    bottom: 0;
    width: 50%;
    height: spacings.$spacing-unit;
    content: '';

    @include mixins.tablet {
      width: 80%;
    }
  }
}

.tableFilters {
  @include mixins.tablet {
    width: 100%;
  }
}
</style>
