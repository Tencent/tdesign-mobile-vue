import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

import Form from '../../form';
import { trigger } from '@/test/touch';
import Slider from '../slider';

const classPrefix = 't-slider';

/** 水平轨道几何：left=16 / right=359，可滑动长度 343 */
const LINE_LEFT = 16;
const LINE_WIDTH = 343;
/** 垂直轨道几何：top=20 / bottom=220，可滑动长度 200 */
const VERTICAL_TOP = 20;
const VERTICAL_LENGTH = 200;

type TriggerTarget = Parameters<typeof trigger>[0];

const createRect = (rect: Partial<DOMRect>): DOMRect => ({
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0,
  toJSON: () => ({}),
  ...rect,
});

const HORIZONTAL_RECT = createRect({ left: LINE_LEFT, right: LINE_LEFT + LINE_WIDTH });
const VERTICAL_RECT = createRect({ top: VERTICAL_TOP, bottom: VERTICAL_TOP + VERTICAL_LENGTH });

/** 固定轨道几何，保证坐标到值的换算结果唯一 */
const mockElementRect = (rect: DOMRect) => {
  vi.spyOn(window.HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(rect);
};

const moveHorizontal = async (target: TriggerTarget, distance: number) => {
  await trigger(target, 'touchstart', 0, 0);
  await trigger(target, 'touchmove', distance, 0);
  await trigger(target, 'touchend', distance, 0);
};

const moveVertical = async (target: TriggerTarget, distance: number) => {
  await trigger(target, 'touchstart', 0, 0);
  await trigger(target, 'touchmove', 0, distance);
  await trigger(target, 'touchend', 0, distance);
};

/** 从行内样式中读取指定方向的像素值 */
const getStyleValue = (inlineStyle: string | undefined, prop: string): number => {
  const matched = new RegExp(`${prop}: ([\\d.-]+)px`).exec(inlineStyle ?? '');
  if (!matched) {
    throw new Error(`style "${prop}" not found in "${inlineStyle}"`);
  }
  return Number(matched[1]);
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Slider', () => {
  describe('props', () => {
    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          disabled: true,
          marks: { 0: '小', 100: '大' },
          onChange,
        },
      });
      await nextTick();

      // 禁用态根节点、轨道、滑轨、刻度均呈禁用样式
      expect(wrapper.find(`.${classPrefix}`).classes()).toContain(`${classPrefix}--disabled`);
      expect(wrapper.find(`.${classPrefix}__bar`).classes()).toContain(`${classPrefix}__bar--disabled`);
      expect(wrapper.find(`.${classPrefix}__line--single`).classes()).toContain(`${classPrefix}__line--disabled`);
      expect(wrapper.find(`.${classPrefix}__scale-item`).classes()).toContain(`${classPrefix}__scale-item--disabled`);

      // 点击轨道、拖动滑块均不触发 change
      await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledTimes(0);

      await moveHorizontal(wrapper.find(`.${classPrefix}__dot`), 100);
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('label[string]', () => {
      // 占位符文案：`${value}` 被替换为滑块值，极值文本同样按占位符渲染
      const labelTemplate = `\${value}%`;
      const wrapper = mount(Slider, {
        props: {
          label: labelTemplate,
          value: 30,
          showExtremeValue: true,
        },
      });
      expect(wrapper.find(`.${classPrefix}__dot-value`).text()).toBe('30%');
      expect(wrapper.find(`.${classPrefix}__value--min`).text()).toBe('0%');
      expect(wrapper.find(`.${classPrefix}__value--max`).text()).toBe('100%');
      expect(wrapper.find(`.${classPrefix}`).classes()).toContain(`${classPrefix}--top`);

      // 无占位符的普通文案无法匹配模板，回退展示当前值
      const plain = mount(Slider, {
        props: {
          label: '自定义文案',
          value: 30,
        },
      });
      expect(plain.find(`.${classPrefix}__dot-value`).text()).toBe('30');
    });

    it('label[boolean]', async () => {
      const wrapper = mount(Slider, {
        props: {
          label: true,
          value: 30,
        },
      });

      // true：展示滑块当前值文本
      expect(wrapper.find(`.${classPrefix}__dot-value`).text()).toBe('30');
      expect(wrapper.find(`.${classPrefix}`).classes()).toContain(`${classPrefix}--top`);

      // false：不展示文本
      await wrapper.setProps({ label: false });
      expect(wrapper.find(`.${classPrefix}__dot-value`).exists()).toBe(false);
      expect(wrapper.find(`.${classPrefix}`).classes()).not.toContain(`${classPrefix}--top`);
    });

    it('label[function]', () => {
      const label = vi.fn((val: any) => `${val}分`);
      const wrapper = mount(Slider, {
        props: {
          label,
          value: 30,
        },
      });

      // 函数入参为滑块当前值，返回值作为文本渲染
      expect(label).toHaveBeenCalledWith(30);
      expect(wrapper.find(`.${classPrefix}__dot-value`).text()).toBe('30分');
    });

    // 文档类型标注 label 支持 Slot 通道，但组件源码未实现插槽渲染（slider.tsx 仅消费 string/boolean/function），待源码支持后补充
    it.todo('label[slot]');

    it('marks[object]', async () => {
      mockElementRect(HORIZONTAL_RECT);
      const wrapper = mount(Slider, {
        props: {
          value: 30,
          marks: { 0: '小', 50: (val: any) => `${val}%`, 100: '大' },
        },
      });
      await nextTick();

      const $items = wrapper.findAll(`.${classPrefix}__scale-item`);
      expect($items.length).toBe(3);

      // 刻度描述支持字符串与 TNode 函数两种取值
      expect(wrapper.findAll(`.${classPrefix}__scale-desc`).map((desc) => desc.text())).toEqual(['小', '50%', '大']);

      // 刻度位置按轨道长度换算：round(value / 100 * 343) → 0 / 172 / 343
      const itemStyles = $items.map((item) => getStyleValue(item.attributes('style'), 'left'));
      expect(itemStyles).toEqual([0, 172, 343]);

      // 单滑块模式下，值大于等于刻度值的刻度高亮
      expect($items[0].classes()).toContain(`${classPrefix}__scale-item--active`);
      expect($items[1].classes()).not.toContain(`${classPrefix}__scale-item--active`);

      // 存在刻度文本时根节点追加 --top
      expect(wrapper.find(`.${classPrefix}`).classes()).toContain(`${classPrefix}--top`);
    });

    it('marks[array]', async () => {
      mockElementRect(HORIZONTAL_RECT);
      const wrapper = mount(Slider, {
        props: {
          value: 30,
          marks: [0, 10, 30, 40],
        },
      });
      await nextTick();

      const $items = wrapper.findAll(`.${classPrefix}__scale-item`);
      expect($items.length).toBe(4);

      // 数组刻度仅渲染刻度点，不渲染刻度文本
      expect(wrapper.findAll(`.${classPrefix}__scale-desc`).length).toBe(0);
      expect(wrapper.find(`.${classPrefix}`).classes()).not.toContain(`${classPrefix}--top`);

      // 刻度位置：round(value / 100 * 343) → 0 / 34 / 103 / 137
      const itemStyles = $items.map((item) => getStyleValue(item.attributes('style'), 'left'));
      expect(itemStyles).toEqual([0, 34, 103, 137]);

      // 与当前值相等的刻度被隐藏；小于等于当前值的刻度高亮
      expect($items[2].classes()).toContain(`${classPrefix}__scale-item--hidden`);
      expect($items[0].classes()).toContain(`${classPrefix}__scale-item--active`);
      expect($items[1].classes()).toContain(`${classPrefix}__scale-item--active`);
      expect($items[3].classes()).not.toContain(`${classPrefix}__scale-item--active`);
    });

    it('max[number]', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          max: 50,
          showExtremeValue: true,
          onChange,
        },
      });

      // 极值文本按 max 渲染
      expect(wrapper.find(`.${classPrefix}__value--max`).text()).toBe('50');

      // 点击轨道按 max=50 换算：(200 - 16) / 343 * 50 = 26.82 → 步进取整 27
      await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(27);
    });

    it('min[number]', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: 10,
          min: 10,
          showExtremeValue: true,
          onChange,
        },
      });

      // 极值文本按 min 渲染
      expect(wrapper.find(`.${classPrefix}__value--min`).text()).toBe('10');

      // 点击轨道按 min=10 换算：(200 - 16) / 343 * 90 + 10 = 58.28 → 步进取整 58
      await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(58);
    });

    it('range[boolean]', async () => {
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: [10, 60],
          range: true,
        },
      });
      await nextTick();

      // 双滑块模式：渲染左右两个滑块，轨道按范围值定位
      expect(wrapper.find(`.${classPrefix}`).classes()).toContain(`${classPrefix}--range`);
      expect(wrapper.find(`.${classPrefix}__dot--left`).exists()).toBe(true);
      expect(wrapper.find(`.${classPrefix}__dot--right`).exists()).toBe(true);
      const style = wrapper.find(`.${classPrefix}__line--default`).attributes('style');
      expect(getStyleValue(style, 'left')).toBe(34);
      expect(getStyleValue(style, 'right')).toBe(137);

      // 默认单滑块模式无左右滑块
      const single = mount(Slider, {
        props: {
          value: 10,
        },
      });
      await nextTick();
      expect(single.find(`.${classPrefix}__dot--left`).exists()).toBe(false);
      expect(single.find(`.${classPrefix}__dot--right`).exists()).toBe(false);
      expect(getStyleValue(single.find(`.${classPrefix}__line--single`).attributes('style'), 'width')).toBeCloseTo(
        34.3,
      );
    });

    it('showExtremeValue[boolean]', async () => {
      const wrapper = mount(Slider, {
        props: {
          value: 30,
        },
      });

      // 默认不展示边界值
      expect(wrapper.find(`.${classPrefix}__value--min`).exists()).toBe(false);
      expect(wrapper.find(`.${classPrefix}__value--max`).exists()).toBe(false);

      // 展示边界值：默认 min=0 / max=100
      await wrapper.setProps({ showExtremeValue: true });
      expect(wrapper.find(`.${classPrefix}__value--min`).text()).toBe('0');
      expect(wrapper.find(`.${classPrefix}__value--max`).text()).toBe('100');

      // 边界值跟随 min / max 更新
      await wrapper.setProps({ min: 30, max: 110 });
      expect(wrapper.find(`.${classPrefix}__value--min`).text()).toBe('30');
      expect(wrapper.find(`.${classPrefix}__value--max`).text()).toBe('110');
    });

    it('step[number]', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          step: 10,
          onChange,
        },
      });
      const $line = wrapper.find(`.${classPrefix}__line`);

      // clientX 200 的原始值为 53.64，step=10 时步进取整为 50
      await $line.trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(50);

      // step=20 时同一位置步进取整为 60
      await wrapper.setProps({ step: 20 });
      await $line.trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenLastCalledWith(60);

      // 小数步长按 min/max/step 的最大小数位保留精度
      await wrapper.setProps({ min: 0, max: 1, step: 0.2 });
      await $line.trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenLastCalledWith(0.6);
    });

    it('theme[default/capsule]', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: 30,
          theme: 'default',
        },
      });
      await nextTick();
      expect(wrapper.find(`.${classPrefix}__bar`).classes()).toContain(`${classPrefix}__bar--default`);
      expect(wrapper.find(`.${classPrefix}__line`).classes()).toContain(`${classPrefix}__line--default`);

      const capsule = mount(Slider, {
        props: {
          value: 30,
          theme: 'capsule',
          onChange,
        },
      });
      await nextTick();
      expect(capsule.find(`.${classPrefix}__bar`).classes()).toContain(`${classPrefix}__bar--capsule`);

      // capsule 主题滑轨宽度包含半滑块宽度：343 - 20 - 6 = 317，0.3 * 317 + 10 = 105.1
      const style = capsule.find(`.${classPrefix}__line--single`).attributes('style');
      expect(getStyleValue(style, 'width')).toBeCloseTo(105.1);

      // 点击换算扣除半滑块宽度：(200 - 16 - 10) / 317 * 100 = 54.89 → 55
      await capsule.find(`.${classPrefix}__line`).trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(55);
    });

    it('value[number]', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: 30,
          label: true,
          onChange,
        },
      });
      await nextTick();

      // 受控初始值：滑块文本 30，滑轨宽度 0.3 * 343 = 102.9
      expect(wrapper.find(`.${classPrefix}__dot-value`).text()).toBe('30');
      expect(getStyleValue(wrapper.find(`.${classPrefix}__line--single`).attributes('style'), 'width')).toBeCloseTo(
        102.9,
      );

      // 点击轨道仅派发 update:value，父组件未回写前视图不变
      await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(54);
      expect(wrapper.emitted('update:value')).toEqual([[54]]);
      expect(wrapper.find(`.${classPrefix}__dot-value`).text()).toBe('30');

      // 父组件回写后视图更新：0.6 * 343 = 205.8
      await wrapper.setProps({ value: 60 });
      expect(wrapper.find(`.${classPrefix}__dot-value`).text()).toBe('60');
      expect(getStyleValue(wrapper.find(`.${classPrefix}__line--single`).attributes('style'), 'width')).toBeCloseTo(
        205.8,
      );
    });

    it('value[array]', async () => {
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: [10, 60],
          range: true,
          label: true,
        },
      });
      await nextTick();

      expect(wrapper.find(`.${classPrefix}__dot--left`).text()).toBe('10');
      expect(wrapper.find(`.${classPrefix}__dot--right`).text()).toBe('60');
      let style = wrapper.find(`.${classPrefix}__line--default`).attributes('style');
      expect(getStyleValue(style, 'left')).toBe(34);
      expect(getStyleValue(style, 'right')).toBe(137);

      // 受控更新：left = 0，right = 343 * (100 - 80) / 100 = 68.6 → 68
      await wrapper.setProps({ value: [0, 80] });
      style = wrapper.find(`.${classPrefix}__line--default`).attributes('style');
      expect(wrapper.find(`.${classPrefix}__dot--left`).text()).toBe('0');
      expect(wrapper.find(`.${classPrefix}__dot--right`).text()).toBe('80');
      expect(getStyleValue(style, 'left')).toBe(0);
      expect(getStyleValue(style, 'right')).toBe(68);
    });

    it('modelValue[number]', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          modelValue: 30,
          label: true,
          onChange,
        },
      });
      await nextTick();
      expect(wrapper.find(`.${classPrefix}__dot-value`).text()).toBe('30');

      // v-model：点击轨道派发 update:modelValue 并回调 change
      await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(54);
      expect(wrapper.emitted('update:modelValue')).toEqual([[54]]);
    });

    it('modelValue[array]', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          modelValue: [0, 100],
          range: true,
          onChange,
        },
      });
      await nextTick();

      // 固定左右滑块位置，点击更靠近右滑块：移动右侧游标
      vi.spyOn(wrapper.find(`.${classPrefix}__dot--left`).element, 'getBoundingClientRect').mockReturnValue(
        createRect({ left: LINE_LEFT }),
      );
      vi.spyOn(wrapper.find(`.${classPrefix}__dot--right`).element, 'getBoundingClientRect').mockReturnValue(
        createRect({ left: LINE_LEFT + LINE_WIDTH }),
      );

      await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 300 });
      expect(onChange).toHaveBeenCalledWith([0, 83]);
      expect(wrapper.emitted('update:modelValue')).toEqual([[[0, 83]]]);
    });

    it('defaultValue[number]', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          defaultValue: 40,
          label: true,
          onChange,
        },
      });
      await nextTick();

      // 非受控初始值 40 展示在滑块上，滑轨宽度 0.4 * 343 = 137.2
      const getLineWidth = () =>
        getStyleValue(wrapper.find(`.${classPrefix}__line--single`).attributes('style'), 'width');
      expect(wrapper.find(`.${classPrefix}__dot-value`).text()).toBe('40');
      expect(getLineWidth()).toBeCloseTo(137.2);

      // 非受控：点击轨道后内部值与滑轨宽度自行更新，0.54 * 343 = 185.22
      await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledWith(54);
      await nextTick();
      expect(wrapper.find(`.${classPrefix}__dot-value`).text()).toBe('54');
      expect(getLineWidth()).toBeCloseTo(185.22);
    });

    it('defaultValue[array]', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          defaultValue: [20, 60],
          range: true,
          label: true,
          onChange,
        },
      });
      await nextTick();

      expect(wrapper.find(`.${classPrefix}__dot--left`).text()).toBe('20');
      expect(wrapper.find(`.${classPrefix}__dot--right`).text()).toBe('60');
      let style = wrapper.find(`.${classPrefix}__line--default`).attributes('style');
      expect(getStyleValue(style, 'left')).toBe(68);
      expect(getStyleValue(style, 'right')).toBe(137);

      // 非受控拖动右侧游标到 300：83，right = 343 * (100 - 83) / 100 = 58.31 → 58
      await moveHorizontal(wrapper.find(`.${classPrefix}__dot--right`), 300);
      expect(onChange).toHaveBeenCalledWith([20, 83]);
      await nextTick();
      style = wrapper.find(`.${classPrefix}__line--default`).attributes('style');
      expect(wrapper.find(`.${classPrefix}__dot--right`).text()).toBe('83');
      expect(getStyleValue(style, 'left')).toBe(68);
      expect(getStyleValue(style, 'right')).toBe(58);
    });

    it('vertical[boolean]', async () => {
      const onChange = vi.fn();
      mockElementRect(VERTICAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: 30,
          vertical: true,
          onChange,
        },
      });
      await nextTick();

      expect(wrapper.find(`.${classPrefix}`).classes()).toContain(`${classPrefix}--vertical`);

      // 垂直滑轨高度按轨道长度换算：0.3 * 200 = 60
      expect(getStyleValue(wrapper.find(`.${classPrefix}__line--single`).attributes('style'), 'height')).toBeCloseTo(
        60,
      );

      // 点击按纵向坐标换算：(120 - 20) / 200 * 100 = 50
      await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientY: 120 });
      expect(onChange).toHaveBeenCalledWith(50);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          onChange,
        },
      });
      const $line = wrapper.find(`.${classPrefix}__line`);
      const $dot = wrapper.find(`.${classPrefix}__dot`);

      // 点击轨道触发 change：(200 - 16) / 343 * 100 = 53.64 → 54
      await $line.trigger('click', { clientX: 200 });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(54);

      // 拖动滑块触发 change：(100 - 16) / 343 * 100 = 24.49 → 24
      await moveHorizontal($dot, 100);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(24);
    });

    it('dragstart', async () => {
      const onDragstart = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          value: 0,
          onDragstart,
        },
      });

      // 触摸滑块开始拖动时触发，回调参数为 { e: TouchEvent }
      await trigger(wrapper.find(`.${classPrefix}__dot`), 'touchstart', 0, 0);
      expect(onDragstart).toHaveBeenCalledTimes(1);
      expect(onDragstart.mock.calls[0][0].e).toBeInstanceOf(Event);
    });

    it('dragend', async () => {
      const onChange = vi.fn();
      const onDragend = vi.fn();
      mockElementRect(HORIZONTAL_RECT);

      const wrapper = mount(Slider, {
        props: {
          defaultValue: 40,
          onChange,
          onDragend,
        },
      });
      const $dot = wrapper.find(`.${classPrefix}__dot`);

      // 结束拖动时触发，value 为拖动后的最新值
      await moveHorizontal($dot, 100);
      expect(onChange).toHaveBeenCalledWith(24);
      expect(onDragend).toHaveBeenCalledTimes(1);
      expect(onDragend.mock.calls[0][0]).toBe(24);
      expect(onDragend.mock.calls[0][1].e).toBeInstanceOf(Event);

      // touchcancel 同样触发结束拖动
      await trigger($dot, 'touchcancel', 100, 0);
      expect(onDragend).toHaveBeenCalledTimes(2);
      expect(onDragend.mock.calls[1][0]).toBe(24);
    });
  });

  describe('scenarios', () => {
    describe('range selection', () => {
      it('drags left and right dots separately', async () => {
        const onChange = vi.fn();
        mockElementRect(HORIZONTAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            value: [0, 100],
            range: true,
            onChange,
          },
        });
        await nextTick();

        // 拖动左侧游标到 100：(100 - 16) / 343 * 100 = 24.49 → 24
        await moveHorizontal(wrapper.find(`.${classPrefix}__dot--left`), 100);
        expect(onChange).toHaveBeenCalledWith([24, 100]);

        // 拖动右侧游标到 300：(300 - 16) / 343 * 100 = 82.80 → 83
        await moveHorizontal(wrapper.find(`.${classPrefix}__dot--right`), 300);
        expect(onChange).toHaveBeenLastCalledWith([0, 83]);
      });

      it('moves the dot nearer to the click position', async () => {
        const onChange = vi.fn();
        mockElementRect(HORIZONTAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            value: [0, 100],
            range: true,
            onChange,
          },
        });
        await nextTick();

        vi.spyOn(wrapper.find(`.${classPrefix}__dot--left`).element, 'getBoundingClientRect').mockReturnValue(
          createRect({ left: LINE_LEFT }),
        );
        vi.spyOn(wrapper.find(`.${classPrefix}__dot--right`).element, 'getBoundingClientRect').mockReturnValue(
          createRect({ left: LINE_LEFT + LINE_WIDTH }),
        );

        // 点击 x=50 距左侧游标 34px、距右侧 309px，移动左侧游标
        await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 50 });
        expect(onChange).toHaveBeenCalledWith([10, 100]);

        // 点击 x=300 距右侧游标 59px、距左侧 284px，移动右侧游标
        await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 300 });
        expect(onChange).toHaveBeenLastCalledWith([0, 83]);
      });

      it('swaps values when dots cross each other', async () => {
        const onChange = vi.fn();
        mockElementRect(HORIZONTAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            value: [40, 60],
            range: true,
            onChange,
          },
        });
        await nextTick();

        // 左侧游标拖过右侧游标（到 97），自动交换保证 start <= end
        await moveHorizontal(wrapper.find(`.${classPrefix}__dot--left`), 350);
        expect(onChange).toHaveBeenCalledWith([60, 97]);
      });

      it('ignores clicks outside the movable area', async () => {
        const onChange = vi.fn();
        mockElementRect(HORIZONTAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            value: [0, 100],
            range: true,
            onChange,
          },
        });
        await nextTick();

        // 点击轨道左侧之外（delta = -11 < 0）与可滑动范围之外（374 > 343 + 20）
        await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 5 });
        await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 390 });
        expect(onChange).toHaveBeenCalledTimes(0);
      });

      it('renders label text for both dots', async () => {
        const wrapper = mount(Slider, {
          props: {
            value: [0, 80],
            range: true,
            label: true,
            showExtremeValue: true,
          },
        });
        await nextTick();

        // 双滑块模式分别渲染起止值文本，极值使用 range 专用样式
        expect(wrapper.find(`.${classPrefix}__dot--left`).text()).toBe('0');
        expect(wrapper.find(`.${classPrefix}__dot--right`).text()).toBe('80');
        expect(wrapper.find(`.${classPrefix}__range-extreme--min`).text()).toBe('0');
        expect(wrapper.find(`.${classPrefix}__range-extreme--max`).text()).toBe('100');
      });

      it('highlights marks between the two dots', async () => {
        mockElementRect(HORIZONTAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            value: [30, 70],
            range: true,
            marks: [0, 25, 50, 75, 100],
          },
        });
        await nextTick();

        // 仅处于两个游标之间的刻度（50）高亮
        const activeFlags = wrapper
          .findAll(`.${classPrefix}__scale-item`)
          .map((item) => item.classes().includes(`${classPrefix}__scale-item--active`));
        expect(activeFlags).toEqual([false, false, true, false, false]);
      });
    });

    describe('edge cases', () => {
      it('clamps out-of-limit values on interaction', async () => {
        const onChange = vi.fn();
        mockElementRect(HORIZONTAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            value: [-1, 101],
            range: true,
            onChange,
          },
        });
        await nextTick();

        const $line = wrapper.find(`.${classPrefix}__line`);

        // 未单独 mock 滑块位置时左右距离相等，默认移动右侧游标，越界值收敛为 [0, 54]
        await $line.trigger('click', { clientX: 200 });
        expect(onChange).toHaveBeenCalledWith([0, 54]);

        // mock 滑块位置后点击 x=50 移动左侧游标，101 收敛为 100
        vi.spyOn(wrapper.find(`.${classPrefix}__dot--left`).element, 'getBoundingClientRect').mockReturnValue(
          createRect({ left: LINE_LEFT }),
        );
        vi.spyOn(wrapper.find(`.${classPrefix}__dot--right`).element, 'getBoundingClientRect').mockReturnValue(
          createRect({ left: LINE_LEFT + LINE_WIDTH }),
        );
        await $line.trigger('click', { clientX: 50 });
        expect(onChange).toHaveBeenLastCalledWith([10, 100]);
      });

      it('ignores invalid step values', async () => {
        const onChange = vi.fn();
        mockElementRect(HORIZONTAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            value: 0,
            step: -1,
            onChange,
          },
        });
        const $line = wrapper.find(`.${classPrefix}__line`);

        // step 为负数时不做步进，仅按精度取整：53.64 → 54
        await $line.trigger('click', { clientX: 200 });
        expect(onChange).toHaveBeenCalledWith(54);

        // step 大于 (max - min) 时同样不做步进
        await wrapper.setProps({ step: 200 });
        await $line.trigger('click', { clientX: 200 });
        expect(onChange).toHaveBeenLastCalledWith(54);
      });

      it('clamps single dot dragged beyond limits', async () => {
        const onChange = vi.fn();
        mockElementRect(HORIZONTAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            defaultValue: 40,
            onChange,
          },
        });
        await nextTick();

        // 拖动超出 max 收敛为 100：(500 - 16) / 343 * 100 = 141.11 → 141 → 100
        await moveHorizontal(wrapper.find(`.${classPrefix}__dot`), 500);
        expect(onChange).toHaveBeenCalledWith(100);

        // 拖动低于 min 收敛为 0：(-50 - 16) / 343 * 100 = -19.24 → -19 → 0
        await moveHorizontal(wrapper.find(`.${classPrefix}__dot`), -50);
        expect(onChange).toHaveBeenLastCalledWith(0);
      });
    });

    describe('vertical slider', () => {
      it('drags a single dot by vertical offset', async () => {
        const onChange = vi.fn();
        mockElementRect(VERTICAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            defaultValue: 40,
            vertical: true,
            onChange,
          },
        });
        await nextTick();

        // 初始滑轨高度：0.4 * 200 = 80
        expect(getStyleValue(wrapper.find(`.${classPrefix}__line--single`).attributes('style'), 'height')).toBeCloseTo(
          80,
        );

        // 纵向拖动到 y=170：(170 - 20) / 200 * 100 = 75，非受控更新滑轨高度 150
        await moveVertical(wrapper.find(`.${classPrefix}__dot`), 170);
        expect(onChange).toHaveBeenCalledWith(75);
        await nextTick();
        expect(getStyleValue(wrapper.find(`.${classPrefix}__line--single`).attributes('style'), 'height')).toBeCloseTo(
          150,
        );
      });

      it('positions and drags a range slider vertically', async () => {
        const onChange = vi.fn();
        mockElementRect(VERTICAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            value: [20, 80],
            vertical: true,
            range: true,
            label: true,
            onChange,
          },
        });
        await nextTick();

        // 垂直双滑块按 top/bottom 定位：200 * 20% = 40
        const style = wrapper.find(`.${classPrefix}__line--default`).attributes('style');
        expect(getStyleValue(style, 'top')).toBe(40);
        expect(getStyleValue(style, 'bottom')).toBe(40);
        expect(wrapper.find(`.${classPrefix}__dot--left`).text()).toBe('20');
        expect(wrapper.find(`.${classPrefix}__dot--right`).text()).toBe('80');

        // 纵向拖动左侧游标到 y=170：(170 - 20) / 200 * 100 = 75
        await moveVertical(wrapper.find(`.${classPrefix}__dot--left`), 170);
        expect(onChange).toHaveBeenCalledWith([75, 80]);
      });
    });

    describe('capsule theme with marks', () => {
      it('offsets scale items and hides edge marks', async () => {
        mockElementRect(HORIZONTAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            theme: 'capsule',
            value: 30,
            marks: { 0: '小', 50: '中', 100: '大' },
          },
        });
        await nextTick();

        // capsule 主题下展示刻度时轨道追加 --bar--marks
        expect(wrapper.find(`.${classPrefix}__bar`).classes()).toContain(`${classPrefix}__bar--marks`);

        // 可滑动长度 343 - 20 - 6 = 317，刻度增加半滑块偏移：round(v / 100 * 317) + 10
        const $items = wrapper.findAll(`.${classPrefix}__scale-item`);
        const itemStyles = $items.map((item) => getStyleValue(item.attributes('style'), 'left'));
        expect(itemStyles).toEqual([10, 169, 327]);

        // 首尾刻度被隐藏，中间刻度正常展示
        expect($items[0].classes()).toContain(`${classPrefix}__scale-item--hidden`);
        expect($items[1].classes()).not.toContain(`${classPrefix}__scale-item--hidden`);
        expect($items[2].classes()).toContain(`${classPrefix}__scale-item--hidden`);
        expect($items[1].find(`.${classPrefix}__scale-desc`).text()).toBe('中');
      });

      it('offsets the range line by half block', async () => {
        mockElementRect(HORIZONTAL_RECT);

        const wrapper = mount(Slider, {
          props: {
            theme: 'capsule',
            value: [0, 80],
            range: true,
          },
        });
        await nextTick();

        // capsule 双滑块的滑轨两侧各增加半滑块宽度 10：right = 317 * 20% + 10 = 73.4 → 73
        const style = wrapper.find(`.${classPrefix}__line--capsule`).attributes('style');
        expect(getStyleValue(style, 'left')).toBe(10);
        expect(getStyleValue(style, 'right')).toBe(73);
      });
    });

    describe('form context', () => {
      it('inherits disabled from form', async () => {
        const onChange = vi.fn();

        const wrapper = mount(() => (
          <Form disabled={true}>
            <Slider defaultValue={0} onChange={onChange} />
          </Form>
        ));

        // 表单禁用注入：滑块呈禁用样式且不可交互
        expect(wrapper.find(`.${classPrefix}`).classes()).toContain(`${classPrefix}--disabled`);
        expect(wrapper.find(`.${classPrefix}__bar`).classes()).toContain(`${classPrefix}__bar--disabled`);

        await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 200 });
        await moveHorizontal(wrapper.find(`.${classPrefix}__dot`), 100);
        expect(onChange).toHaveBeenCalledTimes(0);
      });

      it('blocks interaction inside a readonly form', async () => {
        const onChange = vi.fn();

        const wrapper = mount(() => (
          <Form readonly={true}>
            <Slider defaultValue={0} onChange={onChange} />
          </Form>
        ));

        // 表单只读注入：不呈禁用样式，但点击与拖动均不生效
        expect(wrapper.find(`.${classPrefix}`).classes()).not.toContain(`${classPrefix}--disabled`);

        await wrapper.find(`.${classPrefix}__line`).trigger('click', { clientX: 200 });
        await moveHorizontal(wrapper.find(`.${classPrefix}__dot`), 100);
        expect(onChange).toHaveBeenCalledTimes(0);
      });
    });
  });
});
