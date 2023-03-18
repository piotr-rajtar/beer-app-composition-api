import type { NavigationType } from '../typings/table-types';
import { TableNavigator } from '../typings/table-types';

export const navigationTypes: NavigationType[] = [
  {
    id: 'loadMore',
    value: TableNavigator.LOAD_MORE,
    label: 'Load more',
  },
  {
    id: 'pagination',
    value: TableNavigator.PAGINATION,
    label: 'Pagination',
  },
  {
    id: 'infiniteScroll',
    value: TableNavigator.INFINITE_SCROLL,
    label: 'Infinite Scroll',
  },
];