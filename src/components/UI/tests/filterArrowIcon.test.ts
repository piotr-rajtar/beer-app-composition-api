import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import { ArrowDirection } from '../../../typings';

import FilterArrowIcon from '../FilterArrowIcon.vue';

describe('FilterArrowIcon.vue', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(FilterArrowIcon, {
      props: { direction: ArrowDirection.DOWN },
    });
    expect(wrapper).toBeTruthy();
  });
});
