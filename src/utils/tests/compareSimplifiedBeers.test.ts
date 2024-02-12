import { beforeEach, describe, expect, it } from 'vitest';

import type { SimplifiedBeer } from '../../typings';
import { SortDirection, TableHeaderKey } from '../../typings';

import { compareSimplifiedBeers } from '../';

import { mockedBeersData } from './mockedBeersData';

describe('compareSimplifiedBeer function', () => {
  let testData: SimplifiedBeer[];

  beforeEach(() => {
    testData = [...mockedBeersData];
  });

  it('sorts beer data correctly with asc order by beer name', () => {
    testData.sort(
      compareSimplifiedBeers({
        sortBy: TableHeaderKey.NAME,
        sortDirection: SortDirection.ASC,
      })
    );
    expect(testData[0].name).toBe('Buzz');
  });

  it('sorts beer data correctly with desc order by beer name', () => {
    testData.sort(
      compareSimplifiedBeers({
        sortBy: TableHeaderKey.NAME,
        sortDirection: SortDirection.DESC,
      })
    );
    expect(testData[0].name).toBe('Trashy Blonde');
  });

  it('sorts beer data correctly with asc order by first brewed date', () => {
    testData.sort(
      compareSimplifiedBeers({
        sortBy: TableHeaderKey.FIRST_BREWED,
        sortDirection: SortDirection.ASC,
      })
    );
    expect(testData[0].first_brewed).toBe('09/2007');
  });

  it('sorts beer data correctly with desc order by first brewed date', () => {
    testData.sort(
      compareSimplifiedBeers({
        sortBy: TableHeaderKey.FIRST_BREWED,
        sortDirection: SortDirection.DESC,
      })
    );
    expect(testData[0].first_brewed).toBe('2018');
  });

  it('sorts beer data correctly with asc order by other category than name and first brewed date', () => {
    testData.sort(
      compareSimplifiedBeers({
        sortBy: TableHeaderKey.EBC,
        sortDirection: SortDirection.ASC,
      })
    );
    expect(testData[0].ebc).toBe(1);
  });

  it('sorts beer data correctly with desc order by other category than name and first brewed date', () => {
    testData.sort(
      compareSimplifiedBeers({
        sortBy: TableHeaderKey.EBC,
        sortDirection: SortDirection.DESC,
      })
    );
    expect(testData[0].ebc).toBe(20);
  });
});
