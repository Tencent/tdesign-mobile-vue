import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { ref } from 'vue';
import TreeSelect from '../index';
import { SideBarItem } from '../../side-bar';
import { CheckboxGroup, Checkbox } from '../../checkbox';
import { RadioGroup, Radio } from '../../radio';

const options = [
  {
    value: '1',
    children: [
      { value: '1-1', children: [{ value: '1-1-1' }, { value: '1-1-2' }] },
      { value: '1-2', disabled: true, children: [{ value: '1-2-1' }, { value: '1-2-2' }] },
      { value: '1-3', children: [{ value: '1-3-1' }, { value: '1-3-2' }] },
    ],
  },
  {
    value: '2',
    children: [
      { value: '2-1', children: [{ value: '2-1-1' }, { value: '2-1-2' }] },
      { value: '2-2', children: [{ value: '2-2-1' }, { value: '2-2-2' }] },
    ],
  },
];

const defaultValue = ['1', '1-1', '1-1-1'];

describe('tree-select', () => {
  describe('props', () => {
    it(':multiple', () => {
      const testMultiple = (multiple, component) => {
        const wrapper = mount(<TreeSelect options={options} value={['1', ['1-1']]} multiple={multiple} />);
        expect(wrapper.findComponent(component).exists()).toBe(true);
      };

      testMultiple(true, CheckboxGroup);
      testMultiple(false, RadioGroup);
    });

    it(':value', () => {
      const wrapper = mount(<TreeSelect options={options} value={defaultValue} />);
      const radioGroup = wrapper.findComponent(RadioGroup);
      expect(radioGroup.exists()).toBe(true);
      expect(radioGroup.props('modelValue')).toBe('1-1-1');
    });

    it(':keys', () => {
      const testKeys = (keys, result) => {
        const wrapper = mount(<TreeSelect options={options} value={defaultValue} keys={keys} />);
        expect(wrapper.find('.t-tree-select__item--active').exists()).toBe(result);
      };

      const keys = { label: 'myLabel', value: 'myValue', disabled: 'myDisabled' };
      testKeys(undefined, true);
      testKeys(keys, false);
    });
  });

  describe('event', () => {
    it(':change in single', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          const value = ref(defaultValue);
          return () => <TreeSelect options={options} value={value} onChange={onChange} />;
        },
      });
      const radios = wrapper.findAllComponents(Radio);
      expect(radios.length).toBe(2);
      radios[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(['1', '1-1', '1-1-2'], 2);

      const middles = wrapper.findAll('.t-tree-select__item');
      expect(middles.length).toBe(3);

      expect(middles[1].element.classList.contains('t-tree-select__item--disabled')).toBe(true);
      middles[1].trigger('click');
      expect(middles[1].element.classList.contains('t-tree-select__item--active')).toBe(false);

      const sideBarItem = wrapper.findAllComponents(SideBarItem);
      expect(sideBarItem.length).toBe(2);
      await sideBarItem[1].trigger('click');

      const middles2 = wrapper.findAll('.t-tree-select__item');
      await middles2[1].trigger('click');
      expect(middles2[1].element.classList.contains('t-tree-select__item--active')).toBe(true);
    });

    it(':change in multiple', () => {
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          const value = ref(defaultValue);
          return () => (
            <TreeSelect options={options} value={['1', '1-1', ['1-1-1']]} onChange={onChange} multiple={true} />
          );
        },
      });
      const target = wrapper.findAllComponents(Checkbox);
      expect(target.length).toBe(2);
      target[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(['1', '1-1', ['1-1-1', '1-1-2']], 2);

      const sideBarItem = wrapper.findAllComponents(SideBarItem);
      expect(sideBarItem.length).toBe(2);
      sideBarItem[1].trigger('click');
    });
  });
});
