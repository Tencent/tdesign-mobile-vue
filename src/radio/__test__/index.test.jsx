import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Radio from '../radio';
import RadioGroup from '../radio-group';

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

    it(': checked', async () => {
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

    it(':placement', async () => {
      const wrapper = mount(Radio, {
        props: {
          placement: 'right',
          icon: ['line', 'dot'],
          checked: true,
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(': icon', async () => {
      const wrapper = mount(Radio, {
        props: {
          icon: 'dot',
        },
      });
      const $icon = wrapper.find(`.${name}__icon-dot`);
      expect($icon.exists()).toBeTruthy();

      //tsx vm
      // const radioContent = wrapper.find(`.${name}__content`);
      // await radioContent.trigger('click');
      // expect(wrapper.vm.checked).toBeTruthy();
    });

    it(': keys', async () => {
      const wrapper = mount(RadioGroup, {
        props: {
          options: [
            {
              name: '单选',
              data: '1',
              disabled: true,
            },
            {
              name: '单选',
              data: '2',
            },
          ],
          keys: {
            value: 'data',
            label: 'name',
          },
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('events', () => {
    it(':change', async () => {
      const radio = ref('3');
      const wrapper = mount(() => (
        <RadioGroup v-model:value={radio.value} allowUncheck>
          <Radio name="radio" value="1" label="单选"></Radio>
          <Radio name="radio" value="2" label="单选"></Radio>
          <Radio name="radio" value="3" label="单选"></Radio>
        </RadioGroup>
      ));
      const [radio1, radio2] = wrapper.findAllComponents(`.${name}`);
      // expect(radio1.vm.checked).toBeTruthy();
      await radio1.trigger('click');
      expect(radio.value).toBe('1');
      //tsx vm
      // expect(radio2.vm.checked).toBeTruthy();
      await radio2.trigger('click');
      expect(radio.value).toBe('2');

      //tsx vm
      const radioContent = wrapper.find(`.${name}__content`);
      await radioContent.trigger('click');
      expect(radio.value).toBe('1');
      // expect(radio1.vm.checked).toBeTruthy();
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
