import { DOMWrapper, enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import type { Plugin } from 'vue';
import { DialogPlugin } from '../index';
import type { DialogInstance, TdDialogProps } from '../type';
import { sleep } from '../../shared/util';

const body = new DOMWrapper(document.body);
let handler: DialogInstance | undefined;

enableAutoUnmount((unmount) => {
  afterEach(async () => {
    if (handler) {
      // 隐藏态直接 destroy 不会触发 closed，先显示以确保插件创建的 app 能卸载。
      handler.show();
      await nextTick();
      handler.destroy();
      await nextTick();
      await sleep(300);
    }
    unmount();
    document.body.innerHTML = '';
    handler = undefined;
  });
});

describe('DialogPlugin', () => {
  describe('scenarios', () => {
    it.each(['show', 'alert', 'confirm'] as const)('%s[string]', async (method) => {
      handler = DialogPlugin[method](`Hello ${method}`);
      await nextTick();
      await nextTick();
      expect(body.get('.t-dialog__body').text()).toBe(`Hello ${method}`);
      expect(body.get('.t-dialog').isVisible()).toBe(true);
    });

    it.each(['show', 'alert', 'confirm'] as const)('%s[object]', async (method) => {
      handler = DialogPlugin[method]({
        title: '插件标题',
        content: '插件内容',
        cancelBtn: '取消',
        confirmBtn: '确认',
      });
      await nextTick();
      await nextTick();
      expect(body.get('.t-dialog').isVisible()).toBe(true);
      expect(body.get('.t-dialog__header').text()).toBe('插件标题');
      expect(body.get('.t-dialog__body').text()).toBe('插件内容');
      expect(body.findAll('.t-dialog__button').map((button) => button.text())).toEqual(
        method === 'alert' ? ['确认'] : ['取消', '确认'],
      );
    });

    it('hide & show', async () => {
      handler = DialogPlugin.show('Hello TDesign');
      await nextTick();
      await nextTick();
      expect(body.get('.t-dialog').isVisible()).toBe(true);
      handler.hide();
      await sleep(300);
      expect(body.get('.t-dialog').isVisible()).toBe(false);
      expect(body.get('.t-overlay').isVisible()).toBe(false);
      handler.show();
      await nextTick();
      expect(body.get('.t-dialog').isVisible()).toBe(true);
      expect(body.get('.t-overlay').isVisible()).toBe(true);
    });

    it('update', async () => {
      const originalConfirm = vi.fn();
      const updatedConfirm = vi.fn();
      handler = DialogPlugin.show({ content: 'Hello Vue', confirmBtn: '确认', onConfirm: originalConfirm });
      // update 运行时支持 string 快捷更新内容（见 src/dialog/index.ts），DialogInstance 类型仅声明了对象入参
      const update = handler.update as (options: Partial<TdDialogProps> | string) => void;
      await nextTick();
      expect(body.get('.t-dialog__body').text()).toBe('Hello Vue');
      update('Hello TDesign');
      await nextTick();
      expect(body.get('.t-dialog__body').text()).toBe('Hello TDesign');
      handler.update({ content: 'Hello Vapor', onConfirm: updatedConfirm });
      await nextTick();
      expect(body.get('.t-dialog__body').text()).toBe('Hello Vapor');
      await body.get('.t-dialog__button').trigger('click');
      expect(updatedConfirm).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent) });
      expect(originalConfirm).not.toHaveBeenCalled();
    });

    it('destroy', async () => {
      const onClosed = vi.fn();
      handler = DialogPlugin.show({ content: '待销毁的对话框', onClosed });
      await nextTick();
      await sleep(300);
      expect(body.get('.t-dialog').isVisible()).toBe(true);
      handler.destroy();
      await sleep(300);
      expect(onClosed).toHaveBeenCalledTimes(1);
      expect(document.querySelector('.t-dialog')).toBeNull();
      expect(document.querySelector('.t-overlay')).toBeNull();
      expect(document.body.classList.contains('t-popup--lock')).toBe(false);
      handler = undefined;
    });

    it.each(['confirm', 'cancel', 'overlay', 'close-btn'] as const)('forwards %s callbacks', async (trigger) => {
      const onConfirm = vi.fn();
      const onCancel = vi.fn();
      const onOverlayClick = vi.fn();
      const onClose = vi.fn();
      const onClosed = vi.fn();
      handler = DialogPlugin.show({
        content: '回调测试',
        cancelBtn: '取消',
        confirmBtn: '确认',
        closeBtn: true,
        closeOnOverlayClick: true,
        onConfirm,
        onCancel,
        onOverlayClick,
        onClose,
        onClosed,
      });
      await nextTick();
      await nextTick();
      const targets = {
        confirm: body.findAll('.t-dialog__button')[1],
        cancel: body.findAll('.t-dialog__button')[0],
        overlay: body.get('.t-overlay'),
        'close-btn': body.get('.t-dialog__close-btn svg'),
      };
      await targets[trigger].trigger('click');
      expect(onConfirm).toHaveBeenCalledTimes(trigger === 'confirm' ? 1 : 0);
      expect(onCancel).toHaveBeenCalledTimes(trigger === 'cancel' ? 1 : 0);
      expect(onOverlayClick).toHaveBeenCalledTimes(trigger === 'overlay' ? 1 : 0);
      if (trigger === 'cancel') expect(onCancel).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
      if (trigger === 'overlay') expect(onOverlayClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
      if (trigger === 'confirm') {
        expect(onConfirm).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
        expect(onClose).not.toHaveBeenCalled();
      } else {
        expect(onClose).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent), trigger });
      }
      await sleep(300);
      expect(body.get('.t-dialog').isVisible()).toBe(false);
      expect(onClosed).toHaveBeenCalledTimes(1);
    });

    // 隐藏后 destroy 不触发 closed，index.ts 中的 app.unmount/root.remove 不会执行。
    it.todo('destroys a hidden dialog and removes its mount node');

    it('use plugin', async () => {
      const wrapper = mount(() => <div />, { global: { plugins: [DialogPlugin as unknown as Plugin] } });
      const { $dialog } = wrapper.vm as unknown as { $dialog: typeof DialogPlugin };
      expect($dialog).toBe(DialogPlugin);
      handler = $dialog.show('全局插件对话框');
      await nextTick();
      expect(body.get('.t-dialog__body').text()).toBe('全局插件对话框');
    });
  });
});
