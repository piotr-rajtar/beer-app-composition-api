<template>
  <div>
    <label for="languageSwitch">{{ t('HEADER.LANGUAGE_SWITCH_LABEL') }}</label>
    <select 
      id="languageSwitch" 
      v-model="activeLanguage"
      @change="onLanguageSwitch"
    >
      <option :value="Language.EN">{{ t('HEADER.LANGUAGE_EN') }}</option>
      <option :value="Language.PL">{{ t('HEADER.LANGUAGE_PL') }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';

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
</style>