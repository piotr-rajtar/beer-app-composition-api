import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import MobileBeerTable from '../MobileBeerTable.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

describe('MobileBeerTable.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(MobileBeerTable, {
      props: {
        beers: [],
      },
    });
    expect(wrapper).toBeTruthy();
  });
});
