import { config, mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
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

describe('Dialog', () => {
  describe('props', () => {
    it('actions[array]', async () => {
      const onClose = vi.fn();
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          actions: [{ content: '一等奖' }, { content: '再来一次', theme: 'danger' }],
          onClose,
        },
      });

      // actions 渲染为底部自定义操作按钮，替代默认取消/确认按钮
      const $buttons = wrapper.findAllComponents(Button);
      expect($buttons).toHaveLength(2);
      expect($buttons[0].text()).toBe('一等奖');
      expect($buttons[1].text()).toBe('再来一次');
      // 按钮属性透传（主题）
      expect($buttons[1].classes()).toContain(`${prefix}-button--danger`);

      // 点击操作按钮按 cancel 通道关闭
      await $buttons[0].trigger('click');
      expect(onClose).toHaveBeenCalledWith({ e: expect.any(MouseEvent), trigger: 'cancel' });
    });

    it('beforeClose[function]', async () => {
      let resolveFn: () => void;
      const beforeClose = vi.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveFn = resolve;
          }),
      );
      const onConfirm = vi.fn();
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          confirmBtn: '确认',
          beforeClose,
          onConfirm,
        },
      });

      const $confirm = wrapper.findAllComponents(Button).at(0);
      await $confirm.trigger('click');

      // Promise 未决时：确认按钮进入加载态，尚未确认关闭
      expect(beforeClose).toHaveBeenCalledWith('confirm', { e: expect.any(MouseEvent) });
      expect($confirm.classes()).toContain(`${prefix}-button--loading`);
      expect(onConfirm).not.toHaveBeenCalled();

      // Promise resolve 后放行关闭，并退出加载态
      resolveFn();
      await sleep(0);
      await nextTick();
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect($confirm.classes()).not.toContain(`${prefix}-button--loading`);

      // Promise reject 时拦截关闭：不触发 confirm，也不保持加载态
      const onConfirm2 = vi.fn();
      const wrapper2 = mount(Dialog, {
        props: {
          visible: true,
          confirmBtn: '确认',
          beforeClose: () => Promise.reject(),
          onConfirm: onConfirm2,
        },
      });
      const $confirm2 = wrapper2.findAllComponents(Button).at(0);
      await $confirm2.trigger('click');
      await sleep(0);
      await nextTick();
      expect(onConfirm2).not.toHaveBeenCalled();
      expect($confirm2.classes()).not.toContain(`${prefix}-button--loading`);
    });

    it('buttonLayout[horizontal/vertical]', async () => {
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
      expect(document.querySelector(`.${name}__footer`).classList.contains(`${name}__footer--column`)).toBe(true);
    });

    it('closeBtn[boolean]', async () => {
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
      expect(document.querySelector(`.${name}__close-btn`)).not.toBeNull();
    });

    it('closeOnOverlayClick[boolean]', async () => {
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

    it('content[string]', async () => {
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

    it('content[function]', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          content: () => 'content is function',
        },
      });

      expect(wrapper.find('.t-dialog__body').text()).toBe('content is function');
    });

    it('destroyOnClose[boolean]', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          destroyOnClose: true,
        },
      });
      expect(wrapper.find('.t-dialog').exists()).toBeTruthy();

      await wrapper.setProps({ visible: false });
      expect(wrapper.find('.t-dialog').exists()).toBeFalsy();
    });

    it('middle[function]', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          middle: () => <div class="dialog-middle">中间内容</div>,
        },
      });
      expect(wrapper.find('.dialog-middle').exists()).toBeTruthy();
    });

    it('overlayProps[object]', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          overlayProps: { zIndex: 3000 },
        },
      });
      expect(wrapper.find('.t-overlay').attributes('style')).toContain('z-index: 3000');
    });

    it('preventScrollThrough[boolean]', async () => {
      mount(Dialog, {
        props: {
          visible: true,
          preventScrollThrough: true,
        },
      });
      expect(document.body.classList.contains('t-popup--lock')).toBe(true);
    });

    it('showOverlay[boolean]', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
        },
      });
      expect(wrapper.find('.t-overlay').isVisible()).toBeTruthy();

      const wrapper2 = mount(Dialog, {
        props: {
          visible: true,
          showOverlay: false,
        },
      });
      const overlay = wrapper2.find('.t-overlay');
      expect(overlay.exists()).toBe(true);
      expect(overlay.isVisible()).toBe(false);
    });

    it('title[string]', async () => {
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

    it('top[function]', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          top: () => <div class="dialog-top">顶部内容</div>,
        },
      });
      expect(wrapper.find('.dialog-top').exists()).toBeTruthy();
    });

    it('visible[boolean]', async () => {
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
      // 内容 teleport 到 body，需从 document 查询
      expect(document.querySelector('.t-dialog__header').textContent).toBe(title);
      expect(getComputedStyle(document.querySelector('.t-dialog')).display).not.toBe('none');
    });

    it('width[string]', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          width: '80%',
        },
      });
      expect(wrapper.find('.t-dialog').attributes('style')).toContain('width: 80%');
    });

    it('width[number]', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          width: 320,
        },
      });
      expect(wrapper.find('.t-dialog').attributes('style')).toContain('width: 320px');
    });

    it('zIndex[number]', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          zIndex: 11500,
        },
      });
      expect(wrapper.find('.t-popup').attributes('style')).toContain('z-index: 11500');
      await wrapper.setProps({
        zIndex: 12000,
      });
      expect(document.querySelector('.t-popup').getAttribute('style')).toContain('z-index: 12000');
    });
  });
  describe('slots', () => {
    it('confirmBtn', async () => {
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
    it('cancelBtn', async () => {
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
  describe('events', () => {
    it('should support custom onClick in actions', async () => {
      const onClick = vi.fn();
      const onCancel = vi.fn();
      const onClose = vi.fn();
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          actions: [{ content: 'action', onClick }],
          onCancel,
          onClose,
        },
      });

      const $button = wrapper.findComponent(Button);
      expect($button.props('onClick')).toBeTypeOf('function');

      await $button.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent));
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith({ e: expect.any(MouseEvent), trigger: 'cancel' });
    });

    it('should close dialog when action has no onClick', async () => {
      const onCancel = vi.fn();
      const onClose = vi.fn();
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          actions: [{ content: 'action' }],
          onCancel,
          onClose,
        },
      });

      const $button = wrapper.findComponent(Button);
      await $button.trigger('click');

      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith({ e: expect.any(MouseEvent), trigger: 'cancel' });
    });

    it('should trigger each action onClick independently', async () => {
      const onClickA = vi.fn();
      const onClickB = vi.fn();
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          actions: [
            { content: 'A', onClick: onClickA },
            { content: 'B', onClick: onClickB },
          ],
        },
      });

      const $buttons = wrapper.findAllComponents(Button);
      expect($buttons).toHaveLength(2);

      await $buttons.at(1).trigger('click');
      expect(onClickB).toHaveBeenCalledTimes(1);
      expect(onClickA).not.toHaveBeenCalled();

      await $buttons.at(0).trigger('click');
      expect(onClickA).toHaveBeenCalledTimes(1);
      expect(onClickB).toHaveBeenCalledTimes(1);
    });

    it('should passthrough action props (e.g. class) to button', async () => {
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          actions: [{ content: 'action', theme: 'danger', class: 'custom-action' }],
        },
      });

      const $button = wrapper.findComponent(Button);
      expect($button.props('theme')).toBe('danger');
      expect($button.classes()).toContain('custom-action');
    });

    it('should run action onClick before beforeClose intercepts closing', async () => {
      const onClick = vi.fn();
      const onCancel = vi.fn();
      // beforeClose reject 阻止关闭
      const beforeClose = vi.fn(() => Promise.reject());
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          actions: [{ content: 'action', onClick }],
          beforeClose,
          onCancel,
        },
      });

      const $button = wrapper.findComponent(Button);
      await $button.trigger('click');
      await nextTick();

      // 用户 onClick 无条件先执行
      expect(onClick).toHaveBeenCalledTimes(1);
      // beforeClose 被触发用于拦截 cancel
      expect(beforeClose).toHaveBeenCalledWith('cancel', { e: expect.any(MouseEvent) });
      // 被拦截后不 emit cancel
      expect(onCancel).not.toHaveBeenCalled();
    });

    it('cancel & confirm & close', async () => {
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

  // 用例结束后先排空浮层异步任务再清理 teleport 挂载内容，避免卸载期间的 patch 报错
  afterEach(async () => {
    await sleep(300);
    document.body.innerHTML = '';
  });

  describe('scenarios', () => {
    describe('plugin', () => {
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

        // 收尾到隐藏态，避免用例结束后浮层卸载与清理时机竞争
        handler.hide();
        await sleep(300);
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
  });
});
