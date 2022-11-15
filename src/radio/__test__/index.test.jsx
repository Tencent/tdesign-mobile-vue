import { ref, h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Radio from '../radio.vue';
import RadioGroup from '../../radio-group/radio-group.vue';
import { CheckRectangleFilledIcon, CheckRectangleIcon } from 'tdesign-icons-vue-next';

const prefix = 't';
const name = `${prefix}-radio`;
const TEXT = 'tdesign-mobile-vue';
const TiconCheckRectangleFilled = h(CheckRectangleFilledIcon);
const TiconCheckRectangle = h(CheckRectangleIcon);
const checkRectangle = [TiconCheckRectangleFilled, TiconCheckRectangle];

describe('Radio', () => {
  describe('props', () => {
    it(': icon', () => {
      const wrapper = mount(Radio, {
        props: {
          icon: checkRectangle, // 自定义 icon
        },
      });
      const $icon = wrapper.find(`.${name}__icon-left-wrap .${name}__icon--custom `);
      expect($icon.exists()).toBeTruthy();
    });

    it(': align', async () => {
      const wrapper = mount(Radio, {
        props: {
          default: TEXT, // 单选按钮内容，同 label
          align: 'left',
        },
      });
      // align = 'left'
      const $left = wrapper.find(`.${name}__icon-left-wrap`);
      const $label = wrapper.find(`.${name}__content-title`);
      expect($left.exists()).toBeTruthy();
      expect($label.text()).toEqual(TEXT);
      const align = 'right';
      await wrapper.setProps({
        align,
      });
      // align = 'right'
      const $right = wrapper.find(`.${name}__icon-${align}-wrap`);
      expect($right.exists()).toBeTruthy();
    });

    it(': label', async () => {
      const wrapper = mount(Radio, {
        props: {
          label: TEXT,
        },
      });
      // align = 'left' （默认）
      const $left = wrapper.find(`.${name}__icon-left-wrap`);
      expect($left.exists()).toBeTruthy();
      const $label = wrapper.find(`.${name}__content-title`);
      expect($label.text()).toEqual(TEXT);
      const label = 'new label content';
      await wrapper.setProps({
        label,
      });
      expect($label.text()).toEqual(label);
    });

    it(': disabled', async () => {
      const onChange = vi.fn();
      const align = 'right';
      const contentDisabled = true;
      const label = 'label content';
      const wrapper = mount(Radio, {
        props: {
          align,
          contentDisabled,
          label,
          content: TEXT,
          onChange,
        },
      });
      const $content = wrapper.find(`.${name}__content-inner`);
      // contentDisabled = true,  点击 content 区域，不会触发 change
      await $content.trigger('click');
      expect(onChange).toBeCalledTimes(0);
      await wrapper.setProps({
        contentDisabled: false,
      });
      await $content.trigger('click');
      expect(onChange).toBeCalledTimes(1);
    });

    it(': disabled', async () => {
      const onChange = vi.fn();
      const disabled = true;
      const label = 'label content';
      const wrapper = mount(Radio, {
        props: {
          disabled,
          label,
          content: TEXT,
          onChange,
        },
      });
      const $radio = wrapper.findComponent(Radio);
      const $leftInput = wrapper.find(`.${name}__original-left`);
      const $label = wrapper.find(`.${name}__content-title`);
      const $content = wrapper.find(`.${name}__content-inner`);
      // disabled = true, input、label、content 都不会触发 change
      expect($radio.classes()).toContain('t-is-disabled');
      await $leftInput.trigger('click');
      expect(onChange).toBeCalledTimes(0);
      await $label.trigger('click');
      expect(onChange).toBeCalledTimes(0);
      await $content.trigger('click');
      expect(onChange).toBeCalledTimes(0);

      // disabled = false, 可以触发 change
      await wrapper.setProps({
        disabled: false,
      });
      await $leftInput.trigger('click');
      expect(onChange).toBeCalledTimes(1);
      await $label.trigger('click');
      expect(onChange).toBeCalledTimes(2);
      await $content.trigger('click');
      expect(onChange).toBeCalledTimes(3);
    });

    it(': checked', async () => {
      const options = [
        {
          label: '单选',
          value: 0,
          content: '辅助信息文字最多两行',
        },
        {
          label: '单选',
          value: 1,
          content: '辅助信息文字最多两行',
        },
      ];
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
        expect(item.classes().includes('t-is-checked')).toBe(isTrue);
      });

      // 切换按钮, 此时选中项为第一项
      const $firstRadio = $group.at(0);
      const $secondRadio = $group.at(1);
      await $firstRadio.find(`.${name}__original-left`).trigger('click');
      expect(onChange).toBeCalledTimes(1);
      expect($firstRadio.classes().includes('t-is-checked')).toBeTruthy();
      expect($secondRadio.classes().includes('t-is-checked')).toBeFalsy();
    });
  });

  describe('events', () => {
    it(': change', async () => {
      const radio = ref('1');
      const wrapper = mount(() => (
        <RadioGroup v-model:value={radio.value}>
          <Radio name="radio" value="1" label="单选"></Radio>
          <Radio name="radio" value="2" label="单选"></Radio>
          <Radio name="radio" value="3" label="单选"></Radio>
        </RadioGroup>
      ));
      const [radio1, radio2] = wrapper.findAll('.t-radio');
      const [, original2] = wrapper.findAll('.t-radio__original-left');
      expect(radio1.classes()).toContain('t-is-checked');
      await original2.trigger('click');
      expect(radio2.classes()).toContain('t-is-checked');
      expect(radio.value).toBe('2');
    });
  });

  describe('slots', () => {
    it(': label', () => {
      const label = 'slot: label content';
      const wrapper = mount(Radio, {
        slots: {
          label,
        },
      });
      const $label = wrapper.find(`.${name}__content-title`);
      expect($label.text()).toEqual(label);
    });

    it(': content', () => {
      const content = 'slot: content content';
      const wrapper = mount(Radio, {
        slots: {
          content,
        },
      });
      const $content = wrapper.find(`.${name}__content-inner`);
      expect($content.text()).toEqual(content);
    });
  });
});
