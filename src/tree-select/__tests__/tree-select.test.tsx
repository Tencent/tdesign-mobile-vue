import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { ref } from 'vue';
import TreeSelect from '../index';
import { SideBarItem } from '../../side-bar';
import { CheckboxGroup, Checkbox } from '../../checkbox';
import { RadioGroup, Radio } from '../../radio';

// 三级选项：第一级渲染侧边栏，第二级渲染中间列表，第三级渲染叶子单选/多选
const options = [
  {
    label: '一级一',
    value: '1',
    children: [
      {
        label: '二级一',
        value: '1-1',
        children: [
          { label: '三级一', value: '1-1-1' },
          { label: '三级二', value: '1-1-2' },
        ],
      },
      {
        label: '二级二',
        value: '1-2',
        disabled: true,
        children: [
          { label: '三级三', value: '1-2-1' },
          { label: '三级四', value: '1-2-2' },
        ],
      },
      {
        label: '二级三',
        value: '1-3',
        children: [
          { label: '三级五', value: '1-3-1' },
          { label: '三级六', value: '1-3-2' },
        ],
      },
    ],
  },
  {
    label: '一级二',
    value: '2',
    children: [
      {
        label: '二级四',
        value: '2-1',
        children: [
          { label: '三级七', value: '2-1-1' },
          { label: '三级八', value: '2-1-2' },
        ],
      },
      {
        label: '二级五',
        value: '2-2',
        children: [
          { label: '三级九', value: '2-2-1' },
          { label: '三级十', value: '2-2-2' },
        ],
      },
    ],
  },
];

// 数字值选项，用于 value/modelValue/defaultValue 的 number 类型通道
const numberOptions = [
  {
    label: '一级一',
    value: 1,
    children: [
      {
        label: '二级一',
        value: 11,
        children: [
          { label: '三级一', value: 111 },
          { label: '三级二', value: 112 },
        ],
      },
      { label: '二级二', value: 12, children: [{ label: '三级三', value: 121 }] },
    ],
  },
  {
    label: '一级二',
    value: 2,
    children: [{ label: '二级三', value: 21, children: [{ label: '三级四', value: 211 }] }],
  },
];

const defaultValue = ['1', '1-1', '1-1-1'];

