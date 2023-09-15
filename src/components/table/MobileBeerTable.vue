<template>
  <table :id="BEER_TABLE_ID" :class="style.table">
    <caption :id="BEER_TABLE_CAPTION_ID" :class="style.caption">
      {{
        t('TABLE_GENERAL.CAPTION')
      }}
    </caption>

    <tbody :class="style.tableBody">
      <tr v-for="beer in beers" :key="beer.id" :class="style.tableRow">
        <td :class="style.tableCell">
          <div
            v-for="header in TABLE_HEADERS"
            :key="`${header.key}_${beer.id}`"
          >
            <p :class="style.cellHeader">{{ t(header.label) }}</p>

            <p :class="style.cellValue">
              <template v-if="header.key !== TableHeaderKey.MORE">
                {{ beer[header.key] || '-' }}
              </template>

              <template v-else>
                {{ t('TABLE_BODY.MORE') }}
              </template>
            </p>
          </div>
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
} from '../../const';
import { TableHeaderKey } from '../../typings';
import type { SimplifiedBeer } from '../../typings';

defineProps<{
  beers: SimplifiedBeer[];
}>();

const { t } = useI18n();
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/fonts.scss';
@use '@/styles/spacings.scss';

.table {
  width: 100%;

  margin-bottom: 10 * spacings.$spacing-unit;
}

.caption {
  padding: 2 * spacings.$spacing-unit;

  font-style: italic;
  caption-side: bottom;
  color: colors.$gray;
  text-align: right;
  letter-spacing: 1px;
}

.tableBody {
  display: flex;
  flex-direction: column;
}

.tableRow {
  display: flex;
  flex-direction: column;

  &:last-child {
    border-bottom: spacings.$border-width solid colors.$yellow-dark;
  }

  &:nth-child(even) {
    background-color: colors.$yellow-light-01;
  }
}

.tableCell {
  border: spacings.$border-width solid colors.$yellow-dark;
  border-bottom: transparent;
  padding: 2 * spacings.$spacing-unit;
}

.cellHeader {
  margin: 0;

  font-size: fonts.$font-size-s;
  font-weight: fonts.$font-bold;
  line-height: 2em;
}

.cellValue {
  margin: 0;

  line-height: 1.5em;
}
</style>
