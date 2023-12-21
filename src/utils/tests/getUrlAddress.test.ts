import { describe, expect, it } from 'vitest';

import { getUrlAddress } from '..';
import type { QueryParams } from '../../typings';

describe('getUrlAddress', () => {
  it('return correct url address', () => {
    const queryParams: QueryParams = {
      page: 1,
      per_page: 2,
    };

    const apiAddress = 'api_address';

    const urlAddress: string = getUrlAddress(apiAddress, queryParams);
    const expectedUrlAddress = 'api_address?page=1&per_page=2';

    expect(urlAddress).toBe(expectedUrlAddress);
  });
});
