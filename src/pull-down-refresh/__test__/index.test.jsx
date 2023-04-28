import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { beforeAll, vi } from 'vitest';
import PullDownRefresh from '../index';
import { MockResizeObserver, trigger } from './utils';

describe('PullDownRefresh', () => {
  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver;
  });

  describe(': props', () => {
    it(': loadingBarHeight', async () => {
      const wrapper = mount(<PullDownRefresh value={true} loadingBarHeight={30} />);
      const loadingBar = wrapper.find('.t-pull-down-refresh__loading');
      expect(window.getComputedStyle(loadingBar.element).height).toBe(`${30}px`);

      await wrapper.setProps({ loadingBarHeight: '90px' });
      expect(window.getComputedStyle(loadingBar.element).height).toBe(`${90}px`);
    });

    it(': others', async () => {
      const status = ref(false);
      const loadingProps = {
        theme: 'circular',
      };
      const loadingTexts = ['a', 'b', 'c', 'd'];
      const maxBarHeight = ref(80);
      const onChange = vi.fn((value) => {
        status.value = value;
      });
      const onRefresh = vi.fn(() => {
        status.value = true;
        setTimeout(() => {
          status.value = false;
        }, 2000);
      });

      const wrapper = mount(
        <PullDownRefresh
          value={status.value}
          loadingProps={loadingProps}
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
      await wrapper.setProps({ value: true, maxBarHeight: '80px' });
      trigger(track, 'touchmove', 50, 20);
      trigger(track, 'touchmove', 50, 70);
      trigger(track, 'touchmove', 50, 120);
      trigger(track, 'touchmove', 50, 170);
      expect(wrapper.vm.loadingText).toBe('b'); // loosing
      expect(window.getComputedStyle(maxBar.element).height).toBe(`${80}px`);
      trigger(track, 'touchend', 50, 170);
      expect(wrapper.element).toMatchSnapshot();

      await new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 350); // 大于 300ms
      });
    });
  });

  describe(': events', () => {
    it('functions and refreshTimeout', async () => {
      const status = ref(false);
      const refreshTimeout = 500;

      const onChange = vi.fn((value) => {
        status.value = value;
      });
      const onRefresh = vi.fn(() => {
        status.value = true;
        setTimeout(() => {
          status.value = false;
        }, 1000); // 大于设定值
      });
      const onTimeout = vi.fn();

      const wrapper = mount(
        <PullDownRefresh
          value={status.value}
          refreshTimeout={refreshTimeout}
          onChange={onChange}
          onRefresh={onRefresh}
          onTimeout={onTimeout}
        />,
      );

      const target = wrapper.find('.t-pull-down-refresh__track');
      const maxBar = wrapper.find('.t-pull-down-refresh__tips');

      await nextTick();
      maxBar.trigger('resize', {
        height: 80,
      });

      trigger(target, 'touchstart', 50, 0);
      await wrapper.setProps({ value: true });
      trigger(target, 'touchmove', 50, 20);
      trigger(target, 'touchmove', 50, 70);
      trigger(target, 'touchmove', 50, 120);
      trigger(target, 'touchmove', 50, 170);
      trigger(target, 'touchend', 50, 180);

      await new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 1000); // 超时 1000ms
      });

      expect(wrapper.emitted()).toHaveProperty('update:value'); // useModel 受控模式

      expect(onChange).toHaveBeenCalled();
      expect(onRefresh).toHaveBeenCalled();
      expect(onTimeout).toHaveBeenCalled();

      wrapper.unmount();
    });
  });
});
