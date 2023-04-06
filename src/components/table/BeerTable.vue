<template>
  <table :class="style.table">
    <caption :class="style.caption">{{ t('TABLE_GENERAL.CAPTION') }}</caption>
    <thead :class="style.tableHeader">
      <tr>
        <th
          v-for="header in TABLE_HEADERS"
          :key="header.key"
          :class="[style.cell, style.headerCell]"
          scope="col"
        >
          {{ t(header.label) }}
          <!--SORT BUTTON-->
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
        <td :class="[style.cell, style.bodyCell]">{{ t('TABLE_BODY.MORE') }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { TABLE_HEADERS } from '../../const/table.const';
import type { SimplifiedBeer } from '../../typings/beer-store.types';

defineProps<{
  beers: SimplifiedBeer[];
}>();

const { t } = useI18n();
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
}

.headerCell {
  background: linear-gradient(colors.$yellow-light-01, colors.$yellow-light-03);

  border: spacings.$table-border solid colors.$yellow-dark;

  letter-spacing: 2px;
}

.bodyCell {
  border: 3px solid colors.$yellow-dark;

  letter-spacing: 1px;
}
</style>