import { ref } from 'vue';
import { config, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../button/index';
import Calendar from '../calendar';

config.global.stubs = {
  teleport: true,
};

const prefix = 't';
const name = `${prefix}-calendar`;

const raw = '日一二三四五六';
const year = 2022;
const month = 0;
const day = 15;
const minDate = new Date(year, month, 1);
const maxDate = new Date(year, month, 31);
const value = new Date(year, month, day);
const confirmBtn = 'confirmBtn';

const dayFormat = (date, character) => {
  const D = new Date(date);
  const year = D.getFullYear();
  const month = D.getMonth() + 1;
  const dates = D.getDate();
  return [year, month, dates].join(character);
};

describe('calendar', () => {
  describe('props', () => {
    it(': visible', async () => {
      const wrapper = mount(Calendar, {
        props: {
          visible: false,
        },
      });
      await wrapper.setProps({
        visible: true,
      });
    });

    it(': title', async () => {
      const title = '';
      const wrapper = mount(<Calendar title={title} />);
      const $title = wrapper.find(`.${name}__title`);
      expect($title.text()).toEqual(title || '请选择日期');
    });

    it(': confirmBtn', async () => {
      const wrapper = mount(<Calendar visible={true} value={value} confirmBtn={confirmBtn} />);
      const $confirmBtn = wrapper.find(`.${name}__footer`);
      expect($confirmBtn.text()).toEqual(confirmBtn);
    });

    it(': firstDayOfWeek', async () => {
      const firstDayOfWeek = 1;
      const wrapper = mount(<Calendar visible={true} value={value} firstDayOfWeek={firstDayOfWeek} />);
      const $firstDay = wrapper.find(`.${name}__days-item`);
      expect($firstDay.text()).toEqual(raw.split('')[firstDayOfWeek]);
    });

    it(': type', async () => {
      // type = 'range'
      const onSelect = vi.fn();
      const time = ref('');
      const character = '-';
      const onConfirm = vi.fn((e) => {
        time.value = dayFormat(e, character);
      });
      const wrapper = mount(
        <Calendar
          visible={true}
          value={value}
          type="range"
          minDate={minDate}
          maxDate={maxDate}
          onConfirm={onConfirm}
          onSelect={onSelect}
        />,
      );
      const $dates = wrapper.findAll(`.t-calendar__dates-item`);
      expect($dates).toHaveLength(31);

      // 默认日期是2022/1/15， 模拟点选第2项，和第8项
      const selectFirstIndex = 2;
      const selectLastIndex = 8;
      await $dates[selectFirstIndex].trigger('click');
      await $dates[selectLastIndex].trigger('click');
      expect(onSelect).toHaveBeenCalledTimes(2);

      // confirm
      const $button = wrapper.findComponent(Button);
      await $button.trigger('click');

      // TODO：区间选择器时，返回的应该是数组，但测试环境下只有单条 Date 对象数据
      expect(time.value).toEqual([year, month + 1, selectLastIndex + 1].join(character));
      // TODO: && type = 'multiple'

      // 覆盖 type = '' 情况
      const wrapper1 = mount(
        <Calendar
          visible={true}
          value={value}
          type=""
          minDate={minDate}
          maxDate={maxDate}
          onConfirm={onConfirm}
          onSelect={onSelect}
        />,
      );
    });

    it(': format', async () => {
      const suffix = '¥60'; // 每一个日期后均自定义 suffix = '¥60'
      const format = (day) => {
        day.suffix = suffix;
        return day;
      };
      const wrapper = mount(
        <Calendar visible={true} value={value} format={format} minDate={minDate} maxDate={maxDate} />,
      );
      expect(wrapper.element).toMatchSnapshot();
      const $dates = wrapper.findAll(`.${name}__dates-item-suffix`);
      $dates.forEach((item) => {
        expect(item.text()).toEqual(suffix);
      });
    });
  });

  describe('slots', () => {
    it(': confirmBtn', async () => {
      const wrapper = mount(<Calendar visible={true} value={value} />, {
        slots: {
          confirmBtn,
        },
      });
      const $confirmBtn = wrapper.find(`.${name}__footer`);
      expect($confirmBtn.text()).toEqual(confirmBtn);
    });
  });

  describe('events', () => {
    it(': onConfirm', async () => {
      const time = ref('');
      const character = '-';
      const onClose = vi.fn();
      const onConfirm = vi.fn((e) => {
        time.value = dayFormat(e, character);
      });
      const wrapper = mount(<Calendar visible={true} value={value} onConfirm={onConfirm} onClose={onClose} />);
      const $button = wrapper.findComponent(Button);
      await $button.trigger('click');
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(time.value).toEqual([year, month + 1, day].join(character));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it(': onSelect', async () => {
      const time = ref('');
      const character = '-';
      const onConfirm = vi.fn((e) => {
        time.value = dayFormat(e, character);
      });

      const selectTime = ref('');
      const onSelect = vi.fn((e) => {
        selectTime.value = dayFormat(e, character);
      });
      const wrapper = mount(
        <Calendar
          visible={true}
          value={value}
          minDate={minDate}
          maxDate={maxDate}
          onSelect={onSelect}
          onConfirm={onConfirm}
        />,
      );
      const $dates = wrapper.findAll(`.${name}__dates-item`);
      expect($dates).toHaveLength(31);

      // 默认日期是2022/1/15， 模拟点选第2项，触发 onSelect 事件，此时选中日期为2022/1/3
      const selectIndex = 2;
      await $dates[selectIndex].trigger('click');
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(selectTime.value).toEqual([year, month + 1, selectIndex + 1].join(character));
      const $button = wrapper.findComponent(Button);
      await $button.trigger('click');
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(selectTime).toEqual(time);
    });
  });
});
