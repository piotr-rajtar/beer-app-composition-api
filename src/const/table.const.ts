import type { NavigationType } from '../typings/table.types';
import { TableNavigator } from '../typings/table.types';
import i18n from '../i18n';

export const navigationTypes: NavigationType[] = [
  {
    id: 'loadMore',
    value: TableNavigator.LOAD_MORE,
    label: i18n.global.t('TABLE_NAVIGATION.LOAD_MORE'),
  },
  {
    id: 'pagination',
    value: TableNavigator.PAGINATION,
    label: i18n.global.t('TABLE_NAVIGATION.PAGINATION'),
  },
  {
    id: 'infiniteScroll',
    value: TableNavigator.INFINITE_SCROLL,
    label: i18n.global.t('TABLE_NAVIGATION.INFINITE_SCROLL'),
  },
];