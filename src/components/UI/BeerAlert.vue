<template>
  <BeerAppAlert :type="type" @close="onClose">
    <slot />
  </BeerAppAlert>
</template>

<script lang="ts" setup>
import type { AlertType } from '../../typings/global.types';

import BeerAppAlert from './BeerAppAlert.vue';

defineProps<{
  type: AlertType;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const onClose = () => emit('close');
</script>
