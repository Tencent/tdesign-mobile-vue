import { config, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Dialog from '../dialog';
import Button from '../../button/button';
import { CloseIcon } from 'tdesign-icons-vue-next';

import prefixConfig from '../../config';

const { prefix } = prefixConfig;
const name = `${prefix}-dialog`;

config.global.stubs = {
  teleport: true,
};

describe('dialog', () => {
  describe('props', () => {
    it(':visible	', async () => {
      const title = 'this is a title';
      const wrapper = mount(Dialog, {
        props: {
          visible: false,
          title,
        },
      });

      expect(wrapper.find('.t-dialog').isVisible()).toBe(false);
      await wrapper.setProps({
        visible: true,
      });
      expect(wrapper.find('.t-dialog__header').text()).toBe(title);
      expect(wrapper.find('.t-dialog').isVisible()).toBe(true);
    });

    it(':title', async () => {
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

    it(':content', async () => {
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
      const confirmBtn = {
        content: '确认',
        variant: 'text',
        size: 'large',
      };
      const cancelBtn = {
        content: '取消',
        variant: 'text',
        size: 'large',
      };
      const onCancel = vi.fn();
      const onConfirm = vi.fn();

      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          title: '对话框标题',
          content: '告知当前状态、信息和解决方法',
          cancelBtn: cancelBtn,
          confirmBtn: confirmBtn,
          onConfirm: onConfirm,
          onCancel: onCancel,
        },
      });
      // 文字按钮
      expect(wrapper.find(`.${name}__button`).classes().includes(`${name}__button--text`)).toBeTruthy();

      // 默认水平
      expect(wrapper.find(`.${name}__footer`).classes().includes(`${name}__footer--column`)).toBeFalsy();
      // 垂直
      await wrapper.setProps({
        buttonLayout: 'vertical',
      });
      expect(wrapper.find(`.${name}__footer`).classes().includes(`${name}__footer--column`)).toBeTruthy();
    });

    it(':closeBtn', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          closeBtn: false,
        },
      });

      // false
      expect(wrapper.find(`.${name}__close-btn`).exists()).toBeFalsy();

      // true
      await wrapper.setProps({
        closeBtn: true,
      });
      expect(wrapper.find(`.${name}__close-btn`).exists()).toBeTruthy();
    });

    it(':width', async () => {
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

    it(':zIndex', async () => {
      const visible = true;
      const zIndex = 11500;
      const wrapper = mount(Dialog, {
        props: {
          visible,
          zIndex: zIndex,
        },
      });
      // expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('.t-popup').attributes('style').includes(`z-index: ${zIndex}`)).toBeTruthy();
      const newZIndex = 12000;
      await wrapper.setProps({
        zIndex: newZIndex,
      });
      expect(wrapper.find('.t-popup').attributes('style').includes(`z-index: ${newZIndex}`)).toBeTruthy();
    });

    it(': closeOnOverlayClick', async () => {
      const onClose = vi.fn();
      const onOverlayClick = vi.fn();
      const closeOnOverlayClick = true;
      const visible = true;
      const wrapper = mount(Dialog, {
        props: {
          visible,
          closeOnOverlayClick,
          onClose,
          onOverlayClick,
        },
      });
      const $overlay = wrapper.find(`.t-overlay`);
      expect($overlay.exists()).toBeTruthy();
      $overlay.trigger('click');
      expect(onClose).toBeCalledTimes(1);
      expect(onOverlayClick).toBeCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith({ e: expect.any(MouseEvent), trigger: 'overlay' });
    });
  });

  describe('event', () => {
    it(':cancel && confirm && close', async () => {
      const visible = true;
      const cancelBtn = 'cancel';
      const confirmBtn = 'confirm';
      const title = 'this is a title';
      const onClose = vi.fn();
      const onCancel = vi.fn();
      const onConfirm = vi.fn();
      const wrapper = mount(Dialog, {
        props: {
          visible,
          title,
          closeBtn: true,
          cancelBtn,
          confirmBtn,
          onCancel,
          onConfirm,
          onClose,
        },
      });

      // footer
      const $buttons = wrapper.findAllComponents(Button);
      expect($buttons).toHaveLength(2);
      expect($buttons.at(0).text()).toBe(cancelBtn);
      expect($buttons.at(1).text()).toBe(confirmBtn);
      $buttons.at(0).trigger('click');
      expect(onClose).toBeCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith({ e: expect.any(MouseEvent), trigger: 'cancel' });
      expect(onCancel).toBeCalledTimes(1);
      $buttons.at(1).trigger('click');
      expect(onConfirm).toBeCalledTimes(1);

      const $closeIcon = wrapper.findComponent(CloseIcon);
      $closeIcon.trigger('click');
      expect(onClose).toBeCalledTimes(2);
      expect(onClose).toHaveBeenCalledWith({ e: expect.any(MouseEvent), trigger: 'close-btn' });
    });
  });
});
