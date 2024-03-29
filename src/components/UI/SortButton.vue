<template>
  <div :class="style.container">
    <SortArrowIcon
      :is-active="isSortAscendingActive"
      :type="ArrowDirection.UP"
      test-id="upButton"
      @click="onSortClick(SortDirection.ASC)"
    />
    <SortArrowIcon
      :is-active="isSortDescendingActive"
      :type="ArrowDirection.DOWN"
      test-id="downButton"
      @click="onSortClick(SortDirection.DESC)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';

import { ArrowDirection, SortDirection } from '../../typings';
import type { SortBy, TableHeaderKey } from '../../typings';

import { SortArrowIcon } from './';

const emit = defineEmits<{
  (event: 'sort', sortDirection: SortDirection): void;
}>();

const props = defineProps<{
  headerKey: TableHeaderKey;
  sortBy: SortBy | null;
}>();

const { sortBy } = toRefs(props);

const sortDirection: Ref<SortDirection> = ref(SortDirection.NONE);

watch(sortBy, (currentColumn) => {
  if (currentColumn === props.headerKey) {
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
  if (newSortDirection === sortDirection.value) {
    sortDirection.value = SortDirection.NONE;
  } else {
    sortDirection.value = newSortDirection;
  }

  emit('sort', sortDirection.value);
};
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
