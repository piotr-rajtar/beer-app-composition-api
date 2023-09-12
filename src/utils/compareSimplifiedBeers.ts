import { SortDirection, TableHeaderKey } from '../typings';
import type { SimplifiedBeer, SortBy, SortOption } from '../typings';

import { getDateFromString } from './';

export const compareSimplifiedBeers = (sortOptions: SortOption) => {
  return (firstBeer: SimplifiedBeer, secondBeer: SimplifiedBeer): number => {
    const beer1 =
      sortOptions.sortDirection === SortDirection.ASC ? firstBeer : secondBeer;
    const beer2 =
      sortOptions.sortDirection === SortDirection.ASC ? secondBeer : firstBeer;

    switch (sortOptions.sortBy) {
      case TableHeaderKey.NAME:
        return beer1[sortOptions.sortBy].localeCompare(
          beer2[sortOptions.sortBy]
        );
      case TableHeaderKey.FIRST_BREWED:
        return (
          getDateFromString(beer1[sortOptions.sortBy]) -
          getDateFromString(beer2[sortOptions.sortBy])
        );
      default:
        return (
          (beer1[sortOptions.sortBy as SortBy] as number) -
          (beer2[sortOptions.sortBy as SortBy] as number)
        );
    }
  };
};
