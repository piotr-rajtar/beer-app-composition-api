<template>
  <div :class="style.container">
    <label 
      :class="style.label" 
      for="languageSwitch"
    >
      {{ t('HEADER.LANGUAGE_SWITCH_LABEL') }}
    </label>
    <div :class="style.selectContainer">
      <select 
        id="languageSwitch" 
        v-model="activeLanguage"
        :class="style.select"
        @change="onLanguageSwitch"
      >
        <option 
          v-for="language in LANGUAGE_OPTIONS" 
          :key="language.id"
          :value="language.id"
        >
          {{ t(language.label) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { LANGUAGE_OPTIONS } from '../../const/global.const';
import { Language } from '../../typings/global.types';

interface LanguageSwitchEmits {
  (event: 'language-switch', activeLanguage: Ref<Language>): void,
}

const emit = defineEmits<LanguageSwitchEmits>();

const { t } = useI18n();

const activeLanguage: Ref<Language> = ref(Language.EN);

const onLanguageSwitch = (): void => {
  emit('language-switch', activeLanguage);
}
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/fonts.scss';
@use '@/styles/spacings.scss';

.container {
  display: flex;
  flex-direction: column;
  gap: 2 * spacings.$spacing-unit;
  font-size: fonts.$font-size-l;
}

.label {
  text-align: center;
}

.selectContainer {
  display: grid;
  grid-template-areas: "select";
  align-items: center;

  min-width: 150px;
  border: spacings.$border-width solid colors.$black;
  border-radius: spacings.$spacing-unit;
  padding: spacings.$spacing-unit 2 * spacings.$spacing-unit;
  background: linear-gradient(to top, colors.$white-dark, colors.$white 33%);

  &::after {
    grid-area: select;
    justify-self: end;

    content: "";
    width: 1.2em;
    height: 0.6em;
    background-color: colors.$black;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  &:focus-within {
    outline: spacings.$border-width solid colors.$black;
    outline-offset: spacings.$border-width;
  }
}

.select {
  grid-area: select;

  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  padding: 0 1.2em 0 0;

  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  
  cursor: pointer;
}
</style>