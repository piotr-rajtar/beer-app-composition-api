<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="header in TABLE_HEADERS"
          :key="header.key"
        >
          {{ t(header.label) }}
          <!--SORT BUTTON-->
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="beer in beers" :key="beer.id">
        <td v-for="key in Object.keys(beer)" :key="`${key}_${beer.id}`">
          {{ beer[key as keyof SimplifiedBeer] || '-' }}
        </td>
        <td>{{ t('TABLE_BODY.MORE') }}</td>
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

<style lang="scss" module="style"></style>