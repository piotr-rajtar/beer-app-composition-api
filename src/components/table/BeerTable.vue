<template>
  <table :id="BEER_TABLE_ID" :class="style.table">
    <caption :id="BEER_TABLE_CAPTION_ID" :class="style.caption">
      {{ t('TABLE_GENERAL.CAPTION') }}
    </caption>
    <thead :class="style.tableHeader">
      <tr>
        <th
          v-for="header in TABLE_HEADERS"
          :key="header.key"
          :class="[style.cell, style.headerCell]"
          scope="col"
        >
          <div :class="style.headerCellGrid">
            <p :class="style.headerLabel">{{ t(header.label) }}</p>
            <div :class="style.sortButton">
              <SortButton
                v-if="header.key !== TableHeaderKey.MORE"
                :header-key="header.key"
                :sort-by="sortBy"
                @sort="onSortClick($event, header.key)"
              />
            </div>
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="beer in beers" :key="beer.id">
        <td
          v-for="key in Object.keys(beer)"
          :key="`${key}_${beer.id}`"
          :class="[style.cell, style.bodyCell]"
        >
          {{ beer[key as keyof SimplifiedBeer] || '-' }}
        </td>
        <td :class="[style.cell, style.bodyCell]">
          {{ t('TABLE_BODY.MORE') }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import {
  BEER_TABLE_CAPTION_ID,
  BEER_TABLE_ID,
  TABLE_HEADERS,
} from '../../const/table.const';
import type { SimplifiedBeer } from '../../typings/beer-store.types';
import { SortDirection, TableHeaderKey } from '../../typings/table.types';
import type { SortBy, SortOption } from '../../typings/table.types';

import SortButton from '../UI/SortButton.vue';

interface SortButtonEmits {
  (event: 'sort', sortOption: SortOption): void;
}

const emit = defineEmits<SortButtonEmits>();

defineProps<{
  beers: SimplifiedBeer[];
  sortBy: SortBy | null;
}>();

const { t } = useI18n();

const onSortClick = (
  sortDirection: SortDirection,
  headerKey: TableHeaderKey
) => {
  const sortBy: SortBy | null =
    sortDirection === SortDirection.NONE ? null : (headerKey as SortBy);

  const sortOption: SortOption = {
    sortBy,
    sortDirection,
  };

  emit('sort', sortOption);
};
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/spacings.scss';

.table {
  table-layout: fixed;
  width: 100%;

  margin-top: 10 * spacings.$spacing-unit;
  border-collapse: collapse;
  border: spacings.$table-border solid colors.$yellow-dark;
}

.caption {
  padding: 5 * spacings.$spacing-unit;

  font-style: italic;
  caption-side: bottom;
  color: colors.$gray;
  text-align: right;
  letter-spacing: 1px;
}

.tableHeader {
  text-shadow: 1px 1px 1px colors.$black;
}

.cell {
  padding: spacings.$spacing-unit;

  text-align: center;
  line-height: 1.5em;
  word-break: break-word;
}

.headerCell {
  background: linear-gradient(colors.$yellow-light-01, colors.$yellow-light-03);

  border: spacings.$table-border solid colors.$yellow-dark;

  letter-spacing: 2px;
}

.headerCellGrid {
  display: grid;
  grid-template-columns: 3.5fr 0.5fr;
}

.headerLabel,
.sortButton {
  place-self: center;
}

.bodyCell {
  height: 70px;

  border: 3px solid colors.$yellow-dark;

  letter-spacing: 1px;
}
</style>
