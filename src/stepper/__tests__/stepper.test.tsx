import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Stepper from '../stepper';

const name = 't-stepper';

const simulateEvent = (target: HTMLInputElement, text: string, event: string) => {
  target.value = text;
  target.dispatchEvent(new Event(event));
};

describe('Stepper', () => {
  describe('props', () => {
    it('disableInput[boolean]', async () => {
      const wrapper = mount(Stepper, {
        props: {
          disableInput: true,
        },
      });
      const $input = wrapper.find(`.${name}__input`);
      // 禁用输入框：输入框只读且不可用
      expect($input.attributes('readonly')).toBeDefined();
      expect($input.attributes('disabled')).toBeDefined();

      await wrapper.setProps({ disableInput: false });
      expect($input.attributes('readonly')).toBeUndefined();
      expect($input.attributes('disabled')).toBeUndefined();
    });

    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Stepper, {
        props: {
          value: 1,
          disabled: true,
          onChange,
        },
      });
      const $minus = wrapper.find(`.${name}__minus`);
      const $plus = wrapper.find(`.${name}__plus`);
      const $input = wrapper.find(`.${name}__input`);
      // 禁用全部操作：加减按钮带禁用态类名，输入框不可用
      expect($minus.classes()).toContain(`${name}--normal-disabled`);
      expect($plus.classes()).toContain(`${name}--normal-disabled`);
      expect($input.attributes('disabled')).toBeDefined();

      await $plus.trigger('click');
      expect(onChange).not.toHaveBeenCalled();

      await wrapper.setProps({ disabled: false });
      expect($minus.classes()).not.toContain(`${name}--normal-disabled`);
      expect($plus.classes()).not.toContain(`${name}--normal-disabled`);
      expect($input.attributes('disabled')).toBeUndefined();
    });

    it('inputWidth[number]', async () => {
      const wrapper = mount(Stepper, {
        props: {
          inputWidth: 80,
        },
      });
      const $input = wrapper.find(`.${name}__input`);
      expect($input.attributes('style')).toContain('width: 80px');

      await wrapper.setProps({ inputWidth: 100 });
      expect($input.attributes('style')).toContain('width: 100px');

      // 未设置时不输出宽度样式
      const wrapper2 = mount(Stepper);
      expect(wrapper2.find(`.${name}__input`).attributes('style')).toBe('');
    });

    it('integer[boolean]', async () => {
      // 整型（默认 true）：数字键盘，输入小数被截断为整数
      const value = ref(0);
      const wrapper = mount(() => <Stepper v-model={value.value} integer />);
      const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);
      expect($input.attributes('type')).toBe('tel');
      expect($input.attributes('inputmode')).toBe('numeric');
      simulateEvent($input.element, '3.7', 'input');
      await nextTick();
      expect(value.value).toBe('3');

      // 非整型：小数键盘，输入保留小数
      const decimalValue = ref(0);
      const wrapper2 = mount(() => <Stepper v-model={decimalValue.value} integer={false} />);
      const $input2 = wrapper2.find<HTMLInputElement>(`.${name}__input`);
      expect($input2.attributes('type')).toBe('text');
      expect($input2.attributes('inputmode')).toBe('decimal');
      simulateEvent($input2.element, '1.5', 'input');
      await nextTick();
      expect(decimalValue.value).toBe('1.5');
    });

    it('max[number]', async () => {
      const value = ref(3);
      const wrapper = mount(() => <Stepper v-model={value.value} max={5} />);
      const $plus = wrapper.find(`.${name}__plus`);
      expect($plus.classes()).not.toContain(`${name}--normal-disabled`);

      await $plus.trigger('click');
      expect(value.value).toBe('4');
      expect($plus.classes()).not.toContain(`${name}--normal-disabled`);

      // 达到最大值后加号进入禁用态
      await $plus.trigger('click');
      expect(value.value).toBe('5');
      expect($plus.classes()).toContain(`${name}--normal-disabled`);
    });

    it('min[number]', async () => {
      const value = ref(1);
      const wrapper = mount(() => <Stepper v-model={value.value} min={-1} />);
      const $minus = wrapper.find(`.${name}__minus`);

      await $minus.trigger('click');
      expect(value.value).toBe('0');
      await $minus.trigger('click');
      // 支持负数最小值
      expect(value.value).toBe('-1');
      // 达到最小值后减号进入禁用态
      expect($minus.classes()).toContain(`${name}--normal-disabled`);
    });

    it.each(['small', 'medium', 'large'] as const)('size[%s]', (size) => {
      const wrapper = mount(Stepper, { props: { size } });
      expect(wrapper.classes()).toContain(`${name}--${size}`);
      expect(wrapper.find(`.${name}__minus`).classes()).toContain(`${name}__icon--${size}`);
      expect(wrapper.find(`.${name}__plus`).classes()).toContain(`${name}__icon--${size}`);
      expect(wrapper.find(`.${name}__input`).classes()).toContain(`${name}__input--${size}`);
    });

    it('step[number]', async () => {
      const value = ref(0);
      const onChange = vi.fn();
      const wrapper = mount(() => <Stepper v-model={value.value} step={3} onChange={onChange} />);

      await wrapper.find(`.${name}__plus`).trigger('click');
      expect(onChange).toHaveBeenLastCalledWith('3');
      expect(value.value).toBe('3');

      await wrapper.find(`.${name}__minus`).trigger('click');
      expect(onChange).toHaveBeenLastCalledWith('0');
      expect(value.value).toBe('0');
    });

    it.each(['normal', 'filled', 'outline'] as const)('theme[%s]', (theme) => {
      const wrapper = mount(Stepper, { props: { theme } });
      expect(wrapper.find(`.${name}__minus`).classes()).toContain(`${name}__minus--${theme}`);
      expect(wrapper.find(`.${name}__input`).classes()).toContain(`${name}__input--${theme}`);
      expect(wrapper.find(`.${name}__plus`).classes()).toContain(`${name}__plus--${theme}`);
      // 默认值 0 位于最小值边界，禁用态类名同样跟随主题
      expect(wrapper.find(`.${name}__minus`).classes()).toContain(`${name}--${theme}-disabled`);
    });

    it('value[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Stepper, {
        props: {
          value: 3,
          onChange,
        },
      });
      const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);
      expect($input.element.value).toBe('3');

      // 受控模式：点击仅抛出 update:value，外部未回写前显示不变
      await wrapper.find(`.${name}__plus`).trigger('click');
      expect(onChange).toHaveBeenCalledWith('4');
      expect(wrapper.emitted('update:value')[0]).toEqual(['4']);
      expect($input.element.value).toBe('3');

      // 外部回写后显示同步
      await wrapper.setProps({ value: 4 });
      expect($input.element.value).toBe('4');
    });

    it('value[string]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Stepper, {
        props: {
          value: '3',
          onChange,
        },
      });
      const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);
      expect($input.element.value).toBe('3');

      await wrapper.find(`.${name}__minus`).trigger('click');
      expect(onChange).toHaveBeenCalledWith('2');
      expect(wrapper.emitted('update:value')[0]).toEqual(['2']);
      // 外部未回写前保持原值
      expect($input.element.value).toBe('3');
    });

    it('modelValue[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Stepper, {
        props: {
          modelValue: 3,
          onChange,
        },
      });
      const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);
      expect($input.element.value).toBe('3');

      // v-model 通道：点击抛出 update:modelValue，外部未回写前显示不变
      await wrapper.find(`.${name}__plus`).trigger('click');
      expect(onChange).toHaveBeenCalledWith('4');
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['4']);
      expect($input.element.value).toBe('3');

      // 外部回写后显示同步
      await wrapper.setProps({ modelValue: 4 });
      expect($input.element.value).toBe('4');
    });

    it('modelValue[string]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Stepper, {
        props: {
          modelValue: '3',
          onChange,
        },
      });
      expect(wrapper.find<HTMLInputElement>(`.${name}__input`).element.value).toBe('3');

      await wrapper.find(`.${name}__plus`).trigger('click');
      expect(onChange).toHaveBeenCalledWith('4');
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['4']);
      // 外部未回写前保持原值
      expect(wrapper.find<HTMLInputElement>(`.${name}__input`).element.value).toBe('3');
    });

    it('defaultValue[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Stepper, {
        props: {
          defaultValue: 5,
          onChange,
        },
      });
      const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);
      expect($input.element.value).toBe('5');

      // 非受控模式：内部值自行更新，不抛出 update 事件
      await wrapper.find(`.${name}__plus`).trigger('click');
      expect(onChange).toHaveBeenCalledWith('6');
      expect($input.element.value).toBe('6');
      expect(wrapper.emitted('update:value')).toBeUndefined();
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('defaultValue[string]', async () => {
      const wrapper = mount(Stepper, {
        props: {
          defaultValue: '5',
        },
      });
      const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);
      expect($input.element.value).toBe('5');

      await wrapper.find(`.${name}__plus`).trigger('click');
      expect($input.element.value).toBe('6');
    });
  });

  describe('events', () => {
    it('change', async () => {
      const value = ref(2);
      const onChange = vi.fn();
      const wrapper = mount(() => <Stepper v-model={value.value} onChange={onChange} />);

      // 点击加减按钮触发，参数为格式化后的新值
      await wrapper.find(`.${name}__plus`).trigger('click');
      expect(onChange).toHaveBeenNthCalledWith(1, '3');
      await wrapper.find(`.${name}__minus`).trigger('click');
      expect(onChange).toHaveBeenNthCalledWith(2, '2');

      // 输入过程中逐次触发
      simulateEvent(wrapper.find<HTMLInputElement>(`.${name}__input`).element, '8', 'input');
      expect(onChange).toHaveBeenNthCalledWith(3, '8');
    });

    it('blur', async () => {
      const onBlur = vi.fn();
      const wrapper = mount(Stepper, {
        props: {
          defaultValue: 5,
          onBlur,
        },
      });
      await wrapper.find(`.${name}__input`).trigger('blur');
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledWith(5);
    });

    it('focus', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(Stepper, {
        props: {
          defaultValue: 5,
          onFocus,
        },
      });
      await wrapper.find(`.${name}__input`).trigger('focus');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledWith(5);
    });

    it('overlimit', async () => {
      const onChange = vi.fn();
      const onOverlimit = vi.fn();
      const wrapper = mount(Stepper, {
        props: {
          defaultValue: 1,
          min: 0,
          max: 1,
          onChange,
          onOverlimit,
        },
      });

      // 已达最大值：点击加号仅触发 overlimit，不触发 change
      await wrapper.find(`.${name}__plus`).trigger('click');
      expect(onOverlimit).toHaveBeenNthCalledWith(1, 'plus');
      expect(onChange).not.toHaveBeenCalled();

      await wrapper.find(`.${name}__minus`).trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);

      // 已达最小值：点击减号仅触发 overlimit
      await wrapper.find(`.${name}__minus`).trigger('click');
      expect(onOverlimit).toHaveBeenNthCalledWith(2, 'minus');
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
