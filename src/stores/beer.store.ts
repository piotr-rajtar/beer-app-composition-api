import { ref, computed, toRaw } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

import {
  API_ADDRESS,
  DEFAULT_ITEMS_PER_PAGE,
  SIMPLIFIED_BEER_KEYS,
} from '../const/beer-store.const';
import type { Filters, QueryParams } from '../typings/global.types';
import type { Beer, SimplifiedBeer } from '../typings/beer-store.types';
import { SortDirection } from '../typings/table.types';
import type { SortBy, SortOption } from '../typings/table.types';
import {
  compareSimplifiedBeers,
  getErrorMessage,
  getQueryString,
  getUrlAddress,
} from '../utils';

export const useBeerStore = defineStore('beer', () => {
  const beers: Ref<Beer[]> = ref([]);
  const cachedBeers: Ref<{ [key: string]: Beer[] }> = ref({});

  const isFetchError = ref(false);
  const itemsPerPage = ref(DEFAULT_ITEMS_PER_PAGE);
  const pageNumber = ref(1);

  const areDataLoading = ref(false);

  const isNextPageAvailable = ref(true);

  const sortBy: Ref<SortBy | null> = ref(null);
  const sortDirection: Ref<SortDirection> = ref(SortDirection.NONE);

  const areAnyBeersFetched = computed(() => !!beers.value.length);

  const simplifiedBeersDataWithNoPagination: ComputedRef<SimplifiedBeer[]> =
    computed(() => {
      return beers.value.map((beer) => {
        const simplifiedBeer: Record<keyof SimplifiedBeer, unknown> =
          {} as SimplifiedBeer;
        SIMPLIFIED_BEER_KEYS.forEach((header) => {
          simplifiedBeer[header] = beer[header];
        });
        return simplifiedBeer as SimplifiedBeer;
      });
    });

  const sortedSimplifiedBeersDataWithNoPagination: ComputedRef<
    SimplifiedBeer[]
  > = computed(() => {
    const clonedBeersData: SimplifiedBeer[] = structuredClone(
      simplifiedBeersDataWithNoPagination.value
    );

    const sortOption: SortOption = {
      sortBy: sortBy.value,
      sortDirection: sortDirection.value,
    };

    return clonedBeersData.sort(compareSimplifiedBeers(sortOption));
  });

  const simplifiedBeersDataWithPagination: ComputedRef<SimplifiedBeer[]> =
    computed(() => {
      const endIndex = itemsPerPage.value * pageNumber.value;
      const startIndex = endIndex - itemsPerPage.value;

      const clonedBeersData: SimplifiedBeer[] = structuredClone(
        simplifiedBeersDataWithNoPagination.value
      );

      return clonedBeersData.slice(startIndex, endIndex);
    });

  const sortedSimplifiedBeersDataWithPagination: ComputedRef<SimplifiedBeer[]> =
    computed(() => {
      const endIndex = itemsPerPage.value * pageNumber.value;
      const startIndex = endIndex - itemsPerPage.value;

      const clonedBeersData: SimplifiedBeer[] = structuredClone(
        simplifiedBeersDataWithNoPagination.value
      );

      const sortOption: SortOption = {
        sortBy: sortBy.value,
        sortDirection: sortDirection.value,
      };

      return clonedBeersData
        .sort(compareSimplifiedBeers(sortOption))
        .slice(startIndex, endIndex);
    });

  const clearBeersState = (): void => {
    beers.value = [];
  };

  const fetchBeerData = async (
    queryParams: QueryParams
  ): Promise<Beer[] | Error> => {
    const url: string = getUrlAddress(API_ADDRESS, queryParams);

    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      window.scrollTo(0, 0);
      isFetchError.value = true;
      areDataLoading.value = false;
      throw getErrorMessage(error);
    }
  };

  const checkIfNextPageIsAvailable = async (
    queryParams: QueryParams
  ): Promise<void> => {
    const nextPageQueryParams: QueryParams = {
      ...queryParams,
      page: pageNumber.value + 1,
    };
    const queryKey: string = getQueryString(nextPageQueryParams);
    const cachedPage: Beer[] | undefined = toRaw(cachedBeers.value[queryKey]);

    if (cachedPage) {
      isNextPageAvailable.value = true;
      return;
    }

    const result: Beer[] | Error = await fetchBeerData(nextPageQueryParams);

    if (Array.isArray(result) && result.length) {
      cachedBeers.value[queryKey] = result;
      isNextPageAvailable.value = true;
      return;
    }

    isNextPageAvailable.value = false;
  };

  const loadInitialBeerData = async (): Promise<void> => {
    const queryParams: QueryParams = {
      page: pageNumber.value,
      per_page: itemsPerPage.value,
    };
    const queryKey: string = getQueryString(queryParams);
    const cachedPage: Beer[] | undefined = toRaw(cachedBeers.value[queryKey]);

    areDataLoading.value = true;

    await checkIfNextPageIsAvailable(queryParams);

    if (cachedPage) {
      beers.value = structuredClone(cachedPage);
      areDataLoading.value = false;
      return;
    }

    const result: Beer[] | Error = await fetchBeerData(queryParams);

    if (Array.isArray(result) && result.length) {
      cachedBeers.value[queryKey] = result;
      beers.value = result;
    }

    areDataLoading.value = false;
  };

  const loadMoreBeerData = async (filters: Filters): Promise<void> => {
    const queryParams: QueryParams = {
      page: pageNumber.value,
      per_page: itemsPerPage.value,
      ...filters,
    };
    const queryKey: string = getQueryString(queryParams);
    const cachedPage: Beer[] | undefined = toRaw(cachedBeers.value[queryKey]);

    areDataLoading.value = true;

    await checkIfNextPageIsAvailable(queryParams);

    //Duplicates appears when trying to pagined sorted data
    if (cachedPage) {
      beers.value = [
        ...beers.value,
        ...structuredClone(removeDuplicates(cachedPage)),
      ];
      areDataLoading.value = false;
      return;
    }

    const result: Beer[] | Error = await fetchBeerData(queryParams);

    if (Array.isArray(result) && result.length) {
      cachedBeers.value[queryKey] = result;
      beers.value = [...beers.value, ...removeDuplicates(result)];
    }

    areDataLoading.value = false;
  };

  const removeDuplicates = (beersPayload: Beer[]): Beer[] =>
    beersPayload.filter(
      (beerInPayload) =>
        !beers.value.some((beerInState) => beerInState.id === beerInPayload.id)
    );

  const setTableInitialState = (): void => {
    sortBy.value = null;
    sortDirection.value = SortDirection.NONE;
    pageNumber.value = 1;
    itemsPerPage.value = DEFAULT_ITEMS_PER_PAGE;
  };

  return {
    areDataLoading,
    areAnyBeersFetched,
    clearBeersState,
    isFetchError,
    isNextPageAvailable,
    itemsPerPage,
    loadInitialBeerData,
    loadMoreBeerData,
    pageNumber,
    setTableInitialState,
    simplifiedBeersDataWithNoPagination,
    simplifiedBeersDataWithPagination,
    sortBy,
    sortDirection,
    sortedSimplifiedBeersDataWithNoPagination,
    sortedSimplifiedBeersDataWithPagination,
  };
});
