import { nextTick } from 'vue';
import { expect, it, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import NoticeBar from '../notice-bar.vue';

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
      const prefix = 't-notice-bar';

      const wrapper = mount(<NoticeBar visible />);
      expect(wrapper.find('.t-notice-bar').classes().includes(`${prefix}--info`)).toBeTruthy();

      await wrapper.setProps({ theme: 'success' });
      expect(wrapper.find('.t-notice-bar').classes().includes(`${prefix}--success`)).toBeTruthy();

      await wrapper.setProps({ theme: 'warning' });
      expect(wrapper.find('.t-notice-bar').classes().includes(`${prefix}--warning`)).toBeTruthy();

      await wrapper.setProps({ theme: 'error' });
      expect(wrapper.find('.t-notice-bar').classes().includes(`${prefix}--error`)).toBeTruthy();

      await wrapper.setProps({ theme: '' });
      expect(wrapper.find('.t-notice-bar').classes().includes(`${prefix}--info`)).toBeFalsy();
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
      let triggerName = '';
      const fn = vi.fn((name) => {
        triggerName = name;
      });
      const wrapper = mount(
        <NoticeBar visible prefix-icon="pre" content="test" extra="extra" suffix-icon="suffix" onClick={fn} />,
      );
      await wrapper.find('.t-notice-bar__hd').trigger('click');
      expect(triggerName).toBe('prefix-icon');
      await wrapper.find('.t-notice-bar__text').trigger('click');
      expect(triggerName).toBe('content');
      await wrapper.find('.t-notice-bar__text-detail').trigger('click');
      expect(triggerName).toBe('extra');
      await wrapper.find('.t-notice-bar__ft').trigger('click');
      expect(triggerName).toBe('suffix-icon');
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

    it('transitionend', async () => {
      const wrapper = mount(<NoticeBar visible />);
      const $bar = wrapper.find('.t-notice-bar__item');
      expect($bar.exists()).toBe(true);
      $bar.trigger('transitionend');
    });
  });
});
