import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Radio from '../radio.vue';
import RadioGroup from '../radio-group.vue';

const prefix = 't';
const name = `${prefix}-radio`;
const TEXT = 'tdesign-mobile-vue';

describe('Radio', () => {
  describe('props', () => {
    it(':label', async () => {
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

    it(':content-disabled', async () => {
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
      const $content = wrapper.find(`.${name}__content`);
      // contentDisabled = true,  点击 content 区域，不会触发 change
      await $content.trigger('click');
      expect(onChange).toBeCalledTimes(0);
      await wrapper.setProps({
        contentDisabled: false,
      });
      await $content.trigger('click');
      expect(onChange).toBeCalledTimes(1);
    });

    it(':disabled', async () => {
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

      await $radio.trigger('click');
      expect(onChange).toBeCalledTimes(0);

      // disabled = false, 可以触发 change
      await wrapper.setProps({
        disabled: false,
      });

      await $radio.trigger('click');
      expect(onChange).toBeCalledTimes(1);
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
  });

  describe('events', () => {
    it(':change', async () => {
      const radio = ref('1');
      const wrapper = mount(() => (
        <RadioGroup v-model:value={radio.value}>
          <Radio name="radio" value="1" label="单选"></Radio>
          <Radio name="radio" value="2" label="单选"></Radio>
          <Radio name="radio" value="3" label="单选"></Radio>
        </RadioGroup>
      ));
      const [radio1, radio2] = wrapper.findAllComponents('.t-radio');
      expect(radio1.vm.checked).toBeTruthy();
      await radio2.trigger('click');
      expect(radio2.vm.checked).toBeTruthy();
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
      const $label = wrapper.find(`.${name}__title`);
      expect($label.text()).toEqual(label);
    });

    it(': content', () => {
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
