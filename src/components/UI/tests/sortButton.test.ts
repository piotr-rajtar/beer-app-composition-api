/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import { SortDirection, TableHeaderKey } from '../../../typings';

import SortButton from '../SortButton.vue';

describe('SortButton.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(SortButton, {
      props: {
        headerKey: TableHeaderKey.ABV,
        sortBy: null,
      },
    });
  });

  it('renders properly', () => {
    expect(wrapper).toBeTruthy();
  });

  it(`emits sort event with SortDirection.ASC value on up button click,
     when curent sort direction is different than SortDirection.ASC`, () => {
    const upButton = wrapper.find('[test-id="upButton"]');
    upButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('sort');
    expect(wrapper.emitted()['sort'][0]).toEqual([SortDirection.ASC]);
  });

  it(`emits sort event with SortDirection.NONE value on up button click,
     when curent sort direction is equal SortDirection.ASC`, async () => {
    (wrapper.vm as any).sortDirection = SortDirection.ASC;

    await wrapper.vm.$nextTick();

    const upButton = wrapper.find('[test-id="upButton"]');
    upButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('sort');
    expect(wrapper.emitted()['sort'][0]).toEqual([SortDirection.NONE]);
  });

  it(`emits sort event with SortDirection.DESC value on down button click,
     when curent sort direction is different than SortDirection.DESC`, () => {
    const downButton = wrapper.find('[test-id="downButton"]');
    downButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('sort');
    expect(wrapper.emitted()['sort'][0]).toEqual([SortDirection.DESC]);
  });

  it(`emits sort event with SortDirection.NONE value on down button click,
     when curent sort direction is equal SortDirection.DESC`, async () => {
    (wrapper.vm as any).sortDirection = SortDirection.DESC;

    await wrapper.vm.$nextTick();

    const downButton = wrapper.find('[test-id="downButton"]');
    downButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('sort');
    expect(wrapper.emitted()['sort'][0]).toEqual([SortDirection.NONE]);
  });

  it(`sets isActive attribute value on upButton to true,
     when current sort direction is equal SortDirection.ASC`, async () => {
    const upButton = wrapper.find('[test-id="upButton"]');
    const downButton = wrapper.find('[test-id="downButton"]');
    upButton.trigger('click');

    await wrapper.vm.$nextTick();

    expect(upButton.attributes()['isactive']).toBe('true');
    expect(downButton.attributes()['isactive']).toBe('false');
  });

  it(`sets isActive attribute value on downButton to true,
     when current sort direction is equal SortDirection.DESC`, async () => {
    const downButton = wrapper.find('[test-id="downButton"]');
    const upButton = wrapper.find('[test-id="upButton"]');

    downButton.trigger('click');

    await wrapper.vm.$nextTick();

    expect(downButton.attributes()['isactive']).toBe('true');
    expect(upButton.attributes()['isactive']).toBe('false');
  });

  it(`sets isActive attribute value on both buttons to false,
     when current sort direction is equal SortDirection.NONE`, () => {
    const downButton = wrapper.find('[test-id="downButton"]');
    const upButton = wrapper.find('[test-id="upButton"]');

    expect(downButton.attributes()['isactive']).toBe('false');
    expect(upButton.attributes()['isactive']).toBe('false');
  });

  it(`sets sort direction to SortDirection.NONE on sortBy change, 
     when sortedColumn is different than current element column`, async () => {
    (wrapper.vm as any).sortDirection = SortDirection.ASC;

    await wrapper.vm.$nextTick();

    wrapper.setProps({ sortBy: TableHeaderKey.EBC });

    await wrapper.vm.$nextTick();

    expect((wrapper.vm as any).sortDirection).toBe(SortDirection.NONE);
  });

  it(`does not change sort direction on sortBy change, 
     when sortedColumn is current element column`, async () => {
    (wrapper.vm as any).sortDirection = SortDirection.ASC;

    await wrapper.vm.$nextTick();

    wrapper.setProps({ sortBy: TableHeaderKey.ABV });

    await wrapper.vm.$nextTick();

    expect((wrapper.vm as any).sortDirection).toBe(SortDirection.ASC);
  });
});
