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

    // contentDisabled 点击内容区域不触发切换，依赖事件来源区分
    it.todo('contentDisabled[boolean]');

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

    // readonly 与分组的联动行为在 group 场景验证
    it.todo('readonly[boolean]');
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
