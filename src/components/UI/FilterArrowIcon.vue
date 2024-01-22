<template>
  <div :class="style.iconContainer">
    <i :class="[style.icon, style[arrowDirectionClass]]" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { ArrowDirection } from '../../typings';

const props = defineProps<{
  direction: ArrowDirection;
}>();

const arrowDirectionClass = computed(() => {
  const arrowDirectionClass: { [key in ArrowDirection]: string } = {
    [ArrowDirection.UP]: 'arrowUp',
    [ArrowDirection.DOWN]: 'arrowDown',
  };

  return arrowDirectionClass[props.direction];
});
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';

$icon-container-size: 12px;
$icon-thickness: 4px;
$icon-size: 4px;

.iconContainer {
  width: $icon-container-size;
  height: $icon-container-size;

  line-height: 0;

  cursor: pointer;
}

.icon {
  display: inline-block;

  padding: $icon-size;

  border: solid colors.$black;
  border-width: 0 $icon-thickness $icon-thickness 0;
}

.arrowUp {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.arrowDown {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
