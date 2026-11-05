import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeAll, vi } from 'vitest';
import PullDownRefresh from '../index';
import type { TdPullDownRefreshProps } from '../type';
import ConfigProvider from '../../config-provider';
import { MockResizeObserver } from './utils';
import { trigger } from '@/test/touch';

const TRACK = '.t-pull-down-refresh__track';
const TIPS = '.t-pull-down-refresh__tips';
const LOADING_BAR = '.t-pull-down-refresh__loading';
const TEXT = '.t-pull-down-refresh__text';
const LOADING_TEXT = '.t-pull-down-refresh__loading .t-loading__text';
const LOADING_ICON = '.t-pull-down-refresh__loading .t-loading';

// 自定义提示语，按状态索引断言：0 pulling / 1 loosing / 2 loading / 3 success
const LOADING_TEXTS = ['自定义下拉', '自定义松手', '自定义加载', '自定义完成'];

/**
 * 挂载组件并模拟 useElementSize 的量测结果：
 * maxBar(tips) 量测高度 80px、loadingBar 量测高度 50px（默认阈值 loadingBarHeight = 50）。
 * touchmove 阶段 distance = max(0, min(量测 maxBarHeight, easeDistance(diffY, 量测 loadingBarHeight)))。
 */
async function mountRefresh(props: Partial<TdPullDownRefreshProps> = {}) {
  const wrapper = mount(<PullDownRefresh loadingTexts={LOADING_TEXTS} {...props} />);
  await nextTick();
  await wrapper.find(TIPS).trigger('resize', { height: 80 });
  await wrapper.find(LOADING_BAR).trigger('resize', { height: 50 });
  return wrapper;
}

