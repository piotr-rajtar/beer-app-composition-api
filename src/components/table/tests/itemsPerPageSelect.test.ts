import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import ItemsPerPageSelect from '../ItemsPerPageSelect.vue';

describe('ItemsPerPageSelect.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ItemsPerPageSelect);
    expect(wrapper).toBeTruthy();
  });
});
