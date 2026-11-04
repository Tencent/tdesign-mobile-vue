import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Radio from '../radio';
import RadioGroup from '../radio-group';
import type { TdRadioProps } from '../type';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-radio`;

// icon 数组形式的类型为 Array<TNode>（渲染函数），但组件不调用函数，而是把数组项
// 直接作为子节点渲染（文本节点经 String() 序列化）；通过自定义 toString 使渲染出的
// 文本与字符串用例保持一致
const createIconText = (text: string) => {
  const icon = () => text;
  icon.toString = () => text;
  return icon;
};

describe('Radio', () => {
  describe('props', () => {
    it('allowUncheck[boolean]', async () => {
      // 开启 allowUncheck：选中后再次点击取消选中
      const wrapper = mount(Radio, {
        props: {
          allowUncheck: true,
          defaultChecked: false,
        },
      });
      await wrapper.trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(false);

      // 默认不允许取消：选中后再次点击保持选中
      const wrapper2 = mount(Radio, {
        props: {
          defaultChecked: false,
        },
      });
      await wrapper2.trigger('click');
      await wrapper2.trigger('click');
      expect(wrapper2.find(`.${name}__icon--checked`).exists()).toBe(true);
    });

    it('block[boolean]', async () => {
      // 默认为块级元素
      const wrapper = mount(Radio);
      expect(wrapper.classes()).toContain(`${name}--block`);
      await wrapper.setProps({ block: false });
      expect(wrapper.classes()).not.toContain(`${name}--block`);
    });

    it('borderless[boolean]', () => {
      // 默认渲染边框
      const wrapper = mount(Radio);
      expect(wrapper.find(`.${name}__border`).exists()).toBe(true);

      // 无边框模式不渲染边框
      const wrapper2 = mount(Radio, {
        props: {
          borderless: true,
        },
      });
      expect(wrapper2.find(`.${name}__border`).exists()).toBe(false);
    });

    it('checked[boolean]', async () => {
      const wrapper = mount(Radio, {
        props: {
          checked: true,
        },
      });
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);

      // 受控模式：点击触发 update:checked，未接收新值前保持选中
      await wrapper.trigger('click');
      expect(wrapper.emitted('update:checked')).toEqual([[true, { e: expect.any(MouseEvent) }]]);
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);

      const wrapper2 = mount(Radio, {
        props: {
          checked: false,
        },
      });
      expect(wrapper2.find(`.${name}__icon--checked`).exists()).toBe(false);
      await wrapper2.trigger('click');
      expect(wrapper2.emitted('update:checked')).toEqual([[true, { e: expect.any(MouseEvent) }]]);
      // 未绑定外部更新，选中态保持不变
      expect(wrapper2.find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it('modelValue[boolean]', async () => {
      const modelValue = ref(false);
      const wrapper = mount({
        setup() {
          return () => <Radio v-model={modelValue.value} label="选项一" />;
        },
      });

      // 初始受控值 false，未选中
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(false);

      // 点击触发 update:modelValue，受控值更新后选中态同步
      await wrapper.trigger('click');
      expect(wrapper.findComponent(Radio).emitted('update:modelValue')).toEqual([
        [true, { e: expect.any(MouseEvent) }],
      ]);
      expect(modelValue.value).toBe(true);
      await nextTick();
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);

      // 外部回改受控值，选中态跟随
      modelValue.value = false;
      await nextTick();
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it('defaultChecked[boolean]', async () => {
      // 非受控初始值直接生效
      const wrapper = mount(Radio, {
        props: {
          defaultChecked: true,
        },
      });
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);
      // 无 allowUncheck 时点击保持选中
      await wrapper.trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);

      const wrapper2 = mount(Radio, {
        props: {
          defaultChecked: false,
        },
      });
      expect(wrapper2.find(`.${name}__icon--checked`).exists()).toBe(false);
      await wrapper2.trigger('click');
      expect(wrapper2.find(`.${name}__icon--checked`).exists()).toBe(true);
    });

    it('content[string]', () => {
      const wrapper = mount(Radio, {
        props: {
          content: '描述内容',
        },
      });
      expect(wrapper.find(`.${name}__description`).text()).toBe('描述内容');
    });

    it('content[function]', () => {
      const wrapper = mount(Radio, {
        props: {
          content: () => <span class="custom-content">函数描述内容</span>,
        },
      });
      expect(wrapper.find('.custom-content').exists()).toBe(true);
      expect(wrapper.find(`.${name}__description`).text()).toBe('函数描述内容');
    });

    it('content[slot]', () => {
      const content = 'slot: content content';
      const wrapper = mount(Radio, {
        slots: {
          content,
        },
      });
      const $content = wrapper.find(`.${name}__description`);
      expect($content.text()).toEqual(content);
    });

    it('contentDisabled[boolean]', async () => {
      const value = ref('1');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <RadioGroup v-model:value={value.value} onChange={onChange}>
              <Radio value="1" label="选项一" />
              <Radio value="2" label="选项二" contentDisabled />
            </RadioGroup>
          );
        },
      });
      const radios = wrapper.findAllComponents(Radio);

      // 点击内容区域不触发选中
      await radios[1].find(`.${name}__content`).trigger('click');
      expect(value.value).toBe('1');
      expect(onChange).not.toHaveBeenCalled();

      // 点击组件根节点仍可正常选中
      await radios[1].trigger('click');
      expect(value.value).toBe('2');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('default[string]', () => {
      const wrapper = mount(Radio, {
        props: {
          default: '别名主文案',
        },
      });
      expect(wrapper.find(`.${name}__title`).text()).toBe('别名主文案');
    });

    it('default[function]', () => {
      const wrapper = mount(Radio, {
        props: {
          default: () => <span>函数别名主文案</span>,
        },
      });
      expect(wrapper.find(`.${name}__title`).text()).toBe('函数别名主文案');
    });

    it('default[slot]', () => {
      const wrapper = mount(Radio, {
        slots: {
          default: () => <span>默认插槽主文案</span>,
        },
      });
      expect(wrapper.find(`.${name}__title`).text()).toBe('默认插槽主文案');
    });

    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Radio, {
        props: {
          disabled: true,
          label: '选项一',
          onChange,
        },
      });

      // 禁用态：图标与主文案带禁用修饰类，原生 input 同步禁用
      expect(wrapper.find(`.${name}__icon--disabled`).exists()).toBe(true);
      expect(wrapper.find(`.${name}__title--disabled`).exists()).toBe(true);
      expect(wrapper.find('input').attributes('disabled')).toBeDefined();

      // 点击不切换选中态，也不触发 change
      await wrapper.trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(false);
      expect(onChange).toHaveBeenCalledTimes(0);

      // 解除禁用后可正常选中
      await wrapper.setProps({ disabled: false });
      await wrapper.trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('icon[circle]', async () => {
      const wrapper = mount(Radio, {
        props: {
          icon: 'circle',
          defaultChecked: false,
        },
      });
      // 未选中渲染空心圆
      expect(wrapper.find(`.${name}__icon-circle`).exists()).toBe(true);
      await wrapper.trigger('click');
      // 选中渲染填充型图标
      expect(wrapper.find('.t-icon-check-circle-filled').exists()).toBe(true);
    });

    it('icon[line]', async () => {
      const wrapper = mount(Radio, {
        props: {
          icon: 'line',
          defaultChecked: false,
        },
      });
      // 未选中渲染占位元素
      expect(wrapper.find(`.${name}__icon .placeholder`).exists()).toBe(true);
      await wrapper.trigger('click');
      // 选中渲染描边型对勾图标
      expect(wrapper.find('.t-icon-check').exists()).toBe(true);
    });

    it('icon[dot]', async () => {
      const wrapper = mount(Radio, {
        props: {
          icon: 'dot',
          defaultChecked: false,
        },
      });
      // 未选中渲染空心圆
      expect(wrapper.find(`.${name}__icon-circle`).exists()).toBe(true);
      await wrapper.trigger('click');
      // 选中渲染圆点图标
      expect(wrapper.find(`.${name}__icon-dot`).exists()).toBe(true);
    });

    it('icon[none]', async () => {
      const wrapper = mount(Radio, {
        props: {
          icon: 'none',
          defaultChecked: false,
        },
      });
      // 未选中不渲染任何内置图标
      const icon = wrapper.find(`.${name}__icon`);
      expect(icon.element.children).toHaveLength(0);
      await wrapper.trigger('click');
      // 选中后同样不渲染图标
      expect(wrapper.find(`.${name}__icon`).element.children).toHaveLength(0);
      expect(wrapper.find('.t-icon-check-circle-filled').exists()).toBe(false);
      expect(wrapper.find(`.${name}__icon-dot`).exists()).toBe(false);
    });

    it('icon[array]', () => {
      const iconList: TdRadioProps['icon'] = [createIconText('选中图标'), createIconText('未选图标')];

      // 数组按 [选中图标, 非选中图标] 取值：选中态渲染第一项
      const checkedWrapper = mount(Radio, {
        props: {
          icon: iconList,
          checked: true,
        },
      });
      expect(checkedWrapper.find(`.${name}__icon`).text()).toBe('选中图标');

      // 未选中态渲染第二项
      const uncheckedWrapper = mount(Radio, {
        props: {
          icon: iconList,
          checked: false,
        },
      });
      expect(uncheckedWrapper.find(`.${name}__icon`).text()).toBe('未选图标');
    });

    it('label[string]', async () => {
      const wrapper = mount(Radio, {
        props: {
          label: '主文案',
        },
      });
      expect(wrapper.find(`.${name}__title`).text()).toBe('主文案');
      await wrapper.setProps({ label: '新主文案' });
      expect(wrapper.find(`.${name}__title`).text()).toBe('新主文案');
    });

    it('label[function]', () => {
      const wrapper = mount(Radio, {
        props: {
          label: () => <span class="custom-label">函数主文案</span>,
        },
      });
      expect(wrapper.find('.custom-label').exists()).toBe(true);
      expect(wrapper.find(`.${name}__title`).text()).toBe('函数主文案');
    });

    it('label[slot]', () => {
      const label = 'slot: label content';
      const wrapper = mount(Radio, {
        slots: {
          label,
        },
      });
      const $label = wrapper.find(`.${name}__title`);
      expect($label.text()).toEqual(label);
    });

    // -webkit-line-clamp 依赖 webkit 私有样式，jsdom/cssstyle 会丢弃该样式，无法断言行数
    it.todo('maxContentRow[number]');

    // -webkit-line-clamp 依赖 webkit 私有样式，jsdom/cssstyle 会丢弃该样式，无法断言行数
    it.todo('maxLabelRow[number]');

    it('name[string]', () => {
      const wrapper = mount(Radio, {
        props: {
          name: 'radio-name',
        },
      });
      // 原生属性透传到 input
      expect(wrapper.find('input').attributes('name')).toBe('radio-name');
    });

    it('placement[left/right]', () => {
      // 单独存在时默认值为 left
      const wrapper = mount(Radio, {
        props: {
          label: '选项一',
        },
      });
      expect(wrapper.classes()).toContain(`${name}--left`);
      expect(wrapper.find(`.${name}__icon--left`).exists()).toBe(true);
      expect(wrapper.find(`.${name}__border--left`).exists()).toBe(true);

      const wrapper2 = mount(Radio, {
        props: {
          label: '选项一',
          placement: 'right',
        },
      });
      expect(wrapper2.classes()).toContain(`${name}--right`);
      expect(wrapper2.find(`.${name}__icon--right`).exists()).toBe(true);
      expect(wrapper2.find(`.${name}__border--right`).exists()).toBe(true);
    });

    it('readonly[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Radio, {
        props: {
          readonly: true,
          onChange,
        },
      });
      // 只读态原生 input 同步只读
      expect(wrapper.find('input').attributes('readonly')).toBeDefined();

      // 只读时点击不切换选中态，也不触发 change
      await wrapper.trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(false);
      expect(onChange).toHaveBeenCalledTimes(0);

      // 解除只读后可正常选中
      await wrapper.setProps({ readonly: false });
      await wrapper.trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('value[string]', async () => {
      const wrapper = mount(Radio, {
        props: {
          value: 'one',
        },
      });
      // value 透传到原生 input
      expect(wrapper.find('input').attributes('value')).toBe('one');

      // 在分组中作为选中值上报
      const onChange = vi.fn();
      const group = mount({
        setup() {
          return () => (
            <RadioGroup onChange={onChange}>
              <Radio value="one" label="选项一" />
              <Radio value="two" label="选项二" />
            </RadioGroup>
          );
        },
      });
      await group.findAll(`.${name}`)[1].trigger('click');
      expect(onChange).toHaveBeenCalledWith('two', expect.objectContaining({ e: expect.any(MouseEvent) }));
    });

    it('value[number]', async () => {
      const wrapper = mount(Radio, {
        props: {
          value: 1,
        },
      });
      expect(wrapper.find('input').attributes('value')).toBe('1');

      const onChange = vi.fn();
      const group = mount({
        setup() {
          return () => (
            <RadioGroup onChange={onChange}>
              <Radio value={1} label="选项一" />
              <Radio value={2} label="选项二" />
            </RadioGroup>
          );
        },
      });
      await group.findAll(`.${name}`)[1].trigger('click');
      expect(onChange).toHaveBeenCalledWith(2, expect.objectContaining({ e: expect.any(MouseEvent) }));
    });

    it('value[boolean]', async () => {
      const wrapper = mount(Radio, {
        props: {
          value: false,
        },
      });
      expect(wrapper.find('input').attributes('value')).toBe('false');

      const onChange = vi.fn();
      const group = mount({
        setup() {
          return () => (
            <RadioGroup onChange={onChange}>
              <Radio value={true} label="选项一" />
              <Radio value={false} label="选项二" />
            </RadioGroup>
          );
        },
      });
      await group.findAll(`.${name}`)[1].trigger('click');
      expect(onChange).toHaveBeenCalledWith(false, expect.objectContaining({ e: expect.any(MouseEvent) }));
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Radio, {
        props: {
          allowUncheck: true,
          onChange,
        },
      });

      await wrapper.trigger('click');
      expect(onChange).toHaveBeenNthCalledWith(1, true, { e: expect.any(MouseEvent) });

      // allowUncheck 开启时再次点击取消选中并触发 change(false)
      await wrapper.trigger('click');
      expect(onChange).toHaveBeenNthCalledWith(2, false, { e: expect.any(MouseEvent) });
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('scenarios', () => {
    it('explicit disabled overrides group and form disabled states', async () => {
      const onChange = vi.fn();
      const wrapper = mount(RadioGroup, {
        props: { disabled: true, onChange },
        global: { provide: { formDisabled: { disabled: ref(true) } } },
        slots: { default: () => <Radio value="one" label="选项一" disabled={false} /> },
      });
      // Radio.disabled=false 优先于 RadioGroup.disabled 与 Form.disabled
      await wrapper.find(`.${name}`).trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('inherits form disabled when radio and group unspecified', async () => {
      const formDisabled = ref(true);
      const onChange = vi.fn();
      const wrapper = mount(RadioGroup, {
        props: { onChange },
        global: { provide: { formDisabled: { disabled: formDisabled } } },
        slots: { default: () => <Radio value="one" label="选项一" /> },
      });

      // 表单禁用下，Radio 与 RadioGroup 均未设置 disabled 时继承禁用态
      await wrapper.find(`.${name}`).trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(false);
      expect(onChange).toHaveBeenCalledTimes(0);

      formDisabled.value = false;
      await nextTick();
      await wrapper.find(`.${name}`).trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('explicit readonly overrides group readonly', async () => {
      const onChange = vi.fn();
      const wrapper = mount(RadioGroup, {
        props: { readonly: true, onChange },
        slots: { default: () => <Radio value="one" label="选项一" readonly={false} /> },
      });
      // Radio.readonly=false 优先于 RadioGroup.readonly
      await wrapper.find(`.${name}`).trigger('click');
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('radio placement overrides group placement', () => {
      const wrapper = mount(() => (
        <RadioGroup placement="right">
          <Radio value="one" label="选项一" placement="left" />
        </RadioGroup>
      ));
      const radio = wrapper.find(`.${name}`);
      // Radio.placement 优先于 RadioGroup.placement
      expect(radio.classes()).toContain(`${name}--left`);
      expect(radio.classes()).not.toContain(`${name}--right`);
      expect(radio.find(`.${name}__icon--left`).exists()).toBe(true);
    });

    it('radio borderless overrides group borderless', () => {
      const wrapper = mount(() => (
        <RadioGroup borderless>
          <Radio value="one" label="选项一" borderless={false} />
        </RadioGroup>
      ));
      // Radio.borderless=false 优先于 RadioGroup.borderless，仍渲染边框
      expect(wrapper.find(`.${name}__border`).exists()).toBe(true);
    });

    it('default slot takes priority over label prop', () => {
      const wrapper = mount(Radio, {
        props: { label: '属性主文案' },
        slots: { default: () => <span>默认插槽主文案</span> },
      });
      expect(wrapper.find(`.${name}__title`).text()).toBe('默认插槽主文案');
    });

    it('default prop takes priority over default slot', () => {
      const wrapper = mount(Radio, {
        props: { default: '别名属性' },
        slots: { default: () => <span>默认插槽</span> },
      });
      expect(wrapper.find(`.${name}__title`).text()).toBe('别名属性');
    });

    it('label prop takes priority over label slot', () => {
      const wrapper = mount(Radio, {
        props: { label: '属性主文案' },
        slots: { label: () => <span>插槽主文案</span> },
      });
      expect(wrapper.find(`.${name}__title`).text()).toBe('属性主文案');
    });

    it('content prop takes priority over content slot', () => {
      const wrapper = mount(Radio, {
        props: { content: '属性描述' },
        slots: { content: () => <span>插槽描述</span> },
      });
      expect(wrapper.find(`.${name}__description`).text()).toBe('属性描述');
    });
  });
});
