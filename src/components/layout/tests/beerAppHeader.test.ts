import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import BeerAppHeader from '../BeerAppHeader.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('BeerAppHeader.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(BeerAppHeader);
    expect(wrapper).toBeTruthy();
  });
});
