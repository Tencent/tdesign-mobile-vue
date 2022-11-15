import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Slider from '../slider.vue';
import { trigger } from '../../image-viewer/__test__/touch';

const classPrefix = 't-slider';
const move = async (target, distance) => {
  await trigger(target, 'touchstart', 0, 0);
  await trigger(target, 'touchmove', distance, 0);
  await trigger(target, 'touchend', distance, 0);
};

describe('slider', () => {
  describe('props', () => {
    it(': range', async () => {
      const value = [30, 70];
      const range = true;
      const disabled = true;
      const onChange = vi.fn();
      const wrapper = mount(Slider, {
        props: {
          value,
          range,
          disabled,
          onChange,
        },
      });

      const $slider = wrapper.find(`.${classPrefix}`);
      const $bar = wrapper.findAll(`.${classPrefix}__handle`);
      expect($bar.length).toStrictEqual(value.length);

      const event = {
        clientX: 82,
        stopPropagation: vi.fn(),
      };

      // disabled = true, 禁止点击
      await $slider.trigger('click', { ...event });
      expect(onChange).toHaveBeenCalledTimes(0);

      // disabled = false
      await wrapper.setProps({
        disabled: false,
      });
      await $slider.trigger('click', { ...event });
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it(': showExtremeValue', async () => {
      const value = [30, 70];
      const showExtremeValue = true;
      const wrapper = mount(Slider, {
        props: {
          label: false,
          value,
          showExtremeValue,
        },
      });
      const $left = wrapper.find(`.${classPrefix}-wrap__value--left`);
      const $right = wrapper.find(`.${classPrefix}-wrap__value`);

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

    it(': marks', async () => {
      const value = [30, 70];
      const marks = [0, 25, 50, 75, 100]; // Array
      const label = false;
      const wrapper = mount(Slider, {
        props: {
          value,
          marks,
          label,
        },
      });
      const $mark = wrapper.findAll(`.${classPrefix}__mark-text`);
      expect($mark.length).toStrictEqual(marks.length);
      $mark.forEach((item, index) => {
        expect(Number(item.text())).toStrictEqual(marks[index]);
        expect(item.attributes('style').includes(`left: ${marks[index]}%;`)).toBeTruthy();
      });

      const newMarks = { 0: '小', 50: '中', 100: '大' }; // Object
      await wrapper.setProps({
        marks: newMarks,
      });

      const $newMarks = wrapper.findAll(`.${classPrefix}__mark-text`);
      const marks2 = Object.entries(newMarks);
      expect($newMarks.length).toEqual(marks2.length);
      $newMarks.forEach((item, index) => {
        expect(item.text()).toStrictEqual(marks2[index][1]);
        expect(item.attributes('style').includes(`left: ${marks2[index][0]}%;`)).toBeTruthy();
      });
    });

    it(': label', async () => {
      const value = 0;
      const wrapper = mount(Slider, {
        props: {
          value,
        },
      });

      // min = 0, max = 100, label = true (默认)
      // label && 滑块条
      const $label = wrapper.find(`.${classPrefix}-wrap__value`);
      const $bar = wrapper.findAll(`.${classPrefix}__handle`);
      expect($bar.length).toStrictEqual(1);
      expect(Number($label.text())).toEqual(value);
      expect($bar[0].attributes('style').includes(`left: ${value}%;`)).toBeTruthy();

      const newValue = 30;
      await wrapper.setProps({
        value: newValue,
      });
      expect(Number($label.text())).toEqual(newValue);
      expect($bar[0].attributes('style').includes(`left: ${newValue}%;`)).toBeTruthy();
    });
  });

  describe('slots', () => {
    it(': label', () => {
      const label = `<div class="t-slider__label">label</div>`;
      const wrapper = mount(Slider, {
        slots: {
          label,
        },
      });
      const $label = wrapper.find(`.${classPrefix}-wrap__value`);
      expect($label.html().includes(label)).toBeTruthy();
    });
  });

  describe('event', () => {
    it(': change && drag-start && drag-end', async () => {
      const onDragStart = vi.fn();
      const onDragEnd = vi.fn();
      const onChange = vi.fn();
      const value = 0;
      const disabled = true;
      const wrapper = mount(Slider, {
        props: {
          value,
          disabled,
          onDragStart,
          onDragEnd,
          onChange,
        },
      });
      const $bar = wrapper.find(`.${classPrefix}__handle`);

      // disabled = true, 禁止滑动
      await move($bar, 120);
      expect(onDragStart).toHaveBeenCalledTimes(0);
      expect(onDragEnd).toHaveBeenCalledTimes(0);
      expect(onChange).toHaveBeenCalledTimes(0);

      // disabled = false
      await wrapper.setProps({
        disabled: false,
      });
      await move($bar, 120);
      expect(onDragStart).toHaveBeenCalledTimes(1);
      expect(onDragEnd).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });
});
