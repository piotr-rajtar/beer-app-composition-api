import { describe, expect, it } from 'vitest';

import { getDateFromString } from '..';

import { mockedBeersData } from './mockedBeersData';

describe('getDateFromStringFunction', () => {
  it('calculates given data correctly', () => {
    const firstBeerConvertedTime = getDateFromString(
      mockedBeersData[0].first_brewed
    );
    const firstBeerExpectedTime = 1191189600000;

    const secondBeerConvertedTime = getDateFromString(
      mockedBeersData[1].first_brewed
    );
    const secondBeerExpectedTime = 1209592800000;

    expect(firstBeerConvertedTime).toBe(firstBeerExpectedTime);
    expect(secondBeerConvertedTime).toBe(secondBeerExpectedTime);
  });

  it('calculates data in shortend format correctly', () => {
    const beerWithShortenedDate = getDateFromString(
      mockedBeersData[2].first_brewed
    );
    const expectedTime = 1517439600000;

    expect(beerWithShortenedDate).toBe(expectedTime);
  });
});
