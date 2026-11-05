import { DOMWrapper, enableAutoUnmount, mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { nextTick } from 'vue';
import Dialog from '../dialog';
import Button from '../../button/button';
import type { TdButtonProps } from '../../button';

import prefixConfig from '../../config';
import { sleep } from '../../shared/util';

const { prefix } = prefixConfig;
const name = `${prefix}-dialog`;

enableAutoUnmount((unmount) => {
  afterEach(async () => {
    await sleep(300);
    unmount();
    document.body.innerHTML = '';
  });
});

describe('Dialog', () => {
  describe('props', () => {
    it('actions[array]', async () => {
      const onClose = vi.fn();
      // class 非 TdButtonProps 声明属性，运行时作为 attr 透传到按钮 DOM
      const actions: Array<TdButtonProps & { class?: string }> = [
        { content: '一等奖' },
        { content: '再来一次', theme: 'danger', class: 'custom-action' },
      ];
      const wrapper = mount(Dialog, {
        props: {
          visible: true,
          actions,
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
      expect($buttons[1].props('theme')).toBe('danger');
      expect($buttons[1].classes()).toContain('custom-action');

      // 点击操作按钮按 cancel 通道关闭
      await $buttons[0].trigger('click');
      expect(onClose).toHaveBeenCalledWith({ e: expect.any(MouseEvent), trigger: 'cancel' });
    });

    // 运行时声明 Function，但 isTextStyleBtn 会直接展开 actions，函数输入会报错。
    it.todo('actions[function]');
    it('actions[slot]', () => {
      const wrapper = mount(Dialog, {
        props: { visible: true },
        slots: { actions: () => <button class="slot-action">自定义操作</button> },
      });
      expect(wrapper.find('.t-dialog__footer .slot-action').text()).toBe('自定义操作');
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

      const syncBeforeClose = vi.fn();
      const syncConfirm = vi.fn();
      const syncWrapper = mount(Dialog, {
        props: { visible: true, confirmBtn: '确认', beforeClose: syncBeforeClose, onConfirm: syncConfirm },
      });
      await syncWrapper.findComponent(Button).trigger('click');
      await sleep(0);
      expect(syncBeforeClose).toHaveBeenCalledExactlyOnceWith('confirm', { e: expect.any(MouseEvent) });
      expect(syncConfirm).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent) });
    });

    it.each(['horizontal', 'vertical'] as const)('buttonLayout[%s]', async (buttonLayout) => {
      const confirmBtn: TdButtonProps = {
        content: '确认',
        variant: 'text',
        size: 'large',
      };
      const cancelBtn: TdButtonProps = {
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
          buttonLayout,
        },
      });
      // 文字按钮
      expect(wrapper.find(`.${name}__button`).classes().includes(`${name}__button--text`)).toBeTruthy();

      expect(wrapper.find(`.${name}__footer`).classes().includes(`${name}__footer--column`)).toBe(
        buttonLayout === 'vertical',
      );
    });

    it('cancelBtn[string]', () => {
      const wrapper = mount(Dialog, { props: { visible: true, cancelBtn: '取消按钮' } });
      expect(wrapper.findAllComponents(Button)[0].text()).toBe('取消按钮');
    });

    it('cancelBtn[object]', async () => {
      const wrapper = mount(Dialog, { props: { visible: true, cancelBtn: { content: '对象按钮', theme: 'danger' } } });
      expect(wrapper.findAllComponents(Button)[0].text()).toBe('对象按钮');
      expect(wrapper.findAllComponents(Button)[0].classes()).toContain(`${prefix}-button--danger`);
      await wrapper.setProps({ cancelBtn: null });
      expect(wrapper.findAllComponents(Button)).toHaveLength(0);
    });

    // 无同名插槽时，renderButtonNode 会丢弃函数返回的节点，仍渲染内置 Button。
    it.todo('cancelBtn[function]');
    it('cancelBtn[slot]', async () => {
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
      const visible = true;
      const wrapper = mount(Dialog, {
        props: {
          visible,
          onClose,
          onOverlayClick,
        },
      });
      const $overlay = wrapper.find(`.t-overlay`);
      expect($overlay.exists()).toBeTruthy();
      await $overlay.trigger('click');
      expect(onClose).not.toHaveBeenCalled();
      onOverlayClick.mockClear();
      await wrapper.setProps({ closeOnOverlayClick: true });
      await $overlay.trigger('click');
      expect(onClose).toBeCalledTimes(1);
      expect(onOverlayClick).toBeCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith({ e: expect.any(MouseEvent), trigger: 'overlay' });
    });

    it('confirmBtn[string]', () => {
      const wrapper = mount(Dialog, { props: { visible: true, confirmBtn: '确认按钮' } });
      expect(wrapper.findAllComponents(Button)[0].text()).toBe('确认按钮');
    });

    it('confirmBtn[object]', async () => {
      const wrapper = mount(Dialog, { props: { visible: true, confirmBtn: { content: '对象按钮', theme: 'danger' } } });
      expect(wrapper.findAllComponents(Button)[0].text()).toBe('对象按钮');
      expect(wrapper.findAllComponents(Button)[0].classes()).toContain(`${prefix}-button--danger`);
      await wrapper.setProps({ confirmBtn: null });
      expect(wrapper.findAllComponents(Button)).toHaveLength(0);
    });

    // 与 cancelBtn 相同，函数返回的自定义节点没有被渲染。
    it.todo('confirmBtn[function]');
    it('confirmBtn[slot]', async () => {
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
      expect(document.querySelector('.t-dialog__body').textContent).toBe(newContent);
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

    it('content[slot]', () => {
      const wrapper = mount(Dialog, { props: { visible: true }, slots: { content: () => <span>插槽内容</span> } });
      expect(wrapper.find('.t-dialog__body').text()).toBe('插槽内容');
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

    it('middle[slot]', () => {
      const wrapper = mount(Dialog, { props: { visible: true }, slots: { middle: () => <span>插槽中间</span> } });
      expect(wrapper.find('.t-dialog').text()).toContain('插槽中间');
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

    it.each([true, false])('preventScrollThrough[%s]', (preventScrollThrough) => {
      mount(Dialog, {
        props: {
          visible: true,
          preventScrollThrough,
        },
      });
      expect(document.body.classList.contains('t-popup--lock')).toBe(preventScrollThrough);
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
      expect(document.querySelector('.t-dialog__header').textContent).toBe(newTitle);
    });

    it('title[function]', () => {
      const wrapper = mount(Dialog, {
        props: { visible: true, title: () => <span class="custom-title">函数标题</span> },
      });
      expect(wrapper.find('.t-dialog__header .custom-title').text()).toBe('函数标题');
    });

    it('title[slot]', () => {
      const wrapper = mount(Dialog, { props: { visible: true }, slots: { title: () => <span>插槽标题</span> } });
      expect(wrapper.find('.t-dialog__header').text()).toBe('插槽标题');
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

    it('top[slot]', () => {
      const wrapper = mount(Dialog, { props: { visible: true }, slots: { top: () => <span>插槽顶部</span> } });
      expect(wrapper.find('.t-dialog').text()).toContain('插槽顶部');
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
      const dialog = new DOMWrapper(document.querySelector('.t-dialog'));
      expect(dialog.find('.t-dialog__header').text()).toBe(title);
      expect(dialog.isVisible()).toBe(true);
      await wrapper.setProps({ visible: false });
      await sleep(300);
      expect(dialog.isVisible()).toBe(false);
      expect(document.body.contains(dialog.element)).toBe(true);
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

    it('default[slot]', () => {
      const wrapper = mount(Dialog, {
        props: { visible: true },
        slots: { default: () => <span class="default-content">默认插槽内容</span> },
      });
      expect(wrapper.find('.t-dialog__body .default-content').text()).toBe('默认插槽内容');
    });
  });

  describe('events', () => {
    it('cancel', async () => {
      const onCancel = vi.fn();
      const onClose = vi.fn();
      const wrapper = mount(Dialog, { props: { visible: true, cancelBtn: '取消', onCancel, onClose } });
      await wrapper.findComponent(Button).trigger('click');
      expect(onCancel).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent) });
      expect(onClose).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent), trigger: 'cancel' });
      expect(wrapper.emitted('update:visible')).toEqual([[false]]);
    });

    it('close', async () => {
      const onClose = vi.fn();
      const wrapper = mount(Dialog, { props: { visible: true, closeBtn: true, onClose } });
      await wrapper.findComponent(CloseIcon).trigger('click');
      expect(onClose).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent), trigger: 'close-btn' });
      expect(wrapper.emitted('update:visible')).toEqual([[false]]);
    });

    it('overlayClick', async () => {
      const onOverlayClick = vi.fn();
      const wrapper = mount(Dialog, { props: { visible: true, closeOnOverlayClick: true, onOverlayClick } });
      await wrapper.find('.t-overlay').trigger('click');
      expect(onOverlayClick).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent) });
      expect(wrapper.emitted('update:visible')).toEqual([[false]]);
    });

    it('confirm', async () => {
      const onConfirm = vi.fn();
      const wrapper = mount(Dialog, { props: { visible: true, confirmBtn: '确认', onConfirm } });
      await wrapper.findComponent(Button).trigger('click');
      expect(onConfirm).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
      expect(wrapper.emitted('update:visible')).toEqual([[false]]);
    });

    it('closed', async () => {
      const onClosed = vi.fn();
      const wrapper = mount(Dialog, { props: { visible: true, onClosed } });
      await wrapper.setProps({ visible: false });
      await sleep(300);
      expect(onClosed).toHaveBeenCalledTimes(1);
    });
  });

  describe('scenarios', () => {
    it('runs custom onClick from actions', async () => {
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

    it('closes via the cancel channel when an action has no onClick', async () => {
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

    it('triggers each action onClick independently', async () => {
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

    it('runs action onClick before beforeClose intercepts closing', async () => {
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
      await $buttons.at(0).trigger('click');
      expect(onClose).toBeCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith({ e: expect.any(MouseEvent), trigger: 'cancel' });
      expect(onCancel).toBeCalledTimes(1);
      await $buttons.at(1).trigger('click');
      expect(onConfirm).toBeCalledTimes(1);

      const $closeIcon = wrapper.findComponent(CloseIcon);
      await $closeIcon.trigger('click');
      expect(onClose).toBeCalledTimes(2);
      expect(onClose).toHaveBeenCalledWith({ e: expect.any(MouseEvent), trigger: 'close-btn' });
    });

    it.each(['cancel', 'overlay', 'close-btn'] as const)('beforeClose guards %s', async (trigger) => {
      const beforeClose = vi.fn().mockRejectedValueOnce(new Error('blocked')).mockResolvedValueOnce(undefined);
      const onClose = vi.fn();
      const wrapper = mount(Dialog, {
        props: { visible: true, cancelBtn: '取消', closeBtn: true, closeOnOverlayClick: true, beforeClose, onClose },
      });
      const targets = {
        cancel: wrapper.findComponent(Button),
        overlay: wrapper.find('.t-overlay'),
        'close-btn': wrapper.findComponent(CloseIcon),
      };
      const target = targets[trigger];
      await target.trigger('click');
      await sleep(0);
      expect(beforeClose).toHaveBeenNthCalledWith(1, trigger, { e: expect.any(MouseEvent) });
      expect(onClose).not.toHaveBeenCalled();
      expect(wrapper.emitted('update:visible')).toBeUndefined();

      await target.trigger('click');
      await sleep(0);
      expect(beforeClose).toHaveBeenNthCalledWith(2, trigger, { e: expect.any(MouseEvent) });
      expect(onClose).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent), trigger });
      expect(wrapper.emitted('update:visible')).toEqual([[false]]);
    });

    // closeOnOverlayClick=false 时提前返回，关闭被禁用的同时也丢失了点击通知。
    it.todo('notifies overlayClick when overlay closing is disabled');
  });
});
