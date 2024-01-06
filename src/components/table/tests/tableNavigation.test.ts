import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import TableNavigation from '../TableNavigation.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('TableNavigation.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(TableNavigation);
    expect(wrapper).toBeTruthy();
  });
});
