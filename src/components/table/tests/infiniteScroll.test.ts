import { beforeEach, describe, expect, it, vi, type SpyInstance } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useBeerStore } from '../../../stores';

import InfiniteScroll from '../InfiniteScroll.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

vi.mock('@/utils', () => ({ getInitialFetchQuantity: vi.fn() }));

describe('InfiniteScroll.vue', () => {
  let wrapper: VueWrapper;

  let addEventListenerSpy: SpyInstance;
  let removeEventListenerSpy: SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    wrapper = shallowMount(InfiniteScroll, {
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

  it('adds scroll event listener on component mount', () => {
    expect(addEventListenerSpy).toHaveBeenCalled();
  });

  it('emits loadMore event on scroll when not all data is fetched', () => {
    const store = useBeerStore();
    store.isNextPageAvailable = true;

    window.dispatchEvent(new Event('scroll'));

    expect(wrapper.emitted()).toHaveProperty('load-more');
  });

  it('does not emit loadMore event on scroll when all data is fetched', () => {
    const store = useBeerStore();
    store.isNextPageAvailable = false;

    window.dispatchEvent(new Event('scroll'));

    expect(wrapper.emitted()).not.toHaveProperty('load-more');
  });

  it('removes scroll event listener on component unmount', () => {
    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it('removes scroll event listener when all data was fetched', async () => {
    const store = useBeerStore();
    store.isNextPageAvailable = false;

    await wrapper.vm.$nextTick();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
