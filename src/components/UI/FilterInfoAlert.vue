<template>
  <BeerAppAlert :type="AlertType.INFO" test-id="beerAppAlert" @close="onClose">
    {{ t('ALERT.FILTER_INFO') }}
  </BeerAppAlert>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { AlertType } from '../../typings';

import { BeerAppAlert } from './';

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const { t } = useI18n();

const onClose = () => emit('close');
</script>
