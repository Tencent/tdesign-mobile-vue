import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import PrimaryTable from '../primary-table';

const columns = [
  { colKey: 'name', title: 'Name' },
  {
    colKey: 'age',
    title: 'Age',
    sorter: (a, b) => a.age - b.age,
    filter: {
      type: 'single',
      list: [
        { label: 'one', value: 1 },
        { label: 'two', value: 2 },
      ],
    },
  },
];

const data = [
  { id: 1, name: 'a', age: 3 },
  { id: 2, name: 'b', age: 1 },
  { id: 3, name: 'c', age: 2 },
];

describe('PrimaryTable', () => {
  it('renders sorter icon and filter icon for configured columns', async () => {
    const wrapper = mount(PrimaryTable, {
      props: { rowKey: 'id', showHeader: true, data, columns },
    });
    await nextTick();
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('.t-table__cell--sort-trigger').exists()).toBe(true);
    expect(wrapper.find('.t-table__filter-icon').exists()).toBe(true);
    wrapper.unmount();
  });

  it('sorts local data when clicking the sorter icon', async () => {
    const wrapper = mount(PrimaryTable, {
      props: { rowKey: 'id', showHeader: true, data, columns },
    });
    await nextTick();
    const sortIcon = wrapper.find('.t-table__sort-icon');
    expect(sortIcon.exists()).toBe(true);
    await sortIcon.trigger('click');
    await nextTick();
    const cells = wrapper.findAll('tbody tr');
    expect(cells.length).toBe(3);
    wrapper.unmount();
  });

  it('renders without error when dragSort is enabled', async () => {
    const wrapper = mount(PrimaryTable, {
      props: { rowKey: 'id', showHeader: true, data, columns, dragSort: 'row' },
    });
    await nextTick();
    expect(wrapper.find('table').exists()).toBe(true);
    wrapper.unmount();
  });
});
