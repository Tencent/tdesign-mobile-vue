import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { nextTick } from 'vue';
import Popover from '../popover';
import type { TdPopoverProps } from '../type';

const name = 't-popover';

/** jsdom 无真实布局，mock 元素矩形 / offset 尺寸 / 视口尺寸，使 popper 计算出确定的定位结果 */
const REFERENCE_RECT = { x: 462, y: 300, top: 300, left: 462, right: 562, bottom: 340, width: 100, height: 40 };
const POPPER_RECT = { x: 0, y: 0, top: 0, left: 0, right: 200, bottom: 80, width: 200, height: 80 };
const VIEWPORT_RECT = { x: 0, y: 0, top: 0, left: 0, right: 1024, bottom: 768, width: 1024, height: 768 };

const originGetBoundingClientRect = Element.prototype.getBoundingClientRect;
const originOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
const originOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');

const mockPopperLayout = () => {
  Element.prototype.getBoundingClientRect = function (this: Element) {
    const { classList } = this;
    if (classList?.contains(`${name}__wrapper`)) return REFERENCE_RECT;
    if (classList?.contains(name)) return POPPER_RECT;
    return VIEWPORT_RECT;
  } as unknown as typeof Element.prototype.getBoundingClientRect;

  // popper 的 getLayoutRect 读取 offsetWidth / offsetHeight（jsdom 下恒为 0），需一并提供确定值
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement) {
      return this.classList?.contains(name) ? POPPER_RECT.width : 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement) {
      return this.classList?.contains(name) ? POPPER_RECT.height : 0;
    },
  });
  // popper 以 documentElement.clientWidth / clientHeight 作为视口裁剪区域（jsdom 下恒为 0）
  Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: VIEWPORT_RECT.width });
  Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: VIEWPORT_RECT.height });
};

const restorePopperLayout = () => {
  Element.prototype.getBoundingClientRect = originGetBoundingClientRect;
  if (originOffsetWidth) {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originOffsetWidth);
  }
  if (originOffsetHeight) {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originOffsetHeight);
  }
  Reflect.deleteProperty(document.documentElement, 'clientWidth');
  Reflect.deleteProperty(document.documentElement, 'clientHeight');
};

/** popper 实例的 update 通过微任务调度，等待定位结果应用到 DOM 后再断言 */
const flushPopperUpdate = async () => {
  await nextTick();
  await nextTick();
};

/** 从浮层 style 中解析 popper 写入的 translate 定位 */
const getTranslate = (style: string) => {
  const matched = style.match(/translate\(([\d.]+)px, ([\d.]+)px\)/);
  expect(matched, `style 中应包含 translate 定位：${style}`).not.toBeNull();
  return { x: Number(matched?.[1]), y: Number(matched?.[2]) };
};

