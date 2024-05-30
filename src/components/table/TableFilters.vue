<template>
  <form @submit.prevent>
    <fieldset :class="style.inputContainer">
      <legend :class="style.legend">{{ t('FILTERS.NAME') }}</legend>
      <input
        v-model.trim="filters.beer_name"
        :class="style.input"
        :placeholder="t('FILTERS.NAME')"
        test-id="nameInput"
        type="text"
      />
    </fieldset>

    <fieldset :class="style.inputContainer">
      <legend :class="style.legend">{{ t('FILTERS.MATCHING_TO') }}</legend>
      <input
        v-model.trim="filters.food"
        :class="style.input"
        :placeholder="t('FILTERS.MATCHING_TO')"
        type="text"
      />
    </fieldset>

    <fieldset :class="style.inputContainer">
      <legend :class="style.legend">{{ t('FILTERS.ABV') }}</legend>
      <div :class="style.inputRange">
        <label :class="[style.label, style.inputRangeLabel]">
          {{ t('FILTERS.FROM') }}
        </label>
        <input
          v-model.number="filters.abv_gt"
          :class="style.input"
          :placeholder="t('FILTERS.FROM')"
          min="0"
          step="0.1"
          type="number"
        />
      </div>
      <div :class="style.inputRange">
        <label :class="[style.label, style.inputRangeLabel]">
          {{ t('FILTERS.TO') }}
        </label>
        <input
          v-model.number="filters.abv_lt"
          :class="style.input"
          :placeholder="t('FILTERS.TO')"
          min="0"
          step="0.1"
          type="number"
        />
      </div>
    </fieldset>

    <fieldset :class="style.inputContainer">
      <legend :class="style.legend">{{ t('FILTERS.IBU') }}</legend>
      <div :class="style.inputRange">
        <label :class="[style.label, style.inputRangeLabel]">
          {{ t('FILTERS.FROM') }}
        </label>
        <input
          v-model.number="filters.ibu_gt"
          :class="style.input"
          :placeholder="t('FILTERS.FROM')"
          min="0"
          step="0.5"
          type="number"
        />
      </div>
      <div :class="style.inputRange">
        <label :class="[style.label, style.inputRangeLabel]">
          {{ t('FILTERS.TO') }}
        </label>
        <input
          v-model.number="filters.ibu_lt"
          :class="style.input"
          :placeholder="t('FILTERS.TO')"
          min="0"
          step="0.5"
          type="number"
        />
      </div>
    </fieldset>

    <fieldset :class="style.inputContainer">
      <legend :class="style.legend">{{ t('FILTERS.EBC') }}</legend>
      <div :class="style.inputRange">
        <label :class="[style.label, style.inputRangeLabel]">
          {{ t('FILTERS.FROM') }}
        </label>
        <input
          v-model.number="filters.ebc_gt"
          :class="style.input"
          :placeholder="t('FILTERS.FROM')"
          min="0"
          type="number"
        />
      </div>
      <div :class="style.inputRange">
        <label :class="[style.label, style.inputRangeLabel]">
          {{ t('FILTERS.TO') }}
        </label>
        <input
          v-model.number="filters.ebc_lt"
          :class="style.input"
          :placeholder="t('FILTERS.TO')"
          min="0"
          type="number"
        />
      </div>
    </fieldset>

    <div :class="style.buttonContainer">
      <BeerAppButton
        :disabled="isFilterButtonDisabled"
        @click="debouncedFilter"
      >
        {{ t('FILTERS.FILTER') }}
      </BeerAppButton>

      <BeerAppButton
        :color="ButtonColor.DANGER"
        :disabled="isClearButtonDisabled"
        @click="debouncedClear"
      >
        {{ t('FILTERS.CLEAR') }}
      </BeerAppButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { debounce } from 'lodash';

import { useBeerStore } from '../../stores';
import { ButtonColor } from '../../typings';
import type { Filters } from '../../typings';
import {
  replaceDashWithWhiteSpace,
  replaceWhiteSpacesWithDash,
} from '../../utils';

import { BeerAppButton } from '..';

const emit = defineEmits<{
  (event: 'clear'): void;
  (event: 'filter'): void;
}>();

const { appliedFilters, areFiltersApply } = storeToRefs(useBeerStore());
const { t } = useI18n();

const filters = ref<Filters>({
  ...appliedFilters.value,
  ...(appliedFilters.value.beer_name
    ? { beer_name: replaceDashWithWhiteSpace(appliedFilters.value.beer_name) }
    : {}),
  ...(appliedFilters.value.food
    ? { food: replaceDashWithWhiteSpace(appliedFilters.value.food) }
    : {}),
});

const isFilterButtonDisabled = computed<boolean>(() => {
  const values = Object.values(filters.value);
  return !values.length || values.every((value) => value === '');
});

const isClearButtonDisabled = computed<boolean>(() => {
  const values = Object.values(filters.value);
  return (
    !areFiltersApply.value &&
    (!values.length || values.every((value) => value === ''))
  );
});

const clear = () => {
  filters.value = {};
  appliedFilters.value = {};

  if (!areFiltersApply.value) {
    return;
  }

  emit('clear');
};

const debouncedClear = debounce(clear, 300);

const filter = () => {
  appliedFilters.value = {
    ...filters.value,
    ...(filters.value.beer_name
      ? { beer_name: replaceWhiteSpacesWithDash(filters.value.beer_name) }
      : {}),
    ...(filters.value.food
      ? { food: replaceWhiteSpacesWithDash(filters.value.food) }
      : {}),
  };

  areFiltersApply.value = true;

  emit('filter');
};

const debouncedFilter = debounce(filter, 300);
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/mixins.scss';
@use '@/styles/spacings.scss';

.inputContainer {
  display: flex;
  justify-content: space-around;
  gap: 4 * spacings.$spacing-unit;
  width: 600px;
  height: 60px;
  margin-bottom: 4 * spacings.$spacing-unit;
  padding: 0 4 * spacings.$spacing-unit;

  border: spacings.$border-width solid colors.$yellow-dark;
  border-radius: spacings.$spacing-unit;

  &:last-of-type {
    margin-bottom: 0;
  }

  @include mixins.tablet {
    flex-direction: column;
    gap: 2 * spacings.$spacing-unit;
    width: 100%;
    height: 80px;
    padding: spacings.$spacing-unit 2 * spacings.$spacing-unit 2 *
      spacings.$spacing-unit;
  }
}

.input {
  border: none;
  outline: none;
  width: 100%;
  padding: 0;
}

.legend {
  @include mixins.tablet {
    margin-bottom: spacings.$spacing-unit;
  }
}

.inputRange {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.inputRangeLabel {
  align-self: center;
}

.buttonContainer {
  display: flex;
  justify-content: space-between;
  margin: 8 * spacings.$spacing-unit 0;

  @include mixins.mobile {
    flex-direction: column;
    gap: 5 * spacings.$spacing-unit;
    margin-bottom: 3 * spacings.$spacing-unit;
  }
}
</style>
