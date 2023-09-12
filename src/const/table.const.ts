import { TableHeaderKey, TableNavigator } from '../typings';
import type { NavigationType, SelectOption, TableHeader } from '../typings';

export const NAVIGATION_TYPES: NavigationType[] = [
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

export const TABLE_HEADERS: TableHeader[] = [
  {
    key: TableHeaderKey.ID,
    label: 'TABLE_HEADER.ID',
  },
  {
    key: TableHeaderKey.NAME,
    label: 'TABLE_HEADER.NAME',
  },
  {
    key: TableHeaderKey.FIRST_BREWED,
    label: 'TABLE_HEADER.FIRST_BREWED',
  },
  {
    key: TableHeaderKey.ABV,
    label: 'TABLE_HEADER.ABV',
  },
  {
    key: TableHeaderKey.IBU,
    label: 'TABLE_HEADER.IBU',
  },
  {
    key: TableHeaderKey.EBC,
    label: 'TABLE_HEADER.EBC',
  },
  {
    key: TableHeaderKey.PH,
    label: 'TABLE_HEADER.PH',
  },
  {
    key: TableHeaderKey.MORE,
    label: 'TABLE_HEADER.MORE',
  },
];

export const BEER_TABLE_CAPTION_ID = 'beerTableCaptionId';
export const BEER_TABLE_ID = 'beerTableId';

export const ITEMS_PER_PAGE_OPTIONS: SelectOption[] = [
  {
    id: 'items_number_option_1',
    label: 5,
    value: 5,
  },
  {
    id: 'items_number_option_2',
    label: 10,
    value: 10,
  },
  {
    id: 'items_number_option_3',
    label: 20,
    value: 20,
  },
  {
    id: 'items_number_option_4',
    label: 40,
    value: 40,
  },
  {
    id: 'items_number_option_5',
    label: 80,
    value: 80,
  },
];
