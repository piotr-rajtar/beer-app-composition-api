import type { QueryParams } from '../typings/global.types';

export const getQueryString = (queryParams: QueryParams): string =>
  (Object.keys(queryParams) as Array<keyof QueryParams>)
    .map((queryParamKey) => `${queryParamKey}=${queryParams[queryParamKey]}`)
    .join('&');
