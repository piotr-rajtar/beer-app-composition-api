export enum SortArrowIconType {
  UP,
  DOWN,
}

export enum TableHeaderKey {
  ABV = 'abv',
  EBC = 'ebc',
  FIRST_BREWED = 'first_brewed',
  IBU = 'ibu',
  ID = 'id',
  MORE = 'more',
  NAME = 'name',
  PH = 'ph',
}

export interface TableHeader {
  key: TableHeaderKey;
  label: string;
}

export enum TableNavigator {
  LOAD_MORE,
  PAGINATION,
  INFINITE_SCROLL,
}

export interface NavigationType {
  id: string;
  value: TableNavigator;
  label: string;
}

export type SortBy = Exclude<TableHeaderKey, TableHeaderKey.MORE>;

export enum SortDirection {
  ASC,
  DESC,
  NONE,
}

export interface SortOption {
  sortDirection: SortDirection;
  sortBy: SortBy | null;
}