describe('Popover', () => {
  afterEach(() => {
    restorePopperLayout();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  describe('props', () => {
    it('closeOnClickOutside[boolean]', async () => {
      // 默认 true：点击浮层与触发元素以外的区域后关闭
      const onVisibleChange = vi.fn();
      const wrapper = mount(() => (
        <Popover
          defaultVisible
          content="气泡内容"
          onVisibleChange={onVisibleChange}
          v-slots={{ default: () => '触发元素' }}
        />
      ));
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();

      document.body.dispatchEvent(new Event('touchstart', { bubbles: true }));
      await nextTick();
      expect(onVisibleChange).toHaveBeenLastCalledWith(false);
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();
      wrapper.unmount();

      // false：点击外部区域不关闭
      const onVisibleChange2 = vi.fn();
      const wrapper2 = mount(() => (
        <Popover defaultVisible closeOnClickOutside={false} content="气泡内容" onVisibleChange={onVisibleChange2} />
      ));
      document.body.dispatchEvent(new Event('touchstart', { bubbles: true }));
      await nextTick();
      expect(onVisibleChange2).not.toHaveBeenCalled();
      expect(wrapper2.find(`.${name}`).exists()).toBeTruthy();
      wrapper2.unmount();
    });

    it('content[string]', () => {
      const wrapper = mount(() => <Popover visible={true} content="气泡内容" />);
      expect(wrapper.find(`.${name}__content`).text()).toBe('气泡内容');
      wrapper.unmount();
    });

    it('content[function]', () => {
      const wrapper = mount(() => <Popover visible={true} content={() => '函数气泡内容'} />);
      expect(wrapper.find(`.${name}__content`).text()).toBe('函数气泡内容');
      wrapper.unmount();
    });

    it('content[slot]', () => {
      const wrapper = mount(Popover, {
        props: { visible: true },
        slots: { content: () => '插槽内容' },
      });
      expect(wrapper.find(`.${name}__content`).text()).toBe('插槽内容');
      wrapper.unmount();
    });

    it('default[string]', () => {
      const wrapper = mount(Popover, { props: { default: '默认触发' } });
      expect(wrapper.find(`.${name}__wrapper`).text()).toBe('默认触发');
      wrapper.unmount();
    });

    it('default[function]', () => {
      const wrapper = mount(Popover, {
        props: { default: () => <button class="default-fn-trigger">函数触发</button> },
      });
      expect(wrapper.find(`.${name}__wrapper .default-fn-trigger`).text()).toBe('函数触发');
      wrapper.unmount();
    });

    it('default[slot]', () => {
      const wrapper = mount(() => (
        <Popover content="气泡内容" v-slots={{ default: () => <button class="trigger-btn">触发按钮</button> }} />
      ));
      expect(wrapper.find(`.${name}__wrapper .trigger-btn`).exists()).toBeTruthy();
      wrapper.unmount();
    });

    it('placement[top/left/right/bottom/top-left/top-right/bottom-left/bottom-right/left-top/left-bottom/right-top/right-bottom]', async () => {
      mockPopperLayout();
      // TDesign 方位命名会被转换为 popper 的 start/end 命名
      const placementCases: Array<[TdPopoverProps['placement'], string]> = [
        ['top', 'top'],
        ['left', 'left'],
        ['right', 'right'],
        ['bottom', 'bottom'],
        ['top-left', 'top-start'],
        ['top-right', 'top-end'],
        ['bottom-left', 'bottom-start'],
        ['bottom-right', 'bottom-end'],
        ['left-top', 'left-start'],
        ['left-bottom', 'left-end'],
        ['right-top', 'right-start'],
        ['right-bottom', 'right-end'],
      ];
      const basePlacementTranslate: Record<string, { x: number; y: number }> = {};

      const mountedCases = placementCases.map(([placement]) => ({
        placement,
        wrapper: mount(() => <Popover visible content="气泡内容" placement={placement} />),
      }));
      await flushPopperUpdate();

      mountedCases.forEach(({ placement, wrapper }, index) => {
        const popover = wrapper.find(`.${name}`);
        expect(popover.attributes('data-popper-placement')).toBe(placementCases[index][1]);
        if (['top', 'bottom', 'left', 'right'].includes(placement as string)) {
          basePlacementTranslate[placement as string] = getTranslate(popover.attributes('style') ?? '');
        }
        wrapper.unmount();
      });

      // 基础方位的方向：top 位于参照物上方 / bottom 位于下方；left 位于左侧 / right 位于右侧
      expect(basePlacementTranslate.top.y).toBeLessThan(basePlacementTranslate.bottom.y);
      expect(basePlacementTranslate.left.x).toBeLessThan(basePlacementTranslate.right.x);
    });

    it('showArrow[boolean]', () => {
      const wrapper = mount(() => <Popover visible={true} content="气泡内容" />);
      expect(wrapper.find(`.${name}__arrow`).exists()).toBeTruthy();
      expect(wrapper.find(`.${name}__content`).classes()).toContain(`${name}__content--arrow`);
      wrapper.unmount();

      const wrapper2 = mount(() => <Popover visible={true} content="气泡内容" showArrow={false} />);
      expect(wrapper2.find(`.${name}__arrow`).exists()).toBeFalsy();
      expect(wrapper2.find(`.${name}__content`).classes()).not.toContain(`${name}__content--arrow`);
      wrapper2.unmount();
    });

    it('theme[dark/light/brand/success/warning/error]', () => {
      // 默认 dark
      const defaultWrapper = mount(() => <Popover visible={true} content="气泡内容" />);
      expect(defaultWrapper.find(`.${name}--dark`).exists()).toBeTruthy();
      defaultWrapper.unmount();

      const themeList: Array<NonNullable<TdPopoverProps['theme']>> = [
        'dark',
        'light',
        'brand',
        'success',
        'warning',
        'error',
      ];
      themeList.forEach((theme) => {
        const wrapper = mount(() => <Popover visible={true} content="气泡内容" theme={theme} />);
        expect(wrapper.find(`.${name}--${theme}`).exists()).toBeTruthy();
        wrapper.unmount();
      });
    });

    it('triggerElement[string]', () => {
      const wrapper = mount(Popover, { props: { triggerElement: '字符串触发' } });
      expect(wrapper.find(`.${name}__wrapper`).text()).toBe('字符串触发');
      wrapper.unmount();
    });

    it('triggerElement[function]', () => {
      const wrapper = mount(() => <Popover content="气泡内容" triggerElement={() => '点击触发'} />);
      expect(wrapper.find(`.${name}__wrapper`).text()).toBe('点击触发');
      wrapper.unmount();
    });

    it('triggerElement[slot]', () => {
      const wrapper = mount(Popover, {
        props: { content: '气泡内容' },
        slots: { triggerElement: () => <button class="trigger-slot-btn">插槽触发</button> },
      });
      expect(wrapper.find(`.${name}__wrapper .trigger-slot-btn`).text()).toBe('插槽触发');
      wrapper.unmount();
    });

    it('visible[boolean]', async () => {
      const wrapper = mount(Popover, { props: { visible: false, content: '气泡内容' } });
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();

      await wrapper.setProps({ visible: true });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();

      await wrapper.setProps({ visible: false });
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();
      wrapper.unmount();
    });

    it('modelValue[boolean]', async () => {
      const wrapper = mount(Popover, { props: { modelValue: false, content: '气泡内容' } });
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();

      await wrapper.setProps({ modelValue: true });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();

      await wrapper.setProps({ modelValue: false });
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();
      wrapper.unmount();
    });

    it('defaultVisible[boolean]', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mount(Popover, {
        props: { defaultVisible: true, content: '气泡内容', onVisibleChange },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();

      // 非受控：点击触发元素即可切换显示隐藏
      await wrapper.find(`.${name}__wrapper`).trigger('click');
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();
      expect(onVisibleChange).toHaveBeenLastCalledWith(false);
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('visibleChange', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mount(() => (
        <Popover content="气泡内容" onVisibleChange={onVisibleChange} v-slots={{ default: () => '触发元素' }} />
      ));
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();

      await wrapper.find(`.${name}__wrapper`).trigger('click');
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
      expect(onVisibleChange).toHaveBeenCalledTimes(1);
      expect(onVisibleChange).toHaveBeenLastCalledWith(true);

      await wrapper.find(`.${name}__wrapper`).trigger('click');
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();
      expect(onVisibleChange).toHaveBeenCalledTimes(2);
      expect(onVisibleChange).toHaveBeenLastCalledWith(false);
      wrapper.unmount();
    });

    it('update:visible', async () => {
      const wrapper = mount(Popover, { props: { visible: true, content: '气泡内容' } });

      await wrapper.find(`.${name}__wrapper`).trigger('click');
      // 受控模式：仅派发 update:visible，浮层不自行关闭
      expect(wrapper.emitted('update:visible')).toEqual([[false]]);
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();

      await wrapper.setProps({ visible: false });
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();

      await wrapper.find(`.${name}__wrapper`).trigger('click');
      expect(wrapper.emitted('update:visible')).toEqual([[false], [true]]);
      wrapper.unmount();
    });

    it('update:modelValue', async () => {
      const wrapper = mount(Popover, { props: { modelValue: false, content: '气泡内容' } });

      await wrapper.find(`.${name}__wrapper`).trigger('click');
      expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
      // 受控模式：modelValue 未同步前浮层保持隐藏
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();

      await wrapper.setProps({ modelValue: true });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('scenarios', () => {
    it('recreates popper when placement changes while visible', async () => {
      mockPopperLayout();
      const wrapper = mount(Popover, {
        props: { visible: true, content: '气泡内容', placement: 'top' },
      });
      await flushPopperUpdate();
      expect(wrapper.find(`.${name}`).attributes('data-popper-placement')).toBe('top');

      await wrapper.setProps({ placement: 'bottom-left' });
      await flushPopperUpdate();
      expect(wrapper.find(`.${name}`).attributes('data-popper-placement')).toBe('bottom-start');
      wrapper.unmount();
    });

    it('keeps open when clicking inside popover and closes when clicking outside', async () => {
      const wrapper = mount(() => <Popover defaultVisible content="气泡内容" />);
      await flushPopperUpdate();
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();

      // 点击浮层内容不关闭
      await wrapper.find(`.${name}__content`).trigger('touchstart');
      await nextTick();
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();

      // 点击浮层与触发元素以外的区域关闭
      document.body.dispatchEvent(new Event('touchstart', { bubbles: true }));
      await nextTick();
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();
      wrapper.unmount();
    });

    it('recreates popper after closing and reopening', async () => {
      mockPopperLayout();
      const wrapper = mount(() => <Popover defaultVisible content="气泡内容" />);
      await flushPopperUpdate();
      expect(wrapper.find(`.${name}`).attributes('data-popper-placement')).toBe('top');

      await wrapper.find(`.${name}__wrapper`).trigger('click');
      await flushPopperUpdate();
      expect(wrapper.find(`.${name}`).exists()).toBeFalsy();

      await wrapper.find(`.${name}__wrapper`).trigger('click');
      await flushPopperUpdate();
      expect(wrapper.find(`.${name}`).attributes('data-popper-placement')).toBe('top');
      wrapper.unmount();
    });
  });
});
