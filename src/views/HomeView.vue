<template>
  <h2 :class="style.header">Beer catalogue browser</h2>
  <div :class="style.sectionContainer">
    <BeerAppButton @click="mainBeerButtonClickHandler">{{ beerButtonLabel }}</BeerAppButton>
  </div>
  <div v-if="store.areDataLoading" :class="style.sectionContainer">
    <BeerAppLoader />
  </div>
  <div v-else-if="areAnyBeersFetched" :class="style.sectionContainer">
    <TableNavigation @navigation-type-change="onNavigationTypeChange" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { debounce } from 'lodash';

import BeerAppButton from '../components/UI/BeerAppButton.vue';
import BeerAppLoader from '../components/UI/BeerAppLoader.vue';
import TableNavigation from '../components/table/TableNavigation.vue';

import { useBeerStore } from '../stores/beer-store';

import { SortDirection } from '../typings/global-types';
import type { SortBy, QueryParams } from '../typings/global-types';
import { TableNavigator } from '../typings/table-types';

const store = useBeerStore();

const pageNumber = ref(1);
const sortBy: Ref<SortBy | null> = ref(null);
const sortDirection: Ref<SortDirection> = ref(SortDirection.NONE);
const wasBeerButtonEverClicked = ref(false);

const beerButtonLabel = computed(() => {
  return wasBeerButtonEverClicked.value
    ? 'Reset to initial state'
    : 'Start browsing'
});

const queryParams: ComputedRef<QueryParams> = computed(() => ({
  page: pageNumber
}));


const setTableInitialState = (): void => {
  sortBy.value = null
  sortDirection.value = SortDirection.NONE
  pageNumber.value = 1
};

const onLoadInitialData = async (): Promise<void> => {
  await store.loadInitialBeersData(queryParams);
  wasBeerButtonEverClicked.value = true;
};

const debouncedOnLoadInitialData = debounce(onLoadInitialData, 300);

const onTableReset = async (): Promise<void> => {
  setTableInitialState();
  store.areAllDataFetched = false;
  await store.loadInitialBeersData(queryParams);
  wasBeerButtonEverClicked.value = false;
}

const debouncedOnTableReset = debounce(onTableReset, 300);

const mainBeerButtonClickHandler = computed(() => {
  return wasBeerButtonEverClicked.value
    ? debouncedOnTableReset
    : debouncedOnLoadInitialData
});

const areAnyBeersFetched = computed(() => !!store.simplifiedBeersData.length);

const activeTableNavigator = ref(TableNavigator.LOAD_MORE);

const onNavigationTypeChange = async (navigationType: Ref<TableNavigator>) => {
  activeTableNavigator.value = navigationType.value;
  setTableInitialState();
  await store.loadInitialBeersData(queryParams);
}
</script>

<style lang="scss" module="style">
@use '@/styles/spacings.scss';

.header {
  text-align: center;
  text-decoration: underline;
  margin-top: 10 * spacings.$spacing-unit;
}

.sectionContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10 * spacings.$spacing-unit;
}
</style>
