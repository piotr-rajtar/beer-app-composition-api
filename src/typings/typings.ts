import type { Ref } from 'vue';
import type { BeerSimplified } from '../stores/beer-models';

export interface QueryParams {
  page: Ref<number>;
}

export type SortBy = keyof BeerSimplified;

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}