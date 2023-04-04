import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { ref, nextTick } from 'vue';
import Message from '../message.vue';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
const prefix = 't';
const name = `${prefix}-message`;
describe('Message.vue', () => {
  describe('event', () => {
    const offset = [-10, 20];
    it(': offset', () => {
      const wrapper = mount(<Message visible offset={offset} />);
      const $message = wrapper.find(`.${name}`);
      expect(
        $message.attributes('style').includes(`top: ${offset[0]}px; right: ${offset[1]}px; left: ${offset[1]}px`),
      ).toBeTruthy();
    });

    it(': align', () => {
      const wrapper = mount(<Message visible align="left" />);
      expect(wrapper.find(`.${name}-align--left`).exists()).toBeTruthy();
    });

    it(': marquee', async () => {
      const wrapper = mount(<Message visible />);
      expect(wrapper.vm.scroll.marquee).toBe(false);

      const wrapper1 = mount(<Message visible marquee />);
      expect(wrapper1.vm.scroll.marquee).toBe(false);

      const wrapper2 = mount(<Message visible marquee={true} />);
      await nextTick();
      expect(wrapper2.vm.scroll.marquee).toBe(true);

      const wrapper3 = mount(<Message visible marquee={{ loop: 1 }} />);
      await nextTick();
      expect(wrapper3.vm.scroll.marquee).toBe(true);
      wrapper3.vm.handleTransitionend();
      expect(wrapper3.vm.scroll.loop).toBe(0);
      wrapper3.vm.handleTransitionend();
      expect(wrapper3.vm.scroll.marquee).toBe(false);

      const wrapper4 = mount(<Message visible marquee={{ loop: -1 }} />);
      await nextTick();
      expect(wrapper4.vm.scroll.marquee).toBe(true);
      wrapper4.vm.handleTransitionend();
    });

    it(': closeBtn is a function', () => {
      const closeBtn = () => h(TIconApp);
      const wrapper = mount(<Message visible closeBtn={closeBtn} />);
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });
  });

  describe('event', () => {
    it('open', async () => {
      const fn = vi.fn();
      const visible = ref(false);
      const wrapper = mount(() => <Message v-model={visible.value} content="这是一条消息通知" onOpen={fn} />);
      visible.value = true;
      await nextTick();
      expect(fn).toBeCalledTimes(1);
      visible.value = false;
      await nextTick();
      expect(fn).toBeCalledTimes(1);
    });

    it('close', () => {
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Message visible={true} content="这是一条带关闭的消息通知，常驻可关闭" closeBtn={true} onClose={fn} />
      ));
      const closeBtn = wrapper.find('.t-icon-close');
      closeBtn.trigger('click');
      expect(fn).toBeCalledTimes(1);
    });

    it('after-enter-leave', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Message visible={true} onOpened={fn} onClosed={fn} />);
      expect(fn).not.toBeCalled();
      wrapper.findComponent(Message).vm.afterEnter();
      expect(fn).toBeCalledTimes(1);
      wrapper.findComponent(Message).vm.afterLeave();
      expect(fn).toBeCalledTimes(2);
    });
  });

  describe('slots', () => {
    it('icon', () => {
      const wrapper0 = mount(() => <Message visible={true} icon={false} content="这是一条消息通知" />);
      expect(wrapper0.find('.t-icon').exists()).toBeFalsy();

      const wrapper = mount(() => <Message visible={true} content="这是一条消息通知" theme={'success'} />);
      const successIcon = wrapper.find('.t-icon-check-circle-filled');
      expect(successIcon).toBeTruthy();
    });
  });
});
