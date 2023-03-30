import { Language } from '../typings/global.types';
import type { LanguageOption } from '../typings/global.types';
import type { SimplifiedBeer } from '../typings/beer-store.types';

export const tableHeaders: Array<keyof SimplifiedBeer> = ['id', 'name', 'first_brewed', 'abv', 'ibu', 'ebc', 'ph'];

export const languageOptions: LanguageOption[] = [
  {
    id: Language.EN,
    label: 'HEADER.LANGUAGE_EN',
  },
  {
    id: Language.PL,
    label: 'HEADER.LANGUAGE_PL',
  },
];