import { describe, expect, it } from 'vitest';

import { replaceDashWithWhiteSpace } from '..';

describe('getUrlAddress', () => {
  it('parse text input with no empty space correctly', () => {
    const textInput = 'test_test';

    const parsedTextValue: string = replaceDashWithWhiteSpace(textInput);
    const expectedTextValue = 'test test';

    expect(parsedTextValue).toBe(expectedTextValue);
  });
});
