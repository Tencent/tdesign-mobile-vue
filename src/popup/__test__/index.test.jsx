import { config, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Popup from '../popup.vue';
import { ref } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';

config.global.stubs = {
  teleport: true,
};

describe('popup', () => {
  // test props api
  describe('props', () => {
    const onOpen = vi.fn();
    it(':visible', async () => {
      const wrapper = mount(Popup, {
        props: {
          visible: false,
          onOpen: onOpen,
        },
      });

      expect(wrapper.find('.t-popup').isVisible()).toBe(false);
      expect(wrapper.find('.t-overlay').attributes('style')).toContain('display: none');
      await wrapper.setProps({
        visible: true,
      });
      expect(wrapper.vm.currentVisible).toBe(true);
      expect(wrapper.find('.t-popup').isVisible()).toBe(true);
      expect(onOpen).toBeCalledTimes(1);
    });

    it(':closeBtn', async () => {
      const icon = () => <CloseIcon />;
      const wrapper = mount(Popup, {
        props: {
          closeBtn: true,
          visible: true,
        },
      });
      expect(wrapper.find('.t-popup__close').exists()).toBeTruthy();
      // closeBtn = true, 使用默认 CloseIcon
      expect(wrapper.findComponent(CloseIcon).exists()).toBeTruthy();

      await wrapper.setProps({
        closeBtn: false,
      });
      expect(wrapper.find('.t-popup__close').exists()).toBeFalsy();

      const temp = '取消';
      await wrapper.setProps({
        closeBtn: () => {
          return temp;
        },
      });
      expect(wrapper.find('.t-popup__close').exists()).toBeTruthy();
      expect(wrapper.find('.t-popup__close').text()).toEqual(temp);
    });

    it(':placement', async () => {
      const placementList = ['', 'top', 'left', 'right', 'bottom', 'center'];
      placementList.forEach((placement, index) => {
        const wrapper = mount(() => <Popup visible={true} placement={placement} />);
        const $popup = wrapper.find('.t-popup');
        if (placement) {
          expect($popup.classes()).toContain(`t-popup--${placement}`);
        }
      });
    });

    it(':zIndex', async () => {
      const wrapper = mount(Popup, {
        props: {
          zIndex: 15000,
          visible: true,
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
              closeBtn={true}
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
      const $closeBtn = wrapper.find('.t-popup__close');

      await $overlay.trigger('click');

      expect(onVisibleChange).toBeCalledTimes(1);
      expect(close).toBeCalledTimes(1);

      await $closeBtn.trigger('click');
      expect(onVisibleChange).toBeCalledTimes(2);
      expect(close).toBeCalledTimes(2);

      const $transition = wrapper.findAllComponents({ name: 'transition' }); // => 通过 `name` 找到 transition
      expect($transition).toHaveLength(2);

      expect($transition.at(0).exists()).toBeTruthy();
      expect($transition.at(1).exists()).toBeTruthy();

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
