import { nextTick, h } from 'vue';
import { expect, it, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import NoticeBar from '../notice-bar.vue';

const sleep = (delay) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, delay),
  );

describe('NoticeBar', async () => {
  describe('props', async () => {
    it('content', async () => {
      const wrapper = mount(<NoticeBar visible />);
      expect(wrapper).toBeTruthy();
      await wrapper.setProps({ content: '测试' });
      expect(wrapper.text()).toContain('测试');
    });

    it('extra', async () => {
      const wrapper = mount(<NoticeBar visible />);
      await wrapper.setProps({ extra: '测试' });
      expect(wrapper.text()).toContain('测试');
      expect(wrapper.find('.t-notice-bar__text-detail').exists()).toBe(true);
    });

    it('marquee', async () => {
      const wrapper0 = mount(<NoticeBar visible />);
      await nextTick();
      expect(wrapper0.vm.scroll.marquee).toBe(false);

      const wrapper = mount(<NoticeBar visible marquee />);
      await nextTick();
      expect(wrapper.vm.scroll.marquee).toBe(true);

      const params = { loop: -1 };
      const wrapper2 = mount(<NoticeBar visible marquee={params} />);
      await nextTick();
      expect(wrapper2.vm.scroll.marquee).toBe(true);

      params.loop = 0;
      const wrapper3 = mount(<NoticeBar visible marquee={params} />);
      await nextTick();
      expect(wrapper3.vm.scroll.marquee).toBe(false);
    });

    it('prefixIcon', async () => {
      const wrapper = mount(<NoticeBar visible prefix-icon="test" />);
      expect(wrapper.text()).toContain('test');

      const wrapper2 = mount(<NoticeBar visible />);
      expect(wrapper2.find('.t-icon-info-circle-filled').exists()).toBe(true);
    });

    it('theme', async () => {
      const wrapper = mount(<NoticeBar visible />);
      expect(wrapper.find('.t-notice-bar--info').exists()).toBe(true);

      const wrapper2 = mount(<NoticeBar visible theme="success" />);
      expect(wrapper2.find('.t-notice-bar--success').exists()).toBe(true);

      const wrapper3 = mount(<NoticeBar visible theme="warning" />);
      expect(wrapper3.find('.t-notice-bar--warning').exists()).toBe(true);

      const wrapper4 = mount(<NoticeBar visible theme="error" />);
      expect(wrapper4.find('.t-notice-bar--error').exists()).toBe(true);

      const wrapper5 = mount(<NoticeBar visible theme="" />);
      expect(wrapper5.find('.t-notice-bar--info').exists()).toBe(false);
    });

    it('visible', async () => {
      const wrapper = mount(<NoticeBar visible={false} />);
      expect(wrapper.find('.t-notice-bar__inner').exists()).toBe(false);

      await wrapper.setProps({ visible: true });
      expect(wrapper.find('.t-notice-bar__inner').exists()).toBe(true);
    });

    it('defaultVisible', async () => {
      const wrapper = mount(<NoticeBar defaultVisible />);
      expect(wrapper.find('.t-notice-bar__inner').exists()).toBe(true);
    });
  });

  describe('slot', async () => {
    it('content', async () => {
      const content = <div>测试</div>;
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          content,
        },
      });
      await nextTick();
      expect(wrapper.text()).toContain('测试');
    });

    it('extra', async () => {
      const extra = <div>测试</div>;
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          extra,
        },
      });
      await nextTick();
      expect(wrapper.text()).toContain('测试');
    });

    it('prefixIcon', async () => {
      const prefixIcon = <div>测试</div>;
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          'prefix-icon': prefixIcon,
        },
      });
      await nextTick();
      expect(wrapper.text()).toContain('测试');
    });

    it('suffixIcon', async () => {
      const suffixIcon = <div>测试</div>;
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          'suffix-icon': suffixIcon,
        },
      });
      await nextTick();
      expect(wrapper.text()).toContain('测试');
    });
  });

  describe('events', async () => {
    it('change', async () => {
      const fn = vi.fn();
      const wrapper = mount(<NoticeBar visible onChange={fn} />);
      await wrapper.setProps({ visible: false });
      expect(fn).toHaveBeenCalled();
    });

    it('click', async () => {
      const fn = vi.fn();
      const wrapper = mount(
        <NoticeBar visible prefix-icon="pre" content="test" extra="extra" suffix-icon="suffix" onClick={fn} />,
      );
      await wrapper.find('.t-notice-bar__hd').trigger('click');
      await wrapper.find('.t-notice-bar__text').trigger('click');
      await wrapper.find('.t-notice-bar__text-detail').trigger('click');
      await wrapper.find('.t-notice-bar__ft').trigger('click');
      expect(fn).toHaveBeenCalledTimes(4);
    });
  });

  describe('functions', async () => {
    it('content', async () => {
      const temp = () => '测试';
      const wrapper = mount(<NoticeBar visible content={temp} />);
      expect(wrapper.text()).toContain('测试');
    });

    it('extra', async () => {
      const temp = () => '测试';
      const wrapper = mount(<NoticeBar visible extra={temp} />);
      expect(wrapper.text()).toContain('测试');
    });
  });
});
