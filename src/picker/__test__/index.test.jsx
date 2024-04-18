import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Picker from '../picker';
import PickerItem from '../picker-item';

import { DEFAULT_ITEM_HEIGHT, ANIMATION_TIME_LIMIT } from '../picker.class';

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

  vi.useFakeTimers().advanceTimersByTime(ANIMATION_TIME_LIMIT + 1);
  makeTouch(optionContainerEl, 'touchend', { pageY: -distance * DEFAULT_ITEM_HEIGHT });
  vi.useRealTimers();

  await nextTick();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('picker', () => {
  describe('props', () => {
    it(': cancelBtn', () => {
      const testCancelBtn = (cancelBtn) => {
        const wrapper = mountPicker({ cancelBtn });
        const textContainer = wrapper.find('.t-picker__cancel');
        expect(textContainer.text()).toBe(cancelBtn || '取消');
      };

      testCancelBtn();
      testCancelBtn('Cancel');
    });

    it(': confirmBtn', () => {
      const testConfirmBtn = (confirmBtn) => {
        const wrapper = mountPicker({ confirmBtn });
        const textContainer = wrapper.find('.t-picker__confirm');
        expect(textContainer.text()).toBe(confirmBtn || '确认');
      };

      testConfirmBtn();
      testConfirmBtn('Confirm');
    });

    it(': title', () => {
      const testTitle = (title) => {
        const wrapper = mountPicker({ title });
        const textContainer = wrapper.find('.t-picker__title');
        expect(textContainer.text()).toBe(title || '');
      };

      testTitle();
      testTitle('Choose Season');
    });

    it(': renderLabel', () => {
      const renderLabel = (item) => `${item.label} ${item.value}`;
      const wrapper = mountPicker({ renderLabel });
      const itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(seasonOptions.length);

      itemContainers.forEach((container, index) => expect(container.text()).toBe(renderLabel(seasonOptions[index])));
    });

    it(': defaultValue', () => {
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

    it(': columns', () => {
      const testColumns = (columns, isValidColumns = true) => {
        const wrapper = mountPicker({ columns });
        const itemContainers = wrapper.findAll('.t-picker-item__item');

        if (!isValidColumns) {
          return expect(itemContainers).toHaveLength(0);
        }

        expect(itemContainers).toHaveLength(seasonOptions.length);
        itemContainers.forEach((container, index) => expect(container.text()).toBe(seasonOptions[index].label));
      };

      testColumns([undefined], false);
      testColumns(undefined, false);
      testColumns([seasonOptions]);
      testColumns(() => [seasonOptions]);
    });

    it(': value', async () => {
      const value = ref([seasonOptions[1].value]);
      const wrapper = mount(<Picker v-model={value.value} {...commonProps} />);
      const textContainer = wrapper.find('.t-picker-item__item--active');
      expect(textContainer.text()).toBe(seasonOptions[1].label);

      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(value.value).toStrictEqual([seasonOptions[3].value]);
    });
  });

  describe('event', () => {
    it(': cancel', async () => {
      const onCancel = vi.fn();
      const wrapper = mountPicker({ onCancel });
      await wrapper.find('.t-picker__cancel').trigger('click');

      expect(onCancel).toBeCalledTimes(1);
    });

    it(': change', async () => {
      const onChange = vi.fn();
      const wrapper = mountPicker({ onChange });
      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith([seasonOptions[2].value]);
    });

    it(': confirm', async () => {
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

    it(': pick', async () => {
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

  describe('picker-item', () => {
    it(': setIndex', async () => {
      const pickerItemRef = ref(null);
      const wrapper = mount({
        render() {
          return <PickerItem ref={pickerItemRef} options={seasonOptions} />;
        },
      });

      pickerItemRef.value.setIndex(2);
      await nextTick();

      const textContainer = wrapper.find('.t-picker-item__item--active');
      expect(textContainer.text()).toBe(seasonOptions[2].label);
    });

    it(': setValue', async () => {
      const pickerItemRef = ref(null);
      const wrapper = mount({
        render() {
          return <PickerItem ref={pickerItemRef} options={seasonOptions} />;
        },
      });

      pickerItemRef.value.setValue(seasonOptions[2].value);
      await nextTick();

      const textContainer = wrapper.find('.t-picker-item__item--active');
      expect(textContainer.text()).toBe(seasonOptions[2].label);
    });

    it(': setOptions', async () => {
      const pickerItemRef = ref(null);
      const optionsRef = ref(seasonOptions);
      const wrapper = mount({
        render() {
          return <PickerItem ref={pickerItemRef} options={optionsRef.value} />;
        },
      });

      let itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(optionsRef.value.length);

      optionsRef.value = [seasonOptions[0]];
      pickerItemRef.value.setOptions();
      await nextTick();

      itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(optionsRef.value.length);
    });
  });

  describe('picker.class.ts', () => {
    beforeAll(() => {
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(async (cb) => {
        await sleep(50);
        cb(Date.now());
      });
    });

    afterAll(() => {
      window.requestAnimationFrame.mockRestore();
    });

    it(': scroll quickly to trigger animation', async () => {
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

    it(': scroll slowly to prevent animation', async () => {
      const wrapper = mountPicker();
      const el = wrapper.find('.t-picker-item').element;
      simulateMoveOption(el, 2);
      const textContainer = wrapper.find('.t-picker-item__item--active');
      expect(textContainer.text()).toBe(seasonOptions[2].label);
    });
  });
});
