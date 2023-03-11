<script setup lang="ts">
import { RouterView } from 'vue-router'

import BeerAppHeader from './components/layout/BeerAppHeader.vue';
</script>

<template>
  <BeerAppHeader />
  <RouterView />
</template>

<style lang="scss" module="style">
@use '@/styles/fonts.scss';

* {
  font-family: fonts.$font-default;
}
</style>
