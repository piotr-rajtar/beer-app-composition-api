/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useBeerStore, useTableStore } from '../../stores';
import { TableNavigator } from '../../typings';

import HomeView from '../HomeView.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('HomeView.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders properly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('calls clearBeersState action on mainBeerButton click when it was clicked already', async () => {
    const beerStore = useBeerStore();
    (wrapper.vm as any).wasBeerButtonEverClicked = true;

    await wrapper.vm.$nextTick();

    const mainBeerButton = wrapper.findComponent('[test-id="mainBeerButton"]');
    mainBeerButton.trigger('click');

    expect(beerStore.clearBeersState).toHaveBeenCalled();
  });

  it('calls setTableInitialState action on mainBeerButton click when it was clicked already', async () => {
    const tableStore = useTableStore();
    (wrapper.vm as any).wasBeerButtonEverClicked = true;

    await wrapper.vm.$nextTick();

    const mainBeerButton = wrapper.findComponent('[test-id="mainBeerButton"]');
    mainBeerButton.trigger('click');

    expect(tableStore.setTableInitialState).toHaveBeenCalled();
  });

  it('calls loadInitialBeerData on mainBeerButtonClick when it was not clicked yet', () => {
    const beerStore = useBeerStore();

    const mainBeerButton = wrapper.findComponent('[test-id="mainBeerButton"]');
    mainBeerButton.trigger('click');

    vi.advanceTimersByTime(300);

    expect(beerStore.loadInitialBeerData).toHaveBeenCalled();
  });

  it('shows fetchErrorAlert when fetch error occured', async () => {
    const beerStore = useBeerStore();
    beerStore.isFetchError = true;

    await wrapper.vm.$nextTick();

    const fetchErrorAlert = wrapper.find('[test-id="fetchErrorAlert"]');

    expect(fetchErrorAlert.exists()).toBe(true);
  });

  it('hides fetchErrorAlert on alert close', async () => {
    const beerStore = useBeerStore();
    beerStore.isFetchError = true;

    await wrapper.vm.$nextTick();

    wrapper.find('[test-id="fetchErrorAlert"]').trigger('close');

    await wrapper.vm.$nextTick();

    const fetchErrorAlert = wrapper.find('[test-id="fetchErrorAlert"]');

    expect(fetchErrorAlert.exists()).toBe(false);
  });

  it('shows sortWarningAlert when not all data was fetched', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (beerStore.areAllDataFetched as any) = false;

    await wrapper.vm.$nextTick();

    const sortWarningAlert = wrapper.find('[test-id="sortWarningAlert"]');

    expect(sortWarningAlert.exists()).toBe(true);
  });

  it('does not show sortWarningAlert when all data was fetched', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (beerStore.areAllDataFetched as any) = true;

    await wrapper.vm.$nextTick();

    const sortWarningAlert = wrapper.find('[test-id="sortWarningAlert"]');

    expect(sortWarningAlert.exists()).toBe(false);
  });

  it('hides sortWarningAlert on alert close', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (beerStore.areAllDataFetched as any) = false;

    await wrapper.vm.$nextTick();

    wrapper.find('[test-id="sortWarningAlert"]').trigger('close');

    await wrapper.vm.$nextTick();

    const sortWarningAlert = wrapper.find('[test-id="sortWarningAlert"]');

    expect(sortWarningAlert.exists()).toBe(false);
  });

  it('displays LoadMore component when loadMore table navigation was chosen', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (wrapper.vm as any).activeTableNavigator = TableNavigator.LOAD_MORE;

    await wrapper.vm.$nextTick();

    const loadMore = wrapper.find('[test-id="loadMore"]');
    expect(loadMore.exists()).toBe(true);
  });

  it('displays InfiniteScroll component when infiniteScroll table navigation was chosen', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (wrapper.vm as any).activeTableNavigator = TableNavigator.INFINITE_SCROLL;

    await wrapper.vm.$nextTick();

    const infiniteScroll = wrapper.find('[test-id="infiniteScroll"]');
    expect(infiniteScroll.exists()).toBe(true);
  });

  it('displays TablePagination component when pagination table navigation was chosen', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (wrapper.vm as any).activeTableNavigator = TableNavigator.PAGINATION;

    await wrapper.vm.$nextTick();

    const tablePagination = wrapper.find('[test-id="tablePagination"]');
    expect(tablePagination.exists()).toBe(true);
  });

  it('displays ItemsPerPageSelect component when pagination table navigation was chosen', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (wrapper.vm as any).activeTableNavigator = TableNavigator.PAGINATION;

    await wrapper.vm.$nextTick();

    const itemsPerPageSelect = wrapper.find('[test-id="itemsPerPageSelect"]');
    expect(itemsPerPageSelect.exists()).toBe(true);
  });

  it('displays BeerAppLoader component when data are loading', async () => {
    const beerStore = useBeerStore();
    beerStore.areDataLoading = true;

    await wrapper.vm.$nextTick();

    const beerAppLoader = wrapper.find('[test-id="beerAppLoader"]');

    expect(beerAppLoader.exists()).toBe(true);
  });

  it('displays NoData component when no beers was fetched', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = false;
    (wrapper.vm as any).wasBeerButtonEverClicked = true;

    await wrapper.vm.$nextTick();

    const noData = wrapper.find('[test-id="noData"]');

    expect(noData.exists()).toBe(true);
  });

  it('calls loadMoreBeerData action on loadMore button click', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (wrapper.vm as any).activeTableNavigator = TableNavigator.LOAD_MORE;

    await wrapper.vm.$nextTick();

    const loadMore = wrapper.find('[test-id="loadMore"]');
    loadMore.trigger('load-more');

    expect(beerStore.loadMoreBeerData).toHaveBeenCalled();
  });

  it('calls loadMoreBeerData action on pagination next button click', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (wrapper.vm as any).activeTableNavigator = TableNavigator.PAGINATION;

    await wrapper.vm.$nextTick();

    const tablePagination = wrapper.find('[test-id="tablePagination"]');
    tablePagination.trigger('next-click');

    expect(beerStore.loadMoreBeerData).toHaveBeenCalled();
  });

  it('calls loadMoreBeerData action on pagination prev button click', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (wrapper.vm as any).activeTableNavigator = TableNavigator.PAGINATION;

    await wrapper.vm.$nextTick();

    const tablePagination = wrapper.find('[test-id="tablePagination"]');
    tablePagination.trigger('prev-click');

    expect(beerStore.loadMoreBeerData).toHaveBeenCalled();
  });

  it('calls setTableInitialState action on items number per page change', async () => {
    const tableStore = useTableStore();
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (wrapper.vm as any).activeTableNavigator = TableNavigator.PAGINATION;

    await wrapper.vm.$nextTick();

    const itemsPerPageSelect = wrapper.find('[test-id="itemsPerPageSelect"]');
    itemsPerPageSelect.trigger('items-number-change');
    expect(tableStore.setTableInitialState).toHaveBeenCalled();
  });

  it('calls loadInitialBeerData action on items number per page change', async () => {
    const beerStore = useBeerStore();
    (beerStore.areAnyBeersFetched as any) = true;
    (wrapper.vm as any).activeTableNavigator = TableNavigator.PAGINATION;

    await wrapper.vm.$nextTick();

    const itemsPerPageSelect = wrapper.find('[test-id="itemsPerPageSelect"]');
    itemsPerPageSelect.trigger('items-number-change');
    expect(beerStore.loadInitialBeerData).toHaveBeenCalled();
  });
});
