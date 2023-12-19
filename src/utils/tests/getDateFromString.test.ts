import { describe, expect, it } from 'vitest';

import { getDateFromString } from '..';

import { mockedBeersData } from './mockedBeersData';

describe('getDateFromStringFunction', () => {
  it('calculate given data correctly', () => {
    const firstBeerConvertedTime = getDateFromString(
      mockedBeersData[0].first_brewed
    );
    const firstBeerExpectedTime = 1188597600000;

    const secondBeerConvertedTime = getDateFromString(
      mockedBeersData[1].first_brewed
    );
    const secondBeerExpectedTime = 1207000800000;

    expect(firstBeerConvertedTime).toBe(firstBeerExpectedTime);
    expect(secondBeerConvertedTime).toBe(secondBeerExpectedTime);
  });
});
