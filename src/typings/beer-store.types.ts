import type { TableHeaderKey } from './table.types';

interface Fermentation {
  temp: Volume;
}
interface Hop {
  add: 'start' | 'middle' | 'end';
  amount: Volume;
  attribute: string;
  name: string;
}

interface Ingredients {
  hops: Hop[];
  malt: Malt[];
  yeast: string;
}

interface Malt {
  amount: Volume;
  name: string;
}

interface MashTemp {
  duration: number;
  temp: Volume;
}

interface Method {
  fermentation: Fermentation;
  mash_temp: MashTemp[];
  twist: null | string;
}
interface Volume {
  unit: 'litres' | 'grams' | 'kilograms' | 'celsius';
  value: number;
}

export interface Beer {
  abv: number | null;
  attenuation_level: number;
  boil_volume: Volume;
  brewers_tips: string;
  contributed_by: string;
  description: string;
  ebc: number | null;
  first_brewed: string;
  food_pairing: string[];
  ibu: number | null;
  id: number;
  image_url: string;
  ingredients: Ingredients;
  method: Method;
  name: string;
  ph: number | null;
  srm: number;
  tagline: string;
  target_fg: number;
  target_og: number;
  volume: Volume;
}

export interface SimplifiedBeer {
  [TableHeaderKey.ID]: number;
  [TableHeaderKey.NAME]: string;
  [TableHeaderKey.FIRST_BREWED]: string;
  [TableHeaderKey.ABV]: number | null;
  [TableHeaderKey.IBU]: number | null;
  [TableHeaderKey.EBC]: number | null;
  [TableHeaderKey.PH]: number | null;
}

export type CachedBeerRequest = { [key: string]: Beer[] };
