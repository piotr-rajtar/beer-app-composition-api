<template>
  <nav :class="style.container">
    <BeerAppButton
      :disabled="isPrevButtonDisabled"
      :type="ButtonType.PAGINATION"
      @click="debouncedOnPrevClick"
    >
      <PaginationArrowIcon :type="PaginationArrowDirection.LEFT" />
    </BeerAppButton>

    <p :class="style.pageNumber">{{ pageNumber }}</p>

    <BeerAppButton
      :disabled="!isNextPageAvailable"
      :type="ButtonType.PAGINATION"
      @click="debouncedOnNextClick"
    >
      <PaginationArrowIcon :type="PaginationArrowDirection.RIGHT" />
    </BeerAppButton>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { debounce } from 'lodash';

import { useBeerStore } from '../../stores/beer.store';
import { ButtonType, PaginationArrowDirection } from '../../typings';

import { BeerAppButton, PaginationArrowIcon } from '../UI';

const emit = defineEmits<{
  (event: 'next-click'): void;
  (event: 'prev-click'): void;
}>();

const { isNextPageAvailable, pageNumber } = storeToRefs(useBeerStore());

const onNextClick = (): void => {
  if (!isNextPageAvailable.value) {
    return;
  }

  emit('next-click');
  window.scrollTo(0, 0);
};

const debouncedOnNextClick = debounce(onNextClick, 300);

const isPrevButtonDisabled = computed(() => pageNumber.value === 1);

const onPrevClick = (): void => {
  if (isPrevButtonDisabled.value) {
    return;
  }

  emit('prev-click');
  window.scrollTo(0, 0);
};

const debouncedOnPrevClick = debounce(onPrevClick, 300);
</script>

<style lang="scss" module="style">
@use '@/styles/fonts.scss';

.container {
  display: inline-flex;
  align-items: center;
  gap: 60px;
}

.pageNumber {
  margin: 0;

  font-weight: fonts.$font-bold;
  font-size: fonts.$font-size-xl;
}
</style>
