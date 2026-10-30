import { nextTick, ref } from 'vue';
import { isFunction } from 'lodash-es';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Picker from '../picker';
import PickerItem from '../picker-item';
import { getPickerColumns } from '../utils';

import { DEFAULT_ITEM_HEIGHT } from '../picker.class';
import { DEFAULT_WHEEL_CONFIG } from '../constants';

const getRealColumns = (columns) => {
  if (isFunction(columns)) {
    const _columns = columns();
    return getPickerColumns(_columns);
  }
  return getPickerColumns(columns);
};

const seasonOptions = [
  { label: '春', value: 'spring' },
  { label: '夏', value: 'summer' },
  { label: '秋', value: 'autumn' },
  { label: '冬', value: 'winter' },
];

const commonProps = {
  columns: [seasonOptions],
  defaultValue: [seasonOptions[0].value],
};

const mountPicker = (props) =>
  mount(Picker, {
    props: { ...commonProps, ...props },
  });

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

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

describe('Picker', () => {
  describe('props', () => {
    it('cancelBtn[string]', () => {
      const testCancelBtn = (cancelBtn) => {
        const wrapper = mountPicker({ cancelBtn });
        const textContainer = wrapper.find('.t-picker__cancel');
        expect(textContainer.text()).toBe(cancelBtn || '取消');
      };

      testCancelBtn();
      testCancelBtn('Cancel');
    });

    it('columns[array]', () => {
      const testColumns = (columns, isValidColumns = true) => {
        const wrapper = mountPicker({ columns });
        const itemContainers = wrapper.findAll('.t-picker-item__item');

        if (!isValidColumns) {
          return expect(itemContainers).toHaveLength(0);
        }

        const _columns = getRealColumns(columns);

        expect(itemContainers).toHaveLength(_columns[0].length);

        itemContainers.forEach((container, index) => {
          if (_columns[index]?.label) {
            expect(container.text()).toBe(_columns[index]?.label);
          }
        });
      };

      testColumns([undefined], true);
      testColumns(undefined, false);
      testColumns([seasonOptions]);
    });

    it('columns[function]', () => {
      const columns = () => [seasonOptions];
      const wrapper = mountPicker({ columns });
      const itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(seasonOptions.length);
    });

    it('confirmBtn[string]', () => {
      const testConfirmBtn = (confirmBtn) => {
        const wrapper = mountPicker({ confirmBtn });
        const textContainer = wrapper.find('.t-picker__confirm');
        expect(textContainer.text()).toBe(confirmBtn || '确认');
      };

      testConfirmBtn();
      testConfirmBtn('Confirm');
    });

    it('footer[string]', () => {
      // footer 类型声明为 TNode，运行时 prop 仅声明 Function，传字符串会有预期内的类型告警，这里静默处理
      const wrapper = mount(Picker, {
        props: { ...commonProps, footer: '自定义底部' },
        global: { config: { warnHandler: () => {} } },
      });
      const $picker = wrapper.find('.t-picker');
      expect($picker.text()).toContain('自定义底部');
      // 底部内容渲染在面板最后（字符串渲染为文本节点）
      const { childNodes } = $picker.element;
      expect(childNodes[childNodes.length - 1].textContent).toBe('自定义底部');
    });

    it('footer[function]', () => {
      const wrapper = mountPicker({ footer: () => <div class="picker-footer">自定义底部</div> });
      expect(wrapper.find('.picker-footer').exists()).toBe(true);
      expect(wrapper.find('.picker-footer').text()).toBe('自定义底部');
    });

    it('header[string]', () => {
      // header 类型声明为 TNode，运行时 prop 仅声明 Function，传字符串会有预期内的类型告警，这里静默处理
      const wrapper = mount(Picker, {
        props: { ...commonProps, header: '自定义头部' },
        global: { config: { warnHandler: () => {} } },
      });
      const $picker = wrapper.find('.t-picker');
      expect($picker.text()).toContain('自定义头部');
      // 头部内容渲染在工具栏之后（字符串渲染为文本节点）
      expect($picker.element.childNodes[1].textContent).toBe('自定义头部');
    });

    it('header[function]', () => {
      const wrapper = mountPicker({ header: () => <div class="picker-header">自定义头部</div> });
      expect(wrapper.find('.picker-header').exists()).toBe(true);
      expect(wrapper.find('.picker-header').text()).toBe('自定义头部');
    });

    it('keys[object]', async () => {
      const aliasOptions = [
        { text: '春', val: 'spring' },
        { text: '夏', val: 'summer' },
      ];
      const onConfirm = vi.fn();
      const wrapper = mountPicker({
        columns: [aliasOptions],
        keys: { label: 'text', value: 'val' },
        defaultValue: ['summer'],
        onConfirm,
      });
      // keys 别名解析 columns 的 label/value，defaultValue 按 val 匹配选中
      const $items = wrapper.findAll('.t-picker-item__item');
      expect($items).toHaveLength(2);
      expect($items[0].text()).toBe('春');
      expect($items[1].text()).toBe('夏');
      expect(wrapper.find('.t-picker-item__item--active').text()).toBe('夏');

      // 确认时按别名返回 value/label
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(onConfirm).toHaveBeenCalledWith(['summer'], { index: [1], label: ['夏'], e: expect.any(MouseEvent) });
    });

    it('renderLabel[function]', () => {
      const renderLabel = (item) => `${item.label} ${item.value}`;
      const wrapper = mountPicker({ renderLabel });
      const itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(seasonOptions.length);

      itemContainers.forEach((container, index) => expect(container.text()).toBe(renderLabel(seasonOptions[index])));
    });

    it('swipeDuration[number]', () => {
      // swipeDuration 惯性滚动时长透传给滚轮子组件；优先级高于 wheelConfig.inertiaDuration
      const wrapper = mountPicker({ swipeDuration: 500 });
      expect(wrapper.findComponent(PickerItem).props('wheelConfig')).toEqual({
        ...DEFAULT_WHEEL_CONFIG,
        inertiaDuration: 500,
      });

      const wrapper2 = mountPicker({ swipeDuration: 500, wheelConfig: { inertiaDuration: 999 } });
      expect(wrapper2.findComponent(PickerItem).props('wheelConfig').inertiaDuration).toBe(500);
    });

    it('title[string]', () => {
      const testTitle = (title) => {
        const wrapper = mountPicker({ title });
        const textContainer = wrapper.find('.t-picker__title');
        expect(textContainer.text()).toBe(title || '');
      };

      testTitle();
      testTitle('Choose Season');
    });

    it('value[array]', async () => {
      const value = ref([seasonOptions[1].value]);
      const wrapper = mount(<Picker v-model={value.value} {...commonProps} />);
      const textContainer = wrapper.find('.t-picker-item__item--active');
      expect(textContainer.text()).toBe(seasonOptions[1].label);

      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(value.value).toStrictEqual([seasonOptions[3].value]);
    });

    it('defaultValue[array]', () => {
      const selector = '.t-picker-item__item--active';
      // valid option value
      let wrapper = mountPicker({ defaultValue: [seasonOptions[1].value] });
      let textContainer = wrapper.find(selector);
      expect(textContainer.text()).toBe(seasonOptions[1].label);

      // invalid option value
      wrapper = mountPicker({ defaultValue: ['NOT_EXIST'] });
      textContainer = wrapper.find(selector);
      expect(textContainer.text()).toBe(seasonOptions[0].label);
    });

    it('wheelConfig[object]', () => {
      // wheelConfig 与默认配置合并后透传给滚轮子组件
      const wrapper = mountPicker({ wheelConfig: { bounceDuration: 50, transitionDuration: 200 } });
      expect(wrapper.findComponent(PickerItem).props('wheelConfig')).toEqual({
        ...DEFAULT_WHEEL_CONFIG,
        bounceDuration: 50,
        transitionDuration: 200,
      });

      // swipeDuration 存在默认值，其优先级高于 wheelConfig.inertiaDuration
      const wrapper2 = mountPicker({ wheelConfig: { inertiaDuration: 999 } });
      expect(wrapper2.findComponent(PickerItem).props('wheelConfig').inertiaDuration).toBe(300);
    });
  });

  describe('events', () => {
    it('cancel', async () => {
      const onCancel = vi.fn();
      const wrapper = mountPicker({ onCancel });
      await wrapper.find('.t-picker__cancel').trigger('click');

      expect(onCancel).toBeCalledTimes(1);
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mountPicker({ onChange });
      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith([seasonOptions[2].value]);
    });

    it('confirm', async () => {
      const onConfirm = vi.fn();
      const wrapper = mountPicker({ onConfirm });
      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(onConfirm).toBeCalledTimes(1);
      expect(onConfirm).toBeCalledWith([seasonOptions[2].value], {
        e: expect.any(MouseEvent),
        index: [2],
        label: ['秋'],
      });
    });

    it('pick', async () => {
      // columns is static array
      const onPick = vi.fn();
      let wrapper = mountPicker({ onPick, columns: [seasonOptions] });
      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
      expect(onPick).toBeCalledTimes(1);
      expect(onPick).toBeCalledWith([seasonOptions[2].value], { column: 0, index: 2 });

      // columns is function, can change dynamically
      let monthOptions = [];
      const columns = (item = seasonOptions[0].value) => {
        switch (item[0]) {
          case 'spring':
            monthOptions = [
              { label: '一月', value: 'January' },
              { label: '二月', value: 'February' },
              { label: '三月', value: 'March' },
            ];
            break;
          case 'summer':
            monthOptions = [
              { label: '四月', value: 'April' },
              { label: '五月', value: 'May' },
              { label: '六月', value: 'June' },
            ];
            break;
          case 'autumn':
            monthOptions = [
              { label: '七月', value: 'July' },
              { label: '八月', value: 'August' },
              { label: '九月', value: 'September' },
            ];
            break;
          case 'winter':
            monthOptions = [
              { label: '十月', value: 'October' },
              { label: '十一月', value: 'November' },
              { label: '十二月', value: 'December' },
            ];
            break;
          default:
            throw new Error('unexpected item!');
        }
        return [seasonOptions, monthOptions];
      };

      wrapper = mountPicker({ onPick, columns });
      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
      expect(onPick).toBeCalledTimes(2);
      expect(onPick).toBeCalledWith([seasonOptions[2].value], { column: 0, index: 2 });
      const itemContainers = wrapper.findAll('.t-picker-item__item');

      expect(itemContainers).toHaveLength(seasonOptions.length + monthOptions.length);
      for (let i = 0; i < seasonOptions.length; i++) {
        expect(itemContainers[i].text()).toBe(seasonOptions[i].label);
      }

      for (let j = 0; j < monthOptions.length; j++) {
        expect(itemContainers[seasonOptions.length + j].text()).toBe(monthOptions[j].label);
      }
    });
  });

  describe('scenarios', () => {
    describe('wheel scrolling', () => {
      beforeAll(() => {
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation(async (cb) => {
          await sleep(50);
          cb(Date.now());
        });
      });

      afterAll(() => {
        window.requestAnimationFrame.mockRestore();
      });

      it('scroll quickly to trigger animation', async () => {
        const wrapper = mountPicker();
        const el = wrapper.find('.t-picker-item').element;

        makeTouch(el, 'touchstart', { pageY: 0 });
        makeTouch(el, 'touchmove', { pageY: -2 * DEFAULT_ITEM_HEIGHT });

        await sleep(200);
        makeTouch(el, 'touchend', { pageY: -2 * DEFAULT_ITEM_HEIGHT });

        // waiting for animation
        await sleep(1000);

        // scroll  to the last one
        const textContainer = wrapper.find('.t-picker-item__item--active');
        expect(textContainer.text()).toBe(seasonOptions[3].label);
      });

      it('scroll slowly to prevent animation', async () => {
        const wrapper = mountPicker();
        const el = wrapper.find('.t-picker-item').element;
        simulateMoveOption(el, 2);
        const textContainer = wrapper.find('.t-picker-item__item--active');
        expect(textContainer.text()).toBe(seasonOptions[2].label);
      });
    });
  });
});
