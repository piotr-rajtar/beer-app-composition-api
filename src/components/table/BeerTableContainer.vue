<template>
  <BeerTable
    v-if="!isTabletScreen"
    :beers="beers"
    :sort-by="sortBy"
    test-id="beerTable"
    @sort="onSort($event)"
  />

  <MobileBeerTable v-else :beers="beers" test-id="mobileBeerTable" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';

import type { SimplifiedBeer, SortBy, SortOption } from '../../typings';

import { BeerTable, MobileBeerTable } from './';

const emit = defineEmits<{
  (event: 'sort', sortOption: SortOption): void;
}>();

defineProps<{
  beers: SimplifiedBeer[];
  sortBy: SortBy | null;
}>();

const tabletScreenMediaQuery: MediaQueryList =
  window.matchMedia('(max-width: 768px)');

const isTabletScreen: Ref<boolean> = ref(tabletScreenMediaQuery.matches);

const handleScreenSizeChange = (): void => {
  isTabletScreen.value = tabletScreenMediaQuery.matches;
};

tabletScreenMediaQuery.addEventListener('change', handleScreenSizeChange);

const onSort = (sortOption: SortOption): void => {
  emit('sort', sortOption);
};
</script>
