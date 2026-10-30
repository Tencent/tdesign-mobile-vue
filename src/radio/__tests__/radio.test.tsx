import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Radio from '../radio';
import RadioGroup from '../radio-group';
import type { TdRadioProps } from '../type';

const prefix = 't';
const name = `${prefix}-radio`;
const TEXT = 'tdesign-mobile-vue';

// icon 数组形式的类型为 Array<TNode>（渲染函数），但组件不调用函数，而是把数组项
// 直接作为子节点渲染（文本节点经 String() 序列化）；通过自定义 toString 使渲染出的
// 文本与原有字符串用例保持一致
const createIconText = (text: string) => {
  const icon = () => text;
  icon.toString = () => text;
  return icon;
};

describe('Radio', () => {
  describe('props', () => {
    it('allowUncheck[boolean]', async () => {
      const checked = ref(false);
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => <Radio v-model:checked={checked.value} allowUncheck label="选项一" onChange={onChange} />;
        },
      });

      await wrapper.trigger('click');
      expect(checked.value).toBe(true);
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(true);

      // 单选开启 allowUncheck 后，选中态再次点击取消选中
      await wrapper.trigger('click');
      expect(checked.value).toBe(false);
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(false);

      // 默认不允许取消：选中后再次点击保持选中
      const checked2 = ref(false);
      const wrapper2 = mount({
        setup() {
          return () => <Radio v-model:checked={checked2.value} label="选项二" />;
        },
      });
      await wrapper2.trigger('click');
      await wrapper2.trigger('click');
      expect(checked2.value).toBe(true);
      expect(wrapper2.find(`.${name}__icon--checked`).exists()).toBe(true);
    });

    it('block[boolean]', async () => {
      const wrapper = mount(Radio, {
        props: {
          block: true,
        },
      });
      expect(wrapper.find(`.${name}--block`).exists()).toBeTruthy();
    });

    it('borderless[boolean]', async () => {
      const wrapper = mount(Radio, {
        props: {
          checked: true,
        },
      });
      expect(wrapper.find(`.${name}__border`).exists()).toBeTruthy();

      const wrapper2 = mount(Radio, {
        props: {
          checked: true,
          borderless: true,
        },
      });
      expect(wrapper2.find(`.${name}__border`).exists()).toBeFalsy();
    });

    it('checked[boolean]', async () => {
      const options = [0, 1];
      const onChange = vi.fn();

      const radio = ref(1);
      const wrapper = mount(RadioGroup, {
        props: {
          defaultValue: radio.value,
          options,
          onChange,
        },
      });

      const $group = wrapper.findAllComponents(Radio);
      expect($group.length).toBe(options.length);
      expect(wrapper.element).toMatchSnapshot();
      $group.forEach((item, index) => {
        const isTrue = index === radio.value;
        expect(item.vm.checked).toBe(isTrue);
      });

      // 切换按钮, 此时选中项为第一项
      const $firstRadio = $group.at(0);
      const $secondRadio = $group.at(1);
      await $firstRadio.trigger('click');
      expect(onChange).toBeCalledTimes(1);
      expect($firstRadio.vm.checked).toBeTruthy();
      expect($secondRadio.vm.checked).toBeFalsy();
    });

    it('defaultChecked[boolean]', async () => {
      const wrapper = mount(Radio, {
        props: {
          defaultChecked: true,
        },
      });
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBeTruthy();
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
      await radios[1].find('.t-radio__content').trigger('click');
      expect(value.value).toBe('1');
      expect(onChange).not.toHaveBeenCalled();

      // 点击组件根节点仍可正常选中
      await radios[1].trigger('click');
      expect(value.value).toBe('2');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('disabled[boolean]', async () => {
      const checked = ref(false);
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => <Radio v-model:checked={checked.value} disabled label="选项一" onChange={onChange} />;
        },
      });

      // 禁用态图标与标题呈禁用样式
      expect(wrapper.find(`.${name}__icon--disabled`).exists()).toBe(true);
      expect(wrapper.find(`.${name}__title--disabled`).exists()).toBe(true);

      // 点击禁用组件不切换选中态，也不触发 change
      await wrapper.trigger('click');
      expect(checked.value).toBe(false);
      expect(onChange).not.toHaveBeenCalled();
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it('icon[dot]', async () => {
      const wrapper = mount(Radio, {
        props: {
          checked: true,
          icon: 'dot',
        },
      });
      const $icon = wrapper.find(`.${name}__icon-dot`);

      expect($icon.exists()).toBeTruthy();

      // tsx vm
      // const radioContent = wrapper.find(`.${name}__content`);
      // await radioContent.trigger('click');
      // expect(wrapper.vm.checked).toBeTruthy();
    });

    it('icon[array]', async () => {
      const iconList: TdRadioProps['icon'] = [createIconText('line'), createIconText('dot')];
      const wrapper = mount(Radio, {
        props: {
          checked: true,
          icon: iconList,
        },
      });

      expect(wrapper.find(`.${name}__icon`).exists()).toBeTruthy();
    });

    it('label[string]', async () => {
      const wrapper = mount(Radio, {
        props: {
          label: TEXT,
        },
      });
      const $label = wrapper.find(`.${name}__title`);
      expect($label.text()).toEqual(TEXT);
      const label = 'new label content';
      await wrapper.setProps({
        label,
      });
      expect($label.text()).toEqual(label);
    });

    it('label[function]', async () => {
      const wrapper = mount(Radio, {
        props: {
          label: () => '函数标签',
        },
      });
      const $label = wrapper.find(`.${name}__title`);
      expect($label.text()).toEqual('函数标签');
    });

    it('maxLabelRow[number] & maxContentRow[number]', async () => {
      const wrapper = mount(Radio, {
        props: {
          label: '多行标签内容',
          maxLabelRow: 1,
          maxContentRow: 2,
        },
      });
      const $label = wrapper.find(`.${name}__title`);
      expect($label.exists()).toBe(true);
      // jsdom/cssstyle 不支持 -webkit-line-clamp，行数样式无法在 DOM 断言，仅验证行数元素通道
    });

    it('name[string]', () => {
      const wrapper = mount(Radio, {
        props: {
          name: 'radio-name',
        },
      });
      // 原生属性透传到 input
      expect(wrapper.find('input').attributes('name')).toBe('radio-name');
    });

    it('placement[left/right]', async () => {
      const iconList: TdRadioProps['icon'] = [createIconText('line'), createIconText('dot')];
      const wrapper = mount(Radio, {
        props: {
          placement: 'right',
          icon: iconList,
          checked: true,
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('readonly[boolean]', async () => {
      const checked = ref(false);
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => <Radio v-model:checked={checked.value} label="选项一" readonly onChange={onChange} />;
        },
      });

      // 只读时点击不切换选中态，图标不变为选中样式
      await wrapper.trigger('click');
      expect(checked.value).toBe(false);
      expect(onChange).not.toHaveBeenCalled();
      expect(wrapper.find(`.${name}__icon--checked`).exists()).toBe(false);

      // 非只读时点击可选中
      const editable = ref(false);
      const editableWrapper = mount({
        setup() {
          return () => <Radio v-model:checked={editable.value} label="选项一" onChange={onChange} />;
        },
      });
      await editableWrapper.trigger('click');
      expect(editable.value).toBe(true);
      expect(editableWrapper.find(`.${name}__icon--checked`).exists()).toBe(true);
    });
  });

  describe('slots', () => {
    it('label', () => {
      const label = 'slot: label content';
      const wrapper = mount(Radio, {
        slots: {
          label,
        },
      });
      const $label = wrapper.find(`.${name}__title`);
      expect($label.text()).toEqual(label);
    });

    it('content', () => {
      const content = 'slot: content content';
      const wrapper = mount(Radio, {
        slots: {
          content,
        },
      });
      const $content = wrapper.find(`.${name}__description`);
      expect($content.text()).toEqual(content);
    });
  });
});
