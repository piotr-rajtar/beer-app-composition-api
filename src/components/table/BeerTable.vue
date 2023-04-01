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
      <tr>
        <td>
          <!-- CELL CONTENT -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { TABLE_HEADERS } from '../../const/table.const';

const { t } = useI18n();
</script>

<style lang="scss" module="style"></style>