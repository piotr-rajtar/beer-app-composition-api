import { useBeerStore } from '../stores/beer.store';
import { SortDirection, TableNavigator } from '../typings/table.types';
import type { SimplifiedBeer } from '../typings/beer-store.types';

enum PAGINATION_STATE {
  NO_PAGINATION = 10,
  PAGINATION = 100,
};
  
enum SORT_STATE {
  NO_SORT = 0,
  SORT = 1,
};
  
enum TABLE_STATES {
  NO_SORT_NO_PAGINATION = 10,
  SORT_NO_PAGINATION = 11,
  NO_SORT_PAGINATION = 100,
  SORT_PAGINATION = 101,
};

export const getBeerTableDataSource = (
  sortDirection: SortDirection, 
  activeTableNavigator: TableNavigator
) => {
  const { 
    simplifiedBeersDataWithNoPagination,
    simplifiedBeersDataWithPagination,
    sortedSimplifiedBeersDataWithNoPagination,
    sortedSimplifiedBeersDataWithPagination,
  } = useBeerStore();

  const storeDataSource: { [key in TABLE_STATES]: SimplifiedBeer[] } = {
    [TABLE_STATES.NO_SORT_NO_PAGINATION]: simplifiedBeersDataWithNoPagination,
    [TABLE_STATES.SORT_NO_PAGINATION]: sortedSimplifiedBeersDataWithNoPagination,
    [TABLE_STATES.NO_SORT_PAGINATION]: simplifiedBeersDataWithPagination,
    [TABLE_STATES.SORT_PAGINATION]: sortedSimplifiedBeersDataWithPagination,
  };

  const sortState = sortDirection === SortDirection.NONE 
    ? SORT_STATE.NO_SORT 
    : SORT_STATE.SORT;

  const paginationState = activeTableNavigator === TableNavigator.PAGINATION 
  ? PAGINATION_STATE.PAGINATION 
  : PAGINATION_STATE.NO_PAGINATION;

  const tableState: TABLE_STATES = sortState + paginationState;

  return storeDataSource[tableState];
}
