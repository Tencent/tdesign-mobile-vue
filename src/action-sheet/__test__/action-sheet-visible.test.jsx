import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import ActionSheet from '../action-sheet';

const flush = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 50);
  });

describe('ActionSheet', () => {
  describe('v-model:visible', () => {
    it('emits update:visible when an item is selected', async () => {
      const onUpdateVisible = vi.fn();
      mount(ActionSheet, {
        attachTo: document.body,
        props: {
          visible: true,
          theme: 'list',
          items: ['确定', '删除'],
          'onUpdate:visible': onUpdateVisible,
        },
      });
      await nextTick();
      await flush();
      const items = document.querySelectorAll('.t-action-sheet__list-item');
      expect(items.length).toBeGreaterThan(0);
      items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await nextTick();
      expect(onUpdateVisible).toHaveBeenCalledWith(false);
    });

    it('does not emit update:visible before any interaction', async () => {
      const onUpdateVisible = vi.fn();
      mount(ActionSheet, {
        attachTo: document.body,
        props: {
          visible: true,
          theme: 'list',
          items: ['确定'],
          'onUpdate:visible': onUpdateVisible,
        },
      });
      await nextTick();
      await flush();
      expect(onUpdateVisible).not.toHaveBeenCalled();
    });
  });
});
