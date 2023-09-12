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
import { Language, SelectOrientation } from '../../typings';

import { BeerAppSelect } from './';

const emit = defineEmits<{
  (event: 'language-switch', activeLanguage: Language): void;
}>();

const LANGUAGE_SELECT_ID = 'languageSelect';
const LANGUAGE_SELECT_LABEL = 'HEADER.LANGUAGE_SWITCH_LABEL';

const onLanguageSwitch = (activeLanguage: unknown): void => {
  emit('language-switch', activeLanguage as Language);
};
</script>
