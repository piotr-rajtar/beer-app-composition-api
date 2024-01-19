import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import FetchErrorAlert from '../FetchErrorAlert.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('FetchErrorAlert.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(FetchErrorAlert);
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
