import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import SortWarningAlert from '../SortWarningAlert.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('SortWarningAlert.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(SortWarningAlert);
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
