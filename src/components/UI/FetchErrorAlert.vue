<template>
  <BeerAppAlert :type="AlertType.ERROR" test-id="beerAppAlert" @close="onClose">
    <strong>{{ t('ALERT.ERROR') }}</strong> {{ t('ALERT.FETCH_ERROR') }}
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
