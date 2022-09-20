import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { ref, nextTick } from "vue";
import Message from '../message.vue';

describe('Message.vue', () => {
  describe('event', () => {
    it('open', async () => {
      const fn = vi.fn();
      const visible = ref(false);
      const wrapper = mount(() => (
        <Message v-model={visible.value} content="这是一条消息通知" onOpen={fn}/>
      ));
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
        <Message visible={true} content="这是一条带关闭的消息通知，常驻可关闭" closeBtn={true} onClose={fn}/>
      ));
      const closeBtn = wrapper.find('.t-icon-close');
      closeBtn.trigger('click');
      expect(fn).toBeCalledTimes(1);
    });

    it('after-enter-leave', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Message visible={true} onOpened={fn} onClosed={fn}/>
      ));
      expect(fn).not.toBeCalled();
      wrapper.findComponent(Message).vm.afterEnter();
      expect(fn).toBeCalledTimes(1);
      wrapper.findComponent(Message).vm.afterLeave();
      expect(fn).toBeCalledTimes(2);
    });
  })

  describe('slots', () => {
    it('icon:success', () => {
      const wrapper = mount(() => (
        <Message visible={true} content="这是一条消息通知" theme={'success'}/>
      ));
      const successIcon = wrapper.find('.t-icon-check-circle-filled');
      expect(successIcon).toBeTruthy();
    });
  })
});