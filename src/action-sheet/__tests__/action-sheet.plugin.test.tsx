import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { ActionSheetPlugin } from '../plugin';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-action-sheet`;

describe('ActionSheetPlugin', () => {
  afterEach(async () => {
    ActionSheetPlugin.close();
    await nextTick();
    document.body.innerHTML = '';
  });

  describe('scenarios', () => {
    it('show', async () => {
      ActionSheetPlugin.show({ items: ['插件选项'] });
      await nextTick();
      await nextTick();

      expect(document.body.textContent).toContain('插件选项');
      expect(document.querySelector(`.${name}`)).toBeTruthy();
    });

    it('close', async () => {
      const onClose = vi.fn();
      ActionSheetPlugin.show({ items: ['插件选项'], onClose });
      await nextTick();

      ActionSheetPlugin.close({ trigger: 'command' });
      await nextTick();

      expect(onClose).toHaveBeenCalledWith({ trigger: 'command' });
      expect(document.querySelector(`.${name}`)).toBeFalsy();
    });
  });
});
