import { DOMWrapper, enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import Popup from '../index';
import type { TdPopupProps } from '../type';
import { createAttachContainer } from '@/test/attach';
import { finishTransitions } from '@/test/flush';

const mountPopup = async (props: TdPopupProps = {}, slots = {}) => {
  const container = createAttachContainer();
  const wrapper = mount(Popup, {
    props: { ...props, attach: () => container },
    slots,
    global: { stubs: { teleport: false, transition: false } },
  });
  await nextTick();
  return { wrapper, content: new DOMWrapper(container) };
};

beforeEach(() => {
  vi.useFakeTimers();
});
enableAutoUnmount(afterEach);
afterEach(async () => {
  await finishTransitions();
  document.body.innerHTML = '';
  vi.useRealTimers();
});

describe('Popup', () => {
  describe('props', () => {
    it('attach[string]', async () => {
      const container = createAttachContainer('popup-container');
      mount(Popup, { props: { visible: true, attach: '#popup-container' } });
      await nextTick();
      expect(container.querySelector('.t-popup')).not.toBeNull();
    });

    it('attach[function]', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const attach = vi.fn(() => container);
      mount(Popup, { props: { visible: true, attach } });
      await nextTick();
      expect(attach).toHaveBeenCalled();
      expect(container.querySelector('.t-popup')).not.toBeNull();
    });

    it('closeBtn[boolean]', async () => {
      const { wrapper, content } = await mountPopup({ closeBtn: true, visible: true });
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(true);
      await wrapper.setProps({ closeBtn: false });
      expect(content.find('.t-popup__close').exists()).toBe(false);
    });

    it('closeBtn[function]', async () => {
      const { content } = await mountPopup({ visible: true, closeBtn: () => <span>取消</span> });
      expect(content.get('.t-popup__close').text()).toBe('取消');
    });

    it('closeBtn[slot]', async () => {
      const { content } = await mountPopup({ visible: true }, { closeBtn: () => <span>插槽关闭按钮</span> });
      expect(content.get('.t-popup__close').text()).toBe('插槽关闭按钮');
    });

    it('closeOnOverlayClick[boolean]', async () => {
      const onClose = vi.fn();
      const { wrapper, content } = await mountPopup({ visible: true, closeOnOverlayClick: false, onClose });
      await content.get('.t-overlay').trigger('click');
      expect(onClose).not.toHaveBeenCalled();
      await wrapper.setProps({ closeOnOverlayClick: true });
      await content.get('.t-overlay').trigger('click');
      expect(onClose).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent) });
    });

    it('destroyOnClose[boolean]', async () => {
      const { content } = await mountPopup({ defaultVisible: true, destroyOnClose: true });
      expect(content.find('.t-popup').exists()).toBe(true);
      await content.get('.t-overlay').trigger('click');
      await finishTransitions();
      expect(content.find('.t-popup').exists()).toBe(false);

      const { content: retained } = await mountPopup({ defaultVisible: true, destroyOnClose: false });
      await retained.get('.t-overlay').trigger('click');
      await finishTransitions();
      expect(retained.find('.t-popup').exists()).toBe(true);
      expect(retained.get('.t-popup').isVisible()).toBe(false);
    });

    it('duration[number]', async () => {
      const onOpened = vi.fn();
      const { wrapper } = await mountPopup({ visible: false, duration: 500, onOpened });
      await wrapper.setProps({ visible: true });
      await vi.advanceTimersByTimeAsync(400);
      expect(onOpened).not.toHaveBeenCalled();
      await finishTransitions();
      expect(onOpened).toHaveBeenCalledTimes(1);
    });

    it('overlayProps[object]', async () => {
      const { content } = await mountPopup({ visible: true, overlayProps: { zIndex: 2000 } });
      expect(content.get('.t-overlay').attributes('style')).toContain('z-index: 2000');
    });

    it.each(['top', 'left', 'right', 'bottom', 'center'] as TdPopupProps['placement'][])(
      'placement[%s]',
      async (placement) => {
        const { content } = await mountPopup({ visible: true, placement });
        expect(content.get('.t-popup').classes()).toContain(`t-popup--${placement}`);
      },
    );

    it('preventScrollThrough[boolean]', async () => {
      const { wrapper } = await mountPopup({ visible: true, preventScrollThrough: true });
      expect(document.body.classList.contains('t-popup--lock')).toBe(true);
      await wrapper.setProps({ preventScrollThrough: false });
      expect(document.body.classList.contains('t-popup--lock')).toBe(false);
    });

    it('showOverlay[boolean]', async () => {
      const { wrapper, content } = await mountPopup({ visible: true });
      expect(content.get('.t-overlay').isVisible()).toBe(true);
      await wrapper.setProps({ showOverlay: false });
      await finishTransitions();
      expect(content.get('.t-overlay').isVisible()).toBe(false);
    });

    it('transitionName[string]', async () => {
      const { wrapper, content } = await mountPopup({ visible: false, transitionName: 'custom-popup' });
      await wrapper.setProps({ visible: true });
      expect(content.get('.t-popup').classes()).toContain('custom-popup-enter-active');
      await finishTransitions();
      expect(content.get('.t-popup').classes()).not.toContain('custom-popup-enter-active');
    });

    it('visible[boolean]', async () => {
      const { wrapper, content } = await mountPopup({ visible: false });
      expect(content.get('.t-popup').isVisible()).toBe(false);
      await wrapper.setProps({ visible: true });
      await finishTransitions();
      expect(content.get('.t-popup').isVisible()).toBe(true);
      await wrapper.setProps({ visible: false });
      await finishTransitions();
      expect(content.get('.t-popup').isVisible()).toBe(false);
    });

    it('modelValue[boolean]', async () => {
      const { wrapper, content } = await mountPopup({ modelValue: false, closeBtn: true });
      expect(content.get('.t-popup').isVisible()).toBe(false);
      await wrapper.setProps({ modelValue: true });
      await finishTransitions();
      expect(content.get('.t-popup').isVisible()).toBe(true);
      await content.get('.t-popup__close').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toEqual([[false, 'close-btn']]);
      await wrapper.setProps({ modelValue: false });
      await finishTransitions();
      expect(content.get('.t-popup').isVisible()).toBe(false);
    });

    it('defaultVisible[boolean]', async () => {
      const { content } = await mountPopup({ defaultVisible: true, closeBtn: true });
      expect(content.get('.t-popup').isVisible()).toBe(true);
      await content.get('.t-popup__close').trigger('click');
      await finishTransitions();
      expect(content.get('.t-popup').isVisible()).toBe(false);
    });

    it('zIndex[number]', async () => {
      const { wrapper, content } = await mountPopup({ zIndex: 15000, visible: true });
      expect(content.get('.t-popup').attributes('style')).toContain('z-index: 15000');
      await wrapper.setProps({ zIndex: 17000 });
      expect(content.get('.t-popup').attributes('style')).toContain('z-index: 17000');
    });

    it('default[slot]', async () => {
      const { content } = await mountPopup({ visible: true }, { default: () => <span>弹出层内容</span> });
      expect(content.get('.t-popup').text()).toBe('弹出层内容');
    });

    it('content[slot]', async () => {
      const { content } = await mountPopup({ visible: true }, { content: () => <span>具名内容</span> });
      expect(content.get('.t-popup').text()).toBe('具名内容');
    });
  });

  describe('events', () => {
    it('visibleChange', async () => {
      const onVisibleChange = vi.fn();
      const { wrapper, content } = await mountPopup({ visible: false, closeBtn: true, onVisibleChange });
      await wrapper.setProps({ visible: true });
      await finishTransitions();
      expect(onVisibleChange).toHaveBeenCalledExactlyOnceWith(true, 'document');
      await content.get('.t-overlay').trigger('click');
      expect(onVisibleChange).toHaveBeenNthCalledWith(2, false, 'overlay');
      await content.get('.t-popup__close').trigger('click');
      expect(onVisibleChange).toHaveBeenNthCalledWith(3, false, 'close-btn');
      expect(onVisibleChange).toHaveBeenCalledTimes(3);
    });

    it('close', async () => {
      const onClose = vi.fn();
      const { content } = await mountPopup({ visible: true, closeBtn: true, onClose });
      await content.get('.t-overlay').trigger('click');
      expect(onClose).toHaveBeenNthCalledWith(1, { e: expect.any(MouseEvent) });
      await content.get('.t-popup__close').trigger('click');
      expect(onClose).toHaveBeenNthCalledWith(2, { e: expect.any(MouseEvent) });
      expect(onClose).toHaveBeenCalledTimes(2);
    });

    it('open', async () => {
      const onOpen = vi.fn();
      const { wrapper } = await mountPopup({ visible: false, onOpen });
      expect(onOpen).not.toHaveBeenCalled();
      await wrapper.setProps({ visible: true });
      expect(onOpen).toHaveBeenCalledExactlyOnceWith();
    });

    it('opened', async () => {
      const onOpened = vi.fn();
      const { wrapper } = await mountPopup({ visible: false, onOpened });
      await wrapper.setProps({ visible: true });
      expect(onOpened).not.toHaveBeenCalled();
      await finishTransitions();
      expect(onOpened).toHaveBeenCalledExactlyOnceWith();
    });

    it('closed', async () => {
      const onClosed = vi.fn();
      const { wrapper } = await mountPopup({ visible: true, onClosed });
      await wrapper.setProps({ visible: false });
      expect(onClosed).not.toHaveBeenCalled();
      await finishTransitions();
      expect(onClosed).toHaveBeenCalledExactlyOnceWith();
    });
  });
});
