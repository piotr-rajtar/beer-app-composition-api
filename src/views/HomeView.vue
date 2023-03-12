<template>
  <h2 :class="style.header">Beer catalogue browser</h2>
  <section :class="style.sectionContainer">
    <BeerAppButton @click="debouncedOnLoadInitialData">{{ beerButtonCaption }}</BeerAppButton>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { debounce } from 'lodash'

import BeerAppButton from '../components/UI/BeerAppButton.vue'
import BeerAppLoader from '../components/UI/BeerAppLoader.vue'
import { useBeerStore } from '../stores/beer'
import { SortDirection } from '../typings/typings'
import type { SortBy, QueryParams } from '../typings/typings'

const store = useBeerStore();

const pageNumber = ref(1);
const sortBy: Ref<SortBy | null> = ref(null);
const sortDirection: Ref<SortDirection> = ref(SortDirection.NONE);
const wasBeerButtonEverClicked = ref(false);

const beerButtonCaption = computed(() => {
  return wasBeerButtonEverClicked.value
    ? 'Reset to initial state'
    : 'Start browsing'
})

const queryParams: ComputedRef<QueryParams> = computed(() => ({
  page: pageNumber
}));


const setTableInitialState = (): void => {
  sortBy.value = null
  sortDirection.value = SortDirection.NONE
  pageNumber.value = 1
}

const onLoadInitialData = async (): Promise<void> => {
  await store.loadInitialBeersData(queryParams)
  wasBeerButtonEverClicked.value = !wasBeerButtonEverClicked.value;
}

const debouncedOnLoadInitialData = debounce(onLoadInitialData, 300)
</script>

<style lang="scss" module="style">
.header {
  text-align: center;
  text-decoration: underline;
  margin: 50px 0;
}

.sectionContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