describe('PullDownRefresh', () => {
  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it('disabled[boolean]', async () => {
      // 对照：未禁用时相同手势可触发下拉刷新
      const refreshable = vi.fn();
      const wrapper = await mountRefresh({ onRefresh: refreshable });
      const track = wrapper.find(TRACK);
      await trigger(track, 'touchstart', 50, 0);
      await trigger(track, 'touchmove', 50, 70);
      await trigger(track, 'touchmove', 50, 200);
      await trigger(track, 'touchend', 50, 200);
      expect(refreshable).toHaveBeenCalledTimes(1);

      // 禁用后：手势不进入加载态，轨迹不位移
      const disabledRefresh = vi.fn();
      const disabledWrapper = await mountRefresh({ disabled: true, onRefresh: disabledRefresh });
      const disabledTrack = disabledWrapper.find(TRACK);
      await trigger(disabledTrack, 'touchstart', 50, 0);
      await trigger(disabledTrack, 'touchmove', 50, 70);
      await trigger(disabledTrack, 'touchmove', 50, 200);
      await trigger(disabledTrack, 'touchend', 50, 200);
      expect(disabledRefresh).not.toHaveBeenCalled();
      expect(disabledTrack.attributes('style')).toContain('translate3d(0, 0px, 0)');

      wrapper.unmount();
      disabledWrapper.unmount();
    });

    it('loadingBarHeight[number]', async () => {
      const wrapper = await mountRefresh({ loadingBarHeight: 100 });
      const loadingBar = wrapper.find(LOADING_BAR);
      // 数字按 px 处理：max-height 100px；(80 - 100) / 2 = -10px 偏移
      expect(loadingBar.attributes('style')).toContain('max-height: 100px');
      expect(loadingBar.attributes('style')).toContain('translateY(-10px)');

      // 阈值为 100：ease(70, 50) = 60 < 100，仍处于 pulling 态，文案取 loadingTexts[0]
      const track = wrapper.find(TRACK);
      await trigger(track, 'touchstart', 50, 0);
      await trigger(track, 'touchmove', 50, 70);
      expect(wrapper.find(TEXT).text()).toBe(LOADING_TEXTS[0]);

      wrapper.unmount();
    });

    it('loadingBarHeight[string]', async () => {
      const wrapper = await mountRefresh({ loadingBarHeight: '40px' });
      const loadingBar = wrapper.find(LOADING_BAR);
      expect(loadingBar.attributes('style')).toContain('max-height: 40px');
      expect(loadingBar.attributes('style')).toContain('translateY(20px)');

      const track = wrapper.find(TRACK);
      await trigger(track, 'touchstart', 50, 0);
      // 30 < 40：pulling 态
      await trigger(track, 'touchmove', 50, 30);
      expect(wrapper.find(TEXT).text()).toBe(LOADING_TEXTS[0]);
      // ease(70, 50) = 60 >= 40：loosing 态
      await trigger(track, 'touchmove', 50, 70);
      expect(wrapper.find(TEXT).text()).toBe(LOADING_TEXTS[1]);

      wrapper.unmount();
    });

    it('loadingProps[object]', async () => {
      const wrapper = await mountRefresh({ value: true, loadingProps: { layout: 'vertical' } });
      const loading = wrapper.find(LOADING_ICON);
      expect(loading.exists()).toBe(true);
      // loadingProps 透传至 Loading 组件
      expect(loading.classes()).toContain('t-loading--vertical');

      wrapper.unmount();
    });

    it('loadingTexts[array]', async () => {
      const loadingTexts = ['下拉-0', '松手-1', '加载-2', '完成-3'];
      const wrapper = await mountRefresh({ loadingTexts });
      const track = wrapper.find(TRACK);
      await trigger(track, 'touchstart', 50, 0);
      // 20 < 50：pulling 态取 loadingTexts[0]
      await trigger(track, 'touchmove', 50, 20);
      expect(wrapper.find(TEXT).text()).toBe(loadingTexts[0]);
      // ease(70, 50) = 60 >= 50：loosing 态取 loadingTexts[1]
      await trigger(track, 'touchmove', 50, 70);
      expect(wrapper.find(TEXT).text()).toBe(loadingTexts[1]);

      wrapper.unmount();
    });

    it('maxBarHeight[number]', async () => {
      const wrapper = mount(<PullDownRefresh maxBarHeight={120} />);
      const tips = wrapper.find(TIPS);
      await nextTick();
      // 数字按 px 处理：提示区高度 120px
      expect(tips.attributes('style')).toContain('height: 120px');

      // 量测 maxBarHeight = 120：ease(400, 50) = 150，位移被钳制在 120px
      await tips.trigger('resize', { height: 120 });
      await wrapper.find(LOADING_BAR).trigger('resize', { height: 50 });
      const track = wrapper.find(TRACK);
      await trigger(track, 'touchstart', 50, 0);
      await trigger(track, 'touchmove', 50, 400);
      expect(track.attributes('style')).toContain('translate3d(0, 120px, 0)');

      wrapper.unmount();
    });

    it('maxBarHeight[string]', async () => {
      const wrapper = mount(<PullDownRefresh maxBarHeight="160px" />);
      const tips = wrapper.find(TIPS);
      await nextTick();
      expect(tips.attributes('style')).toContain('height: 160px');

      // 量测 maxBarHeight = 160：ease(800, 50) = 250，位移被钳制在 160px
      await tips.trigger('resize', { height: 160 });
      await wrapper.find(LOADING_BAR).trigger('resize', { height: 50 });
      const track = wrapper.find(TRACK);
      await trigger(track, 'touchstart', 50, 0);
      await trigger(track, 'touchmove', 50, 800);
      expect(track.attributes('style')).toContain('translate3d(0, 160px, 0)');

      wrapper.unmount();
    });

    it('refreshTimeout[number]', async () => {
      vi.useFakeTimers();
      try {
        const onTimeout = vi.fn();
        const status = ref(false);
        // 受控模式：onChange 回写 status，加载态在超时窗口内保持
        const onChange = vi.fn((value: boolean) => {
          status.value = value;
        });
        const wrapper = mount(() => (
          <PullDownRefresh
            value={status.value}
            refreshTimeout={1000}
            onChange={onChange}
            onRefresh={() => {}}
            onTimeout={onTimeout}
          />
        ));

        const track = wrapper.find(TRACK);
        const tips = wrapper.find(TIPS);
        await nextTick();
        await tips.trigger('resize', { height: 80 });
        await wrapper.find(LOADING_BAR).trigger('resize', { height: 50 });

        // 下拉松手进入加载态
        await trigger(track, 'touchstart', 50, 0);
        await trigger(track, 'touchmove', 50, 70);
        await trigger(track, 'touchmove', 50, 200);
        await trigger(track, 'touchend', 50, 200);
        expect(onChange).toHaveBeenCalledWith(true);
        expect(onTimeout).not.toHaveBeenCalled();

        // 未超过 refreshTimeout：加载态保持
        vi.advanceTimersByTime(999);
        expect(onTimeout).not.toHaveBeenCalled();

        // 到达 refreshTimeout：触发 onTimeout，并复位加载状态（onChange(false)）
        vi.advanceTimersByTime(1);
        expect(onTimeout).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(false);

        wrapper.unmount();
      } finally {
        vi.useRealTimers();
      }
    });

    it('value[boolean]', async () => {
      const status = ref(true);
      const onRefresh = vi.fn();
      const wrapper = mount(() => (
        <PullDownRefresh value={status.value} loadingTexts={LOADING_TEXTS} onRefresh={onRefresh} />
      ));
      await nextTick();
      // 受控 true：量测 loadingBar 高度后进入 loading 态，渲染 Loading 组件与 loadingTexts[2]
      await wrapper.find(LOADING_BAR).trigger('resize', { height: 50 });
      expect(wrapper.find(LOADING_ICON).exists()).toBe(true);
      expect(wrapper.find(LOADING_TEXT).text()).toBe(LOADING_TEXTS[2]);

      // 加载中手势被禁止，不触发刷新
      const track = wrapper.find(TRACK);
      await trigger(track, 'touchstart', 50, 0);
      await trigger(track, 'touchmove', 50, 200);
      await trigger(track, 'touchend', 50, 200);
      expect(onRefresh).not.toHaveBeenCalled();

      // 父组件置回 false：收起加载态，文案取 loadingTexts[3]
      status.value = false;
      await nextTick();
      expect(wrapper.find(TEXT).text()).toBe(LOADING_TEXTS[3]);

      wrapper.unmount();
    });

    it('modelValue[boolean]', async () => {
      const status = ref(false);
      const onRefresh = vi.fn();
      const wrapper = mount({
        setup() {
          return () => <PullDownRefresh v-model:modelValue={status.value} onRefresh={onRefresh} />;
        },
      });
      const track = wrapper.find(TRACK);
      await nextTick();
      await wrapper.find(TIPS).trigger('resize', { height: 80 });
      await wrapper.find(LOADING_BAR).trigger('resize', { height: 50 });
      await trigger(track, 'touchstart', 50, 0);
      await trigger(track, 'touchmove', 50, 70);
      await trigger(track, 'touchmove', 50, 200);
      await trigger(track, 'touchend', 50, 200);
      // 松手进入加载态时通过 v-model:modelValue 更新为 true
      expect(status.value).toBe(true);
      expect(onRefresh).toHaveBeenCalledTimes(1);

      wrapper.unmount();
    });

    it('defaultValue[boolean]', async () => {
      // defaultValue 为 true：初始即加载态，触摸手势被禁止
      const loadingRefresh = vi.fn();
      const loadingWrapper = await mountRefresh({ defaultValue: true, onRefresh: loadingRefresh });
      const loadingTrack = loadingWrapper.find(TRACK);
      expect(loadingWrapper.find(LOADING_ICON).exists()).toBe(true);
      await trigger(loadingTrack, 'touchstart', 50, 0);
      await trigger(loadingTrack, 'touchmove', 50, 200);
      await trigger(loadingTrack, 'touchend', 50, 200);
      expect(loadingRefresh).not.toHaveBeenCalled();

      // defaultValue 为 false：非受控初始收起态，手势正常触发刷新
      const idleRefresh = vi.fn();
      const idleWrapper = await mountRefresh({ defaultValue: false, onRefresh: idleRefresh });
      const idleTrack = idleWrapper.find(TRACK);
      await trigger(idleTrack, 'touchstart', 50, 0);
      await trigger(idleTrack, 'touchmove', 50, 200);
      await trigger(idleTrack, 'touchend', 50, 200);
      expect(idleRefresh).toHaveBeenCalledTimes(1);

      loadingWrapper.unmount();
      idleWrapper.unmount();
    });

    it('default[slot]', () => {
      const wrapper = mount(PullDownRefresh, {
        slots: { default: () => <div class="slot-default">列表内容</div> },
      });
      const slot = wrapper.find('.slot-default');
      expect(slot.exists()).toBe(true);
      expect(slot.text()).toBe('列表内容');
      // 插槽内容渲染在 track 内部
      expect(wrapper.find(TRACK).find('.slot-default').exists()).toBe(true);

      wrapper.unmount();
    });

    it('content[slot]', () => {
      const wrapper = mount(PullDownRefresh, {
        slots: { content: () => <div class="slot-content">内容插槽</div> },
      });
      const slot = wrapper.find('.slot-content');
      expect(slot.exists()).toBe(true);
      expect(slot.text()).toBe('内容插槽');

      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('change', async () => {
      vi.useFakeTimers();
      try {
        const onChange = vi.fn();
        const wrapper = await mountRefresh({ refreshTimeout: 1000, onChange });
        const track = wrapper.find(TRACK);
        await trigger(track, 'touchstart', 50, 0);
        await trigger(track, 'touchmove', 50, 70);
        await trigger(track, 'touchend', 50, 70);
        // 松手进入加载态：change(true)
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenNthCalledWith(1, true);

        // 刷新超时自动收起：change(false)
        vi.advanceTimersByTime(1000);
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenNthCalledWith(2, false);

        wrapper.unmount();
      } finally {
        vi.useRealTimers();
      }
    });

    it('refresh', async () => {
      const onRefresh = vi.fn();
      const wrapper = await mountRefresh({ onRefresh });
      const track = wrapper.find(TRACK);

      // 未超过下拉阈值松手：不触发 refresh，轨迹复位
      await trigger(track, 'touchstart', 50, 0);
      await trigger(track, 'touchmove', 50, 20);
      await trigger(track, 'touchend', 50, 20);
      expect(onRefresh).not.toHaveBeenCalled();
      expect(track.attributes('style')).toContain('translate3d(0, 0px, 0)');

      // 超过阈值松手：触发一次 refresh
      await trigger(track, 'touchstart', 50, 0);
      await trigger(track, 'touchmove', 50, 70);
      await trigger(track, 'touchend', 50, 70);
      expect(onRefresh).toHaveBeenCalledTimes(1);

      wrapper.unmount();
    });

    it('scrolltolower', async () => {
      vi.useFakeTimers();
      try {
        const onScrolltolower = vi.fn();
        const wrapper = mount(<PullDownRefresh onScrolltolower={onScrolltolower} />);
        await nextTick();
        // jsdom 无滚动父元素时监听 window，且页面默认视为已触底
        window.dispatchEvent(new Event('scroll'));
        window.dispatchEvent(new Event('scroll'));
        // throttle 300ms（leading: false）：窗口内合并为一次 trailing 调用
        vi.advanceTimersByTime(299);
        expect(onScrolltolower).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);
        expect(onScrolltolower).toHaveBeenCalledTimes(1);

        // 卸载后移除监听，不再触发
        wrapper.unmount();
        window.dispatchEvent(new Event('scroll'));
        vi.advanceTimersByTime(300);
        expect(onScrolltolower).toHaveBeenCalledTimes(1);

        // 加载态时不触发
        const loadingScrolltolower = vi.fn();
        const loadingWrapper = mount(<PullDownRefresh value onScrolltolower={loadingScrolltolower} />);
        await nextTick();
        window.dispatchEvent(new Event('scroll'));
        vi.advanceTimersByTime(300);
        expect(loadingScrolltolower).not.toHaveBeenCalled();

        loadingWrapper.unmount();
      } finally {
        vi.useRealTimers();
      }
    });

    it('timeout', async () => {
      vi.useFakeTimers();
      try {
        const onTimeout = vi.fn();
        const wrapper = await mountRefresh({ refreshTimeout: 500, onTimeout });
        const track = wrapper.find(TRACK);
        await trigger(track, 'touchstart', 50, 0);
        await trigger(track, 'touchmove', 50, 70);
        await trigger(track, 'touchend', 50, 70);

        // 未到 refreshTimeout 不触发
        vi.advanceTimersByTime(499);
        expect(onTimeout).not.toHaveBeenCalled();

        // 到达后触发一次，并自动收起进入 success 态（loadingTexts[3]）
        vi.advanceTimersByTime(1);
        expect(onTimeout).toHaveBeenCalledTimes(1);
        await nextTick();
        expect(wrapper.find(TEXT).text()).toBe(LOADING_TEXTS[3]);

        wrapper.unmount();
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe('globalConfig', () => {
    it('pullDownRefresh', async () => {
      vi.useFakeTimers();
      try {
        // 不传 loadingTexts prop：提示语来自全局配置
        const wrapper = mount(
          <ConfigProvider globalConfig={{ pullDownRefresh: { loadingTexts: LOADING_TEXTS } }}>
            <PullDownRefresh refreshTimeout={1000} />
          </ConfigProvider>,
        );
        await nextTick();
        await wrapper.find(TIPS).trigger('resize', { height: 80 });
        await wrapper.find(LOADING_BAR).trigger('resize', { height: 50 });
        const track = wrapper.find(TRACK);

        await trigger(track, 'touchstart', 50, 0);
        await trigger(track, 'touchmove', 50, 20);
        expect(wrapper.find(TEXT).text()).toBe(LOADING_TEXTS[0]);
        await trigger(track, 'touchmove', 50, 70);
        expect(wrapper.find(TEXT).text()).toBe(LOADING_TEXTS[1]);
        await trigger(track, 'touchend', 50, 70);
        expect(wrapper.find(LOADING_TEXT).text()).toBe(LOADING_TEXTS[2]);

        wrapper.unmount();
      } finally {
        vi.useRealTimers();
      }
    });
  });
});
