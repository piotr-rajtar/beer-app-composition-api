import { describe, expect, it } from 'vitest';

import { replaceWhiteSpacesWithDash } from '..';

describe('getUrlAddress', () => {
  it('parse text input with no empty space correctly', () => {
    const textInput = 'test';

    const parsedTextValue: string = replaceWhiteSpacesWithDash(textInput);

    expect(parsedTextValue).toBe(textInput);
  });

  it('parse text input with one empty space correctly', () => {
    const textInput = 'test test1';

    const parsedTextValue: string = replaceWhiteSpacesWithDash(textInput);

    const expectedTextValue = 'test_test1';

    expect(parsedTextValue).toBe(expectedTextValue);
  });

  it('parse text input with more than one empty space correctly', () => {
    const textInput = 'test          test1';

    const parsedTextValue: string = replaceWhiteSpacesWithDash(textInput);

    const expectedTextValue = 'test_test1';

    expect(parsedTextValue).toBe(expectedTextValue);
  });
});