describe('TreeSelect', () => {
  describe('props', () => {
    it('customStyle[string]', () => {
      const wrapper = mount(<TreeSelect options={options} value={defaultValue} customStyle="background-color: red;" />);
      // customStyle 追加在根节点默认高度样式之后
      expect(wrapper.attributes('style')).toContain('height: 336px;');
      expect(wrapper.attributes('style')).toContain('background-color: red;');
    });

    // filterable 已在 props.ts 声明，但组件内部未实现搜索渲染与过滤逻辑，无行为差异可断言
    it.todo('filterable[boolean]');

    it('height[string]', () => {
      const wrapper = mount(<TreeSelect options={options} value={defaultValue} height="90vh" />);
      expect(wrapper.attributes('style')).toContain('height: 90vh;');
    });

    it('height[number]', () => {
      const wrapper = mount(<TreeSelect options={options} value={defaultValue} height={200} />);
      expect(wrapper.attributes('style')).toContain('height: 200px;');
    });

    it('keys[object]', () => {
      const alias = { label: 'name', value: 'id', children: 'nodes', disabled: 'myDisabled' };

      // label/value/children/disabled 别名同时生效，同时存在 children 与别名时优先使用别名
      const wrapper = mount(
        <TreeSelect
          options={[
            {
              name: '一级一',
              id: '1',
              nodes: [
                { name: '二级一', id: '1-1', nodes: [{ name: '三级一', id: '1-1-1' }] },
                { name: '二级二', id: '1-2', myDisabled: true, nodes: [{ name: '三级二', id: '1-2-1' }] },
              ],
              children: [{ name: '未映射', id: 'unmapped' }],
            },
            {
              name: '一级二',
              id: '2',
              nodes: [{ name: '二级三', id: '2-1', nodes: [{ name: '三级三', id: '2-1-1' }] }],
            },
          ]}
          value={['1', '1-1', '1-1-1']}
          keys={alias}
        />,
      );
      expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(3);
      expect(wrapper.text()).toContain('二级一');
      expect(wrapper.text()).not.toContain('未映射');
      const $sideBarItems = wrapper.findAll('.t-side-bar-item');
      expect($sideBarItems[0].element.classList.contains('t-side-bar-item--active')).toBe(true);
      expect($sideBarItems[1].element.classList.contains('t-side-bar-item--active')).toBe(false);
      // disabled 别名：中间层级禁用项带禁用类
      const $middleItems = wrapper.findAll('.t-tree-select__item');
      expect($middleItems[1].element.classList.contains('t-tree-select__item--disabled')).toBe(true);

      // 未配置 children 别名时，回退读取默认 children 字段
      const fallback = mount(
        <TreeSelect
          options={[{ name: '一级一', id: '1', children: [{ name: '二级一', id: '1-1' }] }]}
          value={['1', '1-1']}
          keys={{ label: 'name', value: 'id' }}
        />,
      );
      expect(fallback.findAll('.t-tree-select__column')).toHaveLength(2);

      // 配置别名后默认字段不再参与读取，别名无法命中 children 时层级不再向下展开
      const unmapped = mount(<TreeSelect options={options} value={defaultValue} keys={alias} />);
      expect(unmapped.findAll('.t-tree-select__column')).toHaveLength(1);
    });

    it('multiple[boolean]', () => {
      // 多选：叶子层级渲染复选框组并回显选中值数组
      const multipleWrapper = mount(<TreeSelect options={options} value={['1', '1-1', ['1-1-1', '1-1-2']]} multiple />);
      expect(multipleWrapper.findComponent(CheckboxGroup).exists()).toBe(true);
      expect(multipleWrapper.findComponent(RadioGroup).exists()).toBe(false);
      const $checkboxes = multipleWrapper.findAll('.t-checkbox');
      expect($checkboxes).toHaveLength(2);
      expect($checkboxes[0].element.classList.contains('t-checkbox--checked')).toBe(true);
      expect($checkboxes[1].element.classList.contains('t-checkbox--checked')).toBe(true);

      // 单选（默认）：叶子层级渲染单选框组
      const singleWrapper = mount(<TreeSelect options={options} value={defaultValue} />);
      expect(singleWrapper.findComponent(RadioGroup).exists()).toBe(true);
      expect(singleWrapper.findComponent(CheckboxGroup).exists()).toBe(false);
      expect(singleWrapper.findAllComponents(Radio)).toHaveLength(2);
    });

    it('options[array]', () => {
      const wrapper = mount(<TreeSelect options={options} value={defaultValue} />);

      // 三级选项渲染为三列，列布局依次为 root/middle/leaf
      const $columns = wrapper.findAll('.t-tree-select__column');
      expect($columns).toHaveLength(3);
      expect($columns[0].element.classList.contains('t-tree-select__column--left')).toBe(true);
      expect($columns[1].element.classList.contains('t-tree-select__column--middle')).toBe(true);
      expect($columns[2].element.classList.contains('t-tree-select__column--right')).toBe(true);

      // 第一级渲染为侧边栏，选中项展示激活线条
      const $sideBarItems = wrapper.findAllComponents(SideBarItem);
      expect($sideBarItems).toHaveLength(2);
      expect($sideBarItems[0].text()).toContain('一级一');
      expect($sideBarItems[0].find('.t-side-bar-item__line').exists()).toBe(true);

      // 中间层级渲染为普通选项：选中项激活、禁用项带禁用类
      const $middleItems = wrapper.findAll('.t-tree-select__item');
      expect($middleItems).toHaveLength(3);
      expect($middleItems[0].text()).toContain('二级一');
      expect($middleItems[0].element.classList.contains('t-tree-select__item--active')).toBe(true);
      expect($middleItems[1].text()).toContain('二级二');
      expect($middleItems[1].element.classList.contains('t-tree-select__item--disabled')).toBe(true);

      // 叶子层级渲染为单选组，选中项图标激活
      const $radios = wrapper.findAllComponents(Radio);
      expect($radios).toHaveLength(2);
      expect($radios[0].text()).toContain('三级一');
      expect($radios[0].find('.t-radio__icon--checked').exists()).toBe(true);
    });

    it('value[string]', () => {
      // string 值按层级索引取字符：首字符命中第一级选项，后续层级无命中回退第一项
      const wrapper = mount(<TreeSelect options={options} value="2" />);
      expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(3);
      const $sideBarItems = wrapper.findAll('.t-side-bar-item');
      expect($sideBarItems[1].element.classList.contains('t-side-bar-item--active')).toBe(true);
      expect($sideBarItems[0].element.classList.contains('t-side-bar-item--active')).toBe(false);
      // 后继层级回退到「一级二」第一项路径
      expect(wrapper.text()).toContain('二级四');
      expect(wrapper.findAll('.t-tree-select__item--active')).toHaveLength(0);
    });

    it('value[number]', () => {
      // number 值无法按层级索引：各层级回退第一项且无激活态
      const wrapper = mount(<TreeSelect options={numberOptions} value={2} />);
      expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(3);
      expect(wrapper.findAll('.t-side-bar-item--active')).toHaveLength(0);
      expect(wrapper.findAll('.t-tree-select__item--active')).toHaveLength(0);
      expect(wrapper.findAll('.t-radio__icon--checked')).toHaveLength(0);
      // 各列内容按第一项路径展开
      expect(wrapper.text()).toContain('二级一');
      expect(wrapper.text()).toContain('三级一');
    });

    it('value[array]', () => {
      const wrapper = mount(<TreeSelect options={options} value={['2', '2-2', '2-2-2']} />);
      expect(wrapper.findAll('.t-side-bar-item')[1].element.classList.contains('t-side-bar-item--active')).toBe(true);
      expect(wrapper.findAll('.t-tree-select__item')[1].element.classList.contains('t-tree-select__item--active')).toBe(
        true,
      );
      expect(wrapper.findComponent(RadioGroup).props('modelValue')).toBe('2-2-2');
    });

    it('modelValue[string]', () => {
      const wrapper = mount(<TreeSelect options={options} modelValue="2" />);
      const $sideBarItems = wrapper.findAll('.t-side-bar-item');
      expect($sideBarItems[1].element.classList.contains('t-side-bar-item--active')).toBe(true);
      expect($sideBarItems[0].element.classList.contains('t-side-bar-item--active')).toBe(false);
    });

    it('modelValue[number]', () => {
      const wrapper = mount(<TreeSelect options={numberOptions} modelValue={2} />);
      expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(3);
      expect(wrapper.findAll('.t-side-bar-item--active')).toHaveLength(0);
      expect(wrapper.text()).toContain('二级一');
    });

    it('modelValue[array]', () => {
      const wrapper = mount(<TreeSelect options={options} modelValue={['2', '2-2', '2-2-2']} />);
      expect(wrapper.findAll('.t-side-bar-item')[1].element.classList.contains('t-side-bar-item--active')).toBe(true);
      expect(wrapper.findComponent(RadioGroup).props('modelValue')).toBe('2-2-2');
    });

    it('defaultValue[string]', () => {
      const wrapper = mount(<TreeSelect options={options} defaultValue="2" />);
      const $sideBarItems = wrapper.findAll('.t-side-bar-item');
      expect($sideBarItems[1].element.classList.contains('t-side-bar-item--active')).toBe(true);
      expect($sideBarItems[0].element.classList.contains('t-side-bar-item--active')).toBe(false);
    });

    it('defaultValue[number]', () => {
      const wrapper = mount(<TreeSelect options={numberOptions} defaultValue={2} />);
      expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(3);
      expect(wrapper.findAll('.t-side-bar-item--active')).toHaveLength(0);
      expect(wrapper.text()).toContain('二级一');
    });

    it('defaultValue[array]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<TreeSelect options={options} defaultValue={['1', '1-1', '1-1-1']} onChange={onChange} />);
      expect(wrapper.findComponent(RadioGroup).props('modelValue')).toBe('1-1-1');

      // 非受控：点击叶子选项后组件自行更新选中态
      await wrapper.findAllComponents(Radio)[1].trigger('click');
      expect(wrapper.findComponent(RadioGroup).props('modelValue')).toBe('1-1-2');
      expect(onChange).toHaveBeenLastCalledWith(['1', '1-1', '1-1-2'], 2);
      // 非受控模式不派发 update 事件
      expect(wrapper.emitted('update:value')).toBeUndefined();
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          const value = ref(['1', '1-1', '1-1-1']);
          return () => <TreeSelect options={options} value={value.value} onChange={onChange} />;
        },
      });

      // 点击叶子选项：change 携带完整选中路径，level 为 2
      const $radios = wrapper.findAllComponents(Radio);
      expect($radios).toHaveLength(2);
      await $radios[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(['1', '1-1', '1-1-2'], 2);

      // 点击中间层级禁用项：不触发 change 也不激活
      const $middleItems = wrapper.findAll('.t-tree-select__item');
      expect($middleItems).toHaveLength(3);
      expect($middleItems[1].element.classList.contains('t-tree-select__item--disabled')).toBe(true);
      await $middleItems[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect($middleItems[1].element.classList.contains('t-tree-select__item--active')).toBe(false);

      // 点击中间层级普通项：change 携带 level 1
      await $middleItems[2].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(['1', '1-3', '1-1-2'], 1);

      // 点击第一级侧边栏：change 携带 level 0
      const $sideBarItems = wrapper.findAllComponents(SideBarItem);
      expect($sideBarItems).toHaveLength(2);
      await $sideBarItems[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith(['2', '1-3', '1-1-2'], 0);

      // 多选模式：change 携带的叶子值为选中值数组
      const onMultipleChange = vi.fn();
      const multipleWrapper = mount({
        setup() {
          const value = ref(['1', '1-1', ['1-1-1']]);
          return () => <TreeSelect options={options} value={value.value} onChange={onMultipleChange} multiple />;
        },
      });
      const $checkboxes = multipleWrapper.findAllComponents(Checkbox);
      expect($checkboxes).toHaveLength(2);
      await $checkboxes[1].trigger('click');
      expect(onMultipleChange).toHaveBeenCalledTimes(1);
      expect(onMultipleChange).toHaveBeenLastCalledWith(['1', '1-1', ['1-1-1', '1-1-2']], 2);
    });

    it('update:value', async () => {
      const wrapper = mount(<TreeSelect options={options} value={['1', '1-1', '1-1-1']} />);
      await wrapper.findAllComponents(Radio)[1].trigger('click');
      expect(wrapper.emitted('update:value')).toEqual([[['1', '1-1', '1-1-2'], 2]]);
      // value 通道不派发 update:modelValue
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('update:modelValue', async () => {
      const wrapper = mount(<TreeSelect options={options} modelValue={['1', '1-1', '1-1-1']} />);
      await wrapper.findAllComponents(Radio)[1].trigger('click');
      expect(wrapper.emitted('update:modelValue')).toEqual([[['1', '1-1', '1-1-2'], 2]]);
      // modelValue 通道不派发 update:value
      expect(wrapper.emitted('update:value')).toBeUndefined();
    });
  });

  describe('scenarios', () => {
    describe('level navigation', () => {
      it('clicking root option switches middle column and refreshes leaf column', async () => {
        const wrapper = mount(<TreeSelect options={options} defaultValue={['1', '1-1', '1-1-1']} />);
        expect(wrapper.text()).toContain('二级一');
        expect(wrapper.text()).toContain('三级一');

        await wrapper.findAllComponents(SideBarItem)[1].trigger('click');

        // 中间列切换为「一级二」的子级，叶子列刷新为第一项路径的子级
        const $middleItems = wrapper.findAll('.t-tree-select__item');
        expect($middleItems).toHaveLength(2);
        expect($middleItems[0].text()).toContain('二级四');
        expect($middleItems[1].text()).toContain('二级五');
        expect(wrapper.text()).toContain('三级七');
        expect(wrapper.text()).not.toContain('三级一');
      });

      it('clicking middle option switches leaf column', async () => {
        const wrapper = mount(<TreeSelect options={options} defaultValue={['1', '1-1', '1-1-1']} />);
        expect(wrapper.text()).toContain('三级一');

        await wrapper.findAll('.t-tree-select__item')[2].trigger('click');

        // 「二级三」激活，「二级一」取消激活，叶子列切换为其子级且无选中项
        const $middleItems = wrapper.findAll('.t-tree-select__item');
        expect($middleItems[2].element.classList.contains('t-tree-select__item--active')).toBe(true);
        expect($middleItems[0].element.classList.contains('t-tree-select__item--active')).toBe(false);
        const $radios = wrapper.findAllComponents(Radio);
        expect($radios).toHaveLength(2);
        expect($radios[0].text()).toContain('三级五');
        expect(wrapper.findAll('.t-radio__icon--checked')).toHaveLength(0);
      });
    });

    describe('keys alias with multiple', () => {
      it('toggles aliased leaf values and reports them on change', async () => {
        const onChange = vi.fn();
        const alias = { label: 'name', value: 'id', children: 'nodes' };
        const wrapper = mount(
          <TreeSelect
            options={[
              {
                name: '一级一',
                id: 'a1',
                nodes: [
                  { name: '二级一', id: 'b1' },
                  { name: '二级二', id: 'b2' },
                ],
              },
            ]}
            keys={alias}
            defaultValue={['a1', ['b1']]}
            multiple
            onChange={onChange}
          />,
        );
        const $checkboxes = wrapper.findAllComponents(Checkbox);
        expect($checkboxes).toHaveLength(2);
        expect($checkboxes[0].element.classList.contains('t-checkbox--checked')).toBe(true);
        expect($checkboxes[1].element.classList.contains('t-checkbox--checked')).toBe(false);

        await $checkboxes[1].trigger('click');
        expect($checkboxes[1].element.classList.contains('t-checkbox--checked')).toBe(true);
        expect(onChange).toHaveBeenLastCalledWith(['a1', ['b1', 'b2']], 1);
      });
    });

    describe('controlled value sync', () => {
      it('syncs view when value prop changes externally', async () => {
        const wrapper = mount(<TreeSelect options={options} value={['1', '1-1', '1-1-1']} />);
        expect(wrapper.findComponent(RadioGroup).props('modelValue')).toBe('1-1-1');

        await wrapper.setProps({ value: ['2', '2-2', '2-2-2'] });
        expect(wrapper.findAll('.t-side-bar-item')[1].element.classList.contains('t-side-bar-item--active')).toBe(true);
        expect(
          wrapper.findAll('.t-tree-select__item')[1].element.classList.contains('t-tree-select__item--active'),
        ).toBe(true);
        expect(wrapper.findComponent(RadioGroup).props('modelValue')).toBe('2-2-2');
      });
    });

    describe('edge cases', () => {
      it('renders no columns with empty options', () => {
        const wrapper = mount(<TreeSelect options={[]} value={['1']} />);
        expect(wrapper.find('.t-tree-select').exists()).toBe(true);
        expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(0);
      });

      it('falls back to the first child when value points to a missing node', () => {
        const wrapper = mount(<TreeSelect options={options} value={['1', 'not-exist', '1-1-1']} />);
        expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(3);
        // 未命中的层级无激活项，后续层级仍按 value 解析
        expect(wrapper.findAll('.t-tree-select__item--active')).toHaveLength(0);
        expect(wrapper.findComponent(RadioGroup).props('modelValue')).toBe('1-1-1');
      });

      it('renders the first path when value is an empty array', () => {
        const wrapper = mount(<TreeSelect options={options} value={[]} />);
        expect(wrapper.findAll('.t-tree-select__column')).toHaveLength(3);
        expect(wrapper.findAll('.t-side-bar-item--active')).toHaveLength(0);
        expect(wrapper.text()).toContain('二级一');
      });

      it('logs error when multiple leaf value is not an array', () => {
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        mount(<TreeSelect options={options} value={['1', '1-1', '1-1-1']} multiple />);
        expect(errorSpy).toHaveBeenCalledWith(
          'TDesign TreeSelect Error: `value` should be an array when `multiple` is true, got `string`',
        );
        errorSpy.mockRestore();
      });
    });
  });
});
