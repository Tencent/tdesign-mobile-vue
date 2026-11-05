import { nextTick, ref } from 'vue';
import { expect, it, vi, describe, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import NoticeBar from '../notice-bar';
import { Swiper } from '../../swiper';
import { mockRectByClass } from '@/test/mock-rect';

const LIST_WIDTH = 100;
const ITEM_WIDTH = 300;

/**
 * jsdom 中 getBoundingClientRect 恒为 0，跑马灯测宽逻辑无法触发。
 * 通过 mock 容器(.t-notice-bar__content-wrap)与内容(.t-notice-bar__content)宽度驱动滚动分支。
 */
const mockContentRect = (listWidth = LIST_WIDTH, itemWidth = ITEM_WIDTH) =>
  mockRectByClass({ 't-notice-bar__content-wrap': { width: listWidth } }, { width: itemWidth });

describe('NoticeBar', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it('content[string]', () => {
      const wrapper = mount(<NoticeBar visible content="测试" />);
      expect(wrapper.find('.t-notice-bar__content').text()).toBe('测试');

      // 未传内容时内容区为空
      const wrapper2 = mount(<NoticeBar visible />);
      expect(wrapper2.find('.t-notice-bar__content').exists()).toBe(true);
      expect(wrapper2.find('.t-notice-bar__content').text()).toBe('');
    });

    it('content[array]', async () => {
      const content = ['君不见', '高堂明镜悲白发'];
      const wrapper = mount(<NoticeBar visible direction="vertical" content={content} />);
      await nextTick();
      expect(wrapper.find('.t-notice-bar__content--vertical').exists()).toBe(true);
      const items = wrapper.findAll('.t-notice-bar__content--vertical-item');
      expect(items).toHaveLength(2);
      expect(items[0].text()).toBe('君不见');
      expect(items[1].text()).toBe('高堂明镜悲白发');
    });

    it('content[function]', () => {
      const wrapper = mount(<NoticeBar visible content={() => '测试'} />);
      expect(wrapper.find('.t-notice-bar__content').text()).toBe('测试');
    });

    it('content[slot]', () => {
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          content: <div class="slot-content">测试</div>,
        },
      });
      expect(wrapper.find('.t-notice-bar__content .slot-content').exists()).toBe(true);
    });

    it.each([
      ['horizontal', '测试'],
      ['vertical', ['君不见', '高堂明镜悲白发']],
    ] as const)('direction[%s]', async (direction, content) => {
      const wrapper = mount(<NoticeBar visible direction={direction} content={content} />);
      await nextTick();
      expect(wrapper.find('.t-notice-bar__content--vertical').exists()).toBe(direction === 'vertical');
      if (direction === 'vertical') expect(wrapper.findComponent(Swiper).props('direction')).toBe('vertical');
    });

    it('interval[number]', async () => {
      const content = ['君不见', '高堂明镜悲白发'];
      const wrapper = mount(<NoticeBar visible direction="vertical" content={content} interval={5000} />);
      await nextTick();
      expect(wrapper.findComponent(Swiper).props('interval')).toBe(5000);

      // 默认 2000
      const wrapper2 = mount(<NoticeBar visible direction="vertical" content={content} />);
      await nextTick();
      expect(wrapper2.findComponent(Swiper).props('interval')).toBe(2000);
    });

    it('marquee[boolean]', async () => {
      vi.useFakeTimers();

      // 默认 false：不滚动，内容可换行
      const wrapper = mount(<NoticeBar visible content="测试" />);
      await nextTick();
      await vi.runAllTimersAsync();
      expect(wrapper.find('.t-notice-bar__content').classes()).toContain('t-notice-bar__content-wrapable');
      expect(wrapper.find('.t-notice-bar__content').attributes('style')).toBeFalsy();

      // true：内容超出容器时启动跑马灯，默认 speed 50 → 300 / 50 = 6s
      mockContentRect();
      const wrapper2 = mount(<NoticeBar visible content="测试" marquee />);
      await nextTick();
      await vi.advanceTimersByTimeAsync(0);
      const content2 = wrapper2.find('.t-notice-bar__content');
      expect(content2.classes()).not.toContain('t-notice-bar__content-wrapable');
      expect(content2.attributes('style')).toContain('transform: translateX(-300px)');
      expect(content2.attributes('style')).toContain('transition-duration: 6s');

      // true 但内容未超出容器：不产生位移
      mockContentRect(LIST_WIDTH, 50);
      const wrapper3 = mount(<NoticeBar visible content="测试" marquee />);
      await nextTick();
      await vi.advanceTimersByTimeAsync(0);
      expect(wrapper3.find('.t-notice-bar__content').attributes('style')).not.toContain('translateX');
    });

    it('marquee[object]', async () => {
      vi.useFakeTimers();

      // loop 为 0 表示不循环播放，直接不启动滚动
      const wrapper0 = mount(<NoticeBar visible content="测试" marquee={{ loop: 0 }} />);
      await nextTick();
      await vi.runAllTimersAsync();
      expect(wrapper0.find('.t-notice-bar__content').classes()).toContain('t-notice-bar__content-wrapable');
      expect(wrapper0.find('.t-notice-bar__content').attributes('style')).toBeFalsy();

      // speed 控制时长、delay 控制延迟启动
      mockContentRect();
      const wrapper = mount(<NoticeBar visible content="测试" marquee={{ speed: 100, delay: 200, loop: -1 }} />);
      await nextTick();
      await vi.advanceTimersByTimeAsync(199);
      expect(wrapper.find('.t-notice-bar__content').attributes('style')).not.toContain('translateX');

      await vi.advanceTimersByTimeAsync(1);
      const content = wrapper.find('.t-notice-bar__content');
      expect(content.classes()).not.toContain('t-notice-bar__content-wrapable');
      expect(content.attributes('style')).toContain('transform: translateX(-300px)');
      expect(content.attributes('style')).toContain('transition-duration: 3s');
    });

    it('operation[string]', () => {
      const wrapper = mount(<NoticeBar visible content="测试" operation="详情" />);
      expect(wrapper.find('.t-notice-bar__operation').text()).toBe('详情');
    });

    it('operation[function]', () => {
      const wrapper = mount(<NoticeBar visible content="测试" operation={() => '测试'} />);
      expect(wrapper.find('.t-notice-bar__operation').text()).toBe('测试');
    });

    it('operation[slot]', () => {
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          operation: <div class="slot-operation">测试</div>,
        },
      });
      expect(wrapper.find('.t-notice-bar__operation .slot-operation').exists()).toBe(true);
    });

    it('prefixIcon[boolean]', () => {
      // 默认 true：显示 theme(info) 对应图标
      const wrapper = mount(<NoticeBar visible content="测试" />);
      expect(wrapper.find('.t-notice-bar__prefix-icon .t-icon-info-circle-filled').exists()).toBe(true);

      // false：不渲染前缀图标容器
      const wrapper2 = mount(<NoticeBar visible content="测试" prefixIcon={false} />);
      expect(wrapper2.find('.t-notice-bar__prefix-icon').exists()).toBe(false);
    });

    it('prefixIcon[function]', () => {
      const wrapper = mount(<NoticeBar visible content="测试" prefixIcon={() => <TIconApp />} />);
      expect(wrapper.find('.t-notice-bar__prefix-icon .t-icon-app').exists()).toBe(true);
    });

    it('prefixIcon[slot]', () => {
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          prefixIcon: <div class="slot-prefix-icon">测试</div>,
        },
      });
      expect(wrapper.find('.t-notice-bar__prefix-icon .slot-prefix-icon').exists()).toBe(true);
    });

    it('suffixIcon[function]', () => {
      const wrapper = mount(<NoticeBar visible content="测试" suffixIcon={() => <TIconApp />} />);
      expect(wrapper.find('.t-notice-bar__suffix-icon .t-icon-app').exists()).toBe(true);

      // 默认不渲染后缀图标
      const wrapper2 = mount(<NoticeBar visible content="测试" />);
      expect(wrapper2.find('.t-notice-bar__suffix-icon').exists()).toBe(false);
    });

    it('suffixIcon[slot]', () => {
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          suffixIcon: <div class="slot-suffix-icon">测试</div>,
        },
      });
      expect(wrapper.find('.t-notice-bar__suffix-icon .slot-suffix-icon').exists()).toBe(true);
    });

    const themeIconMap = {
      info: 't-icon-info-circle-filled',
      success: 't-icon-check-circle-filled',
      warning: 't-icon-error-circle-filled',
      error: 't-icon-error-circle-filled',
    };
    it.each(Object.keys(themeIconMap) as Array<keyof typeof themeIconMap>)('theme[%s]', (theme) => {
      const wrapper = mount(<NoticeBar visible content="测试" theme={theme} />);
      expect(wrapper.find('.t-notice-bar').classes()).toContain(`t-notice-bar--${theme}`);
      expect(wrapper.find(`.t-notice-bar__prefix-icon .${themeIconMap[theme]}`).exists()).toBe(true);
    });

    it('visible[boolean]', async () => {
      const wrapper = mount(<NoticeBar visible={false} content="测试" />);
      expect(wrapper.find('.t-notice-bar').exists()).toBe(false);

      await wrapper.setProps({ visible: true });
      expect(wrapper.find('.t-notice-bar').exists()).toBe(true);
    });

    it('modelValue[boolean]', async () => {
      const visible = ref(false);
      const wrapper = mount({
        setup() {
          return () => <NoticeBar v-model={visible.value} content="测试" />;
        },
      });
      // 受控显示隐藏：初始隐藏
      expect(wrapper.find('.t-notice-bar').exists()).toBe(false);

      visible.value = true;
      await nextTick();
      expect(wrapper.find('.t-notice-bar').exists()).toBe(true);

      visible.value = false;
      await nextTick();
      expect(wrapper.find('.t-notice-bar').exists()).toBe(false);
    });

    it('defaultVisible[boolean]', () => {
      const wrapper = mount(<NoticeBar defaultVisible content="测试" />);
      expect(wrapper.find('.t-notice-bar').exists()).toBe(true);

      // 未传任何显示属性时默认隐藏
      const wrapper2 = mount(<NoticeBar content="测试" />);
      expect(wrapper2.find('.t-notice-bar').exists()).toBe(false);
    });
  });

  describe('events', () => {
    it('click', async () => {
      const fn = vi.fn();
      const wrapper = mount(
        <NoticeBar
          visible
          content="测试"
          prefixIcon={() => 'pre'}
          operation="操作"
          suffixIcon={() => 'suffix'}
          onClick={fn}
        />,
      );

      // 点击前缀图标
      await wrapper.find('.t-notice-bar__prefix-icon').trigger('click');
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenLastCalledWith('prefix-icon');

      // 点击内容
      await wrapper.find('.t-notice-bar__content').trigger('click');
      expect(fn).toHaveBeenLastCalledWith('content');

      // 点击右侧额外信息：stopPropagation，不冒泡触发 content
      await wrapper.find('.t-notice-bar__operation').trigger('click');
      expect(fn).toHaveBeenCalledTimes(3);
      expect(fn).toHaveBeenLastCalledWith('operation');

      // 点击后缀图标
      await wrapper.find('.t-notice-bar__suffix-icon').trigger('click');
      expect(fn).toHaveBeenCalledTimes(4);
      expect(fn).toHaveBeenLastCalledWith('suffix-icon');
    });

    it('change', async () => {
      const fn = vi.fn();
      const wrapper = mount(
        <NoticeBar visible direction="vertical" content={['君不见', '高堂明镜悲白发']} onChange={fn} />,
      );
      await nextTick();

      wrapper.findComponent(Swiper).vm.$emit('change', 1, { source: 'autoplay' });
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(1, { source: 'autoplay' });
    });
  });

  describe('scenarios', () => {
    describe('marquee', () => {
      it('recalculates duration after each round and stops when loop is exhausted', async () => {
        vi.useFakeTimers();
        mockContentRect();

        const wrapper = mount(<NoticeBar visible content="测试" marquee={{ speed: 100, loop: 2, delay: 0 }} />);
        await nextTick();
        await vi.advanceTimersByTimeAsync(0);
        // 第一轮：offset = -itemWidth，duration = itemWidth / speed = 3s
        expect(wrapper.find('.t-notice-bar__content').attributes('style')).toContain('transform: translateX(-300px)');
        expect(wrapper.find('.t-notice-bar__content').attributes('style')).toContain('transition-duration: 3s');

        // 第一轮结束：复位到容器右侧，duration 归零
        await wrapper.find('.t-notice-bar__content').trigger('transitionend');
        expect(wrapper.find('.t-notice-bar__content').attributes('style')).toContain('transform: translateX(100px)');
        expect(wrapper.find('.t-notice-bar__content').attributes('style')).toContain('transition-duration: 0s');

        // 下一轮：duration = (itemWidth + listWidth) / speed = 4s
        await vi.advanceTimersByTimeAsync(0);
        expect(wrapper.find('.t-notice-bar__content').attributes('style')).toContain('transform: translateX(-300px)');
        expect(wrapper.find('.t-notice-bar__content').attributes('style')).toContain('transition-duration: 4s');

        // 第二轮结束：loop 归零，停止滚动并恢复可换行
        await wrapper.find('.t-notice-bar__content').trigger('transitionend');
        expect(wrapper.find('.t-notice-bar__content').classes()).toContain('t-notice-bar__content-wrapable');
        expect(wrapper.find('.t-notice-bar__content').attributes('style')).toBeFalsy();
      });

      it('restarts scrolling after visible toggles from hidden to shown', async () => {
        vi.useFakeTimers();
        mockContentRect();

        const wrapper = mount(<NoticeBar visible={false} content="测试" marquee />);
        expect(wrapper.find('.t-notice-bar').exists()).toBe(false);

        await wrapper.setProps({ visible: true });
        await vi.advanceTimersByTimeAsync(0);
        const content = wrapper.find('.t-notice-bar__content');
        expect(content.classes()).not.toContain('t-notice-bar__content-wrapable');
        expect(content.attributes('style')).toContain('transform: translateX(-300px)');
      });
    });

    describe('vertical autoplay', () => {
      it('emits change on each interval and loops back to the first item', async () => {
        vi.useFakeTimers();
        const fn = vi.fn();
        const wrapper = mount(
          <NoticeBar visible direction="vertical" content={['君不见', '高堂明镜悲白发']} onChange={fn} />,
        );
        await nextTick();

        await vi.advanceTimersByTimeAsync(2000);
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenLastCalledWith(1, { source: 'autoplay' });

        await vi.advanceTimersByTimeAsync(2000);
        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn).toHaveBeenLastCalledWith(0, { source: 'autoplay' });
      });
    });

    describe('prop and slot priority', () => {
      it('keeps the prefix icon hidden when prefixIcon is false and a slot is provided', () => {
        const wrapper = mount(<NoticeBar visible prefixIcon={false} />, {
          slots: {
            prefixIcon: <div class="slot-node">来自插槽</div>,
          },
        });
        expect(wrapper.find('.t-notice-bar__prefix-icon').exists()).toBe(false);
        expect(wrapper.find('.slot-node').exists()).toBe(false);
      });
    });
  });
});
