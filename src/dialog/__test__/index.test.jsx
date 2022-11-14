import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import Dialog from '../dialog.vue';
import Button from '../../button/button.vue';

describe('dialog', () => {
  describe('props', () => {
    it(': visible	', async () => {
      const visible = true;
      const title = 'this is a title';
      const wrapper = mount(Dialog, {
        props: {
          visible,
          title,
        },
      });

      expect(wrapper.find('.t-overlay').isVisible()).toBe(true);
      expect(wrapper.find('.t-dialog__header').text()).toBe(title);
      await wrapper.setProps({
        visible: false,
      });
      expect(wrapper.find('.t-overlay').isVisible()).toBe(false);
    });

    it(': title', async () => {
      const visible = true;
      const title = 'old title';
      const wrapper = mount(Dialog, {
        props: {
          visible,
          title,
        },
      });
      expect(wrapper.find('.t-dialog__header').text()).toBe(title);
      const newTitle = 'new title';
      await wrapper.setProps({
        title: newTitle,
      });
      expect(wrapper.find('.t-dialog__header').text()).toBe(newTitle);
    });

    it(': content', async () => {
      const visible = true;
      const title = 'this is title';
      const content = 'content is string';

      const wrapper = mount(Dialog, {
        props: {
          visible,
          title,
          content,
        },
      });

      expect(wrapper.find('.t-dialog__body').text()).toBe(content);
      const newContent = 'new content';
      await wrapper.setProps({
        content: newContent,
      });
      expect(wrapper.find('.t-dialog__body').text()).toBe(newContent);
    });

    it(': buttonLayout', async () => {
      const visible = true;
      const selector = 't-dialog__vertical-footer';
      const wrapper = mount(Dialog, {
        props: {
          visible,
        },
      });
      expect(wrapper.find('.t-dialog__footer').classes().includes(selector)).toBeFalsy();
      await wrapper.setProps({
        buttonLayout: 'vertical',
      });
      expect(wrapper.find('.t-dialog__footer').classes().includes(selector)).toBeTruthy();
    });

    it(': width', async () => {
      const visible = true;
      // width 为 string 类型
      const width = '80%';
      const wrapper = mount(Dialog, {
        props: {
          visible,
          width,
        },
      });
      expect(wrapper.find('.t-dialog').attributes('style').includes(`width: ${width}`)).toBeTruthy();
      // width 为 number 类型
      const newWidth = 320;
      await wrapper.setProps({
        width: newWidth,
      });
      expect(wrapper.find('.t-dialog').attributes('style').includes(`width: ${newWidth}px`)).toBeTruthy();
    });

    it(': zIndex', async () => {
      const visible = true;
      const zIndex = 11500;
      const wrapper = mount(Dialog, {
        props: {
          visible,
          zIndex: zIndex,
        },
      });
      // expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('.t-dialog').attributes('style').includes(`z-index: ${zIndex}`)).toBeTruthy();
      const newZIndex = 12000;
      await wrapper.setProps({
        zIndex: newZIndex,
      });
      expect(wrapper.find('.t-dialog').attributes('style').includes(`z-index: ${newZIndex}`)).toBeTruthy();
    });

    it(': closeOnOverlayClick', async () => {
      let triggerOrigin = {};
      const onClose = vi.fn((trigger) => {
        triggerOrigin = trigger;
      });
      const onOverlayClick = vi.fn();
      const closeOverlayClick = true;
      const visible = true;
      const wrapper = mount(Dialog, {
        props: {
          visible,
          closeOverlayClick,
          onClose,
          onOverlayClick,
        },
      });

      const $overlay = wrapper.findComponent({ name: 't-overlay' });
      expect($overlay.exists()).toBeTruthy();
      $overlay.vm.$emit('click');
      await nextTick();
      expect(onClose).toBeCalledTimes(1);
      expect(onOverlayClick).toBeCalledTimes(1);
      expect(triggerOrigin).toBe('overlay');
    });
  });

  describe('event', () => {
    it(': cancel && confirm', async () => {
      let triggerOrigin = {};
      const visible = true;
      const cancelBtn = 'cancel';
      const confirmBtn = 'confirm';
      const title = 'this is a title';
      const onClose = vi.fn((trigger) => {
        triggerOrigin = trigger;
      });
      const onCancel = vi.fn();
      const onConfirm = vi.fn();
      const wrapper = mount(Dialog, {
        props: {
          visible,
          title,
          cancelBtn,
          confirmBtn,
          onCancel,
          onConfirm,
          onClose,
        },
      });
      // expect(wrapper).toMatchSnapshot()
      // footer
      const $buttons = wrapper.findAllComponents(Button);
      expect($buttons).toHaveLength(2);
      expect($buttons.at(0).text()).toBe(cancelBtn);
      expect($buttons.at(1).text()).toBe(confirmBtn);
      $buttons.at(0).trigger('click');
      expect(onClose).toBeCalledTimes(1);
      expect(triggerOrigin).toBe('cancel');
      expect(onCancel).toBeCalledTimes(1);
      $buttons.at(1).trigger('click');
      expect(onConfirm).toBeCalledTimes(1);
    });
  });
});
