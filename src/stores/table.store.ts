import { ref } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';

import { DEFAULT_ITEMS_PER_PAGE } from '../const';
import { SortDirection } from '../typings';
import type { SortBy } from '../typings';

export const useTableStore = defineStore('table', () => {
  const itemsPerPage: Ref<number> = ref(DEFAULT_ITEMS_PER_PAGE);
  const pageNumber = ref(1);
  const sortBy: Ref<SortBy | null> = ref(null);
  const sortDirection: Ref<SortDirection> = ref(SortDirection.NONE);

  const setTableInitialState = (): void => {
    sortBy.value = null;
    sortDirection.value = SortDirection.NONE;
    pageNumber.value = 1;
    itemsPerPage.value = DEFAULT_ITEMS_PER_PAGE;
  };

  return {
    itemsPerPage,
    pageNumber,
    setTableInitialState,
    sortBy,
    sortDirection,
  };
});
