<template>
  <BeerAppButton 
    :disabled="!isNextPageAvailable" 
    @click="debouncedOnLoadMore"
  >
    {{ t('TABLE_NAVIGATION.LOAD_MORE') }}
  </BeerAppButton>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { debounce } from 'lodash';

import { useBeerStore } from '../../stores/beer.store';

import BeerAppButton from '../UI/BeerAppButton.vue';

interface Emits {
  (event: 'load-more'): void;
}

const emit = defineEmits<Emits>();

const { isNextPageAvailable } = storeToRefs(useBeerStore());

const { t } = useI18n();

const onLoadMore = () => {
  if(!isNextPageAvailable.value) {
    return;
  }
  emit('load-more');
};

const debouncedOnLoadMore = debounce(onLoadMore, 300);
</script>