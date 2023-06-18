import type { NavigationType, TableHeader } from '../typings/table.types';
import { TableHeaderKey, TableNavigator } from '../typings/table.types';

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