import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import CalendarTemplate from '../template';
import type { TdCalendarProps } from '../type';
import Button from '../../button';

const minDate = new Date(2022, 0, 1);
const maxDate = new Date(2022, 0, 31);

const mountTemplate = (props = {}, templateProps: TdCalendarProps = {}) =>
  mount(CalendarTemplate, {
    props,
    global: {
      provide: {
        templateProps: {
          minDate,
          maxDate,
          value: minDate,
          type: 'single',
          switchMode: 'none',
          usePopup: true,
          ...templateProps,
        },
      },
    },
  });

describe('CalendarTemplate', () => {
  describe('props', () => {
    it('confirmBtn[string]', () => {
      const wrapper = mountTemplate({ confirmBtn: '完成' });
      expect(wrapper.findComponent(Button).text()).toBe('完成');
    });

    it('confirmBtn[object]', () => {
      const wrapper = mountTemplate({ confirmBtn: { content: '完成', disabled: true } });
      expect(wrapper.findComponent(Button).props('disabled')).toBe(true);
      expect(wrapper.findComponent(Button).text()).toBe('完成');
    });

    // 模板直接返回函数而不执行；公开 Calendar 由父组件提前渲染该函数。
    it.todo('confirmBtn[function]');

    it('confirmBtn[null]', () => {
      expect(mountTemplate({ confirmBtn: null }).findComponent(Button).exists()).toBe(false);
    });

    it('title[string]', () => {
      expect(mountTemplate({ title: '标题' }).find('.t-calendar__title').text()).toBe('标题');
    });

    // 同 confirmBtn，函数输入依赖父组件预先渲染。
    it.todo('title[function]');

    it('title[object]', () => {
      const wrapper = mountTemplate({ title: <span class="custom-title">标题节点</span> });
      expect(wrapper.find('.custom-title').text()).toBe('标题节点');
    });
  });

  describe('events', () => {
    it('visible-change', async () => {
      const wrapper = mountTemplate();
      await wrapper.find('.t-calendar__close-btn').trigger('click');
      expect(wrapper.emitted('visible-change')).toEqual([[]]);
    });
  });

  describe('slots', () => {
    it('cell', () => {
      const wrapper = mount(CalendarTemplate, {
        global: {
          provide: { templateProps: { minDate, maxDate, value: minDate, type: 'single', switchMode: 'none' } },
        },
        slots: { cell: ({ item }) => <span class="custom-cell">日期{item.day}</span> },
      });
      expect(wrapper.findAll('.custom-cell')).toHaveLength(31);
      expect(wrapper.find('.custom-cell').text()).toBe('日期1');
    });
  });

  describe('scenarios', () => {
    it('selecting without a confirm button triggers change', async () => {
      const onChange = vi.fn();
      const wrapper = mountTemplate({ confirmBtn: null }, { onChange });
      await wrapper.findAll('.t-calendar__dates-item')[2].trigger('click');
      expect(onChange).toHaveBeenCalledWith(new Date(2022, 0, 3));
    });
  });
});
