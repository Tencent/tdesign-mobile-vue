import { nextTick, ref } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import dayjs from 'dayjs';

import DateTimePicker from '../date-time-picker';
import ConfigProvider from '../../config-provider';
import PickerItem from '../../picker/picker-item';
import { DEFAULT_ITEM_HEIGHT } from '../../picker/picker.class';
import { DEFAULT_WHEEL_CONFIG } from '../../picker/constants';

const makeTouch = (el: Element, eventName: string, touchPosition?: { pageY: number }) => {
  const event = new Event(eventName);
  if (touchPosition) {
    Object.defineProperty(event, 'changedTouches', { value: [touchPosition] });
  }

  el.dispatchEvent(event);
};

const simulateMoveOption = async (optionContainerEl: Element, distance: number) => {
  makeTouch(optionContainerEl, 'touchstart', { pageY: 0 });
  makeTouch(optionContainerEl, 'touchmove', { pageY: -distance * DEFAULT_ITEM_HEIGHT });

  vi.useFakeTimers().advanceTimersByTime(DEFAULT_WHEEL_CONFIG.inertiaTimeThreshold + 1);
  makeTouch(optionContainerEl, 'touchend', { pageY: -distance * DEFAULT_ITEM_HEIGHT });
  vi.useRealTimers();

  await nextTick();
};

const prefix = 't';
const name = `${prefix}-date-time-picker`;

const renderLabel = (type: string, value: number): string => {
  if (type === 'year') {
    return `${value}年`;
  }
  if (type === 'month') {
    return `${value}月`;
  }
  if (type === 'date') {
    return `${value}日`;
  }
  return String(value);
};

const addZero = (el: number) => {
  return el < 10 ? `0${el}` : el;
};

// 获取当前月份的天数
const getDateCount = (Y: number, M: number) => {
  const d = new Date(Y, M, 0);
  return d.getDate();
};

// 相关日期计算
const currentDate = new Date('2023-10-13');
const Y = currentDate.getFullYear();
const M = currentDate.getMonth() + 1;
const D = currentDate.getDate();
const defaultDateTime = `${Y}-${addZero(M)}-${addZero(D)}`;

const getActiveTexts = (wrapper: VueWrapper) =>
  wrapper.findAll(`.${prefix}-picker-item`).map((column) => column.get(`.${prefix}-picker-item__item--active`).text());

