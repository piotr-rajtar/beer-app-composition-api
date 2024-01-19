import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useBeerStore, useTableStore } from '../../../stores';

import TablePagination from '../TablePagination.vue';

describe('TablePagination.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(TablePagination, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
  });

  it('renders properly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('emits prev-click event on prev button click', async () => {
    vi.useFakeTimers();

    const tableStore = useTableStore();
    tableStore.pageNumber = 2;

    await wrapper.vm.$nextTick();

    const prevButton = wrapper.find('[test-id="prevButton"]');
    prevButton.trigger('click');

    vi.advanceTimersByTime(300);

    expect(wrapper.emitted()).toHaveProperty('prev-click');
  });

  it('does not emit prev-click event on prev button click when page number is equal to 1', async () => {
    vi.useFakeTimers();

    const tableStore = useTableStore();
    tableStore.pageNumber = 1;

    await wrapper.vm.$nextTick();

    const prevButton = wrapper.find('[test-id="prevButton"]');
    prevButton.trigger('click');

    vi.advanceTimersByTime(300);

    expect(wrapper.emitted()).not.toHaveProperty('prev-click');
  });

  it('emits next-click event on next button click when next page is available', async () => {
    vi.useFakeTimers();

    const beerStore = useBeerStore();
    beerStore.isNextPageAvailable = true;

    await wrapper.vm.$nextTick();

    const nextButton = wrapper.find('[test-id="nextButton"]');
    nextButton.trigger('click');

    vi.advanceTimersByTime(300);

    expect(wrapper.emitted()).toHaveProperty('next-click');
  });

  it('does not emit next-click event on next button click when next page is not available', async () => {
    vi.useFakeTimers();

    const beerStore = useBeerStore();
    beerStore.isNextPageAvailable = false;

    await wrapper.vm.$nextTick();

    const nextButton = wrapper.find('[test-id="nextButton"]');
    nextButton.trigger('click');

    vi.advanceTimersByTime(300);

    expect(wrapper.emitted()).not.toHaveProperty('next-click');
  });

  it('sets disabled attribute on prev button when page number is equal to 1', async () => {
    const tableStore = useTableStore();
    tableStore.pageNumber = 1;

    await wrapper.vm.$nextTick();

    const prevButton = wrapper.find('[test-id="prevButton"]');

    expect(prevButton.attributes()['disabled']).toBe('true');
  });

  it('sets disabled attribute on next button when next page is not available', async () => {
    const beerStore = useBeerStore();
    beerStore.isNextPageAvailable = false;

    await wrapper.vm.$nextTick();

    const nextButton = wrapper.find('[test-id="nextButton"]');

    expect(nextButton.attributes()['disabled']).toBe('true');
  });
});
