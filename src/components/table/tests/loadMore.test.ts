import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useBeerStore } from '../../../stores';

import LoadMore from '../LoadMore.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('LoadMore.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(LoadMore, {
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

  it('emits loadMore event on button click when next page is available', async () => {
    vi.useFakeTimers();

    const store = useBeerStore();
    store.isNextPageAvailable = true;

    await wrapper.vm.$nextTick();

    const beerAppButton = wrapper.find('[test-id="beerAppButton"]');
    beerAppButton.trigger('click');

    vi.advanceTimersByTime(400);

    expect(wrapper.emitted()).toHaveProperty('load-more');
  });

  it('does not emit loadMore event on button click when next page is not available', async () => {
    vi.useFakeTimers();

    const store = useBeerStore();
    store.isNextPageAvailable = false;

    await wrapper.vm.$nextTick();

    const beerAppButton = wrapper.find('[test-id="beerAppButton"]');
    beerAppButton.trigger('click');

    vi.advanceTimersByTime(400);

    expect(wrapper.emitted()).not.toHaveProperty('load-more');
  });

  it('disables BeerAppButton when next page is not available', async () => {
    const store = useBeerStore();
    store.isNextPageAvailable = false;

    await wrapper.vm.$nextTick();

    const beerAppButton = wrapper.find('[test-id="beerAppButton"]');

    expect(beerAppButton.attributes()['disabled']).toBe('true');
  });
});
