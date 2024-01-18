/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import BeerTableContainer from '../BeerTableContainer.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(() => ({
    addEventListener: vi.fn(),
  })),
});

describe('BeerTableContainer.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(BeerTableContainer, {
      props: {
        beers: [],
        sortBy: null,
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('display BeerTable on desktop screen size', async () => {
    (wrapper.vm as any).isTabletScreen = false;

    await wrapper.vm.$nextTick();

    const beerTable = wrapper.find('[test-id="beerTable"]');

    expect(beerTable.exists()).toBe(true);
  });

  it('display MobileBeerTable on tablet screen sizes', async () => {
    (wrapper.vm as any).isTabletScreen = true;

    await wrapper.vm.$nextTick();

    const mobileBeerTable = wrapper.find('[test-id="mobileBeerTable"]');

    expect(mobileBeerTable.exists()).toBe(true);
  });
});
