import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import BeerTableContainer from '../BeerTableContainer.vue';

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('BeerTableContainer.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(BeerTableContainer, {
      props: {
        beers: [],
        sortBy: null,
      },
    });
    expect(wrapper).toBeTruthy();
  });
});
