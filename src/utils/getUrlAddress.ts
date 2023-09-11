import type { QueryParams } from '../typings/global.types';
import { getQueryString } from './queryString.helpers';

export const getUrlAddress = (
  apiAddress: string,
  queryParams: QueryParams
): string => {
  const queryString: string = getQueryString(queryParams);
  return `${apiAddress}?${queryString}`;
};
