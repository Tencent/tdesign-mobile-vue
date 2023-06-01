import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import Stepper from '../stepper.vue';
import { ref } from 'vue';

const simulateEvent = (target, text, event) => {
  target.value = text;
  target.dispatchEvent(new Event(event));
};

describe('stepper', () => {
  describe('props', () => {
    it(': disabled', async () => {
      const wrapper = mount(Stepper, {
        props: {
          value: 2,
          disabled: true,
        },
      });
      const $minus = wrapper.find('.t-stepper__minus');
      expect($minus.classes()).toContain('t-stepper--normal-disabled');

      // 更新已挂载组件的 props
      await wrapper.setProps({
        disabled: false,
      });
      expect($minus.classes()).not.toContain('t-stepper--normal-disabled');
    });

    it(': input-width', async () => {
      const wrapper = mount(Stepper, {
        props: {
          inputWidth: 80,
        },
      });
      const $input = wrapper.find('.t-stepper__input');
      expect(getComputedStyle($input.element, null).width).toBe('80px');

      await wrapper.setProps({
        inputWidth: 100,
      });
      expect(getComputedStyle($input.element, null).width).toBe('100px');
    });

    it(': theme', async () => {
      const wrapper = mount(Stepper, {});

      const $minus = wrapper.find('.t-stepper__minus');
      expect($minus.classes()).toContain('t-stepper__minus--normal');

      await wrapper.setProps({
        theme: 'filled',
      });
      expect($minus.classes()).toContain('t-stepper__minus--filled');
    });

    it(': step && max && min', async () => {
      const onChange = vi.fn();

      const max = ref(3);
      const min = ref(1);
      const step = ref(2);
      const value = ref(2);

      const wrapper = mount({
        render() {
          return (
            <Stepper v-model={value.value} step={step.value} min={min.value} max={max.value} onChange={onChange} />
          );
        },
      });

      const minusIcon = wrapper.find('.t-stepper__minus');
      const plusIcon = wrapper.find('.t-stepper__plus');
      await minusIcon.trigger('click');
      await nextTick();
      // value <= min，change 触发， value = min
      expect(onChange).toBeCalledTimes(1);
      expect(value.value).toBe(1);
      expect(minusIcon.classes()).toContain('t-stepper--normal-disabled');

      await plusIcon.trigger('click');
      await nextTick();
      expect(onChange).toBeCalledTimes(2);
      expect(value.value).toBe(3);

      // 此时 value = max, plusIcon 为禁用态
      expect(plusIcon.classes()).toContain('t-stepper--normal-disabled');
    });
  });

  describe('events', () => {
    it(': overlimit', async () => {
      const onChange = vi.fn();
      const onOverlimit = vi.fn();
      const onBlur = vi.fn();
      const max = ref(5);
      const step = ref(5);
      const value = ref(2);
      const wrapper = mount({
        render() {
          return (
            <Stepper
              v-model={value.value}
              step={step.value}
              max={max.value}
              onChange={onChange}
              onOverlimit={onOverlimit}
              onBlur={onBlur}
            />
          );
        },
      });
      const minusIcon = wrapper.find('.t-stepper__minus');
      const plusIcon = wrapper.find('.t-stepper__plus');
      /**
       * plusIcon
       */
      // 当前value < max ,触发 change，
      await plusIcon.trigger('click');
      await nextTick();
      expect(onChange).toBeCalledTimes(1);
      expect(value.value).toBe(5);

      // 此时 value = max，不触发 change，但触发 overlimit
      await plusIcon.trigger('click');
      await nextTick();
      expect(onChange).toBeCalledTimes(1);
      expect(onOverlimit).toBeCalledTimes(1);
      expect(value.value).toBe(5);

      /**
       * minusIcon
       */
      // 此时 value = 5，
      await minusIcon.trigger('click');
      await nextTick();
      expect(value.value).toBe(0);
      expect(onChange).toBeCalledTimes(2);

      //此时 value = min， 不触发 change，但触发 overlimit
      await minusIcon.trigger('click');
      await nextTick();
      expect(onChange).toBeCalledTimes(2);
      expect(onOverlimit).toBeCalledTimes(2);

      // 测试 input
      const $input = wrapper.find('.t-stepper__input');

      $input.trigger('blur');
      expect(onBlur).toHaveBeenCalled(1);
    });

    it(': blur', async () => {
      const onChange = vi.fn();
      const onBlur = vi.fn();
      const value = ref(2);
      const wrapper = mount({
        render() {
          return <Stepper v-model={value.value} onChange={onChange} onBlur={onBlur} />;
        },
      });

      const $input = wrapper.find('.t-stepper__input');

      // blur
      $input.trigger('blur');
      expect(onBlur).toHaveBeenCalled(1);
      expect(value.value).toBe(2);
    });

    it(': focus', async () => {
      const data = ref('');
      const onFocus = vi.fn();
      const wrapper = mount(<Stepper v-model={data.value} onFocus={onFocus} />);

      const $input = wrapper.find('.t-stepper__input');
      await $input.trigger('focus');
      expect(onFocus).toBeCalled();
    });

    it(': input ', async () => {
      const data = ref('');
      const value = ref('');
      const handleChange = (val) => {
        value.value = val;
      };
      const wrapper = mount(<Stepper v-model={data.value} onChange={handleChange} />);
      const $input = wrapper.find('.t-stepper__input').element;

      const inputValue = 12;
      await simulateEvent($input, inputValue, 'input');
      expect(value.value).toBe(inputValue);
    });
  });
});
