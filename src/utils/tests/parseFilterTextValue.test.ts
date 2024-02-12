import { describe, expect, it } from 'vitest';

import { parseFilterTextValue } from '..';

describe('getUrlAddress', () => {
  it('parse text input with no empty space correctly', () => {
    const textInput = 'test';

    const parsedTextValue: string = parseFilterTextValue(textInput);

    expect(parsedTextValue).toBe(textInput);
  });

  it('parse text input with one empty space correctly', () => {
    const textInput = 'test test1';

    const parsedTextValue: string = parseFilterTextValue(textInput);

    const expectedTextValue = 'test_test1';

    expect(parsedTextValue).toBe(expectedTextValue);
  });

  it('parse text input with more than one empty space correctly', () => {
    const textInput = 'test          test1';

    const parsedTextValue: string = parseFilterTextValue(textInput);

    const expectedTextValue = 'test_test1';

    expect(parsedTextValue).toBe(expectedTextValue);
  });
});
