import { beforeEach, describe, expect, it } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import LanguageSwitch from '../LanguageSwitch.vue';

describe('LanguageSwitch.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(LanguageSwitch);
  });

  it('renders correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('emits language-switch event', () => {
    const beerAppSelect = wrapper.find('[test-id="beerAppSelect"]');
    beerAppSelect.trigger('select');

    expect(wrapper.emitted()).toHaveProperty('language-switch');
  });
});