describe('DateTimePicker', () => {
  describe('props', () => {
    it('cancelBtn[string] & confirmBtn[string]', async () => {
      const wrapper = mount(DateTimePicker, { props: { cancelBtn: '取消选择', confirmBtn: '确认选择' } });
      expect(wrapper.find(`.${prefix}-picker__cancel`).text()).toBe('取消选择');
      expect(wrapper.find(`.${prefix}-picker__confirm`).text()).toBe('确认选择');
      await wrapper.setProps({ cancelBtn: '取消', confirmBtn: '确定' });
      expect(wrapper.find(`.${prefix}-picker__cancel`).text()).toBe('取消');
      expect(wrapper.find(`.${prefix}-picker__confirm`).text()).toBe('确定');
    });

    it('end[number]', () => {
      const end = new Date(2023, 9, 13).getTime();
      const wrapper = mount(DateTimePicker, {
        props: { end, defaultValue: '2024-01-01', mode: 'date' },
      });
      expect(getActiveTexts(wrapper)).toEqual(['2023 年', '10 月', '13 日']);
      expect(wrapper.findAllComponents(PickerItem)[0].findAll('.t-picker-item__item').at(-1).text()).toBe('2023 年');
    });

    it('footer[function]', async () => {
      const wrapper = mount(DateTimePicker, {
        props: {
          visible: true,
          footer: () => <div class="dtp-footer">自定义底部</div>,
        },
      });
      expect(wrapper.find('.dtp-footer').exists()).toBeTruthy();
    });

    it('footer[slot]', () => {
      const wrapper = mount(DateTimePicker, { slots: { footer: () => <span class="slot-footer">底部</span> } });
      expect(wrapper.find('.slot-footer').text()).toBe('底部');
    });

    it('format[string]', async () => {
      const onPick = vi.fn();
      const onConfirm = vi.fn();
      const wrapper = mount(DateTimePicker, {
        props: {
          value: defaultDateTime,
          mode: 'date',
          format: 'YYYY/MM/DD',
          onPick,
          onConfirm,
        },
      });

      // 滚动日期列（13 日 → 15 日），pick 事件按 format 输出
      simulateMoveOption(wrapper.findAll(`.${prefix}-picker-item`)[2].element, 2);
      expect(onPick).toHaveBeenLastCalledWith('2023/10/15');

      // confirm 事件同样按 format 输出
      await wrapper.find(`.${prefix}-picker__confirm`).trigger('click');
      expect(onConfirm).toHaveBeenLastCalledWith('2023/10/15');

      // format = 'time-stamp'：confirm 返回毫秒级时间戳
      const onStampConfirm = vi.fn();
      const wrapper2 = mount(DateTimePicker, {
        props: {
          value: defaultDateTime,
          mode: 'date',
          format: 'time-stamp',
          onConfirm: onStampConfirm,
        },
      });
      await wrapper2.find(`.${prefix}-picker__confirm`).trigger('click');
      expect(onStampConfirm).toHaveBeenLastCalledWith(new Date(Y, M - 1, D).getTime());
    });

    it('header[function]', async () => {
      const wrapper = mount(DateTimePicker, {
        props: {
          visible: true,
          header: () => <div class="dtp-header">自定义头部</div>,
        },
      });
      expect(wrapper.find('.dtp-header').exists()).toBeTruthy();
    });

    it('header[slot]', () => {
      const wrapper = mount(DateTimePicker, { slots: { header: () => <span class="slot-header">头部</span> } });
      expect(wrapper.find('.slot-header').text()).toBe('头部');
    });

    it('mode[array]', async () => {
      const wrapper = mount(DateTimePicker, {
        props: {
          defaultValue: defaultDateTime,
          mode: ['date', 'second'],
        },
      });
      // mode = ['date', 'second'], 渲染年月日时分秒，6列
      const $pickerItems = wrapper.findAllComponents(PickerItem);
      expect($pickerItems).toHaveLength(6);
    });

    it('mode[array<null,string>]', () => {
      const wrapper = mount(DateTimePicker, {
        props: {
          value: '10:00:00',
          mode: [null, 'second'],
          format: 'HH:mm:ss',
          start: '2023-06-13',
        },
      });
      // 日期部分为 null：仅渲染时/分/秒 3 列
      expect(wrapper.findAllComponents(PickerItem)).toHaveLength(3);
      expect(getActiveTexts(wrapper)).toEqual(['10 时', '0 分', '0 秒']);
    });

    it('renderLabel[function]', async () => {
      // 年列范围 Y-10 ~ Y+10，月列 1-12，日列为当月天数
      const expectedCounts = [21, 12, getDateCount(Y, M)];

      const wrapper = mount(DateTimePicker, {
        props: {
          defaultValue: defaultDateTime,
          title: '自定义label',
          renderLabel,
        },
      });
      // mode = 'date', 渲染年月日，3列
      const $pickerItems = wrapper.findAllComponents(PickerItem);
      expect($pickerItems.length).toEqual(3);

      $pickerItems.forEach((item, index) => {
        const items = item.findAll(`.${prefix}-picker-item__item`);
        expect(items.length).toEqual(expectedCounts[index]);
        items.forEach((label) => {
          expect(label.text()).toMatch(/年$|月$|日$/);
        });
      });
    });

    it('showWeek[boolean]', async () => {
      const getDateColumnTexts = (showWeek?: boolean) => {
        const wrapper = mount(DateTimePicker, {
          props: { defaultValue: defaultDateTime, mode: 'date', showWeek },
        });
        return wrapper
          .findAll(`.${prefix}-picker-item`)[2]
          .findAll(`.${prefix}-picker-item__item`)
          .slice(0, 3)
          .map((item) => item.text());
      };
      // showWeek = true：日期旁边附带周几（2023/10/1 为周日）
      expect(getDateColumnTexts(true)).toEqual(['1日 Sun', '2日 Mon', '3日 Tue']);
      // 默认不显示周几
      expect(getDateColumnTexts()).toEqual(['1 日', '2 日', '3 日']);
    });

    it('start[string] & end[string]', async () => {
      const start = '2020-6-30 10:00:00';
      const end = '2025-10-10 10:10:10';
      const startYear = start.split('-')[0];
      const endYear = end.split('-')[0];

      const wrapper = mount(DateTimePicker, {
        props: {
          value: start,
          start,
          end,
          mode: 'second',
        },
      });
      const $pickerItems = wrapper.findAllComponents(PickerItem);
      const yearItemCount = $pickerItems[0].findAll(`.${prefix}-picker-item__item`).length;
      expect(yearItemCount).toEqual(Number(endYear) - Number(startYear) + 1);

      // 设置到最后一天
      await wrapper.setProps({ value: end });

      $pickerItems.forEach((item, index) => {
        const { length } = item.findAll(`.${prefix}-picker-item__item`);
        const counter = [6, 10, 10, 11, 11, 11];
        expect(length).toBe(counter[index]);
      });
    });

    it('start[number]', () => {
      const start = new Date(2023, 9, 13).getTime();
      const wrapper = mount(DateTimePicker, {
        props: { start, defaultValue: '2022-01-01', mode: 'date' },
      });
      expect(getActiveTexts(wrapper)).toEqual(['2023 年', '10 月', '13 日']);
      expect(wrapper.findAllComponents(PickerItem)[0].get('.t-picker-item__item').text()).toBe('2023 年');
    });

    it('steps[object]', async () => {
      // mode = 'minute' 渲染 年/月/日/时/分 5 列，分钟列按 steps.step 间隔生成
      const wrapper = mount(DateTimePicker, {
        props: { defaultValue: `${defaultDateTime} 10:20`, mode: 'minute', steps: { minute: 10 } },
      });
      const $pickerItems = wrapper.findAll(`.${prefix}-picker-item`);
      expect($pickerItems).toHaveLength(5);

      const $minuteItems = $pickerItems[4].findAll(`.${prefix}-picker-item__item`);
      expect($minuteItems).toHaveLength(6);
      const minuteTexts = $minuteItems.map((item) => item.text());
      expect(minuteTexts).toEqual(['0 分', '10 分', '20 分', '30 分', '40 分', '50 分']);

      // 默认 step = 1，分钟列为 60 项
      const wrapper2 = mount(DateTimePicker, {
        props: { defaultValue: `${defaultDateTime} 10:20`, mode: 'minute' },
      });
      expect(wrapper2.findAll(`.${prefix}-picker-item`)[4].findAll(`.${prefix}-picker-item__item`)).toHaveLength(60);
    });

    it('title[string]', async () => {
      // 空字符串回退全局配置默认文案
      const wrapper = mount(DateTimePicker, {
        props: {
          title: '',
          confirmBtn: '',
          cancelBtn: '',
        },
      });
      expect(wrapper.find(`.${prefix}-picker__title`).text()).toBe('选择时间');
      expect(wrapper.find(`.${prefix}-picker__confirm`).text()).toBe('确定');
      expect(wrapper.find(`.${prefix}-picker__cancel`).text()).toBe('取消');

      const newTitle = '标题测试';
      await wrapper.setProps({ title: newTitle });
      expect(wrapper.find(`.${prefix}-picker__title`).text()).toBe(newTitle);
    });

    it('value[string]', async () => {
      const value = ref(defaultDateTime);
      const wrapper = mount({
        setup() {
          return () => <DateTimePicker v-model:value={value.value} mode="date" />;
        },
      });

      // 受控初值 2023-10-13 同步到年/月/日三列选中态
      expect(getActiveTexts(wrapper)).toEqual(['2023 年', '10 月', '13 日']);

      // 外部更新受控值，各列选中态跟随
      value.value = '2021-05-01';
      await nextTick();
      await nextTick();
      expect(getActiveTexts(wrapper)).toEqual(['2021 年', '5 月', '1 日']);

      // 滚动日期列后确认，受控值经 update:value 回写为新日期
      simulateMoveOption(wrapper.findAll(`.${prefix}-picker-item`)[2].element, 2);
      await wrapper.find(`.${prefix}-picker__confirm`).trigger('click');
      expect(value.value).toBe('2021-05-03 00:00:00');
    });

    it('value[number]', async () => {
      const onConfirm = vi.fn();
      const wrapper = mount(DateTimePicker, {
        props: { value: new Date(2023, 9, 13).getTime(), mode: 'date', format: 'time-stamp', onConfirm },
      });
      expect(getActiveTexts(wrapper)).toEqual(['2023 年', '10 月', '13 日']);
      const updated = new Date(2021, 4, 1).getTime();
      await wrapper.setProps({ value: updated });
      await nextTick();
      expect(getActiveTexts(wrapper)).toEqual(['2021 年', '5 月', '1 日']);
      await wrapper.get('.t-picker__confirm').trigger('click');
      expect(onConfirm).toHaveBeenCalledExactlyOnceWith(updated);
    });

    it('modelValue[string]', () => {
      const wrapper = mount(DateTimePicker, { props: { modelValue: defaultDateTime, mode: 'date' } });
      expect(getActiveTexts(wrapper)).toEqual(['2023 年', '10 月', '13 日']);
    });

    it('modelValue[number]', async () => {
      const modelValue = new Date(2023, 9, 13).getTime();
      const onConfirm = vi.fn();
      const wrapper = mount(DateTimePicker, {
        props: { modelValue, mode: 'date', format: 'time-stamp', onConfirm },
      });
      expect(getActiveTexts(wrapper)).toEqual(['2023 年', '10 月', '13 日']);
      await wrapper.get('.t-picker__confirm').trigger('click');
      expect(onConfirm).toHaveBeenCalledExactlyOnceWith(modelValue);
      expect(wrapper.emitted('update:modelValue')).toEqual([[modelValue]]);
    });

    it('defaultValue[string]', () => {
      const wrapper = mount(DateTimePicker, { props: { defaultValue: defaultDateTime, mode: 'date' } });
      expect(getActiveTexts(wrapper)).toEqual(['2023 年', '10 月', '13 日']);
    });

    it('defaultValue[number]', () => {
      const wrapper = mount(DateTimePicker, {
        props: { defaultValue: new Date(2023, 9, 13).getTime(), mode: 'date' },
      });
      expect(getActiveTexts(wrapper)).toEqual(['2023 年', '10 月', '13 日']);
    });
  });

  describe('events', () => {
    it('cancel', async () => {
      const onCancel = vi.fn();
      const wrapper = mount(DateTimePicker, {
        props: {
          onCancel,
        },
      });
      const $cancelButton = wrapper.find(`.${prefix}-picker__cancel`);
      await $cancelButton.trigger('click');
      expect(onCancel).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
      expect(onCancel).toBeCalledTimes(1);
    });

    it('confirm', async () => {
      const onConfirm = vi.fn();
      const wrapper = mount(DateTimePicker, {
        props: { value: defaultDateTime, mode: 'date', onConfirm },
      });
      await wrapper.find(`.${prefix}-picker__confirm`).trigger('click');
      // 默认 format 输出完整日期时间字符串
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onConfirm).toHaveBeenLastCalledWith(`${defaultDateTime} 00:00:00`);
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(DateTimePicker, {
        props: { value: defaultDateTime, mode: 'date', onChange },
      });
      await wrapper.find(`.${prefix}-picker__confirm`).trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(`${defaultDateTime} 00:00:00`);
    });

    it('pick', async () => {
      const initValue = ref(defaultDateTime);
      const onConfirm = vi.fn((e) => {
        // confirm && change && pick 事件的返回值格式是 yyyy-mm-dd hh:mm:ss, 需要自行处理。
        // Q: 返回值是否应该按照 mode 类型返回？
        initValue.value = String(e).split(' ')[0].trim();
      });
      const onChange = vi.fn();
      const onPick = vi.fn();
      const wrapper = mount(DateTimePicker, {
        props: {
          value: initValue.value,
          onConfirm,
          onChange,
          onPick,
        },
      });
      const $confirmButton = wrapper.find(`.${prefix}-picker__confirm`);
      await $confirmButton.trigger('click');
      expect(onConfirm).toBeCalledTimes(1);
      expect(onChange).toBeCalledTimes(1);
      expect(onPick).toBeCalledTimes(0);
      const el = wrapper.findAll(`.${prefix}-picker-item`);
      const touchItemIndex = 0;
      const touchIndex = 2;
      await simulateMoveOption(el[touchItemIndex].element, touchIndex);
      expect(onPick).toBeCalledTimes(1);
      await $confirmButton.trigger('click');
      expect(onConfirm).toBeCalledTimes(2);
      expect(onChange).toBeCalledTimes(2);
      // 年列从 2023（第 11 项）滚动 2 项后选中 2025
      expect(initValue.value).toEqual(`${Y + touchIndex}-${addZero(M)}-${addZero(D)}`);
    });
  });

  describe('globalConfig', () => {
    it('dateTimePicker', () => {
      const wrapper = mount(
        <ConfigProvider globalConfig={{ dateTimePicker: { yearLabel: '年号', monthLabel: '月号', dateLabel: '日号' } }}>
          <DateTimePicker defaultValue={defaultDateTime} mode="date" />
        </ConfigProvider>,
      );
      const columns = wrapper.findAllComponents(PickerItem);
      expect(columns[0].find(`.${prefix}-picker-item__item--active`).text()).toContain('年号');
      expect(columns[1].find(`.${prefix}-picker-item__item--active`).text()).toContain('月号');
      expect(columns[2].find(`.${prefix}-picker-item__item--active`).text()).toContain('日号');
    });
  });

  describe('scenarios', () => {
    // modelValue 在 setup 中被复制到独立 ref，外部更新不会同步到日期列。
    it.todo('external modelValue changes update the selected date');
  });
});
