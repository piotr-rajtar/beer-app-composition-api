import { ref, computed, toRaw } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { isArray } from 'lodash';

import { API_ADDRESS } from './beer-const';
import type { Beer } from './beer-models'

import type { QueryParams } from '../typings/typings';
import { getErrorMessage, getQueryString, getUrlAddress } from '../utils';

export const useBeerStore = defineStore('beer', () => {
  const areAllDataFetched = ref(false);
  const areDataLoading = ref(false);
  const beers: Ref<Beer[]> = ref([]);
  const cachedBeers: Ref<{ [key: string]: Beer[] }> = ref({});

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

  return { areDataLoading, beers, cachedBeers, loadInitialBeersData }
})
