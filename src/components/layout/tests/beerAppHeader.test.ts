import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

import BeerAppHeader from '../BeerAppHeader.vue';

describe('BeerAppHeader.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(BeerAppHeader);
    expect(wrapper).toBeTruthy();
  });
});
