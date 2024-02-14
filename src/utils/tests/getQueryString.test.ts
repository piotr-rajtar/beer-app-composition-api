import { describe, expect, it } from 'vitest';

import { getQueryString } from '..';
import type { QueryParams } from '../../typings';

describe('getQueryString', () => {
  it('return correct query string', () => {
    const queryParams: QueryParams = {
      page: 1,
      per_page: 2,
    };

    const queryString: string = getQueryString(queryParams);
    const expectedQueryString = 'page=1&per_page=2';

    expect(queryString).toBe(expectedQueryString);
  });
});
