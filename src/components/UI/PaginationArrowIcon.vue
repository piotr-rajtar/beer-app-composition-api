<template>
  <i :class="[style.icon, style[arrowDirectionClass]]"></i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { PaginationArrowDirection } from '../../typings';

const props = defineProps<{
  type: PaginationArrowDirection;
}>();

const arrowDirectionClass = computed(() => {
  const arrowDirectionClass: { [key in PaginationArrowDirection]: string } = {
    [PaginationArrowDirection.LEFT]: 'arrowLeft',
    [PaginationArrowDirection.RIGHT]: 'arrowRight',
  };

  return arrowDirectionClass[props.type];
});
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';

$icon-thickness: 4px;
$icon-size: 4px;

.icon {
  display: inline-block;

  padding: $icon-size;

  border: solid colors.$black;
  border-width: 0 $icon-thickness $icon-thickness 0;
}

.arrowLeft {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.arrowRight {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
</style>
