import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import { SortArrowDirection } from '../../../typings';

import SortArrowIcon from '../SortArrowIcon.vue';

describe('SortArrowIcon.vue', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(SortArrowIcon, {
      props: {
        isActive: true,
        type: SortArrowDirection.DOWN,
      },
    });
    expect(wrapper).toBeTruthy();
  });
});
