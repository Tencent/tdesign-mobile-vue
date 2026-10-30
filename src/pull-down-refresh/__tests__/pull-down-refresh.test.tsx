import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { beforeAll, vi } from 'vitest';
import PullDownRefresh from '../index';
import { MockResizeObserver, trigger } from './utils';

describe('PullDownRefresh', () => {
  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver;
  });

  describe('props', () => {
    it('loadingBarHeight[number]', async () => {
      const wrapper = mount(<PullDownRefresh value={true} loadingBarHeight={30} />);
      const loadingBar = wrapper.find('.t-pull-down-refresh__loading');
      expect(window.getComputedStyle(loadingBar.element).getPropertyValue('max-height')).toBe(`${30}px`);

      await wrapper.setProps({ loadingBarHeight: '90px' });
      expect(window.getComputedStyle(loadingBar.element).getPropertyValue('max-height')).toBe(`${90}px`);
    });

    it('loadingTexts & maxBarHeight', async () => {
      const status = ref(false);
      const loadingTexts = ['pulling', 'loosing', 'loading', 'success'];
      const maxBarHeight = ref(80);
      const onChange = vi.fn((value) => {
        status.value = value;
      });
      const onRefresh = vi.fn(() => {
        setTimeout(() => {
          status.value = false;
        }, 2000);
      });

      const wrapper = mount(
        <PullDownRefresh
          value={status.value}
          loadingTexts={loadingTexts}
          maxBarHeight={maxBarHeight.value}
          onChange={onChange}
          onRefresh={onRefresh}
        />,
      );
      const track = wrapper.find('.t-pull-down-refresh__track');
      const maxBar = wrapper.find('.t-pull-down-refresh__tips');

      await nextTick();
      maxBar.trigger('resize', {
        height: 80,
      });

      trigger(track, 'touchstart', 50, 0);
      await wrapper.setProps({ maxBarHeight: '80px' });
      trigger(track, 'touchmove', 50, 20);
      trigger(track, 'touchmove', 50, 70);
      trigger(track, 'touchmove', 50, 120);
      trigger(track, 'touchmove', 50, 170);
      // expect(wrapper.vm.loadingText).toBe('loosing');
      expect(window.getComputedStyle(maxBar.element).height).toBe(`${80}px`);
      trigger(track, 'touchend', 50, 170);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('events', () => {
    it('transitionend', async () => {
      const wrapper = mount(<PullDownRefresh value={true} loadingBarHeight={30} maxBarHeight={80} />);

      const track = wrapper.find('.t-pull-down-refresh__track');
      track.trigger(`transitionend`);
    });

    it('timeout', async () => {
      const status = ref(false);
      const refreshTimeout = 500;
      const onChange = vi.fn((value) => {
        status.value = value;
      });
      const onRefresh = vi.fn(() => {
        setTimeout(() => {
          status.value = false;
        }, 800); // 大于设定值
      });
      const onTimeout = vi.fn();

      const wrapper = mount(() => (
        <PullDownRefresh
          value={status.value}
          refreshTimeout={refreshTimeout}
          onChange={onChange}
          onRefresh={onRefresh}
          onTimeout={onTimeout}
        />
      ));

      const target = wrapper.find('.t-pull-down-refresh__track');
      const maxBar = wrapper.find('.t-pull-down-refresh__tips');

      await nextTick();
      maxBar.trigger('resize', {
        height: 80,
      });

      trigger(target, 'touchstart', 50, 0);
      trigger(target, 'touchmove', 50, 20);
      trigger(target, 'touchmove', 50, 70);
      trigger(target, 'touchmove', 50, 120);
      trigger(target, 'touchmove', 50, 200);
      trigger(target, 'touchend', 50, 200);

      await new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 1000); // 超时 1000ms
      });

      // expect(wrapper.emitted()).toHaveProperty('update:value'); // useModel 受控模式

      expect(onChange).toHaveBeenCalled();
      expect(onRefresh).toHaveBeenCalled();
      expect(onTimeout).toHaveBeenCalled();

      wrapper.unmount();
    });

    it('disabled[boolean]', async () => {
      // 对照：相同手势未禁用时触发下拉刷新
      const refreshable = vi.fn();
      const wrapper = mount(<PullDownRefresh onRefresh={refreshable} />);
      const track = wrapper.find('.t-pull-down-refresh__track');
      const maxBar = wrapper.find('.t-pull-down-refresh__tips');
      await nextTick();
      maxBar.trigger('resize', { height: 80 });
      trigger(track, 'touchstart', 50, 0);
      trigger(track, 'touchmove', 50, 70);
      trigger(track, 'touchmove', 50, 200);
      trigger(track, 'touchend', 50, 200);
      await nextTick();
      expect(refreshable).toHaveBeenCalledTimes(1);

      // disabled 后相同手势不进入加载态，轨迹不位移
      const disabledRefresh = vi.fn();
      const disabledWrapper = mount(<PullDownRefresh disabled onRefresh={disabledRefresh} />);
      const disabledTrack = disabledWrapper.find('.t-pull-down-refresh__track');
      const disabledMaxBar = disabledWrapper.find('.t-pull-down-refresh__tips');
      await nextTick();
      disabledMaxBar.trigger('resize', { height: 80 });
      trigger(disabledTrack, 'touchstart', 50, 0);
      trigger(disabledTrack, 'touchmove', 50, 70);
      trigger(disabledTrack, 'touchmove', 50, 200);
      trigger(disabledTrack, 'touchend', 50, 200);
      await nextTick();
      expect(disabledRefresh).not.toHaveBeenCalled();
      expect(disabledTrack.attributes('style')).toContain('translate3d(0, 0px, 0)');

      wrapper.unmount();
      disabledWrapper.unmount();
    });

    it('loadingProps[object]', async () => {
      const wrapper = mount(<PullDownRefresh value loadingProps={{ class: 'custom-loading' }} />);
      const loadingBar = wrapper.find('.t-pull-down-refresh__loading');
      await nextTick();
      // 模拟 loading 元素高度，使组件进入 loading 状态渲染 Loading 组件
      loadingBar.trigger('resize', { height: 50 });
      await nextTick();
      const loading = wrapper.find('.t-pull-down-refresh__loading .t-loading');
      expect(loading.exists()).toBe(true);
      // loadingProps 透传至 Loading 组件
      expect(loading.classes()).toContain('custom-loading');
    });

    it('modelValue[boolean]', async () => {
      const status = ref(false);
      const onRefresh = vi.fn();
      const wrapper = mount({
        setup() {
          return () => <PullDownRefresh v-model:modelValue={status.value} onRefresh={onRefresh} />;
        },
      });
      const track = wrapper.find('.t-pull-down-refresh__track');
      const maxBar = wrapper.find('.t-pull-down-refresh__tips');
      await nextTick();
      maxBar.trigger('resize', { height: 80 });
      trigger(track, 'touchstart', 50, 0);
      trigger(track, 'touchmove', 50, 70);
      trigger(track, 'touchmove', 50, 200);
      trigger(track, 'touchend', 50, 200);
      await nextTick();
      // 松手进入加载态时通过 v-model:modelValue 更新为 true
      expect(status.value).toBe(true);
      expect(onRefresh).toHaveBeenCalledTimes(1);

      wrapper.unmount();
    });

    it('defaultValue[boolean]', async () => {
      // defaultValue 为 true：初始即加载态，触摸手势被禁止
      const loadingRefresh = vi.fn();
      const loadingWrapper = mount(<PullDownRefresh defaultValue onRefresh={loadingRefresh} />);
      const loadingTrack = loadingWrapper.find('.t-pull-down-refresh__track');
      const loadingMaxBar = loadingWrapper.find('.t-pull-down-refresh__tips');
      await nextTick();
      loadingMaxBar.trigger('resize', { height: 80 });
      trigger(loadingTrack, 'touchstart', 50, 0);
      trigger(loadingTrack, 'touchmove', 50, 200);
      trigger(loadingTrack, 'touchend', 50, 200);
      await nextTick();
      expect(loadingRefresh).not.toHaveBeenCalled();

      // defaultValue 为 false：非受控初始收起态，手势正常触发刷新
      const idleRefresh = vi.fn();
      const idleWrapper = mount(<PullDownRefresh defaultValue={false} onRefresh={idleRefresh} />);
      const idleTrack = idleWrapper.find('.t-pull-down-refresh__track');
      const idleMaxBar = idleWrapper.find('.t-pull-down-refresh__tips');
      await nextTick();
      idleMaxBar.trigger('resize', { height: 80 });
      trigger(idleTrack, 'touchstart', 50, 0);
      trigger(idleTrack, 'touchmove', 50, 200);
      trigger(idleTrack, 'touchend', 50, 200);
      await nextTick();
      expect(idleRefresh).toHaveBeenCalledTimes(1);

      loadingWrapper.unmount();
      idleWrapper.unmount();
    });
  });
});
