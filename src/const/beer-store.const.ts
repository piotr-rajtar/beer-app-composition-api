import type { SimplifiedBeer } from '../typings/beer-store.types';

export const API_ADDRESS: string = 'https://api.punkapi.com/v2/beers';

export const TABLE_HEADERS: Array<keyof SimplifiedBeer> = ['id', 'name', 'first_brewed', 'abv', 'ibu', 'ebc', 'ph'];