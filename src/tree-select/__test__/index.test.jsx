import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { ref, nextTick } from 'vue';
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

    it(':value asymmetric depth tree keeps the shallow branch leaf selectable', async () => {
      // 非对称深度：分支 1 两层、分支 2 三层；选中浅分支时不应按全树最大深度补出空列
      const asymmetricOptions = [
        { value: '1', children: [{ value: '1-1' }, { value: '1-2' }] },
        { value: '2', children: [{ value: '2-1', children: [{ value: '2-1-1' }] }] },
      ];
      const wrapper = mount(<TreeSelect options={asymmetricOptions} value={['1', '1-1']} />);
      await nextTick();
      expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(2);
      expect(wrapper.findComponent(RadioGroup).props('modelValue')).toBe('1-1');
    });

    it(':value empty array selects the first item of each column by default', async () => {
      const wrapper = mount(<TreeSelect options={options} value={[]} />);
      await nextTick();
      // value 为空数组时，默认选中每列索引 0（与小程序行为一致）
      expect(wrapper.findAll('.t-side-bar-item--active')).toHaveLength(1);
      expect(wrapper.find('.t-tree-select__item--active').exists()).toBe(true);
      expect(wrapper.find('.t-radio__icon--checked').exists()).toBe(true);
    });

    it(':customValue takes priority over value', async () => {
      const wrapper = mount(
        <TreeSelect options={options} value={['1', '1-1', '1-1-1']} customValue={['2', '2-1', '2-1-2']} />,
      );
      await nextTick();
      const radioGroup = wrapper.findComponent(RadioGroup);
      expect(radioGroup.props('modelValue')).toBe('2-1-2');
    });

    it(':customValue empty array selects nothing', async () => {
      const wrapper = mount(<TreeSelect options={options} customValue={[]} />);
      await nextTick();
      // customValue 为空数组时，不会有任何选中项
      expect(wrapper.findAll('.t-side-bar-item--active')).toHaveLength(0);
      expect(wrapper.find('.t-tree-select__item--active').exists()).toBe(false);
      expect(wrapper.find('.t-radio__icon--checked').exists()).toBe(false);
    });

    it(':customValue selects only the clicked item without binding parents', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<TreeSelect options={options} customValue={[]} onChange={onChange} />);
      await nextTick();
      expect(wrapper.find('.t-radio__icon--checked').exists()).toBe(false);
      // customValue 模式下点击叶子：选中哪一项就是哪一项，不绑定父级
      const radios = wrapper.findAllComponents(Radio);
      await radios[0].trigger('click');
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith([undefined, undefined, '1-1-1'], 2);
      expect(wrapper.find('.t-radio__icon--checked').exists()).toBe(true);
      expect(wrapper.findAll('.t-side-bar-item--active')).toHaveLength(0);
      expect(wrapper.find('.t-tree-select__item--active').exists()).toBe(false);
    });
  });

  describe('event', () => {
    it(':change fills parent values when the initial value is empty', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          const value = ref([]);
          return () => <TreeSelect options={options} value={value.value} onChange={onChange} />;
        },
      });
      await nextTick();
      const radios = wrapper.findAllComponents(Radio);
      await radios[1].trigger('click');
      // 空初始值点击叶子时补齐父级值，与非空初始值行为一致
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(['1', '1-1', '1-1-2'], 2);
    });

    it(':change preserves descendant selection when switching a parent column', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          const value = ref(['1', '1-1', '1-1-1']);
          return () => <TreeSelect options={options} value={value.value} onChange={onChange} />;
        },
      });
      await nextTick();
      const middles = wrapper.findAll('.t-tree-select__item');
      await middles[2].trigger('click');
      expect(onChange).toHaveBeenLastCalledWith(['1', '1-3', '1-1-1'], 1);
    });

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
