<template>
  <main :class="style.mainContentPadding">
    <h2 :class="style.header">{{ t('GENERAL.APP_HEADER') }}</h2>

    <div :class="[style.sectionContainer, style.sectionMargin]">
      <BeerAppButton @click="mainBeerButtonClickHandler">
        {{ beerButtonLabel }}
      </BeerAppButton>
    </div>

    <div v-if="isFetchErrorAlertVisible" :class="style.sectionMargin">
      <FetchErrorAlert @close="onFetchErrorAlertClose" />
    </div>

    <div v-if="areAnyBeersFetched" :class="style.tableSectionContainer">
      <div v-if="isSortWarningAlertVisible" :class="style.sectionMargin">
        <SortWarningAlert @close="onSortWarningAlertClose" />
      </div>

      <div :class="[style.tableNavigationContainer, style.sectionMargin]">
        <TableNavigation @navigation-type-change="onNavigationTypeChange" />
      </div>

      <div :class="style.tableContainer">
        <BeerTableContainer
          :beers="beerTableDataSource"
          :sort-by="sortBy"
          @sort="onSort($event)"
        />
      </div>

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
  </main>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { debounce } from 'lodash';

import {
  BeerAppButton,
  BeerAppLoader,
  BeerTableContainer,
  FetchErrorAlert,
  InfiniteScroll,
  ItemsPerPageSelect,
  LoadMore,
  NoData,
  SortWarningAlert,
  TableNavigation,
  TablePagination,
} from '../components';
import { useBeerStore, useTableStore } from '../stores';
import { TableNavigator } from '../typings';
import type { Filters, SortOption } from '../typings';
import { getBeerTableDataSource } from '../utils';

const { t } = useI18n();

const { areAnyBeersFetched, areDataLoading, areAllDataFetched, isFetchError } =
  storeToRefs(useBeerStore());

const { clearBeersState, loadInitialBeerData, loadMoreBeerData } =
  useBeerStore();

const { itemsPerPage, pageNumber, sortBy, sortDirection } = storeToRefs(
  useTableStore()
);

const { setTableInitialState } = useTableStore();

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
@use '@/styles/mixins.scss';
@use '@/styles/spacings.scss';

.mainContentPadding {
  padding: 0 8 * spacings.$spacing-unit;

  @include mixins.mobile {
    padding: 0 4 * spacings.$spacing-unit;
  }
}

.header {
  margin: 10 * spacings.$spacing-unit 0;

  text-align: center;
  text-decoration: underline;
}

.sectionContainer {
  display: flex;
  justify-content: center;
}

.tableSectionContainer {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 10 * spacings.$spacing-unit;
}

.tableNavigationContainer {
  @include mixins.tablet {
    width: 100%;
  }
}

.tableContainer {
  width: 100%;
}

.sectionMargin {
  margin-bottom: 10 * spacings.$spacing-unit;

  @include mixins.tablet {
    margin-bottom: 5 * spacings.$spacing-unit;
  }
}

.itemsPerPageContainer {
  $offset-caption-padding: -53px;

  display: flex;
  justify-content: flex-start;
  width: 100%;

  margin-top: $offset-caption-padding;

  @include mixins.tablet {
    justify-content: center;
    margin: 0 0 4 * spacings.$spacing-unit 0;
  }
}
</style>
