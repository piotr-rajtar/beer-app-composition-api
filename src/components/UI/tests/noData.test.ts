import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import NoData from '../NoData.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('NoData.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(NoData);
    expect(wrapper).toBeTruthy();
  });
});
