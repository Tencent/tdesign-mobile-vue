import { nextTick } from 'vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CountDown from '../count-down';

// Mock getScreenFps to return immediately with a fixed FPS
vi.mock('../../shared/useCountDown/utils', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    getScreenFps: () => Promise.resolve(60),
  };
});

describe('countdown.vue', async () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('props', async () => {
    it('time', async () => {
      const wrapper = mount(<CountDown time={2000}></CountDown>);
      expect(wrapper.text()).toContain('00:00:02');
      // Advance time and verify countdown progresses
      await vi.advanceTimersByTimeAsync(1100);
      // After about 1 second, the display should have changed
      // Could be 00:00:01 or 00:00:00 depending on exact frame timing
      expect(wrapper.text()).toMatch(/00:00:0[01]/);
      // Advance enough to ensure countdown completes
      await vi.advanceTimersByTimeAsync(1100);
      expect(wrapper.text()).toContain('00:00:00');
    });

    it('content', async () => {
      const wrapper = mount(<CountDown time={1000} content="ok"></CountDown>);
      await vi.advanceTimersByTimeAsync(1500);
      await nextTick();
      expect(wrapper.text()).toContain('ok');

      await wrapper.setProps({ content: 'change' });
      expect(wrapper.text()).toContain('change');
    });

    it('format', async () => {
      const wrapper = mount(<CountDown time={100000} format="mm:ss"></CountDown>);
      expect(wrapper.text()).not.toContain('00:01:40');
      expect(wrapper.text()).toContain('01:40');

      const wrapper2 = mount(<CountDown time={100000} format="ss"></CountDown>);
      expect(wrapper2.text()).not.toContain(':40');
      expect(wrapper2.text()).toContain('40');

      const wrapper3 = mount(<CountDown time={100000} format="中文"></CountDown>);
      expect(wrapper3.find('.t-countdown---split-with-unit').exists()).toBe(false);

      const wrapper4 = mount(<CountDown></CountDown>);
      expect(wrapper4).toBeTruthy();
    });

    it('millisecond', async () => {
      const wrapper = mount(<CountDown time={100000} millisecond={true}></CountDown>);
      expect(wrapper.text()).toContain('00:01:40:000');
    });

    it('autoStart', async () => {
      const wrapper = mount(<CountDown time={100000} autoStart={false}></CountDown>);
      await vi.advanceTimersByTimeAsync(1000);
      expect(wrapper.text()).toContain('00:01:40');
    });

    it('size', async () => {
      const wrapper = mount(<CountDown time={100000}></CountDown>);
      expect(wrapper.find('.t-count-down--medium').exists()).toBe(true);
      const wrapper1 = mount(<CountDown time={100000} size=""></CountDown>);
      expect(wrapper1.find('.t-count-down').exists()).toBe(true);
    });

    it('theme', async () => {
      const wrapper = mount(<CountDown time={100000}></CountDown>);
      expect(wrapper.find('.t-count-down--default').exists()).toBe(true);
      const wrapper1 = mount(<CountDown time={100000} theme=""></CountDown>);
      expect(wrapper1.find('.t-count-down').exists()).toBe(true);
    });
  });

  describe('events', async () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<CountDown time={2000} onChange={onChange}></CountDown>);
      await vi.advanceTimersByTimeAsync(1000);
      expect(onChange).toHaveBeenCalled();
    });

    it('finish', async () => {
      const onFinish = vi.fn();
      const wrapper = mount(<CountDown time={1000} onFinish={onFinish}></CountDown>);
      await vi.advanceTimersByTimeAsync(1500);
      expect(onFinish).toHaveBeenCalled();
    });
  });

  describe('slots', async () => {
    it('content', async () => {
      const temp = <div>测试</div>;
      const wrapper = mount(<CountDown time={1000}></CountDown>, {
        slots: {
          content: temp,
        },
      });
      await vi.advanceTimersByTimeAsync(1500);
      expect(wrapper.text()).toContain('测试');
    });
  });
});
