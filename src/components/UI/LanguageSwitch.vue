<template>
  <BeerAppSelect
    :id="LANGUAGE_SELECT_ID"
    :default-value="Language.EN"
    :label="LANGUAGE_SELECT_LABEL"
    :options="LANGUAGE_OPTIONS"
    :orientation="SelectOrientation.VERTICAL"
    @select="onLanguageSwitch"
  />
</template>

<script lang="ts" setup>
import { LANGUAGE_OPTIONS } from '../../const/language.const';
import { SelectOrientation } from '../../typings/global.types';
import { Language } from '../../typings/language.types';

import BeerAppSelect from './BeerAppSelect.vue';

interface LanguageSwitchEmits {
  (event: 'language-switch', activeLanguage: Language): void;
}

const emit = defineEmits<LanguageSwitchEmits>();

const LANGUAGE_SELECT_ID = 'languageSelect';
const LANGUAGE_SELECT_LABEL = 'HEADER.LANGUAGE_SWITCH_LABEL';

const onLanguageSwitch = (activeLanguage: unknown): void => {
  emit('language-switch', activeLanguage as Language);
};
</script>
