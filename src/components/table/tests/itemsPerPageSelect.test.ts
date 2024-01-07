import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import ItemsPerPageSelect from '../ItemsPerPageSelect.vue';

describe('ItemsPerPageSelect.vue', () => {
  const wrapper = shallowMount(ItemsPerPageSelect);

  it('renders correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('emits items-number-change event after items per page select', () => {
    const select = wrapper.find('[test-id="itemsPerPageSelect"]');
    select.trigger('select');

    expect(wrapper.emitted()).toHaveProperty('items-number-change');
  });
});
