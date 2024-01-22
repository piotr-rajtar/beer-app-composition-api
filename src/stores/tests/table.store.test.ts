import { describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { DEFAULT_ITEMS_PER_PAGE } from '../../const';
import { SortDirection, TableHeaderKey } from '../../typings';

import { useTableStore } from '../table.store';

describe('Table Store', () => {
  it('sets table initial state', () => {
    setActivePinia(createPinia());

    const tableStore = useTableStore();
    tableStore.itemsPerPage = 20;
    tableStore.pageNumber = 5;
    tableStore.sortBy = TableHeaderKey.EBC;
    tableStore.sortDirection = SortDirection.ASC;

    tableStore.setTableInitialState();

    expect(tableStore.itemsPerPage).toBe(DEFAULT_ITEMS_PER_PAGE);
    expect(tableStore.pageNumber).toBe(1);
    expect(tableStore.sortBy).toBeNull();
    expect(tableStore.sortDirection).toBe(SortDirection.NONE);
  });
});
