<template>
  <BeerAppButton :disabled="!isNextPageAvailable" @click="debouncedOnLoadMore">
    {{ t('TABLE_NAVIGATION.LOAD_MORE') }}
  </BeerAppButton>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { debounce } from 'lodash';

import { useBeerStore } from '../../stores/beer.store';

import { BeerAppButton } from '../UI';

const emit = defineEmits<{
  (event: 'load-more'): void;
}>();

const { isNextPageAvailable } = storeToRefs(useBeerStore());

const { t } = useI18n();

const onLoadMore = () => {
  if (!isNextPageAvailable.value) {
    return;
  }
  emit('load-more');
};

const debouncedOnLoadMore = debounce(onLoadMore, 300);
</script>
