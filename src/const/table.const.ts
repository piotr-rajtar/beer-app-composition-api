import type { NavigationType } from '../typings/table.types';
import { TableNavigator } from '../typings/table.types';

export const navigationTypes: NavigationType[] = [
  {
    id: 'loadMore',
    value: TableNavigator.LOAD_MORE,
    label: 'TABLE_NAVIGATION.LOAD_MORE',
  },
  {
    id: 'pagination',
    value: TableNavigator.PAGINATION,
    label: 'TABLE_NAVIGATION.PAGINATION',
  },
  {
    id: 'infiniteScroll',
    value: TableNavigator.INFINITE_SCROLL,
    label: 'TABLE_NAVIGATION.INFINITE_SCROLL',
  },
];