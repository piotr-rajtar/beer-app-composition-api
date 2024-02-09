export enum AlertType {
  ERROR,
  INFO,
  WARNING,
}

export enum ButtonType {
  DEFAULT,
  PAGINATION,
}

export enum PaginationArrowDirection {
  LEFT,
  RIGHT,
}

export enum SelectOrientation {
  HORIZONTAL,
  VERTICAL,
}

export interface Filters {
  abv_gt?: number;
  abv_lt?: number;
  beer_name?: string;
  brewed_after?: string;
  brewed_before?: string;
  ebc_gt?: number;
  ebc_lt?: number;
  ibu_gt?: number;
  ibu_lt?: number;
}

export interface QueryParams extends Filters {
  page: number;
  per_page: number;
}

export interface SelectOption {
  id: string;
  label: string | number;
  value: unknown;
}
