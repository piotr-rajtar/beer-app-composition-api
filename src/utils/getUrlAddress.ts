import type { QueryParams } from '../typings';

import { getQueryString } from './';

export const getUrlAddress = (
  apiAddress: string,
  queryParams: QueryParams
): string => {
  const queryString: string = getQueryString(queryParams);
  return `${apiAddress}?${queryString}`;
};
