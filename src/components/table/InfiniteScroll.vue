<template>
  <BeerAppButton @click="onButtonClick">
    {{ t('TABLE_NAVIGATION.INFINITE_SCROLL_BUTTON_LABEL') }}
  </BeerAppButton>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import type { ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { throttle } from 'lodash';

import { BEER_TABLE_CAPTION_ID, BEER_TABLE_ID } from '../../const/table.const';
import { useBeerStore } from '../../stores/beer.store';

import BeerAppButton from '../UI/BeerAppButton.vue';

const emit = defineEmits<{
  (event: 'load-more'): void;
  (event: 'make-initial-fetches', quantity: number): void;
}>();

const { t } = useI18n();

const { areDataLoading, isNextPageAvailable } = storeToRefs(useBeerStore());

const isFetchRequestNeeded = ref(false);

onMounted(() => {
  emit('make-initial-fetches', initialFetchQuantity.value);
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});

watch(isNextPageAvailable, () => {
  if (isNextPageAvailable.value) {
    return;
  }
  window.removeEventListener('scroll', onScroll);
});

const initialFetchQuantity: ComputedRef<number> = computed(() => {
  const beerTableDimensions = (
    document.getElementById(BEER_TABLE_ID) as HTMLElement
  ).getBoundingClientRect();
  const tableCaptionDimensions = (
    document.getElementById(BEER_TABLE_CAPTION_ID) as HTMLElement
  ).getBoundingClientRect();
  const tableHeight = beerTableDimensions.top - tableCaptionDimensions.height;

  return Math.floor(
    (window.innerHeight - tableHeight) / beerTableDimensions.height
  );
});

const checkIfFetchRequestNeeded = () => {
  const percentageOfDocumentHeight = 0.9;
  const documentHeightWhenFetchNeeded =
    document.body.offsetHeight * percentageOfDocumentHeight;
  isFetchRequestNeeded.value =
    window.innerHeight + window.scrollY >= documentHeightWhenFetchNeeded;
};

const onLoadMore = () => {
  if (!isNextPageAvailable.value) {
    return;
  }
  emit('load-more');
};

const throttledOnLoadMore = throttle(onLoadMore, 300);

const onScroll = () => {
  checkIfFetchRequestNeeded();
  if (isFetchRequestNeeded.value && !areDataLoading.value) {
    throttledOnLoadMore();
  }
};

const onButtonClick = () => {
  window.scrollTo(0, 0);
};
</script>
