import { describe, expect, it } from 'vitest';

import { getQueryString, decryptQueryString } from '..';
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

describe('decryptQueryString', () => {
  it('return correctly decrypted query string', () => {
    const queryString = 'page=1&per_page=2';
    const decryptedQueryString: string[] = decryptQueryString(queryString);

    expect(decryptedQueryString.length).toBe(2);
    expect(decryptedQueryString[0]).toBe('page=1');
    expect(decryptedQueryString[1]).toBe('per_page=2');
  });
});
