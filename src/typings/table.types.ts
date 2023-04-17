export enum ArrowIconType {
  UP,
  DOWN,
}

export enum TableHeaderKey {
  ABV,
  EBC,
  FIRST_BREWED,
  IBU,
  ID,
  MORE,
  NAME,
  PH,
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

export interface TableHeader {
  key: TableHeaderKey;
  label: string;
}