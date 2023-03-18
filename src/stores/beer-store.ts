import { ref, computed, toRaw } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { isArray } from 'lodash';

import { API_ADDRESS } from '../const/beer-store-const';
import { tableHeaders } from '../const/global-const';
import type { QueryParams } from '../typings/global-types';
import { getErrorMessage, getQueryString, getUrlAddress } from '../utils';


import type { Beer, SimplifiedBeer } from '../typings/beer-store-types'

export const useBeerStore = defineStore('beer', () => {
  const areAllDataFetched = ref(false);
  const areDataLoading = ref(false);
  const beers: Ref<Beer[]> = ref([]);
  const cachedBeers: Ref<{ [key: string]: Beer[] }> = ref({});

  const simplifiedBeersData: ComputedRef<SimplifiedBeer[]> = computed(() => {
    return beers.value.map((beer) => {
      const simplifiedBeer: Record<keyof SimplifiedBeer, unknown> = {} as SimplifiedBeer;
      tableHeaders.forEach((header) => {
        simplifiedBeer[header] = beer[header];
     });
      return simplifiedBeer as SimplifiedBeer;
    })
  })

  const fetchBeerData = async (queryParams: QueryParams): Promise<Beer[] | Error> => {
    const url: string = getUrlAddress(API_ADDRESS, queryParams);
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      throw getErrorMessage(e);
    }
  }

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
        
    if (isArray(result) && result.length) {
      cachedBeers.value[queryKey] = result;
      beers.value = result;
    }
    areDataLoading.value = false;
  }

  return { areDataLoading, loadInitialBeersData, simplifiedBeersData }
})