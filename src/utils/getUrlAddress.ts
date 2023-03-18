import type { QueryParams } from '../typings/global-types';
import { getQueryString } from './getQueryString';

export const getUrlAddress = (apiAddress: string, queryParams: QueryParams): string => {
  const queryString: string = getQueryString(queryParams);
  return `${apiAddress}?${queryString}`;
};