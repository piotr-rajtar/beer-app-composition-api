<template>
  <BeerAppAlert :type="AlertType.WARNING" @close="onClose">
    <strong>{{ t('ALERT.WARNING') }}</strong> {{ t('ALERT.SORTING_WARNING') }}
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
