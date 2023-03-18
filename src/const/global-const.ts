import type { SimplifiedBeer } from '../typings/beer-store-types';

export const tableHeaders: Array<keyof SimplifiedBeer> = ['id', 'name', 'first_brewed', 'abv', 'ibu', 'ebc', 'ph'];