import { ref } from 'vue';
import { config, mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Button from '../../button/index';
import Calendar from '../calendar';
import { sleep } from '../../shared/util';

config.global.stubs = {
  teleport: false,
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
const rangeValue = [new Date(year, month, day)];
const confirmBtn = 'confirmBtn';

const dayFormat = (date, character) => {
  const D = new Date(date);
  const year = D.getFullYear();
  const month = D.getMonth() + 1;
  const dates = D.getDate();
  return [year, month, dates].join(character);
};

describe('Calendar', () => {
  // 弹层内容 teleport 到 body，用例结束后排空异步任务并清理挂载内容
  afterEach(async () => {
    await sleep(300);
    document.body.innerHTML = '';
  });

  describe('props', () => {
    it('allowSameDay[boolean]', async () => {
      const mountCalendar = (allowSameDay?: boolean) =>
        mount(<Calendar visible={true} type="range" allowSameDay={allowSameDay} minDate={minDate} maxDate={maxDate} />);

      // allowSameDay = true：起止可选择同一天，两次点击同一日期得到 start-end
      const wrapper = mountCalendar(true);
      const $dates = wrapper.findAll(`.${name}__dates-item`);
      await $dates[2].trigger('click');
      await $dates[2].trigger('click');
      // 交互后内容已 teleport 到 body，从 document 查询
      const $startEnd = document.querySelector(`.${name}__dates-item--start-end`);
      expect($startEnd).not.toBeNull();
      expect($startEnd.textContent).toBe('3');
      wrapper.unmount();

      // 默认 allowSameDay = false：再次点击同一日期视为重新开始选择，仅保留 start
      const wrapper2 = mountCalendar();
      const $dates2 = wrapper2.findAll(`.${name}__dates-item`);
      await $dates2[2].trigger('click');
      await $dates2[2].trigger('click');
      expect(document.querySelector(`.${name}__dates-item--start-end`)).toBeNull();
      const $start = document.querySelector(`.${name}__dates-item--start`);
      expect($start).not.toBeNull();
      expect($start.textContent).toBe('3');
    });

    it('confirmBtn[string]', async () => {
      const wrapper = mount(<Calendar visible={true} value={value} confirmBtn={confirmBtn} />);
      const $confirmBtn = wrapper.find(`.${name}__footer`);
      expect($confirmBtn.text()).toEqual(confirmBtn);
    });

    it('confirmBtn[object]', async () => {
      const wrapper = mount(<Calendar visible={true} value={value} confirmBtn={{ content: '确定' }} />);
      const $confirmBtn = wrapper.find(`.${name}__footer`);
      expect($confirmBtn.text()).toEqual('确定');
    });

    it('confirmBtn[function]', async () => {
      const wrapper = mount(<Calendar visible={true} value={value} confirmBtn={() => '确认完成'} />);
      const $confirmBtn = wrapper.find(`.${name}__footer`);
      expect($confirmBtn.text()).toEqual('确认完成');
    });

    it('firstDayOfWeek[number]', async () => {
      const firstDayOfWeek = 1;
      const wrapper = mount(<Calendar visible={true} value={value} firstDayOfWeek={firstDayOfWeek} />);
      const $firstDay = wrapper.find(`.${name}__days-item`);
      expect($firstDay.text()).toEqual(raw.split('')[firstDayOfWeek]);
    });

    it('format[function]', async () => {
      const suffix = '¥60'; // 每一个日期后均自定义 suffix = '¥60'
      const format = (day) => {
        day.suffix = suffix;
        return day;
      };
      const wrapper = mount(
        <Calendar visible={true} value={value} format={format} minDate={minDate} maxDate={maxDate} />,
      );
      // expect(wrapper.element).toMatchSnapshot();
      const $dates = wrapper.findAll(`.${name}__dates-item-suffix`);
      $dates.forEach((item) => {
        expect(item.text()).toEqual(suffix);
      });
    });

    it('maxDate[Date]', async () => {
      // minDate ~ maxDate 跨 1/2/3 三个月，平铺渲染 3 个完整月份
      const wrapper = mount(
        <Calendar visible={true} value={value} minDate={minDate} maxDate={new Date(2022, 2, 15)} />,
      );
      expect(wrapper.findAll(`.${name}__month`)).toHaveLength(3);
      const $dates = wrapper.findAll(`.${name}__dates-item`);
      // 3 个整月：31 + 28 + 31
      expect($dates).toHaveLength(90);
      // maxDate 当天可选，次日及之后禁用
      expect($dates[31 + 28 + 14].classes()).not.toContain(`${name}__dates-item--disabled`);
      expect($dates[31 + 28 + 15].classes()).toContain(`${name}__dates-item--disabled`);
    });

    it('maxDate[number]', async () => {
      const wrapper = mount(
        <Calendar visible={true} value={value} minDate={minDate} maxDate={new Date(2022, 0, 20).getTime()} />,
      );
      const $dates = wrapper.findAll(`.${name}__dates-item`);
      expect($dates).toHaveLength(31);
      // 时间戳入参与 Date 入参一致：20 日（含）之前可选，之后禁用
      expect($dates[19].classes()).not.toContain(`${name}__dates-item--disabled`);
      expect($dates[20].classes()).toContain(`${name}__dates-item--disabled`);
    });

    it('minDate[Date]', async () => {
      const wrapper = mount(
        <Calendar visible={true} value={value} minDate={new Date(2022, 0, 10)} maxDate={maxDate} />,
      );
      const $dates = wrapper.findAll(`.${name}__dates-item`);
      // minDate 不裁剪当月渲染天数，仅影响可选范围：10 日（含）之前禁用
      expect($dates).toHaveLength(31);
      expect($dates[8].classes()).toContain(`${name}__dates-item--disabled`);
      expect($dates[9].classes()).not.toContain(`${name}__dates-item--disabled`);
    });

    it('minDate[number]', async () => {
      const wrapper = mount(
        <Calendar visible={true} value={value} minDate={new Date(2022, 0, 10).getTime()} maxDate={maxDate} />,
      );
      const $dates = wrapper.findAll(`.${name}__dates-item`);
      // 时间戳入参与 Date 入参一致：月初至 9 日均禁用
      expect($dates[0].classes()).toContain(`${name}__dates-item--disabled`);
      expect($dates[9].classes()).not.toContain(`${name}__dates-item--disabled`);
    });

    it('readonly[boolean]', async () => {
      const onSelect = vi.fn();
      const wrapper = mount(
        <Calendar visible={true} value={value} readonly minDate={minDate} maxDate={maxDate} onSelect={onSelect} />,
      );
      const $dates = wrapper.findAll(`.${name}__dates-item`);
      // 默认选中 2022/1/15
      expect($dates[day - 1].classes()).toContain(`${name}__dates-item--selected`);

      // 只读状态点击其它日期不改变选中值，也不触发 select
      await $dates[2].trigger('click');
      expect(onSelect).toHaveBeenCalledTimes(0);
      expect($dates[2].classes()).not.toContain(`${name}__dates-item--selected`);
      expect($dates[day - 1].classes()).toContain(`${name}__dates-item--selected`);
    });

    it('switchMode[string]', async () => {
      const onPanelChange = vi.fn();
      const switchMinDate = new Date(2021, 11, 1);
      const switchMaxDate = new Date(2022, 1, 28);

      // switchMode = none（默认）：平铺展示所有月份，无切换头部
      const wrapper = mount(<Calendar visible={true} value={value} minDate={switchMinDate} maxDate={switchMaxDate} />);
      expect(wrapper.find(`.${name}-header`).exists()).toBe(false);
      expect(wrapper.findAll(`.${name}__month`)).toHaveLength(3);

      // switchMode = month：按月切换，仅上月/下月两个切换按钮，只展示单月日期区
      const wrapper2 = mount(
        <Calendar
          visible={true}
          value={value}
          switchMode="month"
          minDate={switchMinDate}
          maxDate={switchMaxDate}
          onPanelChange={onPanelChange}
        />,
      );
      expect(wrapper2.find(`.${name}-header`).exists()).toBe(true);
      expect(wrapper2.findAll(`.${name}-header__icon`)).toHaveLength(2);
      expect(wrapper2.findAll(`.${name}__dates`)).toHaveLength(1);
      expect(wrapper2.find(`.${name}-header__title`).text()).toContain('2022');

      // 切换到下一月，触发 panelChange 并展示新月份数据
      await wrapper2.findAll(`.${name}-header__icon`)[1].trigger('click');
      expect(onPanelChange).toHaveBeenCalledWith({ year: 2022, month: 2 });
      // 交互后内容已 teleport 到 body，从 document 查询
      expect(document.querySelector(`.${name}-header__title`).textContent).toContain('2');

      // switchMode = year-month：额外支持切年，共 4 个切换按钮
      const wrapper3 = mount(
        <Calendar
          visible={true}
          value={value}
          switchMode="year-month"
          minDate={switchMinDate}
          maxDate={switchMaxDate}
        />,
      );
      expect(wrapper3.findAll(`.${name}-header__icon`)).toHaveLength(4);
    });

    it('title[string]', async () => {
      const title = '';
      const wrapper = mount(<Calendar title={title} />);
      const $title = wrapper.find(`.${name}__title`);
      expect($title.text()).toEqual(title || '请选择日期');
    });

    it('title[function]', async () => {
      const wrapper = mount(<Calendar title={() => '自定义标题'} />);
      const $title = wrapper.find(`.${name}__title`);
      expect($title.text()).toEqual('自定义标题');
    });

    it('type[single/multiple/range]', async () => {
      // type = 'range'
      const onSelect = vi.fn();
      const time = ref('');
      const character = '-';
      const onConfirm = vi.fn((e) => {
        time.value = e;
      });
      const wrapper = mount(
        <Calendar
          visible={true}
          value={rangeValue}
          type="range"
          minDate={minDate}
          maxDate={maxDate}
          onConfirm={onConfirm}
          onSelect={onSelect}
        />,
      );
      const $dates = wrapper.findAll(`.t-calendar__dates-item`);
      expect($dates).toHaveLength(31);

      // 默认日期是2022/1/15， 模拟点选第2项(3号)，和第8项(9号)
      const selectFirstIndex = 2;
      const selectLastIndex = 8;
      await $dates[selectFirstIndex].trigger('click');
      await $dates[selectLastIndex].trigger('click');
      expect(onSelect).toHaveBeenCalledTimes(2);

      // confirm
      const $button = wrapper.findComponent(Button);
      await $button.trigger('click');

      expect(dayFormat(time.value[0])).toEqual(dayFormat([year, month + 1, selectFirstIndex + 1]));
      expect(dayFormat(time.value[1])).toEqual(dayFormat([year, month + 1, selectLastIndex + 1]));
      // TODO: && type = 'multiple'
    });

    it('usePopup[boolean]', async () => {
      const wrapper = mount(<Calendar usePopup={false} value={value} />);
      // 非弹窗模式直接渲染日历模板
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
      expect(wrapper.findComponent({ name: 'TPopup' }).exists()).toBeFalsy();
    });

    // 实现仅消费 value，defaultValue 声明后未在任何路径读取（template.tsx 只读 props.value），待组件支持后再补
    it.todo('defaultValue[Date]');

    it('visible[boolean]', async () => {
      const wrapper = mount(Calendar, {
        props: {
          visible: false,
        },
      });
      await wrapper.setProps({
        visible: true,
      });
    });
  });

  describe('slots', () => {
    it('confirmBtn', async () => {
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
    it('confirm', async () => {
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

    it('select', async () => {
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
