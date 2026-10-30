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

describe('TreeSelect', () => {
  describe('props', () => {
    it('keys[object]', () => {
      const alias = { label: 'name', value: 'id', children: 'nodes', disabled: 'myDisabled' };

      // label/value/children 别名同时生效（同时存在 children 与别名时优先使用别名）
      const wrapper = mount(
        <TreeSelect
          options={[
            {
              name: 'Parent',
              id: 'parent',
              nodes: [{ name: 'Leaf', id: 'leaf' }],
              children: [{ name: 'Unmapped', id: 'unmapped' }],
            },
          ]}
          value={['parent', 'leaf']}
          keys={alias}
        />,
      );
      expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(2);
      expect(wrapper.text()).toContain('Leaf');
      expect(wrapper.text()).not.toContain('Unmapped');

      // 别名无法匹配默认字段时，无激活项
      const unmapped = mount(<TreeSelect options={options} value={defaultValue} keys={alias} />);
      expect(unmapped.find('.t-tree-select__item--active').exists()).toBe(false);

      // 未配置 children 别名时回退到默认 children 字段
      const fallback = mount(
        <TreeSelect
          options={[{ name: 'Parent', id: 'parent', children: [{ name: 'Leaf', id: 'leaf' }] }]}
          value={['parent', 'leaf']}
          keys={{ label: 'name', value: 'id' }}
        />,
      );
      expect(fallback.findAll('.t-tree-select__column')).toHaveLength(2);
    });

    it('multiple[boolean]', () => {
      const testMultiple = (multiple, component) => {
        const wrapper = mount(<TreeSelect options={options} value={['1', ['1-1']]} multiple={multiple} />);
        expect(wrapper.findComponent(component).exists()).toBe(true);
      };

      testMultiple(true, CheckboxGroup);
      testMultiple(false, RadioGroup);
    });

    it('value[string]', () => {
      const wrapper = mount(<TreeSelect options={options} value={defaultValue} />);
      const radioGroup = wrapper.findComponent(RadioGroup);
      expect(radioGroup.exists()).toBe(true);
      expect(radioGroup.props('modelValue')).toBe('1-1-1');
    });

    it('value[array]', () => {
      const wrapper = mount(<TreeSelect options={options} value={['1-1-1']} multiple />);
      expect(wrapper.findComponent(CheckboxGroup).exists()).toBe(true);
    });

    it('value[number]', () => {
      const wrapper = mount(<TreeSelect options={options} value={1} />);
      expect(wrapper.findComponent(RadioGroup).exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('change in single', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          const value = ref(defaultValue);
          return () => <TreeSelect options={options} value={value.value} onChange={onChange} />;
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

    it('change in multiple', () => {
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

    it('customStyle[string]', () => {
      const wrapper = mount(<TreeSelect options={options} value={defaultValue} customStyle="background-color: red;" />);
      // customStyle 追加在根节点默认高度样式之后
      expect(wrapper.attributes('style')).toContain('height: 336px;');
      expect(wrapper.attributes('style')).toContain('background-color: red;');
    });

    // filterable 声明后组件内部未实现（无搜索渲染与过滤逻辑），无行为差异可断言
    it.todo('filterable[boolean]');

    it('height[string]', () => {
      const wrapper = mount(<TreeSelect options={options} value={defaultValue} height="90vh" />);
      expect(wrapper.attributes('style')).toContain('height: 90vh;');
    });

    it('height[number]', () => {
      const wrapper = mount(<TreeSelect options={options} value={defaultValue} height={200} />);
      expect(wrapper.attributes('style')).toContain('height: 200px;');
    });
  });
});
