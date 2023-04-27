<template>
  <div :class="style.container">
    <ArrowIcon
      :is-active="isSortAscendingActive"
      :type="ArrowIconType.UP"
      @click="onSortClick(SortDirection.ASC)"
    />
    <ArrowIcon
      :is-active="isSortDescendingActive"
      :type="ArrowIconType.DOWN"
      @click="onSortClick(SortDirection.DESC)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';

import { ArrowIconType, SortDirection } from '../../typings/table.types';
import type { SortBy, TableHeaderKey } from '../../typings/table.types';

import ArrowIcon from './ArrowIcon.vue';

interface SortButtonEmits {
  (event: 'sort', sortDirection: SortDirection): void,
}

const emit = defineEmits<SortButtonEmits>();

const props = defineProps<{
  headerKey: TableHeaderKey,
  sortBy: SortBy | null,
}>();

const { sortBy } = toRefs(props);

const sortDirection: Ref<SortDirection> = ref(SortDirection.NONE);

watch(sortBy, (currentColumn) => {
  if(currentColumn === props.headerKey) {
    return;
  }

  sortDirection.value = SortDirection.NONE;  
});

const isSortAscendingActive = computed(() => {
  return sortDirection.value === SortDirection.ASC;
});

const isSortDescendingActive = computed(() => {
  return sortDirection.value === SortDirection.DESC;
});

const onSortClick = (newSortDirection: SortDirection): void => {
  if(newSortDirection === sortDirection.value) {
    sortDirection.value = SortDirection.NONE;
  } else {
    sortDirection.value = newSortDirection;
  }
  
  emit('sort', sortDirection.value);
}
</script>

<style lang="scss" module="style">
@use '@/styles/spacings.scss';

.container {
  display: flex;
  flex-direction: column;
  gap: 2 * spacings.$spacing-unit;
  margin: spacings.$spacing-unit;
}
</style>