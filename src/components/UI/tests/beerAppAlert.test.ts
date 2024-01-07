import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import BeerAppAlert from '../BeerAppAlert.vue';
import { AlertType } from '@/typings';

describe('BeerAppAlert.vue', () => {
  const wrapper = shallowMount(BeerAppAlert, {
    props: {
      type: AlertType.ERROR,
    },
  });

  it('renders correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('emits close event after close icon click', () => {
    const closeIcon = wrapper.find('[test-id="closeIcon"]');
    closeIcon.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('close');
  });
});
