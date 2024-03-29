import { TableHeaderKey } from '../typings';
import type { SimplifiedBeer } from '../typings';

export const API_ADDRESS = 'https://api.punkapi.com/v2/beers';

export const DEFAULT_ITEMS_PER_PAGE = 10;

export const SIMPLIFIED_BEER_KEYS: Array<keyof SimplifiedBeer> = [
  TableHeaderKey.ID,
  TableHeaderKey.NAME,
  TableHeaderKey.FIRST_BREWED,
  TableHeaderKey.ABV,
  TableHeaderKey.IBU,
  TableHeaderKey.EBC,
  TableHeaderKey.PH,
];
