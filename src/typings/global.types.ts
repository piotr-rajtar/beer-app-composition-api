import type { Ref } from 'vue';

import type { TableHeaderKey } from './table.types';

export interface QueryParams {
  page: Ref<number>;
}

export type SortBy = Exclude<TableHeaderKey, TableHeaderKey.MORE>;

export enum SortDirection {
  ASC,
  DESC,
  NONE,
}

export enum Language {
  EN = 'en',
  PL = 'pl',
}

export interface LanguageOption {
  id: Language;
  label: string;
}