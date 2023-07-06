<template>
  <BeerAppAlert v-if="isAlertVisible" :type="AlertType.ERROR" @close="onClose">
    <strong>{{ t('ALERT.ERROR') }}</strong> {{ t('ALERT.FETCH_ERROR') }}
  </BeerAppAlert>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import { useBeerStore } from '../../stores/beer.store';
import { AlertType } from '../../typings/global.types';

const { t } = useI18n();

const { isFetchError } = storeToRefs(useBeerStore());

import BeerAppAlert from './BeerAppAlert.vue';

const isAlertVisible = ref(isFetchError);

const onClose = () => (isAlertVisible.value = false);
</script>
