import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import PickerItem from '../picker-item';
import { DEFAULT_WHEEL_CONFIG } from '../constants';
import { simulateMoveOption, seasonOptions } from './mount';
import type { PickerColumn, PickerColumnItem, PickerValue, PickerWheelConfig } from '../type';

interface PickerItemProps {
  options?: PickerColumn;
  value?: PickerValue;
  renderLabel?: (item: PickerColumnItem, index: number) => string;
  onPick?: (context: { value: PickerValue; index: number }) => void;
  wheelConfig?: Required<PickerWheelConfig>;
}

const mountPickerItem = (props: PickerItemProps = {}) =>
  mount(PickerItem, {
    props: {
      options: seasonOptions,
      ...props,
    },
  });

const mountPickerItemWithRef = (props: PickerItemProps = {}) => {
  const itemRef = ref<any>(null);
  const wrapper = mount({
    setup() {
      return () => <PickerItem ref={itemRef} options={seasonOptions} {...props} />;
    },
  });
  return { wrapper, itemRef };
};

describe('PickerItem', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it('options[array]', () => {
      const options: PickerColumn = [
        { label: '春', value: 'spring' },
        { label: '夏', value: 'summer' },
        { label: '冬', value: 'winter', disabled: true },
      ];
      const wrapper = mountPickerItem({ options });
      const itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(options.length);
      expect(itemContainers.map((container) => container.text())).toEqual(['春', '夏', '冬']);
      // disabled 选项渲染禁用态类名
      expect(itemContainers[2].classes()).toContain('t-picker-item__item--disabled');
      expect(itemContainers[0].classes()).not.toContain('t-picker-item__item--disabled');
    });

    it('value[string]', () => {
      const wrapper = mountPickerItem({ value: seasonOptions[2].value });
      expect(wrapper.find('.t-picker-item__item--active').text()).toBe(seasonOptions[2].label);
    });

    it('value[number]', () => {
      // PickerValue 支持 number，选项值为数字时同样能命中（类型声明按源码缺口以断言处理）
      const numberOptions = [
        { label: '2023 年', value: 2023 },
        { label: '2024 年', value: 2024 },
        { label: '2025 年', value: 2025 },
      ];
      const wrapper = mountPickerItem({
        options: numberOptions as unknown as PickerColumn,
        value: 2024,
      });
      expect(wrapper.find('.t-picker-item__item--active').text()).toBe('2024 年');
    });

    it('renderLabel[function]', () => {
      const wrapper = mountPickerItem({
        renderLabel: (item: PickerColumnItem, index: number) => `${item.label}-${index}`,
      });
      expect(wrapper.findAll('.t-picker-item__item').map((container) => container.text())).toEqual(
        seasonOptions.map((option, index) => `${option.label}-${index}`),
      );
    });

    it('wheelConfig[object]', async () => {
      const { wrapper, itemRef } = mountPickerItemWithRef({
        wheelConfig: { ...DEFAULT_WHEEL_CONFIG, transitionDuration: 100 },
      });
      itemRef.value.setIndex(1);
      await nextTick();
      // 切换选项时使用自定义过渡时长
      expect(wrapper.find<HTMLUListElement>('.t-picker-item').element.style.transitionDuration).toBe('100ms');

      const defaults = mountPickerItemWithRef();
      defaults.itemRef.value.setIndex(1);
      await nextTick();
      // 未设置时使用默认过渡时长
      expect(defaults.wrapper.find<HTMLUListElement>('.t-picker-item').element.style.transitionDuration).toBe('460ms');
    });

    // option 插槽未在 picker-item.tsx 中声明（经 Picker 父级透传），置于分组末尾
    it('option[slot]', () => {
      const wrapper = mount(PickerItem, {
        props: { options: seasonOptions },
        slots: {
          option: (option: PickerColumnItem, index: number) => (
            <span class="custom-option">{`${option.label}@${index}`}</span>
          ),
        },
      });
      const itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers.map((container) => container.find('.custom-option').exists())).toEqual(
        seasonOptions.map(() => true),
      );
      expect(itemContainers.map((container) => container.text())).toEqual(
        seasonOptions.map((option, index) => `${option.label}@${index}`),
      );
    });
  });

  describe('events', () => {
    it('pick', async () => {
      const onPick = vi.fn();
      const wrapper = mountPickerItem({ onPick });
      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);

      expect(onPick).toHaveBeenCalledTimes(1);
      expect(onPick).toHaveBeenCalledWith({ value: seasonOptions[2].value, index: 2 });
    });
  });

  describe('instanceFunctions', () => {
    it('setIndex', async () => {
      const { wrapper, itemRef } = mountPickerItemWithRef();
      itemRef.value.setIndex(2);
      await nextTick();

      expect(wrapper.find('.t-picker-item__item--active').text()).toBe(seasonOptions[2].label);
      // jsdom 中高度为 0 回退默认值（item 40 / 容器 200）：indicatorOffset 80，index 2 → 0px
      expect(wrapper.find<HTMLUListElement>('.t-picker-item').element.style.transform).toBe(
        'translate(0,0px) translateZ(0)',
      );
    });

    it('setValue', async () => {
      const { wrapper, itemRef } = mountPickerItemWithRef();
      itemRef.value.setValue(seasonOptions[2].value);
      await nextTick();

      expect(wrapper.find('.t-picker-item__item--active').text()).toBe(seasonOptions[2].label);
    });

    it('setOptions', async () => {
      const itemRef = ref<any>(null);
      const optionsRef = ref<PickerColumn>(seasonOptions);
      const wrapper = mount({
        setup() {
          return () => <PickerItem ref={itemRef} options={optionsRef.value} />;
        },
      });

      expect(wrapper.findAll('.t-picker-item__item')).toHaveLength(seasonOptions.length);

      optionsRef.value = [{ label: '一月', value: 'January' }];
      itemRef.value.setOptions();
      await nextTick();

      const itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(1);
      expect(itemContainers[0].text()).toBe('一月');
    });

    it('setUpdateItems', async () => {
      const { wrapper, itemRef } = mountPickerItemWithRef();
      const $list = wrapper.find<HTMLUListElement>('.t-picker-item');

      // 挂载时 jsdom 元素高度为 0，按默认高度计算偏移：80 - 1 * 40 = 40
      itemRef.value.setIndex(1);
      await nextTick();
      expect($list.element.style.transform).toBe('translate(0,40px) translateZ(0)');

      // 模拟真实渲染高度（item 30 / 容器 240）后刷新，滚轮按新高度重新计算偏移
      const groupElement = $list.element.parentElement;
      if (groupElement) {
        Object.defineProperty(groupElement, 'offsetHeight', { value: 240, configurable: true });
      }
      wrapper.findAll('li').forEach((li) => {
        Object.defineProperty(li.element, 'offsetHeight', { value: 30, configurable: true });
      });

      itemRef.value.setUpdateItems();
      itemRef.value.setIndex(1);
      await nextTick();

      // indicatorOffset = 240 / 2 - 30 / 2 = 105，index 1 → 105 - 30 = 75
      expect($list.element.style.transform).toBe('translate(0,75px) translateZ(0)');
    });
  });
});
