export enum AlertType {
  ERROR,
  INFO,
  WARNING,
}

export enum ButtonColor {
  DANGER,
  DEFAULT,
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
  ebc_gt?: number;
  ebc_lt?: number;
  food?: string;
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
