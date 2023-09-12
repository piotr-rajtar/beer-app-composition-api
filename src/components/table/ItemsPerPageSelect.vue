<template>
  <BeerAppSelect
    :id="SELECT_ID"
    :default-value="DEFAULT_ITEMS_PER_PAGE"
    :label="SELECT_LABEL"
    :options="ITEMS_PER_PAGE_OPTIONS"
    :orientation="SelectOrientation.HORIZONTAL"
    @select="onItemsNumberChange"
  />
</template>

<script lang="ts" setup>
import { DEFAULT_ITEMS_PER_PAGE } from '../../const/beer-store.const';
import { ITEMS_PER_PAGE_OPTIONS } from '../../const/table.const';
import { SelectOrientation } from '../../typings';

import { BeerAppSelect } from '../UI';

const emit = defineEmits<{
  (event: 'items-number-change', itemsNumber: number): void;
}>();

const SELECT_ID = 'itemsPerPageSelect';
const SELECT_LABEL = 'TABLE_GENERAL.ROWS_NUMBER';

const onItemsNumberChange = (itemsNumber: unknown): void => {
  emit('items-number-change', itemsNumber as number);
};
</script>
