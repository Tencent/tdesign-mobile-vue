import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Popup from '../popup.vue';
import { ref } from 'vue';

describe('popup', () => {
  // test props api
  describe('props', () => {
    const onOpen = vi.fn();
    it(': visible	', async () => {
      const wrapper = mount(Popup, {
        props: {
          visible: false,
          onOpen: onOpen,
        },
      });

      expect(wrapper.find('.t-overlay').isVisible()).toBe(false);
      expect(wrapper.find('.t-overlay').attributes('style')).toContain('display: none');
      await wrapper.setProps({
        visible: true,
      });
      expect(wrapper.vm.currentVisible).toBe(true);
      expect(wrapper.find('.t-overlay').isVisible()).toBe(true);
      expect(onOpen).toBeCalledTimes(1);
    });

    it(': placement	', async () => {
      const wrapper = mount(Popup, {
        props: {
          placement: 'top',
        },
      });
      expect(wrapper.find('.t-popup--content').classes()).toContain(`t-popup--content-${wrapper.vm.placement}`);
      await wrapper.setProps({
        placement: 'center',
      });
      expect(wrapper.find('.t-popup--content').classes()).toContain(`t-popup--content-${wrapper.vm.placement}`);
    });

    it(': showOverlay	', async () => {
      const wrapper = mount(Popup, {
        props: {
          showOverlay: false,
        },
      });
      expect(wrapper.find('.t-overlay').classes('t-overlay--transparent')).toBe(true);
      await wrapper.setProps({
        showOverlay: true,
      });
      expect(wrapper.find('.t-overlay').classes('t-overlay--transparent')).toBe(false);
    });

    it(': zIndex', async () => {
      const wrapper = mount(Popup, {
        props: {
          zIndex: 15000,
        },
      });
      expect(wrapper.find('.t-popup').attributes('style')).toContain('z-index: 15000');
      await wrapper.setProps({
        zIndex: 17000,
      });
      expect(wrapper.find('.t-popup').attributes('style')).toContain('z-index: 17000');
    });

    it(': transitionName', async () => {
      const wrapper = mount(Popup, {
        props: {
          placement: 'top',
        },
      });
      expect(wrapper.vm.contentTransitionName).toBe(`slide-${wrapper.vm.placement}`);
      await wrapper.setProps({
        transitionName: 'slide-fade',
      });
      expect(wrapper.vm.contentTransitionName).toBe(wrapper.vm.transitionName);
    });

    it(': customStyle', async () => {
      const wrapper = mount(Popup, {
        props: {
          customStyle: 'font-size: 18px',
          zIndex: 17000,
        },
      });
      expect(wrapper.find('.t-popup').attributes('style')).toContain('font-size: 18px; z-index: 17000;');
    });
  });

  // test events
  describe('event', () => {
    it(': onVisibleChange', async () => {
      const onVisibleChange = vi.fn();
      const open = vi.fn();
      const opened = vi.fn();
      const close = vi.fn();
      const closed = vi.fn();
      const visible = ref(true);
      const wrapper = mount({
        render() {
          return (
            <Popup
              placement="bottom"
              transition-name="slide-fade"
              visible={visible.value}
              onVisibleChange={onVisibleChange}
              onOpen={open}
              onOpened={opened}
              onClose={close}
              onClosed={closed}
            />
          );
        },
      });

      const $popup = wrapper.find('.t-popup');
      const $overlay = wrapper.find('.t-overlay');

      await $overlay.trigger('click');

      expect(onVisibleChange).toBeCalledTimes(1);
      expect(close).toBeCalledTimes(1);

      const $transition = wrapper.findAllComponents({ name: 'transition' }); // => 通过 `name` 找到 transition
      expect($transition).toHaveLength(3);

      expect($transition.at(0).exists()).toBeTruthy();
      expect($transition.at(2).exists()).toBeTruthy();

      const event = {
        preventDefault: vi.fn(),
      };
      await $popup.trigger('touchmove', event);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);

      // 理论上点击遮罩层，可以触发 transition 的 after-leave 事件，但在测试环境中并没有触发。
      // 手动触发 afterLeave
      wrapper.findComponent(Popup).vm.afterLeave();
      expect(closed).toBeCalledTimes(1);
    });
  });
});
