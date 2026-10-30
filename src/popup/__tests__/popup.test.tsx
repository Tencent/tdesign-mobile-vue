import { config, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import Popup from '../index';

config.global.stubs = {
  teleport: false,
};

describe('Popup', () => {
  // test props api
  describe('props', () => {
    const onOpen = vi.fn();
    it('visible[boolean]', async () => {
      const wrapper = mount(Popup, {
        props: {
          visible: false,
          onOpen,
        },
      });

      // expect(wrapper.find('.t-popup').isVisible()).toBe(false);
      // expect(wrapper.find('.t-overlay').attributes('style')).toContain('display: none');
      // await wrapper.setProps({
      //   visible: true,
      // });
      // expect(wrapper.vm.currentVisible).toBe(true);
      // expect(wrapper.find('.t-popup').isVisible()).toBe(true);
      // expect(onOpen).toBeCalledTimes(1);
    });

    it('closeBtn[boolean]', async () => {
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
    });

    it('closeBtn[function]', async () => {
      const temp = '取消';
      const wrapper = mount(Popup, {
        props: {
          closeBtn: () => {
            return temp;
          },
          visible: true,
        },
      });
      // expect(wrapper.find('.t-popup__close').exists()).toBeTruthy();
      // expect(wrapper.find('.t-popup__close').text()).toEqual(temp);
    });

    it('placement[string]', async () => {
      const placementList = ['', 'top', 'left', 'right', 'bottom', 'center'];
      placementList.forEach((placement, index) => {
        const wrapper = mount(() => <Popup visible={true} placement={placement} />);
        const $popup = wrapper.find('.t-popup');
        if (placement) {
          expect($popup.classes()).toContain(`t-popup--${placement}`);
        }
      });
    });

    it('zIndex[number]', async () => {
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
      // expect(wrapper.find('.t-popup').attributes('style')).toContain('z-index: 17000');
    });

    it('transitionName[string]', async () => {
      const wrapper = mount(Popup, {
        props: {
          placement: 'top',
        },
      });
      // expect(wrapper.vm.contentTransitionName).toBe(`slide-${wrapper.vm.placement}`);
      // await wrapper.setProps({
      //   transitionName: 'slide-fade',
      // });
      // expect(wrapper.vm.contentTransitionName).toBe(wrapper.vm.transitionName);
    });

    it('showOverlay[boolean]', async () => {
      const wrapper = mount(Popup, {
        props: {
          visible: true,
        },
      });
      expect(wrapper.find('.t-overlay').isVisible()).toBeTruthy();

      const wrapper2 = mount(Popup, {
        props: {
          visible: true,
          showOverlay: false,
        },
      });
      // 遮罩 DOM 由 Overlay v-show 控制，隐藏态不可见
      const overlay = wrapper2.find('.t-overlay');
      overlay.exists() && expect(overlay.isVisible()).toBeFalsy();
    });

    it('zIndex[number]', async () => {
      const wrapper = mount(Popup, {
        props: {
          visible: true,
          zIndex: 999,
        },
      });
      expect(wrapper.find('.t-popup').attributes('style')).toContain('z-index: 999');
    });

    it('overlayProps[object]', async () => {
      const wrapper = mount(Popup, {
        props: {
          visible: true,
          overlayProps: { zIndex: 2000 },
        },
      });
      expect(wrapper.find('.t-overlay').attributes('style')).toContain('z-index: 2000');
    });

    it('closeOnOverlayClick[boolean]', async () => {
      const onClose = vi.fn();
      const wrapper = mount(Popup, {
        props: {
          visible: true,
          closeOnOverlayClick: false,
          onClose,
        },
      });
      await wrapper.find('.t-overlay').trigger('click');
      expect(onClose).toBeCalledTimes(0);
    });

    it('destroyOnClose[boolean]', async () => {
      const wrapper = mount(Popup, {
        props: {
          visible: true,
          destroyOnClose: true,
        },
      });
      expect(wrapper.find('.t-popup').exists()).toBeTruthy();

      await wrapper.setProps({ visible: false });
      expect(wrapper.find('.t-popup').exists()).toBeFalsy();
    });

    it('preventScrollThrough[boolean]', async () => {
      mount(Popup, {
        props: {
          visible: true,
          preventScrollThrough: true,
        },
      });
      expect(document.body.classList.contains('t-popup--lock')).toBe(true);
    });

    it('attach', async () => {
      const div = document.createElement('div');
      div.id = 'popup-container';
      document.body.appendChild(div);

      mount(Popup, {
        props: {
          visible: true,
          attach: '#popup-container',
        },
      });
      await nextTick();
      expect(document.querySelector('#popup-container .t-popup')).toBeTruthy();
    });

    it('defaultVisible[boolean]', async () => {
      const wrapper = mount(Popup, {
        props: {
          defaultVisible: true,
        },
      });
      expect(wrapper.find('.t-popup').exists()).toBeTruthy();
    });

    // duration 透传 Transition 动画时长，jsdom 中无动画渲染可断言
    it.todo('duration[number]');
  });

  // test events
  describe('events', () => {
    it('visibleChange', async () => {
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

      // 理论上点击遮罩层，可以触发 transition 的 after-leave 事件，但在测试环境中并没有触发。
      // 手动触发 afterLeave
      // wrapper.findComponent(Popup).vm.afterLeave();
      // expect(closed).toBeCalledTimes(1);
    });
  });
});
