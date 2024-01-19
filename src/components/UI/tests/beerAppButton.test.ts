import { beforeEach, describe, expect, it } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import BeerAppButton from '../BeerAppButton.vue';

describe('BeerAppButton.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(BeerAppButton, {
      slots: { default: 'Content' },
    });
  });

  it('renders correctly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('displays slot content', () => {
    expect(wrapper.text()).toBe('Content');
  });
});
