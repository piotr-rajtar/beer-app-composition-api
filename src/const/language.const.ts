import { Language } from '../typings/language.types';
import type { SelectOption } from '../typings/global.types';

export const LANGUAGE_OPTIONS: SelectOption[] = [
  {
    id: Language.EN,
    label: 'HEADER.LANGUAGE_EN',
    value: Language.EN,
  },
  {
    id: Language.PL,
    label: 'HEADER.LANGUAGE_PL',
    value: Language.PL,
  },
];