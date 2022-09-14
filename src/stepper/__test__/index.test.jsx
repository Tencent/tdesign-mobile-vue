import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import Stepper from '../stepper.vue';
import { ref } from 'vue';

describe('stepper', () => {
  describe('props', () => {
    it(': disabled', async () => {
      const wrapper = mount(Stepper, {
          props: {
            disabled: true,
          },
      });
      expect(wrapper.classes()).toContain('t-is-disabled');

      // 更新已挂载组件的 props
      await wrapper.setProps({
        disabled: false,
      })
      expect(wrapper.classes()).not.toContain('t-is-disabled');
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
      })
      expect(getComputedStyle($input.element, null).width).toBe('100px');
    });


    it(': theme', async () => {
      const wrapper = mount(Stepper, {});

      expect(wrapper.classes()).not.toContain('t-stepper__pure')
      await wrapper.setProps({
        theme: 'grey',
      })
      expect(wrapper.classes()).toContain('t-stepper__pure')
    })

    it(': step && max && min', async () => {
      const onChange = vi.fn();

      const max = ref(3);
      const min = ref(1);
      const step = ref(2);
      const value = ref(2);

      const wrapper = mount({
        render() {
          return <Stepper v-model={value.value} step={step.value} min={min.value} max={max.value} onChange={onChange} />
        }
      })

      const minusIcon = wrapper.find('.t-stepper__minus');
      const plusIcon = wrapper.find('.t-stepper__plus');
      await minusIcon.trigger('click')
      await nextTick()
      // value <= min，change 触发， value = min
      expect(onChange).toBeCalledTimes(1)
      expect(value.value).toBe(1);
      expect(minusIcon.classes()).toContain('t-is-disabled')

      await plusIcon.trigger('click')
      await nextTick()
      expect(onChange).toBeCalledTimes(2)
      expect(value.value).toBe(3);

      // 此时 value = max, plusIcon 为禁用态
      expect(plusIcon.classes()).toContain('t-is-disabled')

    })
  })

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
          return <Stepper v-model={value.value} step={step.value} max={max.value} onChange={onChange} onOverlimit={onOverlimit} onBlur={ onBlur } />
        }
      })
      const minusIcon = wrapper.find('.t-stepper__minus');
      const plusIcon = wrapper.find('.t-stepper__plus');
      /**
       * plusIcon
       */
      // 当前value < max ,触发 change，
      await plusIcon.trigger('click')
      await nextTick()
      expect(onChange).toBeCalledTimes(1)
      expect(value.value).toBe(5);

      // 此时 value = max，不触发 change，但触发 overlimit
      await plusIcon.trigger('click')
      await nextTick()
      expect(onChange).toBeCalledTimes(1)
      expect(onOverlimit).toBeCalledTimes(1)
      expect(value.value).toBe(5);

      /**
       * minusIcon
       */
      // 此时 value = 5，
      await minusIcon.trigger('click')
      await nextTick()
      expect(value.value).toBe(0);
      expect(onChange).toBeCalledTimes(2)

      //此时 value = min， 不触发 change，但触发 overlimit
      await minusIcon.trigger('click')
      await nextTick()
      expect(onChange).toBeCalledTimes(2)
      expect(onOverlimit).toBeCalledTimes(2)

      // 测试 input
      const $input = wrapper.find('.t-stepper__input');

      $input.trigger('blur')
      expect(onBlur).toHaveBeenCalled(1)
    });

    it(': blur', async () => {
      const onChange = vi.fn();
      const onBlur = vi.fn();
      const value = ref(2);
      const wrapper = mount({
        render() {
          return <Stepper v-model={value.value} onChange={onChange} onBlur={ onBlur } />
        }
      })

      const $input = wrapper.find('.t-stepper__input');

      // blur
      $input.trigger('blur')
      expect(onBlur).toHaveBeenCalled(1)

      // input, 触发 change
      $input.setValue('10');
      expect(onChange).toBeCalled(1);
      expect(value.value).toBe(10);
    });
  })
})
