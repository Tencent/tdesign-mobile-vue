import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import dayjs from 'dayjs';

import DateTimePicker from '../date-time-picker';
import PickerItem from '../../picker/picker-item';
import { DEFAULT_ITEM_HEIGHT } from '../../picker/picker.class';
import { DEFAULT_WHEEL_CONFIG } from '../../picker/constants';

const makeTouch = (el, eventName, touchPosition) => {
  const event = new Event(eventName);
  if (touchPosition) {
    event.changedTouches = [touchPosition];
  }

  el.dispatchEvent(event);
};

const simulateMoveOption = async (optionContainerEl, distance) => {
  makeTouch(optionContainerEl, 'touchstart', { pageY: 0 });
  makeTouch(optionContainerEl, 'touchmove', { pageY: -distance * DEFAULT_ITEM_HEIGHT });

  vi.useFakeTimers().advanceTimersByTime(DEFAULT_WHEEL_CONFIG.inertiaTimeThreshold + 1);
  makeTouch(optionContainerEl, 'touchend', { pageY: -distance * DEFAULT_ITEM_HEIGHT });
  vi.useRealTimers();

  await nextTick();
};

const prefix = 't';
const name = `${prefix}-date-time-picker`;

const renderLabel = (type, value) => {
  if (type === 'year') {
    return `${value}年`;
  }
  if (type === 'month') {
    return `${value}月`;
  }
  if (type === 'date') {
    return `${value}日`;
  }
  return value;
};

const addZero = (el) => {
  return el < 10 ? `0${el}` : el;
};

// 获取当前月份的天数
const getDateCount = (Y, M) => {
  const d = new Date(Y, M, 0);
  return d.getDate();
};

// 相关日期计算
const precisionRankRecord = ['year', 'month', 'date', 'hour', 'minute', 'second'];
const currentDate = new Date('2023-10-13');
const Y = currentDate.getFullYear();
const M = currentDate.getMonth() + 1;
const D = currentDate.getDate();
const defaultDateTime = `${Y}-${addZero(M)}-${addZero(D)}`;

const ret = [];
const generateColumn = (start, end, type) => {
  const arr = [];
  for (let i = start; i <= end; i++) {
    const value = i.toString();
    arr.push({
      label: renderLabel ? renderLabel(type, i) : value,
      value: type === 'month' ? `${+value - 1}` : value,
    });
  }
  ret.push(arr);
};

describe('DateTimePicker', () => {
  describe('props', () => {
    it('footer[function]', async () => {
      const wrapper = mount(DateTimePicker, {
        props: {
          visible: true,
          footer: () => <div class="dtp-footer">自定义底部</div>,
        },
      });
      expect(wrapper.find('.dtp-footer').exists()).toBeTruthy();
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

    it('mode[string]', async () => {
      const onPick = vi.fn();
      const wrapper = mount(DateTimePicker, {
        props: {
          defaultValue: defaultDateTime,
          title: 'mode 测试',
          mode: ['date', 'second'],
          onPick,
        },
      });
      // mode = ['date', 'second'], 渲染年月日时分秒，6列
      const pickerItem = wrapper.findComponent(PickerItem);
      expect(pickerItem.exists()).toBeTruthy();
      const $pickerItems = wrapper.findAllComponents(PickerItem);
      expect($pickerItems).toHaveLength(6);

      // pick
      const el = wrapper.findAll(`.${prefix}-picker-item`);
      const touchItemIndex = 0;
      const touchIndex = 2;
      simulateMoveOption(el[touchItemIndex].element, touchIndex);
    });

    it('mode[time]', async () => {
      const wrapper = mount(DateTimePicker, {
        props: {
          value: '10:00:00',
          mode: [null, 'second'],
          format: 'HH:mm:ss',
          start: '2023-06-13',
        },
      });
      expect(wrapper.vm.value).toStrictEqual('10:00:00');
    });

    it('renderLabel[function]', async () => {
      generateColumn(Y - 10, Y + 10, 'year');
      generateColumn(1, 12, 'month');
      generateColumn(1, getDateCount(Y, M), 'date');

      const defaultValue = defaultDateTime;
      const wrapper = mount(DateTimePicker, {
        props: {
          defaultValue,
          title: '自定义label',
          renderLabel,
        },
      });
      // mode = 'date', 渲染年月日，3列
      const $pickerItems = wrapper.findAllComponents(PickerItem);
      expect($pickerItems.length).toEqual(3);

      const res = {};
      $pickerItems.forEach((item, index) => {
        res[precisionRankRecord[index]] = item.findAll(`.${prefix}-picker-item__item`);
      });

      Object.keys(res).forEach((key, keyIndex) => {
        expect(res[key].length).toEqual(ret[keyIndex].length);
        res[key].forEach((item, itemIndex) => {
          // expect(item.text()).toEqual(ret[keyIndex][itemIndex].label);
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

    it('start & end', async () => {
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
      const res = {};
      $pickerItems.forEach((item, index) => {
        res[precisionRankRecord[index]] = item.findAll(`.${prefix}-picker-item__item`);
      });
      expect(res[precisionRankRecord[0]].length).toEqual(endYear - startYear + 1);

      // 设置到最后一天
      await wrapper.setProps({ value: end });

      $pickerItems.forEach((item, index) => {
        const { length } = item.findAll(`.${prefix}-picker-item__item`);
        const counter = [6, 10, 10, 11, 11, 11];
        expect(length).toBe(counter[index]);
      });
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

    it('title & confirmBtn & cancelBtn', async () => {
      const title = '';
      const confirmBtn = '';
      const cancelBtn = '';
      const wrapper = mount(DateTimePicker, {
        props: {
          title,
          confirmBtn,
          cancelBtn,
        },
      });
      const $title = wrapper.find(`.${prefix}-picker__title`);
      const $confirmButton = wrapper.find(`.${prefix}-picker__confirm`);
      const $cancelButton = wrapper.find(`.${prefix}-picker__cancel`);
      expect($title.text()).toBe(title || '选择时间');
      expect($confirmButton.text()).toBe(confirmBtn || '确定');
      expect($cancelButton.text()).toBe(cancelBtn || '取消');

      const newTitle = '标题测试';
      const newConfirmBtn = 'confirm';
      const newCancelBtn = 'cancel';
      await wrapper.setProps({
        title: newTitle,
        confirmBtn: newConfirmBtn,
        cancelBtn: newCancelBtn,
      });
      expect($title.text()).toBe(newTitle || '选择时间');
      expect($confirmButton.text()).toBe(newConfirmBtn || '确定');
      expect($cancelButton.text()).toBe(newCancelBtn || '取消');
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
      expect(onCancel).toBeCalledTimes(1);
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
      simulateMoveOption(el[touchItemIndex].element, touchIndex);
      expect(wrapper.element).toMatchSnapshot();
      expect(onPick).toBeCalledTimes(1);
      await $confirmButton.trigger('click');
      expect(onConfirm).toBeCalledTimes(2);
      expect(onChange).toBeCalledTimes(2);
      expect(initValue.value).toEqual(`${ret[touchItemIndex][10 + touchIndex].value}-${addZero(M)}-${addZero(D)}`);
    });
  });
});
