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

    it('size[small/medium/large]', () => {
      (['small', 'medium', 'large'] as const).forEach((size) => {
        const wrapper = mount(Stepper, {
          props: { size },
        });
        expect(wrapper.classes()).toContain(`${name}--${size}`);
        expect(wrapper.find(`.${name}__minus`).classes()).toContain(`${name}__icon--${size}`);
        expect(wrapper.find(`.${name}__plus`).classes()).toContain(`${name}__icon--${size}`);
        expect(wrapper.find(`.${name}__input`).classes()).toContain(`${name}__input--${size}`);
      });
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

    it('theme[normal/filled/outline]', () => {
      (['normal', 'filled', 'outline'] as const).forEach((theme) => {
        const wrapper = mount(Stepper, {
          props: { theme },
        });
        expect(wrapper.find(`.${name}__minus`).classes()).toContain(`${name}__minus--${theme}`);
        expect(wrapper.find(`.${name}__input`).classes()).toContain(`${name}__input--${theme}`);
        expect(wrapper.find(`.${name}__plus`).classes()).toContain(`${name}__plus--${theme}`);
        // 默认值 0 位于最小值边界，禁用态类名同样跟随主题
        expect(wrapper.find(`.${name}__minus`).classes()).toContain(`${name}--${theme}-disabled`);
      });
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

  describe('scenarios', () => {
    it('renders with default props', () => {
      const wrapper = mount(Stepper);
      expect(wrapper.classes()).toContain(name);
      // 默认 medium 尺寸、normal 主题
      expect(wrapper.classes()).toContain(`${name}--medium`);
      // 结构：减号图标 / 输入框 / 加号图标
      expect(wrapper.find(`.${name}__minus`).exists()).toBeTruthy();
      expect(wrapper.find(`.${name}__input`).exists()).toBeTruthy();
      expect(wrapper.find(`.${name}__plus`).exists()).toBeTruthy();
      // 默认值 0，减号位于最小值边界呈禁用态
      expect(wrapper.find<HTMLInputElement>(`.${name}__input`).element.value).toBe('0');
      expect(wrapper.find(`.${name}__minus`).classes()).toContain(`${name}--normal-disabled`);
    });

    describe('value stepping', () => {
      it('steps value through alternating plus and minus clicks', async () => {
        const value = ref(0);
        const wrapper = mount(() => <Stepper v-model={value.value} />);
        const $plus = wrapper.find(`.${name}__plus`);
        const $minus = wrapper.find(`.${name}__minus`);

        await $plus.trigger('click');
        await $plus.trigger('click');
        expect(value.value).toBe('2');

        await $minus.trigger('click');
        expect(value.value).toBe('1');
      });

      it('accumulates value on continuous clicks', async () => {
        const value = ref(0);
        const wrapper = mount(() => <Stepper v-model={value.value} />);
        const $plus = wrapper.find(`.${name}__plus`);
        // 连点场景：每次点击都基于最新值累加
        await $plus.trigger('click');
        await $plus.trigger('click');
        await $plus.trigger('click');
        await $plus.trigger('click');
        await $plus.trigger('click');
        expect(value.value).toBe('5');
        expect(wrapper.find<HTMLInputElement>(`.${name}__input`).element.value).toBe('5');
      });
    });

    describe('input clamping', () => {
      it('clamps input beyond max on change', async () => {
        const value = ref(0);
        const onChange = vi.fn();
        const wrapper = mount(() => <Stepper v-model={value.value} max={10} onChange={onChange} />);
        const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);

        // 输入阶段不做边界校验
        simulateEvent($input.element, '15', 'input');
        await nextTick();
        expect(value.value).toBe('15');
        expect(onChange).toHaveBeenLastCalledWith('15');

        // change 时钳制到最大值
        simulateEvent($input.element, '15', 'change');
        await nextTick();
        expect(onChange).toHaveBeenLastCalledWith('10');
        expect(value.value).toBe('10');
        expect($input.element.value).toBe('10');
        expect(wrapper.find(`.${name}__plus`).classes()).toContain(`${name}--normal-disabled`);
      });

      it('clamps input below min on change', async () => {
        const value = ref(3);
        const onChange = vi.fn();
        const wrapper = mount(() => <Stepper v-model={value.value} min={2} onChange={onChange} />);
        const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);

        simulateEvent($input.element, '1', 'input');
        await nextTick();
        expect(value.value).toBe('1');

        // change 时钳制到最小值
        simulateEvent($input.element, '1', 'change');
        await nextTick();
        expect(onChange).toHaveBeenLastCalledWith('2');
        expect(value.value).toBe('2');
        expect($input.element.value).toBe('2');
      });

      it('falls back to min when input is cleared', async () => {
        const value = ref(3);
        const wrapper = mount(() => <Stepper v-model={value.value} min={2} />);
        const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);

        simulateEvent($input.element, '', 'input');
        await nextTick();
        simulateEvent($input.element, '', 'change');
        await nextTick();
        // 空输入按 0 处理后被钳制到最小值
        expect(value.value).toBe('2');
        expect($input.element.value).toBe('2');
      });

      it('strips invalid characters while typing', async () => {
        const value = ref(0);
        const onChange = vi.fn();
        const wrapper = mount(() => <Stepper v-model={value.value} onChange={onChange} />);
        const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);

        simulateEvent($input.element, 'a1b2c', 'input');
        await nextTick();
        expect(onChange).toHaveBeenLastCalledWith('12');
        expect(value.value).toBe('12');
      });
    });

    describe('decimal precision', () => {
      it('accumulates decimal steps without floating point errors', async () => {
        const value = ref(0);
        const onChange = vi.fn();
        const wrapper = mount(() => <Stepper v-model={value.value} integer={false} step={0.1} onChange={onChange} />);
        const $plus = wrapper.find(`.${name}__plus`);

        await $plus.trigger('click');
        expect(onChange).toHaveBeenLastCalledWith('0.1');
        await $plus.trigger('click');
        // 0.1 + 0.1 精确等于 0.2，不出现浮点误差
        expect(onChange).toHaveBeenLastCalledWith('0.2');
        await $plus.trigger('click');
        expect(value.value).toBe('0.3');
        expect(wrapper.find<HTMLInputElement>(`.${name}__input`).element.value).toBe('0.3');
      });

      it('keeps decimal digits longer than step on change', async () => {
        const value = ref(0);
        const wrapper = mount(() => <Stepper v-model={value.value} integer={false} step={0.1} />);
        const $input = wrapper.find<HTMLInputElement>(`.${name}__input`);

        simulateEvent($input.element, '1.25', 'input');
        await nextTick();
        simulateEvent($input.element, '1.25', 'change');
        await nextTick();
        // 格式化保留输入值与步长中更长的小数位数
        expect(value.value).toBe('1.25');
        expect($input.element.value).toBe('1.25');
      });
    });

    describe('form context', () => {
      it('inherits disabled from form', async () => {
        const onChange = vi.fn();
        const wrapper = mount(Stepper, {
          props: {
            value: 1,
            onChange,
          },
          global: {
            provide: {
              formDisabled: { disabled: ref(true) },
            },
          },
        });
        // 跟随表单禁用：按钮禁用态、输入框不可用、点击无效
        expect(wrapper.find(`.${name}__minus`).classes()).toContain(`${name}--normal-disabled`);
        expect(wrapper.find(`.${name}__plus`).classes()).toContain(`${name}--normal-disabled`);
        expect(wrapper.find(`.${name}__input`).attributes('disabled')).toBeDefined();

        await wrapper.find(`.${name}__plus`).trigger('click');
        expect(onChange).not.toHaveBeenCalled();

        // 组件自身 disabled=false 优先于表单禁用
        await wrapper.setProps({ disabled: false });
        expect(wrapper.find(`.${name}__minus`).classes()).not.toContain(`${name}--normal-disabled`);
        await wrapper.find(`.${name}__plus`).trigger('click');
        expect(onChange).toHaveBeenCalledWith('2');
      });

      it('inherits readonly from form', async () => {
        const onChange = vi.fn();
        const wrapper = mount(Stepper, {
          props: {
            value: 1,
            onChange,
          },
          global: {
            provide: {
              formReadonly: { readonly: ref(true) },
            },
          },
        });
        // 只读态：输入框只读、按钮不可用且点击不触发 change
        expect(wrapper.find(`.${name}__minus`).classes()).toContain(`${name}--normal-disabled`);
        expect(wrapper.find(`.${name}__plus`).classes()).toContain(`${name}--normal-disabled`);
        expect(wrapper.find(`.${name}__input`).attributes('readonly')).toBeDefined();

        await wrapper.find(`.${name}__plus`).trigger('click');
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });
});
