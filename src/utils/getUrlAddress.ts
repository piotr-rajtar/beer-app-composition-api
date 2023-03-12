import { getQueryString } from './getQueryString';
import type { QueryParams } from '../typings/typings';

export const getUrlAddress = (apiAddress: string, queryParams: QueryParams): string => {
  const queryString: string = getQueryString(queryParams);
  return `${apiAddress}?${queryString}`;
};