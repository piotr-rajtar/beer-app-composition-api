<template>
  <h2 :class="style.header">Beer catalogue browser</h2>
  <section :class="style.sectionContainer">
    <BeerAppButton @click="debouncedOnLoadInitialData">Start browsing</BeerAppButton>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { debounce } from 'lodash'

import BeerAppButton from '../components/UI/BeerAppButton.vue'
import { useBeerStore } from '../stores/beer'
import { SortDirection } from '../typings/typings'
import type { SortBy, QueryParams } from '../typings/typings'

const store = useBeerStore()

const pageNumber = ref(1)

const queryParams: ComputedRef<QueryParams> = computed(() => ({
  page: pageNumber
}));

const sortBy: Ref<SortBy | null> = ref(null)
const sortDirection: Ref<SortDirection> = ref(SortDirection.NONE)

const setTableInitialState = (): void => {
  sortBy.value = null
  sortDirection.value = SortDirection.NONE
  pageNumber.value = 1
}

const onLoadInitialData = async (): Promise<void> => {
  await store.loadInitialBeersData(queryParams)
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
  justify-content: center;
}
</style>
