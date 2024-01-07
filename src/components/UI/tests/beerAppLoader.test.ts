import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import BeerAppLoader from '../BeerAppLoader.vue';

describe('BeerAppLoader.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(BeerAppLoader);
    expect(wrapper).toBeTruthy();
  });
});
