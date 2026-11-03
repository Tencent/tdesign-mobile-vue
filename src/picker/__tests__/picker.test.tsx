import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Picker from '../picker';
import PickerItem from '../picker-item';
import { DEFAULT_ITEM_HEIGHT } from '../picker.class';
import { DEFAULT_WHEEL_CONFIG } from '../constants';
import { makeTouch, simulateMoveOption, seasonOptions } from './mount';
import type { PickerColumn, PickerColumnItem, PickerValue, TdPickerProps } from '../type';

const weekdayOptions: PickerColumn = [
  { label: '周一', value: 'monday' },
  { label: '周二', value: 'tuesday' },
  { label: '周三', value: 'wednesday' },
  { label: '周四', value: 'thursday' },
  { label: '周五', value: 'friday' },
  { label: '周六', value: 'saturday' },
  { label: '周日', value: 'sunday' },
];

const mountPicker = (props: Partial<TdPickerProps> = {}) =>
  mount(Picker, {
    props: {
      columns: [seasonOptions],
      defaultValue: [seasonOptions[0].value],
      ...props,
    },
  });

describe('Picker', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it('cancelBtn[string]', () => {
      const wrapper = mountPicker({ cancelBtn: '取消选择' });
      expect(wrapper.find('.t-picker__cancel').text()).toBe('取消选择');

      // 未设置时使用全局配置文案
      expect(mountPicker().find('.t-picker__cancel').text()).toBe('取消');
    });

    it('cancelBtn[boolean]', () => {
      // false 时不渲染取消按钮
      const hidden = mountPicker({ cancelBtn: false });
      expect(hidden.find('.t-picker__cancel').exists()).toBe(false);

      // true 时渲染默认文案
      const shown = mountPicker({ cancelBtn: true });
      expect(shown.find('.t-picker__cancel').text()).toBe('取消');
    });

    it('columns[array]', () => {
      // 单列：直接传入一维数组
      const single = mountPicker({ columns: seasonOptions, defaultValue: undefined });
      expect(single.findAll('.t-picker-item__group')).toHaveLength(1);
      expect(single.findAll('.t-picker-item__item')).toHaveLength(seasonOptions.length);

      // 多列：传入二维数组，每列渲染为一组选项
      const multiple = mountPicker({ columns: [seasonOptions, weekdayOptions] });
      expect(multiple.findAll('.t-picker-item__group')).toHaveLength(2);
      const itemContainers = multiple.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(seasonOptions.length + weekdayOptions.length);
      expect(itemContainers.slice(0, seasonOptions.length).map((container) => container.text())).toEqual(
        seasonOptions.map((option) => option.label),
      );
      expect(itemContainers.slice(seasonOptions.length).map((container) => container.text())).toEqual(
        weekdayOptions.map((option) => option.label),
      );

      // 空数据不渲染选项
      const empty = mountPicker({ columns: [] });
      expect(empty.findAll('.t-picker-item__item')).toHaveLength(0);
    });

    it('columns[function]', () => {
      const columns = vi.fn((selected: Array<PickerValue>): Array<PickerColumn> => [seasonOptions]);
      const wrapper = mountPicker({ columns });

      // 函数以当前选中值数组作为入参
      expect(columns).toHaveBeenCalledWith(['spring']);
      expect(wrapper.findAll('.t-picker-item__item')).toHaveLength(seasonOptions.length);
    });

    it('confirmBtn[string]', () => {
      const wrapper = mountPicker({ confirmBtn: '确认选择' });
      expect(wrapper.find('.t-picker__confirm').text()).toBe('确认选择');

      // 未设置时使用全局配置文案
      expect(mountPicker().find('.t-picker__confirm').text()).toBe('确认');
    });

    it('confirmBtn[boolean]', () => {
      // false 时不渲染确认按钮
      const hidden = mountPicker({ confirmBtn: false });
      expect(hidden.find('.t-picker__confirm').exists()).toBe(false);

      // true 时渲染默认文案
      const shown = mountPicker({ confirmBtn: true });
      expect(shown.find('.t-picker__confirm').text()).toBe('确认');
    });

    it('footer[string]', () => {
      // footer 类型声明为 TNode（运行时 prop 仅声明 Function），传字符串会有预期内的类型告警，这里以类型断言处理
      const wrapper = mount(Picker, {
        props: { columns: [seasonOptions], footer: '自定义底部' as unknown as TdPickerProps['footer'] },
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
      // header 类型声明为 TNode（运行时 prop 仅声明 Function），传字符串会有预期内的类型告警，这里以类型断言处理
      const wrapper = mount(Picker, {
        props: { columns: [seasonOptions], header: '自定义头部' as unknown as TdPickerProps['header'] },
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
        { text: '春', val: 'spring', off: true },
        { text: '夏', val: 'summer' },
      ];
      const onConfirm = vi.fn();
      const wrapper = mountPicker({
        columns: [aliasOptions as unknown as PickerColumn],
        keys: { label: 'text', value: 'val', disabled: 'off' },
        defaultValue: ['summer'],
        onConfirm,
      });

      // 按别名解析 label 与 disabled
      const itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(aliasOptions.length);
      expect(itemContainers.map((container) => container.text())).toEqual(['春', '夏']);
      expect(itemContainers[0].classes()).toContain('t-picker-item__item--disabled');

      // defaultValue 按别名 val 匹配选中
      expect(wrapper.find('.t-picker-item__item--active').text()).toBe('夏');

      // 确认时按别名返回 value/label
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(onConfirm).toHaveBeenCalledWith(['summer'], { index: [1], label: ['夏'], e: expect.any(MouseEvent) });
    });

    it('option[function]', () => {
      const wrapper = mountPicker({ option: (option: PickerColumnItem, index: number) => `${option.label}-${index}` });
      const itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(seasonOptions.length);
      expect(itemContainers.map((container) => container.text())).toEqual(
        seasonOptions.map((option, index) => `${option.label}-${index}`),
      );
    });

    it('renderLabel[function]', () => {
      const wrapper = mountPicker({ renderLabel: (item: PickerColumnItem) => `${item.label} ${item.value}` });
      expect(wrapper.findAll('.t-picker-item__item').map((container) => container.text())).toEqual(
        seasonOptions.map((option) => `${option.label} ${option.value}`),
      );
    });

    it('swipeDuration[string]', () => {
      const wrapper = mountPicker({ swipeDuration: '600' });
      expect(wrapper.findComponent(PickerItem).props('wheelConfig')).toEqual({
        ...DEFAULT_WHEEL_CONFIG,
        inertiaDuration: 600,
      });
    });

    it('swipeDuration[number]', () => {
      const wrapper = mountPicker({ swipeDuration: 500 });
      expect(wrapper.findComponent(PickerItem).props('wheelConfig')).toEqual({
        ...DEFAULT_WHEEL_CONFIG,
        inertiaDuration: 500,
      });

      // 0 表示取消惯性滚动
      const disabled = mountPicker({ swipeDuration: 0 });
      expect(disabled.findComponent(PickerItem).props('wheelConfig').inertiaDuration).toBe(0);
    });

    it('title[string]', () => {
      expect(mountPicker({ title: '选择季节' }).find('.t-picker__title').text()).toBe('选择季节');

      // 默认为空字符串
      expect(mountPicker().find('.t-picker__title').text()).toBe('');
    });

    it('value[array]', async () => {
      const value = ref<Array<PickerValue>>([seasonOptions[1].value]);
      const wrapper = mount({
        setup() {
          return () => <Picker v-model:value={value.value} columns={[seasonOptions]} />;
        },
      });

      // 受控初值同步到选中态
      expect(wrapper.find('.t-picker-item__item--active').text()).toBe(seasonOptions[1].label);

      // 滚动两项后确认，受控值经 update:value 回写
      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(value.value).toStrictEqual([seasonOptions[3].value]);

      // 外部更新受控值，选中态跟随
      value.value = [seasonOptions[0].value];
      await nextTick();
      await nextTick();
      expect(wrapper.find('.t-picker-item__item--active').text()).toBe(seasonOptions[0].label);
    });

    it('modelValue[array]', async () => {
      const modelValue = ref<Array<PickerValue>>([seasonOptions[2].value]);
      const wrapper = mount({
        setup() {
          return () => <Picker v-model={modelValue.value} columns={[seasonOptions]} />;
        },
      });

      // 受控初值同步到选中态
      expect(wrapper.find('.t-picker-item__item--active').text()).toBe(seasonOptions[2].label);

      // 滚动一项后确认，受控值经 update:modelValue 回写
      await simulateMoveOption(wrapper.find('.t-picker-item').element, 1);
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(modelValue.value).toStrictEqual([seasonOptions[3].value]);
    });

    it('defaultValue[array]', () => {
      const selector = '.t-picker-item__item--active';

      // 合法选项值
      const wrapper = mountPicker({ defaultValue: [seasonOptions[1].value] });
      expect(wrapper.find(selector).text()).toBe(seasonOptions[1].label);

      // 非法选项值回退到第一项
      const invalid = mountPicker({ defaultValue: ['NOT_EXIST'] });
      expect(invalid.find(selector).text()).toBe(seasonOptions[0].label);
    });

    it('wheelConfig[object]', () => {
      const wrapper = mountPicker({ wheelConfig: { bounceDuration: 50, transitionDuration: 200 } });
      expect(wrapper.findComponent(PickerItem).props('wheelConfig')).toEqual({
        ...DEFAULT_WHEEL_CONFIG,
        bounceDuration: 50,
        transitionDuration: 200,
      });
    });
  });

  describe('events', () => {
    it('cancel', async () => {
      const onCancel = vi.fn();
      const wrapper = mountPicker({ onCancel });
      await wrapper.find('.t-picker__cancel').trigger('click');

      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onCancel).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mountPicker({ onChange });
      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
      await wrapper.find('.t-picker__confirm').trigger('click');

      // 注：文档声明第二个参数 context（columns/e），当前源码仅透传 value
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([seasonOptions[2].value]);
    });

    it('confirm', async () => {
      const onConfirm = vi.fn();
      const wrapper = mountPicker({ onConfirm });
      await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
      await wrapper.find('.t-picker__confirm').trigger('click');

      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onConfirm).toHaveBeenCalledWith([seasonOptions[2].value], {
        e: expect.any(MouseEvent),
        index: [2],
        label: [seasonOptions[2].label],
      });
    });

    it('pick', async () => {
      const onPick = vi.fn();

      // columns 为静态数组
      const staticWrapper = mountPicker({ onPick });
      await simulateMoveOption(staticWrapper.find('.t-picker-item').element, 2);
      expect(onPick).toHaveBeenCalledTimes(1);
      expect(onPick).toHaveBeenCalledWith([seasonOptions[2].value], { column: 0, index: 2 });

      // columns 为函数时，滚动某列后其余列数据联动刷新
      let monthOptions: PickerColumn = [];
      const columns = (selected: Array<PickerValue> = []): Array<PickerColumn> => {
        switch (selected[0]) {
          case seasonOptions[0].value:
            monthOptions = [
              { label: '一月', value: 'January' },
              { label: '二月', value: 'February' },
              { label: '三月', value: 'March' },
            ];
            break;
          case seasonOptions[2].value:
            monthOptions = [
              { label: '七月', value: 'July' },
              { label: '八月', value: 'August' },
              { label: '九月', value: 'September' },
            ];
            break;
          default:
            monthOptions = [];
            break;
        }
        return [seasonOptions, monthOptions];
      };
      const wrapper = mountPicker({ onPick, columns });
      await simulateMoveOption(wrapper.findAll('.t-picker-item')[0].element, 2);

      expect(onPick).toHaveBeenCalledTimes(2);
      expect(onPick).toHaveBeenLastCalledWith([seasonOptions[2].value], { column: 0, index: 2 });

      const itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(seasonOptions.length + monthOptions.length);
      expect(itemContainers.slice(0, seasonOptions.length).map((container) => container.text())).toEqual(
        seasonOptions.map((option) => option.label),
      );
      expect(itemContainers.slice(seasonOptions.length).map((container) => container.text())).toEqual(
        monthOptions.map((option) => option.label),
      );
    });
  });

  describe('slots', () => {
    it('footer', () => {
      const wrapper = mount(Picker, {
        props: { columns: [seasonOptions] },
        slots: { footer: () => <div class="picker-footer-slot">自定义底部</div> },
      });
      expect(wrapper.find('.picker-footer-slot').exists()).toBe(true);
      expect(wrapper.find('.picker-footer-slot').text()).toBe('自定义底部');
    });

    it('header', () => {
      const wrapper = mount(Picker, {
        props: { columns: [seasonOptions] },
        slots: { header: () => <div class="picker-header-slot">自定义头部</div> },
      });
      expect(wrapper.find('.picker-header-slot').exists()).toBe(true);
      expect(wrapper.find('.picker-header-slot').text()).toBe('自定义头部');
    });

    it('option', () => {
      const wrapper = mount(Picker, {
        props: { columns: [seasonOptions] },
        slots: { option: (option: PickerColumnItem, index: number) => `${option.label}@${index}` },
      });
      expect(wrapper.findAll('.t-picker-item__item').map((container) => container.text())).toEqual(
        seasonOptions.map((option, index) => `${option.label}@${index}`),
      );
    });
  });

  describe('scenarios', () => {
    describe('wheel scrolling', () => {
      it('keeps scrolling by inertia after a fast swipe', () => {
        const onPick = vi.fn();
        // 同步执行 rAF 回调，让惯性动画在 touchend 内完成
        let frame = 0;
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
          frame += 1;
          callback(frame * 16);
          return frame;
        });

        const wrapper = mountPicker({ onPick });
        const el = wrapper.find('.t-picker-item').element;

        makeTouch(el, 'touchstart', { pageY: 0 });
        makeTouch(el, 'touchmove', { pageY: -2 * DEFAULT_ITEM_HEIGHT });
        makeTouch(el, 'touchend', { pageY: -2 * DEFAULT_ITEM_HEIGHT });

        // 惯性滚动越过拖拽位置，最终停留在最后一项
        expect(wrapper.find('.t-picker-item__item--active').text()).toBe(seasonOptions[3].label);
        expect(onPick).toHaveBeenCalledWith([seasonOptions[3].value], { column: 0, index: 3 });
      });

      it('stops on the swiped option after a slow swipe', async () => {
        const wrapper = mountPicker();
        await simulateMoveOption(wrapper.find('.t-picker-item').element, 2);
        expect(wrapper.find('.t-picker-item__item--active').text()).toBe(seasonOptions[2].label);
      });
    });

    describe('disabled options', () => {
      const workdayOptions: PickerColumn = [
        { label: '周一', value: 'monday' },
        { label: '周二', value: 'tuesday', disabled: true },
        { label: '周三', value: 'wednesday' },
      ];

      it('marks disabled options and skips one when the wheel lands on it', async () => {
        const onPick = vi.fn();
        const wrapper = mountPicker({ columns: [workdayOptions], onPick });
        expect(wrapper.findAll('.t-picker-item__item')[1].classes()).toContain('t-picker-item__item--disabled');

        // 滚动落在禁用项上时，吸附到最近的可用项（优先沿下标增大方向搜索命中周三）
        await simulateMoveOption(wrapper.find('.t-picker-item').element, 1);
        expect(wrapper.find('.t-picker-item__item--active').text()).toBe(workdayOptions[2].label);
        expect(onPick).toHaveBeenCalledWith([workdayOptions[2].value], { column: 0, index: 2 });
      });

      it('falls back to a nearby enabled option when defaultValue hits a disabled one', () => {
        const onPick = vi.fn();
        const wrapper = mountPicker({ columns: [workdayOptions], defaultValue: ['tuesday'], onPick });

        // 回退到最近的可用项（双向搜索优先命中周三），并通过 pick 通知
        expect(wrapper.find('.t-picker-item__item--active').text()).toBe(workdayOptions[2].label);
        expect(onPick).toHaveBeenCalledWith([workdayOptions[2].value], { column: 0, index: 2 });
      });
    });

    describe('multi-column selection', () => {
      it('confirm returns the value/label/index of every column', async () => {
        const onConfirm = vi.fn();
        const wrapper = mountPicker({
          columns: [seasonOptions, weekdayOptions],
          defaultValue: ['spring', 'monday'],
          onConfirm,
        });
        expect(wrapper.findAll('.t-picker-item__group')).toHaveLength(2);

        // 滚动第二列两项后确认
        await simulateMoveOption(wrapper.findAll('.t-picker-item')[1].element, 2);
        await wrapper.find('.t-picker__confirm').trigger('click');

        expect(onConfirm).toHaveBeenCalledWith([seasonOptions[0].value, weekdayOptions[2].value], {
          e: expect.any(MouseEvent),
          index: [0, 2],
          label: [seasonOptions[0].label, weekdayOptions[2].label],
        });
      });
    });

    describe('rendering priority', () => {
      it('option slot overrides the option prop', () => {
        const wrapper = mount(Picker, {
          props: { columns: [seasonOptions], option: (option: PickerColumnItem) => `prop-${option.label}` },
          slots: { option: (option: PickerColumnItem) => `slot-${option.label}` },
        });
        expect(wrapper.findAll('.t-picker-item__item').map((container) => container.text())).toEqual(
          seasonOptions.map((option) => `slot-${option.label}`),
        );
      });

      it('option overrides renderLabel', () => {
        const wrapper = mountPicker({
          option: (option: PickerColumnItem) => `option-${option.label}`,
          renderLabel: (item: PickerColumnItem) => `label-${item.label}`,
        });
        expect(wrapper.findAll('.t-picker-item__item').map((container) => container.text())).toEqual(
          seasonOptions.map((option) => `option-${option.label}`),
        );
      });
    });

    describe('wheel config merging', () => {
      it('swipeDuration takes precedence over wheelConfig.inertiaDuration', () => {
        const wrapper = mountPicker({ swipeDuration: 500, wheelConfig: { inertiaDuration: 999 } });
        expect(wrapper.findComponent(PickerItem).props('wheelConfig').inertiaDuration).toBe(500);
      });
    });
  });
});
