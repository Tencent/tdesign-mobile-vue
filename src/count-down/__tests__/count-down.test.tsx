import { nextTick } from 'vue';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CountDown from '../count-down';
import { sleep } from '../../shared/util';

describe('CountDown', () => {
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

    it('size[small/medium/large]', () => {
      (['small', 'medium', 'large'] as const).forEach((size) => {
        const wrapper = mount(CountDown, { props: { time: 100000, size } });
        expect(wrapper.classes()).toContain(`t-count-down--${size}`);
      });
    });

    it('splitWithUnit[boolean]', async () => {
      const wrapper = mount(<CountDown time={100000} splitWithUnit />);
      expect(wrapper.find('.t-count-down__split--text').exists()).toBeTruthy();
    });

    it('theme[default/round/square]', () => {
      (['default', 'round', 'square'] as const).forEach((theme) => {
        const wrapper = mount(CountDown, { props: { time: 100000, theme } });
        expect(wrapper.classes()).toContain(`t-count-down--${theme}`);
      });
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

  describe('scenarios', () => {
    it('compensates hidden duration after visibilitychange resumes', async () => {
      const wrapper = mount(<CountDown time={10000} />);
      // 先正常计时约 1 秒，剩余约 9 秒
      await sleep(1000);

      // 页面隐藏约 2 秒：jsdom 的 rAF 不随 document.hidden 暂停，期间计时仍继续
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
      // 等待 watch(visibility) 记录 hiddenTime
      await nextTick();
      await sleep(2000);

      // 恢复可见：补偿逻辑额外扣减隐藏期间时长（Date.now() - hiddenTime）
      Object.defineProperty(document, 'hidden', { configurable: true, value: false });
      document.dispatchEvent(new Event('visibilitychange'));
      await nextTick();
      await sleep(100);

      const remainSeconds = parseInt(wrapper.text().slice(-2), 10);
      // 未补偿时约剩 7 秒；补偿后约剩 5 秒，留出计时误差余量
      expect(remainSeconds).toBeGreaterThanOrEqual(2);
      expect(remainSeconds).toBeLessThanOrEqual(6);

      wrapper.unmount();
    });
  });
});
