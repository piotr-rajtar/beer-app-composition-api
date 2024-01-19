import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import App from '../App.vue';

describe('App.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(App);
    expect(wrapper).toBeTruthy();
  });
});
