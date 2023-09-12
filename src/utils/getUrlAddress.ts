import type { QueryParams } from '../typings';
import { getQueryString } from './queryString.helpers';

export const getUrlAddress = (
  apiAddress: string,
  queryParams: QueryParams
): string => {
  const queryString: string = getQueryString(queryParams);
  return `${apiAddress}?${queryString}`;
};
