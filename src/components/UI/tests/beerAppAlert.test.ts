import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import { AlertType } from '../../../typings';

import BeerAppAlert from '../BeerAppAlert.vue';

describe('BeerAppAlert.vue', () => {
  const wrapper = shallowMount(BeerAppAlert, {
    props: {
      type: AlertType.ERROR,
    },
    slots: { default: 'Content' },
  });

  it('renders correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('emits close event after close icon click', () => {
    const closeIcon = wrapper.find('[test-id="closeIcon"]');
    closeIcon.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('close');
  });

  it('displays slot content', () => {
    const alertParagraph = wrapper.find('[test-id="alertParagraph"]');

    expect(alertParagraph.text()).toBe('Content');
  });
});
