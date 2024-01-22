import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import { ArrowDirection } from '../../../typings';

import SortArrowIcon from '../SortArrowIcon.vue';

describe('SortArrowIcon.vue', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(SortArrowIcon, {
      props: {
        isActive: true,
        type: ArrowDirection.DOWN,
      },
    });
    expect(wrapper).toBeTruthy();
  });
});
