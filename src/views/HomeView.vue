<script lang="ts" setup>
import BeerAppButton from '../components/UI/BeerAppButton.vue';
</script>

<template>
  <h2 :class="style.header">Beer catalogue browser</h2>
  <section :class="style.sectionContainer">
    <BeerAppButton>Start browsing</BeerAppButton>
  </section>
</template>

<style lang="scss" module="style">

.header {
  text-align: center;
  text-decoration: underline;
  margin: 50px 0;
}

.sectionContainer {
  display: flex;
  justify-content: center;
}
</style>