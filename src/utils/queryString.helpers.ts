import type { QueryParams } from '../typings';

export const getQueryString = (queryParams: QueryParams): string =>
  (Object.keys(queryParams) as Array<keyof QueryParams>)
    .map((queryParamKey) => `${queryParamKey}=${queryParams[queryParamKey]}`)
    .join('&');

export const decryptQueryString = (queryString: string): string[] =>
  queryString.split('&');
