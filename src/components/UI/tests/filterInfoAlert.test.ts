import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import FilterInfoAlert from '../FilterInfoAlert.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('FilterInfoAlert.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(FilterInfoAlert);
  });

  it('renders properly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('emits close event', () => {
    const alert = wrapper.find('[test-id="beerAppAlert"]');
    alert.trigger('close');

    expect(wrapper.emitted()).toHaveProperty('close');
  });
});
