import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import BeerAppButton from '../BeerAppButton.vue';

describe('BeerAppButton.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(BeerAppButton);
    expect(wrapper).toBeTruthy();
  });
});
