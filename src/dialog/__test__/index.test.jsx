import { config, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { nextTick } from 'vue';
import Dialog from '../dialog';
import { DialogPlugin } from '../index';
import Button from '../../button/button';

import prefixConfig from '../../config';
import { sleep } from '../../shared/util';

const { prefix } = prefixConfig;
const name = `${prefix}-dialog`;

config.global.stubs = {
  teleport: false,
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
      // expect(wrapper.find('.t-dialog__header').text()).toBe(title);
      // expect(wrapper.find('.t-dialog').isVisible()).toBe(true);
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
      // expect(wrapper.find('.t-dialog__header').text()).toBe(newTitle);
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
      // expect(wrapper.find('.t-dialog__body').text()).toBe(newContent);
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
          cancelBtn,
          confirmBtn,
          onConfirm,
          onCancel,
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
      // expect(wrapper.find(`.${name}__footer`).classes().includes(`${name}__footer--column`)).toBeTruthy();
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
      // expect(wrapper.find(`.${name}__close-btn`).exists()).toBeTruthy();
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
      // expect(wrapper.find('.t-dialog').attributes('style').includes(`width: ${newWidth}px`)).toBeTruthy();
    });

    it(':zIndex', async () => {
      const visible = true;
      const zIndex = 11500;
      const wrapper = mount(Dialog, {
        props: {
          visible,
          zIndex,
        },
      });
      // expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('.t-popup').attributes('style').includes(`z-index: ${zIndex}`)).toBeTruthy();
      const newZIndex = 12000;
      await wrapper.setProps({
        zIndex: newZIndex,
      });
      // expect(wrapper.find('.t-popup').attributes('style').includes(`z-index: ${newZIndex}`)).toBeTruthy();
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
  describe('slots', () => {
    it(':confirmBtn', async () => {
      const visible = true;
      const confirmBtn = 'confirm';
      const wrapper = mount(Dialog, {
        props: {
          visible,
        },
        slots: {
          confirmBtn: `<button class="slot-confirm-btn">${confirmBtn}</button>`,
        },
      });
      expect(wrapper.find('.slot-confirm-btn').text()).toBe(confirmBtn);
    });
    it(':cancelBtn', async () => {
      const visible = true;
      const cancelBtn = 'cancel';
      const wrapper = mount(Dialog, {
        props: {
          visible,
        },
        slots: {
          cancelBtn: `<button class="slot-cancel-btn">${cancelBtn}</button>`,
        },
      });
      expect(wrapper.find('.slot-cancel-btn').text()).toBe(cancelBtn);
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

describe('DialogPlugin', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('method', () => {
    const testMethod = (method, content) => {
      document.body.innerHTML = '';
      DialogPlugin[method](content);
      expect(document.body.textContent).toContain(content);
    };

    testMethod('show', 'Hello TDesign');
    testMethod('alert', 'Hello TDesign Mobile');
    testMethod('confirm', 'Hello TDesign Vue');
  });

  it('hide & show', async () => {
    const content = 'Hello TDesign';
    const handler = await DialogPlugin.show(content);

    expect(document.body.querySelector('.t-dialog')).toBeTruthy();
    await sleep(300);
    expect(document.body.querySelector('.t-overlay').style.display).not.toBe('none');

    handler.hide();
    await sleep(300);
    expect(document.body.querySelector('.t-overlay').style.display).toBe('none');

    handler.show();
    await sleep(300);
    expect(document.body.querySelector('.t-overlay').style.display).not.toBe('none');
  });

  it('update', async () => {
    const content = 'Hello Vue';
    const content2 = 'Hello TDesign';
    const content3 = 'Hello Vapor';
    const handler = await DialogPlugin.show(content);

    expect(document.body.textContent).toContain(content);
    expect(document.body.textContent).not.toContain(content2);

    handler.update(content2);
    await nextTick();
    expect(document.body.textContent).not.toContain(content);
    expect(document.body.textContent).toContain(content2);

    handler.update({ content: content3 });
    handler.update({ onConfirm: () => ({}) });
    await nextTick();
    expect(document.body.textContent).not.toContain(content);
    expect(document.body.textContent).not.toContain(content2);
    expect(document.body.textContent).toContain(content3);
  });
});
