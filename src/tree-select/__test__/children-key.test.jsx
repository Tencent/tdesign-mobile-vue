import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import TreeSelect from '../index';
import { Checkbox } from '../../checkbox';
import { Radio } from '../../radio';

describe('TreeSelect children key', () => {
  const keys = { label: 'name', value: 'id', children: 'nodes' };
  const leaves = [
    { name: 'First leaf', id: 'first' },
    { name: 'Second leaf', id: 'second' },
  ];
  const options = [{ name: 'Parent', id: 'parent', nodes: leaves }];
  const nestedOptions = [{ name: 'Parent', id: 'parent', nodes: [{ name: 'Middle', id: 'middle', nodes: leaves }] }];
  let wrapper;

  afterEach(() => wrapper?.unmount());

  it.each([
    [options, ['parent', 'first'], 2],
    [nestedOptions, ['parent', 'middle', 'first'], 3],
  ])('renders every level using the children alias', (options, value, columns) => {
    const onChange = vi.fn();
    wrapper = mount(TreeSelect, { props: { options, value, keys, onChange } });

    expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(columns);
    expect(wrapper.text()).toContain('First leaf');
    expect(wrapper.text()).toContain('Second leaf');
    expect(onChange).not.toHaveBeenCalled();
    expect(wrapper.emitted('update:value')).toBeUndefined();
  });

  it('prefers the configured alias when both children fields exist', () => {
    wrapper = mount(TreeSelect, {
      props: {
        options: [
          {
            ...options[0],
            children: [{ name: 'Unmapped leaf', id: 'unmapped' }],
          },
        ],
        value: ['parent', 'first'],
        keys,
      },
    });

    expect(wrapper.text()).toContain('First leaf');
    expect(wrapper.text()).not.toContain('Unmapped leaf');
    expect(wrapper.findAllComponents(Radio)).toHaveLength(2);
  });

  it('uses canonical children when no children alias is configured', () => {
    wrapper = mount(TreeSelect, {
      props: {
        options: [{ name: 'Parent', id: 'parent', children: leaves }],
        value: ['parent', 'first'],
        keys: { label: 'name', value: 'id' },
      },
    });

    expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(2);
    expect(wrapper.text()).toContain('First leaf');
    expect(wrapper.findAllComponents(Radio)).toHaveLength(2);
  });

  it('preserves the selected path and emits the leaf level in single mode', async () => {
    const onChange = vi.fn();
    wrapper = mount(TreeSelect, {
      props: { options: nestedOptions, value: ['parent', 'middle', 'first'], keys, onChange },
    });
    const radios = wrapper.findAllComponents(Radio);
    expect(radios).toHaveLength(2);

    await radios[1].trigger('click');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(['parent', 'middle', 'second'], 2);
    expect(wrapper.emitted('update:value')).toEqual([[['parent', 'middle', 'second'], 2]]);
  });

  it('preserves multiple selections and emits the leaf level', async () => {
    const onChange = vi.fn();
    wrapper = mount(TreeSelect, {
      props: { options, value: ['parent', ['first']], keys, multiple: true, onChange },
    });
    const checkboxes = wrapper.findAllComponents(Checkbox);
    expect(checkboxes).toHaveLength(2);

    await checkboxes[1].trigger('click');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(['parent', ['first', 'second']], 1);
    expect(wrapper.emitted('update:value')).toEqual([[['parent', ['first', 'second']], 1]]);
  });
});
