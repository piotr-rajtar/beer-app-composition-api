<template>
  <BeerAppHeader />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { BeerAppHeader } from './components';
</script>

<style lang="scss" module="style">
@use '@/styles/fonts.scss';

*,
*:before,
*:after {
  box-sizing: border-box;
  font-family: fonts.$font-default;
  scroll-behavior: smooth;
}
</style>
