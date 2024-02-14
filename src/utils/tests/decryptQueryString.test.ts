import { describe, expect, it } from 'vitest';

import { decryptQueryString } from '..';

describe('decryptQueryString', () => {
  it('return correctly decrypted query string', () => {
    const queryString = 'page=1&per_page=2';
    const decryptedQueryString: string[] = decryptQueryString(queryString);

    expect(decryptedQueryString.length).toBe(2);
    expect(decryptedQueryString[0]).toBe('page=1');
    expect(decryptedQueryString[1]).toBe('per_page=2');
  });
});
