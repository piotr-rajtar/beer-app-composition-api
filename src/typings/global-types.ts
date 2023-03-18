import type { Ref } from 'vue';
import type { SimplifiedBeer } from './beer-store-types';

export interface QueryParams {
  page: Ref<number>;
}

export type SortBy = keyof SimplifiedBeer;

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}