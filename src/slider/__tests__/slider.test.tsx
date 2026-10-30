import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';

import Slider from '../slider';
import { trigger } from '../../image-viewer/__tests__/touch';

const classPrefix = 't-slider';
const move = async (target, distance) => {
  await trigger(target, 'touchstart', 0, 0);
  await trigger(target, 'touchmove', distance, 0);
  await trigger(target, 'touchend', distance, 0);
};

describe('Slider', () => {
  describe('props', () => {
    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          disabled: true,
          onChange,
        },
      });

      // 禁用态根节点、轨道呈禁用样式
      expect(wrapper.find(`.${classPrefix}`).classes()).toContain(`${classPrefix}--disabled`);
      expect(wrapper.find(`.${classPrefix}__bar`).classes()).toContain(`${classPrefix}__bar--disabled`);

      // 点击轨道不触发 change
      await wrapper.find('.t-slider__line').trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledTimes(0);

      // // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    });

    it('label[boolean]', async () => {
      const value = 0;
      const wrapper = mount(Slider, {
        props: {
          label: true,
          showExtremeValue: true,
          value,
        },
      });

      // min = 0, max = 100, label = true (默认)
      // label && 滑块条
      const $label = wrapper.find(`.${classPrefix}__dot-value`);
      const $bar = wrapper.findAll(`.${classPrefix}__line`);
      expect(Number($label.text())).toEqual(value);
      const newValue = 30;
      await wrapper.setProps({
        value: newValue,
      });
      expect(Number($label.text())).toEqual(newValue);
    });

    it('label[string]', async () => {
      const value = 30;
      const wrapper = mount(Slider, {
        props: {
          label: `${value}`,
          value,
        },
      });
      const $label = wrapper.find(`.${classPrefix}__dot-value`);
      expect($label.text()).toEqual(`${value}`);
    });

    it('label[function]', async () => {
      const value = 30;
      const wrapper = mount(Slider, {
        props: {
          label: (val) => `${val}分`,
          value,
        },
      });
      const $label = wrapper.find(`.${classPrefix}__dot-value`);
      expect($label.text()).toEqual(`${value}分`);
    });

    it('label[range]', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: [0, 100],
          label: true,
          range: true,
          showExtremeValue: true,
          onChange,
        },
      });
      const original = window.HTMLElement.prototype.getBoundingClientRect;

      await wrapper.setProps({ value: [0, 80] });

      expect(wrapper.find('.t-slider__line--default').attributes('style').includes(`right: 68px`)).toBeTruthy();
      expect(wrapper.find('.t-slider__dot--left').text()).toBe('0');
      expect(wrapper.find('.t-slider__dot--right').text()).toBe('80');

      // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    });

    it('marks[object]', async () => {
      const wrapper = mount(Slider, {
        props: {
          value: 30,
        },
      });
      // marks 通过 watch 更新刻度，初始不传再动态设置
      await wrapper.setProps({ marks: { 0: '小', 50: '中', 100: '大' } });
      expect(wrapper.find('.t-slider__scale-item').exists()).toBeTruthy();
      expect(wrapper.text()).toContain('小');
      expect(wrapper.text()).toContain('大');
    });

    it('max[number]', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          max: 50,
          showExtremeValue: true,
          onChange,
        },
      });

      // 极值文本按 max 渲染
      expect(wrapper.find(`.${classPrefix}__value--max`).text()).toBe('50');

      // 点击轨道按 max=50 换算：clientX 200 → (184/343)*50 ≈ 26.8，步进取整 27
      await wrapper.find('.t-slider__line').trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(27);

      // // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    });

    it('min[number]', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: 10,
          min: 10,
          showExtremeValue: true,
          onChange,
        },
      });

      // 极值文本按 min 渲染
      expect(wrapper.find(`.${classPrefix}__value--min`).text()).toBe('10');

      // 点击轨道按 min=10 换算：(184/343)*90 + 10 ≈ 58.3，步进取整 58
      await wrapper.find('.t-slider__line').trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(58);

      // // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    });

    it('range[boolean]', async () => {
      const left = 16;
      const right = 359;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      try {
        const wrapper = mount(Slider, {
          props: {
            value: [10, 60],
            range: true,
          },
        });
        await nextTick();
        expect(wrapper.find(`.${classPrefix}`).classes()).toContain(`${classPrefix}--range`);
        // 双滑块模式渲染左右两个滑块
        expect(wrapper.find(`.${classPrefix}__dot--left`).exists()).toBe(true);
        expect(wrapper.find(`.${classPrefix}__dot--right`).exists()).toBe(true);
        // 轨道按范围值定位：left = 343*10%，right = 343*(100-60)%
        const style = wrapper.find('.t-slider__line--default').attributes('style');
        expect(style).toContain('left: 34px');
        expect(style).toContain('right: 137px');

        // 默认单滑块模式无左右滑块
        const single = mount(Slider, {
          props: {
            value: 10,
          },
        });
        expect(single.find(`.${classPrefix}__dot--left`).exists()).toBe(false);
        expect(single.find(`.${classPrefix}__dot--right`).exists()).toBe(false);
      } finally {
        window.HTMLElement.prototype.getBoundingClientRect = original;
      }
    });

    it('showExtremeValue[boolean]', async () => {
      const value = [30, 70];
      const showExtremeValue = true;
      const wrapper = mount(Slider, {
        props: {
          label: false,
          value,
          showExtremeValue,
        },
      });
      const $left = wrapper.find(`.${classPrefix}__value--min`);
      const $right = wrapper.find(`.${classPrefix}__value--max`);

      // min = 0, max = 100 (默认)
      expect(Number($left.text())).toStrictEqual(0);
      expect(Number($right.text())).toStrictEqual(100);

      const newMin = 30;
      const newMax = 110;
      await wrapper.setProps({
        min: newMin,
        max: newMax,
      });
      expect(Number($left.text())).toStrictEqual(newMin);
      expect(Number($right.text())).toStrictEqual(newMax);
    });

    it('step[number]', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          step: 10,
          onChange,
        },
      });
      const $line = wrapper.find('.t-slider__line');

      // clientX 200 的原始值为 53.64，step = 10 时步进取整为 50
      await $line.trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(50);

      // step = 20 时同一位置步进取整为 60
      await wrapper.setProps({ step: 20 });
      await $line.trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenLastCalledWith(60);

      // // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    });

    it('theme[capsule]', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const clientX = 200;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          onChange,
          theme: 'capsule',
        },
      });

      const $line = wrapper.find('.t-slider__line');

      await $line.trigger('click', { clientX });

      expect(onChange).toHaveBeenCalledWith(55);

      // // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    });

    it('value[out-of-limit]', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const { round } = Math;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      const calcValue = (posX) => round(((posX - left) / (right - left)) * 100);
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: [-1, 101],
          onChange,
          range: true,
        },
      });

      const $line = wrapper.find('.t-slider__line');
      await $line.trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith([0, calcValue(200)]);

      await wrapper.setProps({ value: [-1, 101] });
      // // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
      // mock dot bounding client rect
      const $leftDot = wrapper.find('.t-slider__dot--left');
      const $rightDot = wrapper.find('.t-slider__dot--right');
      vi.spyOn($leftDot.wrapperElement, 'getBoundingClientRect').mockReturnValue({ left: 16 });
      vi.spyOn($rightDot.wrapperElement, 'getBoundingClientRect').mockReturnValue({ left: 359 });
      await $line.trigger('click', { clientX: 50 });
      expect(onChange).toHaveBeenLastCalledWith([calcValue(50), 100]);
    });

    it('defaultValue[number]', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          defaultValue: 40,
          label: true,
          onChange,
        },
      });
      await nextTick();
      // 非受控初始值 40 展示在滑块上，滑轨宽度按轨道比例计算
      const getLineWidth = () =>
        Number(
          wrapper
            .find('.t-slider__line--single')
            .attributes('style')
            .match(/width: ([\d.]+)px/)[1],
        );
      expect(wrapper.find('.t-slider__dot-value').text()).toBe('40');
      expect(getLineWidth()).toBeCloseTo(137.2);

      // 非受控：点击轨道后内部值与滑轨宽度自行更新
      await wrapper.find('.t-slider__line').trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(54);
      await nextTick();
      expect(wrapper.find('.t-slider__dot-value').text()).toBe('54');
      expect(getLineWidth()).toBeCloseTo(185.22);

      // // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    });

    it('vertical[boolean]', async () => {
      const wrapper = mount(Slider, {
        props: {
          vertical: true,
          value: 30,
        },
      });
      expect(wrapper.find('.t-slider--vertical').exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const value = 0;
      const disabled = true;
      const wrapper = mount(Slider, {
        props: {
          value,
          disabled,
          onChange,
        },
      });
      const $bar = wrapper.find(`.${classPrefix}__bar`);

      // disabled = true, 禁止滑动
      await move($bar, 120);
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('click', async () => {
      const onChange = vi.fn();
      const left = 16;
      const right = 359;
      const clientX = 200;
      const { round } = Math;
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      const calcValue = (posX) => round(((posX - left) / (right - left)) * 100);
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          onChange,
        },
      });

      const $line = wrapper.find('.t-slider__line');
      const $dot = wrapper.find('.t-slider__dot');

      await $line.trigger('click', { clientX });

      expect(onChange).toHaveBeenCalledWith(calcValue(clientX));

      await move($dot, 100);

      expect(onChange).toHaveBeenCalledWith(calcValue(100));

      // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    });

    it('touch', async () => {
      const onChange = vi.fn();
      const { round } = Math;
      const left = 16;
      const right = 359;
      const original = window.HTMLElement.prototype.getBoundingClientRect;

      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left, right });

      const wrapper = mount(Slider, {
        props: {
          value: [0, 100],
          onChange,
          range: true,
        },
      });

      const $leftDot = wrapper.find('.t-slider__dot--left');
      const $rightDot = wrapper.find('.t-slider__dot--right');

      await move($leftDot, 100);
      const leftValue = round(((100 - left) / (right - left)) * 100);
      expect(onChange).toHaveBeenCalledWith([leftValue, 100]);

      await move($rightDot, 300);
      const rightValue = round(((300 - left) / (right - left)) * 100);
      expect(onChange).toHaveBeenCalledWith([0, rightValue]);
      // restore
      window.HTMLElement.prototype.getBoundingClientRect = original;
    });
  });
});
