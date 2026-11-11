import { nextTick } from 'vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CountDown from '../count-down';

// 使用 fake timers 将 requestAnimationFrame 的节拍固定为 16ms/帧（62.5fps），保证倒计时推进可确定性断言
vi.mock('../../shared/useCountDown/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../shared/useCountDown/utils')>();
  return {
    ...actual,
    getScreenFps: () => 62.5,
  };
});

const sleep = (duration: number) => vi.advanceTimersByTimeAsync(duration);

describe('CountDown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('props', () => {
    it('autoStart[boolean]', async () => {
      const wrapper = mount(<CountDown time={100000} autoStart={false}></CountDown>);
      await sleep(1000);
      expect(wrapper.text()).toContain('00:01:40');
    });

    it('content[string]', async () => {
      const wrapper = mount(<CountDown time={1000} content="ok"></CountDown>);
      await sleep(1500);
      await nextTick();
      expect(wrapper.text()).toContain('ok');

      await wrapper.setProps({ content: 'change' });
      expect(wrapper.text()).toContain('change');
    });

    it('content[function]', async () => {
      const wrapper = mount(CountDown, { props: { time: 1000, content: () => <span>自定义结束内容</span> } });
      await sleep(1500);
      expect(wrapper.text()).toContain('自定义结束内容');
    });

    it('content[slot]', async () => {
      const temp = <div>测试</div>;
      const wrapper = mount(<CountDown time={1000}></CountDown>, {
        slots: {
          content: temp,
        },
      });
      await sleep(1500);
      expect(wrapper.text()).toContain('测试');
    });

    it('format[string]', async () => {
      const wrapper = mount(<CountDown time={100000} format="mm:ss"></CountDown>);
      expect(wrapper.text()).not.toContain('00:01:40');
      expect(wrapper.text()).toContain('01:40');

      const wrapper2 = mount(<CountDown time={100000} format="ss"></CountDown>);
      expect(wrapper2.text()).not.toContain(':40');
      expect(wrapper2.text()).toContain('40');

      const wrapper3 = mount(<CountDown time={100000} format="中文"></CountDown>);
      // format 不含时间占位符时不渲染任何时间项与分隔符
      expect(wrapper3.find('.t-count-down__item').exists()).toBe(false);
      expect(wrapper3.find('.t-count-down__split').exists()).toBe(false);
    });

    it('millisecond[boolean]', async () => {
      const wrapper = mount(<CountDown time={100000} millisecond={true}></CountDown>);
      expect(wrapper.text()).toContain('00:01:40:000');
    });

    it.each(['small', 'medium', 'large'] as const)('size[%s]', (size) => {
      const wrapper = mount(CountDown, { props: { time: 100000, size } });
      expect(wrapper.classes()).toContain(`t-count-down--${size}`);
    });

    it('splitWithUnit[boolean]', async () => {
      const wrapper = mount(<CountDown time={100000} splitWithUnit />);
      expect(wrapper.find('.t-count-down__split--text').exists()).toBeTruthy();
    });

    it.each(['default', 'round', 'square'] as const)('theme[%s]', (theme) => {
      const wrapper = mount(CountDown, { props: { time: 100000, theme } });
      expect(wrapper.classes()).toContain(`t-count-down--${theme}`);
    });

    it('time[number]', async () => {
      const wrapper = mount(<CountDown time={2000}></CountDown>);
      expect(wrapper.text()).toContain('00:00:02');
      await sleep(1000);
      expect(wrapper.text()).toContain('00:00:01');
      await sleep(500);
      expect(wrapper.text()).toContain('00:00:00');
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<CountDown time={2000} onChange={onChange}></CountDown>);
      await sleep(1500);
      expect(onChange).toHaveBeenCalled();
    });

    it('finish', async () => {
      const onFinish = vi.fn();
      const wrapper = mount(<CountDown time={1000} onFinish={onFinish}></CountDown>);
      await sleep(1500);
      expect(onFinish).toHaveBeenCalled();
    });
  });
});
