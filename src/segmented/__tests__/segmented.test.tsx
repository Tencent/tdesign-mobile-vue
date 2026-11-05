import { afterEach, describe, expect, it, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import { HomeIcon } from 'tdesign-icons-vue-next';
import Segmented from '../segmented';
import type { SegmentedItem } from '../type';
import { createRect, mockRectByClass, type RectInit } from '@/test/mock-rect';

const prefix = 't';
const name = `${prefix}-segmented`;

const stringOptions = ['选项一', '选项二', '选项三'];
const numberOptions = [1, 2, 3];

/** 滑块定位所需的三等分布局：group 起点 8px，每个选项宽 60px */
const layoutRects = (): Record<string, RectInit> => ({
  [`${name}__group`]: { left: 8, width: 184 },
  [`${name}-item-0`]: { left: 8, width: 60 },
  [`${name}-item-1`]: { left: 68, width: 60 },
  [`${name}-item-2`]: { left: 128, width: 60 },
});

describe('Segmented', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('props', () => {
    it('block[boolean]', async () => {
      const wrapper = mount(Segmented, {
        props: {
          options: stringOptions,
        },
      });

      expect(wrapper.classes()).not.toContain(`${name}--block`);

      await wrapper.setProps({ block: true });
      expect(wrapper.classes()).toContain(`${name}--block`);
    });

    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Segmented, {
        props: {
          options: stringOptions,
          defaultValue: '选项一',
          onChange,
        },
      });

      let $items = wrapper.findAll(`.${name}__item`);
      expect($items[1].classes()).not.toContain(`${name}__item--disabled`);

      await wrapper.setProps({ disabled: true });
      $items = wrapper.findAll(`.${name}__item`);
      expect($items[0].classes()).toContain(`${name}__item--disabled`);
      expect($items[1].classes()).toContain(`${name}__item--disabled`);
      expect($items[2].classes()).toContain(`${name}__item--disabled`);

      // 整组禁用后点击任意选项都不触发 change
      await $items[1].trigger('click');
      expect(onChange).not.toBeCalled();
    });

    it('options[string]', () => {
      const wrapper = mount(Segmented, {
        props: {
          options: stringOptions,
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      expect($items).toHaveLength(3);
      expect($items[0].find(`.${name}__item-label`).text()).toBe('选项一');
      expect($items[2].find(`.${name}__item-label`).text()).toBe('选项三');

      // 未传 value 时没有激活项
      expect(wrapper.findAll(`.${name}__item--active`)).toHaveLength(0);
    });

    it('options[number]', () => {
      const wrapper = mount(Segmented, {
        props: {
          options: numberOptions,
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      expect($items).toHaveLength(3);

      // 数字选项的 label 回退为 String(value)
      expect($items[0].find(`.${name}__item-label`).text()).toBe('1');
      expect($items[1].find(`.${name}__item-label`).text()).toBe('2');
      expect($items[2].find(`.${name}__item-label`).text()).toBe('3');
    });

    it('options[object]', () => {
      const wrapper = mount(Segmented, {
        props: {
          options: [{ value: 0, label: '首页' }, { value: 1 }],
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      expect($items).toHaveLength(2);

      // 对象选项使用传入的 label
      expect($items[0].find(`.${name}__item-label`).text()).toBe('首页');
      // 未传 label 时回退为 String(value)
      expect($items[1].find(`.${name}__item-label`).text()).toBe('1');
    });

    it('options[object] & label[function]', () => {
      const wrapper = mount(Segmented, {
        props: {
          options: [{ value: 0, label: () => <em>自定义内容</em> }],
        },
      });

      // TNode 函数作为 label 时渲染返回的节点
      expect(wrapper.find(`.${name}__item-label`).html()).toContain('<em>自定义内容</em>');
    });

    it('options[object] & icon[VNode]', () => {
      const wrapper = mount(Segmented, {
        props: {
          // icon 声明类型为 TNode（函数），运行时同时支持直接传 VNode，这里验证该渲染通道
          options: [{ value: 0, label: '首页', icon: h(HomeIcon) } as unknown as SegmentedItem],
        },
      });

      const $icon = wrapper.find(`.${name}__item-icon`);
      expect($icon.exists()).toBeTruthy();
      expect($icon.find('svg').exists()).toBeTruthy();
    });

    it('options[object] & icon[function]', () => {
      const wrapper = mount(Segmented, {
        props: {
          options: [{ value: 0, label: '首页', icon: () => h(HomeIcon) }],
        },
      });

      const $icon = wrapper.find(`.${name}__item-icon`);
      expect($icon.exists()).toBeTruthy();
      expect($icon.find('svg').exists()).toBeTruthy();
    });

    it('options[object] & disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Segmented, {
        props: {
          options: [
            { value: 0, label: '周一' },
            { value: 1, label: '周二' },
            { value: 2, label: '周三', disabled: true },
          ],
          defaultValue: 0,
          onChange,
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      expect($items[0].classes()).not.toContain(`${name}__item--disabled`);
      expect($items[2].classes()).toContain(`${name}__item--disabled`);

      // 点击禁用项不触发 change
      await $items[2].trigger('click');
      expect(onChange).not.toBeCalled();

      // 点击可用项正常触发 change
      await $items[1].trigger('click');
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith({ value: 1, selectedOption: { value: 1, label: '周二' } });
    });

    it('value[string]', async () => {
      const value = ref('选项一');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => <Segmented value={value.value} options={stringOptions} onChange={onChange} />;
        },
      });

      let $items = wrapper.findAll(`.${name}__item`);
      expect($items[0].classes()).toContain(`${name}__item--active`);

      // 受控模式：外部修改 value 后激活项切换
      value.value = '选项三';
      await nextTick();
      $items = wrapper.findAll(`.${name}__item`);
      expect($items[2].classes()).toContain(`${name}__item--active`);
      expect($items[0].classes()).not.toContain(`${name}__item--active`);

      // 外部值未响应时，点击仅抛出 update:value 与 change，激活项保持
      await $items[1].trigger('click');
      expect(wrapper.findComponent(Segmented).emitted('update:value')).toEqual([['选项二']]);
      expect(onChange).toBeCalledTimes(1);
      $items = wrapper.findAll(`.${name}__item`);
      expect($items[2].classes()).toContain(`${name}__item--active`);
    });

    it('value[number]', async () => {
      const wrapper = mount(Segmented, {
        props: {
          value: 2,
          options: numberOptions,
        },
      });

      let $items = wrapper.findAll(`.${name}__item`);
      expect($items[1].classes()).toContain(`${name}__item--active`);

      // 受控模式：点击触发 update:value，未接收新值前激活项保持
      await $items[0].trigger('click');
      expect(wrapper.emitted('update:value')).toEqual([[1]]);
      $items = wrapper.findAll(`.${name}__item`);
      expect($items[0].classes()).not.toContain(`${name}__item--active`);
      expect($items[1].classes()).toContain(`${name}__item--active`);

      // 外部更新受控值，激活项跟随
      await wrapper.setProps({ value: 1 });
      $items = wrapper.findAll(`.${name}__item`);
      expect($items[0].classes()).toContain(`${name}__item--active`);
      expect($items[1].classes()).not.toContain(`${name}__item--active`);
    });

    it('modelValue[string]', async () => {
      const value = ref('选项一');
      const wrapper = mount({
        setup() {
          return () => <Segmented v-model={value.value} options={stringOptions} />;
        },
      });

      let $items = wrapper.findAll(`.${name}__item`);
      expect($items[0].classes()).toContain(`${name}__item--active`);

      // v-model 双向绑定：点击后选中值与激活项同步切换
      await $items[1].trigger('click');
      expect(value.value).toBe('选项二');
      expect(wrapper.findComponent(Segmented).emitted('update:modelValue')).toEqual([['选项二']]);
      $items = wrapper.findAll(`.${name}__item`);
      expect($items[1].classes()).toContain(`${name}__item--active`);
      expect($items[0].classes()).not.toContain(`${name}__item--active`);

      // 外部修改 v-model 值，激活项跟随
      value.value = '选项三';
      await nextTick();
      $items = wrapper.findAll(`.${name}__item`);
      expect($items[2].classes()).toContain(`${name}__item--active`);
    });

    it('modelValue[number]', async () => {
      const value = ref(1);
      const wrapper = mount({
        setup() {
          return () => <Segmented v-model={value.value} options={numberOptions} />;
        },
      });

      let $items = wrapper.findAll(`.${name}__item`);
      expect($items[0].classes()).toContain(`${name}__item--active`);

      await $items[1].trigger('click');
      expect(value.value).toBe(2);
      $items = wrapper.findAll(`.${name}__item`);
      expect($items[1].classes()).toContain(`${name}__item--active`);
      expect($items[0].classes()).not.toContain(`${name}__item--active`);
    });

    it('defaultValue[string]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Segmented, {
        props: {
          options: stringOptions,
          defaultValue: '选项一',
          onChange,
        },
      });

      let $items = wrapper.findAll(`.${name}__item`);
      expect($items[0].classes()).toContain(`${name}__item--active`);

      // 非受控模式：点击后内部值切换，不抛出 update 事件
      await $items[2].trigger('click');
      expect(onChange).toBeCalledTimes(1);
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      expect(wrapper.emitted('update:value')).toBeUndefined();
      $items = wrapper.findAll(`.${name}__item`);
      expect($items[2].classes()).toContain(`${name}__item--active`);
      expect($items[0].classes()).not.toContain(`${name}__item--active`);
    });

    it('defaultValue[number]', async () => {
      const wrapper = mount(Segmented, {
        props: {
          options: numberOptions,
          defaultValue: 2,
        },
      });

      let $items = wrapper.findAll(`.${name}__item`);
      expect($items[1].classes()).toContain(`${name}__item--active`);

      await $items[2].trigger('click');
      $items = wrapper.findAll(`.${name}__item`);
      expect($items[2].classes()).toContain(`${name}__item--active`);
      expect($items[1].classes()).not.toContain(`${name}__item--active`);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Segmented, {
        props: {
          options: stringOptions,
          defaultValue: '选项一',
          onChange,
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      await $items[1].trigger('click');
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith({ value: '选项二', selectedOption: { value: '选项二', label: '选项二' } });

      // 点击当前激活项不重复触发 change
      await wrapper.findAll(`.${name}__item`)[1].trigger('click');
      expect(onChange).toBeCalledTimes(1);
    });
  });

  describe('scenarios', () => {
    describe('thumb position', () => {
      it('positions the thumb on the active item after mount', async () => {
        mockRectByClass(layoutRects());
        const wrapper = mount(Segmented, {
          props: {
            options: stringOptions,
            defaultValue: '选项二',
          },
        });
        await flushPromises();

        const style = wrapper.find(`.${name}__thumb`).attributes('style');
        expect(style).toContain('width: 60px');
        expect(style).toContain('translateX(60px)');
      });

      it('moves the thumb when the selected value changes', async () => {
        mockRectByClass(layoutRects());
        const value = ref('选项一');
        const wrapper = mount({
          setup() {
            return () => <Segmented v-model={value.value} options={stringOptions} />;
          },
        });
        await flushPromises();

        const $thumb = wrapper.find(`.${name}__thumb`);
        expect($thumb.attributes('style')).toContain('translateX(0px)');

        const $items = wrapper.findAll(`.${name}__item`);
        await $items[2].trigger('click');
        await flushPromises();

        expect(value.value).toBe('选项三');
        expect($thumb.attributes('style')).toContain('translateX(120px)');
      });

      it('updates the thumb when the group size changes', async () => {
        const rects = layoutRects();
        mockRectByClass(rects);

        // jsdom 未实现 ResizeObserver，用可记录回调的 Mock 替代
        class MockResizeObserver {
          static callbacks: Array<(entries: Array<{ contentRect: { width: number; height: number } }>) => void> = [];

          element: Element | null = null;

          constructor(callback: (entries: Array<{ contentRect: { width: number; height: number } }>) => void) {
            MockResizeObserver.callbacks.push(callback);
          }

          observe(element: Element) {
            this.element = element;
          }

          unobserve() {
            this.element = null;
          }

          disconnect() {
            this.element = null;
          }
        }
        vi.stubGlobal('ResizeObserver', MockResizeObserver);

        const wrapper = mount(Segmented, {
          props: {
            options: stringOptions,
            defaultValue: '选项一',
          },
        });
        await flushPromises();

        const $thumb = wrapper.find(`.${name}__thumb`);
        expect($thumb.attributes('style')).toContain('translateX(0px)');

        // 模拟布局变化：第一个选项右移 12px 后触发 resize 回调
        rects[`${name}-item-0`] = { left: 20, width: 60 };
        MockResizeObserver.callbacks[0]([{ contentRect: { width: 200, height: 32 } }]);
        await flushPromises();

        expect($thumb.attributes('style')).toContain('translateX(12px)');
      });

      it('resets the thumb when no option matches the value', async () => {
        mockRectByClass(layoutRects());
        const wrapper = mount(Segmented, {
          props: {
            options: stringOptions,
            value: '不存在的选项',
          },
        });
        await flushPromises();

        expect(wrapper.findAll(`.${name}__item--active`)).toHaveLength(0);
        expect(wrapper.find(`.${name}__thumb`).attributes('style')).toBeUndefined();
      });
    });

    describe('dynamic options', () => {
      it('updates items and thumb when options change', async () => {
        mockRectByClass(layoutRects());
        const value = ref('选项一');
        const options = ref(['选项一', '选项二', '选项三']);
        const wrapper = mount({
          setup() {
            return () => <Segmented v-model={value.value} options={options.value} />;
          },
        });
        await flushPromises();

        expect(wrapper.find(`.${name}__thumb`).attributes('style')).toContain('translateX(0px)');

        // 新选项中「选项一」排在第二位，激活项与滑块随之移动
        options.value = ['选项二', '选项一'];
        await flushPromises();

        const $items = wrapper.findAll(`.${name}__item`);
        expect($items).toHaveLength(2);
        expect($items[0].find(`.${name}__item-label`).text()).toBe('选项二');
        expect($items[1].classes()).toContain(`${name}__item--active`);
        expect(wrapper.find(`.${name}__thumb`).attributes('style')).toContain('translateX(60px)');
      });

      it('clears the active item when the value is removed from options', async () => {
        mockRectByClass(layoutRects());
        const value = ref('选项三');
        const options = ref(['选项一', '选项二', '选项三']);
        const wrapper = mount({
          setup() {
            return () => <Segmented v-model={value.value} options={options.value} />;
          },
        });
        await flushPromises();

        expect(wrapper.findAll(`.${name}__item`)[2].classes()).toContain(`${name}__item--active`);
        expect(wrapper.find(`.${name}__thumb`).attributes('style')).toContain('translateX(120px)');

        options.value = ['选项一', '选项二'];
        await flushPromises();

        const $items = wrapper.findAll(`.${name}__item`);
        expect($items).toHaveLength(2);
        expect($items[0].classes()).not.toContain(`${name}__item--active`);
        expect($items[1].classes()).not.toContain(`${name}__item--active`);
        // 清空已设置的内联样式后 style 属性保留为空字符串
        expect(wrapper.find(`.${name}__thumb`).attributes('style')).toBe('');
      });
    });

    describe('value priority', () => {
      it('value[string] & defaultValue[string]', () => {
        const wrapper = mount(Segmented, {
          props: {
            options: stringOptions,
            value: '选项三',
            defaultValue: '选项一',
          },
        });

        // 受控 value 优先于 defaultValue
        const $items = wrapper.findAll(`.${name}__item`);
        expect($items[2].classes()).toContain(`${name}__item--active`);
        expect($items[0].classes()).not.toContain(`${name}__item--active`);
      });

      it('modelValue[string] & defaultValue[string]', () => {
        const wrapper = mount(Segmented, {
          props: {
            options: stringOptions,
            modelValue: '选项三',
            defaultValue: '选项一',
          },
        });

        // v-model 受控值优先于 defaultValue
        const $items = wrapper.findAll(`.${name}__item`);
        expect($items[2].classes()).toContain(`${name}__item--active`);
        expect($items[0].classes()).not.toContain(`${name}__item--active`);
      });
    });
  });
});
