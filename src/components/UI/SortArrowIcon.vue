<template>
  <div :class="style.iconContainer">
    <i
      :class="[
        style.icon,
        { [style.active]: isActive },
        style[arrowDirectionClass],
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { SortArrowDirection } from '../../typings/table.types';

const props = defineProps<{
  isActive: boolean;
  type: SortArrowDirection;
}>();

const arrowDirectionClass = computed(() => {
  const arrowDirectionClass: { [key in SortArrowDirection]: string } = {
    [SortArrowDirection.UP]: 'arrowUp',
    [SortArrowDirection.DOWN]: 'arrowDown',
  };

  return arrowDirectionClass[props.type];
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

  border: solid colors.$gray;
  border-width: 0 $icon-thickness $icon-thickness 0;
}

.active {
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
