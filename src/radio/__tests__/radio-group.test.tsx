import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Radio from '../radio';
import RadioGroup from '../radio-group';
import type { TdRadioGroupProps } from '../type';

const prefix = 't';
const name = `${prefix}-radio`;

describe('RadioGroup', () => {
  describe('props', () => {
    it('borderless[boolean]', () => {
      // 无边框模式作用于整组子项
      const wrapper = mount(() => (
        <RadioGroup borderless>
          <Radio name="radio" value="1" label="单选"></Radio>
          <Radio name="radio" value="2" label="单选"></Radio>
        </RadioGroup>
      ));
      expect(wrapper.findAll(`.${name}__border`)).toHaveLength(0);

      // 默认渲染子项边框
      const wrapper2 = mount(() => (
        <RadioGroup>
          <Radio name="radio" value="1" label="单选"></Radio>
        </RadioGroup>
      ));
      expect(wrapper2.findAll(`.${name}__border`)).toHaveLength(1);
    });

    it('direction[vertical/horizontal]', () => {
      const wrapper = mount(() => (
        <RadioGroup>
          <Radio name="radio" value="1" label="单选"></Radio>
          <Radio name="radio" value="2" label="单选"></Radio>
        </RadioGroup>
      ));
      // 默认值为 vertical
      expect(wrapper.find(`.${name}-group--vertical`).exists()).toBe(true);
      expect(wrapper.find(`.${name}-group--horizontal`).exists()).toBe(false);
    });

    it('keys[object]', async () => {
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

    it('readonly[boolean]', async () => {
      const value = ref('1');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <RadioGroup v-model:value={value.value} readonly onChange={onChange}>
              <Radio name="radio" value="1" label="单选"></Radio>
              <Radio name="radio" value="2" label="单选"></Radio>
            </RadioGroup>
          );
        },
      });

      // 整组只读时点击任意选项不切换选中值
      await wrapper.findAll(`.${name}`)[1].trigger('click');
      expect(value.value).toBe('1');
      expect(onChange).not.toHaveBeenCalled();
      // 选中态图标仍停留在原选中项
      expect(wrapper.findAll(`.${name}__icon--checked`)).toHaveLength(1);
      expect(wrapper.findAll(`.${name}`)[0].find(`.${name}__icon--checked`).exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('change', async () => {
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
      // tsx vm
      // expect(radio2.vm.checked).toBeTruthy();
      await radio2.trigger('click');
      expect(radio.value).toBe('2');

      // tsx vm
      const radioContent = wrapper.find(`.${name}__content`);
      await radioContent.trigger('click');
      expect(radio.value).toBe('1');
      // expect(radio1.vm.checked).toBeTruthy();
    });
  });

  describe('scenarios', () => {
    it('direction changes dynamically', async () => {
      const direction = ref<TdRadioGroupProps['direction']>('vertical');
      const wrapper = mount(() => (
        <RadioGroup direction={direction.value}>
          <Radio name="radio" value="1" label="单选"></Radio>
          <Radio name="radio" value="2" label="单选"></Radio>
        </RadioGroup>
      ));
      // 初始为 vertical
      expect(wrapper.find(`.${name}-group--vertical`).exists()).toBe(true);
      expect(wrapper.find(`.${name}-group--horizontal`).exists()).toBe(false);
      expect(wrapper.findAll(`.${name}--horizontal`).length).toBe(0);

      // 动态切换为 horizontal
      direction.value = 'horizontal';
      await nextTick();
      expect(wrapper.find(`.${name}-group--horizontal`).exists()).toBe(true);
      expect(wrapper.find(`.${name}-group--vertical`).exists()).toBe(false);
      expect(wrapper.findAll(`.${name}--horizontal`).length).toBe(2);

      // 动态切换回 vertical
      direction.value = 'vertical';
      await nextTick();
      expect(wrapper.find(`.${name}-group--vertical`).exists()).toBe(true);
      expect(wrapper.find(`.${name}-group--horizontal`).exists()).toBe(false);
      expect(wrapper.findAll(`.${name}--horizontal`).length).toBe(0);
    });
  });
});
