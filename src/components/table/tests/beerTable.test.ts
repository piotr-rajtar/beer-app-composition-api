import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import BeerTable from '../BeerTable.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('BeerTable.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(BeerTable, {
      props: {
        beers: [],
        sortBy: null,
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('emits sort event on SortButton click', () => {
    const sortButton = wrapper.find('[test-id="sortButton"]');
    sortButton.trigger('sort');

    expect(wrapper.emitted()).toHaveProperty('sort');
  });
});
