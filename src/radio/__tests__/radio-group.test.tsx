import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Radio from '../radio';
import RadioGroup from '../radio-group';
import type { TdRadioGroupProps } from '../type';

const prefix = 't';
const name = `${prefix}-radio`;

describe('RadioGroup', () => {
  describe('props', () => {
    // borderless/readonly 作用于整组选项，与子项联动验证
    it.todo('borderless[boolean]');

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

    it.todo('readonly[boolean]');
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
