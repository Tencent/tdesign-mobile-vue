import { nextTick } from 'vue';
import { expect, it, vi, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import NoticeBar from '../notice-bar';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';

describe('NoticeBar', async () => {
  describe('props', async () => {
    it('content', async () => {
      const wrapper = mount(<NoticeBar visible />);
      expect(wrapper).toBeTruthy();
      await wrapper.setProps({ content: '测试' });
      expect(wrapper.text()).toContain('测试');
    });

    it('operation', async () => {
      const wrapper = mount(<NoticeBar visible />);
      await wrapper.setProps({ operation: '测试' });
      expect(wrapper.text()).toContain('测试');
      expect(wrapper.find('.t-notice-bar__operation').exists()).toBe(true);
    });

    it('marquee', async () => {
      const wrapper0 = mount(<NoticeBar visible />);
      await nextTick();
      // expect(wrapper0.vm.scroll.marquee).toBe(false);

      const wrapper = mount(<NoticeBar visible marquee />);
      await nextTick();
      // expect(wrapper.vm.scroll.marquee).toBe(true);

      const params = { loop: -1 };
      const wrapper2 = mount(<NoticeBar visible marquee={params} />);
      await nextTick();
      // expect(wrapper2.vm.scroll.marquee).toBe(true);

      params.loop = 0;
      const wrapper3 = mount(<NoticeBar visible marquee={params} />);
      await nextTick();
      // expect(wrapper3.vm.scroll.marquee).toBe(false);

      params.loop = 3;
      const wrapper4 = mount(<NoticeBar visible marquee={params} />);
      await nextTick();
      await wrapper4.find('.t-notice-bar__content').trigger('transitionend');
      // expect(wrapper4.vm.scroll.loop).toBe(2);
      await wrapper4.find('.t-notice-bar__content').trigger('transitionend');
      // expect(wrapper4.vm.scroll.loop).toBe(1);
      await wrapper4.find('.t-notice-bar__content').trigger('transitionend');
      // expect(wrapper4.vm.scroll.loop).toBe(0);
    });

    it('prefixIcon', async () => {
      const icon = () => <TIconApp />;
      const wrapper = mount(<NoticeBar visible prefix-icon={icon} />);
      expect(wrapper.find('.t-icon-app').exists()).toBe(true);

      const wrapper2 = mount(<NoticeBar visible />);
      expect(wrapper2.find('.t-icon-info-circle-filled').exists()).toBe(true);

      const wrapper3 = mount(<NoticeBar visible prefix-icon={false} />);
      expect(wrapper3.find('.t-notice-bar__prefix-icon > .t-icon').exists()).toBe(false);
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
      expect(wrapper.find('.t-notice-bar').exists()).toBe(false);

      await wrapper.setProps({ visible: true });
      expect(wrapper.find('.t-notice-bar').exists()).toBe(true);
    });

    it('defaultVisible', async () => {
      const wrapper = mount(<NoticeBar defaultVisible />);
      expect(wrapper.find('.t-notice-bar').exists()).toBe(true);
    });

    it('direction', async () => {
      const content = ['君不见', '高堂明镜悲白发', '朝如青丝暮成雪', '人生得意须尽欢', '莫使金樽空对月'];
      const wrapper = mount(<NoticeBar visible marquee direction="vertical" content={content} />);
      await nextTick();
      expect(wrapper.find('.t-notice-bar__content--vertical').exists()).toBe(true);
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

    it('operation', async () => {
      const operation = <div>测试</div>;
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          operation,
        },
      });
      await nextTick();
      expect(wrapper.text()).toContain('测试');
    });

    it('prefixIcon', async () => {
      const prefixIcon = <div>测试</div>;
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          prefixIcon: prefixIcon,
        },
      });
      await nextTick();
      expect(wrapper.text()).toContain('测试');
    });

    it('suffixIcon', async () => {
      const suffixIcon = <div>测试</div>;
      const wrapper = mount(<NoticeBar visible />, {
        slots: {
          suffixIcon: suffixIcon,
        },
      });
      await nextTick();
      expect(wrapper.text()).toContain('测试');
    });
  });

  describe('events', async () => {
    it('click', async () => {
      let triggerName = '';
      const fn = vi.fn((name) => {
        triggerName = name;
      });
      const wrapper = mount(
        <NoticeBar
          visible
          prefix-icon="pre"
          content="test"
          extra="extra"
          suffix-icon="suffix"
          operation="operation"
          onClick={fn}
        />,
      );
      await wrapper.find('.t-notice-bar__prefix-icon').trigger('click');
      expect(triggerName).toBe('prefix-icon');
      await wrapper.find('.t-notice-bar__content').trigger('click');
      expect(triggerName).toBe('content');
      await wrapper.find('.t-notice-bar__operation').trigger('click');
      expect(triggerName).toBe('operation');
      await wrapper.find('.t-notice-bar__suffix-icon').trigger('click');
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

    it('operation', async () => {
      const temp = () => '测试';
      const wrapper = mount(<NoticeBar visible operation={temp} />);
      expect(wrapper.text()).toContain('测试');
    });
  });
});
