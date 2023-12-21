import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import BeerTable from '../BeerTable.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('BeerTable.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(BeerTable);
    expect(wrapper).toBeTruthy();
  });
});
