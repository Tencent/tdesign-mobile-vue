import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Sticky from '../sticky';
import { useTestUtils } from '../../shared';

const { makeScroll } = useTestUtils();

interface RectStub {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

const createRect = (init: Partial<RectStub> = {}): RectStub => ({
  x: 0,
  y: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  ...init,
});

/**
 * 将元素的 getBoundingClientRect 替换为确定值，返回还原函数。
 * 返回的 rect 为可变对象，测试中直接修改字段即可模拟滚动过程中的边界变化。
 */
const mockElementRect = (element: Element, rect: RectStub) => {
  const spy = vi.spyOn(element, 'getBoundingClientRect').mockReturnValue(rect as DOMRect);
  return () => spy.mockRestore();
};

const mountSticky = (template: string, methods: Record<string, any> = {}) =>
  mount(
    {
      components: {
        Sticky,
      },
      template,
      methods,
    },
    { attachTo: document.body },
  );

const getContentStyle = (wrapper: VueWrapper) => wrapper.find('.t-sticky__content').attributes('style');

/** mock 组件自身（box 与 content）的边界信息，返回还原函数列表 */
const mockStickyRects = (wrapper: VueWrapper, boxRect: RectStub, contentRect: RectStub) => {
  const contentEl = wrapper.find('.t-sticky__content').element;
  const boxEl = contentEl.closest('.t-sticky') as Element;
  const restores = [mockElementRect(boxEl, boxRect), mockElementRect(contentEl, contentRect)];
  return () => restores.forEach((restore) => restore());
};

describe('Sticky', () => {
  afterEach(() => {
    document.documentElement.scrollTop = 0;
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it('container[string]', async () => {
      const wrapper = mountSticky(`
        <div>
          <div class="sticky-container">
            <Sticky container=".sticky-container" :offsetTop="30">
              <div class="sticky-item">容器内吸顶</div>
            </Sticky>
          </div>
        </div>
      `);

      const containerRect = createRect({ top: 100, bottom: 300, width: 375, height: 200 });
      const boxRect = createRect({ top: 100, bottom: 140, width: 375, height: 40 });
      const contentRect = createRect({ top: 100, bottom: 140, width: 375, height: 40 });
      const restoreContainer = mockElementRect(wrapper.find('.sticky-container').element, containerRect);
      const restoreSticky = mockStickyRects(wrapper, boxRect, contentRect);

      // 未到吸顶位置：boxTop(100) > offsetTop(30)
      await makeScroll(document.documentElement, 'scrollTop', 50);
      expect(getContentStyle(wrapper)).toBe('z-index: 99;');

      // 到达吸顶位置且容器可视：固定在容器内
      boxRect.top = 20;
      await makeScroll(document.documentElement, 'scrollTop', 100);
      expect(getContentStyle(wrapper)).toBe('z-index: 99; position: fixed; top: 30px;');

      // 即将超出容器底部：通过 transform 跟随容器移动（difference = 50 - 30 - 40 = -20）
      containerRect.bottom = 50;
      boxRect.top = 19;
      await makeScroll(document.documentElement, 'scrollTop', 150);
      expect(getContentStyle(wrapper)).toBe(
        'z-index: 99; position: fixed; top: 30px; transform: translate3d(0, -20px, 0);',
      );

      restoreContainer();
      restoreSticky();
      wrapper.unmount();
    });

    it('container[object]', async () => {
      const containerEl = document.createElement('div');
      document.body.appendChild(containerEl);

      const wrapper = mount(
        () => (
          <Sticky container={containerEl} offsetTop={30}>
            <div class="sticky-item">容器内吸顶</div>
          </Sticky>
        ),
        { attachTo: document.body },
      );

      const containerRect = createRect({ top: 100, bottom: 300, width: 375, height: 200 });
      const boxRect = createRect({ top: 20, bottom: 60, width: 375, height: 40 });
      const contentRect = createRect({ top: 20, bottom: 60, width: 375, height: 40 });
      const restoreContainer = mockElementRect(containerEl, containerRect);
      const restoreSticky = mockStickyRects(wrapper, boxRect, contentRect);

      // 容器可视且到达吸顶位置：固定
      await makeScroll(document.documentElement, 'scrollTop', 50);
      expect(getContentStyle(wrapper)).toBe('z-index: 99; position: fixed; top: 30px;');

      // 容器完全滚出视口（bottom <= 0）：不再吸顶，仅保留随容器移动的 transform（difference = 0 - 30 - 40 = -70）
      containerRect.bottom = 0;
      boxRect.top = 19;
      await makeScroll(document.documentElement, 'scrollTop', 400);
      expect(getContentStyle(wrapper)).toBe('z-index: 99; transform: translate3d(0, -70px, 0);');

      restoreContainer();
      restoreSticky();
      wrapper.unmount();
      containerEl.remove();
    });

    it('disabled[boolean]', async () => {
      const wrapper = mount(Sticky, {
        props: { disabled: true, offsetTop: 30 },
        slots: {
          default: () => <div class="sticky-item">禁用吸顶</div>,
        },
        attachTo: document.body,
      });

      const boxRect = createRect({ top: 29, bottom: 69, width: 375, height: 40 });
      const contentRect = createRect({ top: 29, bottom: 69, width: 375, height: 40 });
      const restoreSticky = mockStickyRects(wrapper, boxRect, contentRect);

      // 禁用时即使到达吸顶位置也不固定，仅保留 z-index
      await makeScroll(document.documentElement, 'scrollTop', 100);
      expect(getContentStyle(wrapper)).toBe('z-index: 99;');

      // 重新启用后立即恢复吸顶
      await wrapper.setProps({ disabled: false });
      expect(getContentStyle(wrapper)).toBe('z-index: 99; position: fixed; top: 30px;');

      restoreSticky();
      wrapper.unmount();
    });

    it('offsetTop[number]', async () => {
      const wrapper = mountSticky(`
        <div>
          <Sticky :offsetTop="30">
            <div class="sticky-item">基础吸顶</div>
          </Sticky>
        </div>
      `);

      const boxRect = createRect({ top: 31, bottom: 71, width: 375, height: 40 });
      const contentRect = createRect({ top: 31, bottom: 71, width: 375, height: 40 });
      const restoreSticky = mockStickyRects(wrapper, boxRect, contentRect);

      // boxTop(31) > offsetTop(30)：未吸顶
      await makeScroll(document.documentElement, 'scrollTop', 50);
      expect(getContentStyle(wrapper)).toBe('z-index: 99;');

      // boxTop 恰好等于 offsetTop(30 <= 30)：吸顶于 30px
      boxRect.top = 30;
      await makeScroll(document.documentElement, 'scrollTop', 60);
      expect(getContentStyle(wrapper)).toBe('z-index: 99; position: fixed; top: 30px;');

      restoreSticky();
      wrapper.unmount();
    });

    it('offsetTop[string]', async () => {
      const wrapper = mountSticky(`
        <div>
          <Sticky offsetTop="50">
            <div class="sticky-item">基础吸顶</div>
          </Sticky>
        </div>
      `);

      const boxRect = createRect({ top: 51, bottom: 91, width: 375, height: 40 });
      const contentRect = createRect({ top: 51, bottom: 91, width: 375, height: 40 });
      const restoreSticky = mockStickyRects(wrapper, boxRect, contentRect);

      // 字符串 '50' 与数值 50 行为一致：boxTop(51) > 50 未吸顶
      await makeScroll(document.documentElement, 'scrollTop', 50);
      expect(getContentStyle(wrapper)).toBe('z-index: 99;');

      boxRect.top = 49;
      await makeScroll(document.documentElement, 'scrollTop', 100);
      expect(getContentStyle(wrapper)).toBe('z-index: 99; position: fixed; top: 50px;');

      restoreSticky();
      wrapper.unmount();
    });

    it('zIndex[number]', async () => {
      const wrapper = mountSticky(`
        <div>
          <Sticky :zIndex="1000" :offsetTop="30">
            <div class="sticky-item">基础吸顶</div>
          </Sticky>
        </div>
      `);

      const boxRect = createRect({ top: 100, bottom: 140, width: 375, height: 40 });
      const contentRect = createRect({ top: 100, bottom: 140, width: 375, height: 40 });
      const restoreSticky = mockStickyRects(wrapper, boxRect, contentRect);

      await makeScroll(document.documentElement, 'scrollTop', 10);
      expect(getContentStyle(wrapper)).toBe('z-index: 1000;');

      boxRect.top = 29;
      await makeScroll(document.documentElement, 'scrollTop', 50);
      expect(getContentStyle(wrapper)).toBe('z-index: 1000; position: fixed; top: 30px;');

      restoreSticky();
      wrapper.unmount();
    });

    it('onScroll[function]', async () => {
      const onScroll = vi.fn();
      const wrapper = mount(
        () => (
          <Sticky offsetTop={30} onScroll={onScroll}>
            <div class="sticky-item">基础吸顶</div>
          </Sticky>
        ),
        { attachTo: document.body },
      );

      const boxRect = createRect({ top: 100, bottom: 140, width: 375, height: 40 });
      const contentRect = createRect({ top: 12, bottom: 52, width: 375, height: 40 });
      const restoreSticky = mockStickyRects(wrapper, boxRect, contentRect);

      // 未吸顶
      await makeScroll(document.documentElement, 'scrollTop', 10);
      expect(onScroll).toHaveBeenLastCalledWith({ scrollTop: 12, isFixed: false });

      // 吸顶后
      boxRect.top = 29;
      await makeScroll(document.documentElement, 'scrollTop', 200);
      expect(onScroll).toHaveBeenLastCalledWith({ scrollTop: 12, isFixed: true });

      restoreSticky();
      wrapper.unmount();
    });

    it('default[slot]', () => {
      const wrapper = mountSticky(`
        <div>
          <Sticky>
            <div class="sticky-slot-content">自定义吸顶内容</div>
          </Sticky>
        </div>
      `);

      const slotContent = wrapper.find('.t-sticky__content .sticky-slot-content');
      expect(slotContent.exists()).toBe(true);
      expect(slotContent.text()).toBe('自定义吸顶内容');

      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('scroll', async () => {
      const onScroll = vi.fn();
      const wrapper = mountSticky(
        `
        <div>
          <Sticky @scroll="onScroll">
            <div class="sticky-item">基础吸顶</div>
          </Sticky>
        </div>
      `,
        { onScroll },
      );

      // 未设置 offsetTop 时默认为 0
      const boxRect = createRect({ top: 1, bottom: 41, width: 375, height: 40 });
      const contentRect = createRect({ top: 12, bottom: 52, width: 375, height: 40 });
      const restoreSticky = mockStickyRects(wrapper, boxRect, contentRect);

      // 未吸顶：boxTop(1) > offsetTop(0)
      await makeScroll(document.documentElement, 'scrollTop', 10);
      expect(onScroll).toHaveBeenLastCalledWith({ scrollTop: 12, isFixed: false });
      expect(getContentStyle(wrapper)).toBe('z-index: 99;');
      const callCount = onScroll.mock.calls.length;

      // 吸顶后：boxTop(0) <= offsetTop(0)，每次滚动触发一次回调
      boxRect.top = 0;
      await makeScroll(document.documentElement, 'scrollTop', 200);
      expect(onScroll.mock.calls.length).toBe(callCount + 1);
      expect(onScroll).toHaveBeenLastCalledWith({ scrollTop: 12, isFixed: true });
      expect(getContentStyle(wrapper)).toBe('z-index: 99; position: fixed; top: 0px;');

      restoreSticky();
      wrapper.unmount();
    });
  });
});
