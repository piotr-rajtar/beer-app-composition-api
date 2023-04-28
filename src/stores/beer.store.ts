import { ref, computed, toRaw } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

import { API_ADDRESS, SIMPLIFIED_BEER_KEYS } from '../const/beer-store.const';
import type { QueryParams } from '../typings/global.types';
import type { Beer, SimplifiedBeer } from '../typings/beer-store.types';
import { TableNavigator, SortDirection } from '../typings/table.types';
import type { SortBy, SortOption } from '../typings/table.types';
import { compareSimplifiedBeers, getErrorMessage, getQueryString, getUrlAddress } from '../utils';

export const useBeerStore = defineStore('beer', () => {
  const activeTableNavigator = ref(TableNavigator.LOAD_MORE);
  const areAllDataFetched = ref(false);
  const areDataLoading = ref(false);
  const beers: Ref<Beer[]> = ref([]);
  const cachedBeers: Ref<{ [key: string]: Beer[] }> = ref({});
  const itemsPerPage = 25;
  const pageNumber = ref(1);
  const sortBy: Ref<SortBy | null> = ref(null);
  const sortDirection: Ref<SortDirection> = ref(SortDirection.NONE);

  const simplifiedBeersDataWithNoPagination: ComputedRef<SimplifiedBeer[]> = computed(() => {
    return beers.value.map((beer) => {
      const simplifiedBeer: Record<keyof SimplifiedBeer, unknown> = {} as SimplifiedBeer;
      SIMPLIFIED_BEER_KEYS.forEach((header) => {
        simplifiedBeer[header] = beer[header];
      });
      return simplifiedBeer as SimplifiedBeer;
    });
  }
);

  const sortedSimplifiedBeersDataWithNoPagination: ComputedRef<SimplifiedBeer[]> = computed(() => {
    const clonedBeersData: SimplifiedBeer[] = structuredClone(simplifiedBeersDataWithNoPagination.value);
    const sortOption: SortOption = {
      sortBy: sortBy.value,
      sortDirection: sortDirection.value,
    }
      return clonedBeersData.sort(compareSimplifiedBeers(sortOption));
    }
  );

  const simplifiedBeersDataWithPagination: ComputedRef<SimplifiedBeer[]> = computed(() => {
    const endIndex = itemsPerPage * pageNumber.value;
    const startIndex = endIndex - itemsPerPage;

    const clonedBeersData: SimplifiedBeer[] = structuredClone(simplifiedBeersDataWithNoPagination.value);

    return clonedBeersData.slice(startIndex, endIndex);
  });

  const sortedSimplifiedBeersDataWithPagination: ComputedRef<SimplifiedBeer[]> = computed(() => {
    const endIndex = itemsPerPage * pageNumber.value;
    const startIndex = endIndex - itemsPerPage;

    const clonedBeersData: SimplifiedBeer[] = structuredClone(simplifiedBeersDataWithNoPagination.value);

    const sortOption: SortOption = {
      sortBy: sortBy.value,
      sortDirection: sortDirection.value,
    }

    return clonedBeersData.sort(compareSimplifiedBeers(sortOption)).slice(startIndex, endIndex);;
  }
);

  const clearStore = (): void => {
    areAllDataFetched.value = false;
    beers.value = [];
  };

  const fetchBeerData = async (queryParams: QueryParams): Promise<Beer[] | Error> => {
    const url: string = getUrlAddress(API_ADDRESS, queryParams);
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      throw getErrorMessage(e);
    }
  };

  const loadInitialBeersData = async (queryParams: ComputedRef<QueryParams>): Promise<void> => {
    const queryKey: string = getQueryString(queryParams.value);
    const cachedPage: Beer[] | undefined = toRaw(cachedBeers.value[queryKey]);
    areDataLoading.value = true;

    if (cachedPage) {
      beers.value = structuredClone(cachedPage)
      areDataLoading.value = false;
      return;
    }    
       
    const result: Beer[] | Error = await fetchBeerData(queryParams.value);    
    if (Array.isArray(result) && result.length) {
      cachedBeers.value[queryKey] = result;
      beers.value = result;
    }
    areDataLoading.value = false;
  };

  return { 
    activeTableNavigator,
    areDataLoading, 
    clearStore, 
    loadInitialBeersData, 
    pageNumber,
    simplifiedBeersDataWithNoPagination,
    simplifiedBeersDataWithPagination,
    sortBy,
    sortDirection,
    sortedSimplifiedBeersDataWithNoPagination,
    sortedSimplifiedBeersDataWithPagination,
  }
});
