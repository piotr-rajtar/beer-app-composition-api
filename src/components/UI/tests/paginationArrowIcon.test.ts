import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import { PaginationArrowDirection } from '../../../typings';

import PaginationArrowIcon from '../PaginationArrowIcon.vue';

describe('PaginationArrowIcon.vue', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(PaginationArrowIcon, {
      props: {
        type: PaginationArrowDirection.LEFT,
      },
    });
    expect(wrapper).toBeTruthy();
  });
});
