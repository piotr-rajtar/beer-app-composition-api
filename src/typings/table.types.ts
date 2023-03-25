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