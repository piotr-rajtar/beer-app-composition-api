import { ref, computed, toRaw } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import axios from 'axios';

import {
  API_ADDRESS,
  INITIAL_QUERY_PARAMS_QUANTITY,
  SIMPLIFIED_BEER_KEYS,
} from '../const';
import type {
  Beer,
  CachedBeerRequest,
  Filters,
  QueryParams,
  SimplifiedBeer,
  SortOption,
} from '../typings';
import {
  compareSimplifiedBeers,
  decryptQueryString,
  getErrorMessage,
  getQueryString,
  getUrlAddress,
} from '../utils';

import { useTableStore } from './';

export const useBeerStore = defineStore('beer', () => {
  const { itemsPerPage, pageNumber, sortBy, sortDirection } = storeToRefs(
    useTableStore()
  );

  const beers: Ref<Beer[]> = ref([]);
  const cachedBeerRequests: Ref<CachedBeerRequest> = ref({});

  const areDataLoading = ref(false);
  const isFetchError = ref(false);
  const isNextPageAvailable = ref(true);

  const areAllDataFetched = computed(() => {
    return !!Object.entries(cachedBeerRequests.value).find(
      (cachedBeerRequest) => {
        const [queryString, cachedBeers] = cachedBeerRequest;

        const quantityOfQueryParams = decryptQueryString(queryString).length;
        const isRequestWithoutFilters =
          quantityOfQueryParams === INITIAL_QUERY_PARAMS_QUANTITY;

        return isRequestWithoutFilters && cachedBeers.length === 0;
      }
    );
  });

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

  const fetchBeerData = async (queryParams: QueryParams): Promise<Beer[]> => {
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
    const cachedPage: Beer[] | undefined = toRaw(
      cachedBeerRequests.value[queryKey]
    );

    if (cachedPage && cachedPage.length) {
      isNextPageAvailable.value = true;
      return;
    }

    const result: Beer[] = await fetchBeerData(nextPageQueryParams);

    cachedBeerRequests.value[queryKey] = result;

    if (result.length) {
      isNextPageAvailable.value = true;
      return;
    }

    isNextPageAvailable.value = false;
  };

  const areFiltersApply = ref(false);
  const appliedFilters = ref<Filters>({});

  const appliedFiltersWithNoEmptyStrings = computed<Filters>(() => {
    return Object.fromEntries(
      Object.entries(appliedFilters.value).filter(([, value]) => !!value)
    );
  });

  const clearFilters = () => {
    appliedFilters.value = {};
    areFiltersApply.value = false;
  };

  const filterBeerData = async (): Promise<void> => {
    const queryParams: QueryParams = {
      page: pageNumber.value,
      per_page: itemsPerPage.value,
      ...appliedFiltersWithNoEmptyStrings.value,
    };
    const queryKey: string = getQueryString(queryParams);
    const cachedPage: Beer[] | undefined = toRaw(
      cachedBeerRequests.value[queryKey]
    );

    areDataLoading.value = true;

    await checkIfNextPageIsAvailable(queryParams);

    if (cachedPage) {
      beers.value = [...structuredClone(cachedPage)];
      areDataLoading.value = false;
      return;
    }

    const result: Beer[] = await fetchBeerData(queryParams);

    cachedBeerRequests.value[queryKey] = result;

    beers.value = [...result];

    areDataLoading.value = false;
  };

  const loadInitialBeerData = async (): Promise<void> => {
    const queryParams: QueryParams = {
      page: pageNumber.value,
      per_page: itemsPerPage.value,
    };
    const queryKey: string = getQueryString(queryParams);
    const cachedPage: Beer[] | undefined = toRaw(
      cachedBeerRequests.value[queryKey]
    );

    areDataLoading.value = true;

    await checkIfNextPageIsAvailable(queryParams);

    if (cachedPage) {
      beers.value = structuredClone(cachedPage);
      areDataLoading.value = false;
      return;
    }

    const result: Beer[] = await fetchBeerData(queryParams);

    cachedBeerRequests.value[queryKey] = result;

    if (result.length) {
      beers.value = result;
    }

    areDataLoading.value = false;
  };

  const loadMoreBeerData = async (): Promise<void> => {
    const queryParams: QueryParams = {
      page: pageNumber.value,
      per_page: itemsPerPage.value,
      ...appliedFiltersWithNoEmptyStrings.value,
    };
    const queryKey: string = getQueryString(queryParams);
    const cachedPage: Beer[] | undefined = toRaw(
      cachedBeerRequests.value[queryKey]
    );

    areDataLoading.value = true;

    await checkIfNextPageIsAvailable(queryParams);

    //Duplicates appears when trying to pagined sorted data when not all data fetched
    if (cachedPage) {
      beers.value = [
        ...beers.value,
        ...structuredClone(removeDuplicates(cachedPage)),
      ];
      areDataLoading.value = false;
      return;
    }

    const result: Beer[] = await fetchBeerData(queryParams);

    cachedBeerRequests.value[queryKey] = result;

    if (result.length) {
      beers.value = [...beers.value, ...removeDuplicates(result)];
    }

    areDataLoading.value = false;
  };

  const removeDuplicates = (beersPayload: Beer[]): Beer[] =>
    beersPayload.filter(
      (beerInPayload) =>
        !beers.value.some((beerInState) => beerInState.id === beerInPayload.id)
    );

  return {
    appliedFilters,
    areAllDataFetched,
    areAnyBeersFetched,
    areDataLoading,
    areFiltersApply,
    clearBeersState,
    clearFilters,
    filterBeerData,
    isFetchError,
    isNextPageAvailable,
    loadInitialBeerData,
    loadMoreBeerData,
    simplifiedBeersDataWithNoPagination,
    simplifiedBeersDataWithPagination,
    sortedSimplifiedBeersDataWithNoPagination,
    sortedSimplifiedBeersDataWithPagination,
  };
});
