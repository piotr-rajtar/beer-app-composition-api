//BEER DATA TYPES
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
    id: number;
    name: string;
    first_brewed: string;
    abv: number | null;
    ibu: number | null;
    ebc: number | null;
    ph: number | null;
  }