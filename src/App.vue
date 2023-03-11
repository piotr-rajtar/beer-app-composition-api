<script setup lang="ts">
import { RouterView } from 'vue-router'

import BeerAppHeader from './components/BeerAppHeader.vue';
</script>

<template>
  <BeerAppHeader />
  <RouterView />
</template>

<style lang="scss" module="style">
* {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
