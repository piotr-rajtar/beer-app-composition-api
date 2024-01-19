import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import { SelectOrientation } from '../../../typings';

import BeerAppSelect from '../BeerAppSelect.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('BeerAppSelect.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(BeerAppSelect, {
      props: {
        id: 'selectId',
        defaultValue: '',
        label: 'Label',
        options: [],
        orientation: SelectOrientation.HORIZONTAL,
      },
    });
  });

  it('renders properly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('displays correct label', () => {
    const label = wrapper.find('[test-id="selectLabel"]');

    expect(label.text()).toBe('Label');
  });

  it('emits select event on select option change', () => {
    const select = wrapper.find('[test-id="select"]');
    select.trigger('change');

    expect(wrapper.emitted()).toHaveProperty('select');
  });
});
