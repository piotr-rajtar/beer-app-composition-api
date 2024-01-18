import { describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import TableNavigation from '../TableNavigation.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('TableNavigation.vue', () => {
  let wrapper: VueWrapper;

  it('renders correctly', () => {
    wrapper = shallowMount(TableNavigation);
    expect(wrapper).toBeTruthy();
  });

  it('emits navigation-type-change event on navigation type change', () => {
    const input = wrapper.find('[test-id="navigationTypeInput"]');
    input.trigger('change');

    expect(wrapper.emitted()).toHaveProperty('navigation-type-change');
  });
});
