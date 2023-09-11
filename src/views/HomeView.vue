<template>
  <h2 :class="style.header">{{ t('GENERAL.APP_HEADER') }}</h2>

  <div :class="style.sectionContainer">
    <BeerAppButton @click="mainBeerButtonClickHandler">
      {{ beerButtonLabel }}
    </BeerAppButton>
  </div>

  <div v-if="isFetchErrorAlertVisible" :class="style.bottomMargin">
    <FetchErrorAlert @close="onFetchErrorAlertClose" />
  </div>

  <div v-if="areAnyBeersFetched" :class="style.sectionContainer">
    <div v-if="isSortWarningAlertVisible" :class="style.bottomMargin">
      <SortWarningAlert @close="onSortWarningAlertClose" />
    </div>

    <div :class="style.bottomMargin">
      <TableNavigation @navigation-type-change="onNavigationTypeChange" />
    </div>

    <BeerTable
      :beers="beerTableDataSource"
      :sort-by="sortBy"
      @sort="onSort($event)"
    />

    <LoadMore
      v-if="activeTableNavigator === TableNavigator.LOAD_MORE"
      @load-more="onLoadMore"
    />

    <InfiniteScroll
      v-if="activeTableNavigator === TableNavigator.INFINITE_SCROLL"
      @load-more="onLoadMore"
      @make-initial-fetches="makeInfiniteScrollInitialFetches"
    />

    <div
      v-if="activeTableNavigator === TableNavigator.PAGINATION"
      :class="style.itemsPerPageContainer"
    >
      <ItemsPerPageSelect @items-number-change="onItemsNumberChange" />
    </div>
    <TablePagination
      v-if="activeTableNavigator === TableNavigator.PAGINATION"
      @next-click="onNextClick"
      @prev-click="onPrevClick"
    />
  </div>

  <div v-if="areDataLoading" :class="style.sectionContainer">
    <BeerAppLoader />
  </div>

  <div v-if="isNoDataVisible" :class="style.sectionContainer">
    <NoData />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { debounce } from 'lodash';

import BeerAppButton from '../components/UI/BeerAppButton.vue';
import BeerAppLoader from '../components/UI/BeerAppLoader.vue';
import FetchErrorAlert from '../components/UI/FetchErrorAlert.vue';
import SortWarningAlert from '../components/UI/SortWarningAlert.vue';
import BeerTable from '../components/table/BeerTable.vue';
import InfiniteScroll from '../components/table/InfiniteScroll.vue';
import ItemsPerPageSelect from '../components/table/ItemsPerPageSelect.vue';
import LoadMore from '../components/table/LoadMore.vue';
import NoData from '../components/UI/NoData.vue';
import TableNavigation from '../components/table/TableNavigation.vue';
import TablePagination from '../components/table/TablePagination.vue';

import { useBeerStore } from '../stores/beer.store';

import type { Filters } from '../typings/global.types';
import { TableNavigator } from '../typings/table.types';
import type { SortOption } from '../typings/table.types';

import { getBeerTableDataSource } from '../utils';

const { t } = useI18n();

const {
  areAnyBeersFetched,
  areDataLoading,
  areAllDataFetched,
  itemsPerPage,
  isFetchError,
  pageNumber,
  sortBy,
  sortDirection,
} = storeToRefs(useBeerStore());
const {
  clearBeersState,
  loadInitialBeerData,
  loadMoreBeerData,
  setTableInitialState,
} = useBeerStore();

const activeTableNavigator: Ref<TableNavigator> = ref(TableNavigator.LOAD_MORE);
const filters: Ref<Filters> = ref({});

const beerTableDataSource = computed(() => {
  return getBeerTableDataSource(activeTableNavigator.value);
});

const wasBeerButtonEverClicked = ref(false);

const beerButtonLabel = computed(() => {
  return wasBeerButtonEverClicked.value
    ? t('GENERAL.RESET_TABLE_BUTTON_LABEL')
    : t('GENERAL.START_BROWSING_BUTTON_LABEL');
});

const onLoadInitialData = async (): Promise<void> => {
  try {
    await loadInitialBeerData();
    wasBeerButtonEverClicked.value = true;
  } catch (error) {
    console.error(error);
  }
};

const onItemsNumberChange = async (newItemsNumber: number) => {
  try {
    setTableInitialState();
    itemsPerPage.value = newItemsNumber;
    await loadInitialBeerData();
  } catch (error) {
    console.error(error);
  }
};

const onLoadMore = async (): Promise<void> => {
  pageNumber.value++;
  await loadMoreBeerData(filters.value);
};

const makeInfiniteScrollInitialFetches = async (
  quantity: number
): Promise<void> => {
  for (let counter = 0; counter < quantity; counter++) {
    await onLoadMore();
  }
};

const onNextClick = async (): Promise<void> => {
  pageNumber.value++;
  await loadMoreBeerData(filters.value);
};

const onPrevClick = async (): Promise<void> => {
  pageNumber.value--;
  await loadMoreBeerData(filters.value);
};

const debouncedOnLoadInitialData = debounce(onLoadInitialData, 300);

const onTableReset = (): void => {
  setTableInitialState();
  clearBeersState();
  wasBeerButtonEverClicked.value = false;
};

const mainBeerButtonClickHandler = computed(() => {
  return wasBeerButtonEverClicked.value
    ? onTableReset
    : debouncedOnLoadInitialData;
});

const onNavigationTypeChange = async (navigationType: TableNavigator) => {
  setTableInitialState();
  await loadInitialBeerData();
  activeTableNavigator.value = navigationType;
};

const onSort = (sortOption: SortOption) => {
  if (activeTableNavigator.value === TableNavigator.PAGINATION) {
    pageNumber.value = 1;
  }

  sortBy.value = sortOption.sortBy;
  sortDirection.value = sortOption.sortDirection;
};

const isNoDataVisible = computed(
  () => wasBeerButtonEverClicked.value && !areAnyBeersFetched.value
);

const isFetchErrorAlertOpen = ref(false);
const isFetchErrorAlertVisible = computed(
  () => isFetchError.value && isFetchErrorAlertOpen.value
);

const onFetchErrorAlertClose = () => {
  isFetchErrorAlertOpen.value = false;
  isFetchError.value = false;
};

watch(isFetchError, (newValue) => {
  if (newValue) {
    isFetchErrorAlertOpen.value = true;
  }
});

const isSortWarningAlertOpen = ref(true);
const isSortWarningAlertVisible: ComputedRef<boolean> = computed(() => {
  return !areAllDataFetched.value && isSortWarningAlertOpen.value;
});

const onSortWarningAlertClose = () => {
  isSortWarningAlertOpen.value = false;
};

watch(pageNumber, () => {
  if (areAllDataFetched.value) {
    return;
  }
  isSortWarningAlertOpen.value = true;
});
</script>

<style lang="scss" module="style">
@use '@/styles/spacings.scss';

.header {
  margin: 10 * spacings.$spacing-unit 0;

  text-align: center;
  text-decoration: underline;
}

.sectionContainer {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 10 * spacings.$spacing-unit;
  padding: 0 8 * spacings.$spacing-unit;
}

.bottomMargin {
  margin-bottom: 10 * spacings.$spacing-unit;
}

.itemsPerPageContainer {
  $offset-caption-padding: -53px;

  display: flex;
  justify-content: flex-start;
  width: 100%;

  margin-top: $offset-caption-padding;
}
</style>
