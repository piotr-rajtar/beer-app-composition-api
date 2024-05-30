/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';

import { useBeerStore } from '../beer.store';

import { mockedBeerData } from './mockedBeerData';

vi.mock('axios');

describe('Beer Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('clears beer state', async () => {
    const beerStore = useBeerStore();
    (axios.get as any).mockResolvedValue({ data: mockedBeerData });

    await beerStore.loadInitialBeerData();

    beerStore.clearBeersState();

    expect(beerStore.areAnyBeersFetched).toBe(false);
  });

  it('sets isNextPageAvailable value to true if next page is available', async () => {
    const beerStore = useBeerStore();
    (axios.get as any).mockResolvedValue({ data: mockedBeerData });

    await beerStore.loadInitialBeerData();

    expect(beerStore.isNextPageAvailable).toBe(true);
  });

  it('sets isNextPageAvailable value to false if next page is not available', async () => {
    const beerStore = useBeerStore();
    (axios.get as any).mockResolvedValue({ data: [] });

    await beerStore.loadInitialBeerData();

    expect(beerStore.isNextPageAvailable).toBe(false);
  });

  it('loads initial beer data', async () => {
    const beerStore = useBeerStore();
    (axios.get as any).mockResolvedValue({ data: mockedBeerData });

    await beerStore.loadInitialBeerData();

    expect(beerStore.areAnyBeersFetched).toBe(true);
    expect(beerStore.simplifiedBeersDataWithNoPagination.length).toBe(2);
  });

  it('loades more beer data', async () => {
    const beerStore = useBeerStore();
    (axios.get as any).mockResolvedValue({ data: mockedBeerData });

    await beerStore.loadMoreBeerData();

    expect(beerStore.areAnyBeersFetched).toBe(true);
    expect(beerStore.simplifiedBeersDataWithNoPagination.length).toBe(2);
  });

  it('returns correct isFetchError value when error during fetch occurs', async () => {
    const beerStore = useBeerStore();
    (axios.get as any).mockRejectedValue(new Error('Fetch error'));

    await expect(beerStore.loadInitialBeerData()).rejects.toThrowError();
  });

  it('clears filters', () => {
    const beerStore = useBeerStore();

    beerStore.areFiltersApply = true;
    beerStore.appliedFilters = { food: 'apple_pie' };

    beerStore.clearFilters();

    expect(beerStore.areFiltersApply).toBe(false);
    expect(beerStore.appliedFilters).toEqual({});
  });
});
